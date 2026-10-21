---
sidebar_position: 4
slug: /configure/alerting/connect-with-slack
---

# Connect with Slack

To enable sending alert notifications to Slack, you need to create an app in your Slack workspace. The following steps guide you through the process:

1. Go to [Slack apps page](https://api.slack.com/apps/) and click on **Create New App** button.

   ![Create New App](/img/configure/alerting/slack/create-an-app.png)

   ![Create New App](/img/configure/alerting/slack/create-new-app.png)

1. Click on **From scratch** option in the popup.

   ![From scratch](/img/configure/alerting/slack/from-scratch.png)

1. On the next screen, fill `CubeAPM` for App Name, select the desired Slack workspace, and then click on **Create App** button.

   ![Select Workspace](/img/configure/alerting/slack/select-workspace.png)

1. On the next page, click on **Manage Distribution** tab.

   ![Manage Distribution](/img/configure/alerting/slack/manage-distribution.png)

1. Look for **Enable features and functionality** section, and click on **Bots** button there.

   ![In Enable features and functionality, click on Bots](/img/configure/alerting/slack/bots.png)

1. On the next page, click on **Review Scopes to Add** button.

   ![Review Scopes to Add](/img/configure/alerting/slack/review-scopes.png)

1. On the next page, look for **Bot Token Scopes** sub-section under the **Scopes** section, and then click on **Add an OAuth Scope** button.

   ![Add an OAuth Scope](/img/configure/alerting/slack/add-scopes.png)

1. Add the following scopes:

   ```
   channels:read
   chat:write
   chat:write.public
   groups:read
   users:read
   usergroups:read
   ```

   `users:read` and `usergroups:read` are needed to tag people and user groups in alert notifications (see [Mention people in alerts](#mention-people-in-alerts)). The other scopes are needed to send notifications.

   ![Added Scopes](/img/configure/alerting/slack/scopes.png)

1. Now look for **OAuth Tokens for Your Workspace** section on the same page, and click on **Install to Workspace** button.

   ![Install to MyWorkspace](/img/configure/alerting/slack/install-workspace.png)

1. Click on **Allow** on the next screen.

   ![Click on Allow](/img/configure/alerting/slack/allow.png)

1. Look for **Bot User OAuth Token** on the subsequent page. The token value starts with `xoxb`. Copy this token value.

   ![Copy Bot User OAuth Token](/img/configure/alerting/slack/oauth-token.png)

1. The above token can be provided to CubeAPM to enable sending alert notifications to Slack (set `alertmanager.oauth.slack.token` property in `/etc/cubeapm/config.properties`, or `configVars.alertmanager.oauth.slack.token` in helm chart values file).

## Mention people in alerts

A Slack notification channel can tag people, user groups, `@here` or `@channel` in its alert messages, so the right people get notified.

1. When creating or editing a Slack notification channel in CubeAPM, find the **Mention** field below the **Recipient** field.
1. Search by a person's name or Slack username, or by a user group's name or handle, and pick one or more entries. The list has three groups:
   - **Channel**: `@here` (active members of the channel) and `@channel` (all members of the channel)
   - **User groups**: Slack user groups, such as `@oncall`
   - **People**: members of the workspace
1. Save the notification channel.

The mentions appear just below the alert title on every message for the alert: when it fires, when it repeats, and when it resolves.

:::note
- The list of people and groups is cached for up to 2 hours. If someone was added to Slack recently and does not show up, click **Refresh users list** below the field.
- User groups are only available on paid Slack plans. On a free plan, the **User groups** section is not shown, but people, `@here` and `@channel` still work.
:::

### Existing Slack apps

If your CubeAPM Slack app was created before mentions were supported, it does not have the `users:read` and `usergroups:read` scopes. The **Mention** field then shows the error *Could not load Slack users: missing_scope*. To fix this:

1. Go to [Slack apps page](https://api.slack.com/apps/), open your CubeAPM app, and go to **OAuth & Permissions**.
1. Under **Bot Token Scopes**, add the `users:read` and `usergroups:read` scopes.
1. Click **Reinstall to Workspace** at the top of the page, and then click **Allow**.

The Bot User OAuth Token does not change on reinstall, so CubeAPM's configuration does not need to be updated. Click **Refresh users list** in CubeAPM to load the users.
