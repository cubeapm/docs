---
id: python-fastapi-uvicorn
title: "Python FastAPI Uvicorn"
slug: /instrumentation/python-fastapi-uvicorn
---

## Prerequisites

Python 3

## Installation

1. Install dependencies:

   ```shell
   pip install opentelemetry-distro opentelemetry-exporter-otlp-proto-http opentelemetry-instrumentation-fastapi
   opentelemetry-bootstrap -a install
   ```

2. Create a file `tracing.py` in your project directory, with the following content:

   ```python title="tracing.py"
    import os
    from opentelemetry import trace
    from opentelemetry.semconv.resource import ResourceAttributes
    from opentelemetry.sdk.trace import TracerProvider, Resource
    from opentelemetry.sdk.trace.export import (
        BatchSpanProcessor,
        ConsoleSpanExporter,
        SimpleSpanProcessor,
    )
    from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
    from socket import gethostname


    def init_tracing():
        provider = TracerProvider(resource=Resource({
           ResourceAttributes.SERVICE_NAME: os.environ['OTEL_SERVICE_NAME'],
           ResourceAttributes.HOST_NAME: gethostname() or 'UNSET',
        }))        
        if os.getenv('OTEL_LOG_LEVEL', '') == 'debug':
            processor = SimpleSpanProcessor(ConsoleSpanExporter())
        else:
            processor = BatchSpanProcessor(OTLPSpanExporter())
        provider.add_span_processor(processor)
        trace.set_tracer_provider(provider)

   ```

3. Add the highlighted lines below to your project's main file:

   ```python title="main.py"
   from fastapi import FastAPI
   from tracing import init_tracing
   # highlight-next-line
   from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

   app = FastAPI()

   # highlight-start
   init_tracing()
   FastAPIInstrumentor.instrument_app(app)
   # Additional instrumentations can be enabled by
   # following the docs for respective instrumentations at
   # https://github.com/open-telemetry/opentelemetry-python-contrib/tree/main/instrumentation
   #
   # A working example with multiple instrumentations is available at
   # https://github.com/cubeapm/sample_app_python_fastapi_uvicorn
   # highlight-end

   @app.route('/roll/<number>')
   def roll(number):
      return number
   ```

4. Modify the application run command as follows:

   ```shell
   OTEL_METRICS_EXPORTER=none \
   OTEL_LOGS_EXPORTER=none \
   OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4318/v1/traces \
   OTEL_EXPORTER_OTLP_COMPRESSION=gzip \
   OTEL_SERVICE_NAME=<app_name> \
   uvicorn main:app --host=0.0.0.0 --port=8000 --workers=4
   ```

## Troubleshooting

The following can be used for debugging:

```shell
OTEL_LOG_LEVEL=debug
```

The following command can be tried on the application host server to check connectivity to CubeAPM server(s):

```shell
telnet <ip_address_of_cubeapm_server> 4318
```
