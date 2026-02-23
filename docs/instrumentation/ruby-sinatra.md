---
id: ruby-sinatra
title: "Ruby Sinatra"
slug: /instrumentation/ruby-sinatra
---

As of Dec 2024, OpenTelemetry does not provide auto-instrumentation for Sinatra. That said, a fully functional Sinatra instrumentation can be achieved as follows.

## Prerequisites

1. MRI Ruby >= 3.0, jruby >= 9.3.2.0, or truffleruby >= 22.1

2. Bundler


## Installation

1. Install dependencies:

   ```shell
   bundle add opentelemetry-sdk opentelemetry-instrumentation-all opentelemetry-exporter-otlp
   ```

2. Add the highlighted lines below to your project's main file:

   ```ruby title="opentelemetry.rb"
    require 'sinatra'
    # highlight-start
    require 'opentelemetry/sdk'
    require 'opentelemetry/instrumentation/all'
    require 'opentelemetry-exporter-otlp'
    OpenTelemetry::SDK.configure do |c|
        c.service_name = 'sample_app_ruby_rails'
        c.use_all() # enables all instrumentation!
    end
    # highlight-end

    get '/' do
       'Hello world!'
    end
   ```

3. Modify the application run command as follows:

   ```shell
   OTEL_METRICS_EXPORTER=none \
   OTEL_LOGS_EXPORTER=none \
   OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4318/v1/traces \
   OTEL_EXPORTER_OTLP_COMPRESSION=gzip \
   OTEL_SERVICE_NAME=<app_name> \
   ruby myapp.rb
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
