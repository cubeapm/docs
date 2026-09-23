---
slug: /configure/accounts
sidebar_position: 4
---

# Multiple Accounts

If you want to separate telemetry data across multiple tenants — different clients, teams or
business units — create an account per tenant. Data, dashboards, alerts and permissions in one
account are invisible to every other account.

Account `1` is the default, and exists in every install.

:::info
Single tenant: nothing to do. Data stays in account 1, no switcher appears.
:::

---

## Data isolation

| Data | Separated by account |
| :--- | :---: |
| Metrics, logs, traces, mobile | Yes |
| Dashboards, alert rules, SLOs, synthetic monitors | Yes |
| Teams and resource permissions | Yes |
| Users | No, shared across every account |
| Notification-channel credentials (email, Slack, PagerDuty, etc.) | No, see [limitations](/configure/roles-and-permissions#limitations) |

Users are shared on purpose: one person can be an admin of one account and a viewer of another
without a duplicate entry. [Teams](/configure/teams) belong to the account they were created in.

---

## Setup

**Telemetry routing.** Every agent already authenticates with a credential — a license key, an
API key, a secret token. Register it against an account from **Admin → Accounts → License keys**,
or generate a new one there and use it in the agent's config. Details:
[Routing telemetry](/instrumentation/routing). An unregistered key lands in account 1.

**User access.** Assign users to accounts, with a role per account, from **Admin → Accounts**.
Users in more than one account get a switcher in the nav rail. Details:
[Roles and Permissions](/configure/roles-and-permissions#accounts).

Order doesn't matter — set up either one first.

---

## Account 1, the default account {#default-account}

Account 1 isn't provisioned like the ones you create:

- Named **Default**, cannot be renamed or deleted
- **Every user is already a member**, at their [global role](/configure/roles-and-permissions#global-roles)
- **Its admins are ordinary account admins, not installation admins** — creating accounts and
  managing users install-wide is reserved for sys admins (`auth.sys-admins`), see
  [sys admin vs account admin](/configure/roles-and-permissions#permissions)
- Unregistered telemetry lands here
- On upgrade, every existing user, dashboard, alert and data point is already in it — adopting
  accounts changes nobody's access and moves no data

---

## Account numbering

Ids are assigned by CubeAPM, never chosen, and **never reused** — a new account always gets a
number higher than any ever issued, including deleted ones. Deleting account 4 and creating
another gives you 5, never 4 again.

**Deleting an account doesn't delete its data.** It disappears from the UI and every member's
list, and its stored telemetry becomes unreadable, but stays around until it ages out of your
retention period. This prevents a recycled id from surfacing a previous tenant's data in a new
tenant's dashboards.

:::caution
Account `0` isn't valid — it's the sentinel for telemetry CubeAPM couldn't resolve to any account
(e.g. a revoked license key). You never set this yourself; if you see data there, check
[Routing telemetry](/instrumentation/routing).
:::

---

## Next steps

- [Roles and Permissions](/configure/roles-and-permissions#accounts) — create accounts, assign users, set per-account roles
- [Routing telemetry](/instrumentation/routing) — point each agent at an account
