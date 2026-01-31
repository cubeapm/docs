---
slug: /logs/archive/kubernetes
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Kubernetes

1.  Install JuiceFS.

    ```shell
    # Add the JuiceFS repository.
    helm repo add juicefs https://juicedata.github.io/charts/
    # Update the repository.
    helm repo update
    # Install JuiceFS CSI Driver.
    helm install juicefs-csi-driver juicefs/juicefs-csi-driver -n kube-system
    ```

1.  Wait for the respective services and containers to deploy. Use kubectl to check the deployment status of pods

    ```shell
    kubectl get pods -n kube-system -l app.kubernetes.io/name=juicefs-csi-driver
    ```

1.  JuiceFS needs a database for storing metadata. Since CubeAPM already uses a database (MySQL or PostgreSQL), the same can be used for JuiceFS as well.

    <Tabs>
         <TabItem value="MySQL" label="MySQL">
           ```sql
           CREATE DATABASE cubeapm_logs_archive_meta CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

           CREATE USER 'cubeapm_logs_archive_user'@'%' IDENTIFIED BY 'cubeapm_logs_archive_pass';

           GRANT ALL PRIVILEGES ON cubeapm_logs_archive_meta.* TO 'cubeapm_logs_archive_user'@'%';

           FLUSH PRIVILEGES;
           ```
        </TabItem>
        <TabItem value="postgres" label="PostgreSQL">
           ```sql
           CREATE DATABASE cubeapm_logs_archive_meta;

           CREATE USER cubeapm_logs_archive_user WITH PASSWORD 'cubeapm_logs_archive_pass';

           GRANT ALL PRIVILEGES ON DATABASE cubeapm_logs_archive_meta TO cubeapm_logs_archive_user;

           GRANT ALL ON SCHEMA public TO cubeapm_logs_archive_user;

           \c cubeapm_logs_archive_meta

           GRANT ALL ON SCHEMA public TO cubeapm_logs_archive_user;
           ```
        </TabItem>

    </Tabs>

1.  Create object storage bucket for storing archive logs data. Name the bucket as `cubeapm-logs-archive`

1.  Create Kubernetes Secret configuration file as `cubeapm-logs-archive-secret.yaml`. Replace the values with actual values.

    ```yaml
    apiVersion: v1
    kind: Secret
    metadata:
      name: cubeapm-logs-archive-secret
    stringData:
      name: myjfs
      metaurl: redis://:xxx@192.168.8.8/1
      storage: s3
      bucket: https://myjfs.xxx.com
      access-key: <ACCESS_KEY>
      secret-key: <SECRET_KEY>
      # To create the file system in mount pod, add more juicefs format parameters to format-options.
      # format-options: trash-days=1,block-size=4096
    ```

1.  Apply secret to cluster

    ```shell
    kubectl apply -f cubeapm-logs-archive-secret.yaml
    ```

1.  Create Kubernetes StorageClass configuration file as `cubeapm-logs-archive-sc.yaml`. Replace the values with actual values.

    ```yaml
    apiVersion: storage.k8s.io/v1
    kind: StorageClass
    metadata:
      name: cubeapm-logs-archive-sc
    provisioner: csi.juicefs.com
    reclaimPolicy: Retain
    parameters:
      csi.storage.k8s.io/provisioner-secret-name: cubeapm-logs-archive-secret
      csi.storage.k8s.io/provisioner-secret-namespace: default
      csi.storage.k8s.io/node-publish-secret-name: cubeapm-logs-archive-secret
      csi.storage.k8s.io/node-publish-secret-namespace: default
    ```

    :::tip
    Set `reclaimPolicy` according to your specific needs
    :::

1.  Apply storage class to cluster

    ```shell
    kubectl apply -f cubeapm-logs-archive-sc.yaml
    ```

1.  Create Kubernetes PersistentVolumeClaim configuration file as `cubeapm-logs-archive-pvc.yaml`. Replace the values with actual values.

    ```yaml
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: cubeapm-logs-archive-pvc
    spec:
      accessModes:
        - ReadWriteMany
      resources:
        requests:
          storage: 10Gi
      storageClassName: cubeapm-logs-archive-sc
    ```

1.  Apply pvc to cluster

    ```shell
    kubectl apply -f cubeapm-logs-archive-pvc.yaml
    ```
