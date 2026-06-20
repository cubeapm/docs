---
sidebar_position: 3
slug: /configure/single-sign-on/sign-in-with-jumpcloud
---

# Sign in with JumpCloud

To enable Sign in with JumpCloud, you need to create an OAuth app in your JumpCloud account. The following steps guide you through the process:

1. Go to the JumpCloud Admin Console.

2. Navigate to Access > SSO Application > Click on Add New Application > Search for "OpenID Connect" and select it > Click Next.

    ![OpenID Connect](/img/configure/oauth/single-sign-on/JumpCloud/jumpcloud-1.png)

3. Configure the required fields (_Display Names_ etc) and click Next.

    ![Configure Application](/img/configure/oauth/single-sign-on/JumpCloud/jumpcloud-2.png)

4. Click on Configure Application.

    ![Configure's Page](/img/configure/oauth/single-sign-on/JumpCloud/jumpcloud-3.png)

5. Fill the below details under SSO:

    - **Login URIs**: `<cubeapm_address>/login`

    - Select **Client Authentication Type** as `Client Secret Basic`

    - **Redirect URIs**: `<cubeapm_address>/api/auth/self-service/methods/oidc/callback/jumpcloud`

    - Check the **Email** and **Profile** in Standard Scopes inside **Attribute Mapping**

    - Click Activate.

    - Copy the **Client ID** and **Client Secret** from Pop-up page.

    ![Configure's Page](/img/configure/oauth/single-sign-on/JumpCloud/jumpcloud-4.png)
    

6. Click on User Groups tab and enable the checkbox for User Group to enable SSO and click on Save.

    ![Configure's Page](/img/configure/oauth/single-sign-on/JumpCloud/jumpcloud-5.png)

7. Click on the User Group -> Select Users tab and make sure checkbox is enabled for the user you want to grant SSO access to in the group and Click on Save Group.

    ![Configure's Page](/img/configure/oauth/single-sign-on/JumpCloud/jumpcloud-6.png)

8. The above Client ID, Client Secret and Issuer URL can be provided to CubeAPM to enable Sign in with JumpCloud (set `auth.oidc.jumpcloud.client-id`, `auth.oidc.jumpcloud.client-secret` and `auth.oidc.jumpcloud.issuer-url` properties in `/etc/cubeapm/config.properties`, or `configVars.auth.oidc.jumpcloud.clientId`, `configVars.auth.oidc.jumpcloud.clientSecret` and `configVars.auth.oidc.jumpcloud.issuerUrl` in helm chart values file).

:::info
For JumpCloud IssuerURL refer: https://jumpcloud.com/support/sso-with-oidc
:::
