---
id: go-gin
title: "Go Gin"
slug: /instrumentation/datadog/go-gin
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Prerequisites

Go tracer requires Go version 1.18 or higher and a Datadog Agent version 5.21.1 or later.

## Installation

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
   For more information, refer to the [Datadog Go agent](https://docs.datadoghq.com/tracing/trace_collection/library_config/go/).
   :::

1. Configure the agent.

   <Tabs>
      <TabItem value="env" label="Environment Variables">
         ```shell
          DD_SERVICE=<app_name>
          # send traces to CubeAPM
          DD_TRACE_AGENT_URL=http://<ip_address_of_cubeapm_server>:3130

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
                // send traces to CubeAPM
                tracer.WithAgentURL("http://<ip_address_of_cubeapm_server>:3130")

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