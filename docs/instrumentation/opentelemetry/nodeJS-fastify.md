---
id: nodeJs-fastify
title: "NodeJS Fastify"
slug: /instrumentation/opentelemetry/nodejs-fastify
---

## Installation

1. Install dependencies

   ```shell
   npm install --save @opentelemetry/auto-instrumentations-node @fastify/otel
   ```

1. Create a file `tracing.js` in your project directory, with the following content:

   ```javascript title="tracing.js"
   "use strict";
   const process = require("process");
   const { diag, DiagConsoleLogger, DiagLogLevel } = require("@opentelemetry/api");
   const opentelemetry = require("@opentelemetry/sdk-node");
   const {
     getNodeAutoInstrumentations,
   } = require("@opentelemetry/auto-instrumentations-node");
   const {
     OTLPTraceExporter,
   } = require("@opentelemetry/exporter-trace-otlp-proto");
   const { FastifyOtelInstrumentation } = require('@fastify/otel');

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
     instrumentations: [
       ...Object.values(
         getNodeAutoInstrumentations({
           "@opentelemetry/instrumentation-fs": { enabled: false },
         })
       ),
       new FastifyOtelInstrumentation({
         registerOnInitialization: true,
       }),
     ],
   });

   // initialize the SDK and register with the OpenTelemetry API
   // this enables the API to record telemetry
   sdk.start();
   ```

1. Modify the application run command as follows:

   ```shell
   OTEL_METRICS_EXPORTER=otlp \
   OTEL_LOGS_EXPORTER=none \
   OTEL_RESOURCE_ATTRIBUTES=cube.environment=UNSET,service.version=1.2.3,mykey1=myvalue1,mykey2=myvalue2 \
   OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4318/v1/traces \
   OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=http://<ip_address_of_cubeapm_server>:3130/api/metrics/v1/save/otlp \
   OTEL_EXPORTER_OTLP_COMPRESSION=gzip \
   OTEL_SERVICE_NAME=<app_name> \
   NODE_OPTIONS="--require ./tracing.js" \
   node app.js
   ```

:::info
If the application is running in PM2 cluster mode, then setting NODE_OPTIONS does not work. In this case, add `require('./tracing.js');` as the first line in your application code.
:::

:::info
If the application is configured to compile as a **module** (`type: 'module'` in package.json), then make the below changes for the instrumentation to work properly:

<!--
module => ESM module (mjs)
default => commonjs (cjs)

The most prominently difference in a module is usually that `import` is used instead of `require`. However, if the project uses typescript, it will use `import` and typescript compiler can still compile it to cjs or mjs depending on configuration in tsconfig.json. So, detecting final type gets a bit tricky with typescript. See the OpenTelemetry documentation link below for more details. Also see: https://github.com/open-telemetry/opentelemetry-js-contrib/issues/1849 -->

1. Change `require` statements to corresponding `import` statements in tracing.js.
2. Change the commans line arguments (or NODE_OPTIONS) to `--import ./tracing.js --experimental-loader=@opentelemetry/instrumentation/hook.mjs`.

For further details, please refer: https://github.com/open-telemetry/opentelemetry-js/blob/main/doc/esm-support.md
:::

### Sample App

A working example with multiple instrumentations is available at https://github.com/cubeapm/sample_app_nodejs_fastify/tree/otel

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
