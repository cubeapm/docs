---
id: aws-firehose
title: "AWS Firehose"
slug: /logs/ingestion/aws-firehose
---

# AWS Logs via Firehose

CubeAPM supports collecting logs from AWS services through Amazon Data Firehose. AWS services can send logs through two primary paths:

Amazon Data Firehose always sends data to port 443 (HTTPS) and this is not configurable. Since CubeAPM listens on port 3130, you must set up a load balancer or reverse proxy to forward traffic from port 443 to port 3130 on your CubeAPM instance.

1. **AWS Services → CloudWatch Logs → Firehose → Load Balancer → CubeAPM** - Most AWS services (e.g., AWS Lambda, API Gateway, EC2) send their logs to CloudWatch Logs first, which can then be forwarded to Firehose.

   ![AWS CloudWatch Firehose Log Flow](/img/aws-cloudwatch-firehose-cubeapm.svg)

2. **AWS Services → Firehose → Load Balancer → CubeAPM** - Some AWS services (e.g., AWS WAF) can send logs directly to Firehose, bypassing CloudWatch Logs entirely.

   ![AWS CloudWatch Firehose Log Flow](/img/aws-firehose-cubeapm-flow.svg)

## Setup Instructions

### Step 1: Set Up Load Balancer

Since Amazon Data Firehose sends data to port 443 (HTTPS) and CubeAPM listens on port 3130, you need to set up a load balancer to forward traffic.

#### AWS Application Load Balancer (ALB)

1. **Create an Application Load Balancer**:

   - Go to **AWS Console** → **EC2** → **Load Balancers**
   - Click **Create Load Balancer** → **Application Load Balancer**
   - Configure basic settings:
     - **Name**: `cubeapm-firehose-alb`
     - **Scheme**: Internal
     - **IP address type**: IPv4

2. **Configure Listeners and Routing**:

   - **Listener**: HTTPS:443
   - **Target Group**: Create a new target group
     - **Target type**: Instance or IP addresses
     - **Protocol**: HTTP
     - **Port**: 3130
     - **Health check path**: `/health` (or appropriate health check endpoint)

3. **SSL Certificate**:
   - Use AWS Certificate Manager (ACM) to create or import an SSL certificate
   - Associate the certificate with the HTTPS listener

### Step 2: Create Amazon Data Firehose Stream

1. Go to AWS Console and navigate to **Amazon Data Firehose**.
2. Click **Create Firehose stream**.
3. Configure the basic settings:
   - **Source**: Choose **Direct PUT**
   - **Destination**: Choose **HTTP Endpoint**
   - **Firehose stream name**: Give an appropriate name (e.g., `CubeAPM-Logs-Stream`)
4. **Transform records** (optional): Leave blank or skip this step
5. Configure **Destination settings**:
   - **HTTP endpoint name**: Provide a descriptive name (e.g., `CubeAPM-Logs-Endpoint`)
   - **HTTP endpoint URL**: `https://<load-balancer-domain>/api/logs/insert/firehose/generic`
   - **Authentication**: Choose **Use access key**
   - **Access key** (optional): Leave blank
   - **Content encoding**: Select **GZIP**
   - **Parameters**: Click **Add parameter** and add:
     - **Parameter name**: `event.domain`
     - **Parameter value**: `aws.firehose`

:::info
For multi-environment setup, you can add additional parameters to identify the environment:

- **Parameter name**: `cube.environment`
- **Parameter value**: `<environment_name>`
  :::

### Step 3: Configure IAM Permissions

After creating the stream, go to the **Configuration** tab and configure **Service access**:

1. Under **Service access**, ensure the IAM role has the required permissions
2. Create an IAM role for Firehose with the following trust policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "firehoseAssume",
      "Effect": "Allow",
      "Principal": {
        "Service": "firehose.amazonaws.com"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "ArnEquals": {
          "aws:SourceArn": "arn:aws:firehose:region:account-id:deliverystream/your-firehose-stream-name"
        }
      }
    }
  ]
}
```

### Step 4: Configure Log Source

Choose the appropriate method based on your AWS service:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="cloudwatch" label="Via CloudWatch Logs" default>

Most AWS services (e.g., AWS Lambda, API Gateway, EC2) send their logs to CloudWatch Logs first. Follow these steps to forward logs from CloudWatch to Firehose:

#### Required IAM Permissions for Subscription Filter

The subscription filter requires permission to deliver logs to Firehose:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["firehose:PutRecord", "firehose:PutRecordBatch"],
      "Resource": "arn:aws:firehose:*:*:deliverystream/your-firehose-stream-name"
    }
  ]
}
```

#### Configure CloudWatch Logs Subscription Filter

1. Go to **AWS Console** → **CloudWatch** → **Logs** → **Log groups**
2. Find the log group for your AWS service
3. Click on the log group and go to **Subscription filters**
4. Click **Create subscription filter**
5. Configure the subscription filter:
   - **Destination**: Choose **Amazon Data Firehose**
   - **Amazon Data Firehose stream**: Select the Firehose stream created in Step 2
   - **Subscription filter pattern**: Leave empty to send all logs, or add a pattern to filter specific logs
   - **Subscription filter name**: Give an appropriate name

</TabItem>
<TabItem value="direct" label="Direct to Firehose">

Some AWS services (e.g., AWS WAF) can send logs directly to Firehose, bypassing CloudWatch Logs entirely:

#### Required IAM Permissions for AWS Services

For services like AWS WAF that send logs directly to Firehose, ensure the service has permission to write to your Firehose stream. This is typically configured automatically when you set up logging in the service console.

#### Configure AWS Service for Direct Delivery

Configure your AWS service to send logs directly to the Firehose stream:

**For AWS WAF:**

1. Go to **AWS Console** → **WAF & Shield** → **Web ACLs**
2. Select your Web ACL
3. Go to **Logging and metrics** tab
4. Enable logging and select the Firehose stream as the destination

</TabItem>
</Tabs>

## Troubleshooting

1. **Check Firehose Stream Metrics**:

   - Go to AWS Console → Amazon Data Firehose → Your stream
   - Check the **Monitoring** tab for metrics on data received and delivered
   - Check **Error logs** tab for destination error logs and detailed error messages
