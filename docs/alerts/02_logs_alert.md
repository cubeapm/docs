---
slug: /alerts/logs
title: Logs-Based Alert
sidebar_position: 3
---

# Log-Based Alert

Log-based alerts allow you to trigger notifications when incoming logs match defined query rules. This helps you detect application errors, warnings, and key events in real-time.

## Configure a Log-Based Alert

   ![Alerts Logs](/img/configure/alert/alert_logs.jpeg)


**1. Select Logs**

Choose the Logs tab. Here you can define your log query using the query editor.

**2. Build Your Log Query**

Use the Query Editor to construct your log query, filter logs, and preview results.

**3. Define Alert Conditions**

The alert will be triggered when the query output satisfies the selected operator.

| Field     | Description                                                |
|-----------|------------------------------------------------------------|
| Operator  | Condition used to evaluate the query result (e.g., greater than) |
| Threshold | Numeric value representing the limit to evaluate           |

`Available Operators`:
 - equal to
 - not equal to
 - greater than
 - less than
 - greater than or equal to
 - less than or equal to

## Alert Settings

   Click **Next → Settings** to define alert behavior, frequency, and metadata.

   | Setting | Description |
   |---------|-------------|
   | **Evaluation Interval** | How often the rule is evaluated |
   | **Wait For** | Duration condition must remain true before firing |
   | **Repeat After** | Time between repeat notifications |
   | **Alert Name** | Name (supports dynamic label variables) |
   | **Tags** | Optional key-value pairs |
   | **Group** | Logical grouping for UI organization |

   ![Alerts Settings](/img/configure/alert/alert_settings.jpeg)

## Configure Notification Receivers

   Choose where alert notifications should be sent.

   Supported receivers:
   - Email [Connect with Email](/configure/alerting/connect-with-email)
   - Slack [Connect with Slack](/configure/alerting/connect-with-slack)
   - PagerDuty [Connect with PagerDuty](/configure/alerting/connect-with-pagerduty)
   - Google Chat [Connect with Google Chat](/configure/alerting/connect-with-google-chat)
   - Jira [Connect with Jira](/configure/alerting/connect-with-jira)
   - Opsgenie [Connect with Opsgenie](/configure/alerting/connect-with-opsgenie)
   - Zenduty [Connect with Zenduty](/configure/alerting/connect-with-zenduty)
   - Webhook [Connect with Webhook](configure/alerting/webhook)

   You can configure multiple receivers per alert.