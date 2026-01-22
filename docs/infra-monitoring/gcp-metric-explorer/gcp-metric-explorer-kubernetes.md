---
slug: /infra-monitoring/gcp-metric-explorer/gcp-metric-explorer-kubernetes
sidebar_position: 2
---

# GCP Metric Explorer - Kubernetes

## Metric Explorer Setup

   :::info
    In GKE, pods do not automatically inherit project IAM permissions.
    Instead, you should use Workload Identity so that:
    Kubernetes Service Account (KSA) → Google Service Account (GSA) → IAM roles
    
    For EKS and self-managed Kubernetes clusters, Workload Identity is not available. 
    Use service account key files stored as Kubernetes secrets instead.
    
    See the sections below for detailed setup instructions for each environment.
   :::

## Granting Permissions to Pods in GKE

When running CubeAPM in Google Kubernetes Engine (GKE), pods need proper permissions to access GCP Monitoring APIs. Since pods do not automatically inherit project IAM permissions, you must use **Workload Identity** to bind Kubernetes Service Accounts to Google Service Accounts.

The Workload Identity flow works as follows:
**Kubernetes Service Account (KSA) → Google Service Account (GSA) → IAM roles**

### Prerequisites

- GKE cluster with Workload Identity enabled
- `gcloud` CLI installed and configured
- `kubectl` configured to access your GKE cluster

### Step-by-Step Setup

#### 1. Create a Google Service Account (GSA)

Create a Google Service Account that will be used by your pods:

```bash
gcloud iam service-accounts create <service-account-name> \
    --project=<gcp-project-id> \
    --display-name="CubeAPM Metrics Service Account"
```

#### 2. Grant Monitoring Viewer Permission

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

#### 3. Create a Kubernetes Service Account (KSA)

Create a Kubernetes Service Account in your cluster:

```bash
kubectl create serviceaccount <kubernetes-service-account-name> -n <namespace>
```

#### 4. Enable Workload Identity Binding

Bind the Kubernetes Service Account to the Google Service Account:

```bash
gcloud iam service-accounts add-iam-policy-binding \
    <service-account-name>@<gcp-project-id>.iam.gserviceaccount.com \
    --role roles/iam.workloadIdentityUser \
    --member "serviceAccount:<gcp-project-id>.svc.id.goog[<namespace>/<kubernetes-service-account-name>]"
```

#### 5. Annotate the Kubernetes Service Account

Add the annotation to link the KSA to the GSA:

```bash
kubectl annotate serviceaccount <kubernetes-service-account-name> \
    -n <namespace> \
    iam.gke.io/gcp-service-account=<service-account-name>@<gcp-project-id>.iam.gserviceaccount.com
```

#### 6. Configure Your Pod to Use the Service Account

In your CubeAPM deployment YAML, specify the service account:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cubeapm
spec:
  template:
    spec:
      serviceAccountName: <kubernetes-service-account-name>
      containers:
      - name: cubeapm
        image: cubeapm/cubeapm:latest
        # ... other container configuration
```

Or In your CubeAPM `values.yaml`, under the service account:

```yaml
serviceAccount:
  # -- Specifies whether a service account should be created
  # -- Set this false if you are using existing service account
  create: false
  # -- Annotations to add to the service account
  annotations: {}
  # -- The name of the service account to use.
  # If not set and create is true, a name is generated using the fullname template
  # Enter the existing kubernetes SA name
  name: "<kubernetes-service-account-name>"
```

#### 7. Verify the Setup

Verify that the pod can access GCP Monitoring:

```bash
# Check if the pod is using the correct service account
kubectl describe pod <pod-name> -n <namespace> | grep "Service Account"

# Test access from within the pod
kubectl exec -it <pod-name> -n <namespace> -- \
    gcloud monitoring time-series list --limit=1
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

1. Create and download a key for the Google Service Account:
   ```bash
   gcloud iam service-accounts keys create cubeapm-key.json \
       --iam-account=<service-account-name>@<gcp-project-id>.iam.gserviceaccount.com
   ```

2. Create a Kubernetes secret:
   ```bash
   kubectl create secret generic gcp-credentials \
       --from-file=key.json=cubeapm-key.json \
       -n <namespace>
   ```

3. Mount the secret in your pod and configure CubeAPM to use it:
   ```yaml
   containers:
   - name: cubeapm
     volumeMounts:
     - name: gcp-credentials
       mountPath: /etc/gcp
       readOnly: true
   volumes:
   - name: gcp-credentials
     secret:
       secretName: gcp-credentials
   ```

4. Set the configuration property:
   ```properties
   metrics.gcp.application-credentials-file=/etc/gcp/key.json
   ```

:::warning
Using service account key files is less secure than Workload Identity. Prefer Workload Identity when possible, as it eliminates the need to manage and rotate key files.
:::

## Granting Permissions to Pods in EKS

When running CubeAPM in Amazon Elastic Kubernetes Service (EKS), pods need to authenticate to GCP Monitoring APIs using service account key files, as EKS doesn't support GCP Workload Identity.

### Prerequisites

- EKS cluster running CubeAPM
- `gcloud` CLI installed and configured
- `kubectl` configured to access your EKS cluster
- GCP project with Monitoring API enabled

### Step-by-Step Setup

#### 1. Create a Google Service Account (GSA)

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

#### 2. Grant Monitoring Viewer Permission

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

#### 3. Create and Download Service Account Key

Create a JSON key file for the service account:

```bash
# Create and download the key
gcloud iam service-accounts keys create cubeapm-key.json \
    --iam-account=${GSA_EMAIL} \
    --project=${PROJECT_ID}
```

#### 4. Create Kubernetes Secret

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

#### 5. Configure Your Pod to Use the Secret

In your CubeAPM deployment YAML, mount the secret:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cubeapm
spec:
  template:
    spec:
      containers:
      - name: cubeapm
        image: cubeapm/cubeapm:latest
        volumeMounts:
        - name: gcp-credentials
          mountPath: /etc/gcp
          readOnly: true
        # ... other container configuration
      volumes:
      - name: gcp-credentials
        secret:
          secretName: gcp-credentials
```

#### 6. Configure CubeAPM

Set the configuration property to use the mounted credentials file:

```properties
metrics.gcp.application-credentials-file=/etc/gcp/key.json
```

#### 7. Verify the Setup

Verify that the pod can access GCP Monitoring:

```bash
# Check if the secret is mounted correctly
kubectl exec -it <pod-name> -n ${K8S_NAMESPACE} -- ls -la /etc/gcp/

# Test access (if gcloud is available in the pod)
kubectl exec -it <pod-name> -n ${K8S_NAMESPACE} -- \
    gcloud auth activate-service-account --key-file=/etc/gcp/key.json
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
   kubectl exec -it <pod-name> -n ${K8S_NAMESPACE} -- cat /etc/gcp/key.json
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

## Granting Permissions to Pods in Self-Managed Kubernetes

When running CubeAPM in a self-managed Kubernetes cluster (on-premises, bare metal, or other cloud providers), you'll need to use service account key files to authenticate with GCP Monitoring APIs.

### Prerequisites

- Self-managed Kubernetes cluster running CubeAPM
- `gcloud` CLI installed and configured
- `kubectl` configured to access your cluster
- GCP project with Monitoring API enabled
- Network connectivity from your cluster to GCP APIs

### Step-by-Step Setup

#### 1. Create a Google Service Account (GSA)

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

#### 2. Grant Monitoring Viewer Permission

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

#### 3. Create Service Account Key

Generate a JSON key file:

```bash
# Create and download the key
gcloud iam service-accounts keys create cubeapm-key.json \
    --iam-account=${GSA_EMAIL} \
    --project=${PROJECT_ID}
```

#### 4. Create Kubernetes Secret

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

#### 5. Configure Your Pod Deployment

Mount the secret in your CubeAPM deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cubeapm
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: cubeapm
  template:
    metadata:
      labels:
        app: cubeapm
    spec:
      containers:
      - name: cubeapm
        image: cubeapm/cubeapm:latest
        volumeMounts:
        - name: gcp-credentials
          mountPath: /etc/gcp
          readOnly: true
        env:
        - name: METRICS_GCP_APPLICATION_CREDENTIALS_FILE
          value: /etc/gcp/key.json
      volumes:
      - name: gcp-credentials
        secret:
          secretName: gcp-credentials
```

#### 6. Configure CubeAPM

Set the configuration property:

```properties
metrics.gcp.application-credentials-file=/etc/gcp/key.json
```

#### 7. Verify Network Connectivity

Ensure your cluster can reach GCP APIs:

```bash
# Test connectivity from a pod
kubectl run -it --rm debug --image=google/cloud-sdk:slim --restart=Never -- \
    gcloud auth activate-service-account --key-file=/etc/gcp/key.json && \
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
       cat /etc/gcp/key.json | jq .
   ```

4. **Permission errors**: Verify IAM bindings:
   ```bash
   gcloud projects get-iam-policy ${PROJECT_ID} \
       --flatten="bindings[].members" \
       --filter="bindings.members:serviceAccount:${GSA_EMAIL}"
   ```


