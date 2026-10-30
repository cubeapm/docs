---
id: ruby-rails
title: "Ruby Rails"
slug: /instrumentation/datadog/ruby-rails
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

Following are the steps to install the Datadog tracer and connect it with CubeAPM.

1. Add the below gem to your Gemfile:

   ```shell
   gem 'datadog', require: 'datadog/auto_instrument'
   ```

1. Create a file config/initializers/datadog.rb in your project directory, with the following content:
   
   ```ruby title="config/initializers/datadog.rb"
   Datadog.configure do |c|
    # Add additional configuration here.
    # Activate integrations, change tracer settings, etc...
    # [Datadog Ruby Rails Setup](https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/#rails)
   end
   ```

1. Configure the tracer to send it to CubeAPM.

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

A working example is available at: https://github.com/cubeapm/sample_app_ruby_rails/tree/datadog.

## Using Datadog APM SDK

### Installation

Setup the datadog in your application. Follow the below configuration.

1. Add the below gem to your Gemfile:

   ```shell
   gem 'datadog'
   ```

1. Configure the tracing in your `config/initializers/datadog.rb`:

   ```ruby title="config/initializers/datadog.rb"
   Datadog.configure do |c|
      # 1. Global Settings (Just like the init block in Node.js)
      # c.service = 'sample_app_ruby_rails'
      # c.env = 'development'
      # c.version = '1.0.0'

      # 2. Manual Plugin Instrumentation
      # If you remove "require: 'datadog/auto_instrument'" from your Gemfile,
      # you must manually tell Datadog which libraries to hook into:
      c.tracing.instrument :rails
      c.tracing.instrument :redis
      c.tracing.instrument :faraday
      c.tracing.instrument :mysql2
    end
    ```

   :::info
   For more detailed information, refer to the [Datadog Ruby Documentation](https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/ruby/#rails) and the [Datadog Ruby Custom Instrumentation Documentation](https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/server-side/?api_type=dd_api&prog_lang=ruby).
   :::

1. Add the following configuration in your application environment to send traces to CubeAPM.

   <Tabs>
      <TabItem value="env" label="Environment Variable">
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

A working example is available at: https://github.com/cubeapm/sample_app_ruby_rails/tree/datadog.


## Using Datadog Agent

### Installation

Instrument your application using either auto-instrumentation or SDK method mentioned above and then install datadog agent to collect traces, metrics and logs and send it to CubeAPM.

1. Follow the step to configure datadog tracer to send data to datadog agent.

   <Tabs>
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

A working example is available at https://github.com/cubeapm/sample_app_ruby_rails/tree/datadog.

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


