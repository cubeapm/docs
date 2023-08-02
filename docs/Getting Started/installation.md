---
id: installation
title: 'Installation'
slug: /installation
---


### **Bare Metal / Virtual Machine**

Run the following command. It downloads and executes the Cube install script.

```sudo /bin/bash -c "$(curl -fsSL https://downloads.cubeapm.com/latest/install.sh)"```

The script performs the following tasks:

1. Detect CPU platform and OS of the host machine and download appropriate Cube binary file.
2. Set up Cube as a service if `systemctl` is found on the host. A configuration file is also created at the path `/etc/cubeapm/config.properties`.

**By default, Cube UI is accessible at http://localhost:3125.**


### **Docker**

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


### **Kubernetes**

Cube can be deployed on Kubernetes using the official Helm charts.

```bash
helm repo add cubeapm https://charts.cubeapm.com
helm repo update
helm install cubeapm cubeapm/cubeapm
```

Please refer to [CubeAPM Helm Chart documentation](https://charts.cubeapm.com/charts/cubeapm/) for details of various configuration parameters available.




# Configure

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

### Essential Configuration

Cube provides reasonable defaults to configuration parameters wherever possible. However, some parameters do not have reasonable default values and therefore their values must be provided at the time of setup for Cube to start up. Following is a list of such parameters:

1. `token`
2. `database.url`
3. `smtp.url`
4. `auth.database.url`
5. `auth.key.session`
6. `auth.key.tokens`

In addition, the following configuration parameters have some default value, but it is quite likely that you may need to override them as per your environment for Cube to work properly.

1. `base-url`
2. `data-dir`
3. `smtp.from`
4. `auth.sys-admins`

### Sign in with Google

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

### Sign in with GitHub

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



### Connect with Slack for alerting

To enable sending alert notifications to Slack, you need to create an app in your Slack workspace. The following steps guide you through the process:

1. Go to [Slack apps page.](https://api.slack.com/apps/)
2. Click on **Create New App** button, and then click on **From scratch** option in the popup.
3. On the next screen, fill `CubeAPM` for App Name, select the desired Slack workspace, and then click on **Create App** button.
4. On the next page, look for **Add features and functionality** section, and click on **Bots** button there.
5. On the next page, click on **Review Scopes to Add** button.
6. On the next page, look for **Bot Token Scopes** sub-section under the **Scopes** section, click on **Add an OAuth Scope** button, and add the following scopes:
    ```
    channels:read
    chat:write
    chat:write.public
    groups:read
    ```
7. Now look for **OAuth Tokens for Your Workspace** section on the same page, and click on **Install to Workspace** button.
8. Click on **Allow** on the next screen. Look for **Bot User OAuth Token** on the subsequent page. The token value starts with `xoxb`. Copy this token value.
9. The above token can be provided to CubeAPM to enable sending alert notifications to Slack.

### Connect with PagerDuty for alerting

To enable sending alert notifications to PagerDuty, you need to create an app in your PagerDuty account. The following steps guide you through the process:

1. Login to your PagerDuty account and go to **Integrations → App Registration**.
2. Click on **Create New App** button.
3. On the next screen, fill `CubeAPM` for App Name, `PagerDuty integration for CubeAPM` for Description, and then click on **Save** button.
4. On the next page, look for **Events Integration** section, and click on **Add** button there.
5. On the next page, look for Simple Install Flow, and input `<cube_apm_address>`/ (e.g. https://cubeapm.yourdomain.com/) for **Redirect URLs**.
6. Upon filling **Redirect URLs** as above, **Integration Setup URL** will appear below it.
7. The value of **Integration Setup URL** will contain a URL parameter named **app_id**. Copy the value of app_id (something like AB12XYZ).
8. Click on **Save** button at the bottom of the page.
9. The above app_id can be provided to CubeAPM to enable sending alert notifications to PagerDuty.


## Telemetry

Cube understands OTLP (Open Telemetry Protocol) natively. It can receive traces over HTTP and gRPC. We recommend using gRPC as it is significantly more bandwidth efficient than HTTP.

Open Telemetry official documentation is available at https://opentelemetry.io/docs/instrumentation/.

While Open Telemetry documentation is technically sufficient, we are soon coming up with our own documentation which is optimized to get specific tasks done quickly. In the meantime, you can contact us for assistance. We will be happy to help!

[Contact Us](mailto:mailto:contact@spyk.ai)



For detailed information about the Cube APM API, refer to the [API Reference](./reference) documentation.
