---
sidebar_position: 6
slug: /infra-monitoring/elasticsearch
---

# Elasticsearch

The recommended setup for Elasticsearch metrics monitoring with CubeAPM is to use OpenTelemetry (OTel) Collector for collecting the metrics from host machines and sending them to CubeAPM. CubeAPM then provides visualization and alerting on the collected metrics.

## Configuration

Here's a sample OTel Collector configuration file for Elasticsearch metrics monitoring.

```yaml title="config.yaml"
receivers:
  elasticsearch:
    metrics:
      elasticsearch.node.fs.disk.available:
        enabled: false
    nodes: ["_local"]
    skip_cluster_metrics: true
    indices: [".geoip_databases"]
    endpoint: http://localhost:9200
    # username: cubeapm
    # password: mypassword
    collection_interval: 10s

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
        - elasticsearch
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

The OTel repository's readme contains further information on configuring the [Elasticsearch receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/elasticsearchreceiver).