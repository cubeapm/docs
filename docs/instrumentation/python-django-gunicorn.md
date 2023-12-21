---
id: python-django-gunicorn
title: "Python Django Gunicorn"
slug: /instrumentation/python-django-gunicorn
---

## Prerequisites

Python 3

## Installation

1. Install dependencies:

   ```shell
   pip install opentelemetry-distro opentelemetry-exporter-otlp-proto-grpc
   opentelemetry-bootstrap -a install
   ```

2. Modify the gunicorn config file as follows:

   ```python title="gunicorn.conf.py"
   # highlight-start
   import os
   from opentelemetry import trace
   from opentelemetry.sdk.trace import TracerProvider
   from opentelemetry.sdk.trace.export import (
      BatchSpanProcessor,
      ConsoleSpanExporter,
      SimpleSpanProcessor,
   )
   from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
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

      provider = TracerProvider()
      if os.getenv('OTEL_LOG_LEVEL', '') == 'debug':
         processor = SimpleSpanProcessor(ConsoleSpanExporter())
      else:
         processor = BatchSpanProcessor(OTLPSpanExporter())
      provider.add_span_processor(processor)
      trace.set_tracer_provider(provider)
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
   # https://github.com/cubeapm/sample_app_python_django_gunicorn
   # highlight-end

   application = get_wsgi_application()
   ```

4. Modify the application run command as follows:

   ```shell
   DJANGO_SETTINGS_MODULE=<django_app_name>.settings \
   OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4317 \
   OTEL_EXPORTER_OTLP_COMPRESSION=gzip \
   OTEL_SERVICE_NAME=<app_name> \
   gunicorn mysite.wsgi -c gunicorn.conf.py
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
