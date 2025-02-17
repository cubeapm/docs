---
id: aws-lambda
title: "AWS Lambda"
slug: /logs/ingestion/aws-lambda
---

# AWS Lambda

AWS Lambda can send logs to external services using lambda extension layers. CubeAPM supports collecting logs via lambda layers of various providers, as detailed below.

:::info
The lambda will **NOT** stop sending logs to AWS Cloudwatch after the below integrations. Unfortunately, AWS does not provide an official way to stop sending lambda logs to Cloudwatch. A practical workaround is to modify your lambda's IAM permissions to deny the permission to send logs to Cloudwatch, as described here - https://stackoverflow.com/a/59665261.
:::

## OpenTelemetry

1. (Optional - required for traces but not for logs) Visit https://github.com/open-telemetry/opentelemetry-lambda/releases, and copy the ARN of the layer corresponding to the language in which your lambda is implemented. Fill in the appropriate values for parameters in `< >` to get the actual ARN. Add this ARN as a layer to your lambda.

1. From the same URL above, copy the ARN of the "layer-collector". Fill in the appropriate values for parameters in `< >` to get the actual ARN. Add this ARN as well as a layer to your lambda.

1. Add the below file to the root of your lambda function code and deploy the updated code.

   ```yaml title="collector.yaml"
   receivers:
     telemetryapi:
   exporters:
     debug:
       verbosity: detailed
       sampling_initial: 5
       sampling_thereafter: 1
     otlphttp/logs:
       logs_endpoint: http://<cubeapm_endpoint>:3130/api/logs/insert/opentelemetry/v1/logs
       headers:
         Cube-Stream-Fields: service.name
     otlphttp/traces:
       traces_endpoint: http://<cubeapm_endpoint>:4318/v1/traces
   processors:
     batch:
     decouple:
   service:
     pipelines:
       traces:
         receivers: [telemetryapi]
         processors: [batch, decouple]
         exporters:
           # - debug
           - otlphttp/traces
       logs:
         receivers: [telemetryapi]
         processors: [batch, decouple]
         exporters:
           # - debug
           - otlphttp/logs
   ```

1. Add the below environment variables to your lambda.

   ```shell
   # uncomment following line if traces instrumentation layer (as described in Step 1 above) is added.
   # AWS_LAMBDA_EXEC_WRAPPER=/opt/otel-handler
   OPENTELEMETRY_COLLECTOR_CONFIG_URI=/var/task/collector.yaml
   ```

Lambda logs should now be visible in CubeAPM.

Ref: https://opentelemetry.io/blog/2025/observing-lambdas/

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

1. Visit https://github.com/DataDog/serverless-plugin-datadog/blob/main/src/layers.json, and copy the ARN of the "extension" (or "extension-arm" if your lambda runs on ARM64 architecture) from the appropriate AWS region.

1. Add the ARN (copied above) as a layer to your lambda.

1. Add the below environment variables to your lambda.

   ```shell
   DD_API_KEY=random
   DD_URL=http://<ip_address_of_cubeapm_server>:3130
   DD_LOGS_ENABLED=true
   DD_LOGS_CONFIG_FORCE_USE_HTTP=true
   DD_LOGS_CONFIG_LOGS_DD_URL=<ip_address_of_cubeapm_server>:3130
   DD_LOGS_CONFIG_LOGS_NO_SSL=true
   ```

Lambda logs should now be visible in CubeAPM.

For advanced configuration, using a configuration file is supported (note that environment variable settings override the value from the configuration file). You only need to create a datadog.yaml file in the root of your lambda function.
