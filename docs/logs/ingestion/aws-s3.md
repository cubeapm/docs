---
id: aws-s3
title: "AWS S3"
slug: /logs/ingestion/aws-s3
---

# AWS Logs via S3

CubeAPM supports collecting logs from AWS services (e.g., ELB access and connection logs, AWS WAF logs) that can be configured to send their logs to Amazon S3. This method uses an AWS Lambda function that is triggered whenever new log files are uploaded to S3, which then forwards the logs to CubeAPM.

![AWS S3 Log Flow](/img/aws-s3-flow.svg)

## Setup Instructions

### Step 1: Configure AWS Service to Send Logs to S3

Configure your AWS service to deliver logs to an S3 bucket:

#### For ELB Access and Connection Logs:

1. Go to **AWS Console** → **EC2** → **Load Balancers**
2. Select your load balancer
3. Go to **Attributes** tab
4. Edit **Access logs** settings
5. Enable access logs and specify your S3 bucket and prefix

#### For AWS WAF Logs:

1. Go to **AWS Console** → **WAF & Shield** → **Web ACLs**
2. Select your Web ACL
3. Go to **Logging and metrics** tab
4. Enable logging and choose **Amazon S3** as the destination
5. Specify your S3 bucket

### Step 2: Deploy the Lambda Function

CubeAPM provides a pre-built Lambda function to process S3 logs and forward them to your CubeAPM instance.

1. **Download the Lambda function** from the CubeAPM GitHub repository:

   ```
   https://github.com/cubeapm/cubeapm-lambda-s3-logs
   ```

2. **Deploy the Lambda function**:

   - Create a new Lambda function in the AWS Console
   - Upload the code from the GitHub repository
   - Set the timeout to **10 seconds** in the Lambda function configuration

3. **Configure environment variables**:

   ```shell
   LOG_ENDPOINT=http://<cubeapm_domain>:3130/api/logs/insert/jsonline

   # Optional
   CUBE_ENVIRONMENT=production
   ```

### Step 3: Required IAM Permissions

The Lambda function needs the following IAM permissions:

#### Lambda Execution Role Policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

#### S3 Bucket Policy (to allow access to Lambda):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowLambdaAccess",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::your-account-id:role/your-lambda-execution-role"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

### Step 4: Configure S3 Bucket Trigger

1. Go to your S3 bucket in the AWS Console
2. Go to **Properties** tab
3. Scroll down to **Event notifications**
4. Click **Create event notification**
5. Configure the trigger:
   - **Event name**: Give it a descriptive name (e.g., `cubeapm-log-processor`)
   - **Event types**: Select **All object create events**
   - **Prefix**: (Optional) Specify a prefix if logs are sent to a specific folder
   - **Suffix**: (Optional) Specify `.log` or `.gz` depending on your log file format
   - **Destination**: Choose **Lambda function**
   - **Lambda function**: Select the Lambda function you deployed in Step 2

## Troubleshooting

1. **Check Lambda Function**:

   - Go to AWS Console → Lambda → Your function
   - Check the **Monitoring** tab for execution metrics
   - Check **CloudWatch Logs** for the Lambda function to see execution details and any errors
