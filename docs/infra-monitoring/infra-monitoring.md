---
slug: /infra-monitoring
sidebar_position: 4
---

# Infra Monitoring

CubeAPM supports monitoring of popular infrastructure components, e.g., bare-metal/virtual-machines, Kubernetes, MySQL, MS SQL, Redis, Nginx, ElasticSearch, Kafka, and many more.

The recommended setup for infra monitoring with CubeAPM is to use OpenTelemetry (OTel) Collector for collecting the metrics from infrastructure components and sending them to CubeAPM. CubeAPM then provides visualization and alerting on the collected metrics.

## OTel Collector Setup

OTel Collector can be installed on Linux, Windows, and Mac. It provides pre-built packages for popular package managers (apt, rpm, etc.). A helm chart is also available for convenient installation on k8s.

### Bare Metal / Virtual Machine

OpenTelemetry releases official Collector builds at https://github.com/open-telemetry/opentelemetry-collector-releases/releases. Visit the link, look for `Assets` for the latest release, and click on `Show all xxx assets` link at the bottom of the assets list. Then look at links starting with `otelcol-contrib_` and find the appropriate one for your os platform. For example, the one for Ubuntu running on 64-bit ARM processors will be named like `otelcol-contrib_xxx_linux_arm64.deb`.

:::info
There are two variants of OTel Collector available - **core** (names starting with `otelcol_`) and **contrib** (names starting with `otelcol-contrib_`). The core variant is bare-bones, while the contrib variant has a number of additional modules. Infra monitoring makes use of many of these additional modules, and hence needs the contrib variant.
:::

#### Installation

Here we show the installation steps for Ubuntu. Steps for other linux variants are similar. (See the bottom of this section for installation on Windows)

```shell
# change the link to the appropriate link for your os, cpu architecture, collector version, etc.
wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.96.0/otelcol-contrib_0.96.0_linux_arm64.deb

dpkg -i otelcol-contrib_0.96.0_linux_arm64.deb

# the package file can now be removed
# rm otelcol-contrib_0.96.0_linux_arm64.deb

# edit the config as desired (refer the configuration section below)
vi /etc/otelcol-contrib/config.yaml

# restart collector service
systemctl restart otelcol-contrib.service
systemctl status otelcol-contrib.service
```

<details>
<summary>Installation on Windows</summary>

1. Download the appropriate `.tar.gz` file for windows platform.
1. Unzip it by executing `tar -xzf <filename>` command in powershell.
1. Update config.yaml as desired (refer the configuration section below).
1. Run the Collector by executing `otelcol-contrib.exe --config config.yaml` in powershell.

The Collector can be set up as a background service as follows:

```shell
# Create windows service.
# Modify the paths of otelcol-contrib.exe and config.yaml as appropriate.
# Ref: https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/sc-create
sc.exe create otelcol displayname= otelcol start= delayed-auto binPath= "C:\Users\Administrator\Desktop\otelcol-contrib\otelcol-contrib.exe --config C:\Users\Administrator\Desktop\otelcol-contrib\config.yaml"

# Useful commands
sc.exe start otelcol
sc.exe query otelcol
sc.exe delete otelcol

# To check the logs, open event viewer > windows logs > application,
# and then filter source=otelcol on right hand side.
```

</details>

#### Configuration

Here's a sample OTel Collector configuration file for infra monitoring.

<details>
<summary>config.yaml</summary>

```yaml
# Individual infra agents are configured in the receivers section below.
# The list of available agents and their documentation is available at
# https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver
receivers:
  # hostmetrics monitors host machines (bare metal, ec2, etc.)
  # It collects metrics for CPU, memory, etc. on the host
  # where the collector is running.
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

  redis:
    endpoint: localhost:6379
    collection_interval: 60s
    resource_attributes:
      server.address:
        enabled: true

  postgresql:
    endpoint: localhost:5432
    transport: tcp
    username: postgres
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
        # Individual infra monitoring agents can be disabled
        # by commenting them out here.
        - hostmetrics
        # - redis
        # - postgresql
      processors:
        - batch
        - resourcedetection
        - resource/cube.environment
      exporters:
        - otlphttp
        # - logging

  telemetry:
    logs:
      level: info
    metrics:
      address: 0.0.0.0:8888
```

</details>

### Kubernetes

The official OTel Collector helm chart is available at https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector.

On k8s, the Collector can be in two modes - **daemonset** (collector runs as a daemonset on each k8s node) and **deployment** (collector runs as a k8s deployment with specified number of pods). For most infra components (MySQL, Nginx, etc.), the preferred mode is to run Collector on the same node running the respective infra component, but the Collector can also collect the metrics remotely. For collecting host metrics, the Collector must run on the node(s) for which metrics are to be collected. For monitoring the k8s cluster itself, the Collector needs to be run both as daemonset and deployment. Below are the helm chart values for both modes.

<details>
<summary>values.yaml (daemonset)</summary>

```yaml
mode: daemonset
# image:
#   tag: 0.89.0
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
# image:
#   tag: 0.89.0
presets:
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
```

</details>
