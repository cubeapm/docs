---
id: nodeJs-nest
title: "NodeJS Nest"
slug: /instrumentation/datadog/nodejs-nest
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

CubeAPM is compatible with Datadog to send traces, metrics and logs to CubeAPM. Instrumenting datadog with application.

1. Using Datadog Auto-Instrumentation.
2. Using Datadog APM SDK.
3. Using Datadog Agent.

## Prerequisites

Node.js >=18

## Using Datadog auto-instrumentation

### Installation

Following are the steps to install the Datadog tracer and connect it with CubeAPM. If Datadog tracer is already installed, you can jump to step 2.

1. Install dependencies:

   ```shell
   npm install dd-trace
   ```

1. Initialize the Datadog tracer when your application starts:
   
   <Tabs>
      <TabItem value="code" label="Code">
         Add the following line at the top of your project's main file.
         ```javascript
         import tracer from 'dd-trace';
         tracer.init();
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
         node --require dd-trace/init main.ts
         ```
      </TabItem>
   </Tabs>

1. Configure the tracer to send traces to CubeAPM.

   <Tabs>
      <TabItem value="env" label="Environment Variables">
         ```shell
         DD_SERVICE=<app_name>

         # Send data directly to CubeAPM (Bypassing Datadog Agent)
         DD_TRACE_AGENT_URL=<cubeapm_endpoint>:3130

         # optional settings
         DD_ENV=myenv
         DD_VERSION=1.2.3
         DD_TAGS=mykey1:myvalue1,mykey2:myvalue2
         ```
      </TabItem>
   </Tabs>


### Sample Application

A working example is available at: https://github.com/cubeapm/sample_app_nodejs_nest/tree/datadog.

## Using Datadog APM SDK

### Installation

Setup the ddtrace/tracer dependencies in your application. For reference follow the above steps: 1.

1. Add the following configuration in your application code (e.g. main.ts) at the top to send traces to datadog agent.

   <Tabs>
      <TabItem value="env" label="Code">
         ```javascript
          import tracer from 'dd-trace';
            tracer.init({
               service: "<app_name>",

               // Send data to CubeAPM.
               url: "<cubeapm_endpoint>:3130",

               // optional settings
               // env: "myenv",
               // version: "1.2.3",
               // tags: {
               //   mykey1: "myvalue1",
               //   mykey2: "myvalue2"
               // },
            });
         ```
      </TabItem>
   </Tabs>

   :::info
   For more detailed information on Custom Instrumentation in Node.js, refer to the [Datadog Node.js Custom Instrumentation Documentation](https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/server-side/?api_type=dd_api&prog_lang=node_js#trace-annotation).
:::

### Sample Application

A working example is available at: https://github.com/cubeapm/sample_app_nodejs_nest/tree/datadog.


## Using Datadog Agent

### Installation

Instrument your application using either auto-instrumentation or SDK method mentioned above and then install datadog agent to collect traces, metrics and logs and send it to CubeAPM.

1. Follow the step to configure datadog tracer to send data to datadog agent.

   <Tabs>
      <TabItem value="code" label="Code">
         ```javascript
          import tracer from 'dd-trace';
            tracer.init({
               service: "<app_name>",

               // Send data to Datadog Agent
               // Use localhost:8126
               hostname: "<datadog-agent-endpoint>",
               // Use localhost:8125
               dogstatsd: { hostname: "<datadog-agent-endpoint>" },

               // Enable Runtime metrics
               runtimeMetrics: true,
               experimental: {
                  runtimeId: true,
               },

               // optional settings
               // env: "myenv",
               // version: "1.2.3",
               // tags: {
               //   mykey1: "myvalue1",
               //   mykey2: "myvalue2"
               // },
            });
         ```
      </TabItem>
      <TabItem value="env" label="Environment Variables">
      
      ```shell
      # Application name.
      DD_SERVICE=<app_name>

      # Send data to Datadog Agent
      DD_AGENT_HOST=<datadog_agent_host_name>

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

A working example is available at https://github.com/cubeapm/sample_app_nodejs_nest/tree/datadog.

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
