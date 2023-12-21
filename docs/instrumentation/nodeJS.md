---
id: nodeJs
title: "NodeJS"
slug: /instrumentation/nodejs
---

## Installation

1. Install dependencies

   ```shell
   npm install --save @opentelemetry/auto-instrumentations-node@^0.38.0
   ```

1. Add the following environment variables:

   ```bash
   OTEL_METRICS_EXPORTER=none
   OTEL_TRACES_EXPORTER=otlp
   OTEL_EXPORTER_OTLP_TRACES_PROTOCOL=grpc
   OTEL_EXPORTER_OTLP_COMPRESSION=gzip
   OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4317
   OTEL_SERVICE_NAME=<app_name>
   NODE_OPTIONS="--require @opentelemetry/auto-instrumentations-node/register"
   ```

   For example, if the run command is `node index.js`, then change it to:

   ```bash
   OTEL_METRICS_EXPORTER=none \
   OTEL_TRACES_EXPORTER=otlp \
   OTEL_EXPORTER_OTLP_TRACES_PROTOCOL=grpc \
   OTEL_EXPORTER_OTLP_COMPRESSION=gzip \
   OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4317 \
   OTEL_SERVICE_NAME=<app_name> \
   NODE_OPTIONS="--require @opentelemetry/auto-instrumentations-node/register" \
   node index.js
   ```

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
OTEL_LOG_LEVEL=debug
```

The following command can be tried on the application host server to check connectivity to CubeAPM server(s):

```shell
telnet <ip_address_of_cubeapm_server> 4317
```
