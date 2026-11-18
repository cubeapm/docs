---
id: php-laravel
title: "PHP Laravel"
slug: /instrumentation/datadog/php-laravel
---

import AccountRouting from './\_account_routing.mdx';

## Installation

Following are the steps to install the Datadog agent and connect it with CubeAPM. If Datadog agent is already installed, you can jump to step 4.

1. Install the Datadog PHP tracer.

   ```shell
   curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
   php datadog-setup.php --php-bin=all
   rm datadog-setup.php
   ```

1. Configure the tracer for CLI (the config file is generally available at `/etc/php/<php_version>/cli/conf.d/98-ddtrace.ini`).

   ```ini title="ddtrace.ini"
   datadog.service = <app_name>
   # Send data to Datadog Agent
   datadog.agent_host = datadog-agent
   # optional settings
   datadog.env = myenv
   datadog.version = 1.2.3
   datadog.tags = mykey1:myvalue1,mykey2:myvalue2
   ```

1. Configure the tracer for FPM (the config file is generally available at `/etc/php/<php_version>/fpm/conf.d/98-ddtrace.ini`).

   ```ini title="ddtrace.ini"
   datadog.service = <app_name>
   # Send data to Datadog Agent
   datadog.agent_host = datadog-agent
   # optional settings
   datadog.env = myenv
   datadog.version = 1.2.3
   datadog.tags = mykey1:myvalue1,mykey2:myvalue2
   ```

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

1. <AccountRouting />

## Sample App

A working example is available at https://github.com/cubeapm/sample_app_php_laravel/tree/datadog.

## Troubleshooting

The following can be used for troubleshooting:

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
