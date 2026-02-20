---
sidebar_position: 3
slug: /infra-monitoring/kubernetes
---

# Kubernetes

The recommended setup for infra monitoring with CubeAPM is to use OpenTelemetry (OTel) Collector for collecting the metrics from various infrastructure components and sending them to CubeAPM. CubeAPM then provides visualization and alerting on the collected metrics.

The official OTel Collector helm chart is available at https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector.

On k8s, the Collector can be in two modes - **daemonset** (collector runs as a daemonset on each k8s node) and **deployment** (collector runs as a k8s deployment with specified number of pods). For complete k8s monitoring, the Collector needs to be run both as daemonset and deployment.

## Installation

1. Add the OpenTelemetry Helm chart repository.

   ```shell
   helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
   # Use the following command to update if the repo is already added.
   helm repo update open-telemetry
   ```

1. Copy the files below and save as `otel-collector-daemonset.yaml` and `otel-collector-deployment.yaml` respectively. Edit them to customize the configuration as per your requirements.

   <details>
   <summary>otel-collector-daemonset.yaml</summary>

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
       # filter/metrics:
       #   error_mode: ignore
       #   metrics:
       #     metric:
       #       # only include my-namespace
       #       - resource.attributes["k8s.namespace.name"] != "my-namespace"
       # filter/logs:
       #   error_mode: ignore
       #   logs:
       #     log_record:
       #       # only include my-namespace
       #       - resource.attributes["k8s.namespace.name"] != "my-namespace"
       # transform/logs_redact:
       #   error_mode: ignore
       #   log_statements:
       #     - context: log
       #       statements:
       #         # https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/ottl/ottlfuncs#replace_pattern
       #         # - replace_pattern(attributes["http.url"], "client_id=[^&]+", "client_id=[REDACTED]")
       #         - replace_pattern(body, "\"(token|password)\":\"[^\"]*\"", "\"$$1\":\"****\"")
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
           load:
           filesystem:
           memory:
           network:
           # paging:
           # processes:
           # process:
           #   mute_process_all_errors: true
       # https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver#file-log-receiver
       filelog:
         preserve_leading_whitespaces: true
         # Note: `include_file_path` must not be set to false, else recombine
         # operator will mix up logs from different files.
         include_file_path: true

         # The maximum size of a log entry to read. A log entry will be truncated if it is
         # larger than max_log_size. Protects against reading large amounts of data into memory.
         # max_log_size: 1MiB

         # A map of key: value pairs to add to the entry's attributes.
         # attributes: {}
         # A map of key: value pairs to add to the entry's resource.
         # resource: {}

         # https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/stanza/docs/operators/README.md
         operators:
           # The container operator parses logs in docker, cri-o and containerd formats.
           # Uncomment if running in container environment.
           #
           # container-parser is added by helm chart. But if we define operators,
           # then the helm chart does not add it, so we need to add it here.
           - id: container-parser
             type: container
             max_log_size: 1000000

           # - id: filter
           #   type: filter
           #   # matching logs are DROPPED
           #   expr: <expression>

           # Format specific handling
           # Step 1: Detect format and send logs to respective handlers.
           - id: format_handler_router
             type: router
             routes:
               # Only select keys are available in resource
               # Ref: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.142.0/pkg/stanza/docs/operators/container.md#add-metadata-from-file-path
               # Particularly, k8sattributesprocessor is executed later in the pipeline,
               # so any attributes added by it are not available here.
               - expr: resource["k8s.container.name"] == "my_java_app"
                 output: java_parser
             # Send logs to end_of_format_handler
             default: end_of_format_handler

           # Step 2: Process each format (repeat for each format)
           - id: java_parser
             type: noop
           - id: java_multiline
             type: recombine
             combine_field: body
             is_first_entry: body matches "^\\d{4}-\\d{2}-\\d{2}"
             # force_flush_period: 5s
             # source_identifier: attributes["log.file.path"]
           - id: java_extract_fields
             type: regex_parser
             regex: (?P<timestamp_field>\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}(?:[,.]\d+)?[+-]\d{2}:\d{2})\s+\[(?P<severity_field>[A-Z]+)\]\s+(?P<message>.+)
             # if: <expression>
             # parse_from: body
             # parse_to: attributes
             # https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/stanza/docs/types/timestamp.md
             timestamp:
               parse_from: attributes.timestamp_field
               layout_type: strptime
               layout: "%Y-%m-%d %H:%M:%S.%s%j"
               # Specify time zone if needed
               # location: Local
             # https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/stanza/docs/types/severity.md
             severity:
               parse_from: attributes.severity_field
               # preset: default
               # mapping:
               #   error: 5xx
               # Replace incoming text with standard shaort name for consistency.
               overwrite_text: true
           - id: java_finish
             type: noop
             output: end_of_format_handler

           # Step 3: Finish multiline handling
           - id: end_of_format_handler
             type: noop

           # - id: remove_timestamp_field
           #   type: remove
           #   field: attributes.timestamp_field
           # - id: remove_severity_field
           #   type: remove
           #   field: attributes.severity_field

           # Add more operators if needed
           # https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/stanza/docs/operators/README.md
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
             - resource/cube.environment
           receivers:
             - otlp
         metrics:
           exporters:
             # - debug
             - otlphttp/metrics
           processors:
             - memory_limiter
             # - filter/metrics
             - batch
             - resourcedetection
             - resource/host.name
             - resource/cube.environment
           receivers:
             - hostmetrics
             - kubeletstats
         logs:
           exporters:
             # - debug
             - otlphttp/logs
           processors:
             - memory_limiter
             # - filter/logs
             # - transform/logs_redact
             # - transform/logs_extract_fields
             - transform/logs_parse_json_body
             - batch
             - resourcedetection
             - resource/host.name
             - resource/cube.environment

   clusterRole:
     rules:
       # needed for receivers.kubeletstats.extra_metadata_labels.(*)
       # https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/v0.89.0/receiver/kubeletstatsreceiver#role-based-access-control
       - apiGroups: [""]
         resources: ["nodes/proxy"]
         verbs: ["get"]

   tolerations:
     # If some nodes (like control plane nodes) are tainted, pods won’t get
     # scheduled unless they have matching tolerations. This toleration
     # allows the pod to be scheduled on any tainted node.
     - operator: Exists
   ```

   </details>

   <details>
   <summary>otel-collector-deployment.yaml</summary>

   ```yaml
   mode: deployment
   image:
     repository: "otel/opentelemetry-collector-contrib"
     # tag: 0.112.0
   presets:
     kubernetesAttributes:
       enabled: true
       # extractAllPodLabels: false
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
         resource_attributes:
           # adds last_terminated_reason to k8s.container.restarts metric
           k8s.container.status.last_terminated_reason:
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
             - resource/cube.environment
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
             - resource/cube.environment
           receivers:
             - k8sobjects
   ```

   </details>

   A sample project with examples of additional Collector configuration, e.g., to monitor Redis, MySQL, etc. is available at https://github.com/cubeapm/sample_infra_monitoring.

1. Install the collector using the following commands:

   ```shell
   helm install otel-collector-daemonset open-telemetry/opentelemetry-collector -f otel-collector-daemonset.yaml
   helm install otel-collector-deployment open-telemetry/opentelemetry-collector -f otel-collector-deployment.yaml

   # Use the following commands to update if already installed.
   helm upgrade otel-collector-daemonset open-telemetry/opentelemetry-collector -f otel-collector-daemonset.yaml
   helm upgrade otel-collector-deployment open-telemetry/opentelemetry-collector -f otel-collector-deployment.yaml
   ```

## Monitoring processes

The configuration above will monitor the k8s cluster at container-level granularity, which is quite sufficient in most of the cases. However, if you are running multiple processes in your containers and need to monitor individual processes as well, it can be enabled as follows:

1. Enable process level monitoring in `hostmetrics` receiver in the OTel Collector Daemonset.

   ```yaml title="otel-collector-daemonset.yaml (hostmetrics)"
   config:
     receivers:
       hostmetrics:
         scrapers:
           // highlight-start
           # Enable process level monitoring
           process:
             resource_attributes:
               # Enable cgroup info for each process so that we can
               # link processes to respective containers
               process.cgroup:
                 enabled: true
             // highlight-end
             mute_process_all_errors: true
   ```

   Enabling process level monitoring generates a lot of metrics. We can reduce the number of metrics by disabling some metrics as follows:

   <details>
   <summary>otel-collector-daemonset.yaml (hostmetrics)</summary>

   ```yaml
   config:
     receivers:
       // highlight-start
       hostmetrics:
         collection_interval: 60s
         scrapers:
           cpu:
           disk:
             exclude:
               devices:
                 - ^loop.*$
               match_type: regexp
             metrics:
               system.disk.io:
                 enabled: false
               system.disk.merged:
                 enabled: false
               system.disk.operation_time:
                 enabled: false
               system.disk.operations:
                 enabled: false
               system.disk.pending_operations:
                 enabled: false
               system.disk.weighted_io_time:
                 enabled: false
           load:
           filesystem:
             exclude_devices:
               devices:
                 - ^/dev/loop.*$
               match_type: regexp
             metrics:
               system.filesystem.inodes.usage:
                 enabled: false
           memory:
           network:
             metrics:
               system.network.connections:
                 enabled: false
               system.network.dropped:
                 enabled: false
               system.network.errors:
                 enabled: false
               system.network.packets:
                 enabled: false
           # paging:
           # processes:
           # Enable process level monitoring
           process:
             resource_attributes:
               # Enable cgroup info for each process so that we can
               # link processes to respective containers
               process.cgroup:
                 enabled: true
             metrics:
               process.disk.io:
                 enabled: false
               process.memory.virtual:
                 enabled: false
               process.uptime:
                 enabled: true
             mute_process_all_errors: true
       // highlight-end
   ```

   </details>

   CubeAPM will now show process level stats in `Infrastructure > Host` page.

1. Enable `container.id` attribute in `kubeletstats` receiver to attach container id to each container. This will enable linking of processes to the respective containers.
   ```yaml title="otel-collector-daemonset.yaml (kubeletstats)"
   config:
     receivers:
       kubeletstats:
       // highlight-start
       extra_metadata_labels:
         - container.id
       // highlight-end
   ```
   CubeAPM will now show process level stats in `Infrastructure > K8s Pod` page as well.
