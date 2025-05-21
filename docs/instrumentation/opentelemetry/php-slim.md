---
id: php-slim
title: "PHP Slim"
slug: /instrumentation/opentelemetry/php-slim
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Prerequisites

1. PHP 8.0+
2. composer

## Installation

1. Install the required dependencies:

   1. Install the required tools:

      <Tabs groupId="operating-systems">
         <TabItem value="lin" label="Linux">
            ```shell
            sudo apt-get install php-pear php-dev libtool make gcc autoconf libz-dev zip
            ```
         </TabItem>
         <TabItem value="mac" label="Mac">
            ```shell
            brew install php libtool make gcc autoconf zlib zip
            ```
         </TabItem>
      </Tabs>

   2. Build the extensions:

      ```shell
      sudo pecl install opentelemetry
      sudo pecl install protobuf
      ```

   3. Add the extensions to your php.ini file:

      ```shell
      [opentelemetry]
      extension=opentelemetry.so
      extension=protobuf.so
      ```

   4. Verify that the extensions are installed and enabled:

      ```shell
      php --ri opentelemetry
      php --ri protobuf
      ```

   5. Add additional dependencies to your application:

      ```shell
      composer config allow-plugins.php-http/discovery true
      composer require php-http/guzzle7-adapter \
      open-telemetry/sdk \
      open-telemetry/opentelemetry-auto-slim \
      open-telemetry/exporter-otlp \
      open-telemetry/opentelemetry-auto-psr15 \
      open-telemetry/opentelemetry-auto-psr18

      # Install instrumentation packages for libraries used in your project.
      # Visit the below link for a list of available instrumentation packages.
      # https://opentelemetry.io/ecosystem/registry/?component=instrumentation&language=php
      #
      #composer require open-telemetry/opentelemetry-auto-guzzle
      ```

2. Modify the application run command as follows:

   ```shell
   OTEL_PHP_AUTOLOAD_ENABLED=true \
   OTEL_SERVICE_NAME=<app_name> \
   OTEL_METRICS_EXPORTER=none \
   OTEL_LOGS_EXPORTER=none \
   OTEL_TRACES_EXPORTER=otlp \
   OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf \
   OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4318/v1/traces \
   OTEL_EXPORTER_OTLP_COMPRESSION=gzip \
   OTEL_PROPAGATORS=baggage,tracecontext \
   php myapp.php
   ```

Data should now be visible in your CubeAPM account.

## Sample Application

A working example is available at https://github.com/cubeapm/sample_app_php_slim/tree/otel.

## Troubleshooting

Traces exporter can be changed from `otlp` to `console` to output traces on console.

The following command can be tried on the application host server to check connectivity to CubeAPM server(s):

```shell
telnet <ip_address_of_cubeapm_server> 4318
```
