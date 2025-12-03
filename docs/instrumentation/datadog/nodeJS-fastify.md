---
id: nodeJs-fastify
title: "NodeJS Fastify"
slug: /instrumentation/datadog/nodejs-fastify
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Prerequisites

Node.js >=18

## Installation

Following are the steps to install the Datadog agent and connect it with CubeAPM. If Datadog agent is already installed, you can jump to step 4.

1. Install dependencies:

   ```shell
   npm install dd-trace
   ```

1. Initializes the Datadog tracer when your application starts:
   
   <Tabs>
      <TabItem value="code" label="Code">
         Add the following line at the top of your project's main file.
         ```javascript
         const tracer = require('dd-trace').init();
         ```
      </TabItem>   
      <TabItem value="env" label="Environment Variables">
         ```shell
         NODE_OPTIONS=--require dd-trace/init
         ```
      </TabItem>
      <TabItem value="cmd" label="Startup Command">
         Add `--require dd-trace/init` to your application run command, e.g.,
         ```shell
         node --require dd-trace/init app.js
         ```
      </TabItem>
   </Tabs>

1. Configure the tracer.

   <Tabs>
      <TabItem value="env" label="Code">
         ```javascript
          const tracer = require('dd-trace').init({
            service: "<app_name>",
            // Send data to Datadog Agent
            hostname: "datadog-agent",
            dogstatsd: {hostname: "datadog-agent"},

            // Enable Runtime metrics
            runtimeMetrics: true,
            experimental:{
              runtimeId: true,
            }

            // optional settings
            env: "myenv",
            version: "1.2.3",
            tags: {
              mykey1: "myvalue1",
              mykey2: "myvalue2"
            },
          });
         ```
      </TabItem>
      <TabItem value="file" label="Environment Variables">
         ```shell
         DD_SERVICE=<app_name>
         # Send data to Datadog Agent
         DD_AGENT_HOST=datadog-agent

         # Enable runtime metrics 
         DD_RUNTIME_METRICS_ENABLED=true 
         DD_RUNTIME_METRICS_RUNTIME_ID_ENABLED=true 

         # optional settings
         DD_ENV=myenv
         DD_VERSION=1.2.3
         DD_TAGS=mykey1:myvalue1,mykey2:myvalue2
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

A working example is available at https://github.com/cubeapm/sample_app_nodejs_fastify/tree/datadog.

## Troubleshooting

The following can be used for debugging:

   <Tabs>
      <TabItem value="env" label="Code">
         ```javascript
          const tracer = require('dd-trace').init({
            startupLogs: true
            debug: true,
          });
         ```
      </TabItem>
      <TabItem value="file" label="Environment Variables">
         ```shell
         # Print Datadog tracer startup logs on screen
         DD_TRACE_STARTUP_LOGS=true
         # Enable Datadog tracer debug logging if needed to see detailed logs
         DD_TRACE_DEBUG=true
         ```
      </TabItem>
   </Tabs>