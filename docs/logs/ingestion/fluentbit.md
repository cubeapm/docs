---
id: fluentbit
title: "Fluentbit"
slug: /logs/ingestion/fluentbit
---

# Fluentbit

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
```

Reference: [Fluentbit HTTP documentation](https://docs.fluentbit.io/manual/pipeline/outputs/http).

## Elasticsearch

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

## Loki

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
