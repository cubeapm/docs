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
  logsCollection:
    enabled: true
    # includeCollectorLogs: true
    storeCheckpoints: true
config:
  exporters:
    debug:
      verbosity: detailed
      sampling_initial: 5
      sampling_thereafter: 1
    otlphttp/metrics:
      metrics_endpoint: http://<cubeapm_endpoint>:3130/api/metrics/v1/save/otlp
      retry_on_failure:
        enabled: false
    otlphttp/logs:
      logs_endpoint: http://<cubeapm_endpoint>:3130/api/logs/insert/opentelemetry/v1/logs
      headers:
        Cube-Stream-Fields: k8s.namespace.name,k8s.deployment.name,k8s.statefulset.name
    otlp/traces:
      endpoint: <cubeapm_endpoint>:4317
      tls:
        insecure: true
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
    resource/cube.environment:
      attributes:
        - key: cube.environment
          value: UNSET
          action: upsert
    # transform/logs_extract_fields:
    #   error_mode: ignore
    #   log_statements:
    #     - context: log
    #       statements:
    #         # https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/ottl/ottlfuncs#extractpatterns
    #         - set(cache, ExtractPatterns(body, "\\[(?P<log_level>debug|info|warn|warning|error)\\]"))
    #         - flatten(cache, "")
    #         - merge_maps(attributes, cache, "upsert")
    transform/logs_parse_json_body:
      error_mode: ignore
      log_statements:
        - context: log
          conditions:
            - body != nil and IsString(body) and Substring(body, 0, 2) == "{\""
          statements:
            - set(cache, ParseJSON(body))
            - flatten(cache, "")
            - merge_maps(attributes, cache, "upsert")
            # - set(time, Time(attributes["Timestamp"], "%Y-%m-%dT%H:%M:%S%j"))
            # - set(severity_text, "DEBUG") where attributes["Level"] == "Debug"
            # - set(severity_number, 5) where attributes["Level"] == "Debug"
  receivers:
    otlp:
      protocols:
        grpc: {}
        http: {}
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
        #   mute_process_all_errors: true
  service:
    pipelines:
      traces:
        exporters:
          # - debug
          - otlp/traces
        processors:
          - memory_limiter
          - batch
          # traces would normally have host.name attribute set to pod name.
          # resourcedetection and resource/host.name processors will override
          # it with the node name.
          # - resourcedetection
          # - resource/host.name
          # - resource/cube.environment
        receivers:
          - otlp
      metrics:
        exporters:
          # - debug
          - otlphttp/metrics
        processors:
          - memory_limiter
          - batch
          - resourcedetection
          - resource/host.name
          # - resource/cube.environment
        receivers:
          - hostmetrics
          - kubeletstats
      logs:
        exporters:
          # - debug
          - otlphttp/logs
        processors:
          - memory_limiter
          # - transform/logs_extract_fields
          - transform/logs_parse_json_body
          - batch
          - resourcedetection
          - resource/host.name
          # - resource/cube.environment

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
    otlphttp/metrics:
      metrics_endpoint: http://<cubeapm_endpoint>:3130/api/metrics/v1/save/otlp
      retry_on_failure:
        enabled: false
    otlphttp/k8s-events:
      logs_endpoint: http://<cubeapm_endpoint>:3130/api/logs/insert/opentelemetry/v1/logs
      headers:
        Cube-Stream-Fields: event.domain
  processors:
    batch: {}
    resource/cube.environment:
      attributes:
        - key: cube.environment
          value: UNSET
          action: upsert
    transform/logs_flatten_map:
      error_mode: ignore
      log_statements:
        - context: log
          conditions:
            - body != nil and IsMap(body)
          statements:
            - set(cache, body)
            - flatten(cache, "")
            - merge_maps(attributes, cache, "upsert")
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
          - otlphttp/metrics
        processors:
          - memory_limiter
          - batch
          # - resource/cube.environment
        receivers:
          - k8s_cluster
      logs:
        exporters:
          # - debug
          - otlphttp/k8s-events
        processors:
          - memory_limiter
          - transform/logs_flatten_map
          - batch
          # - resource/cube.environment
        receivers:
          - k8sobjects
```

</details>

See [Configuration](2_baremetal.md#configuration) for additional Collector configuration, e.g., to monitor Redis, MySQL, etc.
