---
slug: /infra-monitoring/gcp-metric-explorer/gcp-metric-explorer-vm
sidebar_position: 1
---

# Virtual Machine 

This guide provides a comprehensive, step-by-step walkthrough for setting up the **OpenTelemetry (OTel) Collector** on a Virtual Machine to pull metrics from **Google Cloud Monitoring**.

### Prerequisites

- A Virtual Machine (GCE, AWS EC2, or On-prem) running Linux.
- A Google Cloud Project with the Cloud Monitoring API enabled.
- Root/Sudo access on the VM.


### Step 1: Create the GCP Identity (IAM)

The Collector needs an identity with permission to read metrics.

1. **Create Service Account:** Go to IAM & Admin > Service Accounts in GCP.
2. **Name:** `otel-metrics-receiver`.
3. **Assign Role:** `Monitoring Viewer` (`roles/monitoring.viewer`).
4. **Finish:** Do not download a JSON key if you plan to use ***Workload Identity Federation*** (WIF). If you are on a ***GCP VM***, simply attach this Service Account to the VM.

### Step 2: Configure Authentication

Choose the scenario that matches your VM location:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="GCE" label="Scenario A: VM is in Google Cloud (GCE)" default>
:::note
If your workload is running on Google Cloud Platform (GCP), the service account credentials will be used automatically without needing to set the environment variable manually.
:::

1. **Attach Service Account**: Go to the VM instance settings and attach the `otel-metrics-receiver` account. Or else you can also set the service account using ***gcloud auth*** command.

  ```bash
  # If you have downloaded a service account key file (e.g., key.json)
  gcloud auth activate-service-account --key-file=/path/to/key.json

  # Without a Key File (Service Account Impersonation)
  gcloud config set auth/impersonate_service_account [SERVICE_ACCOUNT_EMAIL]
  ```
2. **Set Scopes**: Ensure the VM "Access Scopes" are set to "**Allow full access to all Cloud APIs**".

</TabItem>
<TabItem value="External" label="Scenario B: VM is External (AWS/On-Prem)">

:::note
There's no direct way to authenticate the collector on an external VM. If you are using other cloud providers like ***AWS*** or ***On-premises***, you can achieve this using ***Workload Identity Federation (WIF)*** or by using ***Service Account (SA)*** `credentials.json` file.
:::

#### Using Workload Identity Federation (WIF)

Setting up **Workload Identity Federation (WIF)** involves two parts: creating the **Pool** (the bucket for identities) and the **Provider** (the link to AWS or your OIDC source).

To use **Workload Identity Federation (WIF)** on **AWS**, you need to create a standard **IAM Role** for EC2. This role doesn't need any special AWS permissions to talk to **Google Cloud**; its primary job is to provide a *"secure identity"* that Google can verify.

1. **Create the Pool**

  - In the GCP Console, go to **IAM & Admin > Workload Identity Federation**.
  - Click **+ Create Pool**.
  - **Name**: Give it a name (e.g., `aws-metrics-pool` or `oidc-pool`).
  - **Pool ID**: This will auto-populate (e.g., `aws-metrics-pool`).
  - Click **Continue**.

2. **Add the Provider**

  - **Select a provider**: Choose **AWS** or **OpenID Connect (OIDC)**.
  - **Provider Name**: e.g., `aws-provider` or `github-provider`.
  - **Setup Details**:
    - **AWS**:
      - **AWS Account ID**: Your AWS account ID.
      - **AWS Region**: The region where your EC2 instance is running.
      - **Role ARN**: The ARN of the IAM role you created.
    - **OpenID Connect (OIDC)**:
      - **Issuer URL**: The URL of your OIDC provider (e.g., `https://oidc.github.com`).
      - **Client ID**: The client ID of your OIDC provider.
      - **Client Secret**: The client secret of your OIDC provider.
  - **Attribute Mapping**:
      - **Default**: Usually, `google.subject` = `assertion.arn` (for AWS) or `assertion.su (for OIDC).
      - *Tip: You can add custom mappings like `attribute.aws_role` = `assertion.arn.extract('assumed-role/{role}/')` to be more specific later*.
  - Click **Save**.

3. **Grant Access**

  - Click **Grant Access** on your Pool's details page.
  - Select **Grant access using service account impersonation**.
  - In the **Service Account** field, enter the email address of the service account you created in Step 1 (e.g., `otel-metrics-receiver@your-project.iam.gserviceaccount.com`).
  - In the **Select principals (identities that can access the service account)** field, enter the ARN of the IAM role you created (e.g., `arn:aws:iam::123456789012:role/your-iam-role`).
  - Click **Save** and it will prompt you to download the `config.json` file.

4. **Attach the IAM role to the EC2 instance**.

  - Go to the EC2 instance settings and attach the IAM role to the EC2 instance.
  - (Optional) Restart the EC2 instance to apply the changes.

5. **Set the environment variable**

  - Follow [Step 5](gcp-metric-explorer-vm#step-5-environment-persistence) to set the `GOOGLE_APPLICATION_CREDENTIALS` to the path of the `config.json` file.

#### Using Service Account (SA) Key

1. Download the `credentials.json` file from the GCP Console.
2. Copy the `credentials.json` file to the VM.
3. Set the environment variable `GOOGLE_APPLICATION_CREDENTIALS` to the path of the `credentials.json` file.
</TabItem>
</Tabs>

### Step 3: Install the OTel Collector

You must use the Contrib version of the collector, as the standard version does not include the Google Cloud receiver.

```bash
sudo /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/cubeapm/Otel-contrib-installation/main/otel-contrib-install.sh)" -- --version 0.141.0 --replace-config
```

### Step 4: Configure the Collector

Edit the OTel configuration file: sudo nano /etc/otelcol-contrib/config.yaml

```yaml
receivers:
  googlecloudmonitoring:
    # Required if running outside of GCP
    project_id: "your-gcp-project-id" 
    collection_interval: 60s
    # mentioned GCP metrics in metrics_list
    metrics_list:
      - metric_name: "compute.googleapis.com/instance/cpu/utilization"
      - metric_name: "pubsub.googleapis.com/subscription/num_undelivered_messages"

exporters:
  # Choose your destination (e.g., OTLP, Prometheus, HTTP, or Debug)
  debug:
    verbosity: detailed

service:
  pipelines:
    metrics:
      receivers: [googlecloudmonitoring]
      exporters: [debug]
```

### Step 5: Environment Persistence

To ensure authentication works after a reboot, update the environment configuration.

  1. Open the environment file: `sudo nano /etc/otelcol-contrib/otelcol-contrib.conf`
  2. Add the path to your credentials (if external) or ensure the config path is correct:

  ```bash
  # Only if using WIF or a Service Account Key
  GOOGLE_APPLICATION_CREDENTIALS="/etc/otelcol-contrib/gcp-creds-config.json"
  OTELCOL_OPTIONS="--config=/etc/otelcol-contrib/config.yaml"
  ```

### Step 6: Start and Verify

  1. **Restart the Service**:

    ```bash
    sudo systemctl restart otelcol-contrib
    ```
  
  2. **Check Status**:

    ```bash
    sudo systemctl status otelcol-contrib
    ```
  
  3. **Check Logs**:

    ```bash
    sudo journalctl -u otelcol-contrib -f
    ```

### Troubleshooting Common Errors

  - `PermissionDenied`: Check if your Service Account has the `Monitoring Viewer` role and that the VM Scopes (if on GCE) are set to "Full Access".
  - `Empty metrics`: Ensure the metrics_list names match the official [GCP Metric list](https://docs.cloud.google.com/monitoring/api/metrics_gcp).
  - `File not found`: Ensure the OTel user has read access to your `gcp-creds-config.json`


For more information, refer to the official documentation.
- Google Cloud [Application Default Credentials documentation](https://cloud.google.com/docs/authentication/application-default-credentials)
- OpenTelemetry [Google Cloud receiver documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/googlecloudmonitoringreceiver)


