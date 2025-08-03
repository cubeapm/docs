---
id: aws-lambda
title: "AWS Lambda"
slug: /logs/ingestion/aws-lambda
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# AWS Lambda

AWS Lambda can send logs to external services using lambda extension layers. CubeAPM supports collecting logs via lambda layers of various providers, as detailed below.

:::info
The lambda will **NOT** stop sending logs to AWS Cloudwatch after the below integrations. Unfortunately, AWS does not provide an official way to stop sending lambda logs to Cloudwatch. A practical workaround is to modify your lambda's IAM permissions to deny the permission to send logs to Cloudwatch, as described here - https://stackoverflow.com/a/59665261.
:::

## OpenTelemetry

1. Visit https://github.com/open-telemetry/opentelemetry-lambda/releases, and copy the ARN of the "layer-collector". Fill in the appropriate values for parameters in `< >` to get the actual ARN. Add this ARN as a layer to your lambda.

1. (Optional - required for traces but not for logs) From the same URL above, copy the ARN of the layer corresponding to the language in which your lambda is implemented. Fill in the appropriate values for parameters in `< >` to get the actual ARN. Add this ARN as well as a layer to your lambda.

1. Add the below file to the root of your lambda function code and deploy the updated code.

   ```yaml title="collector.yaml"
   receivers:
     telemetryapi:
     otlp:
       protocols:
         grpc:
           endpoint: "localhost:4317"
         http:
           endpoint: "localhost:4318"
   exporters:
     debug:
       verbosity: detailed
       sampling_initial: 5
       sampling_thereafter: 1
     otlphttp/logs:
       logs_endpoint: http://<cubeapm_endpoint>:3130/api/logs/insert/opentelemetry/v1/logs
       headers:
         Cube-Stream-Fields: service.name
     otlphttp/metrics:
       metrics_endpoint: http://<cubeapm_endpoint>:3130/api/metrics/v1/save/otlp
       retry_on_failure:
         enabled: false
     otlphttp/traces:
       traces_endpoint: http://<cubeapm_endpoint>:4318/v1/traces
   processors:
     batch:
     decouple:
   service:
     pipelines:
       traces:
         receivers: [telemetryapi, otlp]
         processors: [batch, decouple]
         exporters:
           # - debug
           - otlphttp/traces
       logs:
         receivers: [telemetryapi, otlp]
         processors: [batch, decouple]
         exporters:
           # - debug
           - otlphttp/logs
       metrics:
         receivers: [otlp]
         processors: [batch, decouple]
         exporters:
           # - debug
           - otlphttp/metrics
   ```

1. Add the below environment variables to your lambda.

   ```shell
   OPENTELEMETRY_COLLECTOR_CONFIG_URI=/var/task/collector.yaml

   # Uncomment the appropriate line below if traces instrumentation layer (as described in Step 2 above) is added.
   #
   # For Node.js, Java, Ruby
   # AWS_LAMBDA_EXEC_WRAPPER=/opt/otel-handler
   # For Python
   # AWS_LAMBDA_EXEC_WRAPPER=/opt/otel-instrument

   # By default, lambda function name is used as the service name.
   # Uncomment the following line to use a custom service name.
   # OTEL_SERVICE_NAME=<your_service_name>
   ```

Lambda logs should now be visible in CubeAPM.

Ref: https://opentelemetry.io/docs/platforms/faas/

## New Relic

If your lambda is instrumented using New Relic lambda layer, you can send the logs to CubeAPM by adding the below environment variables to your lambda.

```shell
NEW_RELIC_EXTENSION_SEND_FUNCTION_LOGS=true
NEW_RELIC_LOG_ENDPOINT=https://<domain_of_cubeapm_server_forwarding_to_port_3130>/api/logs/insert/newrelic/api/v1/lambda

# optional
# NEW_RELIC_EXTENSION_SEND_EXTENSION_LOGS=true
# NR_TAGS="key1:value1;key2:value2"

# Check the README below for steps to add New Relic lambda,
# and also for more configuration options:
# https://github.com/newrelic/newrelic-lambda-extension?tab=readme-ov-file#newrelic-lambda-extension--
```

Lambda logs should now be visible in CubeAPM.

## Datadog

1. Visit https://github.com/DataDog/serverless-plugin-datadog/blob/main/src/layers.json, and copy the ARN of the "extension" (or "extension-arm" if your lambda runs on ARM64 architecture) from the appropriate AWS region. Add this ARN as a layer to your lambda.

1. (Optional - required for traces but not for logs) From the same URL above, copy the ARN of the layer corresponding to the language in which your lambda is implemented and the runtime version of the lambda. Add this ARN as well as a layer to your lambda.

1. Add the below environment variables to your lambda.

   ```shell
   DD_API_KEY=random
   DD_URL=http://<ip_address_of_cubeapm_server>:3130
   DD_LOGS_CONFIG_LOGS_DD_URL=http://<ip_address_of_cubeapm_server>:3130
   DD_TRACE_AGENT_URL=http://<ip_address_of_cubeapm_server>:3130

   # Uncomment the appropriate line below if traces instrumentation layer (as described in Step 2 above) is added.
   # Set the value to your lambda's handler, e.g., `index.handler`.
   # DD_LAMBDA_HANDLER=<handler>

   # Uncomment to disable sending logs to CubeAPM
   # DD_SERVERLESS_LOGS_ENABLED=false

   # Enable debug logging
   # DD_LOG_LEVEL=debug
   ```

1. (Optional - required for traces but not for logs) Set your function's handler to the appropriate value below.

   <Tabs>
      <TabItem value="nodejs" label="Node.js">
         ```shell
         /opt/nodejs/node_modules/datadog-lambda-js/handler.handler
         ```
      </TabItem>
      <TabItem value="python" label="Python">
         ```shell
         datadog_lambda.handler.handler
         ```
      </TabItem>
   </Tabs>

Lambda logs should now be visible in CubeAPM.

For advanced configuration, using a configuration file is supported (note that environment variable settings override the value from the configuration file). You only need to create a datadog.yaml file in the root of your lambda function.

Ref: https://github.com/DataDog/datadog-lambda-extension
