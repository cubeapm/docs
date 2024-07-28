---
sidebar_position: 13
slug: /infra-monitoring/postgresql
---

# PostgreSQL

The recommended setup for PostgreSQL metrics monitoring with CubeAPM is to use OpenTelemetry (OTel) Collector for collecting the metrics from host machines and sending them to CubeAPM. CubeAPM then provides visualization and alerting on the collected metrics.

## Configuration

Here's a sample OTel Collector configuration file for PostgreSQL metrics monitoring.

```yaml title="config.yaml"
receivers:
  postgresql:
    endpoint: localhost:5432
    transport: tcp
    username: cubeapm
    password: mypassword
    # databases:
    #   - otel
    # exclude_databases:
    #   - rdsadmin
    collection_interval: 60s
    tls:
      insecure: true

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
        - postgresql
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

The OTel repository's readme contains further information on configuring the [PostgreSQL receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/postgresqlreceiver).
