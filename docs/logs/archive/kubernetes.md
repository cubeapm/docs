---
id: archive-kubernetes
title: "kubernetes"
slug: /logs/archive/kubernetes
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Kubernetes

1. Install juiceFs.
   ```shell
      # Add the JuiceFS repository.
      helm repo add juicefs https://juicedata.github.io/charts/
      # Update the repository.
      helm repo update
      # Install JuiceFS CSI Driver.
      helm install juicefs-csi-driver juicefs/juicefs-csi-driver -n kube-system

   ```
2. After you execute the commands, wait for the respective services and containers to deploy properly. Use kubectl to check the deployment status of pods
   ```shell
      kubectl get pods -n kube-system -l app.kubernetes.io/name=juicefs-csi-driver
   ```

3. Setup persistance storage for metadata for Juicefs. You can use existing cubeapm database for the same

   <Tabs>
      <TabItem value="postgres" label="PostgresSQL">
         ```shell
         CREATE DATABASE cubeapm_logs_archive_meta;
         CREATE USER cubeapm_logs_archive_user WITH PASSWORD 'cubeapm_logs_archive_pass';
         GRANT ALL PRIVILEGES ON DATABASE cubeapm_logs_archive_meta TO cubeapm_logs_archive_user;
         GRANT ALL ON SCHEMA public TO cubeapm_logs_archive_user;
         \c cubeapm_logs_archive_meta
         GRANT ALL ON SCHEMA public TO cubeapm_logs_archive_user;
         ```
      </TabItem>
      <TabItem value="env" label="MySQL">
         ```shell
         -- Create database
         CREATE DATABASE cubeapm_logs_archive_meta CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

         -- Create user
         CREATE USER 'cubeapm_logs_archive_user'@'%' IDENTIFIED BY 'cubeapm_logs_archive_pass';

         -- Grant full privileges on the database
         GRANT ALL PRIVILEGES ON cubeapm_logs_archive_meta.* TO 'cubeapm_logs_archive_user'@'%';

         -- Apply changes
         FLUSH PRIVILEGES;

         ```
      </TabItem>
   </Tabs>

4. Create S3 bucket for storing archive logs data. Name bucket as `cubeapm-logs-archive`

5. Create Kubernetes Secret configuration file as `cubeapm-logs-archive-secret.yaml`. Replace the values with your actual values
   ```shell
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
         # Set the mount pod timezone. The default value is UTC.
         # envs: "{TZ: Asia/Shanghai}"
         # To create the file system in mount pod, you can add more juicefs format parameters to format-options.
         # format-options: trash-days=1,block-size=4096
   ```

6. Apply secret to cluster
   ```shell
      kubectl apply -f cubeapm-logs-archive-secret.yaml
   ```

7. Create Kubernetes Secret configuration file as `cubeapm-logs-archive-sc.yaml`. Replace the values with your actual values
   ```shell
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

   :::info
      You must set `reclaimPolicy` according to your specific needs:
   :::

8. Apply storage class to cluster
   ```shell
      kubectl apply -f cubeapm-logs-archive-sc.yaml
   ```

9. Create Kubernetes Secret configuration file as `cubeapm-logs-archive-pvc.yaml`. Replace the values with your actual values
   ```shell
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

10. Apply pvc to cluster
   ```shell
      kubectl apply -f cubeapm-logs-archive-pvc.yaml
   ```