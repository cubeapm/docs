---
sidebar_position: 2
slug: /install/configure/sign-in-with-google
---

# Sign in with Google

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
   **Authorised redirect URIs**: <cube_apm_address>`/api/auth/self-service/methods/oidc/callback/google`, e.g., https://cubeapm.yourdomain.com/api/auth/self-service/methods/oidc/callback/google
7. Save the configuration and copy the Client ID and Client secret.
8. The above Client ID and Client Secret can be provided to CubeAPM to enable Sign in with Google.
