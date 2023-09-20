---
sidebar_position: 4
slug: /install/install-cubeapm/kubernetes
---

# Kubernetes

Cube can be deployed on Kubernetes using the official Helm charts.

```shell
helm repo add cubeapm https://charts.cubeapm.com
helm repo update
helm install cubeapm cubeapm/cubeapm
```

Please refer to [CubeAPM Helm Chart documentation](https://charts.cubeapm.com/charts/cubeapm/) for details of all available configuration parameters.
