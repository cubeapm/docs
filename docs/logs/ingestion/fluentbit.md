---
id: fluentbit
title: "Fluentbit"
slug: /logs/ingestion/fluentbit
---

# Fluentbit

## Loki

Specify `loki` output section in `fluentbit.conf` as below:

```
[OUTPUT]
    name loki
    match *
    host <ip_address_of_cubeapm_server>
    port 3130
    uri /api/logs/insert/loki/api/v1/push
    label_keys $path,$log,$time
    header Cube-Msg-Field log
    header Cube-Time-Field time
    header Cube-Stream-Fields path
    #compress gzip
    #auto_kubernetes_labels on
```

Reference: [Fluentbit Loki documentation](https://docs.fluentbit.io/manual/pipeline/outputs/loki).

## HTTP

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
    #auto_kubernetes_labels on
```

Reference: [Fluentbit HTTP documentation](https://docs.fluentbit.io/manual/pipeline/outputs/http).
