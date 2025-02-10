---
id: aws-lambda
title: "AWS Lambda"
slug: /logs/ingestion/aws-lambda
---

# AWS Lambda

AWS Lambda can send logs to external services using lambda extension layers. We recommend using Datadog's lambda extension, as it provides good performance and is convenient to integrate as well.

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

:::warning
The lambda will NOT stop sending logs to AWS Cloudwatch after the above integration. Unfortunately, AWS does not provide an official way to stop sending lambda logs to Cloudwatch. A practical workaround is to modify your lambda's IAM permissions to deny the permission to send logs to Cloudwatch, as described here - https://stackoverflow.com/a/59665261.
:::
