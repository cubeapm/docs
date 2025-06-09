---
id: ruby-rails
title: "Ruby Rails"
slug: /instrumentation/opentelemetry/ruby-rails
---

## Prerequisites

- CRuby >= 3.0, JRuby >= 9.3.2.0, or TruffleRuby >= 22.1
- Bundler

## Installation

1. Please include these gems in the Gemfile:

   ```shell
   gem 'opentelemetry-sdk'
   gem 'opentelemetry-exporter-otlp'
   gem 'opentelemetry-instrumentation-all'
   ```

1. Create a file `opentelemetry.rb` in your project directory, with the following content:

    ```shell
    # config/initializers/opentelemetry.rb
    require 'opentelemetry/sdk'
    require 'opentelemetry/instrumentation/all'
    require 'opentelemetry-exporter-otlp'
    OpenTelemetry::SDK.configure do |c|
        c.use_all() # enables all instrumentation!
    end
    ```

1. Modify the application run command as follows:

   ```shell
   OTEL_SERVICE_NAME=<app_name> \
   OTEL_TRACES_EXPORTER=otlp \
   OTEL_METRICS_EXPORTER=none \
   OTEL_LOGS_EXPORTER=none \
   OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4318/v1/traces \
   OTEL_EXPORTER_OTLP_COMPRESSION=gzip \
   bin/rails server
   ```

## Sample App

A working example is available at https://github.com/cubeapm/sample_app_ruby_rails/tree/otel

## Troubleshooting

The following can be used for debugging:

```
OTEL_LOG_LEVEL=debug
```

Also, traces exporter can be changed from `otlp` to `console` to output traces on console.

The following command can be tried on the application host server to check connectivity to CubeAPM server(s):

```shell
telnet <ip_address_of_cubeapm_server> 4318
```
