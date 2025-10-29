---
slug: /http-apis/traces-apis
---

# Traces

## Ingestion (sending traces to CubeAPM)

CubeAPM can receive traces from various APM agents. This makes it easy to integrate CubeAPM with a wide range of popular tools. Relevant details are available [here](../instrumentation/instrumentation.md).

## Querying (fetching traces from CubeAPM)

### Traces Search API

Traces Search API can be used to fetch traces matching desired conditions.

**Endpoint:** `GET` `http://<ip_address_of_cubeapm_server>:3140/api/traces/api/v1/search`

#### Request Parameters

| Parameter | Type             | Description                                                                                  |
| --------- | ---------------- | -------------------------------------------------------------------------------------------- |
| `query`   | `string`         | The traces query.                                                                            |
| `env`     | `string`         | Environment name.                                                                            |
| `service` | `string`         | Service name.                                                                                |
| `start`   | `string/integer` | Start timestamp. Can be provided either in RFC3339 format or as a Unix timestamp in seconds. |
| `end`     | `string/integer` | End timestamp. Can be provided either in RFC3339 format or as a Unix timestamp in seconds.   |
| `limit`   | `integer`        | The maximum number of results to return.                                                     |

#### curl

```shell
curl 'http://<ip_address_of_cubeapm_server>:3140/api/traces/api/v1/search?query=*&env=UNSET&service=order&start=1761666720&end=1761670320&limit=10'
```

#### Response Format

The API returns an array of matches. Each match is a snippet of a matching trace. For large traces, the snippet may contain only a small, but relevant, portion of the trace. Each snippet has the following structure.

| Field         | Type     | Description                                                                                                     |
| ------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `keySpanId`   | `string` | Base-64 encoded ID of the span that matched the search query.                                                   |
| `trace`       | `object` | The corresponding trace snippet.                                                                                |
| `trace.spans` | `array`  | Array of spans in the trace. Refer to the documentation of trace fetch api below for the structure of the span. |

For example

```json
[
  {
    "keySpanId": "2d4bjpT7FaA=",
    "trace": {
      "spans": [
        {
          "trace_id": "V5OPQPPw/3hScwih8m9RBg==",
          "span_id": "2d4bjpT7FaA=",
          "operation_name": "POST /v1/payment",
          "references": [
            {
              "trace_id": "V5OPQPPw/3hScwih8m9RBg==",
              "span_id": "901CCWrDT6M="
            }
          ],
          "start_time": "2025-10-29T03:55:04.90625352Z",
          "duration": 40965161,
          "tags": [
            {
              "key": "otel.library.name",
              "v_str": "io.opentelemetry.tomcat-7.0"
            },
            {
              "key": "http.client_ip",
              "v_str": "13.34.54.18"
            },
            {
              "key": "http.user_agent",
              "v_str": "curl/5.0"
            },
            {
              "key": "thread.id",
              "v_type": 2,
              "v_int64": 55
            },
            {
              "key": "http.response_content_length",
              "v_type": 2,
              "v_int64": 2
            },
            {
              "key": "http.route",
              "v_str": "/v1/payment"
            },
            {
              "key": "http.status_code",
              "v_type": 2,
              "v_int64": 200
            },
            {
              "key": "http.method",
              "v_str": "POST"
            },
            {
              "key": "http.request_content_length",
              "v_type": 2,
              "v_int64": 510
            },
            {
              "key": "net.host.name",
              "v_str": "notify.cubedemo.com"
            },
            {
              "key": "span.kind",
              "v_str": "server"
            }
          ],
          "logs": null,
          "process": {
            "service_name": "notify-service",
            "tags": [
              {
                "key": "telemetry.sdk.language",
                "v_str": "java"
              },
              {
                "key": "process.pid",
                "v_type": 2,
                "v_int64": 1
              },
              {
                "key": "cube.environment",
                "v_str": "UNSET"
              }
            ]
          }
        }
      ]
    }
  }
]
```

### Trace Fetch API

Trace Fetch API can be used to fetch a single trace by its ID. Data in `[start, end]` interval is searched to find the trace.

**Endpoint:** `GET` `http://<ip_address_of_cubeapm_server>:3140/api/traces/api/v1/traces/<trace_id>?start=<start>&end=<end>`

#### Request Parameters

| Parameter  | Type             | Description                                                                                  |
| ---------- | ---------------- | -------------------------------------------------------------------------------------------- |
| `trace_id` | `string`         | Hex-encoded ID of the trace.                                                                 |
| `start`    | `string/integer` | Start timestamp. Can be provided either in RFC3339 format or as a Unix timestamp in seconds. |
| `end`      | `string/integer` | End timestamp. Can be provided either in RFC3339 format or as a Unix timestamp in seconds.   |

#### curl

```shell
curl 'http://<ip_address_of_cubeapm_server>:3140/api/traces/api/v1/traces/61b66014b427bdb660622c89a29aefd1?start=1761666720&end=1761670320'
```

#### Response Format

| Field                          | Type      | Description                                                                                         |
| ------------------------------ | --------- | --------------------------------------------------------------------------------------------------- |
| `spans`                        | `array`   | Array os spans.                                                                                     |
| `spans[].trace_id`             | `string`  | Base-64 encoded Trace ID.                                                                           |
| `spans[].span_id`              | `string`  | Base-64 encoded Span ID.                                                                            |
| `spans[].operation_name`       | `string`  | Name of span.                                                                                       |
| `span[].references`            | `array`   | Array of trace references (e.g. parent). May be undefined.                                          |
| `span[].references[].trace_id` | `string`  | Base-64 encoded reference Trace ID.                                                                 |
| `span[].references[].span_id`  | `string`  | Base-64 encoded reference Span ID.                                                                  |
| `span[].start_time`            | `string`  | RFC3339 formatted start time of the span.                                                           |
| `span[].duration`              | `integer` | Duration of the span in nanoseconds.                                                                |
| `span[].tags`                  | `array`   | Tags (key/value pairs) associated with the span.                                                    |
| `span[].tags[].key`            | `string`  | Name of the tag.                                                                                    |
| `span[].tags[].v_type`         | `integer` | Indicates type of value. 0 or undefined => string, 1 => bool, 2 => int64, 3 => float64, 4 => binary |
| `span[].tags[].v_str`          | `string`  | String value if v_type is 0 or undefined.                                                           |
| `span[].tags[].v_bool`         | `bool`    | Boolean value if v_type is 1.                                                                       |
| `span[].tags[].v_int64`        | `integer` | Integer value if v_type is 2.                                                                       |
| `span[].tags[].v_float64`      | `float`   | Float value if v_type is 3.                                                                         |
| `span[].tags[].v_binary`       | `string`  | Base-64 encoded binary value if v_type is 4.                                                        |
| `span[].logs`                  | `array`   | Details of exceptions associated with the span.                                                     |
| `span[].logs[].timestamp`      | `string`  | RFC3339 formatted timestamp of the exception.                                                       |
| `span[].logs[].fields`         | `array`   | Details of the exception as key/value pairs.                                                        |
| `span[].process.service_name`  | `string`  | Name of the service to which the span belongs.                                                      |
| `span[].process.tags`          | `string`  | Tags (key/value pairs) associated with the service.                                                 |

For example

```json
{
  "spans": [
    {
      "trace_id": "YbZgFLQnvbZgYiyJoprv0Q==",
      "span_id": "3OCKrimamF0=",
      "operation_name": "paymentController.create",
      "references": [
        {
          "trace_id": "YbZgFLQnvbZgYiyJoprv0Q==",
          "span_id": "x9Yw4ZF4T80="
        }
      ],
      "flags": 0,
      "start_time": "2025-10-28T15:52:06.690981186Z",
      "duration": 82337723,
      "tags": [
        {
          "key": "thread.name",
          "v_str": "http-nio-9090-exec-4"
        },
        {
          "key": "otel.library.name",
          "v_str": "io.opentelemetry.spring-webmvc-3.1"
        },
        {
          "key": "otel.library.version",
          "v_str": "1.22.1-alpha"
        },
        {
          "key": "thread.id",
          "v_type": 2,
          "v_int64": 48
        },
        {
          "key": "span.kind",
          "v_str": "internal"
        }
      ],
      "logs": null,
      "process": {
        "service_name": "payment-service",
        "tags": [
          {
            "key": "host.name",
            "v_str": "ip-10-0-129-151"
          },
          {
            "key": "process.pid",
            "v_type": 2,
            "v_int64": 1
          },
          {
            "key": "telemetry.sdk.language",
            "v_str": "java"
          },
          {
            "key": "cube.environment",
            "v_str": "UNSET"
          }
        ]
      }
    }
  ]
}
```
