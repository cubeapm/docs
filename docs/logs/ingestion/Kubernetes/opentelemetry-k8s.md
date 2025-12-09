---
id: opentelemetry
title: "OpenTelemetry"
slug: /logs/ingestion/Kubernetes/opentelemetry-k8s
---

# OpenTelemetry

## End-To-End Log Pipeline Using OpenTelemetry.

You can use OpenTelemetry to collect and send application level logs to CubeAPM.

### Using OpenTelemetry Inside Kubernetes Cluster.

OpenTelemetry inside Kubernetes Cluster refers to deploying and running the OpenTelemetry Collector inside a Kubernetes cluster.

:::info
- To capture logs from the running applications inside kubernetes cluster, You have to deploy the OpenTelemetry Collector as a ***daemonset***.
:::


To deploy the OpenTelemetry Collector inside a Kubernetes cluster, follow the steps below:

1. **Add the OpenTelemetry Helm Chart Repository.**

    ```shell
    helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
    # Use the following command to update if the repo is already added.
    helm repo update open-telemetry
    ```

2. **Install the OpenTelemetry Collector Helm chart.**

    Copy the files below and save as ```otel-collector-daemonset.yaml```. Edit them to customize the configuration as per your requirements.

    <details>
    <summary>otel-collector-daemonset.yaml</summary>

    ```yaml
    nameOverride: ""
    fullnameOverride: ""
    namespaceOverride: "" # namespace where the daemonset will be installed.

        # Valid values are "daemonset", "deployment", and "statefulset".
    mode: daemonset

        # Handles basic configuration of components that
        # also require k8s modifications to work correctly.
        # .Values.config can be used to modify/add to a preset
        # component configuration, but CANNOT be used to remove
        # preset configuration. If you require removal of any
        # sections of a preset configuration, you cannot use
        # the preset. Instead, configure the component manually in
        # .Values.config and use the other fields supplied in the
        # values.yaml to configure k8s as necessary.

    presets:
        # Configures the collector to collect logs.
        # Adds the filelog receiver to the logs pipeline
        # and adds the necessary volumes and volume mounts.
        # Best used with mode = daemonset.
        # See https://opentelemetry.io/docs/kubernetes/collector/components/#filelog-receiver for details on the receiver.
        logsCollection:
            enabled: true
            includeCollectorLogs: false
            # Enabling this writes checkpoints in /var/lib/otelcol/ host directory.
            # Note this changes collector's user to root, so that it can write to host directory.
            storeCheckpoints: true
            maxRecombineLogSize: 102400
            # Configures the collector to collect host metrics.
            # Adds the hostmetrics receiver to the metrics pipeline
            # and adds the necessary volumes and volume mounts.
            # Best used with mode = daemonset.
            # See https://opentelemetry.io/docs/kubernetes/collector/components/#host-metrics-receiver for details on the receiver.
        hostMetrics:
            enabled: true
        # Configures the Kubernetes Processor to add Kubernetes metadata.
        # Adds the k8sattributes processor to all the pipelines
        # and adds a preset of minimum required RBAC rules to ClusterRole.
        # Best used with mode = daemonset.
        # See https://opentelemetry.io/docs/kubernetes/collector/components/#kubernetes-attributes-processor for details on the receiver.
        kubernetesAttributes:
            enabled: true
            # When enabled the processor will extract all labels for an associated pod and add them as resource attributes.
            # The label's exact name will be the key.
            extractAllPodLabels: false
            # When enabled the processor will extract all annotations for an associated pod and add them as resource attributes.
            # The annotation's exact name will be the key.
            extractAllPodAnnotations: false
            # Configures the collector to collect node, pod, and container metrics from the API server on a kubelet.
            # Adds the kubeletstats receiver to the metrics pipeline
            # and adds the necessary rules to ClusterRole.
            # Best used with mode = daemonset.
            # See https://opentelemetry.io/docs/kubernetes/collector/components/#kubeletstats-receiver for details on the receiver.
        kubeletMetrics:
            enabled: false

        # Base collector configuration.
        # Supports templating. To escape existing instances of {{ }}, use {{` <original content> `}}.
        # For example, {{ REDACTED_EMAIL }} becomes {{` {{ REDACTED_EMAIL }} `}}.
    config:
        exporters:
            debug:
                verbosity: detailed
                sampling_initial: 5
                sampling_thereafter: 1
            # otlphttp/metrics:
            #   # metrics_endpoint: http://cubeapm.default.svc.cluster.local:3130/api/metrics/v1/save/otlp
            #   metrics_endpoint: http://<cubeapm-server-ip>:3130/api/metrics/v1/save/otlp
            #   retry_on_failure:
            #     enabled: false

            otlphttp/logs:
                # logs_endpoint: http://cubeapm.default.svc.cluster.local:3130/api/logs/insert/opentelemetry/v1/logs
                logs_endpoint: http://<cubeapm-server-ip>:3130/api/logs/insert/opentelemetry/v1/logs
                headers:
                    Cube-Stream-Fields: k8s.namespace.name,k8s.deployment.name,k8s.statefulset.name
                retry_on_failure:
                    enabled: true
                    initial_interval: 5s
                    max_interval: 30s
                    max_elapsed_time: 300s
            
            # otlp/traces:
            #   endpoint: cubeapm.default.svc.cluster.local:4317
            #   tls:
            #     insecure: true

        processors:

            memory_limiter:
                check_interval: 1s # Check every 1 second
                limit_mib: 512 # Hard limit: 512 MB
                spike_limit_mib: 128 # Allow temporary spikes up to 128 MB

            batch:
                send_batch_size: 1000
                timeout: 5s
                send_batch_max_size: 10000

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

            transform/logs_redact:
                error_mode: ignore
                log_statements:
                    - context: log
                      statements:
                        # https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/ottl/ottlfuncs#replace_pattern
                        #- replace_pattern(attributes["http.url"], "client_id=[^&]+", "client_id=[REDACTED]")
                        - replace_pattern(body, "\"(token|password)\":\"[^\"]*\"", "\"$$1\":\"****\"")
                        - replace_pattern(body, "(token|password)=[^,\\s]+", "$$1=****")
                        # Remove log metadata prefix (timestamp, thread, level, class) to keep only the message
                        #- replace_pattern(body, "^\\d{4}-\\d{2}-\\d{2}\\s+\\d{2}:\\d{2}:\\d{2}\\.\\d{3}\\s+\\[[^\\]]+\\]\\s+\\w+\\s+\\S+\\s+-\\s+", "")


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
                        # - set(severity_text, "Debug") where attributes["Level"] == "Debug"
                        # - set(severity_number, 5) where attributes["Level"] == "Debug"

            redaction/logs:
                # https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/redactionprocessor/README.md
                allow_all_keys: true
                # blocked_values:
                #   - 'kube'
                # # summary: debug

            filter/metrics:
                error_mode: ignore
                metrics:
                    metric:
                        # only include my-namespace
                        - resource.attributes["k8s.namespace.name"] != "my-namespace"

            filter/logs:
                error_mode: ignore
                logs:
                    log_record:
                        # only include my-namespace
                        - resource.attributes["k8s.namespace.name"] != "my-namespace"

        receivers:
            otlp:
                protocols:
                    grpc: {}
                    http: {}

            kubeletstats:
                collection_interval: 60s
                # auth_type: serviceAccount
                # endpoint: "https://${env:K8S_NODE_NAME}:10250"
                insecure_skip_verify: true
                metric_groups:
                    - container
                    - node
                    - pod
                    - system
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
                    # paging:
                    # processes:
                    # process:
                    #   resource_attributes:
                    #     process.cgroup:
                    #       enabled: true
                    #   mute_process_all_errors: true

            filelog:
                #include:
                #    - /var/log/containers/*.log
                #    - /var/log/pods/*/*/*.log
                start_at: end
                initial_buffer_size: 16KiB # The initial size of the buffer to read from the file.
                max_log_size: 1MiB # The maximum size of a log entry to read. A log entry will be truncated if it is larger than max_log_size. Protects against reading large amounts of data into memory.

                # preserve_leading_whitespaces: true
                # Unsolved issue: recombine operator does not handle each input file
                # separately. It treats all input as one stream. So, lines from different
                # files may get combined.

                operators:
                    # container-parser is added by helm chart. But if we define operators,
                    # then the helm chart does not add it, so we need to add it here.
                    - id: container-parser
                      type: container
                      max_log_size: 102400

                      # Format specific handling
                      # Step 1: Detect format and send logs to respective handlers.
                    - id: format_handler_router
                      type: router
                      routes:
                        ## for java multiline logs
                        - expr: resource["k8s.container.name"] == "java-spring-boot-otel"
                          output: java_parser

                        # for python multiline logs
                        # - expr: resource["k8s.container.name"] == "python"
                        #   output: python_parser

                        # for nodejs multiline logs
                        # - expr: resource["k8s.container.name"] == "nodejs"
                        #   output: nodejs_parser

                      default: end_of_format_handler

                    # Step 2: Process each format
                    - id: java_parser
                      type: noop

                    ## Using Recombine Operator parse the multiline logs
                    - id: java_multiline_parser
                      type: recombine
                      combine_field: body
                      is_first_entry: body matches "^\\d{4}-\\d{2}-\\d{2}"
                      source_identifier: attributes["log.file.path"]
                      force_flush_period: 5s
                      # specify output to avoid passing to next operator by default
                    
                    - id: java_extract_fields
                      type: regex_parser
                      regex: '(?P<timestamp>\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\.\d{3})\s+\[(?P<thread>[^\]]+)\]\s+(?P<severity>\w+)\s+(?P<logger>\S+)\s+-\s+'
                      timestamp:
                        parse_from: attributes.timestamp
                        layout_type: strptime
                        layout: "%Y-%m-%d %H:%M:%S.%f"
                      severity:
                        parse_from: attributes.severity
                        mapping:
                            ERROR: error
                            WARN: warning
                            INFO: info
                            DEBUG: debug
                            TRACE: trace

                    # - id: python_multiline_parser
                    #   type: recombine
                    #   combine_field: body
                    #   is_first_entry: body matches "^(Traceback|\d{4}-\d{2}-\d{2})"
                    #   force_flush_period: 5s
                    #   source_identifier: attributes["log.file.path"]

                    # - id: nodejs_multiline_parser
                    #   type: recombine
                    #   combine_field: body
                    #   is_first_entry: body matches "^(Error:|\d{4}-\d{2}-\d{2})"
                    #   force_flush_period: 5s
                    #   source_identifier: attributes["log.file.path"]

                    # specify output to avoid passing to next operator by default
                    - id: java_finish
                      type: noop
                      output: end_of_format_handler

                    # terminal operator
                    - type: noop
                      id: end_of_format_handler
        
        service:
            pipelines:
                # traces:
                #   exporters:
                #     # - debug
                #     - otlp/traces
                #   processors:
                #     - memory_limiter
                #     - batch
                #     # traces would normally have host.name attribute set to pod name.
                #     # resourcedetection and resource/host.name processors will override
                #     # it with the node name.
                #     # - resourcedetection
                #     # - resource/host.name
                #     - resource/cube.environment
                #   receivers:
                #     - otlp
                # metrics:
                #   exporters:
                #     # - debug
                #     - otlphttp/metrics
                #   processors:
                #     - memory_limiter
                #     - batch
                #     - resourcedetection
                #     - resource/host.name
                #     - resource/cube.environment
                #   receivers:
                #     - hostmetrics
                #     - kubeletstats

                logs:
                    exporters:
                        - debug
                        - otlphttp/logs
                    processors:
                        - memory_limiter
                        - transform/logs_redact
                        - transform/logs_parse_json_body
                        - redaction/logs
                        - resourcedetection
                        - resource/host.name
                        - resource/cube.environment
                        - batch
                    receivers:
                        - filelog

    image:
        # If you want to use the core image `otel/opentelemetry-collector`, you also need to change `command.name` value to `otelcol`.
        repository: otel/opentelemetry-collector-contrib
        pullPolicy: IfNotPresent
        # Overrides the image tag whose default is the chart appVersion.
        tag: 0.139.0

        # OpenTelemetry Collector executable
    command:
        name: "otelcol-contrib"
        extraArgs: []

    clusterRole:
        rules:
            # needed for receivers.kubeletstats.extra_metadata_labels.(*)
            # https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/v0.89.0/receiver/kubeletstatsreceiver#role-based-access-control
            - apiGroups: [""]
              resources: ["nodes/proxy"]
              verbs: ["get"]

            - apiGroups: [""]
              resources: ["pods", "namespaces"]
              verbs: ["get", "watch", "list"]

    tolerations:
        # If some nodes (like control plane nodes) are tainted, pods won’t get
        # scheduled unless they have matching tolerations. This toleration
        # allows the pod to be scheduled on any tainted node.
        - operator: Exists
    ```

    </details>

    Install the collector using the following commands:

    ```bash
    helm install otel-collector-daemonset open-telemetry/opentelemetry-collector -f otel-collector-daemonset.yaml
        # Use the following commands to update if already installed.
    helm upgrade otel-collector-daemonset open-telemetry/opentelemetry-collector -f otel-collector-daemonset.yaml
    ```

3. **Check the status of the OpenTelemetry collector daemonset:**

    ```bash
    kubectl get ds otel-collector-daemonset -n <namespace>
    ```

4. **Check the logs of the OpenTelemetry collector daemonset:**

    ```bash
    kubectl logs -n <namespace> -l app=<otel-collector-daemonset-name>
    ```

5. **Check the Logs in CubeAPM:**

    - Run the application to generate logs.
    - Go to the CubeAPM dashboard and navigate to the Logs section.
    - You should see the logs from the OpenTelemetry collector daemonset.


### Troubleshooting

- If logs are not visible in CubeAPM, check that the OpenTelemetry collector daemonset is running and application logs are written to the correct path inside OpenTelemetry collector daemonset (container OR pod). If not so mention the correct path in the: 
    
    `otel-collector-daemonset.yaml`
    ```bash
        #Logs path
        filelog:
            include:
                #- /var/log/containers/*.log
                #- /var/log/pods/*/*/*.log
    ```
