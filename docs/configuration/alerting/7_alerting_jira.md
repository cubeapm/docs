---
sidebar_position: 7
slug: /configure/alerting/connect-with-jira
---

# Connect with Jira

To enable sending alert notifications to Jira, you need to create an API token in Jira. The following steps guide you through the process:

1. Log in to Jira with an account that has administrative privileges. Click on your avatar in the top-right corner, and then click **Manage account**.

   ![Navigate to Profile](/img/configure/alerting/jira/profile.png)

1. In your manage account page, click on **Security** in the top navigation bar.

   ![Security Settings](/img/configure/alerting/jira/security.png)

1. Look for **API tokens** section and click on **Create and manage API tokens**.

   ![API Token Section](/img/configure/alerting/jira/access_token.png)

1. Click on **Create API token** / **Create Classic API token** button.

   ![Create API Token](/img/configure/alerting/jira/select_create_token.png)
   ![Create API Token](/img/configure/alerting/jira/create_classic_token.png)

1. Enter a name for your token (e.g., "CubeAPM") and also the expiry date. Note down the expiry date as we will need it later. Then click **Create**.

   ![Label API Token](/img/configure/alerting/jira/create_token.png)

1. A new API token will be generated. **Note down this token immediately** as you won't be able to see it again.

   ![Copy API Token](/img/configure/alerting/jira/copy_token.png)

1. Configure CubeAPM as below.

   ```shell
   # If you access Jira on https://youraccountid.atlassian.net, the site name is youraccountid
   alertmanager.jira.site-name=<jira_site_name>
   alertmanager.jira.user-email=<email_address_of_jira_account>
   alertmanager.jira.token=<api_token_generated_above>
   # Note that Jira displays expiry date in MM/DD/YYYY format during token creation
   alertmanager.jira.token-expiry-date=<expiry_date_in_YYYY-MM-DD_format>
   ```

   These can be provided in `/etc/cubeapm/config.properties`, or as corresponding `configVars.alertmanager.jira.*` properties in helm chart values file.
