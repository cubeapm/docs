---
id: nodeJs-express
title: "NodeJS Express"
slug: /instrumentation/opentelemetry/nodejs-express
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
   OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=http://host.docker.internal:3130/api/metrics/v1/save/otlp \
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

A working example with multiple instrumentations is available at https://github.com/cubeapm/sample_app_nodejs_express/tree/otel

## Capture Exception StackTraces (optional)

CubeAPM shows stacktraces for any exceptions that occur in your application. However, if you are using the Express framework, you need to add the following code to your Express error handler to capture the stacktraces:

```typescript
import express, { Express, ErrorRequestHandler } from "express";
// highlight-next-line
import { trace } from "@opentelemetry/api";

const app: Express = express();

app.get("/", (req, res) => {
  throw new Error("Test throw error!");
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // highlight-start
  const span = trace.getActiveSpan();
  if (span) {
    span.recordException(err);
  }
  // highlight-end

  // pass the error to the next middleware
  // you can do any custom error handling here
  next(err);
};

app.use(errorHandler);

app.listen(8080);
```

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
