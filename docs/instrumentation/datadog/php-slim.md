---
id: php-slim
title: "PHP Slim"
slug: /instrumentation/datadog/php-slim
---

## Installation

1. Install the Datadog PHP tracer.
   ```shell
   curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
   php datadog-setup.php --php-bin=all
   rm datadog-setup.php
   ```

1. Configure the tracer for CLI (the config file is generally available at `/etc/php/<php_version>/cli/conf.d/98-ddtrace.ini`).

   ```ini title="ddtrace.ini"
   datadog.service = <app_name>
   # send traces to CubeAPM
   datadog.trace.agent_url = http://<ip_address_of_cubeapm_server>:3130
   # optional settings
   datadog.env = myenv
   datadog.version = 1.2.3
   datadog.tags = mykey1:myvalue1,mykey2:myvalue2
   ```

1. Configure the tracer for FPM (the config file is generally available at `/etc/php/<php_version>/fpm/conf.d/98-ddtrace.ini`).

   ```ini title="ddtrace.ini"
   datadog.service = <app_name>
   # send traces to CubeAPM
   datadog.trace.agent_url = http://<ip_address_of_cubeapm_server>:3130
   # optional settings
   datadog.env = myenv
   datadog.version = 1.2.3
   datadog.tags = mykey1:myvalue1,mykey2:myvalue2
   ```

## Sample App

A working example is available at https://github.com/cubeapm/sample_app_php_slim/tree/datadog.

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
