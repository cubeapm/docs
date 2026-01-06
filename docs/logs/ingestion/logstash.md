---
id: logstash
title: "Logstash"
slug: /logs/ingestion/logstash
---

# Logstash

Logstash is an open source data collection engine with real-time pipelining capabilities. Logstash can dynamically unify data from disparate sources and normalize the data into destinations of your choice like CubeAPM. Cleanse and democratize all your data for diverse advanced downstream analytics and visualization use cases.

While Logstash originally drove innovation in log collection, its capabilities extend well beyond that use case. Any type of event can be enriched and transformed with a broad array of input, filter, and output plugins, with many native codecs further simplifying the ingestion process. Logstash accelerates your insights by harnessing a greater volume and variety of data.

## Installation

### Method 1: Simplified Installation (Recommended)

We provide a simplified installation script that automatically detects your OS and architecture, and installs the appropriate Logstash version with custom configuration.

```shell
sudo /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/cubeapm/logstash-installation/main/logstash-install.sh)"
```

### Method 2: Manual Installation

You can refer to this https://www.elastic.co/docs/reference/logstash/installing-logstash to install Logstash package for your os and cpu architecture.

After installing the Logstash, you can run the following command to start the Logstash service:

```shell
sudo systemctl start logstash.service
sudo systemctl status logstash.service
```

## Configuration

Using Logstash you can send logs to CubeAPM using elasticsearch output plugin.
Configure `elasticsearch` output plugin in `logstash.conf` file as below:

```
output {
  elasticsearch {
    hosts => ["http://<ip_address_of_cubeapm_server>:3130/api/logs/insert/elasticsearch/"]
    parameters => {
      "_msg_field" => "message"
      "_time_field" => "@timestamp"
      "_stream_fields" => "host.name,process.name"
    }
  }
}
```

Here's a sample Logstash configuration file for collecting, processing and sending logs to CubeAPM.

<details>
<summary>logstash.conf</summary>

```config
input {
  file {
    path => "/logs/*.log"
    start_position => "end"
    # sincedb_path => "/sincedb/sincedb"
    # codec => "plain"
    codec => multiline {
      # Grok pattern names are valid! :)
      pattern => "^%{TIMESTAMP_ISO8601} "
      negate => true
      what => "previous"
    }
  }
}

filter {
  # Extract message after " - "
  grok {
    match => { 
      # "original" => "%{TIMESTAMP_ISO8601:timestamp} \[%{DATA:thread}\] %{LOGLEVEL:severity} %{DATA:logger} - %{GREEDYDATA:extracted_message}" 
      "message" => "%{TIMESTAMP_ISO8601:timestamp} \[%{DATA:thread}\] %{LOGLEVEL:severity} %{DATA:logger} - %{GREEDYDATA:extracted_message}" 
    }
    tag_on_failure => ["grok_parse_failure"]
  }


  # Parse the timestamp matching the "timestamp" field from grok
  date {
    match => [ "timestamp", "ISO8601", "yyyy-MM-dd HH:mm:ss.SSS", "yyyy-MM-dd HH:mm:ss,SSS" ]
    tag_on_failure => [ "date_parse_failure" ]
    target => "@timestamp"
  }

  # MASK SENSITIVE DATA
  mutate {
    gsub => [
      # "extracted_message", "password=[^,\s]*", "password=****"
      "message", "password=[^,\s]*", "password=****"
    ]
    tag_on_failure => [ "mutate_gsub_failure" ]
  }
  # MASK password in event.original (raw original log line)
  # if [event] and [event][original] {
  #   mutate {
  #     gsub => [
  #       "[event][original]", "(?i)password=[^,\\s]*", "password=****"
  #     ]
  #   }
  # }
  
  # Replace message with extracted part, remove prefix fields
  mutate {
    # rename => { "extracted_message" => "message"}
    rename => { "path" => "log.file.path"}
    remove_field => [ "tags", "extracted_message", "timestamp" ]
  }
}



output {
  elasticsearch {
    hosts => ["http://host.docker.internal:3130/api/logs/insert/elasticsearch/"]
    parameters => {
      "_msg_field" => "message"
      "_time_field" => "@timestamp"
      "_stream_fields" => "host,severity"
    }
    # number of open connections to the backend
    pool_max => 100
    # Resurrection is the process by which backend endpoints marked down are checked 
    # to see if they have come back to life.
    resurrect_delay => 5
    # Set initial interval in seconds between bulk retries. 
    # Doubled on each retry up to retry_max_interval
    retry_initial_interval => 2
    # Set max interval in seconds between bulk retries.
    retry_max_interval => 64
    # timeout => 60 ##Default value is 60 seconds
  }
  
  stdout {
    codec => rubydebug
  }
}
```

</details>

<details>
<summary>logstash.yml</summary>

```yaml
# logstash.yml
queue.type: persisted
path.queue: "/var/lib/logstash/queue"
## queue.page_capacity: 64mb ##by default value is 64MB
# Specify true if you want Logstash to wait until the persistent queue is drained
# before shutting down. The amount of time it takes to drain the queue
# depends on the number of events that have accumulated in the queue.
# Therefore, you should avoid using this setting unless the queue,
# even when full, is relatively small and can be drained quickly.
## queue.drain: true
# The total capacity of each queue in number of bytes.
queue.max_bytes: 2gb
queue.checkpoint.writes: 1 # After 1024 writes → checkpoint
queue.checkpoint.acks: 1 # After 1024 ACKs → checkpoint
queue.checkpoint.interval: 1000 # Every 1s → checkpoint (backup)

```
</details>

A sample project with working Docker Compose setup is available at https://github.com/cubeapm/sample_logs_pipeline_logstash.

Reference: [Logstash Elasticsearch documentation](https://www.elastic.co/guide/en/logstash/current/plugins-outputs-elasticsearch.html).
