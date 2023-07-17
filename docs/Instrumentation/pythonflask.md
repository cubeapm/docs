---
id: pythonflask
title: 'Python Flask'
slug: /pythonflask
---

## **Steps for configuring CubeAPM**

## **Installation**

1. Install dependencies:

    ```
    cd <project_directory>
    pip install opentelemetry-distro opentelemetry-exporter-otlp
    opentelemetry-bootstrap -a install
    ```

2. Modify the application run command as follows:

    ```
    opentelemetry-instrument \
        --metrics_exporter none \
        --traces_exporter otlp \
        --exporter_otlp_traces_endpoint https://traces-ingest.spyk.ai:4317 \
        --exporter_otlp_headers authorization=Bearer%20<spyk_token> \
        --exporter_otlp_compression gzip \
        --service_name <app_name> \
        flask run -p 8080
    ```

    Alternatively, the following environment variables can be set:

    ```
    OTEL_METRICS_EXPORTER=none
    OTEL_TRACES_EXPORTER=otlp
    OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=https://traces-ingest.spyk.ai:4317
    OTEL_EXPORTER_OTLP_HEADERS=authorization=Bearer%20<spyk_token>
    OTEL_EXPORTER_OTLP_COMPRESSION=gzip
    OTEL_SERVICE_NAME=<app_name>
    ```

## **Notes**

1. Additional steps need to be followed for setups with uWSGI/Gunicorn. Please follow the following resources:

    a.  https://opentelemetry-python.readthedocs.io/en/latest/examples/fork-process-model/README.html