---
id: fluentd
title: "Fluentd"
slug: /logs/ingestion/fluentd
---

# Fluentd

Fluentd (td-agent) is an open-source data collector that unifies log and event data collection, processing, and forwarding from various sources to different destinations like CubeAPM.

Fluentd can be installed on Linux, Windows, and Mac. Pre-built packages for popular package managers (apt, rpm, etc.) are available at https://docs.fluentd.org/installation/install-fluent-package. Visit the link, look for the specific package for your os and cpu architecture, and download it.

:::info
There are two variants of Fluentd available - **fluentd** and **calyptia-fluentd**. Fluentd is written in Ruby for flexibility, with performance-sensitive parts in C. However, some users may have difficulty installing and operating a Ruby daemon.

That is why Chronosphere (formerly Calyptia) provides the alternative stable distribution of Fluentd, called `calyptia-fluentd`. For more about this visit at https://docs.fluentd.org/installation/install-calyptia-fluentd.
:::

## Installation

### Method 1: Simplified Installation (Recommended)

We provide a simplified installation script that automatically detects your OS and architecture, and installs the appropriate Fluentd version with custom configuration.

```shell
sudo /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/cubeapm/fluentd-installation/main/fluentd-install.sh)"
```

### Method 2: Manual Installation

You can refer to this https://docs.fluentd.org/installation/install-fluent-package to install Fluentd package for your os and cpu architecture.

After installing the Fluentd, you can run the following command to start the Fluentd service:

```shell
sudo systemctl start fluentd.service
sudo systemctl status fluentd.service
```

## Configuration

Using Fluentd you can send logs to CubeAPM using HTTP output plugin.
Specify `http` output section in `fluentd.conf` as below:

```
<match **>
  @type http
  endpoint "http://<ip_address_of_cubeapm_server>:3130/api/logs/insert/jsonline"
  headers {"Cube-Msg-Field": "log", "Cube-Time-Field": "time", "Cube-Stream-Fields": "path"}
</match>
```

Here's a sample Fluentd configuration file for collecting, processing and sending logs to CubeAPM.

<details>
<summary>fluentd.conf</summary>

```config
<system>
  log_level debug
</system>

<source>
  @type tail
  path /logs/app.log
  pos_file /var/log/td-agent/java-app.pos
  tag java_springboot
  read_from_head false
  # emit_unmatched_lines true
  <parse java_springboot>
    @type multiline
    format_firstline /\d{4}-\d{1,2}-\d{1,2}/
    format1 /^(?<message>(?<timestamp>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d+)\s+\[(?<thread>[^\]]+)\]\s+(?<severity>\w+)\s+(?<class>[^\s]+)\s+-\s+[\s\S]*)/
    ##https://docs.fluentd.org/configuration/inject-section#time-parameters
    time_key timestamp
    keep_time_key false
    time_type string
    time_format '%Y-%m-%d %H:%M:%S.%N'
  </parse>
  emit_unmatched_lines true
</source>

<filter java_springboot>
  @type record_transformer
  enable_ruby true
  <record>
    service java_springboot
    hostname "#{Socket.gethostname}"
    # timestamp ${record["timestamp"]}
    # timestamp ${time.getlocal("+05:30").strftime('%Y-%m-%d %H:%M:%S.%N')}
    timestamp ${time.strftime('%Y-%m-%d %H:%M:%S.%N+00:00')}
    # message ${record["message"].gsub(/(?i)password[=:]\s*[^,\s]+/, 'password=***')}
  </record>
</filter>


<match java_springboot>
  @type http
  endpoint "http://<cubeapm_server_ip>:3130/api/logs/insert/jsonline"
  headers {"Cube-Msg-Field": "message", "Cube-Time-Field": "timestamp", "Cube-Stream-Fields": "hostname", "Cube-Stream-Fields": "severity"}
  open_timeout 2

  <buffer java_springboot, time>
    @type file
    path /var/log/td-agent/
    timekey 30
    #At every flush_interval, flush_mode send data to backend-service
    flush_mode interval
    flush_interval 5s
    flush_thread_burst_interval 1
    #Number of parallel worker threads for flushing chunks.
    ##flush_thread_count 1
    #Sleep 1s before checking again
    ##flush_thread_interval 1.0 
    #Sleep 1s between flush attempts
    ##flush_thread_burst_interval 1.0
    #With this setting, regardless of event size, 
    #once 5000 log records accumulate, the chunk flushes. 
    #This is beneficial when your output destination (like CubeAPM or a data warehouse) 
    #performs better with consistent batch sizes.
    chunk_limit_records 5000
    #Here, with total_limit_size 2GB, 
    #your Fluentd instance can queue up to 8 chunks 
    #(at 256MB each) before rejecting new data. 
    #This is especially important if your output destination 
    #becomes temporarily unavailable—
    #the buffer prevents Fluentd from 
    #consuming all available system memory.
    total_limit_size 2GB
    # using chunk_full_threshold give you control over how much chunk_limit_size is need
    # to be filled before a chunk is flushed. Like request & limit
    chunk_full_threshold 0.80
    # what happens when your buffer queue fills up
    # simply block the input plugin from accepting new events or reading new events from the file.
    overflow_action block
    # flush all the pending chunks at the graceful shutdown
    flush_at_shutdown true
    #Number of parallel worker threads for flushing chunks.
    flush_thread_count 4
    #Maximum time to keep retrying failed flushes before giving up.
    #Default: 72h
    retry_timeout 72h
    #Number of times to retry failed flushes.
    retry_max_times 1000
    #In what way to retry failed flushes.
    retry_type periodic
    #Wait time between retry attempts.
    retry_wait 5s
    ##retry_max_interval 300s
    retry_randomize true
    # timekey_zone Asia/Kolkata
  </buffer>
</match>
```
</details>

A sample project with working Docker Compose setup is available at https://github.com/cubeapm/sample_logs_pipeline_fluentd.

Reference: [Fluentd documentation](https://docs.fluentd.org/).
