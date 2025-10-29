---
slug: /http-apis/metrics-apis
---

# Metrics

## Ingestion (sending metrics to CubeAPM)

CubeAPM can ingest metrics in OpenTelemetry (OTLP) and Prometheus formats.

**OTLP Endpoint:** `POST` `http://<ip_address_of_cubeapm_server>:3130/api/metrics/v1/save/otlp`

**Prometheus Text Exposition Endpoint:** `POST` `http://<ip_address_of_cubeapm_server>:3130/api/metrics/v1/save`

**Prometheus Remote Write Endpoint:** `POST` `http://<ip_address_of_cubeapm_server>:3130/api/metrics/api/v1/write`

## Querying (fetching metrics from CubeAPM)

### Instant Query API

The Instant Query API evaluates the specified query at a single point in time. It is useful for fetching the current state of a system or evaluating expressions for a specific timestamp.

**Endpoint:** `POST` `http://<ip_address_of_cubeapm_server>:3140/api/metrics/api/v1/query`

#### Request Parameters

| Parameter | Type             | Description                                                                                                              |
| --------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `query`   | `string`         | The metrics query.                                                                                                       |
| `time`    | `string/integer` | Time instant at which to evaluate the query. Can be provided either in RFC3339 format or as a Unix timestamp in seconds. |
| `step`    | `integer`        | (Optional) Time window in seconds over which to process data.                                                            |

#### curl

```shell
curl 'http://<ip_address_of_cubeapm_server>:3140/api/metrics/api/v1/query' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'query=<query>' \
  --data-urlencode 'time=1760419800' \
  --data-urlencode 'step=900'
```

#### Response Format

The response format is compatible with Prometheus instant query API response format.

| Field                  | Type      | Description                                                                                          |
| ---------------------- | --------- | ---------------------------------------------------------------------------------------------------- |
| `status`               | `string`  | `"success"` if the query executed correctly, `"error"` otherwise.                                    |
| `isPartial`            | `boolean` | Indicates if the result is partial due to incomplete data.                                           |
| `data.resultType`      | `string`  | Type of result: `"vector"`, `"matrix"`, `"scalar"`, or `"string"`.                                   |
| `data.result`          | `array`   | List of metric results.                                                                              |
| `data.result[].metric` | `object`  | Key-value pairs of metric labels (can be empty).                                                     |
| `data.result[].value`  | `array`   | `[timestamp, value]` — the timestamp in Unix seconds and the corresponding metric value as a string. |

For example

```json
{
  "status": "success",
  "isPartial": false,
  "data": {
    "resultType": "vector",
    "result": [
      {
        "metric": {
          "service": "order"
        },
        "value": [1760419800, "0.00300043554195535"]
      }
    ]
  }
}
```

### Range Query API

The Range Query API processes metric data over a range of time. It is commonly used for plotting graphs or analyzing historical performance.

**Endpoint:** `POST` `http://<ip_address_of_cubeapm_server>:3140/api/metrics/api/v1/query_range`

#### Request Parameters

| Parameter | Type             | Description                                                                                  |
| --------- | ---------------- | -------------------------------------------------------------------------------------------- |
| `query`   | `string`         | The metrics query.                                                                           |
| `start`   | `string/integer` | Start timestamp. Can be provided either in RFC3339 format or as a Unix timestamp in seconds. |
| `end`     | `string/integer` | End timestamp. Can be provided either in RFC3339 format or as a Unix timestamp in seconds.   |
| `step`    | `integer`        | Query resolution step width in seconds.                                                      |

#### curl

```shell
curl 'http://<ip_address_of_cubeapm_server>:3140/api/metrics/api/v1/query_range' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'query=<query>' \
  --data-urlencode 'start=1760254200' \
  --data-urlencode 'end=1760254200' \
  --data-urlencode 'step=900'
```

#### Response Format

| Field                  | Type      | Description                                                                                          |
| ---------------------- | --------- | ---------------------------------------------------------------------------------------------------- |
| `status`               | `string`  | `"success"` if the query executed correctly, `"error"` otherwise.                                    |
| `isPartial`            | `boolean` | Indicates if the result is partial due to incomplete data.                                           |
| `data.resultType`      | `string`  | Type of result: `"vector"`, `"matrix"`, `"scalar"`, or `"string"`.                                   |
| `data.result`          | `array`   | List of metric results. Each item contains:                                                          |
| `data.result[].metric` | `object`  | Key-value pairs of metric labels (can be empty).                                                     |
| `data.result[].value`  | `array`   | `[timestamp, value]` — the timestamp in Unix seconds and the corresponding metric value as a string. |

For example

```json
{
  "status": "success",
  "isPartial": false,
  "data": {
    "resultType": "matrix",
    "result": [
      {
        "metric": {
          "service": "order"
        },
        "values": [
          [1760341500, "0.003422755399606299"],
          [1760342400, "0.0024741669999999993"],
          [1760345100, "0.003420891768172888"],
          [1760346900, "0.001477216900355872"]
        ]
      }
    ]
  }
}
```
