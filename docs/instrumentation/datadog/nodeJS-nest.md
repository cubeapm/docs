---
id: nodeJs-nest
title: "NodeJS Nest"
slug: /instrumentation/datadog/nodejs-nest
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Prerequisites

Node.js >=18

## Installation

1. Install dependencies:

   ```shell
   npm install dd-trace
   ```

2. Initializes the Datadog tracer when your application starts:
   
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

1. Configure the agent.

   <Tabs>
      <TabItem value="env" label="Code">
         ```javascript
          const tracer = require('dd-trace').init({
            service: "<app_name>",
            // send traces to CubeAPM
            url: "http://<ip_address_of_cubeapm_server>:3130",

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
         # send traces to CubeAPM
         DD_TRACE_AGENT_URL=http://<ip_address_of_cubeapm_server>:3130

         # optional settings
         DD_ENV=myenv
         DD_VERSION=1.2.3
         DD_TAGS=mykey1:myvalue1,mykey2:myvalue2
         ```
      </TabItem>
   </Tabs>

## Sample Application

A working example is available at https://github.com/cubeapm/sample_app_nodejs_nest/tree/datadog.

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