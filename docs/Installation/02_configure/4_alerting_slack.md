---
sidebar_position: 4
slug: /install/configure-cubeapm/connect-with-slack-for-alerting
---

# Connect with Slack for alerting

To enable sending alert notifications to Slack, you need to create an app in your Slack workspace. The following steps guide you through the process:

1. Go to [Slack apps page.](https://api.slack.com/apps/)
2. Click on **Create New App** button, and then click on **From scratch** option in the popup.
3. On the next screen, fill `CubeAPM` for App Name, select the desired Slack workspace, and then click on **Create App** button.
4. On the next page, look for **Add features and functionality** section, and click on **Bots** button there.
5. On the next page, click on **Review Scopes to Add** button.
6. On the next page, look for **Bot Token Scopes** sub-section under the **Scopes** section, click on **Add an OAuth Scope** button, and add the following scopes:
   ```
   channels:read
   chat:write
   chat:write.public
   groups:read
   ```
7. Now look for **OAuth Tokens for Your Workspace** section on the same page, and click on **Install to Workspace** button.
8. Click on **Allow** on the next screen. Look for **Bot User OAuth Token** on the subsequent page. The token value starts with `xoxb`. Copy this token value.
9. The above token can be provided to CubeAPM to enable sending alert notifications to Slack.
