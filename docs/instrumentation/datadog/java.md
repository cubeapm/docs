---
id: java
title: "Java"
slug: /instrumentation/datadog/java
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

CubeAPM is compatible with Datadog to send traces, metrics and logs to CubeAPM. Instrumenting datadog with application.

1. Using Datadog Auto-Instrumentation.
2. Using Datadog APM SDK.
3. Using Datadog Agent.

## Using Datadog auto-instrumentation

### Installation

Following are the steps to install the Datadog tracer and connect it with CubeAPM. If Datadog tracer is already installed, you can jump to step 2.

1. Download the Datadog Java tracer jar.

   [Datadog Java Tracer Installation Documentation](https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/)

1. Follow below configuration to send traces to CubeAPM:

   <Tabs>
      <TabItem value="runtime" label="Runtime">
         ```shell
         java -javaagent:</path/dd-java-agent.jar> \
            -Ddd.service=<app_name> \
            # Send traces to CubeAPM.
            -Ddd.trace.agent.url=<cubeapm_endpoint>:3130 \
            -Ddd.env=myenv \
            -Ddd.version=1.2.3 \
            -Ddd.tags=mykey1:myvalue1,mykey2:myvalue2 \
            # Java service jar name.
            -jar <myapp>.jar
         ```
      </TabItem>
      <TabItem value="env" label="Environment Variables">
      
      ```shell
      # Application name.
      DD_SERVICE=<app_name>

      # Send traces to CubeAPM.
      DD_TRACE_AGENT_URL=<cubeapm_endpoint>:3130

      # optional settings
      DD_ENV=myenv
      DD_VERSION=1.2.3
      DD_TAGS=mykey1:myvalue1,mykey2:myvalue2
      ```
      </TabItem>
   </Tabs>

### Sample Application

A working example is available at: https://github.com/cubeapm/sample_app_java_spring/tree/datadog.


## Using Datadog APM SDK

### Installation

Download the ddtrace/tracer jar in your application. For reference follow the above steps: 1.

1. Add the following configuration in your application code in any class that contains the business logic or method you want to measure to send traces to datadog tracer.

   <Tabs>
      <TabItem value="file" label="Code">
         ```java
         # highlight-start
         // Datadog manual instrumentation SDK imports
         import datadog.trace.api.Trace;

         // OpenTracing imports for active span manipulation
         import io.opentracing.Span;
         import io.opentracing.util.GlobalTracer;
         import io.opentracing.tag.Tags;
         # highlight-end

         @GetMapping("/param/{param}")
         # highlight-start
         @Trace(operationName = "web.request", resourceName = "app.getParam")
         # highlight-end
         public String getParam(@PathVariable String param) {
            logger.info("GET /param/{} called", param);

            # highlight-start
            // Access the active span to add a custom tag
            Span span = GlobalTracer.get().activeSpan();
            if (span != null) {
                span.setTag("my.custom.param", param);
            }
            # highlight-end

            return "Got param " + param;
            }
         }
         ```
      </TabItem>
   </Tabs>

:::info
   For more detailed information on Custom Instrumentation in Java, refer to the [Datadog Java Custom Instrumentation Documentation](https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/server-side/?api_type=dd_api&prog_lang=java#trace-annotation).
:::

2. Follow these configuration to send traces to CubeAPM:

   <Tabs>
      <TabItem value="runtime" label="Runtime">
         ```shell
         java -javaagent:</path/dd-java-agent.jar> \
            -Ddd.service=<app_name> \
            # Send traces to CubeAPM.
            -Ddd.trace.agent.url=<cubeapm_endpoint>:3130 \
            -Ddd.env=myenv \
            -Ddd.version=1.2.3 \
            -Ddd.tags=mykey1:myvalue1,mykey2:myvalue2 \
            # Java service jar name.
            -jar <myapp>.jar
         ```
      </TabItem>
      <TabItem value="env" label="Environment Variables">
      
      ```shell
      # Application name.
      DD_SERVICE=<app_name>

      # Send traces to CubeAPM.
      DD_TRACE_AGENT_URL=<cubeapm_endpoint>:3130

      # optional settings
      DD_ENV=myenv
      DD_VERSION=1.2.3
      DD_TAGS=mykey1:myvalue1,mykey2:myvalue2
      ```
      </TabItem>
   </Tabs>


### Sample Application

A working example is available at: https://github.com/cubeapm/sample_app_java_spring_dd_sdk.


## Using Datadog Agent

### Installation

Instrument your application using either auto-instrumentation or SDK method mentioned above and then install datadog agent to collect traces, metrics and logs and send it to CubeAPM.

1. Follow the step to configure datadog tracer to send data to datadog agent.

   <Tabs>
      <TabItem value="runtime" label="Runtime">
         ```shell
         java -javaagent:</path/dd-java-agent.jar> \
            -Ddd.service=<app_name> \
            # Send traces to CubeAPM.
            -Ddd.trace.agent.url=<cubeapm_endpoint>:3130 \
            -Ddd.env=myenv \
            -Ddd.version=1.2.3 \
            -Ddd.tags=mykey1:myvalue1,mykey2:myvalue2 \
            # Java service jar name.
            -jar <myapp>.jar
         ```
      </TabItem>
      <TabItem value="env" label="Environment Variables">
      
      ```shell
      # Application name.
      DD_SERVICE=<app_name>

      # Send traces to CubeAPM.
      DD_TRACE_AGENT_URL=<cubeapm_endpoint>:3130

      # optional settings
      DD_ENV=myenv
      DD_VERSION=1.2.3
      DD_TAGS=mykey1:myvalue1,mykey2:myvalue2
      ```
      </TabItem>
   </Tabs>


1. Configure Datadog Agent to forward metrics, traces and logs to CubeAPM.

   ```shell
   # Required.
   DD_API_KEY=<your_datadog_key>

   # highlight-start
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
   # highlight-end

   # Accept traces and metrics from applications running outside the agent host
   DD_APM_NON_LOCAL_TRAFFIC=true
   DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true

   # optional settings
   DD_ENV=UNSET
   DD_VERSION=1.2.3
   DD_TAGS=mykey1:myvalue1,mykey2:myvalue2
   ```

### Sample Application

A working example is available at https://github.com/cubeapm/sample_app_java_spring/tree/datadog.

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
   <TabItem value="file" label="Code">
      ```go
          tracer.Start(
              // Print Datadog tracer startup logs on screen
              tracer.WithLogStartup(true)
              // Enable Datadog tracer debug logging if needed to see detailed logs
              tracer.WithDebugMode(true)
          )
	      defer tracer.Stop()
         # highlight-end
      ```
   </TabItem>
</Tabs>
