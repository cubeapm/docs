---
slug: /infra-monitoring/gcp-metric-explorer/gcp-metric-explorer-kubernetes/self-managed-k8s
sidebar_position: 5
---

# Self Managed K8s

When running OpenTelemetry Collector in a self-managed Kubernetes cluster (on-premises, bare metal, or other cloud providers), you'll need to use service account key files to authenticate with GCP Monitoring APIs.

## Granting Permissions to Pods in Self-Managed Kubernetes Cluster

### Prerequisites

- Self-managed Kubernetes cluster running CubeAPM
- `gcloud` CLI installed and configured
- `kubectl` configured to access your cluster
- GCP project with Monitoring API enabled
- Network connectivity from your cluster to GCP APIs
- Otel-Collector-Contrib to get GCP Metrics (Refer to [Kubernetes OpenTelemetry Collector Deployment](/infra-monitoring/kubernetes))

:::note
    - If you want to get only GCP Metrics, you can use only `otel-collector-deployment.yaml` file.
    - For detailed level monitoring use both `otel-collector-daemonset.yaml` and `otel-collector-deployment.yaml` files.
:::

### Step-by-Step Setup

1. **Create a Google Service Account (GSA)**

    Create a Google Service Account:

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

    Attach the `roles/monitoring.viewer` role:

    ```bash
    # Grant Monitoring Viewer role
    gcloud projects add-iam-policy-binding ${PROJECT_ID} \
    --member="serviceAccount:${GSA_EMAIL}" \
    --role="roles/monitoring.viewer"
    ```

    For multiple projects:

    ```bash
    export ADDITIONAL_PROJECT_ID="another-project-id"
    gcloud projects add-iam-policy-binding ${ADDITIONAL_PROJECT_ID} \
        --member="serviceAccount:${GSA_EMAIL}" \
        --role="roles/monitoring.viewer"
    ```

3. **Create Service Account Key**

    Generate a JSON key file:

    ```bash
    # Create and download the key
    gcloud iam service-accounts keys create cubeapm-key.json \
        --iam-account=${GSA_EMAIL} \
        --project=${PROJECT_ID}
    ```

4. **Create Kubernetes Secret**

    Store the credentials as a Kubernetes secret:

    ```bash
    # Set variables
    export K8S_NAMESPACE="default"  # or your namespace
    export SECRET_NAME="gcp-credentials"

    # Create the secret
    kubectl create secret generic ${SECRET_NAME} \
        --from-file=key.json=cubeapm-key.json \
        -n ${K8S_NAMESPACE}

    # Clean up the local key file
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
    
7. **Verify Network Connectivity**

    Ensure your cluster can reach GCP APIs:

    ```bash
    # Test connectivity from a pod
    kubectl run -it --rm debug --image=google/cloud-sdk:slim --restart=Never -- \
        gcloud auth activate-service-account --key-file=/var/secrets/google/key.json && \
    gcloud monitoring time-series list --limit=1
    ```

### Network Configuration

For self-managed clusters, ensure:

1. **Firewall rules** allow outbound HTTPS (443) to GCP APIs:
   - `monitoring.googleapis.com`
   - `cloudresourcemanager.googleapis.com`
   - `iam.googleapis.com`

2. **Proxy configuration** (if applicable)

3. **DNS resolution** works correctly for GCP domains

### Security Considerations

1. **Key rotation**: Implement a process to rotate keys every 90 days
2. **Secret management**: Consider using external secret management systems:
   - HashiCorp Vault
   - AWS Secrets Manager (if applicable)
   - Azure Key Vault (if applicable)
   - Sealed Secrets
3. **RBAC**: Restrict access to the secret using Kubernetes RBAC
4. **Network policies**: Use NetworkPolicies to restrict pod-to-pod communication
5. **Audit logging**: Enable Kubernetes audit logs to track secret access

### Troubleshooting

Common issues and solutions:

1. **Network connectivity issues**:
   ```bash
   # Test from within a pod
   kubectl run -it --rm test-connectivity --image=busybox --restart=Never -- \
       wget -O- https://monitoring.googleapis.com
   ```

2. **DNS resolution problems**:
   ```bash
   # Check DNS from within a pod
   kubectl run -it --rm test-dns --image=busybox --restart=Never -- \
       nslookup monitoring.googleapis.com
   ```

3. **Authentication failures**: Check pod logs and verify the key file format:
   ```bash
   kubectl logs <pod-name> -n ${K8S_NAMESPACE}
   kubectl exec -it <pod-name> -n ${K8S_NAMESPACE} -- \
       cat /etc/gcp/key.json | jq .
   ```

4. **Permission errors**: Verify IAM bindings:
   ```bash
   gcloud projects get-iam-policy ${PROJECT_ID} \
       --flatten="bindings[].members" \
       --filter="bindings.members:serviceAccount:${GSA_EMAIL}"
   ```
