---
id: python-sanic
title: "Python Sanic"
slug: /instrumentation/datadog/python-sanic
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

CubeAPM is compatible with Datadog to send traces, metrics and logs to CubeAPM. Instrumenting datadog with application.

1. Using Datadog Auto-Instrumentation.
2. Using Datadog APM SDK.
3. Using Datadog Agent.

## Prerequisites

Python 3+

## Using Datadog auto-instrumentation

Datadog provides the `ddtrace` package for Python, which includes `ddtrace-run` to automatically instrument your application.

### Installation

Following are the steps to install the Datadog tracer and connect it with CubeAPM directly.

1. Install the Datadog Python SDK.

   ```shell
   pip install ddtrace
   ```

1. Configure the tracer to send traces to CubeAPM directly.

   <Tabs>
      <TabItem value="env" label="Environment Variables">
         You can set these using environment variables.
         ```shell
         DD_SERVICE=<app_name>
         
         # Send data directly to CubeAPM (Bypassing Datadog Agent)
         DD_TRACE_AGENT_URL=http://<cubeapm_endpoint>:3130
         
         # optional settings
         DD_ENV=myenv
         DD_VERSION=1.2.3
         DD_TAGS=mykey1:myvalue1,mykey2:myvalue2

         ddtrace-run sanic server:app --host=0.0.0.0 --port=8000 --workers=4 --debug --reload
         ```
      </TabItem>
   </Tabs>

### Sample Application

A working example is available at: https://github.com/cubeapm/sample_app_python_sanic/tree/datadog.

## Using Datadog APM SDK

### Installation

Install the ddtrace dependencies in your application. For reference follow the above steps: 1.

1. Add the following configuration in your application code at the top of your application's entry point (e.g. `main.py`) to send traces to datadog tracer.

   <Tabs>
      <TabItem value="file" label="Code">
         ```python
         # highlight-start
         # Datadog manual instrumentation SDK imports
         from ddtrace import tracer, patch_all
         
         # Initialize the SDK to patch all modules
         patch_all()
         # highlight-end

         # highlight-start
         @tracer.wrap(name="custom.python.method", resource="MyPythonClass.process")
         # highlight-end
         def process_data(data):
             # highlight-start
             # Access the active span to add a custom tag
             span = tracer.current_span()
             if span is not None:
                 span.set_tag("custom.data_length", len(data))
             # highlight-end
             
             # ... your logic here
         ```
      </TabItem>
   </Tabs>

:::info
   For more detailed information on Custom Instrumentation in Python, refer to the [Datadog Python Custom Instrumentation Documentation](https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/server-side/?api_type=dd_api&prog_lang=python).
:::

2. Follow these configuration to send traces to CubeAPM:

   <Tabs>
      <TabItem value="env" label="Environment Variables">
         ```shell
         DD_SERVICE=<app_name>
         
         # Send traces to CubeAPM.
         DD_TRACE_AGENT_URL=http://<cubeapm_endpoint>:3130
         
         # optional settings
         DD_ENV=myenv
         DD_VERSION=1.2.3
         DD_TAGS=mykey1:myvalue1,mykey2:myvalue2

         sanic server:app --host=0.0.0.0 --port=8000 --workers=4 --debug --reload
         ```
      </TabItem>
   </Tabs>

### Sample Application

A working example is available at: https://github.com/cubeapm/sample_app_python_sanic/tree/datadog.

## Using Datadog Agent

### Installation

Instrument your application using auto-instrumentation mentioned above and then install datadog agent to collect traces, metrics and logs and send it to CubeAPM.

1. Follow the step to configure datadog tracer to send data to datadog agent.

   <Tabs>
      <TabItem value="env" label="Environment Variables">
         ```shell
         DD_SERVICE=<app_name>
         
         # Send data to Datadog Agent
         # This automatically sets traces (8126) and metrics (8125)
         DD_AGENT_HOST=<datadog_agent_host_name>
         
         # Enable runtime metrics
         DD_RUNTIME_METRICS_ENABLED=true
         DD_RUNTIME_METRICS_RUNTIME_ID_ENABLED=true

         # optional settings
         DD_ENV=myenv
         DD_VERSION=1.2.3
         DD_TAGS=mykey1:myvalue1,mykey2:myvalue2

         ddtrace-run sanic server:app --host=0.0.0.0 --port=8000 --workers=4 --debug --reload
         ```
      </TabItem>
   </Tabs>

1. Configure Datadog Agent to forward metrics, traces and logs to CubeAPM.

   ```shell
   # Required.
   DD_API_KEY=<your_datadog_key>

   # send runtime metrics to CubeAPM
   DD_DD_URL=http://<cubeapm_endpoint>:3130

   # send traces to CubeAPM
   DD_APM_DD_URL=http://<cubeapm_endpoint>:3130

   # send logs to CubeAPM
   DD_LOGS_CONFIG_LOGS_DD_URL=<cubeapm_endpoint>:3130
   DD_LOGS_ENABLED=true
   DD_LOGS_INJECTION=true
   DD_LOGS_CONFIG_USE_HTTP=true
   DD_LOGS_CONFIG_LOGS_NO_SSL=true
   DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true

   # Accept traces and metrics from applications running outside the agent host
   DD_APM_NON_LOCAL_TRAFFIC=true
   DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true

   # optional settings
   DD_ENV=UNSET
   DD_VERSION=1.2.3
   DD_TAGS=mykey1:myvalue1,mykey2:myvalue2
   ```

### Sample Application

A working example is available at: https://github.com/cubeapm/sample_app_python_sanic/tree/datadog.

## Additional Configuration

To send data to CubeAPM and Datadog both, Add the following configuration in your datadog agent.

<Tabs>
   <TabItem value="env" label="Environment Variables">
      ```shell
      # Required
      # Original datadog api key.
      DD_API_KEY=<datadog api key> 

      # Your datadog URL.
      DD_SITE=<datadog site url>

      # Send data to Cubeapm and Datadog both.
      DD_APM_ADDITIONAL_ENDPOINTS={"<cubeapm_endpoint>:3130" :["<datadog api key>"]}
      ```
   </TabItem>
</Tabs>

## Troubleshooting

The following can be used for debugging:

<Tabs>
   <TabItem value="env" label="Environment Variables">
      ```shell
      # Print Datadog tracer startup logs on screen
      DD_TRACE_STARTUP_LOGS=true
      # Enable Datadog tracer debug logging if needed to see detailed logs
      DD_TRACE_DEBUG=true
      ```
   </TabItem>
</Tabs>
