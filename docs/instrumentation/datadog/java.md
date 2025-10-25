---
id: java
title: "Java"
slug: /instrumentation/datadog/java
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Installation

1. Download the Datadog Java tracer jar.

   https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/


2. Modify the application run command as follows:

   ```shell
   java -javaagent:</path/dd-java-agent.jar> \
       -Ddd.service=<app_name> \
       -Ddd.trace.agent.url=http://<ip_address_of_cubeapm_server>:3130 \
       -Ddd.env=myenv \
       -Ddd.version=1.2.3 \
       -Ddd.tags=mykey1:myvalue1,mykey2:myvalue2 \
       -jar <myapp>.jar
   ```

   Alternatively, the following environment variables can be set:

   ```shell
   JAVA_TOOL_OPTIONS=-javaagent:</path/dd-java-agent.jar>
   DD_SERVICE=<app_name>
   # send traces to CubeAPM
   DD_TRACE_AGENT_URL=http://<ip_address_of_cubeapm_server>:3130
   # optional settings
   DD_ENV=myenv
   DD_VERSION=1.2.3
   DD_TAGS=mykey1:myvalue1,mykey2:myvalue2
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
