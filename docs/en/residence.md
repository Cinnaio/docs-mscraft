# Residence: Basic Claim Protection Guide

> **Summary**: Residence is used for **land claims + permission management**. This server enables **rent/expiry** and economy costs, requires at least **32 blocks** between different players’ claims, and **disables all Residence teleport features**.

## Core concepts

- **Residence (claim)**: A protected area created after selecting corners with a wooden hoe. Actions like placing/breaking/interacting are controlled by permissions.
- **Permissions**: What a player can do inside a claim (e.g. `build` / `use` / `container` / `pvp`).
- **Subzone**: A smaller area inside a claim with its own permissions, useful for shared bases or separating public/private rooms.

## Create a claim

### Before you start

- **Tool**: A wooden hoe (use `/res tool` to get the selection tool).
- **Cost**: Creating/extending claims costs **15.625 coins per block**.
- **Spacing rule**: Keep at least **32 blocks** between different players’ claims to avoid conflicts.

### Select & create

1. Select two opposite corners with the wooden hoe:
   - **Left click**: first point (green particles)
   - **Right click**: second point (red particles)
2. Create the claim:

```
/res create <name>
```

Example:

```
/res create myhome
```

> Note: After creation, the server will charge the cost and grant the claim a **7-day rent period** (renewal required when it expires).

### View claim info

- **Current claim**: `/res info`
- **Your claims**: `/res list`

## Permission management

By default, only the owner can build. It’s recommended to grant permissions only to trusted players—don’t enable `build` for everyone.

### Common: add / remove members

- **Add member (shortcut)**: `/res padd <player>` (commonly used to allow building)
- **Remove member**: `/res pdel <player>`

### Set permissions

Default permissions (for visitors/everyone):

```
/res set <permission> <true|false|remove>
```

Per-player permissions:

```
/res pset <player> <permission> <true|false>
```

Common permissions:

- **build**: place/break blocks
- **use**: use doors, crafting table, anvil, etc.
- **container**: open chests, furnaces, etc.
- **pvp**: enable PvP inside the claim
- **tp**: teleport-related (**Residence teleport is disabled on this server, so this has no effect**)

## Subzones

Use subzones to separate public/private areas inside one claim.

1. Stand inside the parent claim and select the sub-area with the wooden hoe.
2. Create the subzone:

```
/res subzone <subzone-name>
```

Subzone permissions override the parent claim. Configure them inside the subzone using `/res set` / `/res pset`.

## Teleport & removal

> Important: All Residence teleport features are disabled on this server (including `/res go`). To return to your base, walk or use other transportation.

### Remove a claim (irreversible)

1. Run inside the claim: `/res remove`
2. Confirm when prompted: `/res confirm`
3. **Refund**: You will get **5.625 coins per block** back.

## Economy & rent

This server uses a rent system: new claims start with a **7-day rent period**. If you don’t renew, the claim will be automatically removed (items will drop).

### Price list

| Item | Price (per block) |
| :--- | :--- |
| Create/expand claim | **15.625 coins** |
| Refund on removal | **5.625 coins** |
| Renew (7 days) | **2.856 coins** |

### Renew

```
/res renew <claim-name>
```

Each renewal adds **7 days**. Cost = claim blocks × 2.856. Use `/res info` to check remaining time.

## FAQ

::::: details Q: How do I expand or shrink a claim?
A:

- Expand: `/res expand <amount>` (expands in the direction you are facing)
- Shrink: `/res contract <amount>`

Expanding will charge based on the newly added blocks.
:::::

::::: details Q: How much distance is required between claims?
A: At least **32 blocks**. It’s recommended to preview your selection to avoid conflicts.
:::::

::::: details Q: Can I teleport to my claim?
A: No. All Residence teleport features are disabled on this server (including `/res go`).
:::::

::::: details Q: How do I transfer a claim to another player?
A:

```
/res give <claim-name> <player>
```
:::::

::::: details Q: How do I reset messed-up permissions?
A: Use `/res default` to restore default permissions.
:::::

## Command quick reference

| Command | Args | Description |
| :--- | :--- | :--- |
| `/res tool` | none | get the selection hoe |
| `/res create` | `<name>` | create a claim (after selecting) |
| `/res info` | none | show current claim info |
| `/res list` | none | list your claims |
| `/res padd` | `<player>` | common: add member permissions |
| `/res pdel` | `<player>` | remove player permissions |
| `/res set` | `<perm> <true/false/remove>` | set default permissions (global) |
| `/res pset` | `<player> <perm> <true/false>` | set per-player permission |
| `/res subzone` | `<name>` | create a subzone |
| `/res expand` | `<amount>` | expand claim |
| `/res contract` | `<amount>` | shrink claim |
| `/res renew` | `<claim>` | renew (7 days) |
| `/res remove` | none | remove a claim (needs confirm) |
| `/res confirm` | none | confirm dangerous actions |
| `/res give` | `<claim> <player>` | transfer a claim |
| `/res pcheck` | `<player>` | check a player’s permissions here |

For more commands, use `/res` in-game, or ask an admin.

