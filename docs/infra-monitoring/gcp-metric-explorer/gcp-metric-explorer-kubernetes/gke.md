---
slug: /infra-monitoring/gcp-metric-explorer/gcp-metric-explorer-kubernetes/gke
sidebar_position: 3
---

# Google Kubernetes Engine (GKE)

When running OpenTelemetry Collector in Google Kubernetes Engine (GKE), pods need proper permissions to access GCP Monitoring APIs. Since pods do not automatically inherit project IAM permissions, you must use **Workload Identity** to bind Kubernetes Service Accounts to Google Service Accounts.

The Workload Identity flow works as follows:
**Kubernetes Service Account (KSA) → Google Service Account (GSA) → IAM roles**

## Granting Permissions to Pods in GKE Cluster

### Prerequisites

- GKE cluster with Workload Identity enabled
- `gcloud` CLI installed and configured
- `kubectl` configured to access your GKE cluster
- Otel-Collector-Contrib to get GCP Metrics (Refer to [Kubernetes OpenTelemetry Collector Deployment](/infra-monitoring/kubernetes))

:::note
    - If you want to get only GCP Metrics, you can use only `otel-collector-deployment.yaml` file.
    - For detailed level monitoring use both `otel-collector-daemonset.yaml` and `otel-collector-deployment.yaml` files.
:::

### Step-by-Step Setup

1. **Create a Google Service Account (GSA)**

    Create a Google Service Account that will be used by your pods:

    ```bash
        gcloud iam service-accounts create <service-account-name> \
        --project=<gcp-project-id> \
        --display-name="CubeAPM Metrics Service Account"
    ```

2. **Grant Monitoring Viewer Permission**

    Attach the `roles/monitoring.viewer` role to the service account:

    ```bash
        gcloud projects add-iam-policy-binding <gcp-project-id> \
        --member="serviceAccount:<service-account-name>@<gcp-project-id>.iam.gserviceaccount.com" \
        --role="roles/monitoring.viewer"
    ```

    If you need to monitor multiple projects, repeat this command for each project:

    ```bash
        gcloud projects add-iam-policy-binding <additional-project-id> \
        --member="serviceAccount:<service-account-name>@<gcp-project-id>.iam.gserviceaccount.com" \
        --role="roles/monitoring.viewer"
    ```

3. **Create a Kubernetes Service Account (KSA)**

    Create a Kubernetes Service Account in your cluster:

    ```bash
        kubectl create serviceaccount <kubernetes-service-account-name> -n <namespace>
    ```

4. **Enable Workload Identity Binding**

    Bind the Kubernetes Service Account to the Google Service Account:

    ```bash
        gcloud iam service-accounts add-iam-policy-binding \
        <service-account-name>@<gcp-project-id>.iam.gserviceaccount.com \
        --role roles/iam.workloadIdentityUser \
        --member "serviceAccount:<gcp-project-id>.svc.id.goog[<namespace>/<kubernetes-service-account-name>]"
    ```

5. **Annotate the Kubernetes Service Account**

    Add the annotation to link the KSA to the GSA:

    ```bash
        kubectl annotate serviceaccount <kubernetes-service-account-name> \
        -n <namespace> \
        iam.gke.io/gcp-service-account=<service-account-name>@<gcp-project-id>.iam.gserviceaccount.com
    ```

:::note
    If you are using Google Kubernetes Engine you don't need to pass the service account key or set the ENV variables. The Workload Identity will automatically handle the authentication.
:::

6. **Configure otel-collector-deployment.yaml**

    - In your `otel-collector-deployment.yaml`, specify the service account:

        ```yaml
        serviceAccount:
            # Specifies whether a service account should be created
            create: false # <--- Set this to false if you are using existing service account
            # Annotations to add to the service account
            annotations: {}
            # The name of the service account to use.
            # If not set and create is true, a name is generated using the fullname template
            name: "<kubernetes-service-account-name>" 
            # Automatically mount a ServiceAccount's API credentials?
            automountServiceAccountToken: true
            # ... other container configuration
        ```
    
    - Configure `otel-collector-deployment.yaml` to fetch ***gcp-metrics*** from the GCP Monitoring API.


        ```yaml
        config:
            receivers:
                googlecloudmonitoring:
                    project_id: "<gcp-project-id>" # Optional: ADC will auto-detect this from the VM
                    collection_interval: 60s
                    metrics_list:
                        # Reference: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/googlecloudmonitoringreceiver
                        # You can add multiple GCP Metrics using (-metric_name)
                        - metric_name: "compute.googleapis.com/instance/cpu/utilization"

            service:
                pipelines:
                    metrics:
                        receivers:
                            # add the googlecloudmonitoring receiver here.
                            - googlecloudmonitoring
        ```


7. **Verify the Setup**

    Verify that the pod can access GCP Monitoring:

    ```bash
    # Check if the pod is using the correct service account
    kubectl describe pod <pod-name> -n <namespace> | grep "Service Account"

    # Test access from within the pod
    kubectl exec -it <pod-name> -n <namespace> -- gcloud monitoring time-series list --limit=1
    ```

### Troubleshooting

If pods still cannot access GCP Monitoring APIs:

1. **Verify Workload Identity is enabled** on your GKE cluster:
   ```bash
   gcloud container clusters describe <cluster-name> \
       --location=<cluster-location> \
       --format="value(workloadIdentityConfig.workloadPool)"
   ```

2. **Check IAM bindings**:
   ```bash
   gcloud iam service-accounts get-iam-policy \
       <service-account-name>@<gcp-project-id>.iam.gserviceaccount.com
   ```

3. **Verify service account annotation**:
   ```bash
   kubectl get serviceaccount <kubernetes-service-account-name> -n <namespace> -o yaml
   ```

4. **Check pod logs** for authentication errors:
   ```bash
   kubectl logs <pod-name> -n <namespace>
   ```

### Alternative: Using Service Account Key File

:::warning
Using service account key files is less secure than Workload Identity. Prefer Workload Identity when possible, as it eliminates the need to manage and rotate key files.
:::

If Workload Identity is not available or you prefer using a service account key file:

1. **Create and download a key for the Google Service Account:**
   ```bash
   gcloud iam service-accounts keys create cubeapm-key.json \
       --iam-account=<service-account-name>@<gcp-project-id>.iam.gserviceaccount.com
   ```

2. **Create a Kubernetes secret:**
   ```bash
   kubectl create secret generic gcp-credentials \
       --from-file=key.json=cubeapm-key.json \
       -n <namespace>
   ```

3. **Configure otel-collector-deployment.yaml**

    - Mount the secret in your `otel-collector-deployment.yaml` file

        ```yaml
        mode: deployment

        # 1. Mount the secret into the pod
        extraVolumes:
            - name: gcp-secret
              secret:
                secretName: my-gcp-key-secret # The name of your K8s secret

        extraVolumeMounts:
            - name: gcp-secret
              mountPath: /var/secrets/google
              readOnly: true
        ```

    - Configure `otel-collector-deployment.yaml` to fetch ***gcp-metrics*** from the GCP Monitoring API.


        ```yaml
        config:
            receivers:
                googlecloudmonitoring:
                    project_id: "<gcp-project-id>" # Optional: ADC will auto-detect this from the VM
                    collection_interval: 60s
                    metrics_list:
                        # Reference: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/googlecloudmonitoringreceiver
                        # You can add multiple GCP Metrics using (-metric_name)
                        - metric_name: "compute.googleapis.com/instance/cpu/utilization"

            service:
                pipelines:
                    metrics:
                        receivers:
                            # add the googlecloudmonitoring receiver here.
                            - googlecloudmonitoring
        ```

    - Set the environment variables in your `otel-collector-deployment.yaml` to use the mounted credential file:

        ```yaml
        # 1. Define the Environment Variable
        extraEnvs:
            - name: GOOGLE_APPLICATION_CREDENTIALS
              value: "/var/secrets/google/key.json"
        ```

