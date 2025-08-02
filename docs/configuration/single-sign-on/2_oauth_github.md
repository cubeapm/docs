---
sidebar_position: 2
slug: /configure/single-sign-on/sign-in-with-github
---

# Sign in with GitHub

To enable Sign in with GitHub, you need to create a GitHub app in your GitHub organization. The following steps guide you through the process:

1. Go to Create GitHub app page for your organization (https://github.com/organizations/<code>&lt;org_name&gt;</code>/settings/apps/new).
   Fill in the following:
   - **GitHub App name**: CubeAPM
   - **Homepage URL**: Address at which CubeAPM is accessible in your environment, e.g., https://cubeapm.yourdomain.com/
   - **Callback URL**: `<cube_apm_address>/api/auth/self-service/methods/oidc/callback/github`, e.g., https://cubeapm.yourdomain.com/api/auth/self-service/methods/oidc/callback/github
2. Uncheck **Webhook** → **Active** (CubeAPM does not need WebHook access).
3. Change **Permissions** → **Account permissions** → **Email addresses** from `Access: No access` to `Access: Read-only`.
4. Set **Where can this GitHub App be installed?** to **Only on this account**.
5. Click **Create GitHub App**.
6. Click **Generate a new client secret**. Copy the Client ID and Client secret.
7. The above Client ID and Client Secret can be provided to CubeAPM to enable Sign in with GitHub.
