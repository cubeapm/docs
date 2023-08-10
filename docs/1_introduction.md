---
slug: /
---

# Introduction

CubeAPM is an Application Performance Monitoring (APM) platform. It collects telemetry data from applications and infrastructure, and provides a UI for users to visualize and query the data. It also provides the ability to set up alerts based on the telemetry data, and sending notifications to users over various channels like Email, Slack, PagerDuty, etc.

Following is a high-level architecture diagram of how CubeAPM works.

![CubeAPM Architecture](/img/architecture.svg)

There are two main parts to setting up CubeAPM: [installing CubeAPM](./Installation/01_install/01_install.md) itself, and [integrating OpenTelemetry (OTel) Agents with your applications](./instrumentation/instrumentation.md) so that they send telemetry data to CubeAPM.
