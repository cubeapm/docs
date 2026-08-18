---
sidebar_position: 10
slug: /configure/alerting/connect-with-zenduty
---

# Connect with Zenduty

To enable sending alert notifications from CubeAPM to Zenduty, you need to create an Integration within your Zenduty team. The following steps guide you through the process:

1. Go to **Teams** on Zenduty and click on the team you want to add the integration to.

1. Next, go to **Services** and click on the relevant Service.

1. Go to **Integrations** and then **Add Incoming Integration**. Select **Generic Integration** from the list of integrations. Give it a name (e.g. CubeAPM) and fill other details as appropriate. Then click **Add Integration** to save the details.

1. Go to **Configure** under the newly added integration and copy the Webhook URL generated.

When creating alerts in CubeAPM, choose **Webhook** in **Receiver Type** and paste the copied Webhook URL in the **Webhook URL** field. Fill the following in the **Payload** field.

:::info
You can customize the payload to suit your requirement as per https://zenduty.com/docs/generic-integration/
:::

```
{
  "message": "This becomes the incident title",
  "summary": "This is the incident summary",
  "alert_type": "{{ if eq .Status "firing" }}critical{{ else }}resolved{{ end }}",
  "entity_id": "{{ .GroupKeyHash }}",
  "payload": {
    "receiver": "{{ .Receiver }}",
    "status": "{{ .Status }}",
    "alerts": [
      {{- $alertsComma := "" }}
      {{- range .Alerts }}
      {{- $alertsComma }}
      {
        "status": "{{ .Status }}",
        "labels": {
          {{- $comma := "" }}
          {{- range .Labels.SortedPairs }}
          {{- $comma }}
          {{ printf "%q: %q" (.Name) (.Value) }}
          {{- $comma = "," }}
          {{- end }}
        },
        "annotations": {
          {{- $comma := "" }}
          {{- range .Annotations.SortedPairs }}
          {{- $comma }}
          {{ printf "%q: %q" (.Name) (.Value) }}
          {{- $comma = "," }}
          {{- end }}
        },
        "startsAt": "{{ printf "%s" (.StartsAt.MarshalText) }}",
        "endsAt": "{{ printf "%s" (.EndsAt.MarshalText) }}",
        "generatorURL": "{{ .GeneratorURL }}",
        "fingerprint": "{{ .Fingerprint }}",
        "cubeImageURL": "{{ .CubeImageURL }}",
        "cubeSampleLog": "{{ .CubeSampleLog }}"
      }
      {{- $alertsComma = "," }}
      {{- end }}
    ],
    "groupLabels": {
      {{- $comma := "" }}
      {{- range .GroupLabels.SortedPairs }}
      {{- $comma }}
      {{ printf "%q: %q" (.Name) (.Value) }}
      {{- $comma = "," }}
      {{- end }}
    },
    "commonLabels": {
      {{- $comma := "" }}
      {{- range .CommonLabels.SortedPairs }}
      {{- $comma }}
      {{ printf "%q: %q" (.Name) (.Value) }}
      {{- $comma = "," }}
      {{- end }}
    },
    "commonAnnotations": {
      {{- $comma := "" }}
      {{- range .CommonAnnotations.SortedPairs }}
      {{- $comma }}
      {{ printf "%q: %q" (.Name) (.Value) }}
      {{- $comma = "," }}
      {{- end }}
    },
    "externalURL": "{{ .ExternalURL }}",
    "groupKeyHash": "{{ .GroupKeyHash }}",
    "incidentTime": "{{ printf "%s" (.IncidentTime.MarshalText) }}",
    "notifyTime": "{{ printf "%s" (.NotifyTime.MarshalText) }}"
  }
}
```
