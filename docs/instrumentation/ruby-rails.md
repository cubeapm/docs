---
id: ruby-rails
title: "Ruby Rails"
slug: /instrumentation/ruby-rails
---

As of Dec 2024, OpenTelemetry does not provide auto-instrumentation for Rails. That said, a fully functional Rails instrumentation can be achieved as follows.

## Prerequisites

1. MRI Ruby >= 3.0, jruby >= 9.3.2.0, or truffleruby >= 22.1

2. Bundler


## Installation

1. Install dependencies:

   ```shell
   bundle add opentelemetry-sdk opentelemetry-instrumentation-all opentelemetry-exporter-otlp
   ```

2. Create a file `config/initializers/opentelemetry.rb` in your project directory, with the following content:

   ```ruby title="opentelemetry.rb"
    require 'opentelemetry/sdk'
    require 'opentelemetry/instrumentation/all'
    require 'opentelemetry-exporter-otlp'
    OpenTelemetry::SDK.configure do |c|
        c.service_name = 'sample_app_ruby_rails'
        c.use_all() # enables all instrumentation!
    end
   ```

3. Modify the application run command as follows:

   ```shell
   OTEL_METRICS_EXPORTER=none \
   OTEL_LOGS_EXPORTER=none \
   OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4318/v1/traces \
   OTEL_EXPORTER_OTLP_COMPRESSION=gzip \
   OTEL_SERVICE_NAME=<app_name> \
   bin/rails server 
   ```

## Troubleshooting

The following can be used for debugging:

```shell
OTEL_LOG_LEVEL=debug
```

The following command can be tried on the application host server to check connectivity to CubeAPM server(s):

```shell
telnet <ip_address_of_cubeapm_server> 4318
```
