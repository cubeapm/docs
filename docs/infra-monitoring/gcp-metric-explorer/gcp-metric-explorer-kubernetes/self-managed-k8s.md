---
slug: /infra-monitoring/gcp-metric-explorer/gcp-metric-explorer-kubernetes/self-managed-k8s
sidebar_position: 5
---

# Self Managed K8s

When running CubeAPM in a self-managed Kubernetes cluster (on-premises, bare metal, or other cloud providers), you'll need to use service account key files to authenticate with GCP Monitoring APIs.

## Granting Permissions to Pods in Self-Managed Kubernetes Cluster

### Prerequisites

- Self-managed Kubernetes cluster running CubeAPM
- `gcloud` CLI installed and configured
- `kubectl` configured to access your cluster
- GCP project with Monitoring API enabled
- Network connectivity from your cluster to GCP APIs

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
    :::info
    - Suppose you have multiple projects in your GCP and your CubeAPM is hosted on one of the projects (*example: Project A*) and you want to monitor the services like (**Cloud SQL, Compute Engine etc.**) which are in other projects (*example: Project B*) so you dont need to create a service account in other projects like (*example: Project B*) you have create a google service account in (*example: Project A*) where cubeapm is hosted and grant the permission to that service account to access the services which are in other projects.
    :::

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
        --from-file=cubeapm-gcp-key.json=cubeapm-key.json \
        -n ${K8S_NAMESPACE}

    # Clean up the local key file
    rm cubeapm-key.json
    ```

5. **Configure Your Pod to Use the Secret**

    In your CubeAPM values YAML, mount the secret:

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

6. **Add GCP Metrics Configuration**

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

7. **Verify Network Connectivity**

    Ensure your cluster can reach GCP APIs:

    ```bash
    # Test connectivity from a pod
    kubectl run -it --rm debug --image=google/cloud-sdk:slim --restart=Never -- \
        gcloud auth activate-service-account --key-file=/etc/gcp/cubeapm-gcp-key.json && \
    gcloud monitoring time-series list --limit=1
    ```

### Network Configuration

For self-managed clusters, ensure:

1. **Firewall rules** allow outbound HTTPS (443) to GCP APIs:
   - `monitoring.googleapis.com`
   - `cloudresourcemanager.googleapis.com`
   - `iam.googleapis.com`

2. **Proxy configuration** (if applicable):
   ```yaml
   containers:
   - name: cubeapm
     env:
     - name: HTTPS_PROXY
       value: "http://proxy.example.com:8080"
     - name: HTTP_PROXY
       value: "http://proxy.example.com:8080"
     - name: NO_PROXY
       value: "localhost,127.0.0.1"
   ```

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
       cat /etc/gcp/cubeapm-gcp-key.json | jq .
   ```

4. **Permission errors**: Verify IAM bindings:
   ```bash
   gcloud projects get-iam-policy ${PROJECT_ID} \
       --flatten="bindings[].members" \
       --filter="bindings.members:serviceAccount:${GSA_EMAIL}"
   ```
