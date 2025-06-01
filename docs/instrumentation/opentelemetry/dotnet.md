---
id: dotnet
title: ".NET Core"
slug: /instrumentation/opentelemetry/dotnet
---

## Prerequisites

- .NET SDK 8+

## Installation

1. Install the required dependencies:

   ```shell
   # Download the installation script
   curl -sSfL -O https://github.com/open-telemetry/opentelemetry-dotnet-instrumentation/releases/latest/download/otel-dotnet-auto-install.sh

   # Install core files
   sh ./otel-dotnet-auto-install.sh

   # Make the instrumentation script executable
   chmod +x $HOME/.otel-dotnet-auto/instrument.sh
   ```

1. Modify the application run command as follows:

   ```shell
   OTEL_SERVICE_NAME=<app_name> \
   OTEL_TRACES_EXPORTER=otlp \
   OTEL_METRICS_EXPORTER=none \
   OTEL_LOGS_EXPORTER=none \
   OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf \
   OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4318/v1/traces \
   OTEL_EXPORTER_OTLP_COMPRESSION=gzip \
   $HOME/.otel-dotnet-auto/instrument.sh dotnet run
   ```

## Sample App

A working example is available at https://github.com/cubeapm/sample_app_dotnet_core/tree/otel

## Troubleshooting

The following can be used for debugging:

```
OTEL_LOG_LEVEL=debug
```

Also, traces exporter can be changed from `otlp` to `console` to output traces on console.

The following command can be tried on the application host server to check connectivity to CubeAPM server(s):

```shell
telnet <ip_address_of_cubeapm_server> 4318
```

## Reference

https://opentelemetry.io/docs/zero-code/net/
