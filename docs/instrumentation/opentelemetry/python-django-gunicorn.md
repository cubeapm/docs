---
id: python-django-gunicorn
title: "Python Django Gunicorn"
slug: /instrumentation/opentelemetry/python-django-gunicorn
---

## Prerequisites

Python 3

## Installation

1. Install dependencies:

   ```shell
   pip install opentelemetry-distro opentelemetry-exporter-otlp-proto-http opentelemetry-instrumentation-system-metrics
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

3. Add the highlighted lines below to your project's `wsgi.py` file:

   ```python title="wsgi.py"
   import os
   from django.core.wsgi import get_wsgi_application
   # highlight-next-line
   from opentelemetry.instrumentation.django import DjangoInstrumentor

   os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')

   # highlight-start
   DjangoInstrumentor().instrument()
   # Additional instrumentations can be enabled by
   # following the docs for respective instrumentations at
   # https://github.com/open-telemetry/opentelemetry-python-contrib/tree/main/instrumentation
   #
   # A working example with multiple instrumentations is available at
   # https://github.com/cubeapm/sample_app_python_django_gunicorn/tree/otel
   # highlight-end

   application = get_wsgi_application()
   ```

4. Modify the application run command as follows:

   ```shell
   DJANGO_SETTINGS_MODULE=<django_app_name>.settings \
   OTEL_LOGS_EXPORTER=none \
   OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4318/v1/traces \
   OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=http://<ip_address_of_cubeapm_server>:3130/api/metrics/v1/save/otlp \
   OTEL_EXPORTER_OTLP_COMPRESSION=gzip \
   OTEL_SERVICE_NAME=<app_name> \
   gunicorn mysite.wsgi -c gunicorn.conf.py
   ```

## Sample Application

A working example is available at https://github.com/cubeapm/sample_app_python_django_gunicorn/tree/otel.

## Troubleshooting

The following can be used for debugging:

```shell
OTEL_LOG_LEVEL=debug
```

The following command can be tried on the application host server to check connectivity to CubeAPM server(s):

```shell
telnet <ip_address_of_cubeapm_server> 4318
```
