---
id: java
title: "Java"
slug: /instrumentation/datadog/java
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Installation

Following are the steps to install the Datadog agent and connect it with CubeAPM. If Datadog agent is already installed, you can jump to step 4.

1. Download the Datadog Java tracer jar.

   https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/


1. Modify the application run command as follows:

   ```shell
   java -javaagent:</path/dd-java-agent.jar> \
       -Ddd.service=<app_name> \
       -Ddd.agent.host=datadog-agent \
       -Ddd.env=myenv \
       -Ddd.version=1.2.3 \
       -Ddd.tags=mykey1:myvalue1,mykey2:myvalue2 \
       -jar <myapp>.jar
   ```

   Alternatively, the following environment variables can be set:

   ```shell
   JAVA_TOOL_OPTIONS=-javaagent:</path/dd-java-agent.jar>
   DD_SERVICE=<app_name>
   # Send data to Datadog Agent
   DD_AGENT_HOST=datadog-agent
   # optional settings
   DD_ENV=myenv
   DD_VERSION=1.2.3
   DD_TAGS=mykey1:myvalue1,mykey2:myvalue2
   ```

   :::info
   In Java , `DD_RUNTIME_METRICS_ENABLED` and `DD_RUNTIME_METRICS_RUNTIME_ID_ENABLED` value is `true` by default.
   :::

1. Configure Datadog Agent to forward metrics and traces to CubeAPM

   ```shell
   DD_API_KEY=<your_datadog_key>
   # highlight-start
   # send runtime metrics to CubeAPM
   DD_DD_URL=http://<ip_address_of_cubeapm_server>:3130
   # send traces to CubeAPM
   DD_APM_DD_URL=http://<ip_address_of_cubeapm_server>:3130
   # highlight-end
   # Accept traces and metrics from applications running outside the agent host
   DD_APM_NON_LOCAL_TRAFFIC=true
   DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true
   ```

## Sample App

A working example is available at https://github.com/cubeapm/sample_app_java_spring/tree/datadog

## Troubleshooting

The following can be used for troubleshooting:

```shell
# Print Datadog tracer startup logs on screen
DD_TRACE_STARTUP_LOGS=true
# Enable Datadog tracer debug logging if needed to see detailed logs
DD_TRACE_DEBUG=true
```
