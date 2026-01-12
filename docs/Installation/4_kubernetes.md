<!-- ---
sidebar_position: 4
slug: /install/kubernetes
---

# Kubernetes

CubeAPM can be deployed on Kubernetes using the official Helm chart.

1. Add the CubeAPM Helm chart repository.

   ```shell
   helm repo add cubeapm https://charts.cubeapm.com
   # Use the following command to update if the repo is already added.
   helm repo update cubeapm
   ```

1. Copy the `values.yaml` file from the Helm chart repository to your local machine.

   ```shell
   helm show values cubeapm/cubeapm > values.yaml
   ```

1. Edit the `values.yaml` file to customize the configuration as per your requirements. See [Configure CubeAPM](../configuration/configuration.md) section for details of all available configuration parameters.

1. Install CubeAPM using the following command:

   ```shell
   helm install cubeapm cubeapm/cubeapm -f values.yaml
   # Use the following command to update if CubeAPM is already installed.
   helm upgrade cubeapm cubeapm/cubeapm -f values.yaml
   ```

## Increase volume size

:::warning
Depending on the configuration of the associated storage class, particularly its `reclaimPolicy` and `allowVolumeExpansion`, the volumes may get deleted and recreated while resizing. Please try the changes in a non-production environment first to avoid accidental data loss.
:::

CubeAPM creates a StatefulSet. StatefulSets do not allow direct modification of volume size, so the following steps are needed:

1. Edit CubeAPM's PVCs. Do the following for each PVC.
   ```shell
   # Run `kubectl get pvc | grep cube` to get names of CubeAPM PVCs.
   kubectl edit pvc <name>
   # Update `spec.resources.requests.storage` to desired size.
   ```

1. Delete CubeAPM StatefulSet while leaving its pods.
   ```shell
   # Run `kubectl get sts | grep cube` to get names of CubeAPM StatefulSet.
   kubectl delete sts --cascade=orphan <name>
   ```

1. Update `persistence.size` in CubeAPM Helm Chart values.yaml file and redeploy. This will recreate the StatefulSet and then restart the pods one-by-one. Each pod's PVC wll be resized during retart.
   ```shell
   helm upgrade cubeapm cubeapm/cubeapm -f values.yaml
   ``` -->
