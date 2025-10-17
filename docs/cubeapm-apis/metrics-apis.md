---
slug: /metrics-apis
position: 2
---

# Metrics Query API

| API | Description | Endpoint |
|------|-------------|-----------|
| **Instant Query** | Fetch metric at a single point in time | `/api/metrics/api/v1/query` |
| **Query Range** | Fetch metrics over time range | `/api/metrics/api/v1/query_range` |


## Instant Query API

The Instant Query API retrieves the value of a metric at a single point in time. It is useful for fetching the current state of a system or evaluating expressions for a specific timestamp.

**Endpoint:** `POST` `http://<cubeapm_server>:3130/api/metrics/api/v1/query`

### Form-encoded Payload Example

```text
query=<query>
time=<1760419800>
step=<900>
```

| Parameter | Type | Description |
|------------|------|-------------|
| `query` | `string` | The PromQL expression you want to evaluate. |
| `time` | `integer` | Unix timestamp (in seconds) representing the instant at which to evaluate the query. |
| `step` | `integer` | Sampling interval in seconds (e.g., 900 for 15 minutes). |

1. Curl (Form-encoded)

```shell 
curl 'http://<cubeapm_server>:3130/api/metrics/api/v1/query' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'query=<query>' \
  --data-urlencode 'time=1760419800' \
  --data-urlencode 'step=900'
```

### Response Parameters

| Field | Type | Description |
|-------|------|-------------|
| `status` | `string` | `"success"` if the query executed correctly, `"error"` otherwise. |
| `isPartial` | `boolean` | Indicates if the result is partial due to incomplete data. |
| `data.resultType` | `string` | Type of result: `"vector"`, `"matrix"`, `"scalar"`, or `"string"`. |
| `data.result` | `array` | List of metric results. Each item contains: |
| `data.result[].metric` | `object` | Key-value pairs of metric labels (can be empty). |
| `data.result[].value` | `array` | `[timestamp, value]` — the timestamp in Unix seconds and the corresponding metric value as a string. |
| `stats.seriesFetched` | `string` | Number of time series fetched by the query. |
| `stats.executionTimeMsec` | `integer` | Time in milliseconds the query took to execute. |


### JSON Response Example

```json
{
    "status": "success",
    "isPartial": false,
    "data": {
        "resultType": "vector",
        "result": [
            {
                "metric": {},
                "value": [
                    1760419800,
                    "0.00300043554195535"
                ]
            }
        ]
    },
    "stats": {
        "seriesFetched": "12",
        "executionTimeMsec": 0
    }
}
```

## Query Range API

The Query Range API retrieves metric data over a range of time. It is commonly used for plotting graphs or analyzing historical performance.

**Endpoint:** `POST` `http://<cubeapm_server>:3130/api/metrics/api/v1/query_range?nocache=true`

### Form-encoded Payload Example

```text
query=<query>
start=<1760247000>
end=<1760419800>
step=<900>
```

| Parameter | Type | Description |
|------------|------|-------------|
| `query` | `string` | The PromQL expression you want to evaluate. |
| `start` | `integer` | Unix timestamp (in seconds) representing the start time of the query range. |
| `end` | `integer` | Unix timestamp (in seconds) representing the end time of the query range. |
| `step` | `integer` | Sampling interval in seconds (e.g., 900 for 15 minutes). |

1. Curl (Form-encoded)

```shell 
curl 'http://<cubeapm_server>:3130/api/metrics/api/v1/query_range' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'query=<query>' \
  --data-urlencode 'start=1760254200' \
  --data-urlencode 'end=1760254200' \
  --data-urlencode 'step=900'
```

### Response Parameters

| Field | Type | Description |
|-------|------|-------------|
| `status` | `string` | `"success"` if the query executed correctly, `"error"` otherwise. |
| `isPartial` | `boolean` | Indicates if the result is partial due to incomplete data. |
| `data.resultType` | `string` | Type of result: `"vector"`, `"matrix"`, `"scalar"`, or `"string"`. |
| `data.result` | `array` | List of metric results. Each item contains: |
| `data.result[].metric` | `object` | Key-value pairs of metric labels (can be empty). |
| `data.result[].value` | `array` | `[timestamp, value]` — the timestamp in Unix seconds and the corresponding metric value as a string. |
| `stats.seriesFetched` | `string` | Number of time series fetched by the query. |
| `stats.executionTimeMsec` | `integer` | Time in milliseconds the query took to execute. |

### JSON Response Example

```json
{
    "status": "success",
    "isPartial": false,
    "data": {
        "resultType": "matrix",
        "result": [
            {
                "metric": {},
                "values": [
                    [
                        1760341500,
                        "0.003422755399606299"
                    ],
                    [
                        1760342400,
                        "0.0024741669999999993"
                    ],
                    [
                        1760345100,
                        "0.003420891768172888"
                    ],
                    [
                        1760346900,
                        "0.001477216900355872"
                    ]
                ]
            }
        ]
    },
    "stats": {
        "seriesFetched": "12",
        "executionTimeMsec": 0
    }
}
```
