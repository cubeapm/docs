---
id: python-django-uwsgi
title: "Python Django uWSGI"
slug: /instrumentation/python-django-uwsgi
---

## Prerequisites

Python 3

## Installation

1. Install dependencies:

   ```shell
   pip install opentelemetry-distro opentelemetry-exporter-otlp-proto-grpc
   opentelemetry-bootstrap -a install
   ```

2. Add the highlighted lines below to your project's `wsgi.py` file:

   ```python title="wsgi.py"
   import os
   from django.core.wsgi import get_wsgi_application
   # highlight-start
   from uwsgidecorators import postfork
   from opentelemetry import trace
   from opentelemetry.sdk.trace import TracerProvider
   from opentelemetry.sdk.trace.export import (
      BatchSpanProcessor,
      ConsoleSpanExporter,
      SimpleSpanProcessor,
   )
   from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
   from opentelemetry.instrumentation.django import DjangoInstrumentor
   # highlight-end

   os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')

   # highlight-start
   DjangoInstrumentor().instrument()
   # Additional instrumentations can be enabled by
   # following the docs for respective instrumentations at
   # https://github.com/open-telemetry/opentelemetry-python-contrib/tree/main/instrumentation
   #
   # A working example with multiple instrumentations is available at
   # https://github.com/cubeapm/sample_app_python_django_uwsgi

   @postfork
   def init_tracing():
      provider = TracerProvider()
      if os.getenv('OTEL_LOG_LEVEL', '') == 'debug':
         processor = SimpleSpanProcessor(ConsoleSpanExporter())
      else:
         processor = BatchSpanProcessor(OTLPSpanExporter())
      provider.add_span_processor(processor)
      trace.set_tracer_provider(provider)
   # highlight-end

   application = get_wsgi_application()
   ```

3. Modify the application run command as follows:

   ```shell
   OTEL_LOGS_EXPORTER=none \
   OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf \
   OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4318/v1/traces \
   OTEL_EXPORTER_OTLP_COMPRESSION=gzip \
   OTEL_SERVICE_NAME=<app_name> \
   uwsgi --module=mysite.wsgi:application --http=127.0.0.1:8000 --master --need-app
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
