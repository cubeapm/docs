---
sidebar_position: 1
slug: /configure/single-sign-on/sign-in-with-amazon-cognito
---

# Sign in with Amazon Cognito

To enable Sign in with Amazon Cognito, you need a user pool and an app client in your Amazon Cognito account. The following steps guide you through the process. If you already have a user pool, skip to step 3 and create a new app client in it (**App clients** → **Create app client**, with application type **Traditional web application**).

1. Go to the [Amazon Cognito console](https://console.aws.amazon.com/cognito/home), select the AWS region you want to use, and click **User pools** → **Create user pool**.

1. On the **Set up resources for your application** page, fill the following:
   - **Application type**: Traditional web application
   - **Name your application**: CubeAPM
   - **Options for sign-in identifiers**: Email (or as per your organization's policy)
   - **Required attributes for sign-up**: email
   - **Return URL**: `<cubeapm_address>/api/auth/self-service/methods/oidc/callback/cognito`

   Click **Create user directory**.

   :::info
   Amazon Cognito accepts only `https://` return URLs. The only exception is `http://localhost`, which can be used for testing.
   :::

1. Go to **App clients**, select the **CubeAPM** app client, open the **Login pages** tab, and click **Edit** under **Managed login pages configuration**. Make sure the following are set, and click **Save changes**:
   - **Allowed callback URLs**: `<cubeapm_address>/api/auth/self-service/methods/oidc/callback/cognito`
   - **Identity providers**: Cognito user pool directory
   - **OAuth 2.0 grant types**: Authorization code grant
   - **OpenID Connect scopes**: **OpenID**, **Email** and **Profile**

   :::warning
   **Profile** is not selected by default. If it is missing, sign-in will fail with an `invalid_scope` error.
   :::

1. On the **App client information** section of the same app client, copy the **Client ID** and **Client secret**.

1. Go to the user pool's **Overview** page and copy the **User pool ID** (e.g., `ap-south-1_AbCdEf123`). The Issuer URL is:

   ```
   https://cognito-idp.<region>.amazonaws.com/<user_pool_id>
   ```

   For example, `https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_AbCdEf123`. Do not add a trailing slash. To verify, open `<issuer_url>/.well-known/openid-configuration` in a browser; the `issuer` field in the response must exactly match your Issuer URL.

1. The above Client ID, Client Secret and Issuer URL can be provided to CubeAPM to enable Sign in with Amazon Cognito (set `auth.oidc.cognito.client-id`, `auth.oidc.cognito.client-secret` and `auth.oidc.cognito.issuer-url` properties in `/etc/cubeapm/config.properties`, or `configVars.auth.oidc.cognito.clientId`, `configVars.auth.oidc.cognito.clientSecret` and `configVars.auth.oidc.cognito.issuerUrl` in helm chart values file).

   For example, in `/etc/cubeapm/config.properties`:

   ```properties
   auth.oidc.cognito.client-id=<client_id>
   auth.oidc.cognito.client-secret=<client_secret>
   auth.oidc.cognito.issuer-url=https://cognito-idp.<region>.amazonaws.com/<user_pool_id>
   ```

   Or, in the helm chart values file:

   ```yaml
   configVars:
     auth:
       oidc:
         cognito:
           clientId: "<client_id>"
           clientSecret: "<client_secret>"
           issuerUrl: "https://cognito-idp.<region>.amazonaws.com/<user_pool_id>"
   ```

   To keep the client secret in a Kubernetes secret instead, leave `configVars.auth.oidc.cognito.clientSecret` empty and set the `CUBE_AUTH_OIDC_COGNITO_CLIENT_SECRET` environment variable in the `extraEnvs` section of the helm chart values file:

   ```yaml
   extraEnvs:
     - name: CUBE_AUTH_OIDC_COGNITO_CLIENT_SECRET
       valueFrom:
         secretKeyRef:
           name: cubeapm-secrets
           key: cognito-client-secret
   ```

   All three values must be provided together. If only some of them are set, CubeAPM will not start.

1. Restart CubeAPM. The login page now shows a **Sign in with Amazon Cognito** button.

The Amazon Cognito app client is now ready for use with CubeAPM.

:::info
New users signing in with Amazon Cognito get the role set in `auth.default-role` (default: `viewer`), which can be changed later from CubeAPM. Cognito groups (`cognito:groups`) are not mapped to CubeAPM roles.

If a CubeAPM account with the same email already exists, CubeAPM asks the user to sign in once with their existing method (e.g., password or Google) to link Amazon Cognito to that account. After that, Sign in with Amazon Cognito works directly.
:::

## Troubleshooting

- **`invalid_scope` error after clicking the button**: The **Profile** scope is not enabled on the app client. See step 3.
- **"Login pages unavailable" on the Cognito page**: The app client has no managed login style. Go to the user pool's **Branding** → **Managed login** → **Create a style**, select the app client, and save.
- **`redirect_mismatch` error on the Cognito page**: The callback URL in the app client does not exactly match `<cubeapm_address>/api/auth/self-service/methods/oidc/callback/cognito`. Check the protocol (`https://`), host, and port.
- **CubeAPM fails to start with an issuer error**: Check that the Issuer URL has no trailing slash and that the region and user pool ID are correct (see step 5).
