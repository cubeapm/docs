---
id: python-django
title: "Python Django"
slug: /instrumentation/python-django
---

## Prerequisites

Python 3

## Installation

1. Install dependencies:

   ```
   pip install opentelemetry-distro opentelemetry-exporter-otlp
   opentelemetry-bootstrap -a install
   ```

2. Modify the application run command as follows:

   ```
   DJANGO_SETTINGS_MODULE=<django_app_name>.settings \
   opentelemetry-instrument \
       --metrics_exporter none \
       --traces_exporter otlp \
       --exporter_otlp_traces_endpoint http://<ip_address_of_cubeapm_server>:4317 \
       --exporter_otlp_compression gzip \
       --service_name <app_name> \
       python manage.py runserver --noreload
   ```

   Alternatively, the following environment variables can be set:

   ```
   DJANGO_SETTINGS_MODULE=<django_app_name>.settings
   OTEL_METRICS_EXPORTER=none
   OTEL_TRACES_EXPORTER=otlp
   OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4317
   OTEL_EXPORTER_OTLP_COMPRESSION=gzip
   OTEL_SERVICE_NAME=<app_name>
   ```

## Troubleshooting

Traces exporter can be changed from `otlp` to `console` to output traces on console.

The following command can be tried on the application host server to check connectivity to CubeAPM server(s):

```
telnet <ip_address_of_cubeapm_server> 4317
```

## Notes

1. DJANGO_SETTINGS_MODULE environment variable must be set even if configuring the
   integration via command line parameters.

2. Additional steps need to be followed for setups with uWSGI/Gunicorn. Please follow the following resources:

   1. https://opentelemetry-python.readthedocs.io/en/latest/examples/django/README.html#usage-with-auto-instrumentation-and-uwsgi

   2. https://opentelemetry-python.readthedocs.io/en/latest/examples/fork-process-model/README.html
