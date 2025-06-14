---
sidebar_position: 2
slug: /configure/sign-in-with-google
---

# Sign in with Google

To enable Sign in with Google, you need to create an OAuth app in your Google Workspace account. The following steps guide you through the process:

1. Go to [Google Cloud Console](https://console.cloud.google.com/) → [APIs & Services](https://console.cloud.google.com/apis/).

1. Using the project dropdown menu, create a new project with the name **CubeAPM**.

   ![Create New Project](/img/configure/oauth/google/create-project.png)

1. Go to [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent), and fill the following:

   - **App name**: CubeAPM
   - **User support email**: Your email address
   - **Audience**: Internal
   - **Contact email**: Your email address

   ![OAuth Consent Screen](/img/configure/oauth/google/oauth-consent.png)

1. Go to Data Access, click on **Add or Remove Scopes**, and add the following scopes:

   ```
   .../auth/userinfo.email
   .../auth/userinfo.profile
   ```

   ![Scopes](/img/configure/oauth/google/scopes.png)

   :::warning
   Make sure you click **Update** on the scope selection screen, and then **Save** on the Data Access page, otherwise the scopes will not be saved. Refresh the Data Access page once and then see if the selected scopes are appearing under **Your non-sensitive scopes** to ensure that the scopes are saved.
   :::

   ![Scopes Added](/img/configure/oauth/google/scopes-saved.png)

1. Go to [Credentials](https://console.cloud.google.com/apis/credentials), and click on **Create Credentials** → **OAuth client ID**. Fill the following:

   - **Application type**: Web application
   - **Name**: CubeAPM
   - **Authorised redirect URIs**: `<cube_apm_address>/api/auth/self-service/methods/oidc/callback/google`, e.g.,

   ![OAuth Client ID](/img/configure/oauth/google/oauth-client-id.png)

1. Save the configuration and copy the Client ID and Client secret.

1. The above Client ID and Client Secret can be provided to CubeAPM to enable Sign in with Google (set `auth.oidc.google.client-id` and `auth.oidc.google.client-secret` properties in `/etc/cubeapm/config.properties`, or `configVars.auth.oidc.google.clientId` and `configVars.auth.oidc.google.clientSecret` in helm chart values file).
