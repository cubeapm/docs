---
slug: /instrumentation
sidebar_position: 3
---

# Instrumentation

To monitor your applications with CubeAPM, you need to instrument them — that is, add code or agents that collect telemetry data and send it to CubeAPM. CubeAPM supports mutiple instrumentation agents to make this process easier.

:::info
All the instrumentation agents supported by CubeAPM are open-sourced under permissible licences, e.g., Apache 2.0. Their source code and the accompanying licences are also available on GitHub. There is no commercial obligation attached to the use of these agents.
:::

## Datadog

CubeAPM can receive data directly from applications already instrumented with Datadog agents. This is ideal if you're migrating from Datadog or want to reuse existing instrumentation with minimal changes.

## Elastic

CubeAPM can receive data directly from applications already instrumented with Elastic agents. This is ideal if you're migrating from Elastic or want to reuse existing instrumentation with minimal changes.

## New Relic

CubeAPM can receive data directly from applications already instrumented with New Relic agents. This is ideal if you're migrating from New Relic or want to reuse existing instrumentation with minimal changes.

## OpenTelemetry

CubeAPM natively supports the OpenTelemetry Protocol (OTLP), the industry standard for observability data.
