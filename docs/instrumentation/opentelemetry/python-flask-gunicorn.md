---
id: python-flask-gunicorn
title: "Python Flask Gunicorn"
slug: /instrumentation/opentelemetry/python-flask-gunicorn
---

## Prerequisites

Python 3

## Installation

1. Install dependencies:

   ```shell
   pip install opentelemetry-distro opentelemetry-exporter-otlp-proto-http opentelemetry-instrumentation-flask opentelemetry-instrumentation-system-metrics
   opentelemetry-bootstrap -a install
   ```

2. Modify the gunicorn config file as follows:

   ```python title="gunicorn.conf.py"
   # highlight-start
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
   # highlight-end

   bind = "127.0.0.1:8000"

   # Sample Worker processes
   workers = 4
   worker_class = "sync"
   worker_connections = 1000
   timeout = 30
   keepalive = 2

   # Sample logging
   errorlog = "-"
   loglevel = "info"
   accesslog = "-"
   access_log_format = (
      '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"'
   )

   # highlight-start
   def post_fork(server, worker):
      server.log.info("Worker spawned (pid: %s)", worker.pid)

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
   # highlight-end
   ```

3. Add the highlighted lines below to your project's main file:

   ```python title="app.py"
   from flask import Flask
   # highlight-next-line
   from opentelemetry.instrumentation.flask import FlaskInstrumentor

   app = Flask(__name__)
   # highlight-start
   FlaskInstrumentor().instrument_app(app)
   # Additional instrumentations can be enabled by
   # following the docs for respective instrumentations at
   # https://github.com/open-telemetry/opentelemetry-python-contrib/tree/main/instrumentation
   #
   # A working example with multiple instrumentations is available at
   # https://github.com/cubeapm/sample_app_python_flask_gunicorn/tree/otel
   # highlight-end

   @app.route('/roll/<number>')
   def roll(number):
      return number
   ```

4. Modify the application run command as follows:

   ```shell
   OTEL_LOGS_EXPORTER=none \
   OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4318/v1/traces \
   OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=http://<ip_address_of_cubeapm_server>:3130/api/metrics/v1/save/otlp \
   OTEL_EXPORTER_OTLP_COMPRESSION=gzip \
   OTEL_SERVICE_NAME=<app_name> \
   gunicorn app:app -c gunicorn.conf.py
   ```

## Capture Exception StackTraces

Any exceptions occuring in your application will be captured and shown on CubeAPM. However, if you are using Flask's global exception handling (e.g., via `app.register_error_handler()`), then you may need to take some extra steps as below to ensure that the exceptions get captured.

```python
from opentelemetry import trace
from opentelemetry.trace import Status, StatusCode
from werkzeug.exceptions import HTTPException

def handle_unhandled_exception(ex):
   # highlight-start
   current_span = trace.get_current_span()
   if current_span:
      if not isinstance(ex, HTTPException) or ex.code >= 500:
         current_span.record_exception(ex)
         current_span.set_status(Status(StatusCode.ERROR))
   # highlight-end

   # your exception handling logic below
   print(ex)
   return ''


app.register_error_handler(Exception, handle_unhandled_exception)
```

## Sample Application

A working example is available at https://github.com/cubeapm/sample_app_python_flask_gunicorn/tree/otel.

## Troubleshooting

The following can be used for debugging:

```shell
OTEL_LOG_LEVEL=debug
```

The following command can be tried on the application host server to check connectivity to CubeAPM server(s):

```shell
telnet <ip_address_of_cubeapm_server> 4318
```
