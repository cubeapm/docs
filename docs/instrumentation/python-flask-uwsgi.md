---
id: python-flask-uwsgi
title: "Python Flask uWSGI"
slug: /instrumentation/python-flask-uwsgi
---

## Prerequisites

Python 3

## Installation

1. Install dependencies:

   ```shell
   pip install opentelemetry-distro opentelemetry-exporter-otlp-proto-http opentelemetry-instrumentation-flask
   opentelemetry-bootstrap -a install
   ```

2. Add the highlighted lines below to your project's main file:

   ```python title="app.py"
   from flask import Flask
   # highlight-start
   from uwsgidecorators import postfork
   import os
   from opentelemetry import trace
   from opentelemetry.sdk.trace import TracerProvider
   from opentelemetry.sdk.trace.export import (
      BatchSpanProcessor,
      ConsoleSpanExporter,
      SimpleSpanProcessor,
   )
   from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
   from opentelemetry.instrumentation.flask import FlaskInstrumentor
   # highlight-end

   app = Flask(__name__)
   # highlight-start
   FlaskInstrumentor().instrument_app(app)
   # Additional instrumentations can be enabled by
   # following the docs for respective instrumentations at
   # https://github.com/open-telemetry/opentelemetry-python-contrib/tree/main/instrumentation
   #
   # A working example with multiple instrumentations is available at
   # https://github.com/cubeapm/sample_app_python_flask_uwsgi

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

   @app.route('/roll/<number>')
   def roll(number):
      return number
   ```

3. Modify the application run command as follows:

   ```shell
   OTEL_METRICS_EXPORTER=none \
   OTEL_LOGS_EXPORTER=none \
   OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4318/v1/traces \
   OTEL_EXPORTER_OTLP_COMPRESSION=gzip \
   OTEL_SERVICE_NAME=<app_name> \
   uwsgi --http :8000 --wsgi-file app.py --callable app --master --enable-threads --need-app
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

## Troubleshooting

The following can be used for debugging:

```shell
OTEL_LOG_LEVEL=debug
```

The following command can be tried on the application host server to check connectivity to CubeAPM server(s):

```shell
telnet <ip_address_of_cubeapm_server> 4318
```
