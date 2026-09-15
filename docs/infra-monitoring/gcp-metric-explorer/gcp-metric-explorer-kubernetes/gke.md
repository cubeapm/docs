---
slug: /infra-monitoring/gcp-metric-explorer/gcp-metric-explorer-kubernetes/gke
sidebar_position: 3
---

# Google Kubernetes Engine (GKE)

When running CubeAPM in Google Kubernetes Engine (GKE), pods need proper permissions to access GCP Monitoring APIs. Since pods do not automatically inherit project IAM permissions, you must use **Workload Identity** to bind Kubernetes Service Accounts to Google Service Accounts.

The Workload Identity flow works as follows:
**Kubernetes Service Account (KSA) → Google Service Account (GSA) → IAM roles**

## Granting Permissions to Pods in GKE Cluster

### Prerequisites

- GKE cluster with Workload Identity enabled
- `gcloud` CLI installed and configured
- `kubectl` configured to access your GKE cluster

### Step-by-Step Setup

1. **Create a Google Service Account (GSA)**

    Create a Google Service Account that will be used by your pods:

    ```bash
        gcloud iam service-accounts create <service-account-name> \
        --project=<gcp-project-id> \
        --display-name="CubeAPM Metrics Service Account"
    ```
    :::info
    - Suppose you have multiple projects in your GCP and your CubeAPM is hosted on one of the projects (*example: Project A*) and you want to monitor the services like (**Cloud SQL, Compute Engine etc.**) which are in other projects (*example: Project B*) so you dont need to create a service account in other projects like (*example: Project B*) you have create a google service account in (*example: Project A*) where cubeapm is hosted and grant the permission to that service account to access the services which are in other projects.
    :::

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

6. **Configure Your Pod to Use the Service Account**

    In your CubeAPM `values.yaml`, under the service account:

    ```yaml
    serviceAccount:
        # -- Specifies whether a service account should be created
        # -- Set this false if you are using existing service account
        create: false # <-- Set it to false
        # -- Annotations to add to the service account
        annotations: {}
        # -- The name of the service account to use.
        # If not set and create is true, a name is generated using the fullname template
        # Enter the existing kubernetes SA name
        name: "<kubernetes-service-account-name>"
    ```

7. **Add GCP Metrics Configuration**

    Add the GCP metrics configuration to your cubeapm `values.yaml`:

    ```yaml
    gcp:
      # -- Google Cloud Platform metrics list
      configFile: {}
        collection_interval: 60s
        projects:
          - id: my-project-123456
            env: UNSET
            metrics:
                ## paste your GCP Metrics here.
              - cloudsql.googleapis.com/database/cpu/utilization
    ```

8. **Verify the Setup**

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

If Workload Identity is not available or you prefer using a service account key file:

1. **Create and download a key for the Google Service Account:**
   ```bash
   gcloud iam service-accounts keys create cubeapm-key.json \
       --iam-account=<service-account-name>@<gcp-project-id>.iam.gserviceaccount.com
   ```

2. **Create a Kubernetes secret:**
   ```bash
   kubectl create secret generic gcp-credentials \
       --from-file=cubeapm-gcp-key.json=cubeapm-key.json \
       -n <namespace>
   ```

3. **Configure Your Pod to Use the Secret**

    In your CubeAPM `values.yaml`, mount the secret:

    ```yaml
    extraEnvs:
        - name: GOOGLE_APPLICATION_CREDENTIALS
          value: /secrets/gcp/cubeapm-gcp-key.json

    extraVolumes:
        - name: gcp-sa-volume
          secret:
            secretName: gcp-credentials
            

    extraVolumeMounts:
        - name: gcp-sa-volume
          mountPath: /secrets/gcp
          readOnly: true
    ```

4. **Add GCP Metrics Configuration**

    Add the GCP metrics configuration to your cubeapm `values.yaml`:

    ```yaml
    gcp:
      # -- Google Cloud Platform metrics list
      configFile: {}
        collection_interval: 60s
        projects:
          - id: my-project-123456
            env: UNSET
            metrics:
                ## paste your GCP Metrics here.
              - cloudsql.googleapis.com/database/cpu/utilization
    ```

:::warning
Using service account key files is less secure than Workload Identity. Prefer Workload Identity when possible, as it eliminates the need to manage and rotate key files.
:::
