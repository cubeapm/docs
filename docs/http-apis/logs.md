---
slug: /http-apis/logs-apis
---

# Logs

## Ingestion (sending logs to CubeAPM)

CubeAPM can receive logs in various formats. This makes it easy to integrate CubeAPM with a wide range of popular tools. Relevant details are available [here](../logs/ingestion/ingestion.md).

## Querying (fetching logs from CubeAPM)

**Endpoint:** `POST` `http://<ip_address_of_cubeapm_server>:3140/api/logs/select/logsql/query`

### Request Parameters

| Parameter | Type             | Description                                                                                  |
| --------- | ---------------- | -------------------------------------------------------------------------------------------- |
| `query`   | `string`         | The log search query, including stream filters.                                              |
| `start`   | `string/integer` | Start timestamp. Can be provided either in RFC3339 format or as a Unix timestamp in seconds. |
| `end`     | `string/integer` | End timestamp. Can be provided either in RFC3339 format or as a Unix timestamp in seconds.   |
| `limit`   | `integer`        | The maximum number of log entries to return. Default is `100`.                               |

### curl

```shell
curl 'http://<cubeapm_server>:3140/api/logs/select/logsql/query' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'query={env="UNSET",service.name="order"} "Completed initialization" | sort by (_time) desc' \
  --data-urlencode 'start=2025-10-28T10:00:00Z' \
  --data-urlencode 'end=2025-10-28T10:00:10.100Z' \
  --data-urlencode 'limit=100'
```

### Response Format

The response format is newline-delimited JSON. Each log entry is contained in a JSON object and the various JSON objects are separated by newline character. Each JSON object has the following structure.

| Field         | Type     | Description                                                        |
| :------------ | :------- | :----------------------------------------------------------------- |
| `_time`       | `string` | Timestamp of the log entry in ISO 8601 format.                     |
| `_stream_id`  | `string` | Unique identifier for the log stream.                              |
| `_stream`     | `string` | Contains metadata such as environment, service name, and severity. |
| `_msg`        | `string` | The main log message content.                                      |
| `<log_field>` | `string` | Fields contained in the log entry.                                 |

For example

```json
{
  "_time": "2025-10-13T09:12:01.665306801Z",
  "_stream_id": "0000000100000000847aa29f7b9703df7835161f005721f0",
  "_stream": "{env=\"UNSET\",service.name=\"order\",severity=\"INFO\"}",
  "_msg": "Completed initialization in 3 ms",
  "container.id": "4d368c1c1ef886e45c998bafdc93663208a0e38e6c478b558e83dcc34a3068f6",
  "env": "UNSET",
  "host.arch": "aarch64",
  "host.name": "4d368c1c1ef8",
  "os.description": "Linux 6.10.14-linuxkit",
  "os.type": "linux",
  "process.pid": "51",
  "service.name": "order",
  "severity": "INFO",
  "telemetry.sdk.language": "java",
  "telemetry.sdk.name": "opentelemetry",
  "telemetry.sdk.version": "1.54.1",
  "trace_id": "c7c1369bb478ff640385d1307b2cb088"
}
```
