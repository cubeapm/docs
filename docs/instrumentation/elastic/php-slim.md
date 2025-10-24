---
id: php-slim
title: "PHP Slim"
slug: /instrumentation/elastic/php-slim
---

## Installation

1. Follow this link to install Elastic APM PHP agent: https://www.elastic.co/docs/reference/apm/agents/php/set-up-apm-php-agent.

1. Configure the agent (the config file is generally available at `/opt/elastic/apm-agent-php/etc/elastic-apm-custom.ini`).

   ```ini title="elastic-apm-custom.ini"
   elastic_apm.service_name = "<app_name>"
   # send traces to CubeAPM
   elastic_apm.server_url = "http://<ip_address_of_cubeapm_server>:3130"
   # optional settings
   elastic_apm.environment = "UNSET"
   elastic_apm.service_version = "1.2.3"
   elastic_apm.global_labels = "mykey1=myvalue1,mykey2=myvalue2"
   ```

## Sample App

A working example is available at https://github.com/cubeapm/sample_app_php_slim/tree/elastic.

## Troubleshooting

The following can be used for troubleshooting:

```ini title="elastic-apm-custom.ini"
# Set Elastic agent log level to debug if needed to see detailed logs
elastic_apm.log_level=debug
```