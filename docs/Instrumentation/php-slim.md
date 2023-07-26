---
id: php-slim
title: 'PHP Slim'
slug: /php-slim
---

## Steps to configure CubeAPM

### Prerequisites

1. PHP 8.0+
2. composer

### Installation

1. Add ```"minimum-stability": "beta"``` to your composer.json to allow it to pick correct versions of OpenTelemetry packages. The composer.json will look like this:
    ```
    {
        "require": {
            ...
        },
        "minimum-stability": "beta",
        "config": {
            ...
        }
    }
    ```

2. Install the required dependencies:

    1. Install the required tools:

        ```
        sudo apt-get install php-pear php-dev libtool \
        make gcc autoconf libz-dev zip
        ```

    2. Build the extensions (can take upto 15 minutes):

        ```
        pecl install grpc
        pecl install opentelemetry-beta
        pecl install protobuf
        ```
    3. Add the extensions to your php.ini file:

        ```
        [opentelemetry]
        extension=grpc.so
        extension=opentelemetry.so
        extension=protobuf.so
        ```

    4. Verify that the extensions are installed and enabled (the following command should list all
        the extensions we just installed:

        ```
        php -m | grep -P 'grpc|opentelemetry|protobuf'
        ```

    5. Add additional dependencies to your application:

        ```
        composer config allow-plugins.php-http/discovery true
        composer require php-http/guzzle7-adapter \
        open-telemetry/sdk \
        open-telemetry/opentelemetry-auto-slim \
        grpc/grpc \
        open-telemetry/exporter-otlp \
        open-telemetry/transport-grpc \
        open-telemetry/opentelemetry-auto-psr15 \
        open-telemetry/opentelemetry-auto-psr18
        ```

3. Modify the application run command as follows:

    ```
    OTEL_PHP_AUTOLOAD_ENABLED=true \
    OTEL_SERVICE_NAME=<app_name> \
    OTEL_METRICS_EXPORTER=none \
    OTEL_TRACES_EXPORTER=otlp \
    OTEL_EXPORTER_OTLP_PROTOCOL=grpc \
    OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=https://traces-ingest.spyk.ai:4317/opentele
    metry.proto.collector.trace.v1.TraceService/Export \
    OTEL_EXPORTER_OTLP_HEADERS='authorization=Bearer <spyk_token>' \
    OTEL_PROPAGATORS=baggage,tracecontext \
    php myapp.php
    ```

Data should now be visible in your CubeAPM account.