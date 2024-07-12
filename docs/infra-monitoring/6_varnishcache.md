---
sidebar_position: 6 
slug: /infra-monitoring/varnish-cache
---

# Varnish Cache

The recommended setup for infra monitoring with CubeAPM is to use OpenTelemetry (OTel) Collector for collecting the metrics(for Varnish) from host machines and sending them to CubeAPM. CubeAPM then provides visualization and alerting on the collected metrics.

The official OTel Collector helm chart is available at https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector.

## Installation

To make the integration work, set up the [Varnish Cache exporter for Prometheus](https://github.com/jonnenauha/prometheus_varnish_exporter/) to export metrics from Varnish. The latest releases and installation files are available on the [Varnish Cache exporter releases](https://github.com/jonnenauha/prometheus_varnish_exporter/releases/). Next, download the latest Varnish exporter for the operating system, such as Linux or Darwin and then, unzip the exporter and navigate to that directory using `cd dir_name`.The executable file will be named something like `prometheus_varnish_exporter`. For example:

```
sudo ./prometheus_varnish_exporter
```

The default port is `9131`, accessible at `localhost:9131`, with Prometheus metrics available at `localhost:9131/metrics`.

Here is a OpenTelemetry (OTel) Collector configuration file for monitoring Varnish Cache:

<details>
<summary>values.yaml</summary>

```yaml
mode: daemonset

image:
  repository: "otel/opentelemetry-collector-contrib"

presets:
  kubernetesAttributes:
    enabled: true
  kubeletMetrics:
    enabled: false
config:
  exporters:
    otlphttp:
      metrics_endpoint: http://host.minikube.internal:3130/api/metrics/v1/save/otlp
  processors:
    batch: {}
    resourcedetection:
      detectors: ["system"]
      system:
        hostname_sources: ["os"]
    resource/host.name:
      attributes:
        - key: host.name
          value: "${env:K8S_NODE_NAME}"
          action: upsert

  receivers:
    prometheus:
      config:
        scrape_configs:
          - job_name: "otel-collector"
            scrape_interval: 5s
            static_configs:
              - targets: ["localhost:9131"]
  service:
    pipelines:
      metrics:
        exporters:
          - otlphttp
        processors:
          - memory_limiter
          - batch
          - resourcedetection
          - resource/host.name
        receivers:
          - prometheus
```
</details>

In the Collector configuration file, set the `Prometheus receiver` to use the Varnish Prometheus endpoint as a scrape target.This example configures targets to scrape the metrics endpoint provided by the Varnish Prometheus exporter.

The OTel repository's readme contains further information on configuring the [Prometheus receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/prometheusreceiver/README.md/).