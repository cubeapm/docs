---
slug: /http-apis/alerts/receiver-groups
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Receiver Groups


Receiver groups define where your alerts should be sent (Slack, Email, PagerDuty, etc.).

## Authentication

These APIs can be accessed programmatically using the Admin Port `3199`.

**Headers Required:**
- (Optional) `Authorization: Bearer <ADMIN_TOKEN>`
- `Content-Type: application/json`

:::info
When `http-token-admin` is enabled in cubeapm’s `config.properties`, requests must include the same token in the `Authorization` header.
:::

### Create Receiver Group

When creating a receiver group, one or multiple receivers of the same or different types can be mapped to a single receiver group.

**Endpoint:** `POST` `http://<cubeapm-admin-host>:3199/api/alerts/api/v1/receivergroups`

#### Request Parameters {#create-receiver-request-parameters}

| Parameter | Type | Description |
|---|---|---|
| `name` | `string` | A descriptive name for the notification group. |
| `receiver.slack_configs` | `array` | Contains Slack configurations. Requires `channel` (e.g., `"#alerts"`). |
| `receiver.email_configs` | `array` | Contains email configurations. Requires `to` (e.g., `"team@company.com"`). |
| `receiver.pagerduty_configs` | `array` | Requires `service_name` and `routing_key`. |
| `receiver.webhook_configs` | `array` | Requires `url` to send a POST request. Optionally accepts custom `headers` (key-value pairs) and a custom `body` string. |
| `receiver.msteamsv2_configs` | `array` | Requires `webhook_url` for Microsoft Teams incoming webhook integration. |
| `receiver.jira_configs` | `array` | Requires `project` and `issue_type` to automatically create Jira tickets. |
| `receiver.opsgenie_configs` | `array` | Requires `api_key` for OpsGenie routing. |
| `receiver.googlechat_configs` | `array` | Requires `url` for Google Chat webhooks. |

#### Curl Example {#create-receiver-curl}

<Tabs>
  <TabItem value="slack" label="Slack" default>

```bash
curl -X POST "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/receivergroups" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Slack Alerts",
           "receiver": {
             "slack_configs": [
               { 
                 "channel": "production-alerts", 
                 "send_resolved":true,
                 "cube_show_query":false,
                 "cube_show_sample_log":false
               }
             ]
           }
        }'
```

  </TabItem>
  <TabItem value="email" label="Email">

```bash
curl -X POST "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/receivergroups" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Email Alerts",
           "receiver": {
             "email_configs": [
               { 
                 "to": "devops@yourcompany.com",
                 "send_resolved":true
               }
             ]
           }
         }'
```

  </TabItem>
  <TabItem value="pagerduty" label="PagerDuty">

```bash
curl -X POST "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/receivergroups" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "PagerDuty Alerts",
           "receiver": {
             "pagerduty_configs": [
               {
                 "service_name": "Database Team",
                 "routing_key": "YOUR_PD_ROUTING_KEY",
                 "send_resolved":true
               }
             ]
           }
         }'
```

  </TabItem>
  <TabItem value="opsgenie" label="OpsGenie">

```bash
curl -X POST "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/receivergroups" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "OpsGenie Alerts",
           "receiver": {
             "opsgenie_configs": [
                { 
                  "api_key": "YOUR_OPSGENIE_API_KEY",
                  "send_resolved":true
                }
             ]
           }
         }'
```

  </TabItem>
  <TabItem value="jira" label="Jira">

```bash
curl -X POST "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/receivergroups" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Jira Tickets",
           "receiver": {
             "jira_configs": [
               {
                 "project": "PROJ",
                 "issue_type": "Bug",
                 "send_resolved":true
               }
             ]
           }
         }'
```

  </TabItem>
  <TabItem value="msteams" label="MS Teams">

```bash
curl -X POST "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/receivergroups" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Teams Alerts",
           "receiver": {
             "msteamsv2_configs": [
                { 
                  "webhook_url": "ms-teams webhook url",
                  "send_resolved":true,
                  "cube_show_query":false
                }
             ]
           }
         }'
```

  </TabItem>
  <TabItem value="webhook" label="Webhook">

```bash
curl -X POST "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/receivergroups" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Custom Webhook",
           "receiver": {
             "webhook_configs": [
               { 
                 "url": "https://api.yourcompany.com/alerts",
                 "headers": {
                   "Content-Type": "application/json"
                 },
                 "body": "{ \"alert_status\": \"triggered\", \"details\": \"Custom payload\" }",
                 "send_resolved":true
               }
             ]
           }
         }'
```

  </TabItem>
  <TabItem value="googlechat" label="Google Chat">

```bash
curl -X POST "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/receivergroups" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Google Chat Alerts",
           "receiver": {
             "googlechat_configs": [
                { 
                  "url": "google webhook url",
                  "send_resolved":true,
                  "cube_show_query":false,
                  "cube_show_sample_log":false
                }
             ]
           }
         }'
```

  </TabItem>
</Tabs>

#### Response Format {#create-receiver-response-format}

The response format is a JSON object. The JSON object has the following structure.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `integer` | Unique identifier for the receiver group. |
| `name` | `string` | The name of the notification group. |
| `receiver` | `object` | The saved configuration for the integrations (e.g., `slack_configs`, `email_configs`). |

**For example:**

```json
{
  "id": 3,
  "name": "Slack Alerts",
  "receiver": {
    "slack_configs": [
      {
        "channel": "#production-alerts"
      }
    ]
  }
}
```

### Fetch All Receiver Groups

**Endpoint:** `GET` `http://<cubeapm-admin-host>:3199/api/alerts/api/v1/receivergroups`

#### Curl Example {#get-receiver-curl}

Fetch all receiver groups:
```bash
curl -X GET "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/receivergroups"
```

#### Response Format {#get-receiver-response-format}

The response format is a JSON array of receiver group objects. See [Create Receiver Group Response Format](#create-receiver-response-format) for the schema structure.

**For example:**

```json
[
  {
    "id": 3,
    "name": "Slack Alerts",
    "receiver": {
      "slack_configs": [
        {
          "channel": "#production-alerts"
        }
      ]
    }
  }
]
```

### Fetch Specific Receiver Group

**Endpoint:** `GET` `http://<cubeapm-admin-host>:3199/api/alerts/api/v1/receivergroups`

#### Curl Example {#get-receiver-specific-curl}

Fetch a specific receiver group by ID:
```bash
curl -X GET "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/receivergroups?id=1"
```

#### Response Format {#get-receiver-specific-response-format}

The response format is a receiver group object. See [Create Receiver Group Response Format](#create-receiver-response-format) for the schema structure.

**For example:**

```json
{
  "id": 3,
  "name": "Slack Alerts",
  "receiver": {
    "slack_configs": [
      {
        "channel": "#production-alerts"
      }
    ]
  }
}
```

### Update / Delete Receiver Groups

#### Update a Receiver Group (PUT) {#update-receiver-curl}

**Endpoint:** `PUT` `http://<cubeapm-admin-host>:3199/api/alerts/api/v1/receivergroups`

```bash
curl -X PUT "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/receivergroups" \
     -H "Content-Type: application/json" \
     -d '{
           "id": 1,
           "name": "Updated Name",
           "receiver": {
             "slack_configs": [
               { "channel": "#production-alerts-v2" }
             ]
           }
         }'
```

#### Delete a Receiver Group (DELETE) {#delete-receiver-curl}

**Endpoint:** `DELETE` `http://<cubeapm-admin-host>:3199/api/alerts/api/v1/receivergroups?id=1`

```bash
curl -X DELETE "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/receivergroups?id=1"
```


