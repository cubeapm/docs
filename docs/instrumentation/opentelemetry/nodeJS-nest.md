---
id: nodeJs-nest
title: "NodeJS Nest"
slug: /instrumentation/opentelemetry/nodejs-nest
---

## Installation

1. Install dependencies

   ```shell
   npm install --save @opentelemetry/auto-instrumentations-node
   ```

1. Create a file `tracing.js` in your project directory, with the following content:

   ```javascript title="tracing.js"
   "use strict";
   const process = require("process");
   const {
     diag,
     DiagConsoleLogger,
     DiagLogLevel,
   } = require("@opentelemetry/api");
   const opentelemetry = require("@opentelemetry/sdk-node");
   const {
     getNodeAutoInstrumentations,
   } = require("@opentelemetry/auto-instrumentations-node");
   const {
     OTLPTraceExporter,
   } = require("@opentelemetry/exporter-trace-otlp-proto");

   if (process.env.OTEL_LOG_LEVEL === "debug") {
     diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);
   }

   const exporterOptions = {
     // concurrencyLimit: 1,
   };
   const traceExporter =
     process.env.OTEL_LOG_LEVEL === "debug"
       ? new opentelemetry.tracing.ConsoleSpanExporter()
       : new OTLPTraceExporter(exporterOptions);

   const sdk = new opentelemetry.NodeSDK({
     traceExporter,
     instrumentations: getNodeAutoInstrumentations({
       "@opentelemetry/instrumentation-fs": {
         enabled: false,
       },
     }),
   });

   // initialize the SDK and register with the OpenTelemetry API
   // this enables the API to record telemetry
   sdk.start();
   ```

1. Modify the application run command as follows:

   ```shell
   OTEL_METRICS_EXPORTER=otlp \
   OTEL_LOGS_EXPORTER=none \
   OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4318/v1/traces \
   OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=http://<ip_address_of_cubeapm_server>:3130/api/metrics/v1/save/otlp \
   OTEL_EXPORTER_OTLP_COMPRESSION=gzip \
   OTEL_SERVICE_NAME=<app_name> \
   NODE_OPTIONS="--require ./tracing.js" \
   npm run start
   ```

:::info
If the application is running in PM2 cluster mode, then setting NODE_OPTIONS does not work. In this case, add `require('./tracing.js');` as the first line in your application code.
:::

### Sample App

A working example with multiple instrumentations is available at https://github.com/cubeapm/sample_app_nodejs_nest/tree/otel

## Troubleshooting

The following can be used for debugging:

```shell
# print traces on console
OTEL_LOG_LEVEL=debug
# print metrics on console
OTEL_METRICS_EXPORTER=console
```

The following command can be tried on the application host server to check connectivity to CubeAPM server(s):

```shell
telnet <ip_address_of_cubeapm_server> 4318
```
