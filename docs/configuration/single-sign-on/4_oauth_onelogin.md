---
sidebar_position: 4
slug: /configure/single-sign-on/sign-in-with-onelogin
---

# Sign in with OneLogin

To enable Sign in with OneLogin, you need to create an OAuth app in your OneLogin account. The following steps guide you through the process:

1. Go to the OneLogin Admin Console.

2. Navigate to Applications > Add App > Search for "OpenID Connect" and select it.

   ![Application's Page](/img/configure/oauth/single-sign-on/application-page.png)

3. Fill below details

   - **Login URIs**: `<cubeapm_address>/login`

   - **Redirect URIs**: `<cubeapm_address>/api/auth/self-service/methods/oidc/callback/onelogin`

    Save this configuration

4. Save the Client ID, Client Secret and Issuer URL under the SSO tab of Application

5. The above Client ID, Client Secret and Issuer URL can be provided to CubeAPM to enable Sign in with Onelogin (set `auth.oidc.onelogin.client-id`, `auth.oidc.onelogin.client-secret` and `auth.oidc.onelogin.issuer-url` properties in `/etc/cubeapm/config.properties`, or `configVars.auth.oidc.onelogin.clientId`, `configVars.auth.oidc.onelogin.clientSecret` and `configVars.auth.oidc.onelogin.issuerUrl` in helm chart values file).