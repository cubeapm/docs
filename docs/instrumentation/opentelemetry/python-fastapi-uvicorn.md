---
id: python-fastapi-uvicorn
title: "Python FastAPI Uvicorn"
slug: /instrumentation/opentelemetry/python-fastapi-uvicorn
---

## Prerequisites

Python 3

## Installation

1. Install dependencies:

   ```shell
   pip install opentelemetry-distro opentelemetry-exporter-otlp-proto-http opentelemetry-instrumentation-fastapi opentelemetry-instrumentation-system-metrics 
   opentelemetry-bootstrap -a install
   ```

2. Create a file `tracing.py` in your project directory, with the following content:

   ```python title="tracing.py"
    import os
    from opentelemetry import trace
    from opentelemetry.sdk import resources
    from opentelemetry.sdk.trace import TracerProvider
    from opentelemetry.sdk.trace.export import (
        BatchSpanProcessor,
        ConsoleSpanExporter,
        SimpleSpanProcessor,
    )
    from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
    from opentelemetry import metrics
    from opentelemetry.sdk.metrics import MeterProvider
    from opentelemetry.sdk.metrics.export import (
        ConsoleMetricExporter,
        PeriodicExportingMetricReader,
    )
    from opentelemetry.exporter.otlp.proto.http.metric_exporter import OTLPMetricExporter
    from opentelemetry.instrumentation.system_metrics import SystemMetricsInstrumentor
    from socket import gethostname


    def init_tracing():
        resource = resources.Resource.create({
           resources.HOST_NAME: gethostname() or 'UNSET',
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

   ```

3. Add the highlighted lines below to your project's main file:

   ```python title="main.py"
   from fastapi import FastAPI
   # highlight-start
   from tracing import init_tracing
   from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
   # highlight-end

   app = FastAPI()

   # highlight-start
   init_tracing()
   FastAPIInstrumentor.instrument_app(app)
   # Additional instrumentations can be enabled by
   # following the docs for respective instrumentations at
   # https://github.com/open-telemetry/opentelemetry-python-contrib/tree/main/instrumentation
   #
   # A working example with multiple instrumentations is available at
   # https://github.com/cubeapm/sample_app_python_fastapi_uvicorn/tree/otel
   # highlight-end

   @app.route('/roll/<number>')
   def roll(number):
      return number
   ```

4. Modify the application run command as follows:

   ```shell
   OTEL_LOGS_EXPORTER=none \
   OTEL_RESOURCE_ATTRIBUTES=cube.environment=UNSET,service.version=1.2.3,mykey1=myvalue1,mykey2=myvalue2 \
   OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4318/v1/traces \
   OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=http://<ip_address_of_cubeapm_server>:3130/api/metrics/v1/save/otlp \
   OTEL_EXPORTER_OTLP_COMPRESSION=gzip \
   OTEL_SERVICE_NAME=<app_name> \
   uvicorn main:app --host=0.0.0.0 --port=8000 --workers=4
   ```

## Sample Application

A working example is available at https://github.com/cubeapm/sample_app_python_fastapi_uvicorn/tree/otel.

## Troubleshooting

The following can be used for debugging:

```shell
OTEL_LOG_LEVEL=debug
```

The following command can be tried on the application host server to check connectivity to CubeAPM server(s):

```shell
telnet <ip_address_of_cubeapm_server> 4318
```
