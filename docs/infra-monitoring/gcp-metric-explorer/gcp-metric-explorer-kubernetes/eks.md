---
slug: /infra-monitoring/gcp-metric-explorer/gcp-metric-explorer-kubernetes/eks
sidebar_position: 4
---

# Elastic Kubernetes Service (EKS)

When running OpenTelemetry Collector in Amazon Elastic Kubernetes Service (EKS), pods need to authenticate to GCP Monitoring APIs using service account key files, as EKS doesn't support GCP Workload Identity.

## Granting Permissions to Pods in EKS Cluster

### Prerequisites

- EKS cluster running CubeAPM
- `gcloud` CLI installed and configured
- `kubectl` configured to access your EKS cluster
- GCP project with Monitoring API enabled
- Otel-Collector-Contrib to get GCP Metrics (Refer to [Kubernetes OpenTelemetry Collector Deployment](/infra-monitoring/kubernetes))

:::note
    - If you want to get only GCP Metrics, you can use only `otel-collector-deployment.yaml` file.
    - For detailed level monitoring use both `otel-collector-daemonset.yaml` and `otel-collector-deployment.yaml` files.
:::

### Step-by-Step Setup

1. **Create a Google Service Account (GSA)**

    Create a Google Service Account that will be used by your pods:

    ```bash
    # Set variables
    export PROJECT_ID="your-gcp-project-id"
    export GSA_NAME="cubeapm-metrics-sa"
    export GSA_EMAIL="${GSA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

    # Create the service account
    gcloud iam service-accounts create ${GSA_NAME} \
        --project=${PROJECT_ID} \
        --display-name="CubeAPM Metrics Service Account"
    ```

2. **Grant Monitoring Viewer Permission**

    Attach the `roles/monitoring.viewer` role to the service account:

    ```bash
    # Grant Monitoring Viewer role
    gcloud projects add-iam-policy-binding ${PROJECT_ID} \
        --member="serviceAccount:${GSA_EMAIL}" \
        --role="roles/monitoring.viewer"
    ```

    For multiple projects:

    ```bash
    # For additional projects
    export ADDITIONAL_PROJECT_ID="another-project-id"
    gcloud projects add-iam-policy-binding ${ADDITIONAL_PROJECT_ID} \
        --member="serviceAccount:${GSA_EMAIL}" \
        --role="roles/monitoring.viewer"
    ```

3. **Create and Download Service Account Key**

    Create a JSON key file for the service account:

    ```bash
    # Create and download the key
    gcloud iam service-accounts keys create cubeapm-key.json \
        --iam-account=${GSA_EMAIL} \
        --project=${PROJECT_ID}
    ```

4. **Create Kubernetes Secret**

    Create a Kubernetes secret to store the credentials:

    ```bash
    # Set variables
    export K8S_NAMESPACE="default"  # or your namespace
    export SECRET_NAME="gcp-credentials"

    # Create the secret
    kubectl create secret generic ${SECRET_NAME} \
        --from-file=key.json=cubeapm-key.json \
        -n ${K8S_NAMESPACE}

    # Clean up the local key file (for security)
    rm cubeapm-key.json
    ```

5. **Configure otel-collector-deployment.yaml**

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
    

6. **Verify the Setup**

    Verify that the pod can access GCP Monitoring:

    ```bash
    # Check if the secret is mounted correctly
    kubectl exec -it <pod-name> -n ${K8S_NAMESPACE} -- ls -la /var/secrets/google/

    # Test access (if gcloud is available in the pod)
    kubectl exec -it <pod-name> -n ${K8S_NAMESPACE} -- \
        gcloud auth activate-service-account --key-file=/var/secrets/google/key.json 
    ```

### Security Best Practices

1. **Rotate keys regularly**: Set up a process to rotate service account keys periodically
2. **Use least privilege**: Only grant the minimum required permissions
3. **Restrict secret access**: Use RBAC to limit who can access the secret:
   ```bash
   kubectl create rolebinding restrict-gcp-secret \
       --role=secret-reader \
       --serviceaccount=<namespace>:<service-account> \
       -n ${K8S_NAMESPACE}
   ```
4. **Encrypt secrets at rest**: Ensure EKS encryption is enabled for etcd
5. **Monitor secret access**: Enable CloudTrail and audit logs to track secret access

### Troubleshooting

If pods cannot access GCP Monitoring APIs:

1. **Verify secret exists and is accessible**:
   ```bash
   kubectl get secret gcp-credentials -n ${K8S_NAMESPACE}
   kubectl describe secret gcp-credentials -n ${K8S_NAMESPACE}
   ```

2. **Check if the file is mounted correctly**:
   ```bash
   kubectl exec -it <pod-name> -n ${K8S_NAMESPACE} -- cat /var/secrets/google/key.json
   ```

3. **Verify service account permissions**:
   ```bash
   gcloud projects get-iam-policy ${PROJECT_ID} \
       --flatten="bindings[].members" \
       --filter="bindings.members:serviceAccount:${GSA_EMAIL}"
   ```

4. **Check pod logs** for authentication errors:
   ```bash
   kubectl logs <pod-name> -n ${K8S_NAMESPACE}
   ```
