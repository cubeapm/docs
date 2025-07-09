---
sidebar_position: 3
slug: /configure/single-sign-on/sign-in-with-microsoft
---

# Sign in with Microsoft

To enable Sign in with Microsoft, you need to create an OAuth app in your Microsoft account. The following steps guide you through the process:

1. Go to [Azure Portal](https://portal.azure.com/).

1. Navigate to Azure Active Directory > App registrations > New registration

3. Fill below details:

   - **Name**: CubeAPM
   - **Redirect URIs**: `<cubeapm_address>/api/auth/self-service/methods/oidc/callback/microsoft`, e.g., https://cubeapm.yourdomain.com/api/auth/self-service/methods/oidc/callback/microsoft ( Please choose option as "Web" for setting redirect URL)

1. Save the Application (client) ID and Directory (tenant) ID

1. Configure App Secrets

    Under Certificates & secrets -> Click New client secret -> Save the client secret securely ( this is your client-secret)

1. Expose Permissions

    In API permissions, add: openid, email, profile

1. The above Client ID, Client Secret and Client Tenant can be provided to CubeAPM to enable Sign in with Microsoft (set `auth.oidc.microsoft.client-id`, `auth.oidc.microsoft.client-secret` and `auth.oidc.microsoft.tenant` properties in `/etc/cubeapm/config.properties`, or `configVars.auth.oidc.microsoft.clientId`, `configVars.auth.oidc.microsoft.clientSecret` and `configVars.auth.oidc.microsoft.tenant` in helm chart values file).