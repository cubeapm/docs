---
sidebar_position: 9
slug: /infra-monitoring/mongodb
---

# MongoDB

The recommended setup for MongoDB metrics monitoring with CubeAPM is to use OpenTelemetry (OTel) Collector for collecting the metrics from host machines and sending them to CubeAPM. CubeAPM then provides visualization and alerting on the collected metrics.

## Configuration

Here's a sample OTel Collector configuration file for MongoDB metrics monitoring.

```yaml title="config.yaml"
receivers:
  mongodb:
    hosts:
      - endpoint: localhost:27017
    # username: cubeapm
    # password: mypassword
    collection_interval: 60s
    tls:
      insecure: true
      # ca_file: /etc/otelcol-contrib/global-bundle.pem

processors:
  batch:

  resourcedetection:
    detectors:
      - system
    system:
      hostname_sources: ["os"]

  # resource/cube.environment:
  #   attributes:
  #     - key: cube.environment
  #       value: UNSET
  #       action: upsert

exporters:
  logging:
    verbosity: detailed
    sampling_initial: 5
    sampling_thereafter: 1

  otlphttp:
    metrics_endpoint: http://<cubeapm_endpoint>:3130/api/metrics/v1/save/otlp
    retry_on_failure:
      enabled: false

service:
  pipelines:
    metrics:
      receivers:
        - mongodb
      processors:
        - batch
        - resourcedetection
        # - resource/cube.environment
      exporters:
        - otlphttp
        # - logging

  telemetry:
    logs:
      level: info
    metrics:
      address: 0.0.0.0:8888
```

The OTel repository's readme contains further information on configuring the [MongoDB receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/mongodbreceiver).