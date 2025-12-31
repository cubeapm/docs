---
id: python-sanic
title: "Python Sanic"
slug: /instrumentation/opentelemetry/python-sanic
---

As of Apr 2024, OpenTelemetry does not provide auto-instrumentation for Sanic. That said, a fully functional Sanic instrumentation can be achieved as follows.

## Prerequisites

Python 3

## Installation

1. Install dependencies:

   ```shell
   pip install opentelemetry-distro opentelemetry-exporter-otlp-proto-http opentelemetry-instrumentation-system-metrics
   opentelemetry-bootstrap -a install
   ```

2. Create a file `tracing.py` in your project directory, with the following content:

   ```python title="tracing.py"
   import os
   from opentelemetry import trace, context
   from opentelemetry.sdk import resources
   from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
   from opentelemetry.propagate import extract
   from opentelemetry.sdk.trace import TracerProvider
   from opentelemetry.sdk.trace.export import (
      BatchSpanProcessor,
      ConsoleSpanExporter,
      SimpleSpanProcessor,
   )
   from opentelemetry.semconv.trace import SpanAttributes
   from opentelemetry.trace.status import Status, StatusCode
   from sanic import HTTPResponse, Request, Sanic
   from socket import gethostname

   def instrument_app(app: Sanic):
      resource = resources.Resource.create({
         resources.HOST_NAME: gethostname() or 'UNSET',
         resources.PROCESS_PID : os.getpid(),
      })

      if os.getenv('OTEL_LOG_LEVEL', '') == 'debug':
         trace_processor = SimpleSpanProcessor(ConsoleSpanExporter())
      else:
         trace_processor = BatchSpanProcessor(OTLPSpanExporter())
      trace_provider = TracerProvider(
         resource=resource,
         active_span_processor=trace_processor
      )
      trace.set_tracer_provider(trace_provider)

      if os.getenv('OTEL_LOG_LEVEL', '') == 'debug':
         metric_exporter = ConsoleMetricExporter()
      else:
         metric_exporter = OTLPMetricExporter()
      metric_reader = PeriodicExportingMetricReader(exporter=metric_exporter)
      meter_provider = MeterProvider(
         resource=resource,
         metric_readers=[metric_reader]
      )
      metrics.set_meter_provider(meter_provider)
      SystemMetricsInstrumentor().instrument()
      
      tracer = trace.get_tracer(__name__)

      SPAN_KEY = 'span_key'
      ACTIVATION_KEY = 'activation_key'

      @app.on_request
      async def on_request(req: Request):
         context.attach(extract(req.headers))
         span = tracer.start_span(
               req.method + ' ' + (('/' + req.route.path) if req.route else req.path),
               kind=trace.SpanKind.SERVER,
         )
         activation = trace.use_span(span, end_on_exit=True)
         activation.__enter__()
         span.set_attribute(SpanAttributes.HTTP_METHOD, req.method)
         span.set_attribute(SpanAttributes.HTTP_ROUTE, req.path)
         req.ctx.cubeapm = {ACTIVATION_KEY: activation, SPAN_KEY: span}

      @app.on_response
      async def on_response(req: Request, res: HTTPResponse):
         if hasattr(req.ctx, 'cubeapm'):
               req.ctx.cubeapm[SPAN_KEY].set_attribute(
                  SpanAttributes.HTTP_STATUS_CODE, res.status)
               req.ctx.cubeapm[ACTIVATION_KEY].__exit__(None, None, None)

      @app.signal('http.lifecycle.exception')
      async def on_exception(request:  Request, exception: Exception):
         if hasattr(request.ctx, 'cubeapm'):
            request.ctx.cubeapm[SPAN_KEY].record_exception(exception)
            request.ctx.cubeapm[SPAN_KEY].set_status(Status(StatusCode.ERROR))
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
   # Additional instrumentations can be enabled by
   # following the docs for respective instrumentations at
   # https://github.com/open-telemetry/opentelemetry-python-contrib/tree/main/instrumentation
   #
   # A working example with multiple instrumentations is available at
   # https://github.com/cubeapm/sample_app_python_sanic/tree/otel
   # highlight-end

   @app.get("/")
   async def handler(request):
      return text(str(request.id))
   ```

4. Modify the application run command as follows:

   ```shell
   OTEL_LOGS_EXPORTER=none \
   OTEL_RESOURCE_ATTRIBUTES=cube.environment=UNSET,service.version=1.2.3,mykey1=myvalue1,mykey2=myvalue2 \
   OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4318/v1/traces \
   OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=http://<ip_address_of_cubeapm_server>:3130/api/metrics/v1/save/otlp \
   OTEL_EXPORTER_OTLP_COMPRESSION=gzip \
   OTEL_SERVICE_NAME=<app_name> \
   sanic server
   ```

## Sample Application

A working example is available at https://github.com/cubeapm/sample_app_python_sanic/tree/otel.

## Troubleshooting

The following can be used for debugging:

```shell
OTEL_LOG_LEVEL=debug
```

The following command can be tried on the application host server to check connectivity to CubeAPM server(s):

```shell
telnet <ip_address_of_cubeapm_server> 4318
```
