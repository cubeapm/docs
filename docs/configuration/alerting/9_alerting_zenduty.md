---
sidebar_position: 9
slug: /configure/alerting/connect-with-zenduty
---

# Connect with Zenduty

To enable sending alert notifications from CubeAPM to Zenduty, you need to create an Integration within your Zenduty team. The following steps guide you through the process:

1. Go to **Teams** on Zenduty and click on the team you want to add the integration to.

1. Next, go to **Services** and click on the relevant Service.

1. Go to **Integrations** and then **Add New Integration**. Give it a name (e.g. CubeAPM) and select the application **Prometheus** from the dropdown menu (CubeAPM uses the Prometheus Alertmanager webhook format for sending alerts).

1. Go to **Configure** under your Integrations and copy the Webhook URL generated.

When creating alerts in CubeAPM, choose **Webhook** in **Receiver Type** and paste the copied Webhook URL in the **Webhook URL** field. (Leave the **Payload** field empty - CubeAPM will use the Prometheus Alertmanager webhook format by default.)
