---
sidebar_position: 4
slug: /configure/alerting/connect-with-slack
---

# Connect with Slack

To enable sending alert notifications to Slack, you need to create an app in your Slack workspace. The following steps guide you through the process:

1. Go to [Slack apps page](https://api.slack.com/apps/) and click on **Create New App** button.

   ![Create New App](/img/configure/alerting/slack/create-an-app.png)

   ![Create New App](/img/configure/alerting/slack/create-new-app.png)

1. Click on **Blank app** option in the popup.

   ![From scratch](/img/configure/alerting/slack/from-scratch.png)

1. On the next screen, fill `CubeAPM` for App Name, select the desired Slack workspace, and then click on **Continue** button.

   ![Select Workspace](/img/configure/alerting/slack/select-workspace.png)

1. On the **What it can do in Slack?** screen, click on **Add Bot Scopes** button.

   ![Add Bot Scopes](/img/configure/alerting/slack/add-bot-scope.png)

1. Search for and add the following scopes under **Bot scopes**:

   ```
   channels:read
   chat:write
   chat:write.public
   groups:read
   users:read
   ```

   Once all the scopes are added, click on **Continue** button.

   ![Added Scopes](/img/configure/alerting/slack/what-it-can-do.png)

1. On the **What it can respond to in Slack?** screen, nothing needs to be added. Click on **Continue** button.

1. On the **Review your app** screen, click on **Create and Install** button.

   ![Review your app](/img/configure/alerting/slack/review-your-app.png)

1. Now look for **OAuth Tokens for Your Workspace** section on the same page, and click on **Install to Workspace** button.

   ![Install to MyWorkspace](/img/configure/alerting/slack/install-workspace.png)

1. Click on **Allow** on the next screen.

   ![Click on Allow](/img/configure/alerting/slack/allow.png)

1. Look for **Bot User OAuth Token** on the subsequent page. The token value starts with `xoxb`. Copy this token value.

   ![Copy Bot User OAuth Token](/img/configure/alerting/slack/oauth-token.png)

1. The above token can be provided to CubeAPM to enable sending alert notifications to Slack (set `alertmanager.oauth.slack.token` property in `/etc/cubeapm/config.properties`, or `configVars.alertmanager.oauth.slack.token` in helm chart values file).


## Update Note

If your CubeAPM Slack app was created before mentions were supported, it may not have the `users:read` scope. The **Mention** field in CubeAPM UI then shows the error *Could not load Slack users: missing_scope*. To fix this:

1. Go to [Slack apps page](https://api.slack.com/apps/), open your CubeAPM app, and go to **OAuth & Permissions**.
1. Under **Bot Token Scopes**, add the `users:read` scope.
1. Click **Reinstall to Workspace** at the top of the page, and then click **Allow**.

The Bot User OAuth Token does not change on reinstall, so CubeAPM's configuration does not need to be updated. Refresh CubeAPM UI to load the users.
