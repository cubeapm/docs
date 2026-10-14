---
slug: /configure/roles-and-permissions
sidebar_position: 3
---

# Roles and Permissions

CubeAPM controls access at two levels:

| Layer | Scope |
| :--- | :--- |
| **Global role** | Entire workspace — metrics, logs, traces, alerts, dashboards, teams, etc. |
| **Resource permission** | A single alert or dashboard |

[Teams](/configure/teams) connect to resource permissions when you grant a team access to a
specific alert or dashboard.

:::info
With [accounts](/configure/accounts), users also have a role per account. The global role is their
role in the default account. See [Roles per account](#roles).
:::

```text
Global role (viewer / editor / admin)
        │
        ├──► Role Based resource → uses global role
        │
        └──► Custom resource → allowlist of users and teams
                    │
                    └──► Capped by global role
```

---

## Global roles {#global-roles}

Every user has a global role, assigned by an administrator or at signup via `auth.default-role`.

| Role | View data | Create / edit resources | Auth admin UI |
| :--- | :---: | :---: | :---: |
| **Viewer** | Yes | No | No |
| **Editor** | Yes | Yes | No |
| **Admin** | Yes | Yes | Yes |

Users with no role cannot access the workspace. Editor/Admin can also add or remove team members
(if they're a [team Admin](/configure/teams#team-member-roles)) and use the New Alert/Dashboard
flows.

### Configuration

| Parameter | Description |
| :--- | :--- |
| `auth.default-role` | Role assigned on signup. Default `viewer`. Values: `none`, `viewer`, `editor`, `admin`. |
| `auth.sys-admins` | Comma-separated emails of sys admins. Only they can create/delete accounts and manage users, settings and stats. See [Sys admin vs account admin](#permissions). |

---

## Per-resource permissions

Alerts and dashboards can have their own view/edit permissions: **Role Based** (default) or
**Custom**. Set them in the **Permissions** section.

### Role Based (default) {#role-based}

Access follows global role: **Viewer** → view, **Editor**/**Admin** → view and edit.

### Custom {#custom}

Grants **Viewer** or **Editor** on one resource to specific users (by email) or [teams](/configure/teams). Custom permissions are an **allowlist** — only listed users/teams get access, including global admins.

:::warning
Before switching a resource to Custom, add yourself or your team, or you'll lose access.
:::

### Effective permission

1. **Role Based** — effective permission = global role.
2. **Custom** — highest matching grant (direct or via team), capped by global role.
3. Not listed under Custom → **no access**.

**Examples** (Custom permissions on dashboard X):

| User | Global role | Custom entry on X | Effective on X |
| :--- | :--- | :--- | :--- |
| Alice | Editor | User → Editor | Editor |
| Bob | Editor | User → Viewer | Viewer |
| Carol | Viewer | User → Editor | Viewer (capped) |
| Dave | Editor | Team SRE → Viewer | Viewer |
| Eve | Admin | *(not listed)* | No access |

| Action | Required effective permission |
| :--- | :--- |
| View | Viewer, Editor, or Admin |
| Edit / delete | Editor or Admin |

Creating a **new** alert or dashboard requires global Editor/Admin; resource permissions apply
once it's saved.

---

## Setting permissions {#setting-permissions}

1. Alert: **Mutes & Permissions** step in the wizard. Dashboard: **Permissions** section.
2. Choose **Role Based** or **Custom**; for Custom, add user/team entries with Viewer or Editor.
3. Save.

**Create:** global Editor/Admin. **See it after save:** effective Viewer+. **Edit/delete:**
effective Editor+.

Programmatic access: [Alert Rules API](/http-apis/alerts/alert-rules#how-to-configure-role-based-and-custom-permissions), [Dashboards API](/http-apis/dashboards#how-to-configure-role-based-and-custom-permissions).

---

## Common scenarios

- **Everyone with Editor manages all dashboards** — leave Role Based everywhere.
- **Restrict a dashboard to one team** — [create a team](/configure/teams#creating-a-team-in-the-ui), set Custom, grant it Viewer/Editor.
- **One user views but can't edit an alert** — Custom, grant that user Viewer.
- **Share an alert with a team read-only** — Custom, grant the team Viewer.

---

## Accounts

Manage accounts from **Admin** (`/admin`) in the left nav.

![The Admin page's Accounts tab, with the account switcher, member list and Join/Leave controls](/img/accounts/admin-accounts-tab.png)

### Sys admin vs account admin {#permissions}

- **Sys admin**: email listed in `auth.sys-admins`. Creates and deletes accounts, manages users,
  settings and stats, and is admin of every account.
- **Account admin**: `admin` role in one account. Manages that account only. An admin of the
  default account isn't a sys admin.

| Action | Sys admin | Account admin | Others |
| :--- | :---: | :---: | :---: |
| Create / delete an account | Yes | No | No |
| Rename / staff an account | Yes | Own accounts | No |
| Join or leave an account | Yes | Own accounts | No |
| Reach the Admin page | Yes | Yes | No |
| Manage users, settings, stats | Yes | No | No |
| Read an account's data | Own accounts | Own accounts | Assigned accounts |

:::caution
If `auth.sys-admins` is empty, no one can create accounts or users.
:::

| Admin tab | Visible to |
| :--- | :--- |
| Accounts, Audit Logs | Account admins |
| Users | Account admins. Password reset, MFA and delete are sys admin only |
| Settings, Stats, Signin Audit Logs | Sys admins |

### Creating an account

Requires sys admin. **Admin → Accounts → New**, enter a name. You become its first admin.

- **Rename**: edit icon. The account number doesn't change.
- **Join / Leave**: on each account row. You can't leave if you're the only admin.
- **Delete**: sys admin only. The default account can't be deleted.

:::caution
Deleting an account doesn't stop its alert rules, synthetic monitors or agents. Remove the rules
and monitors and move the agents to another account's key first.
:::

### Assigning users to accounts

1. **Admin**, select the account in the switcher at the top of the tabs, **Users** tab.
2. Add a user and pick their role in this account.

You can also assign accounts on the invite form. Every account must keep at least one admin.

To block a user everywhere, disable them (Status switch, sys admin only). This ends their sessions.

### License keys

License keys route agent data to an account. See [Routing telemetry](/configure/accounts/routing).

![The License keys screen: generate a new key or add an existing one, with the key list below](/img/accounts/license-keys-modal.png)

:::info
Audit Logs record full key values. Restrict Audit Log access accordingly.
:::

### Roles per account {#roles}

```text
Global role (viewer / editor / admin)
        │
        └──► Per-account role (viewer / editor / admin)
                    │
                    ├──► Role Based resource → uses the account role
                    │
                    └──► Custom resource → allowlist of users and teams
```

| Role in an account | View data | Create / edit resources | Manage members |
| :--- | :---: | :---: | :---: |
| Viewer | Yes | No | No |
| Editor | Yes | Yes | No |
| Admin | Yes | Yes | Yes |

Non-members have no access.

#### Global role fallback

The global role is the user's role in the default account.

| Situation | Effective access |
| :--- | :--- |
| Never assigned to any account | Default account at their global role |
| Assigned to accounts 2 and 3 | Default account at global role, plus 2 and 3 at their given roles |
| Global role is `none` | No default-account access, regardless of other assignments |
| No role set at all | `auth.default-role` |
| Sys admin | Admin of every account, including future ones |

- Upgrading changes no one's access.
- Global role `none` only removes default-account access. To block a user everywhere, disable them.
- A global admin isn't an admin of other accounts unless assigned.

### Switching accounts in the UI {#switching}

Users in more than one account get an account switcher in the left nav and at the top of the Admin
tabs.

![The account switcher at the foot of the left navigation rail](/img/accounts/account-switcher.png)

- Switching reloads the page.
- The selection is per browser tab. A new tab opens on Default.
- If you lose access to the current account, the UI switches back to Default.

To check a user's access, sign in as them and confirm the switcher lists their accounts. If an
account shows but its pages are empty, check [Routing telemetry](/configure/accounts/routing).

### Auditing

Account, member and license key changes are logged with actor and before/after values in the
**Audit Logs** tab.

### Limitations {#limitations}

- Notification channels (Slack, PagerDuty, email, etc.) are shared by all accounts. Alert rules,
  silences and alert history are per account. For separate notification credentials per tenant,
  use separate installations.
- Deleting an account doesn't stop its alert rules or synthetic monitors.

---

## Related documentation

- [Accounts](/configure/accounts) — multi-account setup
- [Teams](/configure/teams) — create and manage teams
- [Alert Rules API](/http-apis/alerts/alert-rules) — permissions via API
- [Dashboards API](/http-apis/dashboards) — permissions via API
- [Configure CubeAPM](/configure)
