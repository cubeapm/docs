---
id: php-slim
title: "PHP Slim"
slug: /instrumentation/datadog/php-slim
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

CubeAPM is compatible with Datadog to send traces, metrics and logs to CubeAPM. Instrumenting datadog with application.

1. Using Datadog Auto-Instrumentation.
2. Using Datadog Agent.

## Prerequisites

PHP >= 7.0

## Using Datadog auto-instrumentation

### Installation

Following are the steps to install the Datadog PHP tracer and connect it with CubeAPM.

1. Install the Datadog PHP tracer.

   ```shell
   curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
   php datadog-setup.php --php-bin=all
   rm datadog-setup.php
   ```

1. Configure the tracer to send traces to CubeAPM.

   <Tabs>
      <TabItem value="cli" label="CLI config">
         The config file is generally available at `/etc/php/<php_version>/cli/conf.d/98-ddtrace.ini`.
         ```ini title="ddtrace.ini"
         datadog.service = <app_name>
         
         # Send data directly to CubeAPM (Bypassing Datadog Agent)
         datadog.trace.agent_url = http://<cubeapm_endpoint>:3130
         
         # optional settings
         datadog.env = myenv
         datadog.version = 1.2.3
         datadog.tags = mykey1:myvalue1,mykey2:myvalue2
         ```
      </TabItem>
      <TabItem value="fpm" label="FPM config">
         The config file is generally available at `/etc/php/<php_version>/fpm/conf.d/98-ddtrace.ini`.
         ```ini title="ddtrace.ini"
         datadog.service = <app_name>
         
         # Send data directly to CubeAPM (Bypassing Datadog Agent)
         datadog.trace.agent_url = http://<cubeapm_endpoint>:3130
         
         # optional settings
         datadog.env = myenv
         datadog.version = 1.2.3
         datadog.tags = mykey1:myvalue1,mykey2:myvalue2
         ```
      </TabItem>
      <TabItem value="env" label="Environment Variables">
         You can also set these using environment variables.
         ```shell
         DD_SERVICE=<app_name>
         
         # Send data directly to CubeAPM (Bypassing Datadog Agent)
         DD_TRACE_AGENT_URL=http://<cubeapm_endpoint>:3130
         
         # optional settings
         DD_ENV=myenv
         DD_VERSION=1.2.3
         DD_TAGS=mykey1:myvalue1,mykey2:myvalue2
         ```
      </TabItem>
   </Tabs>

### Sample Application

A working example is available at: https://github.com/cubeapm/sample_app_php_slim/tree/datadog.

## Custom Instrumentation

In PHP, custom instrumentation is handled natively by the Datadog C-extension (`ddtrace.so`), so you do not need to install an additional Composer package for standard custom tracing.

You can trace custom methods using the `\DDTrace\` namespace provided by the extension:

```php
\DDTrace\trace_method('MyService', 'processPayment', function (\DDTrace\SpanData $span) {
    $span->name = 'custom.payment.process';
    $span->resource = 'MyService.processPayment';
});
```

:::info
   For more detailed information on Custom Instrumentation in PHP, refer to the [Datadog PHP Custom Instrumentation Documentation](https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/server-side/?api_type=dd_api&prog_lang=php).
:::

## Using Datadog Agent

### Installation

Instrument your application using auto-instrumentation mentioned above and then install datadog agent to collect traces, metrics and logs and send it to CubeAPM.

1. Follow the step to configure datadog tracer to send data to datadog agent.

   <Tabs>
      <TabItem value="cli" label="CLI config">
         ```ini title="ddtrace.ini"
         datadog.service = <app_name>
         
         # Send data to Datadog Agent
         # This automatically sets traces (8126) and metrics (8125)
         datadog.agent_host = <datadog_agent_host_name>

         # optional settings
         datadog.env = myenv
         datadog.version = 1.2.3
         datadog.tags = mykey1:myvalue1,mykey2:myvalue2
         ```
      </TabItem>
      <TabItem value="fpm" label="FPM config">
         ```ini title="ddtrace.ini"
         datadog.service = <app_name>
         
         # Send data to Datadog Agent
         # This automatically sets traces (8126) and metrics (8125)
         datadog.agent_host = <datadog_agent_host_name>

         # optional settings
         datadog.env = myenv
         datadog.version = 1.2.3
         datadog.tags = mykey1:myvalue1,mykey2:myvalue2
         ```
      </TabItem>
      <TabItem value="env" label="Environment Variables">
         ```shell
         DD_SERVICE=<app_name>
         
         # Send data to Datadog Agent
         # This automatically sets traces (8126) and metrics (8125)
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

A working example is available at: https://github.com/cubeapm/sample_app_php_slim/tree/datadog.

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
   <TabItem value="ini" label="INI config">
      ```ini title="ddtrace.ini"
      # When enabled, sends debug logs to PHP's error_log instead of datadog.trace.log_file
      datadog.trace.debug = On
      # Send debug logs to a log file for CLI
      datadog.trace.log_file = /var/log/php8.3-cli.log
      # Send debug logs to a log file for FPM
      datadog.trace.log_file = /var/log/php8.3-fpm.log

      # Enable Datadog tracer debug logging if needed to see detailed log 
      datadog.trace.log_level = debug
      ```
   </TabItem>
   <TabItem value="env" label="Environment Variables">
      ```shell
      # Print Datadog tracer startup logs on screen
      DD_TRACE_STARTUP_LOGS=true
      # Enable Datadog tracer debug logging if needed to see detailed logs
      DD_TRACE_DEBUG=true
      # Send debug logs to a specific log file
      DD_TRACE_LOG_FILE=/var/log/php-ddtrace.log
      ```
   </TabItem>
</Tabs>
