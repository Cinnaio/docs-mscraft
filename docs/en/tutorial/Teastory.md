# TeaStory Basics Guide

> Credits & license: This adaptation is made with full respect for the original work and follows its license.  
> Original project and license: [Tea-the-Story](https://github.com/RoShioLeo/Tea-the-Story?tab=readme-ov-file#license-%E8%AE%B8%E5%8F%AF%E8%AF%81)
>
> **Core summary**: The TeaStory main loop is "harvest -> wither -> process -> tea bag/kettle -> pour into cup -> residue recycle".

## Quick Parameters (current config)

| Stage | Parameters |
|---|---|
| Withering (campfire) | 10 / 11 / 12 / 13 / 14 s (wet leaf fallback: 1 s) |
| Withered -> Green Leaf (furnace) | 8 / 9 / 10 / 11 / 12 s |
| Green leaf output | Single Bud / One Bud One Leaf gives 2, others give 1 |
| Mortar | 1 Green Leaf -> 3 Broken Tea Leaf; mortar loses 1 durability each use (total 80) |
| Fermentation chain | Every step consumes 1 Baking Powder |
| Drying (broken/semi/fully/deep) | Campfire 20 s, Furnace 10 s, Smoker 5 s, Blast Furnace 5 s |
| Empty Tea Bag | 1 String + 5 Paper -> 3 Empty Tea Bag |
| Finished Tea Bag | 1 Empty Tea Bag + 6 matching tea leaves -> 1 Tea Bag |
| Fill water (batch) | 9 empty pots + 1 water bucket -> 9 filled pots |
| Boiling water | Furnace 8 s, Blast Furnace 4 s |
| Residue recycle | Any 2 residues -> 1 Baking Powder |
| Tea Whisk | Loses 1 durability per grind (total 120) |

## Quick Flow

1. Harvest <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud.png" alt="Fresh Leaf" />Fresh Leaf x1</span> (buds/leaves).
2. Wither on campfire to get <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_bud.png" alt="Withered Tea Leaf" />Withered Tea Leaf x1</span>.
3. Smelt into Green Leaf, then follow one of these lines:
   - Mortar line:
     <div class="item-flow"><span class="item-chip"><img src="/images/teastory/tea_leaf.png" alt="Green Leaf" />Green Leaf x1</span><span class="arrow">-></span><span class="item-chip"><img src="/images/teastory/broken_tea_leaf.png" alt="Broken Tea Leaf" />Broken Tea Leaf x3</span><span class="arrow">-></span><span class="item-chip"><img src="/images/teastory/green_tea_leaf.png" alt="Green Tea Leaf" />Green Tea Leaf x1</span></div>
   - Fermentation line:
     <div class="item-flow"><span class="item-chip"><img src="/images/teastory/broken_tea_leaf.png" alt="Broken Tea Leaf" />Broken Tea Leaf x1</span><span class="arrow">-></span><span class="item-chip"><img src="/images/teastory/semi_fermented_tea_leaf.png" alt="Semi Fermented Tea Leaf" />Semi Fermented Tea Leaf x1</span><span class="arrow">-></span><span class="item-chip"><img src="/images/teastory/fully_fermented_tea_leaf.png" alt="Fully Fermented Tea Leaf" />Fully Fermented Tea Leaf x1</span><span class="arrow">-></span><span class="item-chip"><img src="/images/teastory/deep_fermented_tea_leaf.png" alt="Deep Fermented Tea Leaf" />Deep Fermented Tea Leaf x1</span></div>
   - Drying lines:
     <div class="item-flow"><span class="item-chip"><img src="/images/teastory/semi_fermented_tea_leaf.png" alt="Semi Fermented Tea Leaf" />Semi Fermented Tea Leaf x1</span><span class="arrow">-></span><span class="item-chip"><img src="/images/teastory/oolong_tea_leaf.png" alt="Oolong Tea Leaf" />Oolong Tea Leaf x1</span></div>
     <div class="item-flow"><span class="item-chip"><img src="/images/teastory/fully_fermented_tea_leaf.png" alt="Fully Fermented Tea Leaf" />Fully Fermented Tea Leaf x1</span><span class="arrow">-></span><span class="item-chip"><img src="/images/teastory/black_tea_leaf.png" alt="Black Tea Leaf" />Black Tea Leaf x1</span></div>
     <div class="item-flow"><span class="item-chip"><img src="/images/teastory/deep_fermented_tea_leaf.png" alt="Deep Fermented Tea Leaf" />Deep Fermented Tea Leaf x1</span><span class="arrow">-></span><span class="item-chip"><img src="/images/teastory/puer_tea_leaf.png" alt="Pu'er Tea Leaf" />Pu'er Tea Leaf x1</span></div>
4. <span class="item-chip"><img src="/images/teastory/tea_leaf.png" alt="Tea Leaf" />Tea Leaf x6</span> + <span class="item-chip"><img src="/images/teastory/empty_tea_bag.png" alt="Empty Tea Bag" />Empty Tea Bag x1</span> = matching tea bag x1.
5. Fire the kettle blank; fill and boil <span class="item-chip"><img src="/images/teastory/water_pot_stone.png" alt="Water Pot" />Water Pot</span>.
6. <span class="item-chip"><img src="/images/teastory/green_tea_bag.png" alt="Tea Bag" />Tea Bag x1</span> + <span class="item-chip"><img src="/images/teastory/empty_porcelain_kettle.png" alt="Empty Kettle" />Empty Kettle x1</span> + <span class="item-chip"><img src="/images/teastory/water_pot_stone.png" alt="Boiled Water Pot" />Boiled Water Pot x1</span> = finished kettle x1 (also returns residue x1).
7. <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_porcelain_kettle.png" alt="Green Tea Porcelain Kettle" /><img src="/images/teastory/black_tea_porcelain_kettle.png" alt="Black Tea Porcelain Kettle" /><img src="/images/teastory/oolong_tea_porcelain_kettle.png" alt="Oolong Tea Porcelain Kettle" /><img src="/images/teastory/puer_tea_porcelain_kettle.png" alt="Puer Tea Porcelain Kettle" /><img src="/images/teastory/white_tea_porcelain_kettle.png" alt="White Tea Porcelain Kettle" /><img src="/images/teastory/yellow_tea_porcelain_kettle.png" alt="Yellow Tea Porcelain Kettle" /></span>Finished Kettle x1</span> + <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/cup_glass.png" alt="Glass Cup" /><img src="/images/teastory/cup_stone.png" alt="Stone Cup" /><img src="/images/teastory/cup_wood.png" alt="Wooden Cup" /><img src="/images/teastory/cup_porcelain.png" alt="Porcelain Cup" /><img src="/images/teastory/cup_zisha.png" alt="Zisha Cup" /></span>Any Cup x1</span> = <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_porcelain.png" alt="Green Tea Porcelain Cup" /><img src="/images/teastory/black_tea_porcelain.png" alt="Black Tea Porcelain Cup" /><img src="/images/teastory/oolong_tea_porcelain.png" alt="Oolong Tea Porcelain Cup" /><img src="/images/teastory/puer_tea_porcelain.png" alt="Puer Tea Porcelain Cup" /><img src="/images/teastory/white_tea_porcelain.png" alt="White Tea Porcelain Cup" /><img src="/images/teastory/yellow_tea_porcelain.png" alt="Yellow Tea Porcelain Cup" /></span>Matching Tea Drink x1</span>.
8. <span class="item-chip"><img src="/images/teastory/green_tea_residue.png" alt="Tea Residue" />Tea Residue x2 (any type)</span> can be recycled into <span class="item-chip"><img src="/images/teastory/baking_powder.png" alt="Baking Powder" />Baking Powder x1</span>.

## Harvest & Primary Processing

### 1) Withering (campfire)

- <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud.png" alt="Fresh Leaf (Single Bud)" />Fresh Leaf (Single Bud)</span> -> <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_bud.png" alt="Withered Leaf (Single Bud)" />Withered Leaf (Single Bud)</span>
- <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud_leaf1.png" alt="Fresh Leaf (One Bud One Leaf)" />Fresh Leaf (One Bud One Leaf)</span> -> <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_bud_leaf1.png" alt="Withered Leaf (One Bud One Leaf)" />Withered Leaf (One Bud One Leaf)</span>
- <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud_leaf2.png" alt="Fresh Leaf (One Bud Two Leaves)" />Fresh Leaf (One Bud Two Leaves)</span> -> <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_bud_leaf2.png" alt="Withered Leaf (One Bud Two Leaves)" />Withered Leaf (One Bud Two Leaves)</span>
- <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud_leaf3.png" alt="Fresh Leaf (One Bud Three Leaves)" />Fresh Leaf (One Bud Three Leaves)</span> -> <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_bud_leaf3.png" alt="Withered Leaf (One Bud Three Leaves)" />Withered Leaf (One Bud Three Leaves)</span>
- <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_old_leaf.png" alt="Fresh Leaf (Old Leaf)" />Fresh Leaf (Old Leaf)</span> -> <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_old_leaf.png" alt="Withered Leaf (Old Leaf)" />Withered Leaf (Old Leaf)</span>

### 2) Pan-firing (furnace)

- <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_bud.png" alt="Withered Tea Leaf" />Withered Tea Leaf</span> smelts into <span class="item-chip"><img src="/images/teastory/tea_leaf.png" alt="Green Leaf" />Green Leaf</span> (yield/XP vary by leaf grade).

| Withered leaf type | Time | Green leaf output |
|---|---:|---:|
| Single Bud | 8 s | 2 |
| One Bud One Leaf | 9 s | 2 |
| One Bud Two Leaves | 10 s | 1 |
| One Bud Three Leaves | 11 s | 1 |
| Old Leaf | 12 s | 1 |

### 3) Mortar & Fermentation

- <span class="item-chip"><img src="/images/teastory/wooden_mortar_and_pestle.png" alt="Wooden Mortar & Pestle" />Wooden Mortar & Pestle x1</span> + <span class="item-chip"><img src="/images/teastory/tea_leaf.png" alt="Green Leaf" />Green Leaf x1</span> -> <span class="item-chip"><img src="/images/teastory/broken_tea_leaf.png" alt="Broken Tea Leaf" />Broken Tea Leaf x3</span>
- <span class="item-chip"><img src="/images/teastory/baking_powder.png" alt="Baking Powder" />Baking Powder x1</span> + <span class="item-chip"><img src="/images/teastory/broken_tea_leaf.png" alt="Broken Tea Leaf" />Broken Tea Leaf x1</span> -> <span class="item-chip"><img src="/images/teastory/semi_fermented_tea_leaf.png" alt="Semi Fermented Tea Leaf" />Semi Fermented Tea Leaf x1</span>
- <span class="item-chip"><img src="/images/teastory/baking_powder.png" alt="Baking Powder" />Baking Powder x1</span> + <span class="item-chip"><img src="/images/teastory/semi_fermented_tea_leaf.png" alt="Semi Fermented Tea Leaf" />Semi Fermented Tea Leaf x1</span> -> <span class="item-chip"><img src="/images/teastory/fully_fermented_tea_leaf.png" alt="Fully Fermented Tea Leaf" />Fully Fermented Tea Leaf x1</span>
- <span class="item-chip"><img src="/images/teastory/baking_powder.png" alt="Baking Powder" />Baking Powder x1</span> + <span class="item-chip"><img src="/images/teastory/fully_fermented_tea_leaf.png" alt="Fully Fermented Tea Leaf" />Fully Fermented Tea Leaf x1</span> -> <span class="item-chip"><img src="/images/teastory/deep_fermented_tea_leaf.png" alt="Deep Fermented Tea Leaf" />Deep Fermented Tea Leaf x1</span>

Notes:
- Basic source of Baking Powder: `2 Wheat -> 1 Baking Powder`.
- The mortar is a durability tool, not one-time use.

### 4) Drying & Finalization (campfire/furnace/smoker/blast furnace)

- Processing stations: Campfire / Furnace / Smoker / Blast Furnace
- Recipe 1: <span class="item-chip"><img src="/images/teastory/broken_tea_leaf.png" alt="Broken Tea Leaf" />Broken Tea Leaf x1</span> -> <span class="item-chip"><img src="/images/teastory/green_tea_leaf.png" alt="Green Tea Leaf" />Green Tea Leaf x1</span>
- Recipe 2: <span class="item-chip"><img src="/images/teastory/semi_fermented_tea_leaf.png" alt="Semi Fermented Tea Leaf" />Semi Fermented Tea Leaf x1</span> -> <span class="item-chip"><img src="/images/teastory/oolong_tea_leaf.png" alt="Oolong Tea Leaf" />Oolong Tea Leaf x1</span>
- Recipe 3: <span class="item-chip"><img src="/images/teastory/fully_fermented_tea_leaf.png" alt="Fully Fermented Tea Leaf" />Fully Fermented Tea Leaf x1</span> -> <span class="item-chip"><img src="/images/teastory/black_tea_leaf.png" alt="Black Tea Leaf" />Black Tea Leaf x1</span>
- Recipe 4: <span class="item-chip"><img src="/images/teastory/deep_fermented_tea_leaf.png" alt="Deep Fermented Tea Leaf" />Deep Fermented Tea Leaf x1</span> -> <span class="item-chip"><img src="/images/teastory/puer_tea_leaf.png" alt="Puer Tea Leaf" />Puer Tea Leaf x1</span>

> All four stations support these 4 recipes; unified times are: campfire 20 s, furnace 10 s, smoker 5 s, blast furnace 5 s (0.1 XP each).

### 4.1) Fermentation container (brewing stand)

Container: Brewing Stand (`type: brewing`)

- Recipe A: container slot <span class="item-chip"><img src="/images/teastory/broken_tea_leaf.png" alt="Broken Tea Leaf" />Broken Tea Leaf x1</span> + ingredient slot <span class="item-chip"><img src="/images/teastory/baking_powder.png" alt="Baking Powder" />Baking Powder x1</span> -> <span class="item-chip"><img src="/images/teastory/semi_fermented_tea_leaf.png" alt="Semi Fermented Tea Leaf" />Semi Fermented Tea Leaf x1</span>
- Recipe B: container slot <span class="item-chip"><img src="/images/teastory/semi_fermented_tea_leaf.png" alt="Semi Fermented Tea Leaf" />Semi Fermented Tea Leaf x1</span> + ingredient slot <span class="item-chip"><img src="/images/teastory/baking_powder.png" alt="Baking Powder" />Baking Powder x1</span> -> <span class="item-chip"><img src="/images/teastory/fully_fermented_tea_leaf.png" alt="Fully Fermented Tea Leaf" />Fully Fermented Tea Leaf x1</span>
- Recipe C: container slot <span class="item-chip"><img src="/images/teastory/fully_fermented_tea_leaf.png" alt="Fully Fermented Tea Leaf" />Fully Fermented Tea Leaf x1</span> + ingredient slot <span class="item-chip"><img src="/images/teastory/baking_powder.png" alt="Baking Powder" />Baking Powder x1</span> -> <span class="item-chip"><img src="/images/teastory/deep_fermented_tea_leaf.png" alt="Deep Fermented Tea Leaf" />Deep Fermented Tea Leaf x1</span>

> These 3 recipes form a continuous upgrade chain; each step consumes 1 Baking Powder and outputs 1 next-stage leaf.

## Matcha Route (enabled)

### 1) Craft Tea Whisk

- Craft <span class="item-chip"><img src="/images/teastory/tea_whisk.png" alt="Tea Whisk" />Tea Whisk</span> (durability tool; consumed per use in matcha recipes).

Recipe layout:
- Row 1: ` empty stick empty `
- Row 2: ` bamboo bamboo bamboo `
- Row 3: ` empty plank empty `

### 2) Grind Matcha

- <span class="item-chip"><img src="/images/teastory/tea_whisk.png" alt="Tea Whisk" />Tea Whisk x1</span> + <span class="item-chip"><img src="/images/teastory/green_tea_leaf.png" alt="Green Tea Leaf" />Green Tea Leaf x1</span> -> <span class="item-chip"><img src="/images/teastory/matcha_tea_leaf.png" alt="Matcha Leaf" />Matcha Leaf x1</span>

### 3) Matcha Kettles

- <span class="item-chip"><img src="/images/teastory/matcha_tea_leaf.png" alt="Matcha Leaf" />Matcha Leaf x1</span> + <span class="item-chip"><img src="/images/teastory/tea_whisk.png" alt="Tea Whisk" />Tea Whisk x1</span> + <span class="item-chip"><img src="/images/teastory/empty_porcelain_kettle.png" alt="Empty Porcelain Kettle" />Empty Porcelain Kettle x1</span> + any boiled water pot x1 -> <span class="item-chip"><img src="/images/teastory/matcha_drink_porcelain_kettle.png" alt="Porcelain Matcha Kettle" />Porcelain Matcha Kettle x1</span>
- <span class="item-chip"><img src="/images/teastory/matcha_tea_leaf.png" alt="Matcha Leaf" />Matcha Leaf x1</span> + <span class="item-chip"><img src="/images/teastory/tea_whisk.png" alt="Tea Whisk" />Tea Whisk x1</span> + <span class="item-chip"><img src="/images/teastory/empty_zisha_kettle.png" alt="Empty Zisha Kettle" />Empty Zisha Kettle x1</span> + any boiled water pot x1 -> <span class="item-chip"><img src="/images/teastory/matcha_drink_zisha_kettle.png" alt="Zisha Matcha Kettle" />Zisha Matcha Kettle x1</span>

## Tea Bags, Kettles, and Cups

### 1) Empty Tea Bag

- Paper x5 + String x1 -> <span class="item-chip"><img src="/images/teastory/empty_tea_bag.png" alt="Empty Tea Bag" />Empty Tea Bag x3</span>

### 2) Finished Tea Bag

- <span class="item-chip"><img src="/images/teastory/empty_tea_bag.png" alt="Empty Tea Bag" />Empty Tea Bag x1</span> + <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_leaf.png" alt="Green Tea Leaf" /><img src="/images/teastory/black_tea_leaf.png" alt="Black Tea Leaf" /><img src="/images/teastory/oolong_tea_leaf.png" alt="Oolong Tea Leaf" /><img src="/images/teastory/puer_tea_leaf.png" alt="Puer Tea Leaf" /><img src="/images/teastory/white_tea_leaf.png" alt="White Tea Leaf" /><img src="/images/teastory/yellow_tea_leaf.png" alt="Yellow Tea Leaf" /></span>Matching Tea Leaf x6</span> -> <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_bag.png" alt="Green Tea Bag" /><img src="/images/teastory/black_tea_bag.png" alt="Black Tea Bag" /><img src="/images/teastory/oolong_tea_bag.png" alt="Oolong Tea Bag" /><img src="/images/teastory/puer_tea_bag.png" alt="Puer Tea Bag" /><img src="/images/teastory/white_tea_bag.png" alt="White Tea Bag" /><img src="/images/teastory/yellow_tea_bag.png" alt="Yellow Tea Bag" /></span>Matching Tea Bag x1</span>
- Includes: green / black / oolong / pu'er / white / yellow tea.

### 3) Kettles and Cups

- Cups: <span class="item-chip"><img src="/images/teastory/cup_glass.png" alt="Glass Cup" />Glass Cup</span>, <span class="item-chip"><img src="/images/teastory/cup_stone.png" alt="Stone Cup" />Stone Cup</span>, <span class="item-chip"><img src="/images/teastory/cup_wood.png" alt="Wooden Cup" />Wooden Cup</span>, <span class="item-chip"><img src="/images/teastory/cup_porcelain.png" alt="Porcelain Cup" />Porcelain Cup</span>, <span class="item-chip"><img src="/images/teastory/cup_zisha.png" alt="Zisha Cup" />Zisha Cup</span>.
- Kettles: <span class="item-chip"><img src="/images/teastory/empty_porcelain_kettle.png" alt="Porcelain Kettle" />Porcelain Kettle</span>, <span class="item-chip"><img src="/images/teastory/empty_zisha_kettle.png" alt="Zisha Kettle" />Zisha Kettle</span>.
- Boiled water: <span class="item-chip"><img src="/images/teastory/water_pot_stone.png" alt="Water Pot" />Water Pot x1</span> can be boiled in furnace / blast furnace.

Common tips:
- Fill kettles in batch (e.g. 9 at once) for better efficiency.
- Pouring is not restricted by cup material.
- Drinking a cup tea returns the corresponding empty cup.

### 4) Brew and Pour

- <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_bag.png" alt="Green Tea Bag" /><img src="/images/teastory/black_tea_bag.png" alt="Black Tea Bag" /><img src="/images/teastory/oolong_tea_bag.png" alt="Oolong Tea Bag" /><img src="/images/teastory/puer_tea_bag.png" alt="Puer Tea Bag" /><img src="/images/teastory/white_tea_bag.png" alt="White Tea Bag" /><img src="/images/teastory/yellow_tea_bag.png" alt="Yellow Tea Bag" /></span>Tea Bag x1</span> + <span class="item-chip"><img src="/images/teastory/empty_porcelain_kettle.png" alt="Empty Kettle" />Empty Kettle x1</span> + <span class="item-chip"><img src="/images/teastory/water_pot_stone.png" alt="Boiled Water Pot" />Boiled Water Pot x1</span> -> <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_porcelain_kettle.png" alt="Green Tea Porcelain Kettle" /><img src="/images/teastory/black_tea_porcelain_kettle.png" alt="Black Tea Porcelain Kettle" /><img src="/images/teastory/oolong_tea_porcelain_kettle.png" alt="Oolong Tea Porcelain Kettle" /><img src="/images/teastory/puer_tea_porcelain_kettle.png" alt="Puer Tea Porcelain Kettle" /><img src="/images/teastory/white_tea_porcelain_kettle.png" alt="White Tea Porcelain Kettle" /><img src="/images/teastory/yellow_tea_porcelain_kettle.png" alt="Yellow Tea Porcelain Kettle" /></span>Matching Kettle Drink x1</span>.
- <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_porcelain_kettle.png" alt="Green Tea Porcelain Kettle" /><img src="/images/teastory/black_tea_porcelain_kettle.png" alt="Black Tea Porcelain Kettle" /><img src="/images/teastory/oolong_tea_porcelain_kettle.png" alt="Oolong Tea Porcelain Kettle" /><img src="/images/teastory/puer_tea_porcelain_kettle.png" alt="Puer Tea Porcelain Kettle" /><img src="/images/teastory/white_tea_porcelain_kettle.png" alt="White Tea Porcelain Kettle" /><img src="/images/teastory/yellow_tea_porcelain_kettle.png" alt="Yellow Tea Porcelain Kettle" /></span>Finished Kettle x1</span> + <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/cup_glass.png" alt="Glass Cup" /><img src="/images/teastory/cup_stone.png" alt="Stone Cup" /><img src="/images/teastory/cup_wood.png" alt="Wooden Cup" /><img src="/images/teastory/cup_porcelain.png" alt="Porcelain Cup" /><img src="/images/teastory/cup_zisha.png" alt="Zisha Cup" /></span>Any Cup x1</span> -> <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_porcelain.png" alt="Green Tea Porcelain Cup" /><img src="/images/teastory/black_tea_porcelain.png" alt="Black Tea Porcelain Cup" /><img src="/images/teastory/oolong_tea_porcelain.png" alt="Oolong Tea Porcelain Cup" /><img src="/images/teastory/puer_tea_porcelain.png" alt="Puer Tea Porcelain Cup" /><img src="/images/teastory/white_tea_porcelain.png" alt="White Tea Porcelain Cup" /><img src="/images/teastory/yellow_tea_porcelain.png" alt="Yellow Tea Porcelain Cup" /></span>Matching Cup Drink x1</span>.

Available flavor lines:
- Regular six teas: <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_leaf.png" alt="Green Tea Leaf" /><img src="/images/teastory/black_tea_leaf.png" alt="Black Tea Leaf" /><img src="/images/teastory/oolong_tea_leaf.png" alt="Oolong Tea Leaf" /><img src="/images/teastory/puer_tea_leaf.png" alt="Puer Tea Leaf" /><img src="/images/teastory/white_tea_leaf.png" alt="White Tea Leaf" /><img src="/images/teastory/yellow_tea_leaf.png" alt="Yellow Tea Leaf" /></span>Six Tea Types</span> (both porcelain and zisha kettle lines supported).
- Matcha: process `Green Tea Leaf + Tea Whisk` first, then brew matcha kettles.

## Tea Residue System (enabled)

### 1) Residue Output

When tea bags are used in kettle recipes, corresponding residues are returned:

- <span class="item-chip"><img src="/images/teastory/black_tea_bag.png" alt="Black Tea Bag" />Black Tea Bag x1</span> -> <span class="item-chip"><img src="/images/teastory/black_tea_residue.png" alt="Black Tea Residue" />Black Tea Residue x1</span>
- <span class="item-chip"><img src="/images/teastory/green_tea_bag.png" alt="Green Tea Bag" />Green Tea Bag x1</span> -> <span class="item-chip"><img src="/images/teastory/green_tea_residue.png" alt="Green Tea Residue" />Green Tea Residue x1</span>
- <span class="item-chip"><img src="/images/teastory/oolong_tea_bag.png" alt="Oolong Tea Bag" />Oolong Tea Bag x1</span> -> <span class="item-chip"><img src="/images/teastory/oolong_tea_residue.png" alt="Oolong Tea Residue" />Oolong Tea Residue x1</span>
- <span class="item-chip"><img src="/images/teastory/puer_tea_bag.png" alt="Puer Tea Bag" />Puer Tea Bag x1</span> -> <span class="item-chip"><img src="/images/teastory/puer_tea_residue.png" alt="Puer Tea Residue" />Puer Tea Residue x1</span>
- <span class="item-chip"><img src="/images/teastory/white_tea_bag.png" alt="White Tea Bag" />White Tea Bag x1</span> -> <span class="item-chip"><img src="/images/teastory/white_tea_residue.png" alt="White Tea Residue" />White Tea Residue x1</span>
- <span class="item-chip"><img src="/images/teastory/yellow_tea_bag.png" alt="Yellow Tea Bag" />Yellow Tea Bag x1</span> -> <span class="item-chip"><img src="/images/teastory/yellow_tea_residue.png" alt="Yellow Tea Residue" />Yellow Tea Residue x1</span>

### 2) Residue Recycle

- Any <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_residue.png" alt="Green Tea Residue" /><img src="/images/teastory/black_tea_residue.png" alt="Black Tea Residue" /><img src="/images/teastory/oolong_tea_residue.png" alt="Oolong Tea Residue" /><img src="/images/teastory/puer_tea_residue.png" alt="Puer Tea Residue" /><img src="/images/teastory/white_tea_residue.png" alt="White Tea Residue" /><img src="/images/teastory/yellow_tea_residue.png" alt="Yellow Tea Residue" /></span>Tea Residue x2</span> -> <span class="item-chip"><img src="/images/teastory/baking_powder.png" alt="Baking Powder" />Baking Powder x1</span>

## FAQ

:::::: details Q: Why can't I craft a specific tea?
A: Confirm the prerequisite chain first (withering / fermenting / drying), then check whether you have <span class="item-chip"><img src="/images/teastory/empty_tea_bag.png" alt="Empty Tea Bag" />Empty Tea Bag x1</span> and <span class="item-chip"><img src="/images/teastory/water_pot_stone.png" alt="Boiled Water Pot" />Boiled Water Pot x1</span>.
::::::

:::::: details Q: Does the Tea Whisk get consumed?
A: Yes. <span class="item-chip"><img src="/images/teastory/tea_whisk.png" alt="Tea Whisk" />Tea Whisk</span> loses durability in matcha recipes and breaks at zero durability.
::::::

:::::: details Q: What is tea residue for?
A: Any two <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_residue.png" alt="Green Tea Residue" /><img src="/images/teastory/black_tea_residue.png" alt="Black Tea Residue" /><img src="/images/teastory/oolong_tea_residue.png" alt="Oolong Tea Residue" /><img src="/images/teastory/puer_tea_residue.png" alt="Puer Tea Residue" /><img src="/images/teastory/white_tea_residue.png" alt="White Tea Residue" /><img src="/images/teastory/yellow_tea_residue.png" alt="Yellow Tea Residue" /></span>Tea Residue x2</span> can be recycled into one <span class="item-chip"><img src="/images/teastory/baking_powder.png" alt="Baking Powder" />Baking Powder x1</span>, feeding back into the fermentation chain.
::::::

:::::: details Q: What effects do different teas give?
A:
- Black Tea: Strength (11 s)
- Green Tea: Haste (13 s)
- Oolong Tea: Water Breathing (13 s)
- Pu'er Tea: Health Boost (12 s)
- White Tea: Regeneration (7 s)
- Yellow Tea: Absorption (10 s)
- Lemon Tea: Speed (12 s)
- Matcha: Jump Boost II (10 s)
- Milk Tea: Resistance (11 s)
::::::

:::::: details Q: Fastest way to get your first cup early game?
A: Craft a mortar and empty tea bags first, then follow this short chain:  
Fresh Leaf -> Withered Leaf -> Green Leaf -> Broken Tea Leaf -> Green Tea Leaf -> Green Tea Bag -> Green Tea Kettle -> Pour into cup.
::::::

