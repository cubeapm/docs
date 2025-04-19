---
sidebar_position: 8
slug: /install/configure-cubeapm/connect-with-opsgenie-for-alerting
---

# Connect with Opsgenie for alerting

To enable sending alert notifications from CubeAPM to Opsgenie, you need to create an API Integration within your Opsgenie team. The following steps guide you through the process:

1. In the team's page, click on the **Integrations** tab from the left sidebar and click on the **Add integration** button.

   ![Add Integration](/img/configure/alerting/Opsgenie/add_integration.png)

1. Search for "API" in the integration list and select the **API** integration.

   ![Select API Integration](/img/configure/alerting/Opsgenie/select_api_integration.png)

1. Configure the API integration:

   - Enter a name for the integration (e.g., "cubeapm_alerts").
   - Select the team that should receive alerts from this integration.
   - Click **Continue**.

   ![Configure API Integration](/img/configure/alerting/Opsgenie/integration_name.png)

1. After saving, the integration details page will be displayed. **Copy the API Key** and click on **Turn on integration**.

   ![Copy API Key](/img/configure/alerting/Opsgenie/turn_on_integration.png)

1. Configure CubeAPM with the copied API key:

   ```shell
   alertmanager.opsgenie.tokens=<team_name>:<api_key>
   ```

   Multiple teams can be added as below:

   ```shell
   alertmanager.opsgenie.tokens=<team_name_1>:<api_key_1>,<team_name_2>:<api_key_2>
   ```

   The above configuration can be provided in `/etc/cubeapm/config.properties`, or as corresponding `configVars.alertmanager.opsgenie.*` properties in the helm chart values file.
