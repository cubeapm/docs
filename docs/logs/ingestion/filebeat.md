---
id: filebeat
title: "Filebeat"
slug: /logs/ingestion/filebeat
---

# Filebeat

Filebeat is a lightweight shipper for forwarding and centralizing log data. Installed as an agent on your servers, Filebeat monitors the log files or locations that you specify, collects log events, and forwards them either to different destinations like CubeAPM.

## Installation

### Method 1: Simplified Installation (Recommended)

We provide a simplified installation script that automatically detects your OS and architecture, and installs the appropriate Filebeat version with custom configuration.

```shell
sudo /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/cubeapm/filebeat-installation/main/filebeat-install.sh)"
```

### Method 2: Manual Installation

You can refer to this https://www.elastic.co/docs/reference/beats/filebeat/setup-repositories to install Filebeat package for your operating system.

After installing the Filebeat, you can run the following command to check the Filebeat service status:

```shell
sudo systemctl status filebeat.service
```

## Configuration

Using Filebeat you can send logs to CubeAPM using Elasticsearch output plugin.
Configure `output.elasticsearch` section in `filebeat.yml` as below:

```yaml
output.elasticsearch:
  hosts:
    - "http://<ip_address_of_cubeapm_server>:3130/api/logs/insert/elasticsearch/"
  parameters:
    _msg_field: "message"
    _time_field: "@timestamp"
    _stream_fields: "host.hostname,log.file.path"
  #allow_older_versions: true
  #worker: 8
  #bulk_max_size: 1000
  #compression_level: 1
```

Here's a sample Filebeat configuration file for collecting, processing and sending logs to CubeAPM.

<details>
<summary>filebeat.yml</summary>

```yaml
filebeat.inputs:
  - type: filestream
    enabled: true
    id: java_springboot_id
    paths:
      - /logs/*.log
    # include_lines: ['"service":"java_springboot"']
    parsers:
      - multiline:
          type: pattern
          pattern: "^[0-9]{4}-[0-9]{2}-[0-9]{2}"
          negate: true
          match: after
          flush_pattern: 2s
          timeout: 5s

filebeat.config:
  modules:
    path: ${path.config}/modules.d/*.yml
    reload.enabled: false

processors:
  - dissect:
      ##using dissect processor to parse the log message.
      tokenizer: "%{timestamp} %{+timestamp} [%{thread}] %{severity} %{class} %{environment} - %{message}"
      field: "message"
      target_prefix: ""
      overwrite_keys: true
  
  - script:
      ##using script to mask password from the logs.
      lang: javascript
      id: mask_sensitive_data
      source: >
        function process(event) {
            var msg = event.Get("message");
            if (msg) {
                event.Put("message", msg.replace(/password=\S+/g, "password=****"));
            }
        }
  
  - timestamp:
      ##using timestamp processor so that actual timestamp is set in @timestamp field 
      ##and not the time when log was ingested by Filebeat.
      field: "timestamp"
      layouts:
        - "2006-01-02 15:04:05.999"
      test:
        - "2025-12-22 11:44:52.135"
  
  - drop_fields:
      ##using drop_fields processor to drop the fields that are not required.
      fields:
        [
          "timestamp",
          "log.offset",
          "log.flags",
          "input.type",
          "agent.type",
          "agent.name",
          "agent.id",
          "agent.ephemeral_id",
        ]
      ignore_missing: true

  # - rename:
  #     fields:
  #       - from: "environment"
  #         to: "cube.environment"
  #     ignore_missing: false
  #     fail_on_error: true
  # - add_fields:
  #     target: "cube.environment"
  #     value: "PROD"

  - add_cloud_metadata: ~
  - add_docker_metadata: ~

## use disk-based queue
queue.disk:
  path: "/var/lib/filebeat"
  max_size: 2GB
  ##Filebeat pre-reads N events from disk into memory
  ##while waiting for the output to request them.
  ##Acts like a read buffer between disk and output
  read_ahead: 512 ##default value
  ##Filebeat buffers N events in memory before writing them to disk
  ##Acts like a write buffer between input and disk
  write_ahead: 2048 ##default value
  retry_interval: 5s
  max_retry_interval: 30s ##default value.

output.elasticsearch:
  hosts:
    - "http://<cubeapm_server_ip>:3130/api/logs/insert/elasticsearch"
  parameters:
    _msg_field: "message"
    _time_field: "@timestamp"
    _stream_fields: "log.file.path,severity"
    extra_fields: "cube.environment=PROD"
    # _cube.environment: "PROD"
  #allow_older_versions: true
  #worker: 8
  #bulk_max_size: 1600
  # compression_level: 1
  backoff.init: 1s
  backoff.max: 60s
  ##https://www.elastic.co/docs/reference/beats/filebeat/elasticsearch-output#_preset
  preset: balanced

logging.level: debug
logging.to_stderr: true
# logging.selectors: [input, harvester]

```
</details>

A sample project with working Docker Compose setup is available at https://github.com/cubeapm/sample_logs_pipeline_filebeat.

Reference: [Filebeat documentation](https://www.elastic.co/guide/en/beats/filebeat/current/elasticsearch-output.html).
