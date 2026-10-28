---
sidebar_position: 1
sidebar_label: OpenTelemetry
slug: /profiling/opentelemetry
---

# Profiling with the OpenTelemetry eBPF profiler

CubeAPM accepts CPU profiles from the official OpenTelemetry eBPF profiler. The profiler runs once per host, samples every process on it from the kernel, and sends profiles to CubeAPM over OTLP. Your applications need no code change, no agent and no restart.

Profiles show up on the CubeAPM Profiles page with the source **OpenTelemetry**: flame graph, top methods and comparison between time ranges.

## What you get

| Area | Support |
|---|---|
| Profile type | CPU (on-CPU sampling, 20 samples a second per CPU) |
| Where your services run | Kubernetes, a Docker host, or directly on a Linux VM |
| Languages | Python, Java (HotSpot), Node.js, .NET, Go, PHP, Ruby. See [Languages](#languages) |
| Linux | Kernel 5.10 or newer, x86_64 or arm64. Tested on Ubuntu 24.04 (kernel 7.0) and Amazon Linux 2023 (kernel 6.1) |
| Transport | OTLP/gRPC (port 4317) or OTLP/HTTP (port 4318), protobuf |

Not available with this profiler:
- memory, allocation, lock or wall-clock profiles;
- the link from a trace to its profile;
- the per-endpoint breakdown;
- symbol names for native C, C++ and Rust code.

For those, use a language profiler such as [Datadog's](../instrumentation/datadog/datadog.md), which CubeAPM also accepts.

Not supported: Windows, macOS, and platforms that do not allow privileged pods or containers (for example AWS Fargate and GKE Autopilot).

## How it works

```
your hosts                                   CubeAPM
+--------------------------------+
| app processes                  |
|      ^ sampled from the kernel |
| otelcol-ebpf-profiler          | --OTLP-->  port 4317 (gRPC) or 4318 (HTTP)
|   names each process           |            keeps processes with a name,
|   (service.name, host.name)    |            stores one profile per process
+--------------------------------+            every ~5 seconds
```

The profiler sends one profile per process about every 5 seconds. Each carries the process id, the executable, and the container id when the process runs in a container.

CubeAPM keeps a process when it has:
- a `service.name`;
- a process id;
- a container id, or for a process running directly on a VM, a `host.name`.

Everything else the profiler sees (system daemons, unnamed processes) is dropped and reported back to the profiler as a partial success.

:::info
A partial success on every export is normal. It lists what CubeAPM dropped and why.
:::

:::warning
Send profiles straight from the profiler to CubeAPM, not through an OpenTelemetry Collector. Current Collector versions lose resource attributes when they decode and re-encode profiles, and CubeAPM then sees no service names.
:::

## Before you start

1. **CubeAPM version.** Check that your CubeAPM accepts OpenTelemetry profiles. An empty upload is a valid no-op:

   ```shell
   curl -s -o /dev/null -w '%{http_code}\n' -X POST \
     -H 'Content-Type: application/x-protobuf' --data-binary '' \
     http://<ip_address_of_cubeapm_server>:4318/v1development/profiles
   ```

   `200` means it does. `404` means this CubeAPM version does not, or OpenTelemetry profiles are switched off (`profiles.otlp.disable`).

2. **Network.** Every host must reach CubeAPM on port 4317 (gRPC) or 4318 (HTTP).

3. **License key.** Use the same key your other agents send to CubeAPM. It goes in the `x-cube-token` header. Without a key, or with a key CubeAPM does not know, data lands in the default account.

4. **Privileges.** The profiler needs root: a privileged container in the host PID namespace, or a root service on a VM.

5. **Profiler version.** Use 0.164.0, as below. This page is tested with that version.

:::warning
The OpenTelemetry profiles format is still alpha and changes between releases. Pin the profiler version, and test a newer one before you roll it out.
:::

## Kubernetes

One profiler pod per node (DaemonSet). Service names come from Kubernetes metadata.

1. Create the namespace and the key secret:

   ```shell
   kubectl create namespace otel-profiler
   kubectl -n otel-profiler create secret generic cube-token --from-literal=token='<your_license_key>'
   ```

2. Save the profiler configuration as `profiler-config.yaml`:

   ```yaml
   receivers:
     profiling: {}

   processors:
     k8s_attributes:
       auth_type: serviceAccount
       wait_for_metadata: true
       filter:
         node_from_env_var: KUBE_NODE_NAME
       extract:
         otel_annotations: true
         metadata:
           - service.name
           - k8s.namespace.name
           - k8s.pod.name
           - k8s.deployment.name
           - k8s.container.name
           - container.id
       pod_association:
         - sources:
             - from: resource_attribute
               name: container.id

   exporters:
     otlp_grpc/cube:
       endpoint: "${env:CUBEAPM_HOST}:4317"
       tls:
         insecure: true
       compression: gzip
       headers:
         x-cube-token: "${env:CUBE_TOKEN}"

   service:
     pipelines:
       profiles:
         receivers: [profiling]
         processors: [k8s_attributes]
         exporters: [otlp_grpc/cube]
   ```

   ```shell
   kubectl -n otel-profiler create configmap profiler-config --from-file=config.yaml=profiler-config.yaml
   ```

3. Save this as `profiler-daemonset.yaml`, set your CubeAPM address, and apply it with `kubectl apply -f profiler-daemonset.yaml`:

   ```yaml
   apiVersion: v1
   kind: ServiceAccount
   metadata:
     name: ebpf-profiler
     namespace: otel-profiler
   ---
   apiVersion: rbac.authorization.k8s.io/v1
   kind: ClusterRole
   metadata:
     name: otel-profiler-k8s-attributes
   rules:
     - apiGroups: [""]
       resources: ["pods", "namespaces", "nodes"]
       verbs: ["get", "watch", "list"]
     - apiGroups: ["apps"]
       resources: ["replicasets", "deployments", "statefulsets", "daemonsets"]
       verbs: ["get", "list", "watch"]
     - apiGroups: ["batch"]
       resources: ["jobs"]
       verbs: ["get", "list", "watch"]
   ---
   apiVersion: rbac.authorization.k8s.io/v1
   kind: ClusterRoleBinding
   metadata:
     name: otel-profiler-k8s-attributes
   subjects:
     - kind: ServiceAccount
       name: ebpf-profiler
       namespace: otel-profiler
   roleRef:
     kind: ClusterRole
     name: otel-profiler-k8s-attributes
     apiGroup: rbac.authorization.k8s.io
   ---
   apiVersion: apps/v1
   kind: DaemonSet
   metadata:
     name: ebpf-profiler
     namespace: otel-profiler
   spec:
     selector:
       matchLabels: {app: ebpf-profiler}
     template:
       metadata:
         labels: {app: ebpf-profiler}
       spec:
         serviceAccountName: ebpf-profiler
         hostPID: true
         containers:
           - name: profiler
             image: otel/opentelemetry-collector-ebpf-profiler:0.164.0@sha256:37a3779edfd51f648dbdcb3dc79194eaf42912e6c6d46e3ad570ff42b2bd3bfe
             args: ["--config=/etc/otelcol/config.yaml", "--feature-gates=+service.profilesSupport"]
             env:
               - name: KUBE_NODE_NAME
                 valueFrom: {fieldRef: {fieldPath: spec.nodeName}}
               - name: CUBEAPM_HOST
                 value: "<ip_address_of_cubeapm_server>"
               - name: CUBE_TOKEN
                 valueFrom: {secretKeyRef: {name: cube-token, key: token}}
             securityContext:
               privileged: true
               capabilities: {add: ["SYS_ADMIN", "SYS_RESOURCE", "PERFMON", "BPF"]}
               appArmorProfile: {type: Unconfined}
             volumeMounts:
               - {name: config, mountPath: /etc/otelcol, readOnly: true}
               - {name: sys, mountPath: /sys}
               - {name: proc, mountPath: /proc, readOnly: true}
               - {name: debugfs, mountPath: /sys/kernel/debug}
         volumes:
           - {name: config, configMap: {name: profiler-config}}
           - {name: sys, hostPath: {path: /sys}}
           - {name: proc, hostPath: {path: /proc}}
           - {name: debugfs, hostPath: {path: /sys/kernel/debug}}
   ```

   :::info
   The manifest needs Kubernetes 1.30 or newer (`appArmorProfile`). Keep the privileges and mounts as they are.
   :::

4. Check that it started:

   ```shell
   kubectl -n otel-profiler rollout status ds/ebpf-profiler --timeout=300s
   kubectl -n otel-profiler logs ds/ebpf-profiler | grep -E 'eBPF tracer loaded|Everything is ready|Exporting failed'
   ```

   You want `eBPF tracer loaded` and `Everything is ready`, and no `Exporting failed`.

**OTLP/HTTP instead of gRPC.** Some proxies and load balancers only pass HTTP/1.1. In that case, replace the exporter with:

```yaml
exporters:
  otlp_http/cube:
    profiles_endpoint: "http://${env:CUBEAPM_HOST}:4318/v1development/profiles"
    compression: gzip
    headers:
      x-cube-token: "${env:CUBE_TOKEN}"
```

Then set `exporters: [otlp_http/cube]` in the pipeline. The profiler reads its configuration only at start, so reload the ConfigMap and restart the DaemonSet:

```shell
kubectl -n otel-profiler create configmap profiler-config --from-file=config.yaml=profiler-config.yaml \
  --dry-run=client -o yaml | kubectl apply -f -
kubectl -n otel-profiler rollout restart ds/ebpf-profiler
```

**Without a license key** (single-account CubeAPM): skip the secret, and remove the `headers:` block and the `CUBE_TOKEN` variable.

### Service names on Kubernetes

The first of these that a process has becomes its service name:

1. The `OTEL_SERVICE_NAME` set in the container's environment, or its OpenTelemetry resource. Apps instrumented with OpenTelemetry usually set this already, so profiles get the same name as their traces.
2. The pod annotation `resource.opentelemetry.io/service.name`.
3. The pod label `app.kubernetes.io/instance`, then `app.kubernetes.io/name`.
4. The owning Deployment, StatefulSet, DaemonSet, Job or CronJob name.
5. The pod name.

To set a name explicitly, put the annotation on the pod template (`spec.template.metadata.annotations`), not on the Deployment itself. It only takes effect when the container does not set `OTEL_SERVICE_NAME`.

**php-fpm:** php-fpm overwrites its own environment, so its `OTEL_SERVICE_NAME` is never seen. Name php-fpm pods with the annotation or labels.

## A Docker host running one service

For a host without Kubernetes that runs a single containerized service, with any number of replicas. Every process on the host gets the same name; processes outside containers are dropped. If the host runs more than one service, use the per-process naming from the [VM section](#a-linux-vm-without-containers) instead.

1. Save this as `/etc/otel-profiler/config.yaml`:

   ```yaml
   receivers:
     profiling: {}

   processors:
     resource:
       attributes:
         - key: service.name
           value: "<your_service_name>"
           action: upsert

   exporters:
     otlp_grpc/cube:
       endpoint: "<ip_address_of_cubeapm_server>:4317"
       tls:
         insecure: true
       compression: gzip
       headers:
         x-cube-token: "<your_license_key>"

   service:
     pipelines:
       profiles:
         receivers: [profiling]
         processors: [resource]
         exporters: [otlp_grpc/cube]
   ```

2. Run the profiler:

   ```shell
   docker run -d --name otel-profiler --restart unless-stopped \
     --privileged --pid host --network host \
     --cap-add SYS_ADMIN --cap-add SYS_RESOURCE --cap-add PERFMON --cap-add BPF \
     --security-opt apparmor:unconfined \
     -v /sys:/sys -v /proc:/proc:ro -v /sys/kernel/debug:/sys/kernel/debug \
     -v /etc/otel-profiler/config.yaml:/etc/otelcol/config.yaml:ro \
     otel/opentelemetry-collector-ebpf-profiler:0.164.0@sha256:37a3779edfd51f648dbdcb3dc79194eaf42912e6c6d46e3ad570ff42b2bd3bfe \
     --config=/etc/otelcol/config.yaml --feature-gates=+service.profilesSupport
   ```

3. Check the log: `docker logs otel-profiler 2>&1 | grep -E 'eBPF tracer loaded|Everything is ready|Exporting failed'`.

## A Linux VM without containers

For services that run directly on a VM, for example php-fpm, a PHP worker or a Python app under systemd. On a VM there is no container id. CubeAPM tells processes apart by host name, process id and executable, so the profiler must add the host name, and each service must be named.

### 1. Write the configuration

Save this as `/etc/otel-profiler/config.yaml`, with your CubeAPM address, key and naming rules:

```yaml
receivers:
  profiling: {}

processors:
  resource_detection:
    detectors: [system]
    system:
      hostname_sources: [os]
  transform:
    error_mode: ignore
    profile_statements:
      - context: resource
        statements:
          - set(attributes["service.name"], "billing-php") where attributes["process.executable.name"] == "php-fpm8.3"
          - set(attributes["service.name"], "shop-web") where attributes["process.executable.name"] == "apache2"

exporters:
  otlp_grpc/cube:
    endpoint: "<ip_address_of_cubeapm_server>:4317"
    tls:
      insecure: true
    compression: gzip
    headers:
      x-cube-token: "<your_license_key>"

service:
  pipelines:
    profiles:
      receivers: [profiling]
      processors: [resource_detection, transform]
      exporters: [otlp_grpc/cube]
```

`resource_detection` adds the VM's host name. It must be unique among your VMs, which it normally is.

### 2. Name your services

A process on a VM is named in one of two ways:

- **By its own `OTEL_SERVICE_NAME`.** The profiler reads it from the process environment. Set it in the service's systemd unit, for example with `systemctl edit my-worker`:

  ```ini
  [Service]
  Environment=OTEL_SERVICE_NAME=billing-worker
  ```

  Then restart the service. This works for Python, PHP CLI, Node.js, Java, .NET, Go and Ruby processes, and is the only way to tell apart two services that run the same interpreter binary (two Python apps both run `python3`).

- **By executable, with a rule in `transform`,** as in the example above. Use this for **php-fpm**, which overwrites its own environment, for **Apache with mod_php** (`apache2`, or `httpd` on Red Hat systems), and for any process you cannot restart with a new variable. Find the executable name with `basename $(readlink /proc/<pid>/exe)`, for example `php-fpm8.3` on Ubuntu 24.04 or `php-fpm` on other systems. Add one statement per service.

Processes with no name are dropped, so only what you name is stored.

### 3. Install and start the profiler

**As a systemd service** (no Docker needed):

```shell
V=0.164.0
case $(uname -m) in x86_64) A=amd64 ;; aarch64) A=arm64 ;; esac
F=otelcol-ebpf-profiler_${V}_linux_${A}.tar.gz
curl -fsSLO "https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v${V}/${F}"
curl -fsSLO "https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v${V}/${F}.sha256"
echo "$(cut -d' ' -f1 ${F}.sha256)  ${F}" | sha256sum -c
tar xzf "$F" otelcol-ebpf-profiler
sudo install -m 0755 otelcol-ebpf-profiler /usr/local/bin/otelcol-ebpf-profiler

sudo tee /etc/systemd/system/otel-ebpf-profiler.service > /dev/null <<'EOF'
[Unit]
Description=OpenTelemetry eBPF profiler
After=network-online.target
[Service]
ExecStart=/usr/local/bin/otelcol-ebpf-profiler --config=/etc/otel-profiler/config.yaml --feature-gates=+service.profilesSupport
Restart=always
[Install]
WantedBy=multi-user.target
EOF
sudo systemctl daemon-reload
sudo systemctl enable --now otel-ebpf-profiler
```

Check it: `sudo journalctl -u otel-ebpf-profiler | grep -E 'eBPF tracer loaded|Everything is ready|Exporting failed'`.

**Or with Docker:** run the same `docker run` command as in the [Docker host section](#a-docker-host-running-one-service), with this configuration file.

After a configuration change, restart the profiler (`sudo systemctl restart otel-ebpf-profiler`).

## Check that it works

Give it a minute after the profiler starts.

1. **Profiler log:** `eBPF tracer loaded`, then `Everything is ready`. After that, a `Partial success response` warning on most exports is normal: it lists what CubeAPM dropped and why. `Exporting failed` is not normal.
2. **CubeAPM:**
   - Open the Profiles page and set the environment picker to `UNSET`; these profiles carry no environment by default.
   - Filter on `profile.source` = `opentelemetry` and your `service`.
   - Each row shows the container's short id and process id, or on a VM the executable and process id; the host has its own column.
   - Open a row for its flame graph.

## Languages

What the profiler can read differs by language and version. CubeAPM stores every profile that carries frames of a supported language.

| Language | Works well | Weak or not supported |
|---|---|---|
| Python (CPython) | 3.12 tested; the profiler reads 3.6 to 3.14 | |
| Java (HotSpot) | 17, 21, 25; 8 and 11 on x86_64 | 8 and 11 on arm64 (few Java frames). OpenJ9 and GraalVM native images not supported |
| Node.js | 18, 20, 22 on glibc images | Alpine (musl) images show about 40% of frames; `apk add musl-dbg` raises it to about 90% on x86_64. Node 24 mostly unnamed |
| .NET | 8, 9, 10 | Small methods the JIT inlines do not show; on x86_64 upper frames often show as addresses. NativeAOT not supported |
| Go | 1.26, 1.27, also stripped binaries | |
| PHP | 7.4, 8.1, 8.2, 8.3, 8.4, 8.5; CLI, php-fpm and Apache mod_php; opcache JIT on or off; in containers and on VMs; x86_64 and arm64 | Alpine (musl) images show about 40% of frames; on x86_64 `apk add musl-dbg` in the image brings it to 100%, on arm64 it does not help. The php-fpm master process runs no PHP and does not show |
| Ruby | 3.3, 3.4, 4.0 with the option below | 3.2 shows no Ruby frames |

**Ruby 3.3 and newer:** without this option, about half of the samples have no Ruby frames. Set it in the profiler configuration:

```yaml
receivers:
  profiling:
    interpreters:
      ruby:
        skip_native_resume: true
```

## What the profiler log tells you

The profiler logs CubeAPM's answer for each export.

| Answer | Meaning | What to do |
|---|---|---|
| `Partial success response` with a message such as `3 of 7 profiles rejected: 2 resource profiles missing service.name; 1 profile from an unsupported runtime` | Some processes stored, the rest dropped | Nothing, if your services show up. Unnamed and system processes are always among the dropped ones |
| `all profiles in the request were rejected` (HTTP 400) | Nothing in this export could be used | If it keeps happening, naming is not working: check the processor is in the pipeline and, on Kubernetes, the RBAC |
| HTTP 404 or `Unimplemented` | This CubeAPM does not accept OpenTelemetry profiles, or they are switched off | Upgrade CubeAPM, or turn `profiles.otlp.disable` off |
| HTTP 415 | The HTTP exporter sends JSON | Remove `encoding: json` |
| HTTP 503 or `Unavailable`, `profiles admission gate full` | CubeAPM is at its limit of concurrent profile uploads | None; the profiler retries. If constant, raise `profiles.otlp.max-concurrent-uploads` (up to 16) |
| HTTP 413 or `ResourceExhausted` | An export over 1 MiB or over a structural limit | Contact CubeAPM support with the log line |

Reasons in the partial-success message:

| Reason | Meaning |
|---|---|
| `missing service.name` | A process that was not named. Expected for system processes |
| `missing container.id and host.name` | A named process outside a container, from a profiler that sends no host name. On a VM, add `resource_detection` |
| `missing container.id` | Older CubeAPM versions, which accept only processes in containers. Upgrade CubeAPM to profile processes on a VM |
| `from an unsupported runtime` | A process with no frames of a supported language, for example a native daemon |
| `with an unsupported sample type` | Off-CPU or another non-CPU profile; only CPU is stored |

## Troubleshooting

| Symptom | Check |
|---|---|
| The profiler exits with `failed to load eBPF tracer` | Privileges and kernel: the privileged settings above, kernel 5.10 or newer |
| The profiler refuses its configuration: `gated under the "service.profilesSupport" feature gate` | Add `--feature-gates=+service.profilesSupport` |
| The profiler refuses its configuration: `telemetry type is not supported` | Remove any `batch` processor from the profiles pipeline |
| The profiler exits with a `k8s_attributes` error | The ServiceAccount, ClusterRole and ClusterRoleBinding, and access to the API server |
| `Exporting failed` with connection refused or a DNS error | CubeAPM address, port, firewall |
| Exports succeed but nothing shows | The license key (an unknown key lands in the default account), the environment picker (`UNSET`), the time range |
| A service is missing | Is it named (see the naming sections)? Is it a supported language? On a VM, does the profiler add `host.name`? |
| A service has the wrong name | On Kubernetes, the container's own `OTEL_SERVICE_NAME` comes first. On a VM, check your `transform` rules |
| php-fpm on a VM is missing | Name it by executable; its environment variables are not readable |

## Settings in CubeAPM

These go in the CubeAPM [configuration file](../configuration/configuration.md):

```properties
# Stop accepting OpenTelemetry profiles (uploads get 404). Traces are not affected.
profiles.otlp.disable=false

# Profile uploads handled at once, 1 to 16.
profiles.otlp.max-concurrent-uploads=8

# How long profiles are kept.
profiles.retention=168h
```

Fixed limits:
- 1 MiB per export after decompression; real exports are tens of kilobytes;
- 512 processes per export.

## FAQ

**Can I send the profiles through my own OpenTelemetry Collector?** No. Send them straight from the profiler to CubeAPM. Current Collector versions lose resource attributes when they decode and re-encode profiles, and CubeAPM then sees no service names.

**How much data is this?** About one record per profiled process every 5 seconds, a few kilobytes each.

**What does the profiler cost on the host?** It samples each CPU 20 times a second from the kernel. It does not change or restart your processes.

**Can I upgrade the profiler?** Yes, after you test the new version. The OpenTelemetry profiles format is still alpha and changes between releases. This page is tested with 0.164.0.
