---
id: fluentbit
title: "Fluentbit"
slug: /logs/ingestion/fluentbit
---

# Fluentbit

Fluent Bit is an open source telemetry agent specifically designed to efficiently handle the challenges of collecting and processing telemetry data across a wide range of environments, from constrained systems to complex cloud infrastructures. Managing telemetry data from various sources and formats can be a constant challenge, particularly when performance is a critical factor.

Fluent Bit can be deployed as an edge agent for localized telemetry data handling or utilized as a central aggregator/collector for managing telemetry data across multiple sources and environments.

## Installation

### Method 1: Simplified Installation (Recommended)

An installation script is provided for use with most Linux targets. This will by default install the most recent version released.

:::info
Run this command as root user.
:::

```shell
curl https://raw.githubusercontent.com/fluent/fluent-bit/master/install.sh | sh
```
After installing Fluentbit using the script, run the ***systemctl*** command to start the service.

```shell
sudo systemctl start fluent-bit
sudo service fluent-bit status
```

### Method 2: Manual Installation

You can refer to this https://docs.fluentbit.io/manual/installation/downloads/linux to install Fluentbit package for your os and cpu architecture.

After installing the Fluentbit, you can run the following command to start the Fluentbit service:

```shell
sudo systemctl start fluent-bit
sudo service fluent-bit status
```

## Configuration

Using Fluentbit you can send logs to CubeAPM by multiple ways.

### HTTP
Specify `http` output section in `fluentbit.conf` as below:

```
[Output]
    Name http
    Match *
    host <ip_address_of_cubeapm_server>
    port 3130
    uri /api/logs/insert/jsonline?_stream_fields=stream&_msg_field=log&_time_field=date
    format json_lines
    json_date_format iso8601
    #compress gzip
```

Reference: [Fluentbit HTTP documentation](https://docs.fluentbit.io/manual/pipeline/outputs/http).

### Elasticsearch

Specify `es` output section in `fluentbit.conf` as below:

```
[Output]
    Name es
    Match *
    host <ip_address_of_cubeapm_server>
    port 3130
    path /api/logs/insert/elasticsearch/_bulk?_stream_fields=stream&_msg_field=log&_time_field=@timestamp&dummy=
    #compress gzip
```

Reference: [Fluentbit Elasticsearch documentation](https://docs.fluentbit.io/manual/pipeline/outputs/elasticsearch).

:::info
es plugin adds `/_bulk` at the end of the `path`, so we added `&dummy=` to the end of the path to avoid unintended modification of the path.
:::

### Loki

Specify `loki` output section in `fluentbit.conf` as below:

```
[OUTPUT]
    name loki
    match *
    host <ip_address_of_cubeapm_server>
    port 3130
    uri /api/logs/insert/loki/api/v1/push
    label_keys $path,$stream
    #compress gzip
    #auto_kubernetes_labels on
```

Reference: [Fluentbit Loki documentation](https://docs.fluentbit.io/manual/pipeline/outputs/loki).

Here's a sample Fluentbit configuration file for collecting, processing and sending logs to CubeAPM.

<details>
<summary>fluentbit.yaml</summary>

```yaml
service:
  flush: 1
  log_level: debug
  daemon: off
  #Set an optional location in the file system to store streams and chunks of data.
  #If this parameter isn't set, Input plugins can only use in-memory buffering.
  storage.path: /logs/
  #Configure the synchronization mode used to store the data in the file system.
  #Using full increases the reliability of the filesystem buffer and ensures that data is guaranteed to be synced to the filesystem even if Fluent Bit crashes.
  #On Linux, full corresponds with the MAP_SYNC option for memory mapped files. Accepted values: normal, full.
  storage.sync: full
  #If the input plugin has enabled filesystem storage type,
  #this property sets the maximum number of chunks that can be up in memory.
  #Use this setting to control memory usage when you enable storage.type filesystem.
  storage.max_chunks_up: 128
  #If storage.path is set,
  #Fluent Bit looks for data chunks that weren't delivered and are still in the storage layer.
  #These are called backlog data.
  #Backlog chunks are filesystem chunks that were left over from a previous Fluent Bit run;
  #chunks that couldn't be sent before exit that Fluent Bit will pick up when restarted.
  #Fluent Bit will check the storage.backlog.mem_limit value against the current memory usage from all up chunks for the input.
  #If the up chunks currently consume less memory than the limit, it will bring the backlog chunks up into memory so they can be sent by outputs.
  storage.backlog.mem_limit: 256M
  #When enabled,
  #Fluent Bit will attempt to flush all backlog filesystem chunks to their destination during the shutdown process.
  #This can help ensure data delivery before Fluent Bit stops,
  #but can increase shutdown time. Accepted values: Off, On.
  storage.backlog.flush_on_shutdown: On
  parsers_file: parsers_multiline.yaml

pipeline:
  inputs:
    - name: tail
      path: /logs/app.log
      tag: java_springboot
      #For new discovered files on start (without a database offset/position),
      #read the content from the head of the file, not tail.
      read_from_head: Off
      #The interval of refreshing the list of watched files in seconds.
      refresh_interval: 5

      skip_long_lines: Off
      #Specifies the buffering mechanism to use. Accepted values: memory, filesystem.
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
      Path_Key: source_path

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
      host: host.docker.internal
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
<summary>mask_password.lua</summary>

```lua
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

<details>
<summary>parsers_multiline.yaml</summary>

```yaml
multiline_parsers:
  - name: multiline-regex-test
    type: regex
    flush_timeout: 1000
    #
    # Regex rules for multiline parsing
    # ---------------------------------
    #
    # configuration hints:
    #
    #  - first state always has the name: start_state
    #  - every field in the rule must be inside double quotes
    #
    # rules |   state name  | regex pattern                  | next state
    # ------|---------------|--------------------------------------------
    rules:
      - state: start_state
        regex: '/^(\d+-\d+-\d+ \d+:\d+:\d+).*/'
        next_state: cont

      - state: cont
        regex: '/^(?!(\d+-\d+-\d+ \d+:\d+:\d+)).*/'
        next_state: cont

parsers:
  - name: named-capture-test
    format: regex
    regex: '/^(?<timestamp>\d+-\d+-\d+ \d+:\d+:\d+\.\d+)\s+\[[^\]]+\]\s+(?<log_level>[A-Z]+)\s+\S+\s+-\s+(?<log>.*)$/m'
    # regex: '/^(?<timestamp>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)\s+(?<log_level>[A-Z]+)\s+\d+\s+---\s+\[[^\]]+\]\s+(?<service>\S+)\s+:\s+(?<log>.*)$/'

```
</details>

A sample project with working Docker Compose setup is available at https://github.com/cubeapm/sample_logs_pipeline.