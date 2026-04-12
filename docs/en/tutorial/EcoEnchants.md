---
description: EcoEnchants reference for ClusterGap—anvil cap, category limits, rarity weights, vanilla and custom enchant tables.
---

# More Enchants (EcoEnchants)

**Custom enchants** are listed below by rarity tier. **Vanilla enchants** are in the collapsible [Vanilla enchants](#vanilla-enchants) section at the end.

- **Anvil**: A single item can have **at most 10 enchantments in total** (vanilla + custom combined). You cannot add more via the anvil once the cap is reached.
- **Category** (“Type” column): Limits how many enchants of that **category** can coexist on one item. This is **not** the same as **rarity** (the rarity tier named “Special” is unrelated to the category “Unique”).
- **Per level**: For the same enchant, higher levels usually improve numbers, chance, or duration mentioned in the row (check in-game for exact values).

| Category | Per item |
|:---:|:---:|
| Normal | No extra category cap (still limited by the **≤10** total) |
| Curse | Up to **2** |
| Spell | Up to **1** |
| Unique | Up to **1** |

The **rarity** tiers below (Common → Very special) affect how often you roll that tier from each source; they are **not** the same idea as categories like Normal / Curse / Spell.

### Rarity weights {#rarity-chances}

Configured **percentage weights** for rolling each rarity tier first, then picking a specific enchant inside that pool. Each column is for one source—they **do not** add up to 100% across columns. The enchanting table, villagers, and loot also use **book multipliers** and **diminishing returns for multiple enchants**, so in-game feel may differ from the table.

| Rarity | Table (%) | Villager book (%) | Loot (%) | Min player level (table) |
|:---:|:---:|:---:|:---:|:---:|
| Common | 30 | 10.5 | 12 | 1 |
| Uncommon | 20 | 9 | 16 | 5 |
| Rare | 20 | 7.5 | 18 | 15 |
| Epic | 10 | 6 | 20 | 16 |
| Legendary | 8 | 4.5 | 15 | 20 |
| Special | 2 | 3 | 5 | 30 |
| Very special | 1 | 1.5 | 2 | 30 |

**Jump to**: [Rarity weights](#rarity-chances) · [Common](#rarity-common) · [Uncommon](#rarity-uncommon) · [Rare](#rarity-rare) · [Epic](#rarity-epic) · [Legendary](#rarity-legendary) · [Special](#rarity-special) · [Very special](#rarity-very-special) · [Vanilla table](#vanilla-enchants) · [Gear column](#gear-types)

> **Note:** Custom enchant **names** in the tables match the server’s in-game display (often Chinese). Vanilla rows use common English names; if your client language differs, use the anvil / book tooltip as the source of truth.

## Custom enchants {#custom-enchants}

### Common {#rarity-common}

| Name | Max lvl | Type | Gear | Effect (summary) | Table | Villager | Loot | Conflicts |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 内向 | 5 | Normal | Sword | Increased melee damage vs players (scales with level) | ✅ | ✅ | ✅ | 锋利, 亡灵杀手, 节肢杀手, 屠宰, 明亮 |
| 屠宰 | 5 | Normal | Sword | Increased melee damage vs passive mobs (scales with level) | ✅ | ✅ | ✅ | 锋利, 亡灵杀手, 节肢杀手, 内向, 明亮 |
| 方块呼吸 | 3 | Normal | Helmet | Chance to ignore suffocation damage (scales with level) | ✅ | ✅ | ✅ | None |
| 采集 | 2 | Normal | Shears | Higher chance for apples from leaves (scales with level) | ✅ | ❌ | ❌ | None |

### Uncommon {#rarity-uncommon}

| Name | Max lvl | Type | Gear | Effect (summary) | Table | Villager | Loot | Conflicts |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 先发制人 | 5 | Normal | Sword, Axe | Bonus damage vs full-health targets (scales with level) | ✅ | ✅ | ✅ | None |
| 念力 | 1 | Normal | Pickaxe, Sword, Axe | Drops and XP go straight to inventory | ✅ | ❌ | ❌ | None |
| 智慧 | 2 | Normal | Sword, Axe, Pickaxe, Shovel, Hoe, Bow, Crossbow, Trident | Bonus XP from mob drops (scales with level) | ✅ | ❌ | ❌ | None |
| 末影杀手 | 6 | Normal | Sword, Axe | Bonus melee damage vs End mobs (scales with level) | ✅ | ✅ | ✅ | None |
| 终结 | 5 | Normal | Sword, Axe | Bonus damage per 1% HP the target is missing (scales with level) | ✅ | ✅ | ✅ | None |
| 跳射 | 3 | Normal | Bow, Crossbow | Bonus damage while airborne (scales with level) | ✅ | ✅ | ✅ | None |

### Rare {#rarity-rare}

| Name | Max lvl | Type | Gear | Effect (summary) | Table | Villager | Loot | Conflicts |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 修罗 | 2 | Normal | Axe | Below ~half health, crit damage multiplier increases (scales with level) | ✅ | ✅ | ✅ | None |
| 巨人杀手 | 6 | Normal | Sword | Higher damage vs targets with more max HP than you; capped bonus (scales with level) | ✅ | ✅ | ✅ | None |
| 忍者 | 5 | Normal | Sword | Bonus melee damage while sneaking (scales with level) | ✅ | ✅ | ✅ | None |
| 提神 | 3 | Normal | Sword | Faster attack and mining while sprinting (scales with level) | ✅ | ✅ | ✅ | None |
| 火箭节省 | 3 | Normal | Elytra | Chance not to consume fireworks when boosting (scales with level) | ✅ | ✅ | ✅ | None |
| 生命窃取 | 6 | Normal | Sword | Part of damage dealt heals you (scales with level) | ✅ | ✅ | ✅ | None |
| 电火花 | 5 | Normal | Fishing rod | In thunderstorms, hooking an entity can strike lightning; chance and damage scale with level | ✅ | ✅ | ✅ | None |
| 眩晕 | 3 | Normal | Sword, Bow, Trident, Crossbow | Chance to briefly stun hit targets (~2 s; scales with level) | ✅ | ✅ | ✅ | None |
| 矿脉挖掘 | 3 | Normal | Pickaxe | Max extra blocks broken in one swing (scales with level) | ❌ | ❌ | ❌ | 爆破采矿 |
| 穿颅 | 3 | Normal | Bow, Crossbow, Trident | Bonus headshot damage (scales with level) | ✅ | ✅ | ✅ | None |
| 立体主义 | 7 | Normal | Sword, Axe, Bow, Crossbow | Bonus damage vs slimes and magma cubes (scales with level) | ✅ | ✅ | ✅ | None |
| 耐力 | 4 | Normal | Chestplate | Less hunger drain from sprinting (scales with level) | ✅ | ✅ | ✅ | None |
| 脱身 | 2 | Normal | Boots | Below 20% HP, movement speed bonus (scales with level) | ✅ | ✅ | ✅ | None |
| 闪光 | 6 | Normal | Bow, Crossbow | Chance to blind on hit (scales with level) | ✅ | ✅ | ✅ | None |
| 隐形 | 2 | Normal | Armor | On taking damage, chance to become invisible for a duration (scales with level) | ✅ | ✅ | ✅ | None |
| 首领猎手 | 8 | Normal | Bow, Crossbow | Bonus damage vs bosses and elites (scales with level) | ✅ | ✅ | ✅ | None |

### Epic {#rarity-epic}

| Name | Max lvl | Type | Gear | Effect (summary) | Table | Villager | Loot | Conflicts |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 下界亲和 | 4 | Normal | Sword, Bow, Trident | Bonus damage in the Nether (scales with level) | ✅ | ✅ | ✅ | 末地亲和 |
| 伐木工 | 3 | Normal | Axe | Max logs felled in one chain chop (scales with level) | ✅ | ❌ | ✅ | None |
| 作祟 | 2 | Normal | Helmet | On death, spawns a damaging cloud for a duration (scales with level) | ✅ | ✅ | ✅ | None |
| 反震 | 3 | Normal | Shield | When blocking, reflects part of damage to attacker (scales with level) | ✅ | ✅ | ✅ | None |
| 奥术防御 | 5 | Normal | Armor | Chance to ignore magic/potion damage (scales with level) | ✅ | ✅ | ✅ | None |
| 末地亲和 | 4 | Normal | Sword, Bow, Trident | Bonus damage in the End (scales with level) | ✅ | ✅ | ✅ | 下界亲和 |
| 毒藤 | 2 | Normal | Leggings | Per heart of damage you deal, poisons attacker for a time (capped total; scales with level) | ✅ | ✅ | ✅ | 荆棘 |
| 滑流 | 3 | Normal | Trident | Movement speed while holding (scales with level) | ✅ | ✅ | ✅ | None |
| 潜影收割 | 3 | Normal | Sword | Higher shulker shell drop chance (scales with level) | ❌ | ❌ | ❌ | 抢夺 |
| 灵巧 | 2 | Normal | Sword, Axe | Attack speed bonus (scales with level) | ✅ | ✅ | ✅ | None |
| 狙击 | 4 | Normal | Bow, Crossbow | More damage the farther the arrow flies (scales with level) | ✅ | ✅ | ✅ | None |
| 疾射 | 6 | Normal | Bow | Fire full-speed shots at lower draw (scales with level) | ✅ | ✅ | ✅ | None |
| 肾上腺素 | 3 | Normal | Shield | On block, damage buff; stronger at lower HP (scales with level) | ✅ | ✅ | ✅ | None |
| 致命打击 | 3 | Normal | Sword, Axe | Melee crit damage multiplier (scales with level) | ✅ | ✅ | ✅ | None |
| 逃脱 | 2 | Normal | Boots | After taking damage, short burst of speed (scales with level) | ✅ | ✅ | ✅ | 流线型 |
| 雷神 | 6 | Normal | Bow, Crossbow | On hit, chance to summon lightning bolts (scales with level) | ✅ | ✅ | ✅ | None |
| 震颤 | 3 | Spell | Sword | Damages entities in an area around you (radius and damage scale with level) | ✅ | ✅ | ✅ | None |
| 飞龙 | 2 | Normal | Elytra | Melee damage while elytra is active (scales with level) | ✅ | ✅ | ✅ | None |

### Legendary {#rarity-legendary}

| Name | Max lvl | Type | Gear | Effect (summary) | Table | Villager | Loot | Conflicts |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 三连射 | 1 | Normal | Bow | Fires 3 arrows per shot | ✅ | ✅ | ✅ | None |
| 下界探矿 | 2 | Normal | Pickaxe | Higher ancient debris drop chance (scales with level) | ❌ | ❌ | ❌ | 时运, 精准采集 |
| 代谢 | 2 | Normal | Chestplate | More hunger restored from food (scales with level) | ✅ | ✅ | ✅ | None |
| 传染 | 2 | Normal | Trident | Attacks can spread negative effects to nearby enemies (scales with level) | ✅ | ✅ | ✅ | None |
| 传送 | 2 | Spell | Sword | Teleport forward (distance scales with level) | ✅ | ✅ | ✅ | None |
| 冲锋 | 2 | Spell | Sword | Dash forward (strength scales with level) | ✅ | ✅ | ✅ | None |
| 创伤 | 7 | Normal | Bow, Crossbow | On hit, chance to apply DoT (chance, duration, damage scale with level) | ✅ | ✅ | ✅ | 锋利 |
| 升腾 | 2 | Spell | Sword | Levitate for a duration (scales with level) | ✅ | ✅ | ✅ | None |
| 坚韧 | 2 | Normal | Armor | Damage you deal is increased (scales with level) | ✅ | ✅ | ✅ | None |
| 挖掘延伸 | 2 | Normal | Shovel | Extra blocks broken per dig (scales with level) | ✅ | ❌ | ❌ | None |
| 无力挖掘诅咒 | 1 | Curse | Axe, Hoe, Pickaxe, Shovel | Chance mining does nothing (scales with level) | ❌ | ✅ | ✅ | None |
| 无力诅咒 | 1 | Curse | Sword, Axe | Chance attacks deal no damage (scales with level) | ❌ | ✅ | ✅ | None |
| 明亮 | 5 | Normal | Sword | Bonus damage vs Warden in sculk areas (scales with level) | ✅ | ✅ | ✅ | 锋利, 亡灵杀手, 节肢杀手, 内向, 屠宰 |
| 横扫 | 4 | Normal | Axe | Cleaving hits damage nearby mobs (radius and damage scale with level) | ✅ | ✅ | ✅ | None |
| 永恒诅咒 | 1 | Curse | Any item | Cannot modify this item on an anvil | ❌ | ✅ | ✅ | None |
| 流血 | 7 | Normal | Sword | On hit, chance to apply bleed (scales with level) | ✅ | ✅ | ✅ | None |
| 灵魂风暴 | 2 | Spell | Sword | Costs 3 hearts; large melee/ranged damage buff for a duration (scales with level) | ✅ | ✅ | ✅ | None |
| 炸药 | 2 | Spell | Pickaxe | Breaks a chunk of blocks on use; cooldown (area scales with level) | ❌ | ❌ | ❌ | None |
| 狱焰之触 | 1 | Normal | Pickaxe | Auto-smelts mined blocks | ✅ | ✅ | ✅ | 精准采集 |
| 磨蚀 | 2 | Normal | Sword, Axe | Extra armor durability loss on target (scales with level) | ✅ | ✅ | ✅ | None |
| 羽步 | 1 | Normal | Boots | Jumping onto crops does not trample them | ✅ | ✅ | ✅ | None |
| 致盲 | 4 | Normal | Sword | On hit, chance to apply Darkness (scales with level) | ✅ | ✅ | ✅ | None |
| 茁壮 | 2 | Normal | Armor | Bonus max health (scales with level) | ✅ | ✅ | ✅ | None |
| 补种 | 1 | Normal | Hoe | Disabled (replant was too strong for farms) | ❌ | ❌ | ❌ | None |
| 霉运诅咒 | 1 | Curse | Hoe, Shovel, Pickaxe, Axe | Chance blocks drop nothing (scales with level) | ❌ | ✅ | ✅ | None |
| 霜冻 | 3 | Normal | Bow | On hit, chance for a freeze-like effect (scales with level) | ✅ | ✅ | ✅ | None |
| 饥饿诅咒 | 1 | Curse | Helmet | Faster hunger drain (scales with level) | ❌ | ✅ | ✅ | None |

### Special {#rarity-special}

| Name | Max lvl | Type | Gear | Effect (summary) | Table | Villager | Loot | Conflicts |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 光环 | 2 | Unique | Chestplate, Leggings | Aura with ongoing effects on nearby units | ✅ | ✅ | ✅ | None |
| 活力 | 1 | Spell | Sword, Axe, Pickaxe, Shovel | Heals you to full health | ✅ | ✅ | ✅ | None |
| 流线型 | 4 | Normal | Boots | Movement speed (scales with level) | ✅ | ✅ | ✅ | None |
| 混乱 | 4 | Unique | Sword | Disorients target (strength scales with level) | ✅ | ✅ | ✅ | None |
| 爆破采矿 | 2 | Unique | Pickaxe | Chance to break a 3×3 area when mining (scales with level) | ❌ | ❌ | ❌ | 矿脉挖掘 |
| 透视矿石（已禁用） | 3 | Spell | Pickaxe | Disabled (ore vision hurt exploration pacing) | ❌ | ❌ | ❌ | None |

### Very special {#rarity-very-special}

| Name | Max lvl | Type | Gear | Effect (summary) | Table | Villager | Loot | Conflicts |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 我为人人 | 1 | Unique | Sword, Axe | Huge damage bonus (scales with level); conflicts with almost all other enchants | ❌ | ❌ | ❌ | All except this enchant |
| 曲速引擎（已禁用） | 1 | Unique | Bow | Disabled (mobility was too strong in PvP) | ❌ | ❌ | ❌ | None |
| 灵魂绑定 | 1 | Unique | Any item | Keeps this item on death | ✅ | ✅ | ✅ | None |
| 自我修复 | 3 | Unique | Any item | Periodically repairs durability (amount scales with level) | ✅ | ✅ | ✅ | 经验修补 |

## Vanilla enchants {#vanilla-enchants}

Names and blurbs as shown by the plugin; **damage, protection, etc.** follow vanilla Minecraft rules.

::: details Expand vanilla enchant table
| Name | Rarity | Type | Effect (summary) |
|:---:|:---:|:---:|:---:|
| Protection | Common | Normal | Less damage taken (scales with level) |
| Power | Common | Normal | Bow damage (scales with level) |
| Density | Common | Normal | Extra damage per block fallen on mace hits (scales with level) |
| Efficiency | Common | Normal | Faster mining (scales with level) |
| Pierce | Common | Normal | Arrows pierce more entities (scales with level) |
| Sharpness | Common | Normal | Melee damage (scales with level) |
| Smite | Uncommon | Normal | Melee damage vs undead (scales with level) |
| Knockback | Uncommon | Normal | Knockback on hit (scales with level) |
| Projectile Protection | Uncommon | Normal | Less projectile damage (scales with level) |
| Loyalty | Uncommon | Normal | Thrown trident returns |
| Quick Charge | Uncommon | Normal | Faster crossbow reload (scales with level) |
| Feather Falling | Uncommon | Normal | Less fall damage (scales with level) |
| Fire Protection | Uncommon | Normal | Less fire damage and burn time (scales with level) |
| Unbreaking | Uncommon | Normal | Durability lasts longer (scales with level) |
| Bane of Arthropods | Uncommon | Normal | Melee damage vs arthropods + Slowness (scales with level) |
| Frost Walker | Rare | Normal | Freezes water nearby (radius scales with level) |
| Punch | Rare | Normal | Arrow knockback (scales with level) |
| Multishot | Rare | Normal | Fires 3 arrows per shot |
| Looting | Rare | Normal | More common drops + rare drop chance (scales with level) |
| Fortune | Rare | Normal | More drops from some blocks (scales with level) |
| Sweeping Edge | Rare | Normal | Sweep attack damage (scales with level) |
| Respiration | Rare | Normal | Longer underwater breath + chance to ignore drowning (scales with level) |
| Aqua Affinity | Rare | Normal | No underwater mining slowdown |
| Luck of the Sea | Rare | Normal | Better treasure fishing odds (scales with level) |
| Depth Strider | Rare | Normal | Less underwater movement slowdown (scales with level) |
| Riptide | Rare | Normal | Trident dash in rain or water |
| Fire Aspect | Rare | Normal | Sets targets on fire; fire tick damage (scales with level) |
| Flame | Rare | Normal | Arrows set targets on fire (fixed fire damage) |
| Blast Protection | Rare | Normal | Less blast damage and knockback (scales with level) |
| Breach | Rare | Normal | Reduces armor effectiveness on hit (scales with level) |
| Impaling | Rare | Normal | Extra damage vs aquatic mobs (scales with level) |
| Mending | Rare | Normal | Repairs with XP orbs |
| Lure | Rare | Normal | Faster fishing bites (scales with level) |
| Channeling | Epic | Normal | Lightning on trident hit during thunderstorms |
| Infinity | Epic | Normal | Regular arrows are not consumed |
| Curse of Vanishing | Epic | Curse | Item is lost on death |
| Soul Speed | Epic | Normal | Faster on soul sand/soil (scales with level) |
| Silk Touch | Epic | Normal | Drops blocks themselves |
| Curse of Binding | Epic | Curse | Cannot remove armor from slot |
| Thorns | Epic | Normal | Chance to reflect damage to attacker (scales with level) |
| Swift Sneak | Epic | Normal | Less sneaking slowdown (scales with level) |
| Wind Burst | Legendary | Normal | Mace smash upward knockback multiplier (scales with level) |
:::

*Names and wording may differ slightly by game version (e.g. Sweeping Edge); trust the in-game book and anvil UI.*

## What the “Gear” column means {#gear-types}

Entries like **sword**, **pickaxe**, or **armor** mean **all materials** of that type that exist in vanilla. **Trident**, **bow**, **crossbow**, etc. are single item types without material tiers.

**Any item**: Not locked to one tool class—whether it applies is easiest to check on an **anvil** or **enchanting table**.

The enchanting table can also enchant **elytra**, **shield**, **flint and steel**, **shears**, **carrot on a stick**, and **player heads** (not always repeated in every row).
