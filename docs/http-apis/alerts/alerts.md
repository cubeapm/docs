---
slug: /http-apis/alerts
sidebar_position: 1
---

# Alerts

CubeAPM supports Alerts via HTTP API's.

## Accessing Alert API

The Alert APIs are available on the **Admin Port (default: `3199`)**.

**Example Endpoints:**
- `http://<cubeapm-admin-host>:3199/api/alerts/api/v1/alerts`

## Supported HTTP APIs to Manages the Alerts

| API Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/alerts/api/v1/rules` | `GET`, `POST`, `PUT`, `DELETE` | Manage Alerts Rules. |
| `/api/alerts/api/v1/receivergroups` | `GET`, `POST`, `PUT`, `DELETE` | Manage receiver groups (Notification destinations). |
| `/api/alerts/api/v1/mutegroups` | `GET`, `POST`, `PUT`, `DELETE` | Manage mute schedules. |

## Authentication

These APIs can be accessed programmatically using the Admin Port `3199`.

**Headers Required:**
- (Optional) `Authorization: Bearer <ADMIN_TOKEN>`
- `Content-Type: application/json`

:::info
When `http-token-admin` is enabled in CubeAPM's `config.properties`, requests must include the corresponding token in the `Authorization` header when using `curl` to `CREATE`, `UPDATE`, or `DELETE` receiver groups or mute groups.
:::

## Key Concepts

### Alerts

Alerts are the notifications themselves, sent when specific conditions are met.

- **Status**: `firing`, `pending`, `resolved`.
- **Grouping**: Custom labels provide context for which group the alert is associated with in the CubeAPM UI.
- **Inhibition**: Active alerts can suppress new alerts with specific label sets.

### Alert Rules

Define the conditions under which alerts are generated.

- **Metrics Rules**: Evaluate a PromQL/Metrics expression at regular intervals.
- **Log & Trace Rules**: Evaluate log or trace patterns over time windows.
- **Grouping**: Custom labels provide context to notifications. The special `"group"` label determines which group the alert is associated with in the CubeAPM UI.

Reffer [Alert Rules](./alert-rules.md) for detailed information.

### Receiver Groups

Define **where** alerts are sent.

- Supports multiple integration types: **Slack, Email, PagerDuty, Webhook, MS Teams, Jira, OpsGenie, Google Chat**.
- A single group can contain multiple receivers.

Reffer [Receiver Groups](./receiver-groups.md) for detailed information.

### Mute Groups

Define **when** alerts are suppressed.

- Allows scheduling mutes for specific time intervals.
- Useful for maintenance windows, holidays, or off-hours.

Reffer [Mute Groups](./mute-groups.md) for detailed information.