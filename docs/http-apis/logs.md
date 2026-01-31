---
slug: /http-apis/logs-apis
---

# Logs

## Ingestion (sending logs to CubeAPM)

CubeAPM can receive logs in various formats. This makes it easy to integrate CubeAPM with a wide range of popular tools. Relevant details are available [here](../logs/ingestion/ingestion.md).

## Querying (fetching logs from CubeAPM)

**Endpoint:** `POST` `http://<ip_address_of_cubeapm_server>:3140/api/logs/select/logsql/query`

### Request Parameters {#query-request-parameters}

| Parameter | Type             | Description                                                                                  |
| --------- | ---------------- | -------------------------------------------------------------------------------------------- |
| `query`   | `string`         | The log search query, including stream filters.                                              |
| `start`   | `string/integer` | Start timestamp. Can be provided either in RFC3339 format or as a Unix timestamp in seconds. |
| `end`     | `string/integer` | End timestamp. Can be provided either in RFC3339 format or as a Unix timestamp in seconds.   |
| `limit`   | `integer`        | The maximum number of log entries to return. Default is `100`.                               |

### curl {#query-curl}

```shell
curl 'http://<cubeapm_server>:3140/api/logs/select/logsql/query' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'query={env="UNSET",service.name="order"} "Completed initialization" | sort by (_time) desc' \
  --data-urlencode 'start=2025-10-28T10:00:00Z' \
  --data-urlencode 'end=2025-10-28T10:00:10.100Z' \
  --data-urlencode 'limit=100'
```

### Response Format {#query-response-format}

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

CubeAPM can delete logs matching desired criteria.

:::info

- Deletion APIs are served over a separate _admin_ port for strict access control. Further, the admin port is disabled by default. Please contact cubeapm support for help with enabling it.
- If CubeAPM is running in cluster mode (multiple instances of CubeAPM), deletion APIs need to be executed separately for each instance.
- Deleted logs cannot be recovered. Use adequate caution when specifying filters for deletion.
  :::

### Run Delete Task

**Endpoint:** `POST` `http://<ip_address_of_cubeapm_server>:3199/api/logs/delete/run_task`

Starts a background task to delete logs matching the specified filter. The deletion task runs asynchronously and can be monitored or stopped using other APIs.

#### Request Parameters {#delete-run-task-request-parameters}

| Parameter | Type   | Description                                           |
| --------- | ------ | ----------------------------------------------------- |
| filter    | string | The logs query expression that selects logs to delete |

The filter parameter uses logs query syntax, e.g. `{env="production"} severity="ERROR" _time:[2025-01-01T00:00:00.000Z, 2025-01-02T00:00:00.000Z)`. For more details on query syntax, see the [Logs Querying documentation](../logs/querying.md).

#### curl {#delete-run-task-curl}

```bash
curl 'http://<cubeapm_server>:3199/api/logs/delete/run_task' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'filter={env="production",service.name="order"} severity="ERROR" _time:[2025-01-01T00:00:00.000Z, 2025-01-02T00:00:00.000Z)'
```

#### Response Format {#delete-run-task-response-format}

The response is a JSON object containing the task ID:

| Field   | Type   | Description                                                                              |
| ------- | ------ | ---------------------------------------------------------------------------------------- |
| task_id | string | Unique identifier for the delete task. Use this ID to stop the task or check its status. |

**Example Response:**

```json
{
  "task_id": "1738060800000000000"
}
```

### Stop Delete Task

**Endpoint:** `POST` `http://<ip_address_of_cubeapm_server>:3199/api/logs/delete/stop_task`

Stops a running delete task. Once stopped, the task will not continue deleting logs. Note that logs already deleted will not get restored.

#### Request Parameters {#delete-stop-task-request-parameters}

| Parameter | Type   | Description                                                  |
| --------- | ------ | ------------------------------------------------------------ |
| task_id   | string | The task ID returned from the `run_task` endpoint. Required. |

#### curl {#delete-stop-task-curl}

```bash
curl 'http://<cubeapm_server>:3199/api/logs/delete/stop_task' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'task_id=1738060800000000000'
```

#### Response Format {#delete-stop-task-response-format}

The response is a JSON object indicating success:

| Field  | Type   | Description                                       |
| ------ | ------ | ------------------------------------------------- |
| status | string | Status of the operation. Returns "ok" on success. |

**Example Response:**

```json
{
  "status": "ok"
}
```

### List Active Delete Tasks

**Endpoint:** `GET` `http://<ip_address_of_cubeapm_server>:3199/api/logs/delete/active_tasks`

Returns a list of all currently active (running or pending) delete tasks.

#### Request Parameters {#delete-active-tasks-request-parameters}

This endpoint does not require any parameters.

#### curl {#delete-active-tasks-curl}

```bash
curl 'http://<cubeapm_server>:3199/api/logs/delete/active_tasks'
```

#### Response Format {#delete-active-tasks-response-format}

The response is a JSON array of delete task objects. Each task object has the following structure:

| Field      | Type   | Description                                              |
| ---------- | ------ | -------------------------------------------------------- |
| task_id    | string | Unique identifier for the delete task.                   |
| filter     | string | The LogsQL filter expression used for deletion.          |
| start_time | string | Timestamp when the task was created, in ISO 8601 format. |

**Example Response:**

```json
[
  {
    "task_id": "1738060800000000000",
    "filter": "{env=\"production\",service.name=\"order\"} severity=\"ERROR\"",
    "start_time": "2025-01-28T10:00:00Z"
  },
  {
    "task_id": "1738060900000000000",
    "filter": "{env=\"staging\"} _time:<2025-01-01T00:00:00Z",
    "start_time": "2025-01-28T11:00:00Z"
  }
]
```
