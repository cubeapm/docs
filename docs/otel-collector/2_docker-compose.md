---
sidebar_position: 2
slug: /otel-collector/docker-compose
---

# Docker Compose

Use OpenTelemetry (OTel) Collector with Docker Compose to collect application logs from Docker container log files and forward them to CubeAPM.

In this setup, your application writes logs to `stdout` or `stderr`, Docker stores them as JSON log files on the host, and OTel Collector tails those files using the `filelog` receiver and forwards them to CubeAPM over OTLP/HTTP.

## How It Works

1. Your application writes logs to `stdout` or `stderr`.

1. Docker stores those logs under `/var/lib/docker/containers/<container-id>/<container-id>-json.log`.

1. OTel Collector mounts `/var/lib/docker/containers` from the host in read-only mode.

1. The `filelog` receiver tails Docker log files, parses them, and exports the logs to CubeAPM.

## Prerequisites

1. Your application must log to `stdout` or `stderr`.

1. Docker Compose must be running on a Linux host where `/var/lib/docker/containers` is available.

1. Your application should ideally emit structured JSON logs. If it emits plain text logs, the Collector config must be adjusted.

## Setup

1. Create an OTel Collector config file named `otel-config.yaml` with the following contents.

    <details>
    <summary>otel-config.yaml</summary>

    ```yaml
    receivers:
      filelog:
        include:
          - /var/lib/docker/containers/*/*-json.log
        start_at: end
        operators:
          - type: json_parser
            parse_from: body
            timestamp:
              parse_from: attributes.time
              layout: '%Y-%m-%dT%H:%M:%S.%fZ'
          - type: json_parser
            parse_from: attributes.log
          - type: severity_parser
            if: 'attributes.level != nil'
            parse_from: attributes.level
          - type: move
            from: attributes.msg
            to: body
          - type: remove
            field: attributes.time
          - type: remove
            field: attributes.log

    processors:
      batch: {}

    exporters:
      otlphttp/logs:
        logs_endpoint: https://<cubeapm-endpoint>:3130/api/logs/insert/opentelemetry
        headers:
          Cube-Stream-Fields: severity,service.name
        compression: gzip

    service:
      pipelines:
        logs:
          receivers:
            - filelog
          processors:
            - batch
          exporters:
            - otlphttp/logs
    ```

    </details>

1. Create a `docker-compose.yml` file with your application service and an `otel-collector` service.

    <details>
    <summary>docker-compose.yml</summary>

    ```yaml
    services:
      app:
        image: <your-app-image>
        ports:
          - "8000:8000"
        depends_on:
          - otel-collector

      otel-collector:
        image: otel/opentelemetry-collector-contrib:0.145.0
        command: ["--config=/etc/otelcol-contrib/config.yaml"]
        volumes:
          - ./otel-config.yaml:/etc/otelcol-contrib/config.yaml:ro
          - /var/lib/docker/containers:/var/lib/docker/containers:ro
        logging:
          driver: local
    ```

    </details>

1. In `otel-config.yaml`, replace `<cubeapm-endpoint>` in `logs_endpoint` with your CubeAPM hostname or IP address.

    Example:

    ```text
    https://cubeapm.example.com/api/logs/insert/opentelemetry/v1/logs
    ```

1. Start the stack.

    ```bash
    docker compose up -d
    ```

## Application Logging

Your application should:

1. Write logs to `stdout` or `stderr`, not to files inside the container.

1. Prefer structured JSON logs.

1. Include `service.name` in every log record so logs can be easily filtered in CubeAPM.

It is highly recommended to keep application logs in structured JSON format for better parsing and filtering in CubeAPM.

If your application emits plain text logs instead of JSON, remove the second `json_parser` operator from the `filelog` receiver config.

## Verification

1. Start the Docker Compose stack.

1. Generate some application traffic so new logs are produced.

1. Check the Collector logs.

    ```bash
    docker compose logs -f otel-collector
    ```

1. Check the application logs.

    ```bash
    docker compose logs -f app
    ```

1. In CubeAPM, open Logs and filter by `service.name` to find the application's logs.

## Notes

1. This setup collects only logs. Traces and metrics use separate Collector pipelines and endpoints.

1. `start_at: end` means only new logs are collected after OTel Collector starts.

1. This approach depends on access to Docker log files on the host at `/var/lib/docker/containers`.

## Troubleshooting

1. Verify that OTel Collector is running.

1. Verify that `/var/lib/docker/containers` is mounted read-only into the OTel Collector container.

1. Verify that your application is writing logs to `stdout` or `stderr`.

1. Verify that the `logs_endpoint` points to CubeAPM logs ingestion endpoint:

    ```text
    https://<cubeapm-endpoint>/api/logs/insert/opentelemetry
    ```
