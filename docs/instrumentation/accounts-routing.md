---
slug: /instrumentation/routing
sidebar_position: 5
---

# Routing telemetry to an account

Every agent's config already has a field for its vendor credential — New Relic's `license_key`,
Datadog's `DD_API_KEY`, Elastic's `secret_token`, an OpenTelemetry exporter header. CubeAPM
doesn't check this value against the vendor; it only reads it to pick an account.

**No new config field is needed.** Generate a key from **Admin → Accounts → License keys** and
put it in the agent's existing field. Reusing whatever value is already there works too, but
only if it's unique to this agent — many installs leave it as a placeholder, and registering a
shared placeholder pulls every agent using it into the same account.

:::info
An unregistered key lands in **account 1**, the default account. Adding accounts never breaks a
running agent — it lands in account 1 until you register its key.
:::

---

## Agent credentials {#carriers}

| Agent | Credential field | Example |
| :--- | :--- | :--- |
| New Relic APM (all languages) | The `license_key` it's already configured with | `license_key: ABC4567890ABC4567890ABC4567890ABC4567890` |
| New Relic Log, Event and Metric API | The `X-License-Key` or `Api-Key` value it already sends | `Api-Key: ABC4567890ABC4567890ABC4567890ABC4567890` |
| New Relic Browser agent | The browser license key, in the beacon URL | `https://bam.nr-data.net/1/ABC4567890ABC4567890ABC4567890ABC4567890` |
| New Relic Lambda extension | The `X-License-Key` it's already configured with | `X-License-Key: ABC4567890ABC4567890ABC4567890ABC4567890` |
| Datadog Agent | The `DD_API_KEY` it's already configured with | `DD_API_KEY=<your_datadog_key>` |
| Elastic APM agents | The `secret_token` (or API key) it's already configured with | `ELASTIC_APM_SECRET_TOKEN=<secret_token>` |
| AWS Data Firehose | The `X-Amz-Firehose-Access-Key` header, set from the destination's access key | `X-Amz-Firehose-Access-Key: <value>` |
| OpenTelemetry (traces, metrics, logs) | A `x-cube-token` exporter header, set once | `OTEL_EXPORTER_OTLP_TRACES_HEADERS=x-cube-token=<account_key>` |
| Anything else | No key read. Lands in account 1 | N/A |

---

## Registering a key

1. Open **Admin → Accounts**, pick the account, then **License keys**.
2. **Generate a key** and copy it into the agent's credential field — the safe default. Only use
   **add an existing key** if that field already holds a value unique to this agent; a shared
   placeholder would pull every agent using it into this account.
3. Name the key so you know which agent or environment it belongs to.

A key already registered to another live account is rejected — revoke it there, or use a
different key. Deleting an account revokes its keys. Any admin of the
account can view and copy a registered key in full at any time, not just at creation.

**Revoking is permanent.** A revoked key can't be reactivated; an agent still sending it keeps
sending, but the data lands nowhere readable — re-key the agent instead.

---

## Verification {#verifying}

Check that data appears in the target account **and not** the default one — a misconfigured agent
looks identical to a working one if you only check the account you expect.

1. As a user in both accounts (a sys admin always is), open **APM** and switch to the target
   account. Confirm the service and its charts show data.
2. Switch to **Default**. Confirm the service is **not** listed there.

If it still shows up in Default, the registered key doesn't match what the agent actually sends.
Check each signal separately — traces and logs often use different agent settings.

:::info
Give ingestion a minute or two before checking; agents batch.
:::

---

## Troubleshooting {#troubleshooting}

| Symptom | Likely cause |
| :--- | :--- |
| Data lands in the default account instead of the target | Key not registered, or registered value doesn't match what the agent sends |
| A newly added key isn't routing yet on a multi-node install | Allow it a short delay to reach every node |
| Datadog traces never leave the default account | Tracer is pointed directly at CubeAPM via `DD_TRACE_AGENT_URL` — route through the Datadog Agent instead |
| OpenTelemetry ignores the registered account | Confirm the exporter's `x-cube-token` header is actually set |
| New Relic Browser data isn't routing | The key lives in the beacon URL, not a header — confirm it matches |
| Data lands in no account at all | The key was revoked — re-key the agent |
| A user can't see an account that has data | Ingest is fine; their account access isn't — see [Administration](/configure/roles-and-permissions#switching) |
| An account that used to work now errors | The account was deleted; data is retained but unreadable |
