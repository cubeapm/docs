---
slug: /alerts
---

# Alerts

Alerts in CubeAPM enable you to monitor specific metrics or log data, define threshold conditions to detect potential issues, and configure notification channels and recipients. By setting up alerts, you can proactively identify critical problems while reducing unnecessary noise.
This guide explains how to configure and manage alerts effectively in CubeAPM.

## Create New Alerts

1. Click on the `New +` button which enables quick creation of additional alert rules.

   ![Alerts HomePage](/img/configure/alert/alert_homepage.jpeg)
   
   `To create an alert directly`:

   - Locate the desired metric.

   - Click the three-dot action menu (`⋮`).

   - Select `Create Alert` to begin configuration.

    ![Alerts HomePage](/img/configure/alert/alert_rpm_example.jpeg)


   When you create a new alert in CubeAPM, the first step is to define the query that determines when the alert should trigger. This page allows you to select the data source, apply filters, and set threshold conditions. You can choose what type of data the alert should monitor:

   - `Metrics` – Track system or application performance metrics (CPU, memory, request latency, etc.)

   - `Logs` – Trigger alerts based on log data

   You can also select the alert behavior type:

   - `Static` – Threshold-based alerting

   - `Anomaly` – Detect unusual patterns automatically


## Alerts Dashboard

   Once an alert rule is successfully created in CubeAPM, it becomes visible in the **Alerts Dashboard**, allowing you to validate and monitor its status.

   ![Alerts Overview](/img/configure/alert/alert_overview.jpeg)

   The Alerts dashboard in CubeAPM provides a centralized view for managing all alerting configurations within your system. It allows you to organize alert rules into logical groups, monitor active or recently triggered alerts, and create new alert conditions.

   The main components of this page include:

   ### Group-based Alert Organization

   Alert rules are displayed under different groups such as:

   -  Default Group

   -  Demo

   -  Order Service

   -  Payment Service

   Each group shows:

   -  `Rules` → Total number of alert rules configured

   -  `Firing` → Number of alert rules currently in an active (firing) state

   `Recent Alerts` - A section dedicated to viewing alerts that have recently triggered, enabling quick debugging and faster incident response.

   `Search Bar` - Allows searching for alert rules by name, making it easy to navigate in setups with many alerts.

   ## Top-Bar Filters & Navigation

   `Receiver Groups` → Manage channels or recipients who receive alert notifications (e.g., Email, Slack)

   `Notification History` → Displays the record of notifications sent for auditing and troubleshooting