---
sidebar_position: 5
slug: /install/Kubernetes-Installation
---

# Kubernetes

CubeAPM can be deployed on Kubernetes as a ***statefulset*** using the official Helm chart.

## Prerequisites

1. You have to setup database for CubeAPM. Database should be accessible from your kubernetes cluster.

    :::info
    CubeAPM supports the following databases:
    - PostgreSQL
    - MySQL
    - MariaDB

    You have to create two databases for CubeAPM.
    - One for storing CubeAPM metadata. You can name it ***cubeapm***.
    - One for storing CubeAPM authentication part. You can name it ***cubeapm_auth***.
    :::

2. If you are creating database for CubeAPM inside your kubernetes cluster make sure it should be in same ***namespace*** as CubeAPM.

## Installation

To install CubeAPM on your kubernetes cluster follow the steps below.

1. Add the CubeAPM Helm chart repository.

    ```shell
    helm repo add cubeapm https://charts.cubeapm.com
    # Use the following command to update if the repo is already added.
    helm repo update cubeapm
    ```

2. Copy the `values.yaml` file from the Helm chart repository to your local machine.

    ```shell
    helm show values cubeapm/cubeapm > values.yaml
    ```

3. Edit the `values.yaml` file to customize the configuration as per your requirements.

    - Update `configVars.baseUrl` with your CubeAPM URL. With this URL CubeAPM will be accessible.

        ```yaml
        configVars:
            baseUrl: https://cubeapm.yourdomain.com
        ```

    - Update `configVars.database.url` with your ***cubeapm*** database URL. With this URL CubeAPM will be able to connect to your database. This database for storing config data (settings, dashboards, etc.)

        ```yaml
        configVars:
            database:
                # -- [Required] --
                # Example:
                #  mysql://<username>:<password>@tcp(<host>:3306)/<db_name>
                #  postgres://<username>:<password>@<host>:5432/<db_name>?sslmode=disable
                # Note: A-Za-z0-9.-_ characters are safe for use in password. Other characters can cause problems.
                # Alternatively, set CUBE_DATABASE_URL environment variable in extraEnvs section to use k8s secret.
                url: postgres://cubeapm:cubeapm@cubeapm-db:5432/cubeapm?sslmode=disable
        ```


    - Update `configVars.timeZone` with your timezone. With this timezone CubeAPM will be able to show time based on your timezone.

        ```yaml
        configVars:
            # Examples: America/Los_Angeles, Asia/Kolkata, UTC
            timeZone: Asia/Kolkata
        ```

        :::info
            You can get ***token*** & ***session*** key from CubeAPM team.
        :::

    - Update `configVars.token` account token obtained from CubeAPM. This token is used for authentication with CubeAPM.

        ```yaml
        configVars:
            token: <token>
        ```

    - Update `configVars.auth.key.session` with your session key. It is an encryption key for session data. Must be 32 characters long.

        ```yaml
        configVars:
            auth:
                key:
                    # -- [Required] --
                    # Can use hex encoded UUID without dashes.
                    # Alternatively, set CUBE_AUTH_KEY_SESSION environment variable in extraEnvs section to use k8s secret.
                    session: <session>
        ```

    - Update `configVars.auth.database.url` with your ***cubeapm_auth*** database URL. This database is for storing user accounts data

        ```yaml
        configVars:
            auth:
                database:
                    # -- [Required] --
                    # Example:
                    #  mysql://<username>:<password>@tcp(<host>:3306)/<db_name>
                    #  postgres://<username>:<password>@<host>:5432/<db_name>?sslmode=disable
                    # Note: A-Za-z0-9.-_ characters are safe for use in password. Other characters can cause problems.
                    # Alternatively, set CUBE_AUTH_DATABASE_URL environment variable in extraEnvs section to use k8s secret.
                    url: postgres://cubeapm:cubeapm@cubeapm-db:5432/cubeapm_auth?sslmode=disable
        ```

    - Update `configVars.auth.sysAdmins` with your email addresses. These are the email addresses of users who will have sysAdmin role. SysAdmins have full access to CubeAPM. Also you can set default role to be assigned to a new user on signup.

        ```yaml
        configVars:
            auth:
                # -- Comma separated list of email ids of users to be given sysadmin privilege
                sysAdmins: <email>
                # -- Default role to be assigned to a new user on signup.
                # Possible values are none, viewer, editor, admin.
                defaultRole: viewer
        ```


    - Update `persistence.storageClass` to defines storage "templates" that automatically provision PersistentVolumes (PVs) when pods request storage via PersistentVolumeClaims (PVCs).

        (Optional) Also update `persistence.size` to define the size of the storage.

        ```yaml
        persistence:
            # -- Enable data persistence using PVC. If not enabled, data is stored in an emptyDir.
            enabled: true
            # -- Name of an existing PVC to use (only when deploying a single pod)
            existingClaim: ""
            # -- Persistent Volume Storage Class to use.
            # If defined, `storageClassName: <storageClass>`.
            # If set to "-", `storageClassName: ""`, which disables dynamic provisioning
            # If undefined (the default) or set to `null`, no storageClassName spec is
            # set, choosing the default provisioner.
            storageClass: null
            # -- Access Modes for persistent volume
            accessModes:
                - ReadWriteOnce
            # -- Persistent Volume size
            size: 100Gi
        ```

    - ### Expose CubeAPM to Internet
        Kubernetes Ingress configuration exposes the CubeAPM observability platform externally via HTTP/HTTPS routing.

        **Ingress Overview**

        The `ingress` block in a Helm `values.yaml` (likely CubeAPM's chart) creates a Kubernetes Ingress resource to route external traffic to CubeAPM's service. It enables access to APM dashboards, traces, metrics, and logs through a domain name.

        **Field-by-Field Breakdown**

        ```yaml
        ingress:
            enabled: true                    # Creates Ingress resource when true
            className: ""                    # IngressClass (empty = default controller)
            annotations: {}                  # Custom metadata for ingress controller
            hosts:                           # Domain routing rules
                - host: cubeapm.yourdomain.com # Replace with your actual domain
                  paths:
                    - path: /                 # Catch-all route
                      pathType: ImplementationSpecific  # Controller-specific matching
            tls: []    
        ```

        `enabled: true`
            - **Purpose**: Activates Ingress resource creation during helm install/upgrade.
            - **Default**: Usually `false` in Helm charts for security.
            - **Impact**: `true` → Kubernetes creates Ingress; `false` → no external access.


        :::info
            If you are using cloud provider like (AWS, GCP, Azure) you can specify existing `className` & `annotations` to use existing ingress controller. Or else setup new ingress controller like NGINX or Traefik. 
        :::
        
        `className: ""`
            - **Purpose**: Specifies which Ingress controller processes this Ingress.
            - **Empty string**: Uses cluster default IngressClass (e.g., NGINX, Traefik).
            - **Examples**:

            ```text
            className: "nginx"              # NGINX Ingress Controller
            className: "traefik"            # Traefik
            className: "alb"                # AWS ALB
            ```    

        `annotations: {}`
            - **Purpose**: Controller-specific configuration.
            - **Empty**: No special routing/behavior.
            - **Common examples (add to map)**:

            ```text
            annotations:
                nginx.ingress.kubernetes.io/rewrite-target: /
                cert-manager.io/cluster-issuer: "letsencrypt-prod"
                kubernetes.io/ingress.class: "nginx"
            ```

## Optional Configuration

    - (Optional) Update `smtp.from` & `smtp.url` with your email address. With this email address CubeAPM will be able to send emails.

        ```yaml
        configVars:
            smtp:
                # -- Email address of sender. Your SMTP server must be
                # configured to allow sending emails from this address.
                from: cubeapm@yourdomain.com
                # -- URL of SMTP server for sending emails, e.g., reset password email, alert notifications.
                # Example:
                #  smtp://<username>:<password>@<mailserver>:25/?disable_starttls=false
                # Note: username and password must be url-encoded to escape any special characters.
                # Alternatively, set CUBE_SMTP_URL environment variable in extraEnvs section to use k8s secret.
                url: smtp://cubeapm:cubeapm@smtp.yourdomain.com:587
        ```

        :::info
            For rentention you can do same for ***metrics*** and ***traces*** as well.
            - For ***Metrics*** retention update `configVars.metrics.retention`.
            - For ***Traces*** retention update `configVars.traces.retention`.
        :::

    - (Optional) Update `configVars.logs.retention` with your logs retention period. It is the number of days for which logs will be stored.

        ```yaml
        configVars:
            logs:
                # -- Logs retention period. Must be at least 24h.
                # -- Supported value hours (e.g., 24h).
                retention: 24h
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
   ```






