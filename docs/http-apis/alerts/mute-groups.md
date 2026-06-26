---
slug: /http-apis/alerts/mute-groups
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Mute Groups (Snoozing)


Mute groups allow you to suppress notifications for specific time intervals.

## Authentication

These APIs can be accessed programmatically using the Admin Port `3199`.

**Headers Required:**
- (Optional) `Authorization: Bearer <ADMIN_TOKEN>`
- `Content-Type: application/json`

:::info
When `http-token-admin` is enabled in cubeapm’s `config.properties`, requests must include the same token in the `Authorization` header.
:::

### Create Mute Group

**Endpoint:** `POST` `http://<cubeapm-admin-host>:3199/api/alerts/api/v1/mutegroups`

#### Request Parameters {#create-mute-request-parameters}

| Parameter | Type | Description |
|---|---|---|
| `name` | `string` | A descriptive name for the snooze/mute schedule. |
| `mute.time_intervals` | `array` | A list of time intervals during which alerts should be suppressed. |
| `times` | `array` | Specifies the `start_time` (e.g., `"00:00"`) and `duration_minutes` for the mute. |
| `weekdays` | `array` | Optional. Days of the week this mute applies (e.g., `["saturday", "sunday"]`). |
| `location` | `string` | The timezone for evaluating the time (e.g., `"America/New_York"`, `"UTC"`). |

#### Curl Example {#create-mute-curl}

<Tabs>
  <TabItem value="weekend" label="Create Weekend Mute" default>

```bash
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
  <TabItem value="business" label="Create Business Hours Mute">

```bash
curl -X POST "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/mutegroups" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Working Hours Mute",
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
         }'
```

  </TabItem>
  <TabItem value="meeting" label="Create Weekly Meeting Mute">

```bash
curl -X POST "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/mutegroups" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Tuesday All-Hands",
           "mute": {
             "time_intervals": [
               {
                 "times": [
                   { "start_time": "10:00", "duration_minutes": 60 }
                 ],
                 "weekdays": ["tuesday"],
                 "location": "America/New_York"
               }
             ]
           }
         }'
```

  </TabItem>
</Tabs>

#### Response Format {#create-mute-response-format}

The response format is a JSON object. The JSON object has the following structure.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `integer` | Unique identifier for the mute group. |
| `name` | `string` | The descriptive name of the snooze/mute schedule. |
| `mute` | `object` | The saved configuration for the time intervals. |

**For example:**

```json
{
  "id": 1,
  "name": "Weekend Silence",
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
        "location": "America/New_York"
      }
    ]
  }
}
```

### Get Mute Groups

**Endpoint:** `GET` `http://<cubeapm-admin-host>:3199/api/alerts/api/v1/mutegroups`

#### Curl Example {#get-mute-curl}

Fetch all mute groups:
```bash
curl -X GET "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/mutegroups"
```

Fetch a specific mute group by ID:
```bash
curl -X GET "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/mutegroups?id=1"
```

#### Response Format {#get-mute-response-format}

The response format is a JSON array of mute group objects. See [Create Mute Group Response Format](#create-mute-response-format) for the schema structure.

**For example:**

```json
[
  {
    "id": 1,
    "name": "Weekend Silence",
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
          "location": "America/New_York"
        }
      ]
    }
  }
]
```

### Update / Delete Mute Groups

#### Update a Mute Group (PUT) {#update-mute-curl}

**Endpoint:** `PUT` `http://<cubeapm-admin-host>:3199/api/alerts/api/v1/mutegroups`

```bash
curl -X PUT "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/mutegroups" \
     -H "Content-Type: application/json" \
     -d '{
           "id": 1,
           "name": "Updated Mute Name",
           "mute": {
             "time_intervals": [
               {
                 "times": [
                   { "start_time": "00:00", "duration_minutes": 720 }
                 ],
                 "weekdays": ["sunday"],
                 "location": "UTC"
               }
             ]
           }
         }'
```

#### Delete a Mute Group (DELETE) {#delete-mute-curl}

**Endpoint:** `DELETE` `http://<cubeapm-admin-host>:3199/api/alerts/api/v1/mutegroups?id=1`

```bash
curl -X DELETE "http://<cubeapm-admin-host>:3199/api/alerts/api/v1/mutegroups?id=1"
```


### How to Snooze an Alert Rule

Once you have created a Mute Group, you can use it to snooze an alert for the specific schedule you defined. To apply the snooze:

1. Grab the `id` of the created Mute Group.
2. Use the `PUT /api/v1/rules` endpoint from the **Alert Rules API** to update your specific Alert Rule, adding the new Mute Group's `id` into the `config.mute_group_ids` array.

```json
{
  "id": 11,
  "name": "High CPU Usage",
  "status": "ACTIVE",
  "config": {
    "receiver_group_ids": [3],
    "mute_group_ids": [1] // <-- Add your Mute Group ID here to snooze it
  }
}
```
