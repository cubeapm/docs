---
slug: /profiling
---

# Profiling

Continuous profiling shows where your services spend CPU time, memory and wait time, down to the function. Traces tell you which request was slow. Profiles tell you which code made it slow.

CubeAPM receives profiles from agents you may already run. For most languages you only change agent settings, not application code, and there is nothing to enable in CubeAPM: profile ingestion is on by default.

## Choose a source

| | [Datadog](./1_datadog.md) | [New Relic Java](./2_newrelic.md) | [OpenTelemetry](./3_opentelemetry.md) |
|---|---|---|---|
| What you install | The Datadog tracer of each application, with profiling turned on. With or without the Datadog Agent | The New Relic Java agent, with its JFR service turned on | One OpenTelemetry eBPF profiler per host. No change to the applications |
| Languages | Java, Python, Go, Node.js, .NET, Ruby, PHP, native code | Java | Python, Java, Node.js, .NET, Go, PHP, Ruby |
| Profile types | CPU, wall time, allocations, heap, locks, exceptions and more, depending on the language | CPU, plus JVM Health charts | CPU |
| Link from a trace to its profile | Yes | No | No |
| Endpoint breakdown | Yes | No | No |
| Where it runs | Where Datadog's profiler supports the language and platform | Where the New Relic Java agent runs | Linux hosts: Kubernetes, Docker hosts and VMs |
| Upload period | About 60 seconds per process | 10 seconds per JVM | About 5 seconds per process |

Which one to pick:

- **Your applications already use Datadog tracers:** use [Datadog](./1_datadog.md). It gives the most profile types, the endpoint breakdown and the link from traces.
- **Your Java applications use the New Relic agent:** use [New Relic Java](./2_newrelic.md) for CPU flame graphs and JVM Health.
- **You cannot change the applications, or want one profiler for every process on a host:** use [OpenTelemetry](./3_opentelemetry.md). It needs root on the host and gives CPU profiles only.

You can use more than one source at the same time. Each profile shows its source on the **Profiles** page.

## What you can do with profiles

- Find the functions that use the most CPU, memory or wait time, in a flame graph or a top 50 table.
- Limit a profile to one HTTP endpoint (Datadog).
- Go from a slow trace to the profiles taken while it ran (Datadog).
- Compare a profile with one from an hour, a day or a week earlier.
- Check JVM health next to the profile (New Relic).

See [Explore profiles](./4_explore.md).

## Ports

| Source | CubeAPM port | Path |
|---|---|---|
| Datadog (tracer or Datadog Agent) | 3130 | `/profiling/v1/input` (tracers), `/api/v2/profile` (Datadog Agent) |
| New Relic Java (JFR) | 3130, through the same load balancer as APM data | `/api/logs/v1/push/newrelic/events` and `/api/metrics/v1/push/newrelic/metric/v1` |
| OpenTelemetry | 4317 (gRPC) or 4318 (HTTP) | `/v1development/profiles` on 4318 |

Do not send profiles to port 3125. It serves the UI.

## Accounts

With more than one CubeAPM account, profiles go to the account of the key the agent sends, the same as its traces:

| Source | Key |
|---|---|
| Datadog through the Datadog Agent | The agent's `DD_API_KEY` |
| Datadog straight to CubeAPM | None, so the default account |
| New Relic Java | The agent's license key |
| OpenTelemetry | The `x-cube-token` header on the profiler's exporter |

A key CubeAPM does not know sends data to the default account. Data sent with a revoked key is not visible in any account.

## Settings

These are CubeAPM settings. Set them like any other [CubeAPM configuration](/configure) parameter: on the command line, in the configuration file, or as `CUBE_` environment variables.

| Setting | Default | What it does |
|---|---|---|
| `profiles.retention` | `168h` | How long profiles are kept. At least `24h` |
| `profiles.max-concurrent-uploads` | twice the number of CPUs | Datadog and New Relic profile uploads processed at once. Above it, CubeAPM answers 429 with `Retry-After: 60`. `0` means no limit |
| `profiles.newrelic.disable` | `false` | Stops accepting New Relic JFR profiles and tells newly connecting agents to turn JFR off (unless CubeAPM forwards New Relic agent connections to New Relic) |
| `profiles.otlp.disable` | `false` | Stops accepting OpenTelemetry profiles. Traces are not affected |
| `profiles.otlp.max-concurrent-uploads` | `8` | OpenTelemetry profile uploads processed at once, 1 to 16 |

For example, in the configuration file:

```shell title="config.properties"
# keep profiles for 3 days
profiles.retention=72h
profiles.max-concurrent-uploads=32
```

## Limits

| Item | Value |
|---|---|
| Datadog upload size | 50 MiB per upload, and 200 MiB for each profile in it after decompression |
| New Relic JFR upload size | 50 MiB per upload, and 200 MiB after decompression |
| OpenTelemetry export size | 1 MiB after decompression, and per export 512 processes, 512 profiles and 32,768 samples |
| Minimum retention | 24 hours |

## Data stored with a profile

A profile holds what the profiler sends: stack frames (function, file and line names), sample values, and labels such as service, env, version, host and, depending on the source, process id, container id, thread names and endpoint names. Datadog Java profiles also keep the original JFR recording.

Before storing a Datadog or New Relic profile, CubeAPM replaces values that look like secrets or personal data in the service, env, version and host fields with `[REDACTED]`: JSON web tokens, AWS access key ids, email addresses and numbers of 13 to 19 digits. A service or version name that is a long number is replaced too. CubeAPM does not change the frames and labels inside the profile itself.

## FAQ

**Does profiling slow down my application?** The profilers are built to run in production. Their cost depends on the profiler and its settings. See the documentation of the [Datadog profiler](https://docs.datadoghq.com/profiler/), the [New Relic Java agent](https://docs.newrelic.com/docs/apm/agents/java-agent/features/real-time-profiling-java-using-jfr-metrics/) or the [OpenTelemetry eBPF profiler](https://github.com/open-telemetry/opentelemetry-ebpf-profiler).

**Do I need a Datadog or New Relic account?** No. The agents send profiles to CubeAPM, and CubeAPM does not pass them on to Datadog or New Relic.

**How long until I see the first profile?** About two minutes after the application starts with profiling on. OpenTelemetry profiles show up within a minute of the profiler starting.

**My profiles do not show up.** Set the environment picker to `UNSET` and widen the time range first. Then follow the troubleshooting section of your source: [Datadog](./1_datadog.md#troubleshooting), [New Relic Java](./2_newrelic.md#troubleshooting), [OpenTelemetry](./3_opentelemetry.md#troubleshooting).

**Can I turn profiling off?** Turn it off in the agent or profiler. For New Relic and OpenTelemetry you can also turn it off in CubeAPM with `profiles.newrelic.disable` and `profiles.otlp.disable`.
