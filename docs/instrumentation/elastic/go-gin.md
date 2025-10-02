---
id: go-gin
title: "Go Gin"
slug: /instrumentation/elastic/go-gin
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Prerequisites

## Installation

1. Install dependencies:

   ```shell
   go get go.elastic.co/apm/v2 \
    go.elastic.co/apm/module/apmgin/v2
   ```

1. Add the highlighted lines below to your project's `main.go` file:

   ```go
   package main

   # highlight-start
   import "go.elastic.co/apm/module/apmgin/v2"
   import "go.elastic.co/apm/v2"
   # highlight-end

   func main() {
       // Create Gin router
       router := gin.Default()
       # highlight-start
       router.Use(gin.Recovery())
       router.Use(apmgin.Middleware(router))
       # highlight-end
   }
   ```
   :::info
   For more information, refer to the [Elastic APM Go agent](https://www.elastic.co/docs/reference/apm/agents/go/set-up-apm-go-agent#installation).
   :::

1. Configure the agent.

   <Tabs>
      <TabItem value="env" label="Environment Variables">
         ```shell
         ELASTIC_APM_SERVICE_NAME=<app_name>
         # send traces to CubeAPM
         ELASTIC_APM_SERVER_URL=http://<ip_address_of_cubeapm_server>:3130
         # optional settings
         ELASTIC_APM_ENVIRONMENT=myenv
         ELASTIC_APM_SERVICE_VERSION=1.2.3
         ELASTIC_APM_GLOBAL_LABELS=mykey1=myvalue1,mykey2=myvalue2
         ```
      </TabItem>  
   </Tabs>

## Sample Application

A working example is available at https://github.com/cubeapm/sample_app_go_gin/tree/elastic.

## Troubleshooting

The following can be used for debugging:

```shell
# Print Elastic agent logs on screen
ELASTIC_APM_LOG_FILE=stdout
# Set Elastic agent log level to debug if needed to see detailed logs
ELASTIC_APM_LOG_LEVEL=debug
```