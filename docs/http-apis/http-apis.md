---
slug: /http-apis
sidebar_position: 8
---

# HTTP APIs

CubeAPM supports HTTP APIs for various tasks. Broadly, the APIs can be grouped into ingestion (sending data to CubeAPM) and querying (fetching data from CubeAPM).

:::info
Ingestion APIs are available on port `3130`, and querying APIs are available on port `3140`. Alert and Dashboard management APIs are available on the Admin Port (default: `3199`).
:::

Please follow the links below for relevant API details.

- [Logs](logs.md)
- [Metrics](metrics.md)
- [Traces](traces.md)
- [Alerts](alerts/alert-rules.md)
- [Dashboards](dashboards.md)

With [Accounts](/configure/accounts), every API here reads from or writes to a single account. Ingestion APIs take the account from the license key the agent already sends; querying APIs take it from the `x-cube-account-id` header. An unregistered key uses the default account. See [Routing telemetry](/instrumentation/routing).

For how roles and per-resource permissions work in the UI, see [Roles and Permissions](/configure/roles-and-permissions). For teams, see [Teams](/configure/teams).
