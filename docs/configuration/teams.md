---
slug: /configure/teams
sidebar_position: 2
---

# Teams

Teams group users in CubeAPM. A user can belong to multiple teams. Teams are used for:

1. **Team management** — who can edit the team's name, description and members
2. **Access on alerts and dashboards** — a team listed under [Custom permissions](/configure/roles-and-permissions#custom) passes that access to every member

:::info
Installations that use [Accounts](/configure/accounts) scope teams to the account they were created in. A
team can only be granted access to resources in that same account.
:::

---

## Creating a team in the UI

Requires global **Editor** or **Admin**.

1. **Settings** (profile menu → Settings, or `/settings`) → **Teams** tab → **New**.
2. Enter a **Team name** (required) and optional **Description**.
3. Add at least one member with role **Admin** (required).
4. **Save**.

:::info
The Teams tab only shows teams you're a member of. Add yourself when creating one you want to see.
:::

---

## Team member roles

Each member has a role **within that team**, separate from their [global role](/configure/roles-and-permissions#global-roles):

| Team role | Can manage team settings / members |
| :--- | :---: |
| Member | No |
| Admin | Yes |

Editing a team (rename, members, delete) needs both global **Editor**/**Admin** *and* team
**Admin**. Any user can see their own teams under **Settings → Teams**.

---

## Managing teams

| Action | Requirement |
| :--- | :--- |
| Create a team | Global Editor or Admin |
| Edit / manage members | Global Editor or Admin **and** team Admin |
| Delete | Global Editor or Admin **and** team Admin |

Deleting a team removes its members and any alert/dashboard access granted to it.

---

## Teams and alert/dashboard access

A team granted **viewer** or **editor** on an alert or dashboard passes that access to every
member, capped by their global role. Example: team `SRE` granted **viewer** on `Prod Overview` — all `SRE` members can view it.

To configure this, see [Custom permissions](/configure/roles-and-permissions#custom) and
[setting permissions](/configure/roles-and-permissions#setting-permissions).

---

## Related documentation

- [Roles and Permissions](/configure/roles-and-permissions) — global roles and per-resource access
- [Configure CubeAPM](/configure) — workspace configuration reference
