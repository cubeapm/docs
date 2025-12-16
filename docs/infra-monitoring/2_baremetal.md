---
sidebar_position: 2
slug: /infra-monitoring/bare-metal-virtual-machine
---

# Bare Metal / Virtual Machine

The recommended setup for infra monitoring with CubeAPM is to use OpenTelemetry (OTel) Collector for collecting the metrics from host machines and sending them to CubeAPM. CubeAPM then provides visualization and alerting on the collected metrics.

OTel Collector can be installed on Linux, Windows, and Mac. Pre-built packages for popular package managers (apt, rpm, etc.) are available at https://github.com/open-telemetry/opentelemetry-collector-releases/releases. Visit the link, look for `Assets` for the latest release, and click on `Show all xxx assets` link at the bottom of the assets list. Then look at links starting with `otelcol-contrib_` and find the appropriate one for your os platform. For example, the one for Ubuntu running on 64-bit ARM processors will be named like `otelcol-contrib_xxx_linux_arm64.deb`.

:::info
There are two variants of OTel Collector available - **core** (names starting with `otelcol_`) and **contrib** (names starting with `otelcol-contrib_`). The core variant is bare-bones, while the contrib variant has a number of additional modules. Infra monitoring makes use of many of these additional modules, and hence needs the contrib variant.
:::

## Installation

### Method 1: Simplified Installation (Recommended)

We provide a simplified installation script that automatically detects your OS and architecture, and installs the appropriate OpenTelemetry Collector Contrib version with custom configuration.

```shell
sudo /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/cubeapm/Otel-contrib-installation/main/otel-contrib-install.sh)" -- --version 0.141.0 --replace-config

```

### Method 2: Manual Installation

Here we show the manual installation steps for Ubuntu. Steps for other linux variants are similar. (See the bottom of this section for installation on Windows)

```shell
# change the link to the appropriate link for your os, cpu architecture, collector version, etc.
wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.141.0/otelcol-contrib_0.141.0_linux_arm64.deb

dpkg -i otelcol-contrib_0.141.0_linux_arm64.deb

# the package file can now be removed
# rm otelcol-contrib_0.141.0_linux_arm64.deb

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

## Configuration

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
      #   mute_process_all_errors: true

  redis:
    endpoint: localhost:6379
    collection_interval: 60s
    resource_attributes:
      server.address:
        enabled: true
    metrics:
      redis.cmd.calls:
        enabled: true

  memcached:
    endpoint: localhost:11211
    transport: tcp
    collection_interval: 60s

  mysql:
    endpoint: localhost:3306
    username: cubeapm
    password: mypassword
    collection_interval: 60s
    metrics:
      mysql.commands:
        enabled: true
      mysql.connection.count:
        enabled: true
      mysql.connection.errors:
        enabled: true
      mysql.query.count:
        enabled: true
      mysql.query.slow.count:
        enabled: true
      mysql.joins:
        enabled: true
      mysql.replica.sql_delay:
        enabled: true
      mysql.replica.time_behind_source:
        enabled: true
      mysql.index.io.wait.time:
        enabled: false
      mysql.index.io.wait.count:
        enabled: false
      mysql.table.io.wait.time:
        enabled: false
      mysql.table.io.wait.count:
        enabled: false

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

  mongodb:
    hosts:
      - endpoint: localhost:27017
    # username: cubeapm
    # password: mypassword
    collection_interval: 60s
    tls:
      insecure: true
      # ca_file: /etc/otelcol-contrib/global-bundle.pem

  nginx:
    endpoint: http://localhost:80/status
    collection_interval: 60s

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
  debug:
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
        # - memcached
        # - mysql
        # - postgresql
        # - mongodb
        # - nginx
      processors:
        - batch
        - resourcedetection
        # - resource/cube.environment
      exporters:
        - otlphttp
        # - debug

  telemetry:
    logs:
      level: info
    metrics:
      readers:
        - pull:
            exporter:
              prometheus:
                host: "localhost"
                port: 8888
```

</details>

A sample project with examples of additional Collector configuration, e.g., to monitor Redis, MySQL, etc. is available at https://github.com/cubeapm/sample_infra_monitoring.
