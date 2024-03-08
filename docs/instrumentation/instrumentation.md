---
slug: /instrumentation
sidebar_position: 3
---

# Instrumentation

CubeAPM understands Open Telemetry Protocol (OTLP) natively. So it can be used to monitor applications written in a wide variety of programming languages/frameworks. We have documentation for connecting applications written in some of the most popular languages/frameworks in this section (see left sidebar). Documentation for a wider range of languages/frameworks is available on the official [Open Telemetry website](https://opentelemetry.io/docs/instrumentation/).

## Using CubeAPM with New Relic agents

CubeAPM natively supports New Relic agents as well, i.e., CubeAPM can be used to monitor applications instrumented with New Relic agents as well. Here's how to use New Relic agents with CubeAPM:

By default, New Relic agents send data to New Relic servers. However, if an environment variable `NEW_RELIC_HOST` is found, the agents send data to the domain mentioned in this environment variable's value instead of sending to New Relic servers. Thus, by adding the environment variable `NEW_RELIC_HOST=<domain_of_cubeapm_server>` to the application deployment setup, New Relic agent will send data to your CubeAPM servers instead of New Relic servers.

However, there is one more thing that needs to be taken care of. CubeAPM agents send data using HTTPS on port 443. However, CubeAPM expects data on port 3130 over HTTP. So, a load balancer (or HTTP reverse proxy) is needed to accept data on HTTPS/443 and forward to CubeAPM on HTTP/3130.

That's it! New Relic agents can now be used to send data to CubeAPM.

![CubeAPM with New Relic](/img/new-relic.svg)

:::info
NewRelic PHP agent does not support the NEW_RELIC_HOST environment variable. It needs setting the `host` value in newrelic.ini instead.
:::

### Multi-environment setup

If you are using multi-environment feature of CubeAPM, you can set your application’s environment name by setting the app_name in NewRelic config file as per the below format:

```yaml
app_name: <application_name>[semicolon]<environment_name>
```

For example:

```yaml
app_name: order-service;sandbox
```
