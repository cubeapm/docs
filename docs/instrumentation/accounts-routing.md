---
slug: /instrumentation/routing
sidebar_position: 5
---

# Routing telemetry to an account

CubeAPM picks the account from the credential the agent already sends (see the table below).

1. Generate a key at **Admin → Accounts → License keys**.
2. Set it in the agent's credential field.

Telemetry with an unregistered key goes to the default account (account 1).

---

## Agent credentials {#carriers}

| Agent | Credential field | Example |
| :--- | :--- | :--- |
| New Relic APM (all languages) | `license_key` | `license_key: ABC4567890ABC4567890ABC4567890ABC4567890` |
| New Relic Log, Event and Metric API | `X-License-Key` or `Api-Key` header | `Api-Key: ABC4567890ABC4567890ABC4567890ABC4567890` |
| New Relic Browser agent | License key in the beacon URL | `https://bam.nr-data.net/1/ABC4567890ABC4567890ABC4567890ABC4567890` |
| New Relic Lambda extension | `X-License-Key` | `X-License-Key: ABC4567890ABC4567890ABC4567890ABC4567890` |
| Datadog Agent | `DD_API_KEY` | `DD_API_KEY=<your_datadog_key>` |
| Elastic APM agents | `secret_token` or API key | `ELASTIC_APM_SECRET_TOKEN=<secret_token>` |
| AWS Data Firehose | `X-Amz-Firehose-Access-Key` header | `X-Amz-Firehose-Access-Key: <value>` |
| OpenTelemetry (traces, metrics, logs) | `x-cube-token` exporter header | `OTEL_EXPORTER_OTLP_TRACES_HEADERS=x-cube-token=<account_key>` |
| Anything else | None. Goes to account 1 | N/A |

---

## Registering a key

1. **Admin → Accounts**, select the account, **License keys**.
2. **Generate a key** or **Add existing key**.
3. Name the key.

- All agents that send the same key go to the same account.
- A key can belong to only one account.
- Account admins can view and copy keys at any time.
- Deleting an account revokes its keys.
- Revoked keys can't be restored. Data sent with a revoked key isn't visible in any account.

---

## Verification {#verifying}

Wait a minute or two for agents to flush, then:

1. In **APM**, switch to the target account. The service should be listed.
2. Switch to **Default**. The service should not be listed.

If the service is still in Default, the agent isn't sending a registered key. Traces, metrics and
logs can use different credential settings, so check each.

---

## Troubleshooting {#troubleshooting}

| Symptom | Likely cause |
| :--- | :--- |
| Data goes to the default account instead of the target | Key not registered, or the agent sends a different key |
| A new key isn't routing yet on a multi-node install | New keys take a short time to reach every node |
| Datadog traces always go to the default account | Tracer sends directly to CubeAPM via `DD_TRACE_AGENT_URL`. Send through the Datadog Agent |
| OpenTelemetry data goes to the default account | The exporter's `x-cube-token` header isn't set |
| New Relic Browser data isn't routing | The key in the beacon URL doesn't match |
| Data doesn't show in any account | The key was revoked. Use a new key |
| A user can't see an account that has data | The user isn't a member of that account. See [Roles and Permissions](/configure/roles-and-permissions#switching) |
| An account that used to work now errors | The account was deleted. Its data is kept until retention but can't be read |
