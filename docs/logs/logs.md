---
slug: /logs
sidebar_position: 5
---

# Logs

CubeAPM supports aggregating logs from a wide range of agents - Elastic (Logstash, Fluent, etc.), Loki, OpenTelemetry, Vector, and more. It can ingest structured as well as unstructured logs.

Each log entry in CubeAPM is stored as an object with string keys and string values, e.g.,

```json
{
  "_time": "2024-11-06T13:42:05.234Z",
  "service": "order-service",
  "host.name": "ip-10-0-129-151",
  "host.ip": "10.0.129.151",
  "trace_id": "22cba212a1b34d49b009a22fb13b82ee",
  "_msg": "order rejected as some items are out of stock"
}
```

If the incoming log has nested JSON, it is flattened. For example, the below incoming object will be converted to the one above:

```json
{
  "_time": "2024-11-06T13:42:05.234Z",
  "service": "order-service",
  "host": {
    "name": "ip-10-0-129-151",
    "ip": "10.0.129.151"
  },
  "trace_id": "22cba212a1b34d49b009a22fb13b82ee",
  "_msg": "order rejected as some items are out of stock"
}
```

There can be any arbitrary fields in the log message. Each field is indexed to provide full text search.

Some field names have special significance in CubeAPM. These are described below:

### \_msg

This field provides support for unstructured logs. For example, an unstructured log entry (or some unstructured part within an otherwise structured log) can be ingested as:

```json
{ "_msg": "this is an unstructured log message" }
```

If the message field has some other name than `_msg`, it can be specified via `_msg_field` URL query parameter or via `Cube-Msg-Field` HTTP header in the data ingestion request. For example, if the log message is located in the `event.description` field, then specify `_msg_field=event.description` URL query parameter.

### \_time

If the ingested log contains a field with this name, its value is taken as the timestamp of the log entry. Otherwise the ingestion timestamp is used. The value must be formatted in ISO8601, RFC3339, or Unix timestamp (seconds or milliseconds).

If the time field has some other name than `_time`, it can be specified via `_time_field` URL query parameter or via `Cube-Time-Field` HTTP header in the data ingestion request.

### Stream fields

Internally, CubeAPM organizes logs by _streams_. Taking the analogy of filesystems, streams can be thought of as folders and individual log lines can be thought of as files. Organizing logs by streams is not mandatory but it helps in improving search experience as well as performance.

Certain fields in the log entry can be designated as stream fields. A combination of the values of these fields will then uniquely identify the stream to which the log entry belongs. Stream fields can be specified via `_stream_fields` URL query parameter or via `Cube-Stream-Fields` HTTP header in the data ingestion request.

:::tip
Fields with low cardinality (i.e. less number of distinct values) are good candidates for using as stream fields, e.g., service.name, service.version, etc.

Fields with high cardinality (i.e. large number of unique values) are bad candidates for using as stream fields, e.g., trace_id, ip_address, timestamp, etc. Using high cardinality fields as stream fields can significantly deteriorate the performance of CubeAPM.

Note that CubeAPM allows searching over non-stream fields as well, so you can search over high cardinality fields even without designating them as stream fields.
:::
