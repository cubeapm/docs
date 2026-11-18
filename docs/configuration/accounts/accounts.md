---
slug: /configure/accounts
---

# Multiple Accounts

If you want to separate telemetry across tenants (clients, teams, business units), create an account
per tenant. An account's data, dashboards, alerts and permissions are visible only inside that
account.

Account 1 (**Default**) exists in every install. With a single tenant there's nothing to set up.

---

## Data isolation

| Data | Separated by account |
| :--- | :---: |
| Metrics, logs, traces, mobile | Yes |
| Dashboards, alert rules, SLOs, synthetic monitors | Yes |
| Teams and resource permissions | Yes |
| Users | No, shared across every account |
| Notification-channel credentials (email, Slack, PagerDuty, etc.) | No, see [limitations](/configure/roles-and-permissions#limitations) |

A user can have a different role in each account.

---

## Setup

1. Create the account: **Admin → Accounts → New**.
2. Route telemetry to it with a license key. See [Routing telemetry](/configure/accounts/routing).
3. Add users with a role. See [Roles and Permissions](/configure/roles-and-permissions#accounts).

---

## Default account {#default-account}

- Named **Default**. Can't be renamed or deleted.
- Every user is a member, with their [global role](/configure/roles-and-permissions#global-roles).
- Unregistered telemetry goes here.
- After an upgrade, all existing users, dashboards, alerts and data are here.
- Admins of the default account aren't sys admins. See
  [Sys admin vs account admin](/configure/roles-and-permissions#permissions).

---

## Account numbering

CubeAPM assigns account numbers. A number is never reused, even after the account is deleted.

Deleting an account hides its data. The data isn't deleted; it ages out with your retention period.

:::caution
Account `0` is reserved. Telemetry sent with a revoked key is stored there and can't be read.
:::

---

## Next steps

- [Roles and Permissions](/configure/roles-and-permissions#accounts) — create accounts, assign users, set per-account roles
- [Routing telemetry](/configure/accounts/routing) — point each agent at an account
