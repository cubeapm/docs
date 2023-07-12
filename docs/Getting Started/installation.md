---
id: installation
title: 'Installation'
slug: /installation
---


## **Bare Metal / Virtual Machine**

Run the following command. It downloads and executes the Cube install script.

```sudo /bin/bash -c "$(curl -fsSL https://downloads.cubeapm.com/latest/install.sh)"```

The script performs the following tasks:

1. Detect CPU platform and OS of the host machine and download appropriate Cube binary file.
2. Set up Cube as a service if `systemctl` is found on the host. A configuration file is also created at the path `/etc/cubeapm/config.properties`.

**By default, Cube UI is accessible at http://localhost:3125.**


## **Docker**

Cube is also available as a Docker image. Run the following command to start Cube in a Docker container.

```bash
docker run -d --name cubeapm \
-p 3125:3125 -p 4317:4317 -p 4318:4318 \
-v cube_data:/root/data \
-v ./config.properties:/etc/cubeapm/config.properties \
cubeapm/cubeapm:v1.1.0 \
--config-file /etc/cubeapm/config.properties
```
The above command assumes you have a file `config.properties` in your current working directory. See configuration section below for details on configuration.


## **Kubernetes**

Cube can be deployed on Kubernetes using the official Helm charts.

```bash
helm repo add cubeapm https://charts.cubeapm.com
helm repo update
helm install cubeapm cubeapm/cubeapm
```

Please refer to [CubeAPM Helm Chart documentation](https://link-to-helm-chart-docs) for details of various configuration parameters available.




## Configure

Run `cube --help` to see a list of available configuration parameters, along with description and examples. Cube can be configured through command line arguments, configuration file, or environment variables. In case of environment variables, please prefix (`CUBE_`) and replace dots (`.`) and dashes (-) with underscores (`_`) in variable names. For example:

```
# command line parameter
--metrics.update-interval 30s

# configuration file
metrics.update-interval=30s

# environment variable
CUBE_METRICS_UPDATE_INTERVAL=30s
```

If a parameter if specified through multiple means, the following order of preference applies (highest at top):

1. Command line arguments
2. Environment variables
3. Configuration file
4. Default values set in code

**Essential Configuration**

Cube provides reasonable defaults to configuration parameters wherever possible. However, some parameters do not have reasonable default values and therefore their values must be provided at the time of setup for Cube to start up. Following is a list of such parameters:

1. `auth.database.url`
2. `auth.key.session`
3. `auth.key.tokens`
4. `auth.smtp.url`

In addition, the following configuration parameters have some default value, but it is quite likely that you may need to override them as per your environment for Cube to work properly.

1. ` auth.smtp.from`
2. `auth.sys-admins`
3. `base-url`
4. `data-dir`

**Sign in with Google**

To enable Sign in with Google, you need to create an OAuth app in your Google Workspace account. The following steps guide you through the process:

1. Go to [Google Cloud Console](https://console.cloud.google.com/) → [APIs & Services](https://console.cloud.google.com/apis/).
2. Using the project dropdown menu, create a new project with the name CubeAPM.
3. Go to OAuth consent screen, and fill the following:

    **Application type**: Internal

    **Application name**: CubeAPM

    **User support email**: Your email address

    **Application home page**: Address at which CubeAPM is accessible in your environment, e.g., https://cubeapm.yourdomain.com/

    **Authorised domains**: Your primary domain, e.g., yourdomain.com

    **Developer email addresses**: Your email address

4. Go to next screen (Scopes), click on Add or Remove Scopes, and add the following scopes:
```
   .../auth/userinfo.email
   .../auth/userinfo.profile
```
5. Go to next screen, and review the information provided.

6. Go to [Credentials](https://console.cloud.google.com/apis/credentials/consent), and click on **Create Credentials → OAuth client ID**. Fill the following:

**Application type**: Web application

**Name**: CubeAPM

**Authorised redirect URIs**: <cube_apm_address>```/api/auth/self-service/methods/oidc/callback/google```, e.g., https://cubeapm.yourdomain.com/api/auth/self-service/methods/oidc/callback/google

7. Save the configuration and copy the Client ID and Client secret.

8. The above Client ID and Client Secret can be provided to CubeAPM to enable Sign in with Google.

**Sign in with GitHub**

To enable Sign in with GitHub, you need to create a GitHub app in your GitHub organization. The following steps guide you through the process:

1. Go to Create GitHub app page for your organization (https://github.com/organizations/<org_name>/settings/apps/new). Fill in the following:

    **GitHub App name**: CubeAPM

    **Homepage URL**: Address at which CubeAPM is accessible in your environment, e.g., https://cubeapm.yourdomain.com/

    **Callback URL**: <cube_apm_address>/api/auth/self-service/methods/oidc/callback/github, e.g., https://cubeapm.yourdomain.com/api/auth/self-service/methods/oidc/callback/github

2. Uncheck **Webhook → Active** (CubeAPM does not need WebHook access).

3. Change **Permissions → Account permissions → Email addresses** ``from Access: No access`` to ``Access: Read-only``.

4. Set **Where can this GitHub App be installed?** to **Only on this account**.

5. Click **Create GitHub App**.

6. Click **Generate a new client secret**. Copy the Client ID and Client secret.

7. The above Client ID and Client Secret can be provided to CubeAPM to enable Sign in with Google.


For detailed information about the Cube APM API, refer to the [API Reference](api-reference.md) documentation.

## Telemetry

Cube understands OTLP (Open Telemetry Protocol) natively. It can receive traces over HTTP and gRPC. We recommend using gRPC as it is significantly more bandwidth efficient than HTTP.

Open Telemetry official documentation is available at https://opentelemetry.io/docs/instrumentation/.

While Open Telemetry documentation is technically sufficient, we are soon coming up with our own documentation which is optimized to get specific tasks done quickly. In the meantime, you can contact us for assistance. We will be happy to help!