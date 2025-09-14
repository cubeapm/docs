---
slug: /instrumentation/newrelic
sidebar_position: 1
---

# New Relic

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Using CubeAPM with New Relic agents

CubeAPM supports New Relic agents, i.e., CubeAPM can be used to monitor applications instrumented with New Relic agents. Here's how to use New Relic agents with CubeAPM:

By default, New Relic agents send data to New Relic servers. However, if an environment variable `NEW_RELIC_HOST` is found, the agents send data to the domain mentioned in this environment variable's value instead of sending to New Relic servers. Thus, by adding the environment variable `NEW_RELIC_HOST=<domain_of_cubeapm_server>` to the application deployment setup, New Relic agent will send data to your CubeAPM servers instead of New Relic servers.

However, there is one more thing that needs to be taken care of. New Relic agents send data using HTTPS on port 443. However, CubeAPM expects data on port 3130 over HTTP. So, a load balancer (or HTTP reverse proxy) is needed to accept data on HTTPS/443 and forward to CubeAPM on HTTP/3130.

That's it! New Relic agents can now be used to send data to CubeAPM.

![CubeAPM with New Relic](/img/new-relic.svg)

:::info
New Relic PHP agent does not support the NEW_RELIC_HOST environment variable. It needs setting the `newrelic.daemon.collector_host` value in newrelic.ini instead.

Also, while unrelated to CubeAPM, we highly recommend setting `newrelic.transaction_tracer.detail = 0` in newrelic.ini. Without this, the New Relic PHP agent generates a lot of data which degrades application performance.
:::

:::info
New Relic Go agent does not read environment variables by default. `newrelic.ConfigFromEnvironment()` needs to be added to `newrelic.NewApplication()` as below.

```go
newrelic.NewApplication(
    newrelic.ConfigFromEnvironment(),
    ...
)
```

:::

### Minimum New Relic Agent version supported by CubeAPM

| Language | Minimum Agent Version |
| -------- | --------------------- |
| DotNet   | v8.17.438             |
| Go       | v3.8.0                |
| Java     | v6.0.0                |
| NodeJS   | v6.11.0               |
| PHP      | v10.0.0               |
| Python   | v5.16.0               |
| Ruby     | v6.12.0               |

### Multi-environment setup

If you are using multi-environment feature of CubeAPM, you can set your application’s environment name by setting the app name as per the below format:

```shell
# environment variable
NEW_RELIC_APP_NAME=<application_name>[semicolon]<environment_name>

# If the agent config file sets app_name as an array, then
# set the app name as:
# app_name: ['<application_name>', '<environment_name>']
```

For example:

```shell
# environment variable
NEW_RELIC_APP_NAME=order-service;sandbox

# config file
# app_name: ['order-service', 'sandbox']
```

### Troubleshooting

The following command can be tried on the application host server to check connectivity to CubeAPM server(s):
<Tabs groupId="shells">
<TabItem value="bash" label="bash">

```shell
curl -X POST -v -d '[]' 'https://<domain_of_cubeapm_server>/agent_listener/invoke_raw_method?marshal_format=json&protocol_version=17&method=preconnect' -H 'content-type: application/json'
```

</TabItem>
<TabItem value="powershell" label="powershell">

```shell
$uri = 'https://<domain_of_cubeapm_server>/agent_listener/invoke_raw_method?marshal_format=json&protocol_version=17&method=preconnect'
$headers = @{
    'content-type' = 'application/json'
}
Invoke-RestMethod -Uri $uri -Method Post -Headers $headers -Body '[]'
```

</TabItem>
</Tabs>

Expected response: `200 OK` with response message `{"return_value":{"redirect_host":"<domain_of_cubeapm_server>"}}`

### AWS Lambda

For AWS Lambda, instead of setting `NEW_RELIC_HOST`, set `NEW_RELIC_TELEMETRY_ENDPOINT` as below in your Lambda environment variables.

```shell
NEW_RELIC_TELEMETRY_ENDPOINT=https://<domain_of_cubeapm_server>/newrelic/aws/lambda/v1

# For multi-environment setup
NEW_RELIC_TELEMETRY_ENDPOINT=https://<domain_of_cubeapm_server>/newrelic/aws/lambda/v1/env/<environment_name>
```

### Infinite Tracing

Using New Relic's infinite tracing with CubeAPM is also easy. By adding the environment variable `NEW_RELIC_INFINITE_TRACING_TRACE_OBSERVER_HOST=<domain_of_cubeapm_server>` (and optionally `NEW_RELIC_INFINITE_TRACING_TRACE_OBSERVER_PORT=<desired_port>`) to the application deployment setup, New Relic agent will send infinite tracing data to your CubeAPM servers instead of New Relic servers. Note that NEW_RELIC_HOST is still required.

In case of infinite tracing, New Relic agents send data using gRPCS on port 443. However, CubeAPM expects data on port 3124 over gRPC. So, a load balancer (or gRPC reverse proxy) is needed to accept data on gRPCS/443 and forward to CubeAPM on gRPC/3124.

![CubeAPM with New Relic infinite tracing](/img/new-relic-8t.svg)

:::info
In case of Python language, the following package also needs to be installed.

pip install "newrelic[infinite-tracing]"

Also, if you are using gevent, please check https://stackoverflow.com/questions/60957202/using-grpc-with-gevent for additional consideration.

:::

:::info
In case of Ruby language, please follow the guide here - https://docs.newrelic.com/docs/apm/agents/ruby-agent/configuration/distributed-tracing-ruby-agent/#configure-agent-inf

:::

:::warning
Infinite tracing uses GRPC metadata. GRPC metadata is passed in http headers. By default, nginx drops headers with underscore in name, so if nginx is being used in the request path, it needs to be configured to allow underscores in headers - https://nginx.org/en/docs/http/ngx_http_core_module.html#underscores_in_headers

AWS Application Load Balancer (ALB) also drops headers with underscores if `drop invalid header fields` is turned on.
:::

#### Minimum New Relic Agent version required for infinite tracing

| Language | Minimum Agent Version |
| -------- | --------------------- |
| Java     | v8.3.0                |
| NodeJS   | v10.1.0               |
| Python   | v8.7.0                |
| Ruby     | v8.15.0               |
