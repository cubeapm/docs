---
sidebar_position: 2
slug: /infra-monitoring/aws-ecs
---

# AWS Elastic Container Service (ECS)

OpenTelemetry Collector is a vendor‑neutral telemetry pipeline that lets you receive, process, and export traces, metrics, and logs from your applications. This guide shows how to set up the Collector on Amazon ECS using both EC2 and Fargate launch types to collect end‑to‑end telemetry: application traces, metrics, and logs from tasks, plus host‑level metrics from the underlying EC2 instances and Fargate infrastructure and send it to CubeAPM. The focus is on practical, copy‑pasteable task definitions and Collector configurations, using sidecar and daemon patterns where appropriate, with clear explanations of what changes between EC2 and Fargate so you can design a consistent observability setup across both.

## Choose the appropriate method based on your ECS service.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="ec2" label="Amazon Elastic Compute Cloud (EC2)" default>

## Amazon Elastic Compute Cloud (EC2)

We need to run another service of *Otel-Collector Contrib* as a ***daemon-service*** to collect data from the services running on EC2 instances.

### Prerequisites

- OpenTelemetry Collector Contrib image (Required)
- An IAM role for the daemon service to collect data from the services running on EC2 instances.

:::info
- Either you can use this image URI `otel/opentelemetry-collector-contrib:0.145.0` or you can download the image and push it to your own ECR and use it from there.

- Configure the Otel-Collector host as bridge mode in task definitions. And use this IP `172.17.0.1` (**Docker bridge gateway IP**) as the endpoint in your application task definitions to send the data to Otel-Collector.
:::


### Step-1 Create an IAM role for the Otel-Collector task definition.

Create an IAM role and name it `<ECSOTELDaemonRole>` and attach the following policies to it.

- `ec2:DescribeInstances`
- `ecs:DescribeContainerInstances`

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "ec2:DescribeInstances",
                "ecs:DescribeContainerInstances"
            ],
            "Resource": "*"
        }
    ]
}
```


### Step-2: Create a Task Definition for Otel-Collector.

Copy and edit the `<aws-region>`, `<ECSOTELDaemonRole>`, `<ecsTaskExecutionRole>` and `<cpu-architecture>` in the below otel-collector configuration and create a task definition for it.

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
                "--config=/etc/otelcol-contrib/config.yaml"
            ],
            "environment": [],
            "mountPoints": [
                {
                    "sourceVolume": "otel-config",
                    "containerPath": "/etc/otelcol-contrib/",
                    "readOnly": true
                },
                {
                    "sourceVolume": "host-root",
                    "containerPath": "/hostfs",
                    "readOnly": true
                }
            ],
            "volumesFrom": [],
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                    "awslogs-group": "/ecs/otel-daemon",
                    "awslogs-region": "<your-aws-region>",
                    "awslogs-stream-prefix": "daemon"
                }
            },
            "systemControls": []
        }
    ],
    "taskRoleArn": "<ECSOTELDaemonRole>",
    "executionRoleArn": "<ecsTaskExecutionRole>",
    "networkMode": "host",
    "volumes": [
        {
            "name": "otel-config",
            "host": {
                "sourcePath": "/etc/ecs/otel-config"
            }
        },
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
        "cpuArchitecture": "<X86_64 or ARM64>",
        "operatingSystemFamily": "LINUX"
    }
}
    ```
</details>

### Step-3 Instrument your Application.

Update your application task definition(*environment variables*) to send the application logs, metrics and traces to the Otel-Collector daemon service.

    ```json
    "environment": [
        {
          "name": "OTEL_EXPORTER_OTLP_PROTOCOL",
          "value": "http/protobuf"
        },
        {
          "name": "OTEL_EXPORTER_OTLP_LOGS_ENDPOINT",
          "value": "http://172.17.0.1:3130"
        },
        {
          "name": "OTEL_TRACES_EXPORTER",
          "value": "otlp"
        },
        {
          "name": "OTEL_LOGS_EXPORTER",
          "value": "otlp"
        },
        {
          "name": "OTEL_EXPORTER_OTLP_METRICS_ENDPOINT",
          "value": "http://172.17.0.1:3130"
        },
        {
          "name": "OTEL_EXPORTER_OTLP_TRACES_ENDPOINT",
          "value": "http://172.17.0.1:4318"
        },
        {
          "name": "OTEL_SERVICE_NAME",
          "value": "<your-service-name>"
        },
        {
          "name": "OTEL_EXPORTER_OTLP_COMPRESSION",
          "value": "gzip"
        },
        {
          "name": "OTEL_METRICS_EXPORTER",
          "value": "otlp"
        },
        {
          "name": "JAVA_TOOL_OPTIONS",
          "value": "-javaagent:./opentelemetry-javaagent.jar"
        }
      ],

    ```


### Step-4 Update your EC2 Launch Template.

Add the following configuration to your EC2 launch template.

<details>
    <summary>launch-template</summary>
    ```bash
    # Create OTEL config directory
    mkdir -p /etc/ecs/otel-config

    # Write config.yaml (replace YOUR_CUBEAPM_TOKEN)
    cat > /etc/ecs/otel-config/config.yaml << 'EOF'
    receivers:
      otlp:
        protocols:
          grpc: { endpoint: 0.0.0.0:4317 }
          http: { endpoint: 0.0.0.0:4318 }
      # filelog/docker:
        # include: 
          # - /hostfs/var/log/ecs/ecs-node-task*.log          # Your app logs
          # - /hostfs/var/log/containers/*cubeapm*.log         # Image logs
          # - /hostfs/var/log/ecs/otel-daemon*.log            # Daemon logs
        start_at: end
      hostmetrics:  # ADD THIS
        collection_interval: 30s
        scrapers: { cpu: {}, memory: {}, disk: {}, network: {} }

    processors:
      batch: {}
      resourcedetection: { detectors: [ecs], timeout: 2s }  # ADD ECS metadata

    exporters:
      debug:  # ← ADD THIS
        verbosity: detailed  # basic/normal/detailed

      otlphttp/metrics:
        metrics_endpoint: "<your-cubeapm-url>:3130/api/metrics/v1/save/otlp"

      otlphttp/logs:
        logs_endpoint: "<your-cubeapm-url>:3130/api/logs/insert/opentelemetry/v1/logs"
        headers:
          Cube-Stream-Fields: severity, host.name

      otlphttp/traces:
        endpoint: "<your-cubeapm-url>:4317"

    service:
      pipelines:
        # traces:  { receivers: [otlp], processors: [resourcedetection,batch], exporters: [debug, otlphttp/traces] }
        # metrics: { receivers: [otlp,hostmetrics], processors: [resourcedetection,batch], exporters: [debug, otlphttp/metrics] }  # ADD METRICS
        # logs:    { receivers: [otlp], processors: [resourcedetection,batch], exporters: [debug, otlphttp/logs] }
    EOF

    # Set permissions for OTEL user
    chown -R 65532:65532 /etc/ecs/otel-config
    ```
</details>


### Step-5 Create a Service.

Create a service using the above task definition and configure it as a daemon service under the `Environment` tab select `Compute configuration - advanced` as a Launch type EC2, and in `Deployment configuration` select `Scheduling strategy` as `daemon`.


### Step-6 Verify the data.

After setting up the Otel-Collector as ***daemon service***, you can verify the application and host data in the CubeAPM dashboard.


### Troubleshooting

- Verify the Otel-Collector is running on the EC2 instances. And the Otel-Collector config.yaml file is placed at `/etc/ecs/otel-config/config.yaml` on the EC2 instances.

- Verify the Otel-Collector is able to collect and send the data from the services in Logs under ECS Cluster `otel-collector-service`.

- Verify IAM roles and permissions are assigned to the Otel-Collector are correct as per the mentioned **Step-1**.

</TabItem>

<TabItem value="fargate" label="Amazon Fargate">

## Amazon ECS Fargate

We need to run another container of Otel-Collector Contrib as a sidecar container to collect data from the services running on Fargate.

### Prerequisites

- OpenTelemetry Collector Contrib image (Required)

:::info
Either you can use this image URI `otel/opentelemetry-collector-contrib:0.145.0` or you can download the image and push it to your own ECR and use it from there.
:::


### Step-1 Update your Application Task Definition.

Copy and edit the `<aws-region>`, `<ECSOTELDaemonRole>`, `<ecsTaskExecutionRole>` and `<cpu-architecture>` in the below otel-collector configuration and update your application task definition for it.

<details>
    <summary>launch-template</summary>
    ```json
    {
            "name": "otel-collector",
            "image": "otel/opentelemetry-collector-contrib:0.145.0",
            "cpu": 0,
            "portMappings": [
                {
                    "name": "otel-collector-4317-tcp",
                    "containerPort": 4317,
                    "hostPort": 4317,
                    "protocol": "tcp"
                },
                {
                    "name": "otel-collector-4318-tcp",
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
                    "awslogs-group": "/ecs/java-api-task",
                    "awslogs-create-group": "true",
                    "awslogs-region": "<aws-region>",
                    "awslogs-stream-prefix": "ecs"
                },
                "secretOptions": []
            },
            "systemControls": []
        }
    ],
    "taskRoleArn": "<ecsTaskExecutionRole>",
    "executionRoleArn": "<ecsTaskExecutionRole>",
    "networkMode": "awsvpc",
    "volumes": [],
    "placementConstraints": [],
    "requiresCompatibilities": [
        "FARGATE"
    ],
    "cpu": "512",
    "memory": "1024",
    "runtimePlatform": {
        "cpuArchitecture": "<cpu-architecture>",
        "operatingSystemFamily": "LINUX"
    },
    "enableFaultInjection": false
    ```
</details>


### Step-2 Create SSM Parameter Store for Otel-Collector Config.

SSM Parameter Store is the recommended way to inject configuration into ECS tasks, especially for **OpenTelemetry Collector on Fargate**.

Create a parameter in **AWS Systems Manager (SSM) Parameter Store** and name it `otel-collector-config` type `String` and data type `text` then copy the below configuration in the value field:

<details>
    <summary>otel-collector-config.yaml</summary>
    ```yaml
    receivers:
      otlp:
        protocols:
          grpc: { endpoint: 0.0.0.0:4317 }
          http: { endpoint: 0.0.0.0:4318 }
        # filelog/docker:
          # include:
            # - /hostfs/var/log/ecs/ecs-node-task*.log
            # - /hostfs/var/log/containers/*cubeapm*.log
            # - /hostfs/var/log/ecs/otel-daemon*.log
        start_at: end
      hostmetrics:
        collection_interval: 30s
        scrapers: { cpu: {}, memory: {}, disk: {}, network: {} }

    processors:
      batch: {}
      resourcedetection: { detectors: [ecs], timeout: 2s }

    exporters:
      debug:
        verbosity: detailed

      otlp_http/metrics:
        metrics_endpoint: "<cubeapm-url>:3130/api/metrics/v1/save/otlp"

      otlp_http/logs:
        logs_endpoint: "<cubeapm-url>:3130/api/logs/insert/opentelemetry/v1/logs"
        headers:
          Cube-Stream-Fields: "severity, host.name"

      otlp_http/traces:
        traces_endpoint: "<cubeapm-url>:4317/v1/traces"

    service:
      pipelines:
        traces:
          receivers: [otlp]
          processors: [resourcedetection, batch]
          # FIXED: Changed otlphttp/metrics to otlp_http/traces
          exporters: [debug, otlp_http/traces] 
    
        metrics:
          receivers: [otlp, hostmetrics]
          processors: [resourcedetection, batch]
          exporters: [debug, otlp_http/metrics]
    
        logs:
          # FIXED: Added filelog/docker so you actually get host logs
          receivers: [otlp, filelog/docker] 
          processors: [resourcedetection, batch]
          exporters: [debug, otlp_http/logs]
    ```
</details>


### Step-3 Attach IAM Permission to ECS Task.

For ECS Fargate, you need to attach the following IAM permissions to the ECS Task Role, So that Otel-Collector can fetch the configuration from SSM Parameter Store:

```json
[
    {
        "Effect": "Allow",
        "Action": [
            "ssm:GetParameter",
            "ssm:GetParameters"
        ],
        "Resource": "arn:aws:ssm:<aws-region>:<aws-account-id>:parameter/otel-collector-config"
    }
]
```


### Step-4 Add environment variables to ECS Task.

Add the following environment variables to the ECS Task Definition(***Otel-Collector Container***):

```json
"secrets": [
        {
          "name": "OTELCOL_CONFIG",
          "valueFrom": "otel-collector-config"
        }
],
```


### Step-5 Instrument your Application.

Update your application task definition(*environment variables*) to send the application logs, metrics and traces to the Otel-Collector sidecar container.

    ```json
    "environment": [
        {
          "name": "OTEL_EXPORTER_OTLP_PROTOCOL",
          "value": "http/protobuf"
        },
        {
          "name": "OTEL_EXPORTER_OTLP_LOGS_ENDPOINT",
          "value": "http://localhost:3130"
        },
        {
          "name": "OTEL_TRACES_EXPORTER",
          "value": "otlp"
        },
        {
          "name": "OTEL_LOGS_EXPORTER",
          "value": "otlp"
        },
        {
          "name": "OTEL_EXPORTER_OTLP_METRICS_ENDPOINT",
          "value": "http://localhost:3130"
        },
        {
          "name": "OTEL_EXPORTER_OTLP_TRACES_ENDPOINT",
          "value": "http://localhost:4318"
        },
        {
          "name": "OTEL_SERVICE_NAME",
          "value": "<your-service-name>"
        },
        {
          "name": "OTEL_EXPORTER_OTLP_COMPRESSION",
          "value": "gzip"
        },
        {
          "name": "OTEL_METRICS_EXPORTER",
          "value": "otlp"
        },
        {
          "name": "JAVA_TOOL_OPTIONS",
          "value": "-javaagent:./opentelemetry-javaagent.jar"
        }
      ],

    ```


### Step-6 Redeploy the application service

After updating the task definition, redeploy the application service with ***latest task definition revision***.


### Step-7 Verify the data.

After setting up the Otel-Collector, Verify the application data in the CubeAPM dashboard.


### Troubleshooting

- Verify the Otel-Collector is running and able to access it's config from SSM Parameter Store.

- Verify the Otel-Collector is able to collect and send the data from the services in Logs under ECS Cluster `application-service`.

- Verify IAM roles and permissions are assigned to the Otel-Collector are correct as per the mentioned **Step-3**.

</TabItem>
</Tabs>



