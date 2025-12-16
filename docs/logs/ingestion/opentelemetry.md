---
slug: /logs/ingestion/opentelemetry
---

# OpenTelemetry

OpenTelemetry (OTel) Collector provides powerful capabilities to receive logs from multiple sources, process them, and forward to log storage and visualization platforms like CubeAPM.

OTel Collector can be installed on Linux, Windows, and Mac. Pre-built packages for popular package managers (apt, rpm, etc.) are available at https://github.com/open-telemetry/opentelemetry-collector-releases/releases. Visit the link, look for `Assets` for the latest release, and click on `Show all xxx assets` link at the bottom of the assets list. Then look at links starting with `otelcol-contrib_` and find the appropriate one for your os platform. For example, the one for Ubuntu running on 64-bit ARM processors will be named like `otelcol-contrib_xxx_linux_arm64.deb`.

:::info
There are two variants of OTel Collector available - **core** (names starting with `otelcol_`) and **contrib** (names starting with `otelcol-contrib_`). The core variant is bare-bones, while the contrib variant has a number of additional modules. Infra monitoring makes use of many of these additional modules, and hence needs the contrib variant.
:::

## Installation

### Method 1: Simplified Installation (Recommended)

We provide a simplified installation script that automatically detects your OS and architecture, and installs the appropriate OpenTelemetry Collector Contrib version with custom configuration.

```shell
sudo /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/cubeapm/Otel-contrib-installation/main/otel-contrib-install.sh)" -- --version 0.141.0

```

### Method 2: Manual Installation

Here we show the manual installation steps for Ubuntu. Steps for other linux variants are similar. (See the bottom of this section for installation on Windows)

```shell
# change the link to the appropriate link for your os, cpu architecture, collector version, etc.
wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.141.0/otelcol-contrib_0.141.0_linux_arm64.deb

dpkg -i otelcol-contrib_0.141.0_linux_arm64.deb

# the package file can now be removed
# rm otelcol-contrib_0.141.0_linux_arm64.deb

# edit the config as desired (refer the configuration section below)
vi /etc/otelcol-contrib/config.yaml

# restart collector service
systemctl restart otelcol-contrib.service
systemctl status otelcol-contrib.service
```

<details>
<summary>Installation on Windows</summary>

1. Download the appropriate `.tar.gz` file for windows platform.
1. Unzip it by executing `tar -xzf <filename>` command in powershell.
1. Update config.yaml as desired (refer the configuration section below).
1. Run the Collector by executing `otelcol-contrib.exe --config config.yaml` in powershell.

The Collector can be set up as a background service as follows:

```shell
# Create windows service.
# Modify the paths of otelcol-contrib.exe and config.yaml as appropriate.
# Ref: https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/sc-create
sc.exe create otelcol displayname= otelcol start= delayed-auto binPath= "C:\Users\Administrator\Desktop\otelcol-contrib\otelcol-contrib.exe --config C:\Users\Administrator\Desktop\otelcol-contrib\config.yaml"

# Useful commands
sc.exe start otelcol
sc.exe query otelcol
sc.exe delete otelcol

# To check the logs, open event viewer > windows logs > application,
# and then filter source=otelcol on right hand side.
```

</details>

## Configuration

Here's a sample OTel Collector configuration file for logs.

<details>
<summary>config.yaml</summary>

```yaml
receivers:
  # https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver#file-log-receiver
  filelog:
    include:
      - /logs/*.log
    # exclude: []
    preserve_leading_whitespaces: true
    # Note: `include_file_path` must not be set to false, else recombine
    # operator will mix up logs from different files.
    # include_file_path: true

    # The maximum size of a log entry to read. A log entry will be truncated if it is
    # larger than max_log_size. Protects against reading large amounts of data into memory.
    # max_log_size: 1MiB

    # A map of key: value pairs to add to the entry's attributes.
    # attributes: {}
    # A map of key: value pairs to add to the entry's resource.
    # resource: {}

    # The ID of a storage extension to be used to store file offsets. File offsets allow the
    # receiver to pick up where it left off in the case of a collector restart. If no storage
    # extension is used, the receiver will manage offsets in memory only.
    storage: file_storage

    retry_on_failure:
      enabled: true
      # initial_interval: 1s
      # max_interval: 30s
      # max_elapsed_time: 5m

    # https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/stanza/docs/operators/README.md
    operators:
      # The container operator parses logs in docker, cri-o and containerd formats.
      # Uncomment if running in container environment.
      # - id: container-parser
      #   type: container
      #   max_log_size: 1000000

      # - id: filter
      #   type: filter
      #   # matching logs are DROPPED
      #   expr: <expression>

      # Format specific handling
      # Step 1: Detect format and send logs to respective handlers.
      - id: format_handler_router
        type: router
        routes:
          - expr: attributes["log.file.path"] == "/logs/java_app.log"
            output: java_parser
        # Send logs to end_of_format_handler
        default: end_of_format_handler

      # Step 2: Process each format (repeat for each format)
      - id: java_parser
        type: noop
      - id: java_multiline
        type: recombine
        combine_field: body
        is_first_entry: body matches "^\\d{4}-\\d{2}-\\d{2}"
        # force_flush_period: 5s
        # source_identifier: attributes["log.file.path"]
      - id: java_extract_fields
        type: regex_parser
        regex: (?P<timestamp_field>\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}(?:[,.]\d+)?[+-]\d{2}:\d{2})\s+\[(?P<severity_field>[A-Z]+)\]\s+(?P<message>.+)
        # if: <expression>
        # parse_from: body
        # parse_to: attributes
        # https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/stanza/docs/types/timestamp.md
        timestamp:
          parse_from: attributes.timestamp_field
          layout_type: strptime
          layout: "%Y-%m-%d %H:%M:%S.%s%j"
          # Specify time zone if needed
          # location: Local
        # https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/stanza/docs/types/severity.md
        severity:
          parse_from: attributes.severity_field
          # preset: default
          # mapping:
          #   error: 5xx
          # Replace incoming text with standard shaort name for consistency.
          overwrite_text: true
      - id: java_finish
        type: noop
        output: end_of_format_handler

      # Step 3: Finish multiline handling
      - id: end_of_format_handler
        type: noop

      # - id: remove_timestamp_field
      #   type: remove
      #   field: attributes.timestamp_field
      # - id: remove_severity_field
      #   type: remove
      #   field: attributes.severity_field

      # Add more operators if needed
      # https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/stanza/docs/operators/README.md

processors:
  batch: {}

  resourcedetection:
    detectors: ["system"]
    system:
      hostname_sources: ["os"]

  # resource/cube.environment:
  #   attributes:
  #     - key: cube.environment
  #       value: UNSET
  #       action: upsert

  transform/logs_parse_json_body:
    error_mode: ignore
    log_statements:
      - context: log
        conditions:
          - body != nil and IsString(body) and Substring(body, 0, 2) == "{\""
        statements:
          - set(cache, ParseJSON(body))
          - flatten(cache, "")
          - merge_maps(attributes, cache, "upsert")

  # https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/filterprocessor
  # filter/logs:
  #   error_mode: ignore
  #   logs:
  #     log_record:
  #       # matching logs are DROPPED
  #       - log.severity_text != "ERROR" AND log.severity_text != "FATAL"

  # transform/logs_redact:
  #   error_mode: ignore
  #   log_statements:
  #     - context: log
  #       statements:
  #         # https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/ottl/ottlfuncs#replace_pattern
  #         # - replace_pattern(attributes["http.url"], "client_id=[^&]+", "client_id=[REDACTED]")
  #         - replace_pattern(body, "\"(token|password)\":\"[^\"]*\"", "\"$$1\":\"****\"")

  # Filelog operators should be preferred for extracting fields, as they offer
  # advanced capability of conditional routing etc. This section is provided
  # here just for reference in case some use-case comes up.
  # transform/logs_extract_fields:
  #   error_mode: ignore
  #   log_statements:
  #     - context: log
  #       statements:
  #         # https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/ottl/ottlfuncs#extractpatterns
  #         - merge_maps(attributes, ExtractPatterns(body, "\\[(?P<log_level>TRACE|DEBUG|INFO|WARN|WARNING|ERROR|FATAL)\\]"), "upsert")
  #         - merge_maps(attributes, ExtractPatterns(body, "\\[(?P<log_level>trace|debug|info|warn|warning|error|fatal)\\]"), "upsert")
  #         - merge_maps(attributes, ExtractPatterns(body, "\\s+level=(?P<log_level>trace|debug|info|warn|warning|error|fatal)\\s+"), "upsert")
  #         - merge_maps(attributes, ExtractPatterns(body, "\\s+-\\s+(?P<log_level>TRACE|DEBUG|INFO|WARN|WARNING|ERROR|FATAL)\\s+-\\s+"), "upsert")
  #         # map to severity_text and severity_number
  #         # ("Trace", 1), ("Debug", 5), ("Info", 9), ("Warn", 13), ("Error", 17), ("Fatal", 21)
  #         # Ref: https://github.com/open-telemetry/opentelemetry-collector/blob/v0.129.0/pdata/plog/severity_number.go
  #         - set(attributes["log_level"], ToUpperCase(attributes["log_level"])) where attributes["log_level"] != nil
  #         - set(severity_text, "Trace") where attributes["log_level"] == "TRACE"
  #         - set(severity_number, 1) where attributes["log_level"] == "TRACE"
  #         - set(severity_text, "Debug") where attributes["log_level"] == "DEBUG"
  #         - set(severity_number, 5) where attributes["log_level"] == "DEBUG"
  #         - set(severity_text, "Info") where attributes["log_level"] == "INFO"
  #         - set(severity_number, 9) where attributes["log_level"] == "INFO"
  #         - set(severity_text, "Warn") where attributes["log_level"] == "WARN" or attributes["log_level"] == "WARNING"
  #         - set(severity_number, 13) where attributes["log_level"] == "WARN" or attributes["log_level"] == "WARNING"
  #         - set(severity_text, "Error") where attributes["log_level"] == "ERROR"
  #         - set(severity_number, 17) where attributes["log_level"] == "ERROR"
  #         - set(severity_text, "Fatal") where attributes["log_level"] == "FATAL"
  #         - set(severity_number, 21) where attributes["log_level"] == "FATAL"

exporters:
  debug: {}

  otlphttp/logs:
    logs_endpoint: http://<cubeapm_host>:3130/api/logs/insert/opentelemetry/v1/logs
    headers:
      Cube-Stream-Fields: log.file.path,severity
    retry_on_failure:
      enabled: true
      # initial_interval: 5s
      # max_interval: 30s
      # Set max_elapsed_time to longer value to survive longer outages of CubeAPM.
      # max_elapsed_time: 5m
    sending_queue:
      enabled: true
      # Queue depth limit. When this limit is reached, the exporter will start dropping logs.
      queue_size: 5000 # number of log batches, not logs.
      storage: file_storage

extensions:
  file_storage:
    directory: /var/otelcol/file_storage

service:
  extensions: [file_storage]

  pipelines:
    logs:
      receivers:
        - filelog
      processors:
        - transform/logs_parse_json_body
        # - transform/logs_extract_fields
        # - filter/logs
        # - transform/logs_redact
        - resourcedetection
        # - resource/cube.environment
        - batch
      exporters:
        # Uncomment to see final logs in collector's logs output.
        # - debug
        - otlphttp/logs

  telemetry:
    logs:
      level: info
    metrics:
      readers:
        - pull:
            exporter:
              prometheus:
                host: localhost
                port: 8888
```

</details>

A sample project with working Docker Compose setup is available at https://github.com/cubeapm/sample_logs_pipeline_otel.
