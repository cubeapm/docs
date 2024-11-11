---
sidebar_position: 3
slug: /infra-monitoring/kubernetes
---

# Kubernetes

The recommended setup for infra monitoring with CubeAPM is to use OpenTelemetry (OTel) Collector for collecting the metrics from host machines and sending them to CubeAPM. CubeAPM then provides visualization and alerting on the collected metrics.

The official OTel Collector helm chart is available at https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector.

On k8s, the Collector can be in two modes - **daemonset** (collector runs as a daemonset on each k8s node) and **deployment** (collector runs as a k8s deployment with specified number of pods). For complete k8s monitoring, the Collector needs to be run both as daemonset and deployment. Below are the helm chart values for each mode.

<details>
<summary>values.yaml (daemonset)</summary>

```yaml
mode: daemonset
image:
  repository: "otel/opentelemetry-collector-contrib"
  # tag: 0.112.0
presets:
  kubernetesAttributes:
    enabled: true
  hostMetrics:
    enabled: true
  kubeletMetrics:
    enabled: true
config:
  exporters:
    debug:
      verbosity: detailed
      sampling_initial: 5
      sampling_thereafter: 1
    otlphttp:
      metrics_endpoint: http://<cubeapm_endpoint>:3130/api/metrics/v1/save/otlp
      retry_on_failure:
        enabled: false
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
    kubeletstats:
      collection_interval: 60s
      insecure_skip_verify: true
      metric_groups:
        - container
        - node
        - pod
        - volume
      extra_metadata_labels:
        # - container.id
        - k8s.volume.type
    hostmetrics:
      collection_interval: 60s
      scrapers:
        cpu:
        disk:
        # load:
        filesystem:
        memory:
        network:
        # paging:
        # processes:
        # process:
        #   mute_process_name_error: true
        #   mute_process_exe_error: true
        #   mute_process_io_error: true
        #   mute_process_user_error: true
  service:
    pipelines:
      metrics:
        exporters:
          # - debug
          - otlphttp
        processors:
          - memory_limiter
          - batch
          - resourcedetection
          - resource/host.name
        receivers:
          - hostmetrics
          - kubeletstats

clusterRole:
  rules:
    # needed for receivers.kubeletstats.extra_metadata_labels.(*)
    # https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/v0.89.0/receiver/kubeletstatsreceiver#role-based-access-control
    - apiGroups: [""]
      resources: ["nodes/proxy"]
      verbs: ["get"]
```

</details>

<details>
<summary>values.yaml (deployment)</summary>

```yaml
mode: deployment
image:
  repository: "otel/opentelemetry-collector-contrib"
  # tag: 0.112.0
presets:
  kubernetesEvents:
    enabled: true
  clusterMetrics:
    enabled: true
config:
  exporters:
    debug:
      verbosity: detailed
      sampling_initial: 5
      sampling_thereafter: 1
    otlphttp:
      metrics_endpoint: http://<cubeapm_endpoint>:3130/api/metrics/v1/save/otlp
      retry_on_failure:
        enabled: false
    otlphttp/k8s-events:
      logs_endpoint: http://<cubeapm_endpoint>:3130/api/logs/insert/opentelemetry/v1/logs
      headers:
        Cube-Stream-Fields: event.domain
  processors:
    batch: {}
  receivers:
    k8s_cluster:
      collection_interval: 60s
      allocatable_types_to_report:
        - cpu
        - memory
      metrics:
        k8s.node.condition:
          enabled: true
  service:
    pipelines:
      metrics:
        exporters:
          # - debug
          - otlphttp
        processors:
          - memory_limiter
          - batch
        receivers:
          - k8s_cluster
      logs:
        exporters:
          # - debug
          - otlphttp/k8s-events
        processors:
          - memory_limiter
          - batch
        receivers:
          - k8sobjects
```

</details>

See [Configuration](2_baremetal.md#configuration) for additional Collector configuration, e.g., to monitor Redis, MySQL, etc.
