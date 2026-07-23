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

[Teams](/configure/teams) connect to resource permissions when you grant access to a team on a specific alert or dashboard.

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

Every user has a global role assigned by an administrator (or at signup via `auth.default-role`).

| Role | View data | Create / edit resources | Auth admin UI |
| :--- | :---: | :---: | :---: |
| **Viewer** | Yes | No | No |
| **Editor** | Yes | Yes | No |
| **Admin** | Yes | Yes | Yes |

Users with no role cannot access the workspace.

### What global Editor can do

Users with global **Editor** or **Admin** can:

- Create and edit **alert rules**, **dashboards**, and **[teams](/configure/teams)**
- Add or remove team members (if they are also a [team Admin](/configure/teams#team-member-roles))
- Use the **New Alert** and **New Dashboard** flows in the UI

Users with global **Viewer** can browse data and view alerts and dashboards they have access to, but cannot create or edit them.

### Configuration

| Parameter | Description |
| :--- | :--- |
| `auth.default-role` | Role assigned to new users on signup. Default: `viewer`. Allowed values: `none`, `viewer`, `editor`, `admin`. |
| `auth.sys-admins` | Comma-separated email list with access to the auth admin UI (user management), regardless of global role. |

Global roles are managed by workspace administrators.

---

## Per-resource permissions

Alerts and dashboards support optional permissions that control who can view and edit **that specific resource**.

Resource permissions apply only to **alerts** and **dashboards** — not to metrics, logs, traces, or other features.

In the UI, permissions are configured in the **Permissions** section when creating or editing an alert or dashboard. You choose between **Role Based** and **Custom**.

### Role Based (default) {#role-based}

**Role Based** is the default. No extra configuration is needed.

Access follows each user's **global role**:

- Global **Viewer** → can view the alert or dashboard
- Global **Editor** / **Admin** → can view and edit the alert or dashboard

### Custom {#custom}

**Custom** lets you grant **Viewer** or **Editor** on a specific alert or dashboard to individual users or [teams](/configure/teams).

For each entry you select:

- A **user** (by email) or **team**
- A permission level: **Viewer** or **Editor**

Custom permissions form an **allowlist**. Only listed users and teams can access the resource. Everyone else — including global admins — is denied unless they appear in the list.

:::warning
If you switch a resource to Custom permissions, add yourself (or a team you belong to) before saving. Otherwise you may lose access to that alert or dashboard.
:::

### How effective permission is calculated

For each alert or dashboard:

1. **Role Based** — effective permission equals the user's global role.
2. **Custom** — check whether the user is listed directly, or belongs to a listed team. Use the highest matching grant (Editor beats Viewer). Cap at the global role (a global Viewer cannot edit even if granted Editor on the resource).
3. If the user is not listed under Custom permissions, they have **no access**.

**Examples (Custom permissions on dashboard X):**

The **Custom allowlist entry** column is what you configure on dashboard X under Custom permissions — a specific user (by email) or team, each assigned Viewer or Editor.

| User | Global role | Custom allowlist entry on X | Effective on X |
| :--- | :--- | :--- | :--- |
| Alice | Editor | User `alice@company.com` → Editor | Editor |
| Bob | Editor | User `bob@company.com` → Viewer | Viewer |
| Carol | Viewer | User `carol@company.com` → Editor | Viewer (capped by global role) |
| Dave | Editor | Team SRE → Viewer | Viewer |
| Eve | Admin | *(not in allowlist)* | no access |

### What users can do on a resource

| Action | Required effective permission |
| :--- | :--- |
| View alert or dashboard (list, open) | Viewer, Editor, or Admin |
| Edit alert, dashboard, or panels | Editor or Admin |
| Delete alert or dashboard | Editor or Admin |

Creating a **new** alert or dashboard requires global **Editor** or **Admin**. Resource permissions apply after the resource is saved.

---

## Permissions when creating an alert {#permissions-on-alert-creation}

When creating or editing an alert in the UI:

1. Go through the alert wizard. Permissions are on the **Mutes & Permissions** step.
2. Under **Permissions**, choose **Role Based** or **Custom**.
3. If **Custom**, click **Add Permission**, select a user or team, and set **Viewer** or **Editor**. Repeat for each grant.
4. Save the alert.

**Who can create alerts:** global **Editor** or **Admin**.

**Who sees the alert after save:** users with effective **Viewer** access or higher. Users without access do not see the alert in the list.

**Who can edit or delete:** users with effective **Editor** access or higher on that alert.

For programmatic access, see [Alert Rules API](/http-apis/alerts/alert-rules#how-to-configure-role-based-and-custom-permissions).

---

## Permissions when creating a dashboard {#permissions-on-dashboard-creation}

When creating or editing a dashboard in the UI:

1. Open **New Dashboard** (or edit an existing dashboard).
2. Scroll to the **Permissions** section.
3. Choose **Role Based** or **Custom**, and add user or team entries if using Custom.
4. Save the dashboard.

**Who can create dashboards:** global **Editor** or **Admin**.

**Who sees the dashboard after save:** users with effective **Viewer** access or higher.

**Who can edit panels or delete the dashboard:** users with effective **Editor** access or higher on that dashboard.

For programmatic access, see [Dashboards API](/http-apis/dashboards#how-to-configure-role-based-and-custom-permissions).

---

## Common scenarios

### Everyone with Editor role can manage all dashboards

Leave permissions on **Role Based** for each dashboard. Global editors can create and edit; global viewers can only view.

### Restrict a dashboard to one team

1. [Create a team](/configure/teams#creating-a-team-in-the-ui) and add members.
2. Create or edit the dashboard. Under **Permissions**, select **Custom** and grant the team **Viewer** or **Editor**.
3. Only team members see the dashboard.

### Let a user view but not edit an alert

On the alert, use **Custom** permissions and grant that user **Viewer**. Even if they have global Editor, they can only view that specific alert.

### Share an alert with a team as read-only

Use **Custom** permissions and grant the team **Viewer**. All team members can view the alert; only those with effective Editor (and global Editor or Admin) can change it.

---

## Related documentation

- [Teams](/configure/teams) — create and manage teams
- [Alert Rules API](/http-apis/alerts/alert-rules) — permissions via API
- [Dashboards API](/http-apis/dashboards) — permissions via API
- [Configure CubeAPM](/configure)
