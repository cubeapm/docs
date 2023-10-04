---
id: python-sanic
title: "Python Sanic"
slug: /instrumentation/python-sanic
---

As of Oct 2023, OpenTelemetry does not provide auto-instrumentation for Sanic. Still, basic instrumentation can be done as follows.

## Prerequisites

Python 3

## Installation

1. Install dependencies:

   ```shell
   pip install opentelemetry-distro opentelemetry-exporter-otlp-proto-grpc
   opentelemetry-bootstrap -a install
   ```

2. Create a file `tracing.py` in your project directory, with the following content:

   ```python title="tracing.py"
   import os
   from opentelemetry import trace, context
   from opentelemetry.semconv.trace import SpanAttributes
   from opentelemetry.propagate import extract
   from opentelemetry.sdk.trace import TracerProvider
   from opentelemetry.sdk.trace.export import (
      BatchSpanProcessor,
      ConsoleSpanExporter,
      SimpleSpanProcessor,
   )
   from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter

   def instrument_app(app):
      provider = TracerProvider()
      if os.getenv('OTEL_LOG_LEVEL', '') == 'debug':
         processor = SimpleSpanProcessor(ConsoleSpanExporter())
      else:
         processor = BatchSpanProcessor(OTLPSpanExporter())
      provider.add_span_processor(processor)
      trace.set_tracer_provider(provider)
      tracer = trace.get_tracer(__name__)

      _ENVIRON_SPAN_KEY = "opentelemetry-sanic.span_key"
      _ENVIRON_ACTIVATION_KEY = "opentelemetry-sanic.activation_key"

      @app.on_request
      def on_before_request(req):
         context.attach(extract(req.headers))
         span = tracer.start_span(
               req.endpoint,
               kind=trace.SpanKind.SERVER,
         )
         activation = trace.use_span(span, end_on_exit=True)
         activation.__enter__()
         span.set_attribute(SpanAttributes.HTTP_METHOD, req.method)
         span.set_attribute(SpanAttributes.HTTP_ROUTE, req.path)
         req.ctx.tracing = {_ENVIRON_ACTIVATION_KEY: activation, _ENVIRON_SPAN_KEY: span}

      @app.on_response
      def on_after_request(req, res):
         if hasattr(req.ctx, "tracing"):
            req.ctx.tracing[_ENVIRON_SPAN_KEY].set_attribute(SpanAttributes.HTTP_STATUS_CODE, res.status)
            req.ctx.tracing[_ENVIRON_ACTIVATION_KEY].__exit__(None,None,None)
   ```

3. Add the highlighted lines below to your project's main file:

   ```python title="server.py"
   from sanic import Sanic
   from sanic.response import text
   # highlight-next-line
   from tracing import instrument_app

   app = Sanic("CubeAPMTestApp")
   # highlight-start
   instrument_app(app)
   # Additional instrumentation can be enabled by
   # following the docs for respective instrumentations at
   # https://github.com/open-telemetry/opentelemetry-python-contrib/tree/main/instrumentation
   # highlight-end

   @app.get("/")
   async def handler(request):
      return text(str(request.id))
   ```

4. Modify the application run command as follows:

   ```shell
   OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4317 \
   OTEL_EXPORTER_OTLP_COMPRESSION=gzip \
   OTEL_SERVICE_NAME=<app_name> \
   sanic server
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
