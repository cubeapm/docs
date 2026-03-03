---
slug: /logs/archive/kubernetes
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Kubernetes

1.  Install JuiceFs.

    ```shell
    # Add the JuiceFs repository.
    helm repo add juicefs https://juicedata.github.io/charts/
    # Update the repository.
    helm repo update
    # Install JuiceFs CSI Driver.
    # JuiceFs need certain permission on cluster hence needs to be installed in kube-system namespace
    helm install juicefs-csi-driver juicefs/juicefs-csi-driver -n kube-system
    ```

1.  Wait for the respective services and containers to deploy. Use kubectl to check the deployment status of pods

    ```shell
    kubectl get pods -n kube-system -l app.kubernetes.io/name=juicefs-csi-driver
    ```
1.  Create Kubernetes PersistentVolumeClaim configuration file as `cubeapm-logs-archive-cache-pvc.yaml`. Replace the values with actual values.

    ```yaml
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: cubeapm-logs-archive-cache-pvc
      namespace: kube-system
    spec:
      accessModes:
        - ReadWriteOnce
      resources:
        requests:
          storage: 50Gi  # Match this to your desired cache size
      storageClassName: standard
    ```

1.  Apply pvc to cluster

    ```shell
    kubectl apply -f cubeapm-logs-archive-cache-pvc.yaml
    ```

1.  JuiceFs needs a database for storing metadata. Since CubeAPM already uses a database server (MySQL or PostgreSQL), same database server can be used for JuiceFs as well.

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

1. (**Applicable to GCP only**) Create a service account and give the (ObjectAdmin and Storage Admin) permission to access the gcp bucket from pods running inside kubernetes cluster.
      
1. (**Applicable to GCP only**) Generate a (JSON) key of the service account and using that service account key create a kubernetes secret in **kube-system** and namespace where cubeapm is running.

    ```shell
        kubectl create secret generic gc-secret \
      --from-file=application_default_credentials.json=./application_default_credentials.json \
      -n <namespace>  # Match your namespace
    ```

1.  Create Kubernetes Secret configuration file as `cubeapm-logs-archive-secret.yaml`. Replace the values with actual values.

    <Tabs>
        <TabItem value="AWS" label="AWS">
        ```yaml
        apiVersion: v1
        kind: Secret
        metadata:
          name: cubeapm-logs-archive-secret
        stringData:
          name: logsarchive
          #MySQL database_string: mysql://cubeapm_logs_archive_user:cubeapm_logs_archive_pass@tcp(localhost:3306)/cubeapm_logs_archive_meta
          #PostgresSQL database_string: postgres://cubeapm_logs_archive_user:cubeapm_logs_archive_pass@localhost:5432/cubeapm_logs_archive_meta
          metaurl: <database_string>
          storage: s3
          #S3 url example: https://cubeapm-logs-archive.s3.ap-south-1.amazonaws.com
          bucket: <BUCKET_URL>
          access-key: <ACCESS_KEY>
          secret-key: <SECRET_KEY>
          # To create the file system in mount pod, add more juicefs format parameters to format-options.
          # format-options: trash-days=1,block-size=4096
        ```
        </TabItem>
        <TabItem value="GCP" label="GCP">
          ```yaml
          apiVersion: v1
          kind: Secret
          metadata:
            name: cubeapm-logs-archive-secret
          stringData:
            name: logsarchives
            #MySQL database_string: mysql://cubeapm_logs_archive_user:cubeapm_logs_archive_pass@tcp(localhost:3306)/cubeapm_logs_archive_meta
            #PostgresSQL database_string: postgres://cubeapm_logs_archive_user:cubeapm_logs_archive_pass@localhost:5432/cubeapm_logs_archive_meta
            metaurl: <database_string>
            storage: gs
            #GCP url example: gs://cubeapm-logs-archive
            bucket: <BUCKET_URL>
            # GCS auth: Use service account JSON keyfile
            configs: "{gc-secret: /root/.config/gcloud}"
            envs: "{GOOGLE_APPLICATION_CREDENTIALS: /root/.config/gcloud/application_default_credentials.json}"
        ```
        </TabItem>

    </Tabs>

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

1.  Apply storage class to cluster

    ```shell
    kubectl apply -f cubeapm-logs-archive-sc.yaml
    ```

1.  Edit ConfigMap created by JuiceFs to mount PVC created in kube-system namespace above

    ```shell
    kubectl edit cm juicefs-csi-driver-config -n kube-system
    ```

1.  Add following snippet to JuiceFs ConfigMap

     ```yaml
    mountPodPatch:
      - pvcSelector:
          matchLabels:
            cache-on-pvc: "true"
        cacheDirs:
          - type: PVC
            name: cubeapm-logs-archive-cache-pvc
            path: /var/lib/cubeapm/cache/logs_archive  # Where the PVC is mounted inside the Mount Pod
        mountOptions:
          - cache-dir=/var/lib/cubeapm/cache/logs_archive
          - cache-size=51200 # 50GB in MiB
    ```
1. Apply the Label to your CubeAPM PVC mounted for archive. The ConfigMap uses a pvcSelector. For CubeAPM to pick up this specific cache configuration, you must label the PVC that your cubeapm is using:
    ```shell
    kubectl label pvc cubeapm-logs-archive-pvc cache-on-pvc=true
    ```
1. Update your CubeAPM `values.yaml` file. If want to use existing PVC populate `existingClaim` else set it to empty string

```yaml
    archivelogs:
      # -- Enable data persistence using PVC
      enabled: true
      # -- Name of an existing PVC to use
      existingClaim: "cubeapm-logs-archive-pvc"
      # -- Persistent Volume Storage Class to use. One that we created above
      storageClass: cubeapm-logs-archive-sc
      accessModes:
        - ReadWriteMany
      # -- Notional Persistent Volume size..
      size: 10Gi
  ```

1. Restart CubeAPM pods

1. Check for JuiceFs CSI driver mount pod in `kube-system` namespace. It follows specific pattern as `juicefs-<node-name>-<pvc-id>`

 ```shell
    kubectl get pods -kube-system
  ```


