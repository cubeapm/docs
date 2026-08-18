---
sidebar_position: 5
slug: /configure/single-sign-on/sign-in-with-pingidentity
---

# Sign in with PingIdendity

To enable Sign in with PingIdendity, you need to create an Application in your PingIdendity account. The following steps guide you through the process:

1. Go to the PingIdendity Admin Console and select the appropriate environment.

1. Navigate to Applications > Add Application. Fill **CubeAPM** in Application Name, select **OIDC Web App** in Application Type, and click Save.

   ![Create Application](/img/configure/oauth/pingidendity/create-app.png)

1. On the Application Overview page that appears next, **click the switch next to the application name to enable the application**.

   Then, on the same page, copy **Client ID**, **Client Secret**, and **Issuer ID** and provide them to CubeAPM to enable Sign in with PingIdentity (set `auth.oidc.pingidentity.client-id`, `auth.oidc.pingidentity.client-secret` and `auth.oidc.pingidentity.issuer-url` properties in `/etc/cubeapm/config.properties`, or `configVars.auth.oidc.pingidentity.clientId`, `configVars.auth.oidc.pingidentity.clientSecret` and `configVars.auth.oidc.pingidentity.issuerUrl` in helm chart values file).

   ![Application Credentials](/img/configure/oauth/pingidendity/app-credentials.png)

1. Go to **Configuration** tab and click on **Edit** button.

   ![Application Configuration](/img/configure/oauth/pingidendity/app-configuration.png)

   On the Edit screen, fill `<cubeapm_address>/api/auth/self-service/methods/oidc/callback/pingidentity` in **Redirect URIs** and click Save.

   ![Redirect URI](/img/configure/oauth/pingidendity/app-redirect-uri.png)

1. Go to **Resources** tab, click **Edit**, and add **email**, **openid** and **profile** scopes. You may need to scroll down the list to find the scopes.

   ![Redirect URI](/img/configure/oauth/pingidendity/oidc-scopes.png)

1. Go to **Policies** tab, click **Edit**, and select the desired policies.

The PingIdentity application is now ready for use with CubeAPM.
