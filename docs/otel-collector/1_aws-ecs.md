---
sidebar_position: 1
slug: /otel-collector/aws-ecs
---

# AWS Elastic Container Service (ECS)

Telemetry data can be collected from AWS ECS (both EC2 and Fargate) using OpenTelemetry (OTel) Collector.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="ec2" label="EC2" default>

OTel Collector needs to be deployed as a **daemon service**.

1.  Create an IAM role with the following policy and name it `ECSOTELDaemonRole`.

    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "VisualEditor0",
          "Effect": "Allow",
          "Action": ["ec2:DescribeInstances", "ecs:DescribeContainerInstances"],
          "Resource": "*"
        }
      ]
    }
    ```

1. Attach IAM Permission to ECS Task to allow OTel Collector to fetch the configuration from SSM Parameter Store.

    ```json
    [
      {
        "Effect": "Allow",
        "Action": ["ssm:GetParameter", "ssm:GetParameters"],
        "Resource": "arn:aws:ssm:<aws-region>:<aws-account-id>:parameter/otel-collector-config"
      }
    ]
    ```


1.  Create SSM Parameter Store for OTel Collector Config. Create a parameter in **AWS Systems Manager (SSM)** Parameter Store and name it `otel-collector-config`. Choose type `String` and data type `text`, and then copy the below configuration in the value field.

    <details>
    <summary>otel-collector-config.yaml</summary>

    ```shell
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: 0.0.0.0:4317
          http:
            endpoint: 0.0.0.0:4318

      filelog:
        include:
          - /hostfs/var/log/ecs/*.log
        include_file_path: true

      hostmetrics:
        collection_interval: 60s
        scrapers:
          cpu:
          disk:
          load:
          filesystem:
          memory:
          network:

    processors:
      batch: {}
      resourcedetection:
        detectors: [ecs]
        timeout: 2s

    exporters:
      debug:
        verbosity: detailed
        sampling_initial: 5
        sampling_thereafter: 1

      otlphttp/metrics:
        metrics_endpoint: http://<cubeapm_endpoint>:3130/api/metrics/v1/save/otlp
        retry_on_failure:
          enabled: false
      otlphttp/logs:
        logs_endpoint: http://<cubeapm_endpoint>:3130/api/logs/insert/opentelemetry/v1/logs
        headers:
          Cube-Stream-Fields: severity, host.name
      otlp/traces:
        endpoint: <cubeapm_endpoint>:4317
        tls:
          insecure: true

    service:
      pipelines:
        traces:
          exporters:
            # - debug
            - otlp/traces
          processors:
            - batch
            - resourcedetection
          receivers:
            - otlp
        metrics:
          exporters:
            # - debug
            - otlphttp/metrics
          processors:
            - batch
            - resourcedetection
          receivers:
            - otlp
            - hostmetrics
        logs:
          exporters:
            # - debug
            - otlphttp/logs
          processors:
            - batch
            - resourcedetection
          receivers:
            - otlp
            - filelog
    ```

    </details>

1.  Create task definition for OTel Collector. Use the following configuration and edit the values in `< >` according to your setup.

    <details>
    <summary>otel-collector-daemonset.json</summary>
      ```json
      {
        "family": "otel-collector-daemon",
        "containerDefinitions": [
            {
                "name": "otel-collector",
                "image": "otel/opentelemetry-collector-contrib:0.145.0",
                "cpu": 0,
                "portMappings": [
                    {
                        "containerPort": 4317,
                        "hostPort": 4317,
                        "protocol": "tcp"
                    },
                    {
                        "containerPort": 4318,
                        "hostPort": 4318,
                        "protocol": "tcp"
                    }
                ],
                "essential": true,
                "command": [
                    "--config=env:OTEL_CONFIG"
                ],
                "environment": [],
                "mountPoints": [
                    {
                        "sourceVolume": "host-root",
                        "containerPath": "/hostfs",
                        "readOnly": true
                    }
                ],
                "volumesFrom": [],
                "secrets": [
                    {
                        "name": "OTEL_CONFIG",
                        "valueFrom": "otel-collector-config"
                    }
                ],
                "logConfiguration": {
                    "logDriver": "awslogs",
                    "options": {
                        "awslogs-group": "/ecs/otel-daemon",
                        "awslogs-region": "<ap-south-1>",
                        "awslogs-stream-prefix": "daemon"
                    }
                },
                "systemControls": []
            }
        ],
        "taskRoleArn": "arn:aws:iam::<aws-account-id>:role/ECSOTELDaemonRole",
        "executionRoleArn": "arn:aws:iam::<aws-account-id>:role/<ecsTaskExecutionRole>",
        "networkMode": "host",
        "volumes": [
            {
                "name": "host-root",
                "host": {
                    "sourcePath": "/"
                }
            }
        ],
        "placementConstraints": [],
        "requiresCompatibilities": [
            "EC2"
        ],
        "cpu": "512",
        "memory": "1024",
        "runtimePlatform": {
            "cpuArchitecture": "<X86_64>",
            "operatingSystemFamily": "LINUX"
        }
    }
    ```
    </details>

1.  Create a service using the above task definition and configure it as a daemon service by setting `Scheduling strategy` as `daemon` in `Deployment configuration`.

1.  Update your applications' configuration to send logs, metrics and traces to the OTel Collector daemon service. Applications can connect to OTel Collector on the fixed IP `172.17.0.1` (Docker bridge gateway IP), which will always point to the OTel Collector running on the same EC2 host as the application container.

## Troubleshooting

1. Verify that OTel Collector is running on the EC2 instances, and Otel Collector config.yaml file is placed at `/etc/ecs/otel-config/config.yaml` on the EC2 instances.

1. Check OTel Collector logs.

</TabItem>

<TabItem value="fargate" label="Fargate">

OTel Collector needs to be deployed as a **sidecar**.

1.  Update your Application Task Definition to include OTel Collector container. Use the following configuration and edit the values in `< >` according to your setup.

    <details>
    <summary>application task definition</summary>
    ```json
    {
      ... other properties
      "containerDefinitions": [
        {
          ... application container definition
        },
        {
          "name": "otel-collector",
          "image": "otel/opentelemetry-collector-contrib:0.145.0",
          "cpu": 0,
          "portMappings": [
            {
              "containerPort": 4317,
              "hostPort": 4317,
              "protocol": "tcp"
            },
            {
              "containerPort": 4318,
              "hostPort": 4318,
              "protocol": "tcp"
            }
          ],
          "essential": true,
          "command": [
            "--config",
            "env:OTELCOL_CONFIG"
          ],
          "environment": [],
          "mountPoints": [],
          "volumesFrom": [],
          "secrets": [
            {
              "name": "OTELCOL_CONFIG",
              "valueFrom": "otel-collector-config"
            }
          ],
          "logConfiguration": {
            "logDriver": "awslogs",
            "options": {
              "awslogs-group": "<logs-group>",
              "awslogs-create-group": "true",
              "awslogs-region": "<aws-region>",
              "awslogs-stream-prefix": "ecs"
            },
            "secretOptions": []
          },
          "systemControls": []
        }
      ]
    }
    ```
    </details>

1.  Create SSM Parameter Store for OTel Collector Config. Create a parameter in **AWS Systems Manager (SSM) Parameter Store** and name it `otel-collector-config`. Choose type `String` and data type `text`, and then copy the below configuration in the value field.

    <details>
    <summary>otel-collector-config.yaml</summary>
    ```yaml
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: 0.0.0.0:4317
          http:
            endpoint: 0.0.0.0:4318
      filelog:
        include:
          - /hostfs/var/log/ecs/*.log
        include_file_path: true
      hostmetrics:
        collection_interval: 60s
        scrapers:
          cpu:
          disk:
          load:
          filesystem:
          memory:
          network:
    processors:
      batch: {}
      resourcedetection:
        detectors: [ecs]
        timeout: 2s
    exporters:
      debug:
        verbosity: detailed
        sampling_initial: 5
        sampling_thereafter: 1
      otlphttp/metrics:
        metrics_endpoint: http://<cubeapm_endpoint>:3130/api/metrics/v1/save/otlp
        retry_on_failure:
          enabled: false
      otlphttp/logs:
        logs_endpoint: http://<cubeapm_endpoint>:3130/api/logs/insert/opentelemetry/v1/logs
        headers:
          Cube-Stream-Fields: severity, host.name
      otlp/traces:
        endpoint: <cubeapm_endpoint>:4317
        tls:
          insecure: true
    service:
      pipelines:
        traces:
          exporters:
            # - debug
            - otlp/traces
          processors:
            - batch
            - resourcedetection
          receivers:
            - otlp
        metrics:
          exporters:
            # - debug
            - otlphttp/metrics
          processors:
            - batch
            - resourcedetection
          receivers:
            - otlp
            - hostmetrics
        logs:
          exporters:
            # - debug
            - otlphttp/logs
          processors:
            - batch
            - resourcedetection
          receivers:
            - otlp
            - filelog
    ```
    </details>

1.  Attach IAM Permission to ECS Task to allow OTel Collector to fetch the configuration from SSM Parameter Store.

    ```json
    [
      {
        "Effect": "Allow",
        "Action": ["ssm:GetParameter", "ssm:GetParameters"],
        "Resource": "arn:aws:ssm:<aws-region>:<aws-account-id>:parameter/otel-collector-config"
      }
    ]
    ```

1.  Update your application's configuration to send logs, metrics and traces to the OTel Collector sidecar. Application can connect to OTel Collector on the localhost IP `172.17.0.1`.

1.  Redeploy the application service with the latest task definition revision for the changes to take effect.

## Troubleshooting

1. Verify that OTel Collector is running.

1. Check OTel Collector logs.

</TabItem>
</Tabs>
