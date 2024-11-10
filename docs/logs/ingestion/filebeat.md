---
id: filebeat
title: "Filebeat"
slug: /logs/ingestion/filebeat
---

# Filebeat

Configure `output.elasticsearch` section in `filebeat.yml` as below:

```yaml
output.elasticsearch:
  hosts:
    - "http://<ip_address_of_cubeapm_server>:3130/api/logs/insert/elasticsearch"
  parameters:
    _msg_field: "message"
    _time_field: "@timestamp"
    _stream_fields: "host.hostname,log.file.path"
  #allow_older_versions: true
  #worker: 8
  #bulk_max_size: 1000
  #compression_level: 1
```

Reference: [Filebeat documentation](https://www.elastic.co/guide/en/beats/filebeat/current/elasticsearch-output.html).
