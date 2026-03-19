# Transportation: Mount Guide

> **Summary**: Transportation provides **mount binding + stable management + token-based summon/recall**. You can summon your mounts anytime, while keeping their stats (speed, jump, gear, etc.).

## Core concepts

:::: info Three keywords
- **Contract (binding)**: A bond between you and a creature. Only after binding does it truly “belong to you” and become protected by the system.
- **Stable**: Storage for your mounts (think “database / pocket space”). When a mount is not with you, it rests in the stable.
- **Token / Key item**: A physical item bound to a mount (e.g. horse armor, saddle, name tag, stick) used to summon/recall it anywhere.
::::

## Bind a mount

### 1) Tame the creature

First, tame a mount the vanilla way (e.g. horse, donkey, llama).

### 2) Bind

Aim at the tamed creature and run:

```
/tra bind
```

If you own multiple mounts, it’s recommended to give it an alias for easier management:

```
/tra bind HORSE:RedHare
```

> Note: After binding, the mount is registered into your **stable**, and its stats are recorded (speed, jump, health, equipment, potion effects, etc.).

## Create & use a token (Key)

A token is optional, but highly recommended if you summon/recall often.

### 1) Create a token

1. Hold any item you like (recommended: horse armor / saddle / name tag / stick).
2. Bind it to a mount:

```
/tra keybind <alias>
```

Examples:

- `/tra keybind HORSE`
- `/tra keybind RedHare`

### 2) Use the token

- **Summon**: hold the token and right-click air/ground
- **Recall**:
  - nearby: right-click the mount
  - from afar: Shift + right-click air/ground
- **Ride**: right-click the mount with an empty hand (or any non-token item)

> Tip: Don’t hold the token while trying to ride, or you may recall the mount instead.

## Daily management

### View your stable

```
/tra list
```

You will see the status of each mount (e.g. active / resting / destroyed).

### Summon/recall without a token

- Summon: `/tra out <alias>`
- Recall: `/tra in <alias>`

### Revive a destroyed mount

1. Check `/tra list` and confirm the mount is **[destroyed]**
2. Revive it:

```
/tra fix <alias>
```

Example:

```
/tra fix RedHare
```

## Social & trading

### Transfer a mount

```
/tra transfer <alias> <player>
```

After transfer, your existing token becomes invalid and the other player becomes the owner.

### Unbind (delete) a mount

```
/tra unbind <alias>
```

> Warning: This action is irreversible. The mount will no longer belong to you.

## Safety & protection

- **Anti-theft**: by default only you can ride your mounts (unless transferred).
- **Anti-tamper**: other players can’t casually change your mount info.
- **Stats are preserved**: summoning/recalling/transferring keeps speed, jump, gear, tame state, potion effects, and more.

## FAQ

::::: details Q: I lost my token item. What now?
A: The token is only a “remote control”. Your mount is still safe in the stable. Hold a new item and run `/tra keybind <alias>` again.
:::::

::::: details Q: Why does it say “stable is full”?
A: Each player has a limited mount capacity (server setting). Use `/tra unbind <alias>` to free up slots.
:::::

::::: details Q: Can I rename my mount with a name tag?
A: Yes. As the owner, you can rename it. Other players can’t rename your mounts.
:::::

::::: details Q: Can I summon across worlds?
A: Yes. The stable is cross-world. You can recall a mount in one world and summon it in another.
:::::

## Command reference

| Command | Args | Description |
| :--- | :--- | :--- |
| `/tra bind` | `[model:id]` | bind the targeted creature as your mount |
| `/tra keybind` | `[model]` | turn the held item into a token |
| `/tra list` | none | list all mounts and their status |
| `/tra out` | `<model>` | summon a mount from the stable |
| `/tra in` | `<model>` | recall a mount into the stable |
| `/tra fix` | `<model>` | revive a destroyed mount |
| `/tra transfer` | `<model> <player>` | transfer ownership to another player |
| `/tra unbind` | `<model>` | unbind (delete) a mount |
| `/tra unkeybind` | none | remove token attributes from the held item |

