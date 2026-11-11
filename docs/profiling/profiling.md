---
slug: /profiling
---

# Profiling

Profiling shows where your services spend CPU time, memory and wait time, down to the function. Traces tell you which request was slow. Profiles tell you which code made it slow.

CubeAPM supports mutiple profiling agents to make integration easier. Not all agents provide same capability. Read the following sections to understand each agent's capabilities and decide the best approach.

## Datadog

Datadog provides extensive support for profiling. Also, profiling support is built into the tracing libraries themselves, so no separate integration is required. Only some config changes are needed to start profiling with Datadog tracers and agents.

If extensive profiling support is desired, Datadog is the most recommended agent. However, since Datadog does not ship a separate profiling agent, and multiple tracing agents in an application often conflict, tracing integration will also need to be changed if application is presently using some other tracing agent.

## Elastic

Elastic has donated their profiling code to OTel, and now recommends using OTel instead of Elastic agents. Hence, CubeAPM has not added supported for Elastic profiling agent.

## New Relic

As of year 2026, New Relic has mature profiling support for Java, and _early preview_ support for some other languages, with more coverage planned over time. CubeAPM, at present, supports profiling with New Relic only for Java. Support for other languages will be added as they mature.

Profiling support is built into the New Relic agents themselves, so no separate integration is required. Only some config changes are needed to start profiling with New Relic agents.

## OpenTelemetry (eBPF)

OpenTelemetry (OTel) supports profiling via their eBPF agents. eBPF collects profiling data directly from the Linux kernel, and hence it can collect profiling data even when the application is not instrumented with OTel, or is not instrumented at all. This also means that eBPF integration does not require any changes to the application code at all. However, Profiling is in relatively early stages of development at OTel, and hence the capabilities are limited at present - it only supports CPU profiling and not memory, locks, etc.

Overall, OTel is the recommended method for getting baseline profiling support for all applications irrespective of programming language and tracing integration method.

## Choose a source

|                                  | [Datadog](./1_datadog.md)                                                                | [New Relic](./2_newrelic.md)        | [OpenTelemetry](./3_opentelemetry.md)                                    |
| -------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------ |
| What you install                 | Datadog tracer in each application                                                       | New Relic agent in each application | One OpenTelemetry eBPF profiler per host. No change to the applications. |
| Languages                        | .NET, Go, Java, Node.js, PHP, Python, Ruby, native code                                  | Java                                | .NET, Go, Java, Node.js, PHP, Python, Ruby                               |
| Profile types                    | CPU, wall time, allocations, heap, locks, exceptions and more, depending on the language | CPU, plus JVM Health charts         | CPU                                                                      |
| Link from a trace to its profile | Yes                                                                                      | No                                  | No                                                                       |
| Endpoint breakdown               | Yes                                                                                      | No                                  | No                                                                       |

## FAQ

**Does profiling slow down my application?** The profilers are built to run in production. Their cost depends on the profiler and its settings. See the documentation of the [Datadog profiler](https://docs.datadoghq.com/profiler/), the [New Relic Java agent](https://docs.newrelic.com/docs/apm/agents/java-agent/features/real-time-profiling-java-using-jfr-metrics/) or the [OpenTelemetry eBPF profiler](https://github.com/open-telemetry/opentelemetry-ebpf-profiler).

**My profiles do not show up.** Set the environment picker to `UNSET` and widen the time range first. Then follow the troubleshooting section of your source: [Datadog](./1_datadog.md#troubleshooting), [New Relic Java](./2_newrelic.md#troubleshooting), [OpenTelemetry](./3_opentelemetry.md#troubleshooting).
