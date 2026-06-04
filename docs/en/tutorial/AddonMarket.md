---
title: Shop Tools
description: Expression pricing, restock notifications, item search, and more
---

# Shop Tools

> **Core Summary**: Addon-Market is an enhancement plugin for QuickShop-Hikari, featuring **expression pricing** (dynamic price formulas), **restock notifications** (auto-alert shop owners), **item search** (supports English/Chinese/pinyin), and **waypoint beams** (click coordinates to create guiding pillars).

## Basic Commands

| Command | Description |
|---------|-------------|
| `/qs price <formula>` | Bind a dynamic pricing formula |
| `/qs marketinfo` | View shop pricing details |
| `/qs manage` | Open the shop management GUI |
| `/qs search <item>` | Search for shops selling an item in this world |
| `/qs restock on / off` | Enable/disable restock notifications |
| `/qs restock status` | View notification status |
| `/qs playerreset on / off` | Enable/disable player counter reset |
| `/qs playerreset status` | View reset status |
| `/qs playerreset interval <duration>` | Set reset interval (e.g. `1w` / `5h` / `50m`) |


## Expression Pricing <font color="#c38285" size=3>(Admin only)</font>

Use math formulas to dynamically adjust prices based on trade volume. Look at a shop and type your formula:

```
/qs price basePrice * 1.05 ^ min(playerAmount, 100)
```

Each purchase increases price by 5%, capped at 100 iterations.

**Variables:** `playerAmount` / `globalAmount` / `shopStock` / `shopMaxStock` / `basePrice` / `currentPrice`

**Functions:** `exp(x)` / `pow(a,b)` / `log(x)` / `min(a,b)` / `max(a,b)`

**Example formulas:**

- **Price increase:** `basePrice * 1.05 ^ min(playerAmount, 100)`
- **Volume discount:** `basePrice * 0.95 ^ min(playerAmount, 50)`
- **Tiered pricing:** `basePrice + floor(playerAmount / 10) * 5`

> On shop creation, type the formula directly in chat instead of a number.


## Shop Management GUI

Visually manage all your shops with a simple interface.

```
/qs manage
```

- **Left click** a shop icon → Toggle **restock notification**
- **Right click** a shop icon → Toggle **counter auto-reset**
- Each slot shows: location, stock, mode (sell/buy), current status


## Item Search

Search for shops trading a specific item in your current world.

```
/qs search diamond     /qs search 钻石     /qs search zuanshi
/qs search 土豆     /qs search 马铃薯      /qs search tudou
```

Supports English IDs, Chinese names, pinyin, and aliases. Partial matches work too.

> Example: Searching for diamond sword shops — type `/qs search diamond_sword` or `/qs search zuanshijian` (pinyin).

![Item Search](/images/wu-ping-sou-suo.png)

![Item Search Result](/images/wu-ping-sou-suo-2.png)

Coordinates in results are **clickable** — clicking creates a guiding beam to lead you there.


## Restock Notification

Automatically notifies the owner when a sell shop runs out of stock.

| Command | Description |
|---------|-------------|
| `/qs restock on` | Enable notifications for current shop |
| `/qs restock off` | Disable |
| `/qs restock status` | Check status |

Out-of-stock shops show a white particle ring effect (visible within 10 blocks of the owner), and the guide auto-removes when you're within 5 blocks.

![Restock Notification](/images/bu-huo-ti-xing.png)

Every time a player logs in, the server automatically checks their shops for restocking needs. If any shop needs restocking, a notification message is sent.

You can **click the coordinates** in the message to create a **highlighting beam** that guides you to the shop.

![Restock Notification Beam](/images/bu-huo-ti-xing-2.png)

![Restock Notification Guide](/images/bu-huo-ti-xing-3.png)


## Player Counter Reset

Periodically resets player trade counters to prevent a single player from dominating prices.

| Command | Description |
|---------|-------------|
| `/qs playerreset on / off` | Enable/disable |
| `/qs playerreset status` | Check status |
| `/qs playerreset interval 1w -start:1 -time:00:00` | Reset every Monday 00:00 |
| `/qs playerreset interval 5h` | Reset every 5 hours |

Duration format: `50m` (minutes), `5h` (hours), `1w` (weeks)


## FAQ


::: details **Q: "Invalid expression"?**

A: Check your variable names and functions. Example: `basePrice + playerAmount`.

:::


::: details **Q: Too many restock notifications?**

A: Default cooldown is 24 hours. Adjust in `config.yml`.

:::


::: details **Q: Can't find my shop?**

A: Search is scoped to your current world only.

:::


::: details **Q: Too many particles?**

A: Set `particle-effect: false` in `config.yml`.

:::
