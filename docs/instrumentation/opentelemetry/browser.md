---
id: javascript-browser
title: "JavaScript (browser)"
slug: /instrumentation/opentelemetry/javascript-browser
---

## Installation

1. Install dependencies

   ```shell
   npm install \
   @opentelemetry/api \
   @opentelemetry/auto-instrumentations-web \
   @opentelemetry/context-zone \
   @opentelemetry/core \
   @opentelemetry/exporter-trace-otlp-proto \
   @opentelemetry/instrumentation \
   @opentelemetry/resources \
   @opentelemetry/sdk-trace-web \
   @opentelemetry/semantic-conventions
   ```

2. Add the following into your web project's main file:

   ```jsx
   import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
   import { getWebAutoInstrumentations } from "@opentelemetry/auto-instrumentations-web";
   import { ZoneContextManager } from "@opentelemetry/context-zone";
   import { W3CTraceContextPropagator } from "@opentelemetry/core";
   import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
   import { registerInstrumentations } from "@opentelemetry/instrumentation";
   import { Resource } from "@opentelemetry/resources";
   import {
     BatchSpanProcessor,
     ConsoleSpanExporter,
     SimpleSpanProcessor,
     WebTracerProvider,
   } from "@opentelemetry/sdk-trace-web";
   import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";

   const CUBE_DEBUG = false;
   const CUBE_SERVICE_NAME = "cubeapm-web";
   const CUBE_EXPORTER_OTLP_TRACES_ENDPOINT = "http://localhost:4318/v1/traces";
   const CUBE_PROPAGATE_TRACE_HEADER_CORS_URLS = [/^http:\/\/localhost:8080\//];

   if (CUBE_DEBUG) {
     diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);
   }

   const provider = new WebTracerProvider({
     resource: new Resource({
       [SemanticResourceAttributes.SERVICE_NAME]: CUBE_SERVICE_NAME,
     }),
   });
   if (CUBE_DEBUG) {
     provider.addSpanProcessor(
       new SimpleSpanProcessor(new ConsoleSpanExporter())
     );
   } else {
     provider.addSpanProcessor(
       new BatchSpanProcessor(
         new OTLPTraceExporter({
           url: CUBE_EXPORTER_OTLP_TRACES_ENDPOINT,
         })
       )
     );
   }
   provider.register({
     contextManager: new ZoneContextManager(),
     propagator: new W3CTraceContextPropagator(),
   });
   registerInstrumentations({
     instrumentations: getWebAutoInstrumentations({
       "@opentelemetry/instrumentation-user-interaction": {
         enabled: false,
       },
       "@opentelemetry/instrumentation-fetch": {
         propagateTraceHeaderCorsUrls: CUBE_PROPAGATE_TRACE_HEADER_CORS_URLS,
       },
       "@opentelemetry/instrumentation-xml-http-request": {
         propagateTraceHeaderCorsUrls: CUBE_PROPAGATE_TRACE_HEADER_CORS_URLS,
       },
     }),
   });

   // Your code starts here
   ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
     <React.StrictMode>
       <Provider store={store}>
           <BrowserRouter>
             <App />
           </BrowserRouter>
       </Provider>
     </React.StrictMode>
   );
   ```
