---
slug: /http-apis/dashboards
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Dashboards

The CubeAPM Dashboard APIs allow you to programmatically create, read, update, and delete dashboards and their panels.

## Accessing Dashboard APIs

The Dashboard APIs are available on the **Admin Port (default: `3199`)**.

**Example Endpoints:**
- `http://<cubeapm-admin-host>:3199/api/dashboards/api/v1/dashboards`
- `http://<cubeapm-admin-host>:3199/api/dashboards/api/v1/panels?dashboard_id=1`

## Supported HTTP APIs

| API Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/dashboards/api/v1/dashboards` | `GET`, `POST`, `PUT`, `DELETE` | Manage dashboards. |
| `/api/dashboards/api/v1/panels?dashboard_id={id}` | `POST`, `PUT`, `DELETE` | Manage panels on an existing dashboard. |

## Authentication

These APIs can be accessed programmatically using the Admin Port `3199`.

**Headers Required:**
- (Optional) `Authorization: Bearer <ADMIN_TOKEN>`
- `Content-Type: application/json`

:::info
When `http-token-admin` is enabled in CubeAPM's `config.properties`, requests must include the corresponding token in the `Authorization` header when using `curl` to `CREATE`, `UPDATE`, or `DELETE` dashboards or panels.
:::

---

## Dashboards

### Create Dashboard

**Endpoint:** `POST` `http://<cubeapm-admin-host>:3199/api/dashboards/api/v1/dashboards`

Creates a new dashboard. Panels can be included in the same request.

#### Request Parameters {#create-dashboard-request-parameters}

| Parameter | Type | Description |
| --- | --- | --- |
| `title` | `string` | **Required.** Display name of the dashboard. |
| `variables` | `array` | Dashboard template variables. Pass `[]` if none. See [Variables](#dashboard-variables). |
| `panels` | `array` | List of panel objects to create with the dashboard. See [Panel Type Examples](#panel-type-examples). |
| `permissions` | `array` | Access control. Pass `[]` for default role-based access. See [Permissions](#how-to-configure-role-based-and-custom-permissions). |

#### Curl Example {#create-dashboard-curl}

```bash
curl -X POST "http://<cubeapm-admin-host>:3199/api/dashboards/api/v1/dashboards" \
     -H "Authorization: Bearer <ADMIN_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{
           "title": "Service Overview",
           "variables": [],
           "panels": [
             {
               "type": "linechart",
               "title": "Request Rate",
               "layout": { "x": 0, "y": 0, "w": 6, "h": 4 },
               "config": {
                 "query": "",
                 "unit": "number",
                 "queries": [
                   {
                     "title": "Requests",
                     "query": "sum(rate(cube_apm_calls_total[5m]))",
                     "unit": "number",
                     "formula": "last"
                   }
                 ],
                 "legend": { "label": "", "formula": "last", "pos": "bottom" }
               }
             }
           ],
           "permissions": []
         }'
```

#### Response Format {#create-dashboard-response-format}

Returns the created dashboard object:

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `integer` | Unique identifier for the dashboard. |
| `title` | `string` | Dashboard title. |
| `variables` | `array` | Dashboard variables. |
| `panels` | `array` | Created panels with assigned IDs. |
| `permissions` | `array` | Permission entries applied to the dashboard. |

**Example:**

```json
{
  "id": 1,
  "title": "Service Overview",
  "variables": [],
  "panels": [
    {
      "id": 1,
      "type": "linechart",
      "title": "Request Rate",
      "layout": { "x": 0, "y": 0, "w": 6, "h": 4 },
      "config": {
        "query": "",
        "unit": "number",
        "queries": [
          {
            "title": "Requests",
            "query": "sum(rate(cube_apm_calls_total[5m]))",
            "unit": "number",
            "formula": "last"
          }
        ],
        "legend": { "label": "", "formula": "last", "pos": "bottom" }
      },
      "dashboardId": 1
    }
  ],
  "permissions": []
}
```

### Get Dashboards

**Endpoint:** `GET` `http://<cubeapm-admin-host>:3199/api/dashboards/api/v1/dashboards`

#### Curl Examples & Response Format {#get-dashboard-curl-and-response}

<Tabs>

  <TabItem value="single" label="Get Single Dashboard by ID">

**Request:**

```bash
curl -X GET "http://<cubeapm-admin-host>:3199/api/dashboards/api/v1/dashboards?id=1" \
     -H "Authorization: Bearer <ADMIN_TOKEN>"
```

**Response:**

Returns a single dashboard object with its panels:

```json
{
  "id": 1,
  "title": "Service Overview",
  "variables": [],
  "panels": [
    {
      "id": 1,
      "type": "linechart",
      "title": "Request Rate",
      "layout": { "x": 0, "y": 0, "w": 6, "h": 4 },
      "config": {
        "query": "",
        "unit": "number",
        "queries": [
          {
            "title": "Requests",
            "query": "sum(rate(cube_apm_calls_total[5m]))",
            "unit": "number",
            "formula": "last"
          }
        ],
        "legend": { "label": "", "formula": "last", "pos": "bottom" }
      },
      "dashboardId": 1
    }
  ],
  "permission": "admin"
}
```

  </TabItem>

  <TabItem value="all" label="Get All Dashboards">

**Request:**

```bash
curl -X GET "http://<cubeapm-admin-host>:3199/api/dashboards/api/v1/dashboards" \
     -H "Authorization: Bearer <ADMIN_TOKEN>"
```

**Response:**

Returns a JSON array of dashboard objects. The list endpoint does not include panel details (panels array is empty); use the single-dashboard endpoint to fetch panels.

```json
[
  {
    "id": 1,
    "title": "Service Overview",
    "variables": [],
    "panels": [],
    "permission": "admin"
  }
]
```

  </TabItem>

</Tabs>

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `integer` | Unique identifier for the dashboard. |
| `title` | `string` | Dashboard title. |
| `variables` | `array` | Dashboard template variables. |
| `panels` | `array` | Panels on the dashboard (populated only in single-dashboard GET). |
| `permission` | `string` | Effective access level of the requesting user (`viewer`, `editor`, `admin`). |

### Update Dashboard

**Endpoint:** `PUT` `http://<cubeapm-admin-host>:3199/api/dashboards/api/v1/dashboards`

Updates dashboard metadata (title, variables) and panel layouts. To add, update, or remove panel content, use the [Panels API](#panels).

:::warning
The `PUT` request updates the dashboard's `title`, `variables`, and `permissions`. For panels included in the payload, only the `layout` field is updated on existing panels — panel `type`, `title`, and `config` are not changed via this endpoint.
:::

#### Curl Example {#update-dashboard-curl}

```bash
curl -X PUT "http://<cubeapm-admin-host>:3199/api/dashboards/api/v1/dashboards" \
     -H "Authorization: Bearer <ADMIN_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{
           "id": 1,
           "title": "Service Overview (Updated)",
           "variables": [],
           "panels": [
             {
               "id": 1,
               "layout": { "x": 0, "y": 0, "w": 12, "h": 4 }
             }
           ],
           "permissions": []
         }'
```

Returns `204 No Content` on success.

### Delete Dashboard

**Endpoint:** `DELETE` `http://<cubeapm-admin-host>:3199/api/dashboards/api/v1/dashboards?id={id}`

Soft-deletes a dashboard and its associated resource permissions.

```bash
curl -X DELETE "http://<cubeapm-admin-host>:3199/api/dashboards/api/v1/dashboards?id=1" \
     -H "Authorization: Bearer <ADMIN_TOKEN>"
```

Returns `204 No Content` on success.

---

## Panels

Panels can be managed individually after a dashboard is created.

### Panel Object

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `integer` | Panel ID (required for `PUT`/`DELETE`, omit for `POST`). |
| `type` | `string` | Panel type. See [Panel Types](#panel-types). |
| `title` | `string` | **Required.** Display title for the panel. |
| `layout` | `object` | Grid position: `x`, `y`, `w`, `h`. |
| `config` | `object` | Panel-specific configuration (queries, legend, etc.). |

#### Panel Types {#panel-types}

| Type | Description |
| :--- | :--- |
| `linechart` | Time-series line chart |
| `scorecard` | Single-value metric display |
| `table` | Tabular data |
| `logs` | Log viewer panel |
| `markdown` | Static markdown text |
| `bar_horizontal` | Horizontal bar chart |
| `pie` | Pie chart |
| `treemap` | Treemap visualization |

#### Panel Config

Each panel has a `config` object. Most query-based panels use a `queries` array (preferred) or a top-level `query` field. Common fields:

| Field | Type | Description |
| :--- | :--- | :--- |
| `queries` | `array` | List of query objects. Each item supports `title`, `query`, `unit`, `formula` (`last`, `avg`, `sum`), and optional `datasource`. |
| `query` | `string` | Legacy single-query fallback (used only when `queries` is empty). Prefer `queries`. |
| `unit` | `string` | `number` or `time`. |
| `legend` | `object` | `label` (string or array), `formula` (`last`, `avg`, `sum`), `pos` (`none`, `bottom`, `right`). |
| `stack` | `boolean` | (linechart) Stack series. |
| `showSearch` | `boolean` | (table, logs) Show search bar. |
| `defaultSortCol` | `integer` | (table) Column index to sort by default. |
| `logs` | `object` | (logs) Display options — `showFieldsSelector`, `showAllFields`, `showMenu`, `showText`, `showStream`, `loadOnScroll`. |
| `markdown` | `object` | (markdown) `text` and optional `fontSize`. |

#### Panel Type Examples {#panel-type-examples}

<Tabs>

  <TabItem value="linechart" label="Line Chart" default>

```json
{
  "type": "linechart",
  "title": "Request Rate",
  "layout": { "x": 0, "y": 0, "w": 6, "h": 4 },
  "config": {
    "query": "",
    "unit": "number",
    "queries": [
      {
        "title": "Requests",
        "query": "sum(rate(cube_apm_calls_total[5m]))",
        "unit": "number",
        "formula": "last"
      }
    ],
    "legend": { "label": "", "formula": "last", "pos": "bottom" },
    "stack": false
  }
}
```

  </TabItem>

  <TabItem value="scorecard" label="Scorecard">

```json
{
  "type": "scorecard",
  "title": "Avg Latency",
  "layout": { "x": 0, "y": 0, "w": 3, "h": 2 },
  "config": {
    "query": "",
    "unit": "number",
    "queries": [
      {
        "title": "Latency",
        "query": "sum(rate(cube_apm_latency_total[5m])) / sum(rate(cube_apm_calls_total[5m]))",
        "unit": "time",
        "formula": "avg"
      }
    ],
    "legend": { "label": "", "formula": "last", "pos": "none" }
  }
}
```

  </TabItem>

  <TabItem value="table" label="Table">

```json
{
  "type": "table",
  "title": "Top Services",
  "layout": { "x": 0, "y": 0, "w": 6, "h": 4 },
  "config": {
    "query": "",
    "unit": "number",
    "queries": [
      {
        "title": "Calls",
        "query": "topk(10, sum by (service) (rate(cube_apm_calls_total[5m])))",
        "unit": "number",
        "formula": "last"
      }
    ],
    "legend": { "label": [{ "label": "service" }], "formula": "last", "pos": "none" },
    "showSearch": true,
    "defaultSortCol": 1
  }
}
```

  </TabItem>

  <TabItem value="logs" label="Logs">

```json
{
  "type": "logs",
  "title": "Error Logs",
  "layout": { "x": 0, "y": 0, "w": 12, "h": 6 },
  "config": {
    "query": "",
    "unit": "number",
    "queries": [
      {
        "title": "Errors",
        "query": "{env=\"production\"} severity=\"ERROR\"",
        "unit": "number",
        "datasource": "vlogs",
        "formula": "last"
      }
    ],
    "legend": { "label": [{ "label": "service.name" }], "formula": "last", "pos": "none" },
    "showSearch": true,
    "logs": {
      "showFieldsSelector": true,
      "showAllFields": false,
      "showMenu": true,
      "showText": true,
      "showStream": true,
      "loadOnScroll": true
    }
  }
}
```

  </TabItem>

  <TabItem value="markdown" label="Markdown">

```json
{
  "type": "markdown",
  "title": "Notes",
  "layout": { "x": 0, "y": 0, "w": 6, "h": 2 },
  "config": {
    "query": "",
    "unit": "number",
    "legend": { "label": "", "formula": "last", "pos": "none" },
    "markdown": {
      "text": "# Service Overview\n\nThis dashboard monitors production services.",
      "fontSize": 14
    }
  }
}
```

  </TabItem>

  <TabItem value="bar_horizontal" label="Horizontal Bar">

```json
{
  "type": "bar_horizontal",
  "title": "Errors by Service",
  "layout": { "x": 0, "y": 0, "w": 6, "h": 4 },
  "config": {
    "query": "",
    "unit": "number",
    "queries": [
      {
        "title": "Errors",
        "query": "topk(10, sum by (service) (rate(cube_apm_errors_total[5m])))",
        "unit": "number",
        "formula": "sum"
      }
    ],
    "legend": { "label": "service", "formula": "last", "pos": "none" }
  }
}
```

  </TabItem>

  <TabItem value="pie" label="Pie Chart">

```json
{
  "type": "pie",
  "title": "Traffic by Service",
  "layout": { "x": 0, "y": 0, "w": 4, "h": 4 },
  "config": {
    "query": "",
    "unit": "number",
    "queries": [
      {
        "title": "Calls",
        "query": "sum by (service) (rate(cube_apm_calls_total[5m]))",
        "unit": "number",
        "formula": "sum"
      }
    ],
    "legend": { "label": "service", "formula": "last", "pos": "none" }
  }
}
```

  </TabItem>

  <TabItem value="treemap" label="Treemap">

```json
{
  "type": "treemap",
  "title": "Latency by Endpoint",
  "layout": { "x": 0, "y": 0, "w": 6, "h": 4 },
  "config": {
    "query": "",
    "unit": "number",
    "queries": [
      {
        "title": "Latency",
        "query": "sum by (endpoint) (rate(cube_apm_latency_total[5m]))",
        "unit": "time",
        "formula": "sum"
      }
    ],
    "legend": { "label": "endpoint", "formula": "last", "pos": "none" }
  }
}
```

  </TabItem>

</Tabs>

#### Layout Object

| Field | Type | Description |
| :--- | :--- | :--- |
| `x` | `integer` | Column position in the grid. |
| `y` | `integer` | Row position in the grid. |
| `w` | `integer` | Width in grid units. |
| `h` | `integer` | Height in grid units. |

### Create Panel

**Endpoint:** `POST` `http://<cubeapm-admin-host>:3199/api/dashboards/api/v1/panels?dashboard_id={id}`

```bash
curl -X POST "http://<cubeapm-admin-host>:3199/api/dashboards/api/v1/panels?dashboard_id=1" \
     -H "Authorization: Bearer <ADMIN_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{
           "type": "scorecard",
           "title": "Error Rate",
           "layout": { "x": 6, "y": 0, "w": 3, "h": 2 },
           "config": {
             "query": "",
             "unit": "number",
             "queries": [
               {
                 "title": "Errors",
                 "query": "sum(rate(cube_apm_errors_total[5m]))",
                 "unit": "number",
                 "formula": "last"
               }
             ],
             "legend": { "label": "", "formula": "last", "pos": "none" }
           }
         }'
```

### Update Panel

**Endpoint:** `PUT` `http://<cubeapm-admin-host>:3199/api/dashboards/api/v1/panels?dashboard_id={id}`

:::warning
Panel `type` cannot be changed after creation. Include the full panel object with the existing `id` and `type`.
:::

```bash
curl -X PUT "http://<cubeapm-admin-host>:3199/api/dashboards/api/v1/panels?dashboard_id=1" \
     -H "Authorization: Bearer <ADMIN_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{
           "id": 2,
           "type": "scorecard",
           "title": "Error Rate (Updated)",
           "layout": { "x": 6, "y": 0, "w": 4, "h": 2 },
           "config": {
             "query": "",
             "unit": "number",
             "queries": [
               {
                 "title": "Errors",
                 "query": "sum(rate(cube_apm_errors_total[5m]))",
                 "unit": "number",
                 "formula": "last"
               }
             ],
             "legend": { "label": "", "formula": "last", "pos": "none" }
           }
         }'
```

Returns `204 No Content` on success.

### Delete Panel

**Endpoint:** `DELETE` `http://<cubeapm-admin-host>:3199/api/dashboards/api/v1/panels?dashboard_id={dashboard_id}&id={panel_id}`

```bash
curl -X DELETE "http://<cubeapm-admin-host>:3199/api/dashboards/api/v1/panels?dashboard_id=1&id=2" \
     -H "Authorization: Bearer <ADMIN_TOKEN>"
```

Returns `204 No Content` on success.

---

## Dashboard Variables {#dashboard-variables}

Variables let dashboards accept dynamic filters (e.g., environment, service name). Reference them in panel queries using `{{variable_name}}` syntax — CubeAPM substitutes the user's selected value at query time.

| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | Variable identifier. Referenced in queries as `{{name}}`. |
| `options` | `array` | List of selectable values (for static variables). |
| `label` | `string` | (Optional) Metric/log/trace label to auto-discover options from. |
| `match` | `string` | (Optional) Regex filter when discovering options from a label. |
| `datasource` | `string` | (Optional) `prometheus`, `vlogs`, or `traces`. Required when `label` is set. |
| `selection` | `string` | `single` or `multiple`. |
| `initialValue` | `object` | (Optional) Default selection: `{ "items": ["value"] }`. For multiple selection, include multiple items. |

:::info
- Use `{{env}}` in queries to refer to the built-in environment picker (`cube:env` variable).
- Use `{[label]}` in queries to refer to a chart label value (e.g., `{[service]}`).
- For **single** selection on metrics queries, `{{service}}` becomes `="order"`.
- For **multiple** selection, it becomes `=~"order|payment"` (or `in(...)` for logs/traces).
:::

### Example: Dashboard with Variables

The example below creates a dashboard with `env` and `service` variables, and a line chart panel that filters by both:

```bash
curl -X POST "http://<cubeapm-admin-host>:3199/api/dashboards/api/v1/dashboards" \
     -H "Authorization: Bearer <ADMIN_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{
           "title": "Service Dashboard",
           "variables": [
             {
               "name": "env",
               "label": "Environment",
               "options": ["production", "staging"],
               "selection": "single",
               "initialValue": { "items": ["production"] }
             },
             {
               "name": "service",
               "label": "Service",
               "options": ["order", "payment"],
               "selection": "single",
               "initialValue": { "items": ["order"] }
             }
           ],
           "panels": [
             {
               "type": "linechart",
               "title": "Request Rate",
               "layout": { "x": 0, "y": 0, "w": 6, "h": 4 },
               "config": {
                 "query": "",
                 "unit": "number",
                 "queries": [
                   {
                     "title": "Requests",
                     "query": "sum(rate(cube_apm_calls_total{env{{env}},service{{service}}}[5m]))",
                     "unit": "number",
                     "formula": "last"
                   }
                 ],
                 "legend": { "label": "", "formula": "last", "pos": "bottom" }
               }
             }
           ],
           "permissions": []
         }'
```

When `env` is `production` and `service` is `order`, the query above resolves to:

```
sum(rate(cube_apm_calls_total{env="production",service="order"}[5m]))
```

---

## How to Configure Role Based and Custom Permissions {#how-to-configure-role-based-and-custom-permissions}

The `permissions` array in the JSON payload controls who can view and edit a dashboard.

For global roles, teams, and how permissions work in the UI, see [Roles and Permissions](/configure/roles-and-permissions) and [Teams](/configure/teams).

#### 1. Role Based (Default)

When role-based access is used, the dashboard inherits the user's global workspace role (viewers can view, editors can edit).

Pass an empty array:

```json
{
  "...": "...",
  "permissions": []
}
```

#### 2. Custom

Grant specific roles (`viewer` or `editor`) to individual users (by email) or teams (by ID):

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

:::info
Custom permissions form an allowlist in the CubeAPM UI. Only listed users and teams can access the resource there. Effective permission is capped at the user's global role — a global `viewer` cannot edit even if granted `editor` on the resource.
:::

:::info
Admin Port APIs (port `3199`) bypass per-resource ACL. They can list, get, update, and delete all dashboards regardless of Custom permissions.
:::
