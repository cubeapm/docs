---
slug: /configure/single-sign-on/
---

# Sign In using SSO

CubeAPM supports Single Sign-On (SSO), which lets your users sign in to CubeAPM with the account they already use at your identity provider (e.g., Google, Microsoft, Amazon Cognito), instead of a separate CubeAPM password. Sign-in is handled using the OpenID Connect (OIDC) standard.

Each identity provider is enabled by providing its credentials (Client ID, Client Secret, and for some providers an Issuer URL or tenant) to CubeAPM, either in `/etc/cubeapm/config.properties` or in the helm chart values file. Once configured, a **Sign in with &lt;provider&gt;** button appears on the CubeAPM login page. Multiple providers can be enabled at the same time, alongside email and password sign-in.

When registering CubeAPM with an identity provider, use the following redirect (callback) URL, where `<provider>` is the name given in the provider's guide below:

```
<cubeapm_address>/api/auth/self-service/methods/oidc/callback/<provider>
```

:::info

- A user signing in with SSO for the first time gets a CubeAPM account with the role set in `auth.default-role` (default: `viewer`). Admins can change the role later from CubeAPM. Roles and groups from the identity provider are not synced to CubeAPM.
- If a CubeAPM account with the same email already exists, the user is asked to sign in once with their existing method to link the SSO account to it.
- If self-service sign-up is disabled (`auth.selfservice.signup.disable=true`), new users must be added by an admin before they can sign in.

:::

## Supported Providers

Please follow the links below for configuration steps according to your identity provider.

- [Amazon Cognito](7_oauth_cognito.md)
- [GitHub](1_oauth_github.md)
- [Google](2_oauth_google.md)
- [JumpCloud](3_oauth_jumpcloud.md)
- [Microsoft](4_oauth_microsoft.md)
- [OneLogin](5_oauth_onelogin.md)
- [PingIdentity](6_oauth_pingidentity.md)
