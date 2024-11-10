---
slug: /logs/ingestion
sidebar_position: 1
---

# Ingestion

CubeAPM receives logs data on the below endpoints. See the left sidebar for configuration using popular log shippers.

```shell
# Elastic
http://<ip_address_of_cubeapm_server>:3130/api/logs/insert/elasticsearch/_bulk

# Loki (Protobuf as well as JSON)
http://<ip_address_of_cubeapm_server>:3130/api/logs/insert/loki/api/v1/push

# OpenTelemetry Logs (Protobuf)
http://<ip_address_of_cubeapm_server>:3130/api/logs/insert/opentelemetry/v1/logs

# JSON (Newline delimited)
http://<ip_address_of_cubeapm_server>:3130/api/logs/insert/jsonline
```
