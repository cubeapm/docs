---
slug: /logs-apis
position: 1
---

# Logs API

## Instant Query API

The Instant Query API retrieves the value of a metric at a single point in time. It is useful for fetching the current state of a system or evaluating expressions for a specific timestamp.

**Endpoint:** `POST` `http://localhost:3125/api/logs/select/logsql/query`

### Form-encoded Payload Example

```text
query=<query>
limit=100
```

| Parameter | Type | Description |
|------------|------|-------------|
| `query` | `string` | The log query expression. This example filters logs where env="UNSET", restricts results to a specific _time range, and sorts them in descending order of time. |
| `limit` | `integer` | The maximum number of log entries to return. Default is `100`. |

1. Curl (Form-encoded)

```shell 
curl 'http://<cubeapm_server>:3130/api/logs/select/logsql/query' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'query=<query> \
  --data-urlencode 'limit=100'
```

### Response Parameters

| Field                         | Type     | Description                                                                      |
| :---------------------------- | :------- | :------------------------------------------------------------------------------- |
| `_time`                       | `string` | Timestamp of the log entry in ISO 8601 format.                                   |
| `_stream_id`                  | `string` | Unique identifier for the log stream.                                            |
| `_stream`                     | `string` | Contains metadata such as environment, service name, and severity.               |
| `_msg`                        | `string` | The main log message content.                                                    |
| `container.id`                | `string` | Unique ID of the container where the log originated.                             |
| `env`                         | `string` | Environment name (e.g., `production`, `staging`, `UNSET`).                       |
| `host.arch`                   | `string` | System architecture of the host (e.g., `aarch64`, `x86_64`).                     |
| `host.name`                   | `string` | Hostname or container name.                                                      |
| `os.description`              | `string` | Description of the operating system.                                             |
| `os.type`                     | `string` | OS type (e.g., `linux`, `windows`).                                              |
| `process.command_line`        | `string` | Full command used to start the process.                                          |
| `process.executable.path`     | `string` | Path to the executable binary.                                                   |
| `process.pid`                 | `string` | Process ID.                                                                      |
| `process.runtime.description` | `string` | Description of the runtime environment.                                          |
| `process.runtime.name`        | `string` | Name of the runtime (e.g., `OpenJDK Runtime Environment`).                       |
| `process.runtime.version`     | `string` | Version of the runtime environment.                                              |
| `service.instance.id`         | `string` | Unique instance ID of the service.                                               |
| `service.name`                | `string` | Name of the service or application generating the log.                                          |
| `severity`                    | `string` | Log severity level (e.g., `INFO`, `ERROR`, `DEBUG`).                             |
| `span_id`                     | `string` | Identifier for the specific span within a trace.                                 |
| `trace_id`                    | `string` | Unique trace ID for distributed tracing correlation.                             |
| `telemetry.distro.name`       | `string` | Name of the telemetry distribution (e.g., `opentelemetry-java-instrumentation`). |
| `telemetry.distro.version`    | `string` | Version of the telemetry distribution.                                           |
| `telemetry.sdk.language`      | `string` | Programming language used by the SDK.                                            |
| `telemetry.sdk.name`          | `string` | Name of the telemetry SDK.                                                       |
| `telemetry.sdk.version`       | `string` | Version of the telemetry SDK.                                                    |


### JSON Response Example

```json
{
    "_time": "2025-10-13T09:12:01.665306801Z",
    "_stream_id": "0000000100000000847aa29f7b9703df7835161f005721f0",
    "_stream": "{env=\"UNSET\",service.name=\"cube_sample_java_spring_boot_otel\",severity=\"INFO\"}",
    "_msg": "Completed initialization in 3 ms",
    "container.id": "4d368c1c1ef886e45c998bafdc93663208a0e38e6c478b558e83dcc34a3068f6",
    "env": "UNSET",
    "host.arch": "aarch64",
    "host.name": "4d368c1c1ef8",
    "os.description": "Linux 6.10.14-linuxkit",
    "os.type": "linux",
    "process.command_line": "/usr/lib/jvm/java-17-openjdk-arm64/bin/java -javaagent:./opentelemetry-javaagent.jar -XX:TieredStopAtLevel=1 sample_app_java_spring.sampleappjava.SampleAppJavaApplication",
    "process.executable.path": "/usr/lib/jvm/java-17-openjdk-arm64/bin/java",
    "process.pid": "51",
    "process.runtime.description": "Ubuntu OpenJDK 64-Bit Server VM 17.0.15+6-Ubuntu-0ubuntu120.04",
    "process.runtime.name": "OpenJDK Runtime Environment",
    "process.runtime.version": "17.0.15+6-Ubuntu-0ubuntu120.04",
    "service.instance.id": "8491891e-8dab-4d70-ae9c-29f67d54eb8c",
    "service.name": "cube_sample_java_spring_boot_otel",
    "severity": "INFO",
    "span_id": "23f7d43b32c0b23c",
    "telemetry.distro.name": "opentelemetry-java-instrumentation",
    "telemetry.distro.version": "2.20.1",
    "telemetry.sdk.language": "java",
    "telemetry.sdk.name": "opentelemetry",
    "telemetry.sdk.version": "1.54.1",
    "trace_id": "c7c1369bb478ff640385d1307b2cb088"
}
```