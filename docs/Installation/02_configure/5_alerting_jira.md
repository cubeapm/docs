---
sidebar_position: 5
slug: /install/configure-cubeapm/connect-with-jira-for-alerting
---

# Connect with Jira for alerting

To enable sending alert notifications to Jira, you need to set up API access with basic authentication. The following steps guide you through the process:

1. Log in to your Jira instance with an account that has administrative privileges.

   ![Log in to Jira](/img/configure/alerting/jira/login.png)

2. Navigate to your user profile by clicking on your avatar in the top-right corner, then select **Manage account**.

   ![Navigate to Profile](/img/configure/alerting/jira/profile2.png)

3. In your manage account page, click on **Security** in the top navigation bar.

   ![Security Settings](/img/configure/alerting/jira/security.png)

4. Look for the **API Token** section and click on **Create and manage API tokens**.

   ![API Token Section](/img/configure/alerting/jira/access_token.png)

5. Click on the **Create and manage API tokens** link.

   ![Create API Token](/img/configure/alerting/jira/select_create_token.png)

6. Enter a name for your token (e.g., "CubeAPM") and click **Create**.

   ![Label API Token](/img/configure/alerting/jira/create_token.png)

7. A new API token will be generated. **Copy this token immediately** as you won't be able to see it again.

   ![Copy API Token](/img/configure/alerting/jira/copy_token.png)

8. Note your Jira email address and the base URL of your Jira instance. The base URL typically looks like:

   - For Jira Cloud: `https://your-domain.atlassian.net`

   ![Jira Base URL](/img/configure/alerting/jira/api_url.png)

9. To verify your API token works, you can test it with a curl command:

   ```bash
   curl -D- -u your-email@example.com:your-api-token -X GET "https://your-domain.atlassian.net/rest/api/3/myself"
   ```

   Replace `your-email@example.com` with your Jira email, `your-api-token` with the token you just created, and the URL with your Jira instance URL.

10. You'll need the following information to configure CubeAPM for Jira alerting:

    - Jira base URL (e.g., `https://your-domain.atlassian.net`)
    - Your Jira email address
    - Your API token

11. Configure CubeAPM with these values:

    - Set `alertmanager.jira.api-url` to your Jira base URL
    - Set `alertmanager.jira.username` to your Jira email address
    - Set `alertmanager.jira.api-token` to your API token

    These can be provided in `/etc/cubeapm/config.properties`, or as `configVars.alertmanager.jira.*` in the helm chart values file.
