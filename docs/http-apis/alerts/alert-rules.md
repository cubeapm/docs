---
slug: /http-apis/alerts/alert-rules
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Alert Rules


The CubeAPM Alert APIs allow you to programmatically manage Alert Rules, Receiver Groups (Notifications), and Mute Groups (Snoozing).

### Authentication

These APIs can be accessed programmatically using the Admin Port `3199`.

**Headers Required:**
- (Optional) `Authorization: Bearer <ADMIN_TOKEN>`
- `Content-Type: application/json`

:::info
When `http-token-admin` is enabled in cubeapm’s `config.properties`, requests must include the same token in the `Authorization` header.
:::




Alert rules define the actual condition (query) under which an alert fires.

### Create Alert Rule

**Endpoint:** `POST` `http://<cubeapm-admin-host>:3199/api/alerts/api/v1/rules`

#### Request Parameters {#create-alert-request-parameters}

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

#### Curl Example {#create-alert-curl}

<Tabs>
  <TabItem value="metric" label="Create Metric Alert" default>

```bash
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
             "receiver_group_ids": [],
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
             "receiver_group_ids": [],
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
             "receiver_group_ids": [],
             "mute_group_ids": []
           },
           "receiver": {},
           "mute": {},
           "permissions": []
         }'
```

  </TabItem>
</Tabs>

#### Response Parameter {#create-alert-response-format}

The response format is a JSON object. The JSON object has the following structure.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `integer` | Unique identifier for the alert rule. |
| `datasource` | `string` | The source platform queried (`prometheus`, `vlogs`, `traces`). |
| `name` | `string` | The name of the alert rule. |
| `interval` | `integer` | Evaluation interval in seconds. |
| `expr` | `string` | The query expression evaluated. |
| `expr2` | `string` | Secondary expression (if applicable). |
| `kind` | `string` | Rule type (`static`). |
| `for` | `integer` | Duration condition must be met before firing. |
| `labels` | `object` | Additional labels attached to the alert. |
| `annotations` | `object` | Additional annotations attached to the alert. |
| `status` | `string` | Current status (`ACTIVE`, `PAUSED`, etc.). |
| `grouping_disable` | `boolean` | Whether alert grouping is disabled. |
| `config` | `object` | Contains `receiver_group_ids` and `mute_group_ids`. |
| `receiver` | `object` | Additional receiver settings. |
| `mute` | `object` | Additional mute settings. |
| `repeat_interval` | `integer` | Notification repeat interval in seconds. |
| `permissions` | `array` | Applied access controls. |

> **Note:** If you provide IDs in `config.receiver_group_ids` or `config.mute_group_ids`, those groups **must** exist in your account. Passing an invalid or non-existent ID will result in a `500` error (`all receiver groups must exist`). If you have not created any Receiver Groups yet, pass an empty array `[]` as shown in the examples.

**For example:**

```json
{
  "id": 11,
  "datasource": "prometheus",
  "name": "High CPU Usage",
  "interval": 60,
  "expr": "sum(rate(node_cpu_seconds_total{mode!=\"idle\"}[5m])) > 80",
  "expr2": "",
  "kind": "static",
  "for": 300,
  "labels": null,
  "annotations": null,
  "status": "ACTIVE",
  "grouping_disable": false,
  "config": {
    "receiver_group_ids": [1],
    "mute_group_ids": []
  },
  "receiver": {},
  "mute": {},
  "repeat_interval": 3600,
  "permissions": []
}
```

### Get Alert Rules

**Endpoint:** `GET` `http://<cubeapm-admin-host>:3199/api/alerts/api/v1/rules`

#### Curl Example {#get-alert-curl}

Fetch all alert rules and their current triggered states (firing/pending/inactive):
```bash
curl -X GET "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/rules"
```

Fetch a specific alert rule by ID:
```bash
curl -X GET "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/rules?id=1"
```

#### Response Format {#get-alert-response-format}

The response format is a JSON array of alert rule objects. The JSON object has the following structure.

| Field | Type | Description |
| :--- | :--- | :--- |
| `alerts` | `array` | A list of currently active alerts for this rule. |
| `annotations` | `object` | Current annotations evaluated for the alert rule. |
| `config` | `object` | Rule configuration, including receiver and mute group mappings. |
| `datasource` | `string` | The source platform queried (`prometheus`, `vlogs`, `traces`). |
| `duration` | `integer` | The duration condition (`for`) the rule must meet before firing. |
| `groupingDisable` | `boolean` | Whether alert grouping is disabled. |
| `health` | `string` | The health status of the rule evaluation (e.g., `ok`). |
| `id` | `integer` | Unique identifier for the alert rule. |
| `interval` | `integer` | Evaluation interval in seconds. |
| `kind` | `string` | Rule type (`static`). |
| `labels` | `object` | Evaluated labels attached to the alert. |
| `lastEvaluation` | `string` | Timestamp of the last time the rule was evaluated. |
| `mute` | `object` | Mute settings applied to the rule. |
| `name` | `string` | The name of the alert rule. |
| `permission` | `string` | The access level of the requesting user. |
| `query` | `string` | The query expression evaluated. |
| `query2` | `string` | Secondary expression (if applicable). |
| `readonly` | `boolean` | Whether the rule is read-only. |
| `receiver` | `object` | Additional receiver settings. |
| `repeatInterval` | `integer` | Notification repeat interval in seconds. |
| `state` | `string` | The current state of the alert (`firing`, `pending`, `inactive`). |
| `status` | `string` | Current rule status (`ACTIVE`, `PAUSED`). |

**For example:**

```json
[
  {
    "alerts": null,
    "annotations": {
      "alertname": "High CPU Usage",
      "cube.kind": "static",
      "datasource": "prometheus",
      "interval": "60",
      "value": "{{ printf \"%.2f\" .Value }}"
    },
    "config": {
      "receiver_group_ids": [1],
      "mute_group_ids": []
    },
    "datasource": "prometheus",
    "duration": 300,
    "groupingDisable": false,
    "health": "ok",
    "id": 11,
    "interval": 60,
    "kind": "static",
    "labels": {
      "rule_id": "{{ .GroupID }}"
    },
    "lastEvaluation": "2026-06-26T16:16:15.974507+05:30",
    "mute": {},
    "name": "High CPU Usage",
    "permission": "admin",
    "query": "sum(rate(node_cpu_seconds_total{mode!=\"idle\"}[5m])) > 80",
    "query2": "",
    "readonly": false,
    "receiver": {},
    "repeatInterval": 3600,
    "state": "inactive",
    "status": "ACTIVE"
  }
]
```

### Update / Delete Alert Rules

#### Update an Alert Rule (PUT) {#update-alert-curl}

**Endpoint:** `PUT` `http://<cubeapm-admin-host>:3199/api/alerts/api/v1/rules`

Send the same payload as `POST`, but include the `"id"` field in the JSON payload:
```bash
curl -X PUT "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/rules" \
     -H "Content-Type: application/json" \
     -d '{
           "id": 1,
           "name": "Updated Alert Name",
           "datasource": "prometheus",
           "kind": "static",
           "status": "ACTIVE",
           "interval": 60,
           "expr": "sum(rate(node_cpu_seconds_total{mode!=\"idle\"}[5m])) > 80",
           "for": 300,
           "repeat_interval": 3600,
           "config": {
             "receiver_group_ids": [],
             "mute_group_ids": []
           },
           "receiver": {},
           "mute": {},
           "permissions": []
         }'
```

#### Delete an Alert Rule (DELETE) {#delete-alert-curl}

**Endpoint:** `DELETE` `http://<cubeapm-admin-host>:3199/api/alerts/api/v1/rules?id=1`

Pass the `id` query parameter:
```bash
curl -X DELETE "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/rules?id=1"
```


### How to Pause an Alert Rule

If you want to immediately turn off the alert without defining a schedule, you can pause the rule entirely.

Use the `PUT /api/v1/rules` endpoint and change the `"status"` field of your rule from `"ACTIVE"` to `"PAUSED"`:

```json
{
  "id": 11,
  "name": "High CPU Usage",
  "status": "PAUSED", // <-- This immediately stops the alert from evaluating
  "config": {
    "receiver_group_ids": [3],
    "mute_group_ids": []
  }
}
```