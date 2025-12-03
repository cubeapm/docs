---
id: python-fastapi-uvicorn
title: "Python FastAPI Uvicorn"
slug: /instrumentation/datadog/python-fastapi-uvicorn
---

## Prerequisites

Python 3+

## Installation

Following are the steps to install the Datadog agent and connect it with CubeAPM. If Datadog agent is already installed, you can jump to step 4.

1. Install dependencies:

   ```shell
   pip install ddtrace
   ```

1. Initializes the Datadog tracer when your application starts:

    ```shell
    ddtrace-run uvicorn main:app --host=0.0.0.0 --port=8000 --workers=4 --log-level=debug
    ```

1. Modify the application run command as follows:

   ```shell
   DD_SERVICE=<app_name> \
   # Send data to Datadog Agent
   DD_AGENT_HOST=<datadog_agent_host_name> \
   # Enable runtime metrics 
   DD_RUNTIME_METRICS_ENABLED=true \
   DD_RUNTIME_METRICS_RUNTIME_ID_ENABLED=true \
   # optional settings
   DD_ENV=UNSET \
   DD_VERSION=1.2.3 \
   DD_TAGS=mykey1:myvalue1,mykey2:myvalue2 \
   ddtrace-run uvicorn main:app --host=0.0.0.0 --port=8000 --workers=4 --log-level=debug
   ```

1. Configure Datadog Agent to forward metrics and traces to CubeAPM

   ```shell
   DD_API_KEY=<your_datadog_key>
   # send runtime metrics to CubeAPM
   DD_DD_URL=http://host.docker.internal:3130
   # send traces to CubeAPM
   DD_APM_DD_URL=http://host.docker.internal:3130

   # Accept traces and metrics from applications running outside the agent host
   DD_APM_NON_LOCAL_TRAFFIC=true
   DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true
   ```

## Sample Application

A working example is available at https://github.com/cubeapm/sample_app_python_fastapi_uvicorn/tree/datadog.

## Troubleshooting

The following can be used for debugging:

```shell
# Print Datadog tracer startup logs on screen
DD_TRACE_STARTUP_LOGS=true
# Enable Datadog tracer debug logging if needed to see detailed logs
DD_TRACE_DEBUG=true
```