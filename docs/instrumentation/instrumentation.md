---
slug: /instrumentation
sidebar_position: 3
---

# Instrumentation

To monitor your applications with CubeAPM, you need to instrument them — that is, add code or agents that collect telemetry data and send it to CubeAPM.

CubeAPM supports two major instrumentation methods:

1. New Relic Agent

    CubeAPM can receive data directly from applications already instrumented with New Relic agents. This is ideal if you're migrating from New Relic or want to reuse existing instrumentation with minimal changes.

1. OpenTelemetry

    CubeAPM natively supports the OpenTelemetry Protocol (OTLP), the industry standard for observability data.