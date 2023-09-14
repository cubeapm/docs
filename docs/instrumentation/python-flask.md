---
id: pythonflask
title: "Python Flask"
slug: /instrumentation/python-flask
---

## Prerequisites

Python 3

## Installation

1. Install dependencies:

   ```shell
   pip install opentelemetry-distro opentelemetry-exporter-otlp
   opentelemetry-bootstrap -a install
   ```

2. Modify the application run command as follows:

   ```shell
   opentelemetry-instrument \
       --metrics_exporter none \
       --traces_exporter otlp \
       --exporter_otlp_traces_endpoint http://<ip_address_of_cubeapm_server>:4317 \
       --exporter_otlp_compression gzip \
       --service_name <app_name> \
       flask run -p 8080
   ```

   Alternatively, the following environment variables can be set:

   ```shell
   OTEL_METRICS_EXPORTER=none
   OTEL_TRACES_EXPORTER=otlp
   OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4317
   OTEL_EXPORTER_OTLP_COMPRESSION=gzip
   OTEL_SERVICE_NAME=<app_name>
   ```

## Troubleshooting

Traces exporter can be changed from `otlp` to `console` to output traces on console.

The following command can be tried on the application host server to check connectivity to CubeAPM server(s):

```shell
telnet <ip_address_of_cubeapm_server> 4317
```

## Notes

1. Additional steps need to be followed for setups with uWSGI/Gunicorn. Please follow the following resources:

   1. https://opentelemetry-python.readthedocs.io/en/latest/examples/fork-process-model/README.html
