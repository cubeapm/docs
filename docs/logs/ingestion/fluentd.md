---
id: fluentd
title: "Fluentd"
slug: /logs/ingestion/fluentd
---

# Fluentd

Fluentd can send logs to CubeAPM using the `http` output plugin. Specify `http` output section in `fluentd.conf` as below:

```
<match **>
  @type http
  endpoint "http://<ip_address_of_cubeapm_server>:3130/api/logs/insert/jsonline"
  headers {"Cube-Msg-Field": "log", "Cube-Time-Field": "time", "Cube-Stream-Fields": "path"}
</match>
```

Reference: [Fluentd HTTP documentation](https://docs.fluentd.org/output/http).

A sample project with working Docker Compose setup is available at https://github.com/cubeapm/sample_logs_pipeline_fluentd.
