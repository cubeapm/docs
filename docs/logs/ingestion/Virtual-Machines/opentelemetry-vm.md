---
id: opentelemetry
title: "OpenTelemetry"
slug: /logs/ingestion/Virtual-Machines/opentelemetry-vm
---

# OpenTelemetry

## End-To-End Log Pipeline Using OpenTelemetry.

You can use OpenTelemetry to collect and send application level logs to CubeAPM.

### Prerequisites

- Application logs should be saved in a file ```(example:- /var/log/app.log)``` on VM's.

### Using OpenTelemetry Collector On Virtual Machine.

OpenTelemetry Collector on a Virtual Machine refers to deploying and running the OpenTelemetry Collector as a ***standalone service*** directly on a VM's.

To deploy the OpenTelemetry Collector as a standalone service on a VM, follow the steps below:

1. **Install OpenTelemetry Collector on VM's**.

    ```shell
    sudo apt-get update
    sudo apt-get -y install wget
    ```

2. **Download the appropriate OpenTelemetry Collector Contrib package**:

    - Find the latest release for your architecture (e.g., linux_amd64.deb for 64-bit Intel/AMD) on the OpenTelemetry Collector releases page on [GitHub](https://github.com/open-telemetry/opentelemetry-collector/releases).

    - Example for a recent version (replace with the actual latest version):

        ```shell
        wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.140.0/otelcol-contrib_0.140.0_linux_amd64.deb
        ```

3. **Install the downloaded package**.

    ```shell
    sudo dpkg -i otelcol-contrib_0.140.0_linux_amd64.deb
    ```
    (Replace with the actual filename you downloaded.)

4. **Configure the OpenTelemetry Collector**:

    - Edit the configuration file: The default configuration file is typically located at:
    
       ```/etc/otelcol-contrib/otel-collector.yaml```.

        ```shell
        sudo vi /etc/otelcol-contrib/otel-collector.yaml
        ```

    - Define receivers, processors, and exporters for logs:

        - **Receivers**: Specify how the collector will receive logs (e.g.. using filelog receiver).
        - **Processors**: Define any processing steps for the logs (e.g., batching, filtering, adding attributes, modifications).
        - **Exporters**: Specify where the logs will be sent (e.g., ***CubeAPM***).
        - **Service Pipelines**: Link the receivers, processors, and exporters together to define the log processing flow.

        <details>
        <summary>otel-collector.yaml</summary>

        ```yaml
        # file_storage extensions to keep track of logs avoid loss of logs or duplicates
        extensions:
            file_storage:
                directory: /var/otelcol/file_storage

        receivers:
            filelog:
                include:
                    - /logs/app.log
                start_at: end
                # The initial size of the buffer to read from the file.
                #initial_buffer_size: 16KiB
                ## this exclude the logs file modified older than 24 hours
                exclude_older_than: 24h
                # The maximum size of a log entry to read. A log entry will be truncated if it is larger than max_log_size. Protects against reading large amounts of data into memory.
                #max_log_size: 1MiB
                # file_storage to keep track of logs avoid loss of logs or duplicates
                storage: file_storage
                preserve_leading_whitespaces: true
                # On receiver side it servers a different purpose - when the backend service (cubeapm) and the queue (file_storage) storage is full so it pause reading logs from file and wait from initial_interval to max_interval for 10min.
                retry_on_failure:
                    enabled: true
                    initial_interval: 5s
                    max_interval: 30s
                    max_elapsed_time: 10m

                operators:
                 # Format specific handling
                 # Step 1: Detect format and send logs to respective handlers.
                    - id: format_handler_router
                      type: router
                      routes:
                        # for java multiline logs
                        - expr: attributes["log.file.path"] == "/logs/app.log"
                          output: java_parser

                        # for python multiline logs
                        # - expr: resource.attributes["service.name"] == "python_flask"
                        #   output: python_multiline_parser

                        # # for go multiline logs
                        # - expr: resource.attributes["service.name"] == "go_fiber"
                        #   output: go_multiline_parser

                        # # for nodejs multiline logs
                        # - expr: resource.attributes["service.name"] == "nodejs_express"
                        #   output: nodejs_multiline_parser
                    # Send logs to end_of_format_handler
                      default: end_of_format_handler

                    # Step 2: Process each format
                    - id: java_parser
                      type: noop
                      
                      ## Using Recombine Operator parse the multiline logs
                    - id: java_multiline_parser
                      type: recombine
                      combine_field: body
                      is_first_entry: body matches "^\\d{4}-\\d{2}-\\d{2}"
                      ## Using source_identifier to identify the source of the log (to avoid mixing up between same format logs from different files or applications)
                      source_identifier: attributes["log.file.path"]
                      force_flush_period: 5s

                      ## Using Extract Operator to extract fields from the log i.e timestamp, thread, severity, logger etc.
                    - id: java_extract_fields
                      type: regex_parser
                      regex: '(?P<timestamp>\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\.\d{3})\s+\[(?P<thread>[^\]]+)\]\s+(?P<severity>\w+)\s+(?P<logger>\S+)\s+-\s+'
                      timestamp:
                        parse_from: attributes.timestamp
                        layout_type: strptime
                        layout: "%Y-%m-%d %H:%M:%S.%f"
                      severity:
                        parse_from: attributes.severity
                        mapping:
                            ERROR: error
                            WARN: warn
                            INFO: info
                            DEBUG: debug
                            TRACE: trace

                    # - id: python_multiline_parser
                    #   type: recombine
                    #   combine_field: body
                    #   line_start_pattern: '^(Traceback|\d{4}-\d{2}-\d{2})'
                    #   force_flush_period: 10s

                    # - id: go_multiline_parser
                    #   type: recombine
                    #   combine_field: body
                    #   line_start_pattern: '^(panic:|\d{4}/\d{2}/\d{2})'
                    #   force_flush_period: 10s

                    # - id: nodejs_multiline_parser
                    #   type: recombine
                    #   combine_field: body
                    #   line_start_pattern: '^(Error:|\d{4}-\d{2}-\d{2})'
                    #   force_flush_period: 10s

                    - id: java_finish
                      type: noop
                      output: end_of_format_handler

                    # Step 3: Finish multiline handling
                    - id: end_of_format_handler
                      type: noop

        processors:
            #   What it does: (memory_limiter)
            #     Prevents backpressure by monitoring memory usage
            #     Drops old data if memory exceeds limits
            #     Protects system from running out of RAM
            memory_limiter:
                check_interval: 1s # Check every 1 second
                limit_mib: 512 # Hard limit: 512 MB
                spike_limit_mib: 128 # Allow temporary spikes up to 128 MB

            #   What it does:
            #     Adds resource attributes to logs
            #     Runs on two locations: body and attributes
            resource:
                attributes:
                    - key: service
                        value: "java_springboot"
                        action: upsert

            #   What it does:
            #     Finds passwords in logs using regex pattern
            #     Replaces with **** to hide sensitive data
            #     Runs on two locations: body and attributes            
            transform/mask_passwords:
                log_statements:
                    - context: log
                        statements:
                            # Remove log metadata prefix (timestamp, thread, level, class) to keep only the message
                            #- replace_pattern(body, "^\\d{4}-\\d{2}-\\d{2}\\s+\\d{2}:\\d{2}:\\d{2}\\.\\d{3}\\s+\\[[^\\]]+\\]\\s+\\w+\\s+\\S+\\s+-\\s+", "")
                            # Mask passwords
                            - replace_pattern(body, "password=\\S+", "password=****")
                            - replace_pattern(attributes["message"], "password=\\S+", "password=****")

            #   What it does:
            #     Detects system resources (e.g., hostname, OS, CPU, memory) and adds them as resource attributes
            #     Runs on two locations: body and attributes
            resourcedetection:
                detectors: ["system"]
                system:
                    hostname_sources: ["os"]

            #   What it does:
            #     Batch multiple log records into a single batch for efficient transmission
            #     Runs on two locations: body and attributes
            batch:
                send_batch_size: 1000
                timeout: 5s
                send_batch_max_size: 10000

            #   What it does:
            #     Filters out log records based on severity level
            #     Runs on two locations: body and attributes
            #filter/java_logs:
            #   logs:
            #        log_record:
            #            # - log.level != "ERROR" or log.level != "error" or severity_number != #17
            #            # - 'attributes["level"] != "ERROR" and attributes["level"] != "error"'
            #            - severity_text == "ERROR" or severity_text == "error"
            #            #       # - body == "transactionId"

        exporters:
            otlphttp:
                endpoint: "http://<cubeapm-server-ip>:3130/api/logs/insert/opentelemetry/"
                headers:
                    Cube-Stream-Fields: "service, severity"
                tls:
                    insecure: true
                #Retry configuration
                retry_on_failure:
                    enabled: true
                    # Wait 5 seconds after the first failure before the first retry.
                    initial_interval: 5s
                    # The longest the receiver will wait between retries is 30 seconds.
                    max_interval: 30s
                    # Give up trying to send a batch after 10 minutes.
                    max_elapsed_time: 300s

                #   What it does:
                #     Manages log sending queue
                #     Runs on two locations: body and attributes
                sending_queue:
                    enabled: true
                    # Queue depth limit. When this limit is reached, the exporter will start dropping logs.
                    # store 5000 log batches not logs.
                    queue_size: 5000
                    storage: file_storage

        debug: {}

        service:
            telemetry:
                logs:
                    level: debug
            pipelines:
                logs:
                receivers:
                    - filelog
                processors:
                    - memory_limiter # 1st: Prevent OOM
                    - resourcedetection # 2nd: Add resource attributes (early!)
                    - resource # 3rd: Override/add custom attributes
                    - transform/mask_passwords # 4th: Mask sensitive data
                    # - filter/java_logs # 5th: Filter (drop unwanted logs early)
                    - batch # 6th: Batch for export (LAST!)
                exporters:
                    - otlphttp # debug for local logging, otlphttp to CubeAPM.

        ```
        </details>

5. **Start and Enable the OpenTelemetry Collector Service**:

    - Reload systemd daemon.

    ```shell
    sudo systemctl daemon-reload
    ```

    - Start the collector service.

    ```shell
    sudo systemctl start otelcol-contrib
    ```

    - Enable the service to start on boot:

    ```shell
    sudo systemctl enable otelcol-contrib
    ```

    - Check the service status.

    ```shell
    sudo systemctl status otelcol-contrib
    ```

6. **Send Logs to Collector**.

    - Configure your applications to write logs to the file specified in the OpenTelemetry Collector configuration.

7. **Verify the logs are being ingested**.

    - Check the CubeAPM logs to verify that the logs are being ingested.