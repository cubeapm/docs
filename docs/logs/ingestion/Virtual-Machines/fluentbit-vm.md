---
id: fluentbit-vm
title: "Fluent Bit"
slug: /logs/ingestion/Virtual-Machines/fluentbit-vm
---

# Fluent Bit

## End-To-End Log Pipeline Using Fluent Bit.

You can use Fluent Bit to collect and send application level logs to CubeAPM.

### Prerequisites

- Application logs should be saved in a file ```(example:- /var/log/app.log)``` on VM's.

### Using Fluent Bit On Virtual Machine.

FluentBit on a Virtual Machine refers to deploying and running the FluentBit as a ***standalone service*** directly on a VM's.

To deploy the FluentBit as a standalone service on a VM, follow the steps below:

1. **Install FluentBit on VM's**

    ```bash
    curl https://raw.githubusercontent.com/fluent/fluent-bit/master/install.sh | sh
    ```

2. **Configure FluentBit**

    - Edit the configuration file: The default configuration file is typically located at:

        ```bash
        sudo vi /etc/fluent-bit/fluent-bit.conf
        ```

    - Define input, filter, output and service plugins:

        - **Input Plugins**: Specify how Fluent Bit will read logs (e.g., using file input plugin).
        - **Filter Plugins**: Define any processing steps for the logs (e.g., parsing, filtering, adding attributes, modifications).
        - **Output Plugins**: Specify where the logs will be sent (e.g., ***CubeAPM***).
        - **Service Configuration**: Configure the Fluent Bit service to define the log processing flow.

        

    <details>
    <summary>fluent-bit.yaml</summary>

    ```yaml
    service:
        flush: 1
        log_level: debug
        daemon: off
        #Set an optional location in the file system to store streams and chunks of data.
        #If this parameter isn't set, Input plugins can only use in-memory buffering.
        storage.path: #<path where you want to store the logs>
        #Configure the synchronization mode used to store the data in the file system.
        #Using full increases the reliability of the filesystem buffer and ensures that data is guaranteed to be synced to the filesystem even if Fluent Bit crashes.
        #On Linux, full corresponds with the MAP_SYNC option for memory mapped files. Accepted values: normal or full.
        storage.sync: ## normal or full
        #If the input plugin has enabled filesystem storage type,
        #this property sets the maximum number of chunks that can be up in memory.
        #Use this setting to control memory usage when you enable storage.type filesystem.
        storage.max_chunks_up: #<max chunks>
        #If storage.path is set,
        #Fluent Bit looks for data chunks that weren't delivered and are still in the storage layer.
        #These are called backlog data.
        #Backlog chunks are filesystem chunks that were left over from a previous Fluent Bit run;
        #chunks that couldn't be sent before exit that Fluent Bit will pick up when restarted.
        #Fluent Bit will check the storage.backlog.mem_limit value against the current memory usage from all up chunks for the input.
        #If the up chunks currently consume less memory than the limit, it will bring the backlog chunks up into memory so they can be sent by outputs.
        storage.backlog.mem_limit: #<backlog mem limit>
        #When enabled,
        #Fluent Bit will attempt to flush all backlog filesystem chunks to their destination during the shutdown process.
        #This can help ensure data delivery before Fluent Bit stops,
        #but can increase shutdown time. Accepted values: Off, On.
        storage.backlog.flush_on_shutdown: On
        ## Specify the path to the parser configuration file.
        ## https://docs.fluentbit.io/manual/data-pipeline/parsers
        ## This file includes multiple parser definitions.
        ## You can define path here where parser file is stored.
        parsers_file: parsers_multiline.yaml

    pipeline:
        inputs:
            - name: tail
              # Path from where fluentbit will read the logs
              path: ##/logs/app.log
              # Tag to identify the logs
              tag: #<tag name>
              #For new discovered files on start (without a database offset/position),
              #read the content from the head of the file, not tail.
              read_from_head: Off
              #The interval of refreshing the list of watched files in seconds.
              refresh_interval: 5
              skip_long_lines: Off
              #Specifies the buffering mechanism to use. Accepted values: memory, filesystem.
              ## https://docs.fluentbit.io/manual/administration/buffering-and-storage
              storage.type: filesystem
              ## for backpressure we use mem_buf_limit
              ## https://docs.fluentbit.io/manual/administration/backpressure
              mem_buf_limit: 5MB
              #Specifies if the input plugin should pause (stop ingesting new data)
              #when the storage.max_chunks_up value is reached.
              storage.pause_on_chunks_overlimit: Off
              #The java parser handles Java exception stack traces.
              #It detects Exception, Error, and Throwable patterns with their stack frames.
              multiline.parser: multiline-regex-test
              #Path_Key: source_path

        filters:
            # Parse the message field
            - name: parser
              match: "*"
              key_name: log
              parser: named-capture-test

            # Mask passwords using Lua script
            - name: lua
              match: "*"
              script: mask_password.lua
              call: mask_password

            - name: modify
              match: "*"
              rename:
                - log_level severity
              remove:
                - log_level
                # - log.level

            - name: record_modifier
              match: "*"
              record:
                # - path ${PATH}
                - hostname ${HOSTNAME}
                # - endpoint ${ENDPOINT}

        outputs:
            - name: http
              match: "*"
              host: <cubeapm_host>
              port: 3130
              uri: /api/logs/insert/jsonline?_stream_fields=stream,hostname&_msg_field=log&_time_field=date
              #Limit the maximum disk space size in bytes for buffering chunks in the filesystem
              #for the current output logical destination.
              retry_limit: false
              #Limit the maximum disk space size in bytes for buffering chunks in the filesystem
              #for the current output logical destination.
              storage.total_limit_size: 2G
              format: json_lines
    ```
    </details>

    <details>
    <summary>parser_multiline.conf</summary>

    ```conf
    ## https://docs.fluentbit.io/manual/data-pipeline/parsers
    ## Here you can define multiple parser definitions
    ## eg. multiline parser, json parser, regex parser etc.
    [PARSER]
        Name         custom_log_parser
        Format       regex
        Regex        /^(?<timestamp>\d+-\d+-\d+ \d+:\d+:\d+\.\d+)\s+\[[^\]]+\]\s+(?<log_level>[A-Z]+)\s+\S+\s+-\s+(?<log>.*)$/m
        Time_Key     timestamp
        Time_Format  %Y-%m-%d %H:%M:%S.%L
        Time_Keep    on
        Time_Strict  off
    
    [MULTILINE_PARSER]
        name          multiline-regex
        type          regex
        # Regex rules for multiline parsing
        # ---------------------------------
        # configuration hints:
        #  - first state always has the name: start_state
        #  - every field in the rule must be inside double quotes
        # rules | state name    | regex pattern                        | next state name
        # ------|---------------|--------------------------------------|-----------
        rule      "start_state"   "/^(\d+-\d+-\d+ \d+:\d+:\d+).*/"       "cont"
        rule      "cont"          "/^(?!(\d+-\d+-\d+ \d+:\d+:\d+)).*/"   "cont"

    ```
    </details>

    <details>
    <summary>mask_password.lua</summary>

    ```lua
    --https://docs.fluentbit.io/manual/data-pipeline/filters/lua
    --Here you can define masking logic for sensitive data
    function mask_password(tag, timestamp, record)
        local log = record["log"]
        if log then
            -- Replace password=... with password=*****
            -- Matches password= followed by non-whitespace characters
            local masked_log = string.gsub(log, "password=[^%s,]+", "password=*****")
            record["log"] = masked_log
            return 1, timestamp, record
        end
        return 0, 0, 0
    end
    ```
    </details>

3. **Restart FluentBit Service**

    ```bash
    sudo systemctl restart fluentbit
    ```

4. **Verify FluentBit Service**

    ```bash
    sudo systemctl status fluentbit
    ```

5. **Send Logs to Collector**

    - Configure your applications to write logs to the file specified in the FluentBit configuration.

6. **Verify the logs are being ingested**

    - Check the CubeAPM logs to verify that the logs are being ingested.

        