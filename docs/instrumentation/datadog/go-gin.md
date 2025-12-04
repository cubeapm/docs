---
id: go-gin
title: "Go Gin"
slug: /instrumentation/datadog/go-gin
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Prerequisites

Go tracer requires Go version 1.18 or higher and Datadog Agent version 5.21.1 or later.

## Installation

Following are the steps to install the Datadog agent and connect it with CubeAPM. If Datadog agent is already installed, you can jump to step 4.

1. Install dependencies:

   ```shell
   go get github.com/DataDog/dd-trace-go/contrib/gin-gonic/gin/v2 \
       github.com/DataDog/dd-trace-go/v2/ddtrace/tracer
   ```

1. Add the highlighted lines below to your project's `main.go` file:

   ```go
   package main

   # highlight-start
   import gintrace "github.com/DataDog/dd-trace-go/contrib/gin-gonic/gin/v2"
   import "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
   # highlight-end

   func main() {
       # highlight-start
       tracer.Start()
	   defer tracer.Stop()
       # highlight-end
        // Create Gin router
	    router := gin.Default()
        # highlight-start
	    router.Use(gintrace.Middleware(""))
        # highlight-end
   }
   ```
   :::info
   For more information, refer to https://docs.datadoghq.com/tracing/trace_collection/library_config/go/.
   :::

1. Configure the tracer.

   <Tabs>
      <TabItem value="env" label="Environment Variables">
         ```shell
          DD_SERVICE=<app_name>
          # Send data to Datadog Agent
          DD_AGENT_HOST=<datadog_agent_host_name>

          # Enable runtime metrics 
          DD_RUNTIME_METRICS_ENABLED=true 

          # optional settings
          DD_ENV=myenv
          DD_VERSION=1.2.3
          DD_TAGS=mykey1:myvalue1,mykey2:myvalue2
         ```
      </TabItem>
      <TabItem value="file" label="Code">
         ```go
         func main() {
             # highlight-start
             tracer.Start(
                tracer.WithService("<app_name>"),
                // Send data to Datadog Agent
                tracer.WithAgentAddr("datadog-agent:8126"),
                tracer.WithDogstatsdAddr("datadog-agent:8125"),

                // Enable Runtime metrics
                tracer.WithRuntimeMetrics(),

                // optional settings
                tracer.WithEnv("myenv"),
                tracer.WithServiceVersion("1.2.3"),
                tracer.WithGlobalTag("mykey1:myvalue1,mykey2:myvalue2")
             )
	         defer tracer.Stop()
            # highlight-end
         }
         ```
      </TabItem>
   </Tabs>

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

## Sample Application

A working example is available at https://github.com/cubeapm/sample_app_go_gin/tree/datadog.

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