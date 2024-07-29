---
sidebar_position: 6
slug: /infra-monitoring/prometheus-metrics
---

# Prometheus Metrics

CubeAPM can store Prometheus metrics. These metrics can the be used for any purpose in CubeAPM, e.g., building dashboards, setting up alerts, etc.

Prometheus exporters generally expose data on `/metrics` HTTP path on given IP address and port. To collect these metrics from there and push them to CubeAPM, we use OpenTelemetry collector. The collector can be installed by following the appropriate link below:

- [Bare Metal / Virtual Machine](2_baremetal.md)
- [Kubernetes](3_kubernetes.md)

Once the collector is installed, we can add the below configuration to it to send the Prometheus metrics to CubeAPM:

```yaml title="config.yaml"
receivers:
  # Add prometheus receiver and configure it to scrape metrics
  prometheus:
    config:
      scrape_configs:
        - job_name: "varnish"
          scrape_interval: 60s
          static_configs:
            - targets: ["localhost:9131"]

service:
  pipelines:
    metrics:
      receivers:
        # add prometheus to the list of active receivers
        - prometheus
      processors:
        # ...
      exporters:
        # ...
```
