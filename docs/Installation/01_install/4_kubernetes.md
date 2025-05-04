---
sidebar_position: 4
slug: /install/install-cubeapm/kubernetes
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

1. Edit the `values.yaml` file to customize the configuration as per your requirements. See [Configure CubeAPM](../02_configure/02_configure.md) section for details of all available configuration parameters.

1. Install CubeAPM using the following command:

   ```shell
   helm install cubeapm cubeapm/cubeapm -f values.yaml
   # Use the following command to update if CubeAPM is already installed.
   helm upgrade cubeapm cubeapm/cubeapm -f values.yaml
   ```
