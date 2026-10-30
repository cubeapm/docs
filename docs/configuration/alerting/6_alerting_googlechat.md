---
sidebar_position: 6
slug: /configure/alerting/connect-with-google-chat
---

# Connect with Google Chat

CubeAPM can send alert notifications to Google Chat in two ways:

- **Webhook URL**: create an incoming webhook in a space. Alerts can mention `@all` only.
- **CubeAPM app** (recommended): set up a Google Chat app for CubeAPM. CubeAPM can then list your Google Chat spaces in a dropdown, post alerts to a space as **CubeAPM**, and @mention people in the space, chosen by name.

## Set up a webhook URL

To send alert notifications to Google Chat without the CubeAPM app, create a Webhook in the Google Chat Space in which you want to receive notifications:

1. Login to your Gmail web interface (the following steps do not work on the app), and click on the **Spaces** icon in the left sidebar.
2. Select the Space in which you want to receive notifications. Then click on the space name at the top of the page. This will open a menu. Click on **Apps and integrations** in the menu.
3. On the popup that appears, click on **Manage webhooks** button at the bottom. Then click on **Add another** button at the bottom.
4. On the next screen, fill `CubeAPM` for Name, and then click on **Save** button.
5. On the next screen, look for the `CubeAPM` entry we just added, and click on **Copy** icon next to it.
6. When creating a receiver, select **Webhook URL** for **Send via** (if shown), and paste the above url.

If the CubeAPM app is also added to the webhook's space, the **Mention** dropdown lists the people in that space too.

## Set up the CubeAPM app

### Prerequisites

- A Google Workspace account. Personal `@gmail.com` accounts can't create Chat apps.
- Access to the [Google Cloud Console](https://console.cloud.google.com/) with permission to create projects, enable APIs, and create service accounts.
- Your Workspace admin allows Chat apps built by your organization (Admin console → **Apps** → **Google Workspace** → **Google Chat** → **Chat apps**).

:::tip
If you already collect GCP metrics with CubeAPM, you can reuse that Google Cloud project and service account. Do step 1 in that project.
:::

The steps below must be done in order: the Apps Script needs the Cloud project number, and the Chat app configuration needs the script's deployment ID.

### Step 1: Create a Google Cloud project and enable the Chat API

1. Open the [Google Cloud Console](https://console.cloud.google.com/), click on the project picker, and then click on **New project**. Fill a name, e.g. `CubeAPM`, and click on **Create** button. To reuse the service account you use for GCP metrics, select that service account's project instead (its `project_id` is in the key file).

1. Go to **APIs & Services** → **Library**, search for **Google Chat API**, and click on **Enable** button.

1. Go to **APIs & Services** → **OAuth consent screen**. If it isn't configured yet, set **User type** to **Internal**, fill `CubeAPM` for app name, enter a support email, and click on **Save** button. Apps Script needs this to link to the project.

1. On the project **Dashboard**, note the **Project number**. It is needed in the next step.

### Step 2: Create the Apps Script

Google only lets people add a Chat app to spaces if the app has an endpoint that receives events. This small script is that endpoint. It replies when someone adds the app to a space; CubeAPM doesn't use it to send alerts or to list members.

1. Open [Apps Script](https://script.google.com/), click on **New project**, and rename it to `CubeAPM`. Create it with a shared or admin-owned account, as the script belongs to the account that created it.

1. Replace the contents of `Code.gs` with:

   ```js
   // Minimal Chat app for CubeAPM: it only needs to be addable to spaces.
   // CubeAPM posts alerts and reads space members via the Chat API.

   function reply(text) {
     return {
       hostAppDataAction: {
         chatDataAction: {
           createMessageAction: { message: { text: text } }
         }
       }
     };
   }

   function onAddedToSpace(e) {
     return reply("CubeAPM will post alerts here.");
   }

   function onMessage(e) {
     return reply("CubeAPM only posts alerts; it doesn't reply to messages.");
   }

   function onRemovedFromSpace(e) {
     return {};
   }

   function onAppCommand(e) {
     return {};
   }
   ```

1. Go to **Project Settings** (gear icon), and tick **Show "appsscript.json" manifest file in editor**. Back in the editor, replace the contents of `appsscript.json` with:

   ```json
   {
     "timeZone": "Etc/UTC",
     "runtimeVersion": "V8",
     "exceptionLogging": "STACKDRIVER",
     "addOns": {
       "common": {
         "name": "CubeAPM",
         "logoUrl": "https://media.cubeapm.com/cubeapm_logo_light_256_round.png"
       },
       "chat": {}
     }
   }
   ```

:::info
`timeZone` here is the script's time zone, which Apps Script uses only for date and time functions. We currently don't use any, so the timeZone setting does not matter. Alerts are posted via the Chat API rather than the script, so this setting does not affect alert notifications in any way.
:::

1. Go to **Project Settings** → **Google Cloud Platform (GCP) Project**, click on **Change project**, enter the **project number** from step 1, and click on **Set project** button.

1. Click on **Deploy** → **New deployment**. Click on the gear icon next to **Select type**, and select **Add-on**. Fill `CubeAPM v1` for description, and click on **Deploy** button. Authorize the script if asked.

1. Copy the **Deployment ID**. It can also be found later under **Deploy** → **Manage deployments**.

:::note
To change the script later, go to **Deploy** → **Manage deployments**, click on the edit icon, select **New version** for Version, and click on **Deploy** button. This keeps the same deployment ID, so the Chat app configuration doesn't need to be updated.
:::

### Step 3: Configure the Chat app

In the Google Cloud Console, go to **APIs & Services** → **Google Chat API** → **Configuration**, and fill the following:

| Field                | Value                                                                                                                                  |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| App name             | `CubeAPM`                                                                                                                              |
| Avatar URL           | https://media.cubeapm.com/cubeapm_logo_light_256_round.png                                                                             |
| Description          | `CubeAPM alert notifications`                                                                                                          |
| Interactive features | On                                                                                                                                     |
| Functionality        | Tick **Join spaces and group conversations**                                                                                           |
| Connection settings  | Select **Apps Script**, and paste the **Deployment ID** from step 2                                                                    |
| Triggers             | Keep the defaults: `onAddedToSpace`, `onMessage`, `onRemovedFromSpace`, `onAppCommand`                                                 |
| Visibility           | Select **Make this Chat app available to specific people and groups in your domain**, and add the people or groups who will add it to spaces |
| Logs                 | Tick **Log errors to Logging**                                                                                                         |

<!-- Note: For Visibility, there are two options:
1. We can mention specific people or groups, which we are using now. (E.g. atul@cubeapm.com, tech@cubeapm.com, etc.)
2. The whole domain. For this, we have to publish the app privately to the organization through the Google Workspace Marketplace SDK, which means an extra store listing and admin approval.
-->

Click on **Save** button.

### Step 4: Choose the service account

CubeAPM acts as the Chat app through a service account **in the same project as the Chat app**. Choose one of the following:

- **Create a new service account**: go to **IAM & Admin** → **Service Accounts** in the Chat app's project, and click on **Create service account**. Fill a name, e.g. `cubeapm-google-chat`, click on **Create and continue**, skip the roles, and click on **Done**.
- **Reuse the GCP metrics service account** (recommended if you collect GCP metrics with CubeAPM): one service account serves both features. It must be in the Chat app's project. It keeps its existing Monitoring roles, and nothing else changes.

:::info
For Google Chat, the service account needs no IAM roles and no domain-wide delegation. It uses the `chat.bot` scope, which doesn't need admin approval, and it can only see the spaces the app has been added to.
:::

### Step 5: Configure CubeAPM

CubeAPM can sign in as the service account either with a key file, or without one using [Application Default Credentials](https://cloud.google.com/docs/authentication/application-default-credentials). In both cases, `alertmanager.googlechat.app-enabled` must be set to `true`. Setting `alertmanager.googlechat.credentials-file` on its own does not enable the app.

#### Option 1: Key file

1. Open the service account, go to **Keys** → **Add key** → **Create new key**, select **JSON**, and click on **Create** button. Store the downloaded file securely.

1. Make the file available to CubeAPM, and set the following in `/etc/cubeapm/config.properties` (or `configVars.alertmanager.googlechat.*` in helm chart values file):

   ```properties
   alertmanager.googlechat.app-enabled=true
   alertmanager.googlechat.credentials-file=/etc/cubeapm/gcp-key.json
   ```

   These can also be set with environment variables `CUBE_ALERTMANAGER_GOOGLECHAT_APP_ENABLED` and `CUBE_ALERTMANAGER_GOOGLECHAT_CREDENTIALS_FILE`. On Kubernetes, store the key in a Secret and mount it as a file.

If you reuse the GCP metrics service account, point both settings to the same key file:

```properties
metrics.gcp.application-credentials-file=/etc/cubeapm/gcp-key.json
alertmanager.googlechat.app-enabled=true
alertmanager.googlechat.credentials-file=/etc/cubeapm/gcp-key.json
```

:::note
If key creation is blocked, your organization has the `iam.disableServiceAccountKeyCreation` policy. Use option 2 instead, or ask an org policy admin to allow keys for this project.
:::

#### Option 2: Keyless (Application Default Credentials)

Enable the app and leave `alertmanager.googlechat.credentials-file` empty:

```properties
alertmanager.googlechat.app-enabled=true
```

CubeAPM then looks for credentials in the following order:

1. The file in the `GOOGLE_APPLICATION_CREDENTIALS` environment variable, if set.
1. The gcloud credentials file (`~/.config/gcloud/application_default_credentials.json`).
1. The metadata server, i.e. the service account attached to the GKE pod or GCE VM CubeAPM runs on.

Set up the credentials depending on where CubeAPM runs:

| Where CubeAPM runs                | What to set up                                                                                                                                                                                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| GKE (Workload Identity)           | Link CubeAPM's Kubernetes service account to the service account from step 4: grant the Kubernetes service account `roles/iam.workloadIdentityUser` on the service account, and annotate it with `iam.gke.io/gcp-service-account=<service account email>`. |
| GCE VM                            | Attach the service account from step 4 to the VM.                                                                                                                                                                                                      |
| AWS, Azure or another OIDC provider | Set up [workload identity federation](https://cloud.google.com/iam/docs/workload-identity-federation) to let the external identity impersonate the service account. Then set `alertmanager.googlechat.credentials-file` to the generated configuration file (it contains no secret). |
| A laptop or VM, for testing       | Run `gcloud auth application-default login --impersonate-service-account=<service account email>`. Your user needs `roles/iam.serviceAccountTokenCreator` on the service account, and the **IAM Service Account Credentials API** must be enabled in the project. |

If you reuse the GCP metrics service account keylessly, leave `metrics.gcp.application-credentials-file` empty and set `alertmanager.googlechat.app-enabled=true`. Both features then use the same service account.

Restart CubeAPM after changing the configuration. If the credentials are missing or invalid, CubeAPM fails to start and logs `error in setting up google chat app: ...`.

### Step 6: Add CubeAPM to each alert space

In Google Chat, do the following for every space that should receive alerts:

1. Open the space, click on the space name at the top, and then click on **Apps & integrations** → **Add apps**.
1. Search for **CubeAPM**, and click on **Add** button. The app replies with "CubeAPM will post alerts here."

The space's access settings must include your organization. CubeAPM can only see the spaces it has been added to.

## Troubleshooting

| Problem                                                    | Fix                                                                                                                                                                         |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CubeAPM doesn't appear in **Add apps**                     | Check that your account is listed in the Chat app's **Visibility**, that **Join spaces and group conversations** is ticked, and that your admin allows internal Chat apps. |
| "CubeAPM not responding" when adding the app               | The deployment ID or trigger function names don't match. Check **Executions** in the Apps Script editor.                                                                    |
| Space missing from the dropdown                            | Add CubeAPM to the space (step 6), then click on **Refresh spaces list**. Check that the space's access settings include your organization.                                |
| Space list is empty or shows errors, though the app is in spaces | The service account isn't in the Chat app's project. Compare the key's `project_id`, or the service account's email domain, with the Chat app's project.            |
| `add the Google Chat app to this space to mention people`  | The app isn't added to that space. This is common with webhook receivers.                                                                                                   |
| `google chat app credentials not configured`               | `alertmanager.googlechat.app-enabled=true` isn't set. Setting only `alertmanager.googlechat.credentials-file` isn't enough. Set it, or switch the receiver to **Webhook URL**. |
| `finding google chat credentials` at startup               | The app is enabled but no credentials were found. Attach a service account, set `GOOGLE_APPLICATION_CREDENTIALS`, or set `alertmanager.googlechat.credentials-file`.        |
| `iam.serviceAccounts.getAccessToken` denied                | For impersonation or federation, grant `roles/iam.serviceAccountTokenCreator` (or `roles/iam.workloadIdentityUser` for GKE and federation) on the service account, and enable the **IAM Service Account Credentials API**. IAM changes can take a few minutes to apply. |
| Linking the Apps Script to the project fails               | Configure the OAuth consent screen in the Cloud project (step 1), and use the project **number**, not the project ID.                                                      |
| Links in alert notifications don't open                    | Google Chat converts http links to https, so CubeAPM must be reachable over https.                                                                                          |
