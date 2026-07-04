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
| `expr` | `string` | The query used to evaluate the alert condition. |
| `expr2` | `string` | (Optional) Secondary query expression used for advanced comparative evaluations or baseline conditions. |
| `for` | `integer` | The duration (in seconds) that the condition must be met before firing the alert. |
| `repeat_interval` | `integer` | Once an alert is firing, how often to resend the notification (in seconds). |
| `grouping_disable` | `boolean` | Defaults to `false`. Set to `true` to disable notification grouping (which normally batches multiple instances of the same alert). |
| `labels` | `object` | Key-value pairs with two main purposes:<br/>**1. Tagging & Routing:** Add custom tags (e.g., `"severity": "critical"`) to filter or route notifications to specific receivers.<br/>**2. Alert Grouping:** A special, reserved `"group"` key (e.g., `"group": "Database Alerts"`) that dictates exactly which folder the alert visually appears under on the CubeAPM UI. |
| `annotations` | `object` | Key-value pairs for descriptive metadata (e.g., `{"summary": \"CPU is high\"}`). |
| `config.receiver_group_ids` | `array` | Array of IDs linking this alert to predefined [Receiver Groups](/http-apis/alerts/receiver-groups#create-receiver-group). |
| `config.mute_group_ids` | `array` | Array of IDs linking this alert to predefined [Mute Groups](/http-apis/alerts/mute-groups#create-mute-group). |
| `config.model` | `object` | (Optional) JSON used to save the visual state of the rule in the CubeAPM UI's Query Builder. If omitted, the API will still create the alert successfully, but it will be displayed in the UI as a raw query. |
| `receiver` | `object` | Defines an inline custom receiver (e.g., `{"slack_configs": [...]}`). Functions identically to a Receiver Group but exclusively for this rule. |
| `mute` | `object` | Defines an inline custom mute configuration (e.g., `{"time_intervals": [...]}`). Functions identically to a Mute Group but exclusively for this rule. |
| `permissions` | `array` | Determines access. Pass an empty array `[]` for default "Role Based" access (based on global CubeAPM roles). Pass an array of objects to grant "Custom" roles (`viewer`, `editor`) to specific users or teams. |

:::info
You can configure inline [***receivers***](/http-apis/alerts/alert-rules#how-to-configure-inline-receivers), [***mutes***](/http-apis/alerts/alert-rules#how-to-configure-inline-mutes) and [***permissions***](/http-apis/alerts/alert-rules#how-to-configure-role-based-and-custom-permissions) for alert rules.

**Note:** By placing these inline objects directly inside the root JSON payload of your `POST` or `PUT` request, the backend automatically attaches them exclusively to the single alert rule you are creating or updating.
:::

#### Curl Example {#create-alert-curl}

**Base Example (Metrics):**

```bash
curl -X POST "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/rules" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "High CPU Usage",
           "datasource": "prometheus",
           "kind": "static",
           "status": "ACTIVE",
           "grouping_disable": false,
           "interval": 60,
           "expr": "sum(rate(node_cpu_seconds_total{mode!=\"idle\"}[5m])) > 80",
           "for": 300,
           "repeat_interval": 3600,
           "labels": {
             "severity": "critical",
             "team": "database-reliability",
             "group": "Default Group"
           },
           "annotations": {
             "summary": "CPU usage exceeded 80%"
           },
           "config": {
             "receiver_group_ids": [],
             "mute_group_ids": []
           },
           "receiver": {
             "slack_configs": [
               { "channel": "high-cpu-specific-alerts" }
             ]
           },
           "mute": {
             "time_intervals": []
           },
           "permissions": []
         }'
```

**For Logs & Traces:**
Use the exact same payload as above, but update the `datasource` and `expr` fields:

<Tabs>
  <TabItem value="logs" label="Logs Alert">

```json
{
  "...": "...",
  "datasource": "vlogs",
  "expr": "{app=\"nginx\"} AND error | stats count() > 50"
}
```

  </TabItem>
  <TabItem value="traces" label="Traces Alert">

```json
{
  "...": "...",
  "datasource": "traces",
  "expr": "{service=\"checkout-service\"} AND duration:>2s | stats count() > 10"
}
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
| `expr2` | `string` | An optional secondary query or expression, typically used for baseline evaluations, comparisons, or anomaly detection. |
| `kind` | `string` | Rule type (`static`). |
| `for` | `integer` | Duration condition must be met before firing. |
| `labels` | `object` | Key-value pairs with two main purposes:<br/>**1. Tagging & Routing:** Add custom tags (e.g., `"severity": "critical"`) to filter or route notifications to specific receivers.<br/>**2. Alert Grouping:** A special, reserved `"group"` key (e.g., `"group": "Database Alerts"`) that dictates exactly which folder the alert visually appears under on the CubeAPM UI. |
| `status` | `string` | Current status (`ACTIVE`, `PAUSED`, etc.). |
| `grouping_disable` | `boolean` | Whether alert grouping is disabled. |
| `config` | `object` | Contains `receiver_group_ids` and `mute_group_ids`. |
| `receiver` | `object` | Contains inline custom receiver definitions configured exclusively for this rule. |
| `mute` | `object` | Contains inline custom mute definitions configured exclusively for this rule. |
| `repeat_interval` | `integer` | Notification repeat interval in seconds. |
| `permissions` | `array` | Determines access. Pass an empty array `[]` for default "Role Based" access (based on global CubeAPM roles). Pass an array of objects to grant "Custom" roles (`viewer`, `editor`) to specific users or teams. |

> **Note:** If you provide IDs in `config.receiver_group_ids` or `config.mute_group_ids`, those groups **must** exist in your account. Passing an invalid or non-existent ID will result in a `500` error (`all receiver groups must exist`). If you have not created any Receiver Groups yet, pass an empty array `[]` as shown in the examples.

**For example:**

```json
{
  "id": 1,
  "datasource": "prometheus",
  "name": "High CPU Usage",
  "interval": 60,
  "expr": "sum(rate(node_cpu_seconds_total{mode!=\"idle\"}[5m])) > 80",
  "expr2": "",
  "kind": "static",
  "for": 300,
  "labels": {
    "group": "Default Group",
    "severity": "critical",
    "team": "database-reliability"
  },
  "annotations": {
    "summary": "CPU usage exceeded 80%"
  },
  "status": "ACTIVE",
  "grouping_disable": false,
  "config": {
    "receiver_group_ids": [],
    "mute_group_ids": []
  },
  "receiver": {
    "slack_configs": [
      {
        "channel": "high-cpu-specific-alerts"
      }
    ]
  },
  "mute": {
    "time_intervals": [
      {
        "times": [
          {
  "start_time": "00:00",
  "duration_minutes": 1440
          }
        ],
        "weekdays": [
          "saturday",
          "sunday"
        ],
        "location": "UTC"
      }
    ]
  },
  "repeat_interval": 3600,
  "permissions": [
    {
      "entity_type": "user",
      "entity_id": "john.doe@company.com",
      "permission": "editor"
    },
    {
      "entity_type": "team",
      "entity_id": "4",
      "permission": "viewer"
    }
  ]
}
```

### Get Alert Rules

**Endpoint:** `GET` `http://<cubeapm-admin-host>:3199/api/alerts/api/v1/rules`

#### Curl Examples & Response Format {#get-alert-curl-and-response}

The response format is a JSON array of alert rule objects. The JSON object has the following structure.

| Field | Type | Description |
| :--- | :--- | :--- |
| `alerts` | `array` | A list of specific alert instances that are currently firing or pending. *(Note: Returns `null` if the rule is currently inactive).* |
| `annotations` | `object` | Current annotations evaluated for the alert rule. |
| `config` | `object` | Rule configuration, including receiver and mute group mappings. |
| `datasource` | `string` | The source platform queried (`prometheus`, `vlogs`, `traces`). |
| `duration` | `integer` | The duration condition the rule must meet before firing. **Note:** The GET API returns this as `\"duration\"`, but it corresponds exactly to the `\"for\"` parameter used when creating the alert. |
| `groupingDisable` | `boolean` | Whether alert grouping is disabled. |
| `health` | `string` | The health status of the rule evaluation (e.g., `ok`). |
| `id` | `integer` | Unique identifier for the alert rule. |
| `interval` | `integer` | Evaluation interval in seconds. |
| `kind` | `string` | Rule type (`static`). |
| `labels` | `object` | Key-value pairs with two main purposes:<br/>**1. Tagging & Routing:** Evaluated tags (e.g., `"severity": "critical"`) used for filtering and routing.<br/>**2. Alert Grouping:** A special, reserved `"group"` key (e.g., `"group": "Database Alerts"`) that dictates exactly which folder the alert visually appears under on the CubeAPM UI. |
| `lastEvaluation` | `string` | Timestamp of the last time the rule was evaluated. |
| `mute` | `object` | Contains inline custom mute definitions configured exclusively for this rule. |
| `name` | `string` | The name of the alert rule. |
| `permission` | `string` | The access level of the requesting user. |
| `query` | `string` | The query expression evaluated. |
| `query2` | `string` | An optional secondary query or expression, typically used for baseline evaluations, comparisons, or anomaly detection. |
| `readonly` | `boolean` | Whether the rule is read-only. |
| `receiver` | `object` | Contains inline custom receiver definitions configured exclusively for this rule. |
| `repeatInterval` | `integer` | Notification repeat interval in seconds. |
| `state` | `string` | The current state of the alert (`firing`, `pending`, `inactive`). |
| `status` | `string` | Current rule status (`ACTIVE`, `PAUSED`). |

**For example:**

<Tabs>

  <TabItem value="single" label="Get Single Alert Rule by Rule ID">

**Request:**
```bash
curl -X GET "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/rules?id=1"
```

**Response:**
```json
{
  "alerts": null,
  "annotations": {
    "alertname": "Testing-Alert",
    "cube.kind": "static",
    "datasource": "prometheus",
    "interval": "30",
    "value": "{{ printf \"%.2f\" .Value }}"
  },
  "config": {
    "model": {
      "type": "quick",
      "calculate": "latency_average",
      "value": "90",
      "labelPairs": [
        {
          "label": "service",
          "operator": "=",
          "values": [
            "analytics-service"
          ],
          "options": []
        }
      ],
      "groupBy": []
    }
  },
  "datasource": "prometheus",
  "duration": 0,
  "groupingDisable": false,
  "health": "ok",
  "id": 2,
  "interval": 30,
  "kind": "static",
  "labels": {
    "group": "Default Group",
    "rule_id": "{{ .GroupID }}"
  },
  "lastEvaluation": "0001-01-01T00:00:00Z",
  "mute": {
    "time_intervals": []
  },
  "name": "Testing-Alert",
  "permission": "admin",
  "query": "(sum(increase(cube_apm_latency_total{service=\"analytics-service\", span_kind=~\"server|consumer\"} default 0)) * 1000 / sum(increase(cube_apm_calls_total{service=\"analytics-service\", span_kind=~\"server|consumer\"} default 0))) > 20",
  "query2": "",
  "readonly": false,
  "receiver": {
    "email_configs": [],
    "slack_configs": [
      {
        "channel": "C0AUECYSYSJ",
        "type": "slack",
        "send_resolved": true,
        "cube_show_query": false,
        "cube_show_sample_log": false,
        "valid": true
      }
    ],
    "pagerduty_configs": [],
    "jira_configs": [],
    "opsgenie_configs": [],
    "googlechat_configs": [],
    "msteamsv2_configs": [],
    "webhook_configs": []
  },
  "repeatInterval": 300,
  "state": "inactive",
  "status": "PAUSED"
}
```

  </TabItem>
  <TabItem value="all" label="Get All Alert Rules">

**Request:**
```bash
curl -X GET "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/rules"
```

**Response:**
```json
[
  {
    "alerts": null,
    "annotations": {
      "alertname": "Demo Latency",
      "cube.kind": "static",
      "datasource": "traces",
      "interval": "60",
      "value": "{{ printf \"%.2f\" .Value }}"
    },
    "config": {
      "receiver_group_ids": [],
      "mute_group_ids": []
    },
    "datasource": "traces",
    "duration": 300,
    "groupingDisable": false,
    "health": "ok",
    "id": 22,
    "interval": 60,
    "kind": "static",
    "labels": {
      "group": "Default Group",
      "rule_id": "{{ .GroupID }}",
      "severity": "critical",
      "team": "checkout-reliability"
    },
    "lastEvaluation": "0001-01-01T00:00:00Z",
    "mute": {
      "time_intervals": [
        {
          "times": [
            {
              "start_time": "00:00",
              "duration_minutes": 1440
            }
          ],
          "weekdays": [
            "saturday",
            "sunday"
          ],
          "location": "UTC"
        }
      ]
    },
    "name": "Demo Latency",
    "permission": "admin",
    "query": "{service=\"checkout-service\"} AND duration:>2s | stats count() > 10",
    "query2": "",
    "readonly": false,
    "receiver": {
      "slack_configs": [
        {
          "channel": "high-cpu-specific-alerts"
        }
      ]
    },
    "repeatInterval": 3600,
    "state": "inactive",
    "status": "ACTIVE"
  },
  {
    "alerts": null,
    "annotations": {
      "alertname": "Testing-Alert",
      "cube.kind": "static",
      "datasource": "prometheus",
      "interval": "30",
      "value": "{{ printf \"%.2f\" .Value }}"
    },
    "config": {
      "model": {
        "type": "quick",
        "calculate": "latency_average",
        "value": "90",
        "labelPairs": [
          {
            "label": "service",
            "operator": "=",
            "values": [
              "analytics-service"
            ],
            "options": []
          }
        ],
        "groupBy": []
      }
    },
    "datasource": "prometheus",
    "duration": 0,
    "groupingDisable": false,
    "health": "ok",
    "id": 2,
    "interval": 30,
    "kind": "static",
    "labels": {
      "group": "Default Group",
      "rule_id": "{{ .GroupID }}"
    },
    "lastEvaluation": "0001-01-01T00:00:00Z",
    "mute": {
      "time_intervals": []
    },
    "name": "Testing-Alert",
    "permission": "admin",
    "query": "(sum(increase(cube_apm_latency_total{service=\"analytics-service\", span_kind=~\"server|consumer\"} default 0)) * 1000 / sum(increase(cube_apm_calls_total{service=\"analytics-service\", span_kind=~\"server|consumer\"} default 0))) > 20",
    "query2": "",
    "readonly": false,
    "receiver": {
      "email_configs": [],
      "slack_configs": [
        {
          "channel": "C0AUECYSYSJ",
          "type": "slack",
          "send_resolved": true,
          "cube_show_query": false,
          "cube_show_sample_log": false,
          "valid": true
        }
      ],
      "pagerduty_configs": [],
      "jira_configs": [],
      "opsgenie_configs": [],
      "googlechat_configs": [],
      "msteamsv2_configs": [],
      "webhook_configs": []
    },
    "repeatInterval": 300,
    "state": "inactive",
    "status": "PAUSED"
  },
  {
    "alerts": null,
    "annotations": {
      "alertname": "demo",
      "cube.kind": "static",
      "datasource": "vlogs",
      "interval": "30",
      "value": "{{ printf \"%.2f\" .Value }}"
    },
    "config": {
      "model": {
        "type": "builder",
        "streamPairs": [
          {
            "label": "env",
            "operator": "=",
            "values": [
              "UNSET"
            ],
            "options": []
          }
        ],
        "labelPairs": [
          {
            "label": "log.exception.type",
            "operator": "=",
            "values": [
              "java.lang.RuntimeException"
            ],
            "options": []
          }
        ],
        "pipes": [
          {
            "value": "stats",
            "by": [
              "log.exception.type"
            ],
            "aggs": [
              {
                "fn": "count",
                "args": [
                  "log.exception.type"
                ],
                "filter": "",
                "alias": ""
              }
            ]
          }
        ]
      }
    },
    "datasource": "vlogs",
    "duration": 0,
    "groupingDisable": false,
    "health": "ok",
    "id": 3,
    "interval": 30,
    "kind": "static",
    "labels": {
      "group": "Default Group",
      "rule_id": "{{ .GroupID }}"
    },
    "lastEvaluation": "0001-01-01T00:00:00Z",
    "mute": {
      "time_intervals": []
    },
    "name": "demo",
    "permission": "admin",
    "query": "{\"env\"=\"UNSET\"} log.exception.type:=\"java.lang.RuntimeException\" | stats by (\"log.exception.type\") count(log.exception.type) as result | filter result: > 2",
    "query2": "",
    "readonly": false,
    "receiver": {
      "email_configs": [],
      "slack_configs": [
        {
          "channel": "C0AUECYSYSJ",
          "type": "slack",
          "send_resolved": true,
          "cube_show_query": true,
          "cube_show_sample_log": true,
          "valid": true
        }
      ],
      "pagerduty_configs": [],
      "jira_configs": [],
      "opsgenie_configs": [],
      "googlechat_configs": [],
      "msteamsv2_configs": [],
      "webhook_configs": []
    },
    "repeatInterval": 300,
    "state": "inactive",
    "status": "PAUSED"
  }
]
```

  </TabItem>
</Tabs>

### Update / Delete Alert Rules

#### Update an Alert Rule (PUT) {#update-alert-curl}

**Endpoint:** `PUT` `http://<cubeapm-admin-host>:3199/api/alerts/api/v1/rules`

Send the same payload as `POST`, but include the `"id"` field in the JSON payload. 

:::warning
The `PUT` request replaces the **entire** rule configuration. You must include all existing configurations (such as `labels`, inline `receiver`, inline `mute`, and `permissions`) in your payload; otherwise, they will be overwritten and removed!

**How to pause an alert:** 
To pause an alert, change the `"status"` field to `"PAUSED"` and send the **full payload** in the `PUT` request. Do not send just the `"status"` field, or your entire rule configuration will be wiped out!
:::

**For example:**

```bash
curl -X PUT "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/rules" \
     -H "Content-Type: application/json" \
     -d '{
           "id": 1,
           "name": "High CPU Usage",
           "datasource": "prometheus",
           "kind": "static",
           "status": "PAUSED",
           "interval": 60,
           "expr": "sum(rate(node_cpu_seconds_total{mode!=\"idle\"}[5m])) > 80",
           "for": 300,
           "repeat_interval": 3600,
           "labels": {
             "severity": "critical",
             "team": "database-reliability",
             "group": "Default Group"
           },
           "annotations": {
             "summary": "CPU usage exceeded 80%"
           },
           "config": {
             "receiver_group_ids": [],
             "mute_group_ids": []
           },
           "receiver": {
             "slack_configs": [
               { "channel": "high-cpu-specific-alerts" }
             ]
           },
           "mute": {
             "time_intervals": []
           },
           "permissions": []
           // ... include all other existing configurations here as well
         }'
```

### How to Configure Inline Receivers

While you can assign alerts to shared global [**Receiver Groups**](/http-apis/alerts/receiver-groups) using `config.receiver_group_ids`, you can also configure **Inline Receivers** directly on a specific Alert Rule. This is useful when you want the alert to have a specific routing that isn't shared by any other rules.

To define a receiver inline, you define the exact same configuration schema you would use for a Receiver Group, but place it inside the `"receiver"` object of the Alert Rule payload.

<Tabs>
  <TabItem value="slack" label="Slack" default>

```json
{
  "...": "...",
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
}
```

  </TabItem>
  <TabItem value="email" label="Email">

```json
{
  "...": "...",
  "receiver": {
    "email_configs": [
      { 
        "to": "devops@yourcompany.com",
        "send_resolved":true
      }
    ]
  }
}
```

  </TabItem>
  <TabItem value="pagerduty" label="PagerDuty">

```json
{
  "...": "...",
  "receiver": {
    "pagerduty_configs": [
      {
        "service_name": "Database Team",
        "routing_key": "YOUR_PD_ROUTING_KEY",
        "send_resolved":true
      }
    ]
  }
}
```

  </TabItem>
  <TabItem value="opsgenie" label="OpsGenie">

```json
{
  "...": "...",
  "receiver": {
    "opsgenie_configs": [
      { 
        "api_key": "YOUR_OPSGENIE_API_KEY",
        "send_resolved":true
      }
    ]
  }
}
```

  </TabItem>
  <TabItem value="jira" label="Jira">

```json
{
  "...": "...",
  "receiver": {
    "jira_configs": [
      {
        "project": "PROJ",
        "issue_type": "Bug",
        "send_resolved":true
      }
    ]
  }
}
```

  </TabItem>
  <TabItem value="msteams" label="MS Teams">

```json
{
  "...": "...",
  "receiver": {
    "msteamsv2_configs": [
      { 
        "webhook_url": "ms-teams webhook url",
        "send_resolved":true,
        "cube_show_query":false
      }
    ]
  }
}
```

  </TabItem>
  <TabItem value="webhook" label="Webhook">

```json
{
  "...": "...",
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
}
```

  </TabItem>
  <TabItem value="googlechat" label="Google Chat">

```json
{
  "...": "...",
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
}
```

  </TabItem>
</Tabs>

### How to Configure Inline Mutes

While you can mute alerts to shared global [**Mute Groups**](/http-apis/alerts/mute-groups) using `config.mute_group_ids`, you can also configure **Inline Mutes** directly on a specific Alert Rule. Place the exact same configuration schema you would use for a Mute Group inside the `"mute"` object of the Alert Rule payload.

<Tabs>
  <TabItem value="weekend" label="Weekend Mute" default>

```json
{
  "...": "...",
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
}
```

  </TabItem>
  <TabItem value="nightly" label="Nightly Mute">

```json
{
  "...": "...",
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
}
```

  </TabItem>
  <TabItem value="business" label="Business Hours Mute">

```json
{
  "...": "...",
  "mute": {
    "time_intervals": [
      {
        "times": [
          { "start_time": "09:00", "duration_minutes": 480 }
        ],
        "weekdays": ["monday", "tuesday", "wednesday", "thursday", "friday"],
        "location": "America/New_York"
      }
    ]
  }
}
```

  </TabItem>
</Tabs>


### How to Configure Role Based and Custom Permissions

The `permissions` array in the JSON payload dictates who can view and edit your alert rule. 

#### 1. Role Based (Default)
When "Role Based" is used, the rule relies entirely on the user's global workspace role (Global Viewers can view it, Global Editors can edit it). 

To enforce this via the API, simply pass an empty array:

**For example:**

```json
{
  "...": "...",
  "permissions": [] 
}
```

#### 2. Custom
When "Custom" is used, you explicitly grant specific roles (`viewer` or `editor`) to specific users (by email) or teams (by ID) for this rule exclusively. 

To configure this via the API, populate the `permissions` array with one or more objects specifying the `entity_type`, `entity_id`, and `permission`:

**For example:**

```json
{
  "...": "...",
  "permissions": [
    {
      "entity_type": "user",
      "entity_id": "john.doe@company.com",
      "permission": "editor"
    },
    {
      "entity_type": "team",
      "entity_id": "4", 
      "permission": "viewer"
    }
  ]
}
```