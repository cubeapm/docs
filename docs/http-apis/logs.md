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

## Deletion (delete logs from CubeAPM)

CubeAPM provides APIs for deleting logs based on filters. This allows you to remove logs that match specific criteria, such as logs from a particular service, environment, or time range.

## Run Delete Task

**Endpoint:** `POST` `http://<ip_address_of_cubeapm_server>:3199/api/logs/delete/run_task`

Starts a background task to delete logs matching the specified filter. The deletion task runs asynchronously and can be monitored or stopped using other endpoints.

### Request Parameters

| Parameter | Type   | Description                                                                                  |
| --------- | ------ | -------------------------------------------------------------------------------------------- |
| filter    | string | The LogsQL filter expression that defines which logs to delete. This uses the same filter syntax as log queries. |

### Filter Syntax

The filter parameter uses LogsQL filter syntax. Common examples include:

- Stream filters: `{env="production",service.name="order"}`
- Field filters: `severity="ERROR"`
- Combined filters: `{env="production"} severity="ERROR"`
- Time-based filters: `_time:>=2025-01-01T00:00:00Z`

For more details on filter syntax, see the [LogsQL documentation](https://docs.victoriametrics.com/victorialogs/logsql/#filters).

### curl

```bash
curl 'http://<cubeapm_server>:3199/api/logs/delete/run_task' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'filter={env="production",service.name="order"} severity="ERROR"'
```

### Response Format

The response is a JSON object containing the task ID:

| Field   | Type   | Description                                    |
| ------- | ------ | ---------------------------------------------- |
| task_id | string | Unique identifier for the delete task. Use this ID to stop the task or check its status. |

**Example Response:**

```json
{
  "task_id": "1738060800000000000"
}
```

## Stop Delete Task

**Endpoint:** `POST` `http://<ip_address_of_cubeapm_server>:3199/api/logs/delete/stop_task`

Stops a running delete task. Once stopped, the task will not continue deleting logs.

### Request Parameters

| Parameter | Type   | Description                                                      |
| --------- | ------ | ---------------------------------------------------------------- |
| task_id   | string | The task ID returned from the `run_task` endpoint. Required.    |

### curl

```bash
curl 'http://<cubeapm_server>:3199/api/logs/delete/stop_task' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'task_id=1738060800000000000'
```

### Response Format

The response is a JSON object indicating success:

| Field  | Type   | Description                    |
| ------ | ------ | ------------------------------ |
| status | string | Status of the operation. Returns "ok" on success. |

**Example Response:**

```json
{
  "status": "ok"
}
```

## List Active Delete Tasks

**Endpoint:** `GET` `http://<ip_address_of_cubeapm_server>:3199/api/logs/delete/active_tasks`

Returns a list of all currently active (running or pending) delete tasks.

### Request Parameters

This endpoint does not require any parameters.

### curl

```bash
curl 'http://<cubeapm_server>:3199/api/logs/delete/active_tasks'
```

### Response Format

The response is a JSON array of delete task objects. Each task object has the following structure:

| Field      | Type     | Description                                                      |
| ---------- | -------- | ---------------------------------------------------------------- |
| task_id    | string   | Unique identifier for the delete task.                           |
| tenant_ids | string[] | Array of tenant IDs associated with the task.                    |
| filter     | string   | The LogsQL filter expression used for deletion.                  |
| start_time | string   | Timestamp when the task was created, in ISO 8601 format.         |

**Example Response:**

```json
[
  {
    "task_id": "1738060800000000000",
    "tenant_ids": ["0"],
    "filter": "{env=\"production\",service.name=\"order\"} severity=\"ERROR\"",
    "start_time": "2025-01-28T10:00:00Z"
  },
  {
    "task_id": "1738060900000000000",
    "tenant_ids": ["0"],
    "filter": "{env=\"staging\"} _time:<2025-01-01T00:00:00Z",
    "start_time": "2025-01-28T11:00:00Z"
  }
]
```

## Notes

- Delete tasks run asynchronously in the background. Large deletions may take time to complete.
- Use the `active_tasks` endpoint to monitor the progress of delete operations.
- You can stop a running delete task at any time using the `stop_task` endpoint.
- Deleted logs cannot be recovered. Use caution when specifying filters for deletion.
