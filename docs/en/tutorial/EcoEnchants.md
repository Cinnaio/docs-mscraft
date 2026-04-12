---
description: EcoEnchants catalog for ClusterGap—anvil cap, category limits, rarity weights, per-level numbers, vanilla and custom enchant tables.
---

# EcoEnchants Catalog

**Custom enchants** are listed below from **Common** upward by rarity. **Vanilla enchants** are in the collapsible [Vanilla enchants](#vanilla-enchants) section near the end.

- **Anvil**: A single item can have **at most 10 enchantments in total** (vanilla + custom combined). You cannot add more via the anvil once the cap is reached.
- **Table ✅ / ❌**: Whether the enchant can roll from the enchanting table, villagers, or loot; **❌** may still be obtainable elsewhere—see server rules.
- **“Type” column**: Caps how many enchants of that **category** can coexist on one item. This is **not** the same as **rarity** (the rarity tier “Special” is **not** the category “Unique”).
- **“Per level”**: Higher levels usually improve the numbers, chances, or durations in each row; **values per level** are in [Per-level numbers](#per-level-stats) below (in-game resolution still wins).

| Category | Per item |
|:---:|:---:|
| Normal | No extra category cap (still limited by the **≤10** total) |
| Curse | Up to **2** |
| Spell | Up to **1** |
| Unique | Up to **1** |

**Rarity** in the table below (Common → Very special) is the relative chance to roll **that tier** from each source; it is **not** the same as categories like Normal / Curse / Spell.

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

**Jump to**: [Rarity weights](#rarity-chances) · [Common](#rarity-common) · [Uncommon](#rarity-uncommon) · [Rare](#rarity-rare) · [Epic](#rarity-epic) · [Legendary](#rarity-legendary) · [Special](#rarity-special) · [Very special](#rarity-very-special) · [Per-level numbers](#per-level-stats) · [Vanilla table](#vanilla-enchants) · [Gear column](#gear-types)

> **Note:** Enchant **names** in the tables match the server’s in-game display (Chinese). Use tooltips on books and the anvil as the final reference if your client language differs.

## Custom enchants {#custom-enchants}

### Common {#rarity-common}

| Name | Max lvl | Type | Gear | Effect (summary) | Table | Villager | Loot | Conflicts |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 内向 | 5 | Normal | Sword | Higher melee **damage bonus** vs players (scales with level; game damage scale, **not** a fixed number of hearts) | ✅ | ✅ | ✅ | 锋利, 亡灵杀手, 节肢杀手, 屠宰, 明亮 |
| 屠宰 | 5 | Normal | Sword | Same vs passive mobs (**damage scale**, scales with level) | ✅ | ✅ | ✅ | 锋利, 亡灵杀手, 节肢杀手, 内向, 明亮 |
| 方块呼吸 | 3 | Normal | Helmet | Chance to ignore suffocation damage (scales with level) | ✅ | ✅ | ✅ | None |
| 采集 | 2 | Normal | Shears | Higher chance for apples from leaves (scales with level) | ✅ | ❌ | ❌ | None |

### Uncommon {#rarity-uncommon}

| Name | Max lvl | Type | Gear | Effect (summary) | Table | Villager | Loot | Conflicts |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 先发制人 | 5 | Normal | Sword, Axe | Vs full-health targets: damage increased by a **percent** (scales with level; not flat HP) | ✅ | ✅ | ✅ | None |
| 念力 | 1 | Normal | Pickaxe, Sword, Axe | Drops and XP go straight to inventory | ✅ | ❌ | ❌ | None |
| 智慧 | 2 | Normal | Sword, Axe, Pickaxe, Shovel, Hoe, Bow, Crossbow, Trident | Bonus XP from mob drops **percent** (scales with level) | ✅ | ❌ | ❌ | None |
| 末影杀手 | 6 | Normal | Sword, Axe | Bonus melee damage vs End mobs (scales with level) | ✅ | ✅ | ✅ | None |
| 终结 | 5 | Normal | Sword, Axe | For each 1% HP the target is missing, your damage is higher (**scaling factor** per level; **not** flat +damage per 1% HP) | ✅ | ✅ | ✅ | None |
| 跳射 | 3 | Normal | Bow, Crossbow | Bonus damage while airborne (scales with level) | ✅ | ✅ | ✅ | None |

### Rare {#rarity-rare}

| Name | Max lvl | Type | Gear | Effect (summary) | Table | Villager | Loot | Conflicts |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 修罗 | 2 | Normal | Axe | Below ~half health, crit damage multiplier increases (scales with level) | ✅ | ✅ | ✅ | None |
| 巨人杀手 | 6 | Normal | Sword | Higher damage multiplier vs targets with more max HP than you; capped (scales with level) | ✅ | ✅ | ✅ | None |
| 忍者 | 5 | Normal | Sword | Bonus melee damage while sneaking (scales with level) | ✅ | ✅ | ✅ | None |
| 提神 | 3 | Normal | Sword | Faster attack and mining while sprinting (scales with level) | ✅ | ✅ | ✅ | None |
| 火箭节省 | 3 | Normal | Elytra | Chance not to consume fireworks when boosting (scales with level) | ✅ | ✅ | ✅ | None |
| 生命窃取 | 6 | Normal | Sword | Part of damage dealt becomes healing (percent scales with level) | ✅ | ✅ | ✅ | None |
| 电火花 | 5 | Normal | Fishing rod | In thunderstorms, hooking an entity: lightning chance and lightning damage (scales with level) | ✅ | ✅ | ✅ | None |
| 眩晕 | 3 | Normal | Sword, Bow, Trident, Crossbow | Chance to stun on hit (scales with level); stun ~2 s | ✅ | ✅ | ✅ | None |
| 矿脉挖掘 | 3 | Normal | Pickaxe | Max extra blocks broken in one swing (scales with level) | ❌ | ❌ | ❌ | 爆破采矿 |
| 穿颅 | 3 | Normal | Bow, Crossbow, Trident | Bonus headshot damage (scales with level) | ✅ | ✅ | ✅ | None |
| 立体主义 | 7 | Normal | Sword, Axe, Bow, Crossbow | Bonus damage vs slimes and magma cubes (scales with level) | ✅ | ✅ | ✅ | None |
| 耐力 | 4 | Normal | Chestplate | Less hunger drain from sprinting (scales with level) | ✅ | ✅ | ✅ | None |
| 脱身 | 2 | Normal | Boots | Below 20% HP, movement speed bonus (scales with level) | ✅ | ✅ | ✅ | None |
| 闪光 | 6 | Normal | Bow, Crossbow | Chance to blind on hit (scales with level) | ✅ | ✅ | ✅ | None |
| 隐形 | 2 | Normal | Armor | On taking damage, chance and duration of invisibility (scales with level) | ✅ | ✅ | ✅ | None |
| 首领猎手 | 8 | Normal | Bow, Crossbow | Bonus damage vs bosses and elites (scales with level) | ✅ | ✅ | ✅ | None |

### Epic {#rarity-epic}

| Name | Max lvl | Type | Gear | Effect (summary) | Table | Villager | Loot | Conflicts |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 下界亲和 | 4 | Normal | Sword, Bow, Trident | Bonus damage in the Nether (scales with level) | ✅ | ✅ | ✅ | 末地亲和 |
| 伐木工 | 3 | Normal | Axe | Max logs felled in one chain chop (scales with level) | ✅ | ❌ | ✅ | None |
| 作祟 | 2 | Normal | Helmet | On death, spawns a damaging cloud for a duration (scales with level) | ✅ | ✅ | ✅ | None |
| 反震 | 3 | Normal | Shield | When blocking, reflects part of damage to attacker (percent scales with level) | ✅ | ✅ | ✅ | None |
| 奥术防御 | 5 | Normal | Armor | Chance to ignore magic/potion damage (scales with level) | ✅ | ✅ | ✅ | None |
| 末地亲和 | 4 | Normal | Sword, Bow, Trident | Bonus damage in the End (scales with level) | ✅ | ✅ | ✅ | 下界亲和 |
| 毒藤 | 2 | Normal | Leggings | Per heart of damage you deal, poisons attacker for a time (scales with level); total poison duration capped (scales with level) | ✅ | ✅ | ✅ | 荆棘 |
| 滑流 | 3 | Normal | Trident | Movement speed while holding (scales with level) | ✅ | ✅ | ✅ | None |
| 潜影收割 | 3 | Normal | Sword | Higher shulker shell drop chance (scales with level) | ❌ | ❌ | ❌ | 抢夺 |
| 灵巧 | 2 | Normal | Sword, Axe | Attack speed bonus (scales with level) | ✅ | ✅ | ✅ | None |
| 狙击 | 4 | Normal | Bow, Crossbow | More damage the farther the arrow flies (distance conversion and bonus % scale with level) | ✅ | ✅ | ✅ | None |
| 疾射 | 6 | Normal | Bow | Fire full-speed shots at lower draw (required draw % scales with level) | ✅ | ✅ | ✅ | None |
| 肾上腺素 | 3 | Normal | Shield | On successful block, damage-type buff; stronger at lower HP (scales with level) | ✅ | ✅ | ✅ | None |
| 致命打击 | 3 | Normal | Sword, Axe | Melee crit damage multiplier (scales with level) | ✅ | ✅ | ✅ | None |
| 逃脱 | 2 | Normal | Boots | After taking damage, short burst of speed (scales with level) | ✅ | ✅ | ✅ | 流线型 |
| 雷神 | 6 | Normal | Bow, Crossbow | On hit, chance to summon lightning bolts (count scales with level) | ✅ | ✅ | ✅ | None |
| 震颤 | 3 | Spell | Sword | Damages entities in an area (radius and damage scale with level) | ✅ | ✅ | ✅ | None |
| 飞龙 | 2 | Normal | Elytra | Melee damage while elytra is active (scales with level) | ✅ | ✅ | ✅ | None |

### Legendary {#rarity-legendary}

| Name | Max lvl | Type | Gear | Effect (summary) | Table | Villager | Loot | Conflicts |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 三连射 | 1 | Normal | Bow | Fires 3 arrows per shot | ✅ | ✅ | ✅ | None |
| 下界探矿 | 2 | Normal | Pickaxe | Higher ancient debris drop chance (scales with level) | ❌ | ❌ | ❌ | 时运, 精准采集 |
| 代谢 | 2 | Normal | Chestplate | More hunger restored from food (scales with level) | ✅ | ✅ | ✅ | None |
| 传染 | 2 | Normal | Trident | Attacks can spread negative effects to nearby enemies (strength scales with level) | ✅ | ✅ | ✅ | None |
| 传送 | 2 | Spell | Sword | Teleport forward (distance scales with level) | ✅ | ✅ | ✅ | None |
| 冲锋 | 2 | Spell | Sword | Dash forward (strength scales with level) | ✅ | ✅ | ✅ | None |
| 创伤 | 7 | Normal | Bow, Crossbow | On hit, DoT: trigger chance, duration, and tick damage (all scale with level) | ✅ | ✅ | ✅ | 锋利 |
| 升腾 | 2 | Spell | Sword | Levitate for a duration (scales with level) | ✅ | ✅ | ✅ | None |
| 坚韧 | 2 | Normal | Armor | Damage you deal is increased (scales with level) | ✅ | ✅ | ✅ | None |
| 挖掘延伸 | 2 | Normal | Shovel | Extra blocks broken per dig (scales with level) | ✅ | ❌ | ❌ | None |
| 无力挖掘诅咒 | 1 | Curse | Axe, Hoe, Pickaxe, Shovel | Chance mining does nothing (scales with level) | ❌ | ✅ | ✅ | None |
| 无力诅咒 | 1 | Curse | Sword, Axe | Chance attacks deal no damage (scales with level) | ❌ | ✅ | ✅ | None |
| 明亮 | 5 | Normal | Sword | Bonus damage vs Warden in sculk areas (scales with level) | ✅ | ✅ | ✅ | 锋利, 亡灵杀手, 节肢杀手, 内向, 屠宰 |
| 横扫 | 4 | Normal | Axe | Cleaving hits damage nearby mobs (radius and damage scale with level) | ✅ | ✅ | ✅ | None |
| 永恒诅咒 | 1 | Curse | Any item | Cannot modify this item on an anvil | ❌ | ✅ | ✅ | None |
| 流血 | 7 | Normal | Sword | On hit, chance and strength of bleed (scales with level) | ✅ | ✅ | ✅ | None |
| 灵魂风暴 | 2 | Spell | Sword | Costs 3 hearts; large melee/ranged damage buff for a duration (scales with level) | ✅ | ✅ | ✅ | None |
| 炸药 | 2 | Spell | Pickaxe | On use on blocks: breaks an area (size scales with level); cooldown | ❌ | ❌ | ❌ | None |
| 狱焰之触 | 1 | Normal | Pickaxe | Auto-smelts mined blocks | ✅ | ✅ | ✅ | 精准采集 |
| 磨蚀 | 2 | Normal | Sword, Axe | Extra armor durability loss on target (scales with level) | ✅ | ✅ | ✅ | None |
| 羽步 | 1 | Normal | Boots | Jumping onto crops does not trample them | ✅ | ✅ | ✅ | None |
| 致盲 | 4 | Normal | Sword | On hit, chance and duration of Darkness (scales with level) | ✅ | ✅ | ✅ | None |
| 茁壮 | 2 | Normal | Armor | Bonus max health (scales with level) | ✅ | ✅ | ✅ | None |
| 补种 | 1 | Normal | Hoe | Disabled (replant was too strong for farms) | ❌ | ❌ | ❌ | None |
| 霉运诅咒 | 1 | Curse | Hoe, Shovel, Pickaxe, Axe | Chance blocks drop nothing (scales with level) | ❌ | ✅ | ✅ | None |
| 霜冻 | 3 | Normal | Bow | On hit, freeze-like effect: chance and duration (scales with level) | ✅ | ✅ | ✅ | None |
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
| 我为人人 | 1 | Unique | Sword, Axe | Huge damage increase (scales with level); conflicts with almost all other enchants | ❌ | ❌ | ❌ | All except this enchant |
| 曲速引擎（已禁用） | 1 | Unique | Bow | Disabled (mobility was too strong in PvP) | ❌ | ❌ | ❌ | None |
| 灵魂绑定 | 1 | Unique | Any item | Keeps this item on death | ✅ | ✅ | ✅ | None |
| 自我修复 | 3 | Unique | Any item | Periodically repairs durability; amount per repair scales with level | ✅ | ✅ | ✅ | 经验修补 |

## Per-level numbers {#per-level-stats}

This section is for **players**: how the numbers you see on **books, the anvil, and item tooltips** usually change from **I** through **max level**.

- **L** is the enchant level (**L = 1** is **I**, **L = 2** is **II**, and so on).
- In the third column, values separated by commas are **I, II, III…** in order up to the usual max for that enchant (not “from 4% to 16%” as one range, but “I = 4%, II = 8%…”).
- For **vanilla** enchants like Protection or Knockback, shown values also interact with armor, resistance, and multiple pieces in built-in formulas—**actual combat feel** may not match the tooltip percent exactly; here we describe **what the tooltip tends to say**.
- For **custom** enchants, if a cell has both “tooltip” and “actual”, **UI text** and **backend resolution** may differ—trust the game.

(Data from this server’s EcoEnchants config; **20 ticks ≈ 1 second** for cooldown math.)

**Reading tips**: Formulas like **(A + B × L)%** mean “damage / XP / chance increased by that **percent**”, **not** flat +A damage. A comma-separated list **without** **%** is usually game **damage scale, blocks, seconds, counts**, etc.—**not** direct hearts (❤); use in-game tooltips as truth.

### Vanilla enchants (per-level tooltip ladder) {#vanilla-per-level-ladder}

“Usual max” is the highest Roman numeral you normally see in survival **without** commands changing caps.

| Enchant | Rough tooltip rule (L = current level) | About I, II, III… on tooltip | Usual max |
|:---:|:---:|:---:|:---:|
| 保护 | Protection % on tooltip = **4 × L** (+4% per level) | 4%, 8%, 12%, 16% | IV |
| 火焰保护 | Fire damage **8 × L**%; burn time **15 × L**% shorter | Fire: 8%…32%; burn: 15%…60% | IV |
| 摔落保护 | Fall damage **12 × L**% | 12%, 24%, 36%, 48% | IV |
| 爆炸保护 | Explosion damage **8 × L**%; knockback **15 × L**% | Damage 8%…32%; knockback 15%…60% | IV |
| 弹射物保护 | Projectile damage **8 × L**% | 8%, 16%, 24%, 32% | IV |
| 荆棘 | Thorns proc chance **15 × L**% | 15%, 30%, 45% | III |
| 水下呼吸 | **+15 × L** s breath; chance to ignore drowning = **L ÷ (L + 1)** | Seconds: 15, 30, 45; chance ~50%, ~67%, ~75% | III |
| 深海探索者 | Underwater slowdown reduced **~33.3 × L**% | ~33%, ~67%, ~100% | III |
| 冰霜行者 | Ice radius **L + 2** blocks | 3, 4 | II |
| 锋利 | Melee **damage bonus** (game scale, **not** flat hearts): **0.5 × L + 1** | 1.5, 2, 2.5, 3, 3.5 | V |
| 亡灵杀手 | Extra vs undead (**scale**, not hearts) **2.5 × L** | 2.5…12.5 | V |
| 节肢杀手 | Extra vs arthropods (**scale**) **2.5 × L**; Slowness **0.5 × L** s | Damage 2.5…12.5; slow 0.5…2.5 s | V |
| 击退 | Knockback on tooltip **(85 × L + 20)%** (whole thing is %, not +85 “knockback points”) | 105%, 190% | II |
| 火焰附加 | Fire tick damage **4 × L − 1** (scale; burn often ~4 s on tooltip) | 3, 7 | II |
| 抢夺 | Common drops **+L** cap; rare chance **+L%** (two different things) | Count +1,+2,+3; chance +1%,+2%,+3% | III |
| 横扫之刃 | Sweep damage bonus (often %) **L ÷ (L + 1)** | ~50%, ~67%, 75% | III |
| 效率 | Mining faster **(20 + 5 × L)%** | 25%, 30%, 35%, 40%, 45% | V |
| 耐久 | Durability multiplier **L + 1**× | ×2, ×3, ×4 | III |
| 时运 | Uses internal formula (not simple +per level) | ~34%, 75%, 121% | III |
| 力量 | Arrow damage **(25 × (L + 1))%** | 50%, 75%, 100%, 125%, 150% | V |
| 冲击 | Knockback **3 × L** blocks | 3, 6 | II |
| 海之眷顾 | Treasure chance **2 × L**% | 2%, 4%, 6% | III |
| 饵钓 | Wait time **−5 × L** s (tooltip) | 5, 10, 15 s | III |
| 穿刺 | Extra vs aquatic (**scale**) **2.5 × L** | 2.5…12.5 | V |
| 快速装填 | Reload **0.25 × L** s faster (tooltip) | 0.25, 0.5, 0.75 s | III |
| 穿透 | Entities pierced **L + 1** | 2, 3, 4, 5 | IV |
| 灵魂疾行 | Soul sand/soil speed factor **1.3 + 0.105 × L** (not %, not +1.3 blocks) | ~1.41, ~1.52, ~1.62 | III |
| 迅捷潜行 | Sneak slowdown reduced **15 × L**% (up to 100%) | 15%, 30%, 45% | III |
| 密度 | Mace fall damage per block **0.5 × L** (scale) | 0.5…2.5 | V |
| 破甲 | Armor effectiveness reduced **15 × L**% | 15%, 30%, 45%, 60% | IV |
| 风爆 | Mace upward knockback multiplier **1.15 + 0.35 × L** | ×1.5, ×1.85, ×2.2 | III |

### Custom enchants (listed in this catalog)

Spell enchants list **cooldowns**: **40 ticks ≈ 2 s**, **60 ticks ≈ 3 s**, **90 ticks ≈ 4.5 s**, **180 ticks ≈ 9 s**, **450 ticks ≈ 22.5 s**.

#### Common / Uncommon

| Enchant | How it scales with level | About I, II, III… (usual max in parentheses) |
|:---:|:---:|:---:|
| 内向 | Melee **damage bonus** vs players (**scale** on tooltip, **not** “+2.5 hearts per level”) **2.5 × L** | 2.5, 5, 7.5, 10, 12.5 (V) |
| 屠宰 | Same vs passives, **2.5 × L** | Same (V) |
| 方块呼吸 | Ignore suffocation **(15 × L)%** | 15%, 30%, 45% (III) |
| 采集 | Fortune-like formula (drop bonus %) | ~34%, ~75% (II) |
| 先发制人 | Vs full HP: **(30 + 20 × L)%** more damage (all %, not flat +30) | 50%, 70%, 90%, 110%, 130% (V) |
| 念力 | Only I, no numeric ladder | — (I) |
| 智慧 | XP **(50 + 10 × L)%** | 60%, 70% (II) |
| 末影杀手 | End mob melee bonus (**scale**) ~(**1 + 0.5 × L**) | 1.5…4 (VI) |
| 终结 | Per 1% missing HP, a multiplicative factor gains **0.2 × L** per level (not flat +0.2 per 1% HP) | Factor steps: 0.2…1.0 (V) |
| 跳射 | Airborne damage **(10 × L)%** | 10%, 20%, 30% (III) |

#### Rare

| Enchant | How it scales with level | About I, II, III… |
|:---:|:---:|:---:|
| 修罗 | Low-HP crit-related multiplier ~(**1 + 0.25 × L**)× | ×1.25, ×1.5 (II) |
| 巨人杀手 | Multiplier vs higher-HP targets with cap (not flat +damage per HP) | Multiplier and cap scale; ~0.6–1.1 and ~2.0–4.0 ballpark (VI) |
| 忍者 | Sneak melee extra (**scale**) **(0.5 + 0.5 × L)** | 1.0…3.0 (V) |
| 提神 | Sprint attack/mining **(5 × L)%** | 5%, 10%, 15% (III) |
| 火箭节省 | No firework use **20 × L**% | 20%, 40%, 60% (III) |
| 生命窃取 | **(10 × L)%** of damage to healing | 10%–60% (VI) |
| 电火花 | Strike chance **(25 + 5 × L)%**; strike **damage scale** **1 + L** (not %) | 30%/2 … 50%/6 (V) |
| 眩晕 | Stun chance **(2.5 + 2.5 × L)%**; ~2 s stun | 5%, 7.5%, 10% (III) |
| 矿脉挖掘 | Max chain break **1 + 2 × L** blocks | 3, 5, 7 (III) |
| 穿颅 | Headshot **(10 × L)%** | 10%, 20%, 30% (III) |
| 立体主义 | Vs slime/magma **(5 × L)%** | 5%–35% (VII) |
| 耐力 | Sprint hunger **(−20 × L)%** (less drain) | −20%…−80% (IV) |
| 脱身 | **Tooltip**: speed **(10 × L)%**. **Actual**: below 20% HP, speed ×**(1 + 0.1 × L)** | Tooltip 10%, 20%; actual ~×1.1, ×1.2 (II) |
| 闪光 | Blind chance **(L)%** (I = 1%, VI = 6%) | 1%–6% (VI) |
| 隐形 | **Tooltip**: proc **(2 × L)%**. **Actual** invis often ~**0.75 s, 1 s** (~15, 20 ticks)—may not match text | Proc 2%, 4% (II) |
| 首领猎手 | Vs boss/elite **(10 × L)%** | 10%–80% (VIII) |

#### Epic

| Enchant | How it scales with level | About I, II, III… |
|:---:|:---:|:---:|
| 下界亲和 | Nether damage **(20 + 10 × L)%** | 30%–60% (IV) |
| 伐木工 | Chain chop **2 × L** logs | 2, 4, 6 (III) |
| 作祟 | Death cloud ~**1 + L** s | 2, 3 s (II) |
| 反震 | Block reflect **(20 + 10 × L)%** | 30%, 40%, 50% (III) |
| 奥术防御 | Ignore magic damage **(4 × L)%** | 4%–20% (V) |
| 末地亲和 | End damage **(20 + 10 × L)%** | Same as Nether (IV) |
| 毒藤 | Per heart you deal, poison **0.5 × L** s; cap **4 + L** s | I: 0.5 s / cap 5 s; II: 1 s / cap 6 s |
| 滑流 | Hold trident speed **(8 × L)%** | 8%, 16%, 24% (III) |
| 潜影收割 | Shulker shell bonus (Fortune-like %) | ~121%, 167%, 215% (III) |
| 灵巧 | Attack speed **(10 × L)%** | 10%, 20% (II) |
| 狙击 | Farther arrow = more damage; about **(11 − ceil(L/2))** blocks per **L%** extra (distance math applies) | I: ~every 10 blocks +1% … IV: ~every 9 blocks +4% |
| 疾射 | Full-speed draw at **(100 − 15 × L)%** draw (draw %, not damage) | 85% down to 10% (VI) |
| 肾上腺素 | After block, Strength II for **20 + 10 × L** s | 30, 40, 50 s (III) |
| 致命打击 | Crit damage **(10 × L)%** | 10%, 20%, 30% (III) |
| 逃脱 | **Tooltip** **L** is easy to misread; **actual** is **Speed L** for **30** (often ticks—very short, in-game) | Speed I, II (II) |
| 雷神 | Lightning **(L)%**; bolts = **ceil(L/2)** (min 1) | 1%/1 … 6%/3 (VI) |
| 震颤 | Right-click AoE: radius **(2 + L)**; damage scale **3 × L**; **CD ~2 s (40 tick)** | 3/3 … 5/9 (III) |
| 飞龙 | Elytra melee **(10 × L)%** | 10%, 20% (II) |

#### Legendary

| Enchant | How it scales with level | About I, II, III… |
|:---:|:---:|:---:|
| 三连射 | Always 3 arrows | — (I) |
| 下界探矿 | Ancient debris Fortune-like | ~34%, ~75% (II) |
| 代谢 | Food hunger **(12.5 × L)%** | 12.5%, 25% (II) |
| 传染 | Poison cloud on hit; odds in UI, config not separate | In-game (II) |
| 传送 | Teleport **3 + 2 × L** blocks; **CD ~4.5 s (90 tick)** | 5, 7 (II) |
| 冲锋 | Dash strength ~**1.5 × L**; **CD ~2 s (40 tick)** | I ~1.5; II ~3 |
| 创伤 | **(3 × L)%** proc; **0.75 × (L + 2)** s; ticks ~**1** scale/tick (not 1❤/s flat; interval tied to **L + 2**) | 3%/2.25 s … 21%/6.75 s (VII) |
| 升腾 | **Actual**: levitate **5 × L** s; slow-fall delay **18 × L** ticks. Tooltip may differ | 5 s, 10 s float (II) |
| 坚韧 | **Tooltip** **(2 × L)%**; **actual** total damage ~(**1 + 0.02 × L**)× | Tooltip 2%, 4%; actual ~×1.02, ×1.04 (II) |
| 挖掘延伸 | +**L** extra blocks | 1, 2 (II) |
| 无力挖掘诅咒 | Fail mine **(15 × L)%** | 15% (I) |
| 无力诅咒 | Whiff **(15 × L)%** | 15% (I) |
| 明亮 | Warden in sculk **(4 × L)%** | 4%–20% (V) |
| 横扫 | **Tooltip** radius **(1 + L)**, damage scale **2 × L**. **Actual** radius **0.5 × L**, damage **2 × L** | See in-game (IV) |
| 永恒诅咒等 | No level ladder | — |
| 流血 | **(1.5 × L)%**; duration tied to **2 × L**; tick every **15 ticks**, **1** scale/tick | 1.5%–10.5% (VII) |
| 灵魂风暴 | **Actual**: ~(**1.5 + 0.5 × L**)× damage for **15 + 5 × L** s; costs **6** hearts; **CD ~9 s (180 tick)**. Large % in tooltip ≠ this multiplier | ~×1.5/15 s; ~×2/20 s (II) |
| 炸药 | **Tooltip** side **1 + 4 × L**. **Actual**: break radius **2 × L**, harmless blasts **2 × L**; **CD ~3 s (60 tick)** | I ~2 radius; II ~4 |
| 狱焰之触 / 羽步 | Mechanic-only | — (I) |
| 磨蚀 | Extra armor durability loss **L** | 1, 2 (II) |
| 致盲 | Darkness **(6 + L)%**; duration **4 + ceil(L/2)** s | 7%/5 s … 10%/6 s (IV) |
| 茁壮 | +**L** hearts max HP (tooltip) | 1, 2 hearts (II) |
| 霜冻 | Freeze **(3 + 2 × L)%**; **(2 + L)** s | 5%/3 s … 9%/5 s (III) |
| 霉运诅咒 | No drop **(15 × L)%** | 15% (I) |
| 饥饿诅咒 | Hunger **(50 × L)%** faster | 50% (I) |

#### Special / Very special

| Enchant | How it scales with level | About I, II, III… |
|:---:|:---:|:---:|
| 光环 | Radius **3 + 2 × L**; damage taken ×**(1 − 0.1 × L)** in aura | 5 / ~0.9×; 7 / ~0.8× (II) |
| 活力 | Right-click full heal; **CD ~22.5 s (450 tick)** | — (I) |
| 流线型 | Speed **(5 × L)%** | 5%–20% (IV) |
| 混乱 | Shuffle hotbar **(2 × L)%** | 2%–8% (IV) |
| 爆破采矿 | 3×3 proc **(2 × L)%** | 2%, 4% (II) |
| 我为人人 | Tooltip **+500%** damage (~**×6** total; %, not +500 flat) (I only) | — (I) |
| 灵魂绑定 | Keeps item on death | — (I) |
| 自我修复 | ~every **1.5 s (30 tick)** repairs durability; tooltip seconds/points may not match **watch the durability bar** | I–III (III) |

*Disabled or main-table-missing enchants (补种, 透视矿石, 曲速引擎, etc.) are omitted here.*

## Vanilla enchants {#vanilla-enchants}

Names and blurbs as shown by the plugin; **damage, protection, etc.** follow vanilla Minecraft rules.

::: details Expand vanilla enchant table
| Name | Rarity | Type | Effect (summary) |
|:---:|:---:|:---:|:---:|
| 保护 | Common | Normal | Less damage taken (scales with level) |
| 力量 | Common | Normal | Arrow damage (scales with level) |
| 密度 | Common | Normal | Extra damage per block fallen on mace hits (scales with level) |
| 效率 | Common | Normal | Faster mining (scales with level) |
| 穿透 | Common | Normal | Arrows pierce more entities (scales with level) |
| 锋利 | Common | Normal | Melee damage (scales with level) |
| 亡灵杀手 | Uncommon | Normal | Melee damage vs undead (scales with level) |
| 击退 | Uncommon | Normal | Knockback on hit (scales with level) |
| 弹射物保护 | Uncommon | Normal | Less projectile damage (scales with level) |
| 忠诚 | Uncommon | Normal | Thrown trident returns |
| 快速装填 | Uncommon | Normal | Faster crossbow reload (scales with level) |
| 摔落保护 | Uncommon | Normal | Less fall damage (scales with level) |
| 火焰保护 | Uncommon | Normal | Less fire damage and burn time (scales with level) |
| 耐久 | Uncommon | Normal | Item lasts longer (scales with level) |
| 节肢杀手 | Uncommon | Normal | Melee damage vs arthropods + Slowness (duration scales with level) |
| 冰霜行者 | Rare | Normal | Freezes water nearby (radius scales with level) |
| 冲击 | Rare | Normal | Arrow knockback (blocks scale with level) |
| 多重射击 | Rare | Normal | Fires 3 arrows per shot |
| 抢夺 | Rare | Normal | More common drop cap + rare drop chance (scales with level) |
| 时运 | Rare | Normal | More drops from some blocks (scales with level) |
| 横扫之刃 | Rare | Normal | Sweep attack damage (scales with level) |
| 水下呼吸 | Rare | Normal | Longer underwater breath + chance to ignore drowning (scales with level) |
| 水下速掘 | Rare | Normal | No underwater mining slowdown |
| 海之眷顾 | Rare | Normal | Better treasure fishing odds (scales with level) |
| 深海探索者 | Rare | Normal | Less underwater movement slowdown (scales with level) |
| 激流 | Rare | Normal | Trident dash in rain or water |
| 火焰附加 | Rare | Normal | Ignites target; fire tick damage (scales with level) |
| 火矢 | Rare | Normal | Arrows ignite target (fixed fire damage) |
| 爆炸保护 | Rare | Normal | Less blast damage and knockback (scales with level) |
| 破甲 | Rare | Normal | Reduces armor effectiveness on hit (scales with level) |
| 穿刺 | Rare | Normal | Extra damage vs aquatic mobs (scales with level) |
| 经验修补 | Rare | Normal | Repairs with XP orbs |
| 饵钓 | Rare | Normal | Shorter fishing wait (scales with level) |
| 引雷 | Epic | Normal | Lightning on trident hit in thunderstorms |
| 无限 | Epic | Normal | Regular arrows not consumed |
| 消失诅咒 | Epic | Curse | Item lost on death |
| 灵魂疾行 | Epic | Normal | Faster on soul sand/soil (scales with level) |
| 精准采集 | Epic | Normal | Drops blocks themselves |
| 绑定诅咒 | Epic | Curse | Cannot remove armor from slot |
| 荆棘 | Epic | Normal | Chance to reflect damage to attacker (scales with level) |
| 迅捷潜行 | Epic | Normal | Less sneaking slowdown (scales with level) |
| 风爆 | Legendary | Normal | Mace smash upward knockback multiplier (scales with level) |
:::

*Names and wording may differ by game version (e.g. 横扫之刃); trust the in-game book and anvil UI.*

## What the “Gear” column means {#gear-types}

Entries like **sword**, **pickaxe**, or **armor** mean **all materials** of that type in vanilla. **Trident**, **bow**, **crossbow**, etc. are single item types without material tiers.

**Any item**: Not locked to one tool class—whether it applies is easiest to check on an **anvil** or **enchanting table**.

The enchanting table can also enchant **elytra**, **shield**, **flint and steel**, **shears**, **carrot on a stick**, and **player heads** (not always repeated in every row).
