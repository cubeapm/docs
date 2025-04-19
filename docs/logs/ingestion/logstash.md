---
id: logstash
title: "Logstash"
slug: /logs/ingestion/logstash
---

# Logstash

Configure elasticsearch output plugin in logstash conf file as below:

```
output {
  logstash {
    hosts => ["http://<ip_address_of_cubeapm_server>:3130/api/logs/insert/elasticsearch/"]
    parameters => {
      "_msg_field" => "message"
      "_time_field" => "@timestamp"
      "_stream_fields" => "host.name,process.name"
    }
  }
}
```

Reference: [Logstash documentation](https://www.elastic.co/guide/en/logstash/current/plugins-outputs-logstash.html).
