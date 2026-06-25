import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Alert Management API

The CubeAPM Alert APIs allow you to programmatically manage Alert Rules, Receiver Groups (Notifications), and Mute Groups (Snoozing).

## Authentication
These APIs can be accessed programmatically using the Admin Port `3199`.

**Headers:**
- (Optional) `Authorization: Bearer <ADMIN_TOKEN>`
- `Content-Type: application/json`

You can add header manually depending on the case.

:::info
When `http-token-admin` is enabled in cubeapm’s `config.properties`, requests must include the same token in the `Authorization` header.
:::


## 1. Alert Rules
Alert rules define the actual condition (query) under which an alert fires. API for Alert Rules: 

```shell
http://<cubeapm-admin-host>:3199/api/alerts/api/v1/rules
```

### Alert Payload Parameters Explained

| Parameter | Type | Description |
|---|---|---|
| `name` | `string` | A descriptive string identifier for your alert rule. |
| `datasource` | `string` | The source platform to query against. Options are `"prometheus"`, `"vlogs"`, or `"traces"`. |
| `kind` | `string` | `"static"` for a standard threshold alert. |
| `status` | `string` | `"ACTIVE"` to enable the alert, or `"PAUSED"` to temporarily disable it. |
| `interval` | `integer` | How often (in seconds) the backend evaluates the query (e.g., `60`). |
| `expr` | `string` | The PromQL, LogQL, or Trace query used to evaluate the alert condition. |
| `for` | `integer` | The duration (in seconds) that the condition must be met before firing the alert. |
| `repeat_interval` | `integer` | Once an alert is firing, how often to resend the notification (in seconds). |
| `config.receiver_group_ids` | `array` | Array of IDs linking this alert to predefined Receiver Groups. |
| `config.mute_group_ids` | `array` | Array of IDs linking this alert to predefined Mute Groups. |
| `receiver` / `mute` | `object` | Empty objects `{}` required to satisfy legacy backend database schema constraints. |
| `permissions` | `array` | Access controls. An empty array `[]` applies default permissions. |

### Create Alert Rule

<Tabs>
  <TabItem value="metric" label="Create Metric Alert" default>

```bash
#### Metric Alert Example

curl -X POST "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/rules" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "High CPU Usage",
           "datasource": "prometheus",
           "kind": "static",
           "status": "ACTIVE",
           "interval": 60,
           "expr": "sum(rate(node_cpu_seconds_total{mode!=\"idle\"}[5m])) > 80",
           "for": 300,
           "repeat_interval": 3600,
           "config": {
             "receiver_group_ids": [1],
             "mute_group_ids": []
           },
           "receiver": {},
           "mute": {},
           "permissions": []
         }'
```

  </TabItem>
  <TabItem value="logs" label="Create Logs Alert">

```bash
#### Logs Alert Example

curl -X POST "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/rules" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "High NGINX Error Rate",
           "datasource": "vlogs",
           "kind": "static",
           "status": "ACTIVE",
           "interval": 60,
           "expr": "{app=\"nginx\"} AND error | stats count() > 50",
           "for": 60,
           "repeat_interval": 3600,
           "config": {
             "receiver_group_ids": [2],
             "mute_group_ids": []
           },
           "receiver": {},
           "mute": {},
           "permissions": []
         }'
```

  </TabItem>
  <TabItem value="traces" label="Create Traces Alert">

```bash
#### Traces Alert Example

curl -X POST "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/rules" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "High Checkout Latency",
           "datasource": "traces",
           "kind": "static",
           "status": "ACTIVE",
           "interval": 60,
           "expr": "{service=\"checkout-service\"} AND duration:>2s | stats count() > 10",
           "for": 300,
           "repeat_interval": 3600,
           "config": {
             "receiver_group_ids": [1],
             "mute_group_ids": []
           },
           "receiver": {},
           "mute": {},
           "permissions": []
         }'
```

  </TabItem>
</Tabs>

### Get Alert Rules

Fetch all alert rules and their current triggered states (firing/pending/inactive):
```bash
#### Curl Example

curl -X GET "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/rules"
```

Fetch a specific alert rule by ID:
```bash
#### Curl Example

curl -X GET "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/rules?id=1"
```

### Update / Delete Alert Rules

**Update an Alert Rule (PUT)**  
Send the same payload as `POST`, but change the method to `PUT` and include the `"id"` field in the JSON payload:
```bash
#### Curl Example

curl -X PUT "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/rules" \
     -H "Content-Type: application/json" \
     -d '{
           "id": 1,
           "name": "Updated Alert Name",
           ...
         }'
```

**Delete an Alert Rule (DELETE)**  
Pass the `id` query parameter:
```bash
#### Curl Example

curl -X DELETE "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/rules?id=1"
```

## 2. Receiver Groups
Receiver groups define where your alerts should be sent (Slack, Email, PagerDuty, etc.). API for Receiver Groups: 

```shell
http://<cubeapm-admin-host>:3199/api/alerts/api/v1/receivergroups
```

### Receiver Group Parameters Explained

| Parameter | Type | Description |
|---|---|---|
| `name` | `string` | A descriptive name for the notification group. |
| `receiver.slack_configs` | `array` | Contains Slack configurations. Requires `channel` (e.g., `"#alerts"`). |
| `receiver.email_configs` | `array` | Contains email configurations. Requires `to` (e.g., `"team@company.com"`). |
| `receiver.pagerduty_configs` | `array` | Requires `service_name` and `routing_key`. |
| `receiver.webhook_configs` | `array` | Requires `url` to send a POST request when the alert fires. |
| `receiver.msteamsv2_configs` | `array` | Requires `webhook_url` for Microsoft Teams incoming webhook integration. |
| `receiver.jira_configs` | `array` | Requires `project` and `issue_type` to automatically create Jira tickets. |
| `receiver.opsgenie_configs` | `array` | Requires `api_key` for OpsGenie routing. |
| `receiver.googlechat_configs` | `array` | Requires `url` for Google Chat webhooks. |

### Create Receiver Group

<Tabs>
  <TabItem value="slack" label="Slack" default>

```bash
curl -X POST "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/receivergroups" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Slack Alerts",
           "receiver": {
             "slack_configs": [
               { "channel": "#production-alerts" }
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
               { "to": "devops@yourcompany.com" }
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
                 "routing_key": "YOUR_PD_ROUTING_KEY"
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
               { "api_key": "YOUR_OPSGENIE_API_KEY" }
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
                 "issue_type": "Bug"
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
               { "webhook_url": "ms-teams webhook url" }
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
               { "url": "webhook url" }
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
               { "url": "google chat webhook url" }
             ]
           }
         }'
```

  </TabItem>
</Tabs>

### Get Receiver Groups

Fetch all receiver groups:
```bash
curl -X GET "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/receivergroups"
```

Fetch a specific receiver group by ID:
```bash
curl -X GET "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/receivergroups?id=1"
```

### Update / Delete Receiver Groups

**Update a Receiver Group (PUT)**
```bash
curl -X PUT "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/receivergroups" \
     -H "Content-Type: application/json" \
     -d '{
           "id": 1,
           "name": "Updated Name",
           "receiver": { ... }
         }'
```

**Delete a Receiver Group (DELETE)**
```bash
curl -X DELETE "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/receivergroups?id=1"
```

## 3. Mute Groups (Snoozing)
Mute groups allow you to suppress notifications for specific time intervals. API for Mute Groups:

```shell
http://<cubeapm-admin-host>:3199/api/alerts/api/v1/mutegroups
```

### Mute Group Parameters Explained

| Parameter | Type | Description |
|---|---|---|
| `name` | `string` | A descriptive name for the snooze/mute schedule. |
| `mute.time_intervals` | `array` | A list of time intervals during which alerts should be suppressed. |
| `times` | `array` | Specifies the `start_time` (e.g., `"00:00"`) and `duration_minutes` for the mute. |
| `weekdays` | `array` | Optional. Days of the week this mute applies (e.g., `["saturday", "sunday"]`). |
| `location` | `string` | The timezone for evaluating the time (e.g., `"America/New_York"`, `"UTC"`). |

### Create Mute Group

<Tabs>
  <TabItem value="weekend" label="Create Weekend Mute" default>

```bash
### Curl Example - Mute all alerts on weekends

curl -X POST "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/mutegroups" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Weekend Silence",
           "mute": {
             "time_intervals": [
               {
                 "times": [
                   { "start_time": "00:00", "duration_minutes": 1440 }
                 ],
                 "weekdays": ["saturday", "sunday"],
                 "location": "America/New_York"
               }
             ]
           }
         }'
```

  </TabItem>
  <TabItem value="nightly" label="Create Nightly Mute">

```bash
## Curl Example - Mute all alerts during nightly maintenance (2 AM - 4 AM UTC)

curl -X POST "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/mutegroups" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Nightly Maintenance",
           "mute": {
             "time_intervals": [
               {
                 "times": [
                   { "start_time": "02:00", "duration_minutes": 120 }
                 ],
                 "location": "UTC"
               }
             ]
           }
         }'
```

  </TabItem>
</Tabs>

### Get Mute Groups

Fetch all mute groups:
```bash
curl -X GET "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/mutegroups"
```

Fetch a specific mute group by ID:
```bash
curl -X GET "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/mutegroups?id=1"
```

### Update / Delete Mute Groups

**Update a Mute Group (PUT)**
```bash
curl -X PUT "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/mutegroups" \
     -H "Content-Type: application/json" \
     -d '{
           "id": 1,
           "name": "Updated Mute Name",
           "mute": { ... }
         }'
```

**Delete a Mute Group (DELETE)**
```bash
curl -X DELETE "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/mutegroups?id=1"
```