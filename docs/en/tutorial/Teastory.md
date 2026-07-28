# TeaStory Basics Guide <Badge type="tip" text="Testing" />

> This project is currently in beta testing. Some parameters may affect gameplay experience and will be continuously improved.
> If you have any suggestions or ideas, feel free to contact me to make corrections. Thank you!

> Credits & license: This adaptation is made with full respect for the original work and follows its license.  
> Original project and license: [Tea-the-Story](https://github.com/RoShioLeo/Tea-the-Story?tab=readme-ov-file#license-%E8%AE%B8%E5%8F%AF%E8%AF%81)
> **Core summary**: The TeaStory main loop is "harvest -> wither -> process -> ferment/finish -> brew/pour -> residue recycle". All primary processing and brewing happen on **five custom machines** — right-click a machine to open its GUI, load ingredients, and it processes automatically along a progress bar.

## The Five Machines

Tea processing no longer relies on vanilla campfires/furnaces. Instead, craft these five machine blocks at a crafting table and right-click to open their GUI:

| Machine | Role | Fuel | Weather |
|---|---|---|---|
| **Tea Pan (Teapan)** | Wither / Soak / Rescue / Yellowing | None (open air) | ✅ clear/rain/thunder change output |
| **Frying Pan** | Fixation / Pan-firing / Scorch | Vanilla fuel (coal, charcoal…) | ❌ |
| **Fermentation Barrel** | 3-stage fermentation | **Baking Powder only** | ❌ |
| **Tea Stove** | Roasting / Baking / Steaming | Vanilla fuel | ❌ |
| **Tea Table** | Cup/kettle brewing + pouring | None | ❌ |

::: tip Common controls
- **Tea Pan**: input slot 12, output slot 14.
- **Frying Pan / Tea Stove**: input slot 2, fuel slot 20, output slot 15.
- **Fermentation Barrel**: input slot 12, baking-powder slot 13, output slot 14.
- **Tea Table**: six input slots (tool / sugar / cup / water / leaf) -> output slot 15, see "Tea Table Brewing".
- Sneak + right-click a machine to open its internal storage and retrieve misplaced items.
:::

## Quick Parameters

| Stage | Machine | Parameters |
|---|---|---|
| Withering (clear) | **Tea Pan** | graded fresh leaf -> matching withered leaf, ~5 s |
| Soaking (rain/thunder) | **Tea Pan** | fresh leaf -> Wet Tea Leaf (loses grade); rain 3 s / thunder 2 s |
| Rescue (clear) | **Tea Pan** | Wet Tea Leaf -> ungraded withered leaf, ~7 s |
| Yellowing | **Tea Pan** | Green Tea Leaf -> Yellow Tea Leaf, ~8 s |
| Fixation | **Frying Pan** | withered leaf -> Green Leaf (Single Bud / One Bud One Leaf yield 2, others 1), ~5 s |
| Pan-firing | **Frying Pan** | Green Leaf -> Green Tea Leaf, ~6 s |
| Scorch | **Frying Pan** | Wet Tea Leaf -> Scorched Leaf (trap), ~4 s |
| Grinding | crafting table (mortar) | 1 Green Leaf -> 3 Broken Tea Leaf; mortar loses 1 durability per use |
| 3-stage fermentation | **Barrel** | broken -> semi -> full -> deep, each consumes baking powder |
| Roasting | **Tea Stove** | semi->oolong / full->black / deep->pu'er |
| Baking | **Tea Stove** | Green Leaf -> White Tea Leaf |
| Steaming | **Tea Stove** | Green Tea Leaf -> Matcha Leaf |
| Empty Tea Bag | crafting table | 1 String + 5 Paper -> 3 Empty Tea Bag |
| Finished Tea Bag | crafting table | 1 Empty Tea Bag + 6 matching leaves -> 1 Tea Bag |
| Fill water (batch) | crafting table | 9 empty pots + 1 water bucket -> 9 filled pots |
| Boiling water | furnace/blast furnace | Furnace 8 s, Blast Furnace 4 s |
| Residue recycle | crafting table | any 2 residues/scorched leaf -> 1 Baking Powder |
| Tea Whisk | Tea Table matcha recipes | loses 1 durability per brew (total 120) |
| Mature rice drop | — | Only drops <span class="item-chip"><img src="/images/teastory/xian_rice_seeds.png" alt="Rice Seed" />Rice Seed</span> (currently 1~3) |
| Rice processing | crafting table (mortar) | <span class="item-chip"><img src="/images/teastory/wooden_mortar_and_pestle.png" alt="Wooden Mortar & Pestle" />Wooden Mortar & Pestle</span> + <span class="item-chip"><img src="/images/teastory/xian_rice_seeds.png" alt="Rice Seed" />Rice Seed</span> -> <span class="item-chip"><img src="/images/teastory/xian_rice.png" alt="Rice" />Rice</span> |

## Quick Flow

::: tip Quick note
All crop growth is affected by season, solar terms, and environment.
:::

1. Get <span class="item-chip"><img src="/images/teastory/tea_seeds.png" alt="Tea Seeds" />Tea Seeds</span> from world loot chests (or as a chance drop from breaking jungle leaves), plant them on farmland; wild tea trees may also generate naturally.
2. Wait for the tea tree to mature, then harvest <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud.png" alt="Fresh Leaf" />Fresh Leaf</span> (random quality and quantity).
3. **Wither (Tea Pan)**: in clear weather, put <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud.png" alt="Fresh Leaf" />Fresh Leaf</span> into the Tea Pan to get matching <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_bud.png" alt="Withered Leaf" />Withered Leaf</span>.
   - Rain/thunder soaks it into <span class="item-chip"><img src="/images/teastory/wet_tea_leaf.png" alt="Wet Tea Leaf" />Wet Tea Leaf</span> (loses grade); putting that back in the pan on a clear day rescues it into an ungraded withered leaf.
4. **Fixation (Frying Pan)**: fry withered leaves (needs fuel) into <span class="item-chip"><img src="/images/teastory/tea_leaf.png" alt="Green Leaf" />Green Leaf</span>; wet leaf only scorches.
5. **Process tea**: pick a route — pan-firing (green) / mortar + fermentation (oolong/black/pu'er) / baking (white) / steaming (matcha) / yellowing (yellow). See "Processing Routes".
6. **Make tea bags** (optional): Empty Tea Bag + matching leaf x6 -> matching tea bag (for kettle brewing).
7. **Prepare kettle & water**: craft a kettle blank and fire it into an empty kettle; fill a water pot and boil it into a boiled water pot.
8. **Brew (Tea Table)**: leaves/bags + boiled water pot + cup or empty kettle -> cup or kettle drink. See "Tea Table Brewing".
9. **Pour (Tea Table)**: full kettle + empty cup -> cup drink (porcelain 4 cups / zisha 8 cups; returns empty kettle when drained).
10. **Recycle**: any residue/scorched leaf x2 -> Baking Powder x1 (feeds back into fermentation).

## Processing Routes

```
Tea Tree ──harvest──> graded fresh leaf (bud / bud+1 / +2 / +3 / old leaf)
                   │
     [Tea Pan · Wither (clear)] -> matching withered leaf   [Tea Pan · Soak (rain/thunder)] -> wet leaf
                   │                                                 │
     [Frying Pan · Fixation] -> Green Leaf         [Tea Pan · Rescue (clear)] -> ungraded withered -> (fixation) -> Green Leaf
                   │                                [Frying Pan · Scorch (wet leaf)] -> Scorched Leaf
   ┌───────────────┼────────────────┬──────────────┐
[Frying Pan·firing]  mortar(table)  [Tea Stove·bake]  (Green Leaf)
  -> Green Tea Leaf   -> Broken x3    -> White Tea Leaf
   │                     │
[Tea Pan·Yellowing]  [Barrel] 3-stage fermentation (baking-powder driven)
  green -> yellow     broken -> semi -> full -> deep
[Tea Stove·Steam]        │
  green -> matcha    [Tea Stove·Roast] semi->oolong / full->black / deep->pu'er
                   │
              [Tea Table] brew (cup/kettle) + pour; kettle uses tea bag -> returns residue; scorched leaf/residue x2 -> baking powder (loop)
```

## Harvest & Primary Processing

### 1) Withering (Tea Pan, weather-based)

Put graded fresh leaves into the **Tea Pan** input (no fuel needed); output depends on weather:

- **Clear -> matching withered leaf**:
  - <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud.png" alt="Fresh Leaf (Single Bud)" />Fresh Leaf (Single Bud)</span> -> <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_bud.png" alt="Withered Leaf (Single Bud)" />Withered Leaf (Single Bud)</span>
  - <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud_leaf1.png" alt="Fresh Leaf (One Bud One Leaf)" />Fresh Leaf (One Bud One Leaf)</span> -> <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_bud_leaf1.png" alt="Withered Leaf (One Bud One Leaf)" />Withered Leaf (One Bud One Leaf)</span>
  - <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud_leaf2.png" alt="Fresh Leaf (One Bud Two Leaves)" />Fresh Leaf (One Bud Two Leaves)</span> -> <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_bud_leaf2.png" alt="Withered Leaf (One Bud Two Leaves)" />Withered Leaf (One Bud Two Leaves)</span>
  - <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud_leaf3.png" alt="Fresh Leaf (One Bud Three Leaves)" />Fresh Leaf (One Bud Three Leaves)</span> -> <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_bud_leaf3.png" alt="Withered Leaf (One Bud Three Leaves)" />Withered Leaf (One Bud Three Leaves)</span>
  - <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_old_leaf.png" alt="Fresh Leaf (Old Leaf)" />Fresh Leaf (Old Leaf)</span> -> <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_old_leaf.png" alt="Withered Leaf (Old Leaf)" />Withered Leaf (Old Leaf)</span>
- **Rain / thunder -> soaked**: any graded fresh leaf -> <span class="item-chip"><img src="/images/teastory/wet_tea_leaf.png" alt="Wet Tea Leaf" />Wet Tea Leaf</span> (loses grade; thunder is faster).
- **Rescue (clear)**: <span class="item-chip"><img src="/images/teastory/wet_tea_leaf.png" alt="Wet Tea Leaf" />Wet Tea Leaf</span> -> <span class="item-chip"><img src="/images/teastory/withered_tea_leaf.png" alt="Withered Leaf" />ungraded Withered Leaf</span>.

::: warning Mind the weather
The Tea Pan is an open-air machine. After loading, watch the sky: load on a clear day for graded withered leaves; rain gives wet leaf that needs an extra rescue step.
:::

### 2) Fixation & Pan-firing (Frying Pan, needs fuel)

The **Frying Pan** needs vanilla fuel (coal / charcoal / planks…).

- **Fixation**: withered leaf -> <span class="item-chip"><img src="/images/teastory/tea_leaf.png" alt="Green Leaf" />Green Leaf</span>

  | Withered leaf type | Green leaf output |
  |---|---:|
  | Single Bud | 2 |
  | One Bud One Leaf | 2 |
  | One Bud Two Leaves | 1 |
  | One Bud Three Leaves | 1 |
  | Old Leaf | 1 |
  | Ungraded (from rescue) | 1 |

- **Pan-firing**: <span class="item-chip"><img src="/images/teastory/tea_leaf.png" alt="Green Leaf" />Green Leaf</span> -> <span class="item-chip"><img src="/images/teastory/green_tea_leaf.png" alt="Green Tea Leaf" />Green Tea Leaf</span>
- **Scorch (trap)**: <span class="item-chip"><img src="/images/teastory/wet_tea_leaf.png" alt="Wet Tea Leaf" />Wet Tea Leaf</span> -> <span class="item-chip"><img src="/images/teastory/failed_fixation_tea_leaf.png" alt="Scorched Leaf" />Scorched Leaf</span> (recyclable into baking powder).

### 3) Mortar & Fermentation

- Grinding (crafting table, mortar loses durability): <span class="item-chip"><img src="/images/teastory/wooden_mortar_and_pestle.png" alt="Wooden Mortar & Pestle" />Wooden Mortar & Pestle x1</span> + <span class="item-chip"><img src="/images/teastory/tea_leaf.png" alt="Green Leaf" />Green Leaf x1</span> -> <span class="item-chip"><img src="/images/teastory/broken_tea_leaf.png" alt="Broken Tea Leaf" />Broken Tea Leaf x3</span>
- **Barrel 3-stage fermentation**: put leaves in the input slot and <span class="item-chip"><img src="/images/teastory/baking_powder.png" alt="Baking Powder" />Baking Powder</span> in the fuel slot (**exclusive fuel — one baking powder covers several process cycles**), upgrading in order:
  - <span class="item-chip"><img src="/images/teastory/broken_tea_leaf.png" alt="Broken Tea Leaf" />Broken Tea Leaf</span> -> <span class="item-chip"><img src="/images/teastory/semi_fermented_tea_leaf.png" alt="Semi Fermented Tea Leaf" />Semi Fermented</span>
  - <span class="item-chip"><img src="/images/teastory/semi_fermented_tea_leaf.png" alt="Semi Fermented Tea Leaf" />Semi Fermented</span> -> <span class="item-chip"><img src="/images/teastory/fully_fermented_tea_leaf.png" alt="Fully Fermented Tea Leaf" />Fully Fermented</span>
  - <span class="item-chip"><img src="/images/teastory/fully_fermented_tea_leaf.png" alt="Fully Fermented Tea Leaf" />Fully Fermented</span> -> <span class="item-chip"><img src="/images/teastory/deep_fermented_tea_leaf.png" alt="Deep Fermented Tea Leaf" />Deep Fermented</span>

Notes:
- Baking powder base source: `2 Wheat -> 1 Baking Powder` (crafting table); residue/scorched-leaf recycling also produces it.
- The barrel won't start without baking powder; it only accepts baking powder, not vanilla fuel.

### 4) Roasting / Baking / Steaming (Tea Stove, needs fuel)

The **Tea Stove** needs vanilla fuel and handles three finishing routes:

- **Roasting (fermented leaf -> finished tea)**:
  - <span class="item-chip"><img src="/images/teastory/semi_fermented_tea_leaf.png" alt="Semi Fermented" />Semi Fermented</span> -> <span class="item-chip"><img src="/images/teastory/oolong_tea_leaf.png" alt="Oolong Tea Leaf" />Oolong Tea Leaf</span>
  - <span class="item-chip"><img src="/images/teastory/fully_fermented_tea_leaf.png" alt="Fully Fermented" />Fully Fermented</span> -> <span class="item-chip"><img src="/images/teastory/black_tea_leaf.png" alt="Black Tea Leaf" />Black Tea Leaf</span>
  - <span class="item-chip"><img src="/images/teastory/deep_fermented_tea_leaf.png" alt="Deep Fermented" />Deep Fermented</span> -> <span class="item-chip"><img src="/images/teastory/puer_tea_leaf.png" alt="Pu'er Tea Leaf" />Pu'er Tea Leaf</span>
- **Baking (low-temp dry green leaf -> white tea)**: <span class="item-chip"><img src="/images/teastory/tea_leaf.png" alt="Green Leaf" />Green Leaf</span> -> <span class="item-chip"><img src="/images/teastory/white_tea_leaf.png" alt="White Tea Leaf" />White Tea Leaf</span>
- **Steaming (steam + grind green tea -> matcha)**: <span class="item-chip"><img src="/images/teastory/green_tea_leaf.png" alt="Green Tea Leaf" />Green Tea Leaf</span> -> <span class="item-chip"><img src="/images/teastory/matcha_tea_leaf.png" alt="Matcha Leaf" />Matcha Leaf</span>

### 5) Yellowing (Tea Pan)

- Put <span class="item-chip"><img src="/images/teastory/green_tea_leaf.png" alt="Green Tea Leaf" />Green Tea Leaf</span> into the **Tea Pan** (no weather requirement) -> <span class="item-chip"><img src="/images/teastory/yellow_tea_leaf.png" alt="Yellow Tea Leaf" />Yellow Tea Leaf</span>.

> All six tea types + matcha leaves are now ready: green (pan-firing), yellow (yellowing), white (baking), oolong (semi-ferment roast), black (full-ferment roast), pu'er (deep-ferment roast), matcha (steaming).

## Tea Bags, Kettles, and Cups

### 1) Empty & finished tea bags (crafting table)

- 5 Paper + 1 String -> <span class="item-chip"><img src="/images/teastory/empty_tea_bag.png" alt="Empty Tea Bag" />Empty Tea Bag x3</span>
- <span class="item-chip"><img src="/images/teastory/empty_tea_bag.png" alt="Empty Tea Bag" />Empty Tea Bag x1</span> + <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_leaf.png" alt="Green Tea Leaf" /><img src="/images/teastory/black_tea_leaf.png" alt="Black Tea Leaf" /><img src="/images/teastory/oolong_tea_leaf.png" alt="Oolong Tea Leaf" /><img src="/images/teastory/puer_tea_leaf.png" alt="Pu'er Tea Leaf" /><img src="/images/teastory/white_tea_leaf.png" alt="White Tea Leaf" /><img src="/images/teastory/yellow_tea_leaf.png" alt="Yellow Tea Leaf" /></span>matching leaf x6</span> -> <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_bag.png" alt="Green Tea Bag" /><img src="/images/teastory/black_tea_bag.png" alt="Black Tea Bag" /><img src="/images/teastory/oolong_tea_bag.png" alt="Oolong Tea Bag" /><img src="/images/teastory/puer_tea_bag.png" alt="Pu'er Tea Bag" /><img src="/images/teastory/white_tea_bag.png" alt="White Tea Bag" /><img src="/images/teastory/yellow_tea_bag.png" alt="Yellow Tea Bag" /></span>matching bag x1</span>
- Supported: green, black, oolong, pu'er, white, yellow (six flavors).

### 2) Kettles & cups (crafting table + firing)

- Cups: <span class="item-chip"><img src="/images/teastory/cup_glass.png" alt="Glass Cup" />Glass Cup</span>, <span class="item-chip"><img src="/images/teastory/cup_stone.png" alt="Stone Cup" />Stone Cup</span>, <span class="item-chip"><img src="/images/teastory/cup_wood.png" alt="Wooden Cup" />Wooden Cup</span>, <span class="item-chip"><img src="/images/teastory/cup_porcelain.png" alt="Porcelain Cup" />Porcelain Cup</span>, <span class="item-chip"><img src="/images/teastory/cup_zisha.png" alt="Zisha Cup" />Zisha Cup</span>.
- Kettles: <span class="item-chip"><img src="/images/teastory/empty_porcelain_kettle.png" alt="Empty Porcelain Kettle" />Empty Porcelain Kettle</span>, <span class="item-chip"><img src="/images/teastory/empty_zisha_kettle.png" alt="Empty Zisha Kettle" />Empty Zisha Kettle</span>.
- Water pots: <span class="item-chip"><img src="/images/teastory/water_pot_stone.png" alt="Water Pot" />stone/porcelain/iron/zisha water pots</span> can be boiled in a furnace/blast furnace into **boiled water pots**.

Empty kettle source (kettle blank -> firing):
- Kettle blank (crafting table, strict shape; material: 6 clay balls):
  - Row 1: ` empty clay-ball empty `
  - Row 2: ` clay-ball empty clay-ball `
  - Row 3: ` clay-ball clay-ball clay-ball `
- Fire the blank in a furnace/blast furnace into an <span class="item-chip"><img src="/images/teastory/empty_porcelain_kettle.png" alt="Empty Porcelain Kettle" />Empty Porcelain Kettle</span> (blast furnace is faster). Zisha kettle works the same with zisha clay.

Player tips:
- Batch your water pots: 9 empty pots + 1 water bucket fills all at once.
- Boiled water pots aren't material-locked: stone/porcelain/iron/zisha boiled pots all work for brewing.

## Tea Table Brewing

The **Tea Table** is the final brewing station. Right-click to open its six-slot GUI:

- **Tool slot**: Tea Whisk (matcha) / Milk Bucket (milk tea) / Lemon (lemon tea)
- **Sugar slot**: **Sugar** (needed for milk/lemon/matcha)
- **Cup slot**: empty cup or empty kettle (decides cup vs kettle)
- **Water slot**: any **boiled water pot**, or a **full kettle** (for pouring)
- **Leaf slot**: tea leaves or tea bags
- **Output slot**: the finished drink

### 1) Cup of plain tea

- matching dry leaf x2 + any boiled water pot + empty cup -> matching cup drink (returns empty cup after drinking).
- Six flavors x five cup materials (glass/stone/wood/porcelain/zisha), any combination.

### 2) Kettle of plain tea (bag-brewed, returns residue)

- Porcelain kettle: tea bag x1 + boiled water pot + empty porcelain kettle -> porcelain kettle drink; zisha kettle: tea bag x2 + empty zisha kettle.
- The tea bag is consumed and returns matching **tea residue** (recyclable into baking powder).

### 3) Special drinks: milk / lemon / matcha

| Flavor | Leaf | Tool | Sugar | Notes |
|---|---|---|---|---|
| **Milk Tea** | Black Tea Leaf x2 | Milk Bucket (returns bucket) | 3 | cup version; kettle uses black tea bag |
| **Lemon Tea** | Black Tea Leaf x2 | <span class="item-chip"><img src="/images/teastory/lemon.png" alt="Lemon" />Lemon</span> | 3 | cup version; kettle uses black tea bag |
| **Matcha** | Matcha Leaf x2 | <span class="item-chip"><img src="/images/teastory/tea_whisk.png" alt="Tea Whisk" />Tea Whisk</span> (loses 1 durability) | 3 | cup version; kettle uses loose matcha powder |

> Lemon source: breaking **jungle leaves** has a chance to drop <span class="item-chip"><img src="/images/teastory/lemon.png" alt="Lemon" />Lemon</span>; it's also directly edible.

### 4) Pouring (full kettle -> cup)

- Put a **full kettle** into the water slot + an empty cup -> a cup drink.
- Each pour costs 1 durability: **porcelain kettle 4 cups / zisha kettle 8 cups**; returns the matching empty kettle when drained.
- Nine flavors (six teas + matcha + milk + lemon) x two kettles x five cups can all be poured.

::: tip Brew vs Pour
- **Brew**: leaves/bags + boiled water pot, producing one cup or a whole kettle at once.
- **Pour**: an existing full kettle + empty cup, splitting a kettle into several cups — more leaf-efficient.
:::

## Rice & Paddy Line

### 1) Two-stage planting flow

- Stage 1 (normal farmland): plant <span class="item-chip"><img src="/images/teastory/xian_rice_seeds.png" alt="Rice Seed" />Rice Seed</span> on normal farmland to raise seedlings, then harvest <span class="item-chip"><img src="/images/teastory/item_xian_rice_seedling.png" alt="Rice Seedling" />Rice Seedling</span>.
- Stage 2 (paddy transplant): transplant <span class="item-chip"><img src="/images/teastory/item_xian_rice_seedling.png" alt="Rice Seedling" />Rice Seedling</span> into <span class="item-chip"><img src="/images/teastory/paddy_field.png" alt="Paddy Field" />Paddy Field</span> for continued growth.

### 2) Paddy field behavior

- <span class="item-chip"><img src="/images/teastory/paddy_field.png" alt="Paddy Field" />Paddy Field</span> can be placed, broken, and recovered as an item drop.
- Bucket interactions are restricted: empty buckets cannot pick it up, and water buckets cannot refill it again.
- The field uses shallow-water visuals (mud base + water surface) with water-like interaction sounds.
- Craft: 8 Dirt around 1 Water Bucket -> Paddy Field x8 (the bucket is auto-returned).

### 3) Mature product and processing

- Mature rice plants drop only <span class="item-chip"><img src="/images/teastory/xian_rice_seeds.png" alt="Rice Seed" />Rice Seed</span> (not direct <span class="item-chip"><img src="/images/teastory/xian_rice.png" alt="Rice" />Rice</span>).
- Processing recipe: <span class="item-chip"><img src="/images/teastory/wooden_mortar_and_pestle.png" alt="Wooden Mortar & Pestle" />Wooden Mortar & Pestle</span> + <span class="item-chip"><img src="/images/teastory/xian_rice_seeds.png" alt="Rice Seed" />Rice Seed</span> -> <span class="item-chip"><img src="/images/teastory/xian_rice.png" alt="Rice" />Rice</span>.

## Tea Residue System

### 1) Residue output

Brewing a kettle with a **tea bag** at the Tea Table returns matching residue:

- <span class="item-chip"><img src="/images/teastory/black_tea_bag.png" alt="Black Tea Bag" />Black Tea Bag</span> -> <span class="item-chip"><img src="/images/teastory/black_tea_residue.png" alt="Black Tea Residue" />Black Tea Residue</span>
- <span class="item-chip"><img src="/images/teastory/green_tea_bag.png" alt="Green Tea Bag" />Green Tea Bag</span> -> <span class="item-chip"><img src="/images/teastory/green_tea_residue.png" alt="Green Tea Residue" />Green Tea Residue</span>
- <span class="item-chip"><img src="/images/teastory/oolong_tea_bag.png" alt="Oolong Tea Bag" />Oolong Tea Bag</span> -> <span class="item-chip"><img src="/images/teastory/oolong_tea_residue.png" alt="Oolong Tea Residue" />Oolong Tea Residue</span>
- <span class="item-chip"><img src="/images/teastory/puer_tea_bag.png" alt="Pu'er Tea Bag" />Pu'er Tea Bag</span> -> <span class="item-chip"><img src="/images/teastory/puer_tea_residue.png" alt="Pu'er Tea Residue" />Pu'er Tea Residue</span>
- <span class="item-chip"><img src="/images/teastory/white_tea_bag.png" alt="White Tea Bag" />White Tea Bag</span> -> <span class="item-chip"><img src="/images/teastory/white_tea_residue.png" alt="White Tea Residue" />White Tea Residue</span>
- <span class="item-chip"><img src="/images/teastory/yellow_tea_bag.png" alt="Yellow Tea Bag" />Yellow Tea Bag</span> -> <span class="item-chip"><img src="/images/teastory/yellow_tea_residue.png" alt="Yellow Tea Residue" />Yellow Tea Residue</span>

### 2) Residue recycling

- Any <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_residue.png" alt="Green Tea Residue" /><img src="/images/teastory/black_tea_residue.png" alt="Black Tea Residue" /><img src="/images/teastory/oolong_tea_residue.png" alt="Oolong Tea Residue" /><img src="/images/teastory/puer_tea_residue.png" alt="Pu'er Tea Residue" /><img src="/images/teastory/white_tea_residue.png" alt="White Tea Residue" /><img src="/images/teastory/yellow_tea_residue.png" alt="Yellow Tea Residue" /></span>residue</span> or <span class="item-chip"><img src="/images/teastory/failed_fixation_tea_leaf.png" alt="Scorched Leaf" />Scorched Leaf</span> x2 -> <span class="item-chip"><img src="/images/teastory/baking_powder.png" alt="Baking Powder" />Baking Powder x1</span>

## FAQ

:::::: details Q1: Which machine does each step?
A: **Tea Pan** withers/yellows, **Frying Pan** does fixation & pan-firing, **Barrel** ferments, **Tea Stove** roasts/bakes/steams, **Tea Table** brews & pours. Right-click each to open its GUI. Frying Pan and Tea Stove need vanilla fuel, the Barrel only eats baking powder, and the Tea Pan and Tea Table need no fuel.
::::::

:::::: details Q2: Why does the Tea Pan give wet leaf instead of withered leaf?
A: The Tea Pan is weather-based. Rain/thunder soaks fresh leaf into <span class="item-chip"><img src="/images/teastory/wet_tea_leaf.png" alt="Wet Tea Leaf" />Wet Tea Leaf</span>. Put it back in the pan on a clear day to rescue it into an ungraded withered leaf; frying wet leaf directly only produces scorched leaf.
::::::

:::::: details Q3: Does the Tea Whisk wear out?
A: Yes. The <span class="item-chip"><img src="/images/teastory/tea_whisk.png" alt="Tea Whisk" />Tea Whisk</span> loses 1 durability per matcha brew at the Tea Table (total 120), and breaks when durability hits zero.
::::::

:::::: details Q4: What is tea residue for?
A: Any two residues or scorched leaves recycle into one <span class="item-chip"><img src="/images/teastory/baking_powder.png" alt="Baking Powder" />Baking Powder</span> for continued fermentation in the barrel.
::::::

:::::: details Q5: How do I make milk / lemon / matcha tea?
A: All at the **Tea Table**, with sugar in the sugar slot:
- Milk Tea: Black Tea Leaf x2 + Milk Bucket (returns bucket) + Sugar x3
- Lemon Tea: Black Tea Leaf x2 + <span class="item-chip"><img src="/images/teastory/lemon.png" alt="Lemon" />Lemon</span> + Sugar x3
- Matcha: Matcha Leaf x2 + <span class="item-chip"><img src="/images/teastory/tea_whisk.png" alt="Tea Whisk" />Tea Whisk</span> + Sugar x3
Kettle versions use tea bags / loose powder with larger sugar amounts.
::::::

:::::: details Q6: What effects do the different teas give?
A:
- Black tea: Strength (11 s)
- Green tea: Haste (13 s)
- Oolong: Water Breathing (13 s)
- Pu'er: Health Boost (12 s)
- White tea: Regeneration (7 s)
- Yellow tea: Absorption (10 s)
- Lemon tea: Speed (12 s)
- Matcha: Jump Boost II (10 s)
- Milk tea: Resistance (11 s)
::::::

:::::: details Q7: Fastest way to a first cup early on?
A: Take this shortest chain (all on machines):  
fresh leaf -> (Tea Pan, clear) withered leaf -> (Frying Pan) green leaf -> (Frying Pan) green tea leaf -> (Tea Table) green tea leaf x2 + boiled water pot + empty cup -> glass of green tea.
::::::
