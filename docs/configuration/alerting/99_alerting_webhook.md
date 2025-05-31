---
sidebar_position: 99
slug: /configure/alerting/webhook
---

# Webhook for alerting

CubeAPM supports sending alert notifications to arbitrary webhooks. You can specify any URL and CubeAPM will send alert notifications to that URL via HTTP POST request with JSON payload. You can also specify custom HTTP headers to be sent with the request.

By default, the JSON payload is compatible with [Prometheus Alertmanager webhook payload format](https://prometheus.io/docs/alerting/latest/configuration/#webhook_config), which means that it can be used out-of-the-box with systems that support Prometheus AlertManager Webhooks, e.g., Zenduty.

If desired, you can customize the payload format by specifying a template to generate the payload. CubeAPM generates the payload from the template using the [Go Templating System](https://golang.org/pkg/text/template). For example, the following template generates a payload similar to the default payload.

:::info
Header values can also use templates
:::

```
{
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
  },
  "externalURL": "{{ .ExternalURL }}"
}
```
