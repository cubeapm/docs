---
sidebar_position: 5
slug: /configure/alerting/connect-with-pagerduty
---

# Connect with PagerDuty

CubeAPM supports two ways to integrate PagerDuty - **App Integration** and **Webhooks**. App Integration is the recommended way, as it is easier to use. However, it supports integration with only one PagerDuty account. For integrating with multiple PagerDuty accounts, Webhooks should be used.

## Pagerduty App Integration

To enable sending alert notifications to PagerDuty, you need to create an app in your PagerDuty account. The following steps guide you through the process:

1. Login to your PagerDuty account and go to **Integrations → App Registration**.
2. Click on **Create New App** button.
3. On the next screen, fill `CubeAPM` for App Name, `PagerDuty integration for CubeAPM` for Description, and then click on **Save** button.
4. On the next page, look for **Events Integration** section, and click on **Add** button there.
5. On the next page, look for **Simple Install Flow**, and input `<cube_apm_address>/` (e.g. https://cubeapm.yourdomain.com/) for **Redirect URLs**.
6. Upon filling **Redirect URLs** as above, **Integration Setup URL** will appear below it.
7. The value of **Integration Setup URL** will contain a URL parameter named **app_id**. Copy the value of app_id (something like AB12XYZ).
8. Click on **Save** button at the bottom of the page.
9. The above app_id can be provided to CubeAPM to enable sending alert notifications to PagerDuty (set `alertmanager.oauth.pagerduty.app-id` property in `/etc/cubeapm/config.properties`, or `configVars.alertmanager.oauth.pagerduty.appId` in helm chart values file).

## Integrate via Webhooks

To enable sending alert notifications to PagerDuty via Webhooks, you need to create a service in your PagerDuty account. The following steps guide you through the process:

1. Login to your PagerDuty account and go to **Services → Service Directory**.
2. If you are using existing service which has **Events API V2**, you can find relevant details under integration tab and directly skip to step 9.
3. Click on **New Service** button.
4. On the next screen, fill `CubeAPM` for Service Name, `PagerDuty Webhook integration for CubeAPM` for Description, and then click on **Save** button.
5. On the next page, assign Escalation Policy, you can generate a new escalation ploicy or select already defined one.
6. On the next page, you can leave AI Ops as is, or define as per organisation requirements. 
7. On the next page, look for **Integration** section, select **Events API V2** and click on **Create Service** button there.
8. Once service gets created, you will see all details required for integration.
9. When creating alert in CubeAPM, select **Webhook** as receiver. Put **Integration URL (Alert Events)** in Webhook URL and use payload as defined below. In payload replace `<Integration Key>` with the value of **Integration Key** of the PagerDuty service.

```
{
  "payload": {

      "summary": "{{ if .CommonLabels.severity }}[{{ .CommonLabels.severity | toUpper }}] {{ end }}[{{ .Status | toUpper }}{{ if eq .Status "firing" }}:{{ .Alerts.Firing | len }}{{ end }}] {{ if ne .CommonLabels.env "UNSET" }}{{ .CommonLabels.env }}{{ end }} {{ or .CommonAnnotations.alertname .CommonLabels.alertname }}",
      "severity": "{{ if eq .CommonLabels.severity "critical" }}critical{{ else if eq .CommonLabels.severity "warning" }}warning{{ else }}info{{ end }}",
    "source": "CubeAPM",
    "custom_details": {
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
      "cubeImageURL": "{{ .CubeImageURL }}"
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
  }
}
  },
  "routing_key": "<Integration Key>",
"event_action": "{{ if eq .Status "firing" }}trigger{{ else }}resolve{{ end }}",
"client": "CubeAPM",
  "client_url": "{{ .ExternalURL }}/alerts/{{ .GroupLabels.rule_id | urlquery }}",
"dedup_key": "{{ .GroupKeyHash }}"
}
```