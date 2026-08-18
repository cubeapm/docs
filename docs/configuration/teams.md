---
slug: /configure/teams
sidebar_position: 2
---

# Teams

Teams let you group users in CubeAPM. A user can belong to multiple teams.

Teams are used for:

1. **Team management** — controlling who can edit the team (name, description, members)
2. **Access on alerts and dashboards** — when a team is listed under [Custom permissions](/configure/roles-and-permissions#custom) on an alert or dashboard, all members inherit that access

---

## Creating a team in the UI

You need a global **Editor** or **Admin** role to create a team. See [Global roles](/configure/roles-and-permissions#global-roles) for role definitions.

1. Open **Settings** (profile menu → Settings, or go to `/settings`).
2. Select the **Teams** tab.
3. Click **New** (top right).
4. In the drawer that opens:
   - Enter a **Team name** (required).
   - Optionally enter a **Description**.
   - Add at least one **member** with role **Admin** (required — every team must have at least one Admin).
     - Choose a user from the dropdown, set their role to **Member** or **Admin**, and click **Add**.
5. Click **Save**.

After the team is created, it appears in the Teams list. You can open it later to add more members, change roles, or delete the team (team Admins only).

:::info
The Teams tab only shows teams you are a member of. When creating a team, add yourself as a member if you want to see and manage it in the list.
:::

---

## Team member roles

Each team member has a role **within that team**. This is separate from their [global workspace role](/configure/roles-and-permissions#global-roles).

| Team role (UI label) | Can manage team settings / members |
| :--- | :---: |
| Member | No |
| Admin | Yes |

To edit a team (rename, add or remove members, delete the team), a user must:

1. Have global role **Editor** or **Admin**, **and**
2. Be a team member with role **Admin**

Any user can see teams they belong to under **Settings → Teams**.

---

## Managing teams

| Action | Requirement |
| :--- | :--- |
| Create a team | Global Editor or Admin |
| Edit team / manage members | Global Editor or Admin **and** team Admin |
| Delete a team | Global Editor or Admin **and** team Admin |

Deleting a team removes all members and revokes any alert or dashboard access that was granted to that team.

---

## Teams and alert/dashboard access

When a team is granted **viewer** or **editor** on an alert or dashboard, every member of that team receives that access, capped by their global role.

**Example:** Team `SRE` is granted **viewer** on dashboard `Prod Overview`. All members of team `SRE` can view that dashboard.

To configure team access on a resource, see [Roles and Permissions](/configure/roles-and-permissions) — especially [Custom permissions](/configure/roles-and-permissions#custom) and the sections on [alerts](/configure/roles-and-permissions#permissions-on-alert-creation) and [dashboards](/configure/roles-and-permissions#permissions-on-dashboard-creation).

---

## Related documentation

- [Roles and Permissions](/configure/roles-and-permissions) — global roles and per-resource access on alerts and dashboards
- [Configure CubeAPM](/configure) — workspace configuration reference
