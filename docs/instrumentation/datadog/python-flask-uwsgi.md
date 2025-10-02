---
id: python-flask-uwsgi
title: "Python Flask uWSGI"
slug: /instrumentation/datadog/python-flask-uwsgi
---

## Prerequisites

Python 3+

## Installation

1. Install dependencies:

   ```shell
   pip install ddtrace
   ```

2. Initializes the Datadog tracer when your application starts:

    ```shell
    ddtrace-run uwsgi --http :8000 --wsgi-file app.py --callable app --master -p 4 --enable-threads --need-app
    ```

4. Modify the application run command as follows:

   ```shell
   # send traces to CubeAPM
   DD_TRACE_AGENT_URL=http://<ip_address_of_cubeapm_server>:3130 \
   DD_SERVICE=<app_name> \
   # optional settings
   DD_ENV=UNSET \
   DD_VERSION=1.2.3 \
   DD_TAGS=mykey1:myvalue1,mykey2:myvalue2 \
   ddtrace-run uwsgi --http :8000 --wsgi-file app.py --callable app --master -p 4 --enable-threads --need-app
   ```

## Sample Application

A working example is available at https://github.com/cubeapm/sample_app_python_flask_uwsgi/tree/datadog.

## Troubleshooting

The following can be used for debugging:

```shell
# Print Datadog tracer startup logs on screen
DD_TRACE_STARTUP_LOGS=true
# Enable Datadog tracer debug logging if needed to see detailed logs
DD_TRACE_DEBUG=true
```