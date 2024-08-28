---
sidebar_position: 4
slug: /install/configure-cubeapm/connect-with-slack-for-alerting
---

# Connect with Slack for alerting

To enable sending alert notifications to Slack, you need to create an app in your Slack workspace. The following steps guide you through the process:

1. Go to [Slack apps page.](https://api.slack.com/apps/)
2. Click on **Create New App** button,

   ![Create New App](/img/configure/alerting/slack/create-an-app.png)

   ![Create New App](/img/configure/alerting/slack/create-new-app.png)

   and then click on **From scratch** option in the popup.

   ![From scratch](/img/configure/alerting/slack/from-scratch.png)

3. On the next screen, fill `CubeAPM` for App Name, select the desired Slack workspace, and then click on **Create App** button.

   ![Select Workspace](/img/configure/alerting/slack/select-workspace.png)

4. On the next page, click on **Manage Distribution** tab,

   ![Manage Distribution](/img/configure/alerting/slack/manage-distribution.png)

   and then look for **Enable features and functionality** section, and click on **Bots** button there.

   ![In Enable features and functionality, click on Bots](/img/configure/alerting/slack/bots.png)

5. On the next page, click on **Review Scopes to Add** button.

   ![Review Scopes to Add](/img/configure/alerting/slack/review-scopes.png)

6. On the next page, look for **Bot Token Scopes** sub-section under the **Scopes** section, and then click on **Add an OAuth Scope** button,

   ![Add an OAuth Scope](/img/configure/alerting/slack/add-scopes.png)

   and then add the following scopes:
   ```
   channels:read
   chat:write
   chat:write.public
   groups:read
   ```
   ![Added Scopes](/img/configure/alerting/slack/scopes.png)

7. Now look for **OAuth Tokens for Your Workspace** section on the same page, and click on **Install to Workspace** button.

   ![Install to MyWorkspace](/img/configure/alerting/slack/install-workspace.png)

8. Click on **Allow** on the next screen,

   ![Click on Allow](/img/configure/alerting/slack/allow.png)
    
    and then look for **Bot User OAuth Token** on the subsequent page. The token value starts with `xoxb`. Copy this token value.

   ![Copy Bot User OAuth Token](/img/configure/alerting/slack/oauth-token.png)


9. The above token can be provided to CubeAPM to enable sending alert notifications to Slack.

<!-- Update Slack integration guide - Point "9." pending for detailed description. Final instructions need to be completed. -->