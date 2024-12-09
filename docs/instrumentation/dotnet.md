---
id: dotnet
title: ".NET Core"
slug: /instrumentation/dotnet
---

## Prerequisites

- .NET SDK 6+

## Installation

1. Install the required dependencies:

    1. Download the installation scripts of the opentelemetry-dotnet-instrumentation repository:

        ```shell
        curl -L -O https://github.com/open-telemetry/opentelemetry-dotnet-instrumentation/releases/latest/download/otel-dotnet-auto-install.sh
        ```

    2. Install core files:

        ```shell
        sh ./otel-dotnet-auto-install.sh
        ```

    3. Make the instrumentation script executable:

        ```shell
        chmod +x $HOME/.otel-dotnet-auto/instrument.sh
        ```

2. Modify the application run command as follows:

        ```shell
        OTEL_SERVICE_NAME=<app_name> \
        OTEL_TRACES_EXPORTER=otlp \
        OTEL_METRICS_EXPORTER=none \
        OTEL_LOGS_EXPORTER=none \
        OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4318/v1/traces \
        OTEL_EXPORTER_OTLP_COMPRESSION=gzip \
        dotnet run
        ```

## Troubleshooting

The following can be used for debugging:

```
OTEL_LOG_LEVEL=debug
```

Also, traces exporter can be changed from `otlp` to `logging` to output traces on console.

The following command can be tried on the application host server to check connectivity to CubeAPM server(s):

```shell
telnet <ip_address_of_cubeapm_server> 4318
```

## Reference

https://opentelemetry.io/docs/zero-code/net/