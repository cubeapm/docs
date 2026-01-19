---
slug: /logs/archive
sidebar_position: 3
---

# Archive

CubeAPM supports archiving logs data to S3 by using JuiceFS. See the left sidebar for configuration using different methods depending upon your CubeAPM setup.

<!-- ```shell
# Elastic
http://<ip_address_of_cubeapm_server>:3130/api/logs/insert/elasticsearch/_bulk

# Loki (Protobuf as well as JSON)
http://<ip_address_of_cubeapm_server>:3130/api/logs/insert/loki/api/v1/push

# OpenTelemetry Logs (Protobuf)
http://<ip_address_of_cubeapm_server>:3130/api/logs/insert/opentelemetry/v1/logs

# JSON (Newline delimited)
http://<ip_address_of_cubeapm_server>:3130/api/logs/insert/jsonline
``` -->
