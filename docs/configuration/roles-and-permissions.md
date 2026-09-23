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
Accounts add a third scope: a role **per account**. The global role above is the role a user
holds in the default account. See [Roles per account](#roles).
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
| `auth.sys-admins` | Comma-separated emails of the installation's administrators — the only ones who can create/delete accounts and manage users, settings and stats. See [who can do what](#permissions). |

---

## Per-resource permissions

Alerts and dashboards — not metrics, logs, traces or other features — support optional
permissions controlling who can view and edit that specific resource. Configured in the
**Permissions** section when creating or editing one: **Role Based** or **Custom**.

### Role Based (default) {#role-based}

Access follows global role: **Viewer** → view, **Editor**/**Admin** → view and edit.

### Custom {#custom}

Grants **Viewer** or **Editor** on one resource to specific users (by email) or [teams](/configure/teams). Custom permissions are an **allowlist** — only listed users/teams get access, including global admins.

:::warning
Switching a resource to Custom? Add yourself (or your team) first, or you may lose access to it.
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

Creating accounts, assigning users, managing license keys, and how per-account roles interact
with the [global role](#global-roles) a user already has.

Account management lives on the **Admin** page (`/admin`), reachable from the Admin item in the
left navigation rail.

![The Admin page's Accounts tab, with the account switcher, member list and Join/Leave controls](/img/accounts/admin-accounts-tab.png)

### Sys admin vs account admin {#permissions}

A **sys admin** is an email listed in the `auth.sys-admins` config parameter. Sys admins are the
installation's administrators: they create and delete accounts, manage users/settings/stats, and
are admin of every account including ones created later. This is the only source of install-wide
administration.

An **account admin** holds the `admin` role in one specific account, including the default one.
They can rename and staff that account and reach its Admin page — nothing wider. Being an admin
of the default account does **not** make you an installation admin.

| Action | Sys admin | Account admin | Others |
| :--- | :---: | :---: | :---: |
| Create / delete an account | Yes | No | No |
| Rename / staff an account | Yes | Own accounts | No |
| Join or leave an account | Yes | Own accounts | No |
| Reach the Admin page | Yes | Yes | No |
| Manage users, settings, stats | Yes | No | No |
| Read an account's data | Own accounts | Own accounts | Assigned accounts |

:::caution
`auth.sys-admins` has no fallback — if it's empty, nobody can create an account or a user. Set it
before relying on accounts; CubeAPM warns about this at startup.
:::

The Admin page shows only the tabs a caller is authorized for: **Accounts** and **Audit Logs** to
any account admin; **Users** to any account admin for the account they're viewing, though identity
actions (password reset, MFA, delete) are sys-admin only; **Settings**, **Stats** and **Signin
Audit Logs** to sys admins only.

### Creating an account

Sys admin required. **Admin → Accounts → New**, enter a name. CubeAPM assigns the number — always
higher than any ever issued, including deleted ones. You don't need to give this number to
agents; routing is done by license key (see [Routing telemetry](/instrumentation/routing)).

You're added as the new account's first admin, so you can open it immediately. It starts with no
other members and no data.

**Join / Leave** — each account row has one. Leave is disabled while you're the only admin, so
add another first. **Rename** — edit icon, name only; the number never changes.

**Delete** — sys admin required; the default account can't be deleted.

:::caution
Deleting an account removes it from the UI and every member's list, and its data becomes
unreadable — but isn't deleted, and stays until it ages out of retention, with its number never
reissued. Agents pointed at it keep sending into the void; revoke its keys or repoint them as part
of decommissioning. **Its alert rules and synthetic monitors keep running** until removed by hand.
:::

### Assigning users to accounts

**Admin**, pick the account from the switcher at the head of the tab strip, **Users** tab. Add a
user and pick their role in this account, or change an existing member's. New users can be given
their accounts directly on the invite form.

CubeAPM refuses any change that would leave an account with no admin.

**Disabling** a user (Status switch, sys-admin only) drops their live sessions — unlike a role of
`none`, which leaves them signed in with nothing to do.

### License keys

License keys decide which account an agent's telemetry belongs to — see
[Routing telemetry](/instrumentation/routing) for where each vendor's key lives.

**Admin → Accounts**, pick the account, **License keys**. **Generate a key** and put it in the
agent's credential field — the safe default. Only use **add an existing key** if that field
already holds a value unique to this agent; a shared placeholder pulls every agent using it into
this account. Name it so you know what it's for.

![The License keys screen: generate a new key or add an existing one, with the key list below](/img/accounts/license-keys-modal.png)

A key already claimed by another live account is rejected — revoke it there first. Deleting an
account revokes its keys. Any admin of the account can view and copy a key in full at any time,
not just at creation.

**Revoking is permanent** — a revoked key can't be reactivated; an agent still sending it keeps
sending, but the data lands nowhere readable.

:::info
Keys are written to the Audit Logs in full on every create, add, rename and revoke — treat Audit
Log access as sensitive once license keys are in use.
:::

### Roles per account {#roles}

This adds a third scope on top of the roles above:

```text
Global role (viewer / editor / admin)
        │
        └──► Per-account role (viewer / editor / admin)
                    │
                    ├──► Role Based resource → uses the account role
                    │
                    └──► Custom resource → allowlist of users and teams
```

Same three roles, same meanings, scoped to one account:

| Role in an account | View data | Create / edit resources | Manage members |
| :--- | :---: | :---: | :---: |
| Viewer | Yes | No | No |
| Editor | Yes | Yes | No |
| Admin | Yes | Yes | Yes |

Not a member → no role → no access.

#### Global role fallback

The global role is a user's role in the default account, and the fallback for anyone not assigned
elsewhere:

| Situation | Effective access |
| :--- | :--- |
| Never assigned to any account | Default account at their global role |
| Assigned to accounts 2 and 3 | Default account at global role, plus 2 and 3 at their given roles |
| Global role is `none` | No default-account access, regardless of other assignments |
| No role set at all | `auth.default-role` |
| Sys admin | Admin of every account, including future ones |

Upgrades rely on the first row: every pre-existing user keeps their default-account role
unchanged. Disabling someone by setting global role to `none` only removes default-account
access — remove other account assignments too, or use the Status switch instead. The fallback
only applies to the default account; a global admin isn't automatically an admin of account 2.

### Switching accounts in the UI {#switching}

Users in more than one account get a switcher in the left nav rail, with a generated icon per
account. Users in only the default account never see it.

![The account switcher at the foot of the left navigation rail](/img/accounts/account-switcher.png)

It's in the nav rail, not a page filter, because it decides which tenant *every* page reads from — switching reloads the page, since dashboards, charts and config are all fetched per account. It
appears again at the head of the Admin tab strip. The selection is per browser tab; a new tab with
no account in its URL starts on the default account. Losing access mid-session (revoked, or the
account deleted) drops you back to Default and reloads.

**Verifying access:** sign in as the user, confirm the switcher lists the expected accounts, open
**APM** and confirm the service list changes between accounts. No switcher → member of only the
default account. Switcher shows it but pages are empty → access is fine, check
[Routing telemetry](/instrumentation/routing) instead.

### Auditing

Account create/rename/delete, member add/remove, and license key create/add/rename/revoke are all
logged with actor, account, and before/after values. **Audit Logs** tab, any account admin.

### Limitations {#limitations}

- **Notification-channel credentials are install-wide** — Slack, PagerDuty, email and the rest are
  configured once and shared by every account's alert rules. Alert rules themselves, silences,
  alert history and notification charts are all scoped per account.
- **Deleting an account doesn't stop its alert rules or synthetic monitors** — remove them by hand.

For hard separation of notification credentials between tenants, run separate installations
rather than separate accounts within one.

---

## Related documentation

- [Accounts](/configure/accounts) — what accounts are, and how telemetry routing works
- [Teams](/configure/teams) — create and manage teams
- [Alert Rules API](/http-apis/alerts/alert-rules) — permissions via API
- [Dashboards API](/http-apis/dashboards) — permissions via API
- [Configure CubeAPM](/configure)
