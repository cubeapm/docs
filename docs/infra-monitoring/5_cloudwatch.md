---
sidebar_position: 5
slug: /infra-monitoring/aws-cloudwatch
---

# AWS CloudWatch

The recommended setup for monitoring AWS with CubeAPM is to use AWS CloudWatch Metric Streams for collecting the metrics from AWS and sending them to CubeAPM. CubeAPM then provides visualization and alerting on the collected metrics.

Various AWS services send monitoring data to AWS CloudWatch. AWS CloudWatch can send this data to Amazon Data Firehose, and Amazon Data Firehose can be configured to send this data to CubeAPM.

![CubeAPM with AWS CloudWatch](/img/cloudwatch.svg)

## Installation

Various AWS services send monitoring data to AWS CloudWatch. AWS CloudWatch can send this data to Amazon Data Firehose, and Amazon Data Firehose can be configured to send this data to CubeAPM.

### Create Amazon Data Firehose Stream

Go to AWS console. From the Services menu, choose Amazon Data Firehose. Then click on **Create Firehose stream**.

In the **Source** dropdown, choose **Direct PUT**. In the **Destination** dropdown, choose **HTTP Endpoint**.

Give an appropriate name to the Firehose stream, e.g., **CubeAPM-CloudWatch-Metric-Stream**.

In the **Transform records** section, make sure that the **Turn on data transformation** checkbox is unchecked (we do not need any data transformation).

In the **Destination settings** section, set **HTTP endpoint URL** to `https://<domain_of_cubeapm_server>/api/metrics/v1/save/aws`. We also recommend setting **Content encoding** to **GZIP**.

:::info
For multi-environment setup, set **HTTP endpoint URL** to `https://<domain_of_cubeapm_server>/api/metrics/v1/save/aws/metrics/job@base64/=/cube.environment/<environment_name>`.
:::

Choose the other settings as desired and create the Firehose stream.

### Create CloudWatch Metric Stream

Go to AWS console. From the Services menu, choose CloudWatch. Then go to **Metrics** > **Streams** and click on **Create metric stream**.

In the **Destination** section, choose **Custom setup with Firehose** and then select the Amazon Data Firehose stream we created above.

In the **Change output format** section, make sure that the selected output format is **OpenTelemetry 1.0**.

Choose the metrics you want to send to CubeAPM.

Give an appropriate name to the metric stream, e.g., **CubeAPM-CloudWatch-Metric-Stream** and create the metric stream.

It usually takes ~5 minutes for CloudWatch to start streaming data, and another ~5 minutes for CubeAPM to start showing data in the respective Infrastructure Monitoring dashboards.

## Troubleshooting

1. Check the CloudWatch metric stream page in the AWS console. The page shows some graphs about the number of updates published by CloudWatch. Check these graphs to see if data has been generated. It usually takes ~5 minutes for CloudWatch to start streaming data.

1. Check the Amazon Data Firehose stream page in the AWS console. The page shows some graphs about the data received (from CloudWatch) and sent (to CubeAPM). Check these graphs to see if data has been received and sent, and also if there have been any errors. If the graphs show any errors, check out the s3 bucket created by the Data Firehose stream for error logs.
