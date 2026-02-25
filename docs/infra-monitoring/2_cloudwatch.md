---
sidebar_position: 1
slug: /infra-monitoring/aws-cloudwatch
---

# AWS CloudWatch

CubeAPM supports monitoring AWS services through two methods: **CloudWatch Metric Streams** (described in this document) and **direct communication**. The choice depends on the type of AWS service and your cost considerations.

### When to Use Each Method

#### Direct Communication (Recommended for Cost Efficiency)

For AWS services that use **underlying technologies supported by OpenTelemetry**, you can connect directly to avoid CloudWatch streaming costs:

- **Container Services**: Amazon EKS (Kubernetes), ECS Fargate (containerized apps)
- **Database Services**: Amazon RDS (MySQL, PostgreSQL, etc.), DocumentDB (MongoDB), ElastiCache (Redis)
- **Message Queues**: Amazon MQ (Apache ActiveMQ, RabbitMQ), MSK (Apache Kafka)
- **Analytics**: EMR (Apache Spark, Hadoop), OpenSearch (Elasticsearch)

_Since these services use popular open-source technologies that OpenTelemetry natively supports, direct metric collection is more cost-effective._

### CloudWatch Metric Streams

For **AWS proprietary services** where CloudWatch is the primary or only option for metric collection:

- **Compute**: AWS Lambda, EC2, Batch
- **Storage**: S3, EBS, EFS
- **Networking**: VPC, CloudFront, Route 53, Load Balancers (ALB/NLB)
- **API & Integration**: API Gateway, SQS, SNS, EventBridge, Step Functions
- **Security**: WAF, Shield, GuardDuty
- **Developer Tools**: CodeBuild, CodeDeploy, CodePipeline

_For these AWS-native services, CloudWatch Metric Streams provides comprehensive monitoring capabilities. While this method incurs CloudWatch streaming costs, it's often the most practical approach for these proprietary services._

## CloudWatch Metric Streams Setup

The following installation steps show how to set up CloudWatch Metric Streams for collecting metrics from AWS services and sending them to CubeAPM. Various AWS services send monitoring data to AWS CloudWatch. AWS CloudWatch can send this data to Amazon Data Firehose, and Amazon Data Firehose can be configured to send this data to CubeAPM.

![CubeAPM with AWS CloudWatch](/img/cloudwatch.svg)

:::info
Firehose does not run in client VPC, so it cannot connect with private CubeAPM endpoint. An internet-facing load balancer is needed for Firehose to be able to send data to CubeAPM.
:::

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

## Alerting on CloudWatch metrics

The alerting process for CloudWatch metrics is the same as that for other metrics. However, CloudWatch metrics typically come with a delay of 2-3 minutes. So, it is highly recommended to set the alerting conditions accordingly. For example, if the normal query is `<query>`, then instead use `last_over_time(<query>[10m])` as the query for alerting. This gets latest available value over the last 10 minutes, thus avoiding alerts misbehaving due to data unavailability.

Also, we recommend creating an alert with the below query to get notificed in case of excessive delays:

```
lag({__name__=~"amazonaws.com/.*"}[30m]) keep_metric_names >= 5m
```
