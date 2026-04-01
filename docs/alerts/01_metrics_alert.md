---
slug: /alerts/metrics
title: Metrics-Based Alert
sidebar_position: 2
---

# Metrics-Based Alert

## Configure a Metrics-Based Alert

Once you select Metrics, follow the steps below to configure a metrics-based alert.

   ![Alerts Metrics](/img/configure/alert/alert_metrics.jpeg)


**1. Select Query Mode**

   CubeAPM provides three query modes:

   `Quick` – A simple UI-driven query builder (recommended for most users).

   `Advanced` – Additional control over metric expression.

   `Code` – Write advanced expression syntax manually.

   For this example, we use `Quick mode`.

**2. Define the Metric**

   Choose the metric you want to evaluate under `CALCULATE`.

   Common examples:

   | Metric | Description |
   |--------|-------------|
   | **RPM (Requests/min)** | Measures the number of incoming requests per minute |
   | **Error %** | Percentage of requests that resulted in errors. |
   | **%ile Latency (ms)** | Percentile-based latency metrics such as p95 or p99, measured in milliseconds. |
   | **Avg Latency (ms)** | Average time taken to process requests, measured in milliseconds. |

   > Select the metric most relevant to the behavior you want to monitor.

**3. Add Filters**

   `WHERE`: Used to specify filtering conditions for the selected metric. Logical operators such as `equals`, `not equals`, `in`, and `not in` allow precise data selection.

   Use the **WHERE** clauses to filter results.

   | Field       | Operator | Value        |
   |-------------|----------|--------------|
   | service | equals   | name_of_the_service  |
   | host.name | equals   | 88*****1          |

   You can add multiple filters using **Add more**.

**4. Group By**

   Select a dimension to group results.
   - `service`
   - `env`
   - `host.name`
   - `pod`

   This is useful when you want a separate alert per service or pod.

**5. View Generated Query**

   CubeAPM automatically generates the underlying query. You can click `Generate Graph` to preview the results.

**6. Define Alert Conditions**

   Specify when the alert should fire. For example: 

   Trigger when avg(latency) > 200ms

   You may also add an optional second condition with a different severity.

   **Anomaly Alert (Deviation-based)**

   Detects unusual patterns in metric behavior using historical baseline analysis.Instead of fixed values, anomaly alerts fire when the metric deviates from its normal range.

   Example:
   Trigger when latency is above or below by > 2 deviations

   Where

   `Deviation` = how far current value is from historical baseline

   `Higher deviation` → `higher abnormality`

   You may add an optional additional condition with different severity.

   Use anomaly alerts when thresholds fluctuate or normal behavior varies over time.

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