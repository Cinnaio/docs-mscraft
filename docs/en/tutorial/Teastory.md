---
title: TeaStory
description: Grow a tea garden, make your first cup, and turn the harvest into Chinese food and drinks.
aside: false
pageClass: teastory-page
---

<script setup>
import TeaStoryFlow from '../../.vitepress/theme/components/teastory/TeaStoryFlow.vue'
import TeaStoryItem from '../../.vitepress/theme/components/teastory/TeaStoryItem.vue'
import TeaStoryRecipes from '../../.vitepress/theme/components/teastory/TeaStoryRecipes.vue'
import TeaStoryRoutes from '../../.vitepress/theme/components/teastory/TeaStoryRoutes.vue'
import TeaStoryBrewing from '../../.vitepress/theme/components/teastory/TeaStoryBrewing.vue'
import { foodIds } from '../../.vitepress/theme/components/teastory/data'
import '../../.vitepress/theme/teastory-guide.css'
</script>

# TeaStory <Badge type="tip" text="Testing" />

<p class="tea-lead">Grow a small tea garden, brew your first cup, and bring the season's harvest to the table.</p>

<nav class="tea-nav" aria-label="TeaStory sections">
  <a href="#first-cup">First cup</a>
  <a href="#tea-making">Tea processing</a>
  <a href="#brewing">Brewing</a>
  <a href="#tea-garden">Growing & harvesting</a>
  <a href="#food">Food & drinks</a>
  <a href="#appendix">Troubleshooting</a>
</nav>

## Make your first green tea {#first-cup}

Prepare a **Tea Pan, Frying Pan and Tea Table**, plus fuel, a cup and a water kettle. The [equipment recipes](#equipment) follow these steps. Green tea does not require a Fermentation Barrel or Tea Stove.

<div class="tea-step">

### <span>1</span> Plant tea and harvest fresh leaves

Breaking registered vanilla leaves, including oak and birch, has a **0.8%** chance of dropping Tea Seeds. Plant them on suitable soil or farmland with at least **light level 9**. Once mature, right-click with a Sickle to harvest. Keep a tea seed in your inventory for replanting.

<TeaStoryFlow en :steps="[{ id: 'tea_seeds', note: 'Plant on suitable soil' }, { id: 'fresh_tea_leaf_bud', label: 'Graded fresh leaves', note: 'Harvest when mature; bud shown' }]" />

</div>

<div class="tea-step">

### <span>2</span> Wither the leaves in clear weather

Right-click the Tea Pan, place leaves in its input and collect the finished withered leaves. **Clear weather preserves the grade; rain and thunderstorms produce wet leaves.** Wet leaves can be rescued in the Tea Pan when the weather clears, but their grade will be lost.

<TeaStoryFlow en :steps="[{ id: 'fresh_tea_leaf_bud', label: 'Graded fresh leaves' }, { id: 'withered_tea_leaf_bud', label: 'Same-grade withered leaves', note: 'Tea Pan · clear weather · 100 ticks' }]" />

</div>

<div class="tea-step">

### <span>3</span> Process twice: fix, then pan-fire

Add vanilla fuel such as coal to the Frying Pan. Withered leaves first become fixed leaves. **Take them from the output and put them back into the input** to make green tea leaves. Bud and one-bud-one-leaf grades yield 2 fixed leaves; the other grades yield 1.

<TeaStoryFlow en :steps="[{ id: 'withered_tea_leaf_bud', label: 'Withered leaves' }, { id: 'tea_leaf', note: 'Frying Pan · fixation' }, { id: 'green_tea_leaf', note: 'Frying Pan · another 120 ticks' }]" />

</div>

<div class="tea-step">

### <span>4</span> Boil water and brew at the Tea Table

Combine 9 empty water kettles and 1 water bucket in a shapeless recipe to fill all 9 kettles. Heat the filled kettles in a furnace. Stone, porcelain, iron and zisha all work; stone is shown below.

<TeaStoryFlow en :steps="[{ id: 'pot_stone', count: 9, note: 'Craft with 1 water bucket' }, { id: 'water_pot_stone', count: 9, note: 'Filled, still needs heating' }, { id: 'boiled_water_pot_stone', label: 'Boiled kettle', note: 'Furnace 160 / blast furnace 80 ticks' }]" />

Put **2 green tea leaves + any boiled kettle + 1 empty cup** into the Tea Table. Collect the green tea from the output. Brewing returns the empty water kettle; drinking returns the matching cup and grants brief Haste. [See the Tea Table slots](#brewing).

</div>

### Equipment and containers {#equipment}

<TeaStoryRecipes en :ids="['teapan', 'tea_drying_pan', 'tea_table', 'cup_glass', 'pot_stone', 'barrel', 'tea_stove', 'wooden_mortar_and_pestle']" />

## Choose your tea {#tea-making}

Wither fresh leaves before following a processing route. Fermentation completes one stage at a time: take out the intermediate item and reinsert it to continue. Once it reaches the desired stage, roast it in the Tea Stove.

<TeaStoryRoutes en />

<details class="tea-reference">
<summary>Leaf grades, fermentation fuel and processing times</summary>

Fresh leaves have five grades: bud, one bud with one leaf, two leaves, three leaves, and old leaf. Mature tea uses weights 5 / 15 / 25 / 30 / 25 respectively. Tea Shears provide an additional upgrade chance. Wet-weather withering and rescuing wet leaves lose the grade.

| Process | Input → output | Time |
|---|---|---:|
| Tea Pan · clear | Graded fresh → matching withered leaves | 100 ticks |
| Tea Pan · rain / thunderstorm | Fresh → wet leaves | 60 / 40 ticks |
| Tea Pan · clear-weather rescue | Wet → ungraded withered leaves | 140 ticks |
| Tea Pan · yellowing | Green → yellow tea leaves | 160 ticks |
| Frying Pan · pan-firing | Fixed → green tea leaves | 120 ticks |
| Frying Pan · failed processing | Wet → burnt leaves | 80 ticks |
| Fermentation Barrel | Broken → partial → full → deep fermentation | 160 / 180 / 200 ticks |
| Tea Stove · roasting | Partial / full / deep → oolong / black / pu'er | 200 ticks |
| Tea Stove · drying / steaming | Fixed → white; green → matcha | 160 ticks |

A wooden mortar and pestle plus 1 fixed leaf produces 3 broken leaves at a crafting table and consumes 1 tool durability. The barrel only accepts fermentation powder. Craft 1 powder from 2 wheat or any 2 tea residues / burnt leaves. Powder has fuel value 800; batches per powder depend on the machine's fuel accounting.

Times are configured ticks. At 20 ticks per second, 20 ticks equal about one second; server performance can affect actual waiting time.

</details>

## Brew a cup or share a teapot {#brewing}

A cup of plain tea needs **2 leaves**. A porcelain teapot uses 1 tea bag and serves up to 4 cups; a zisha teapot uses 2 bags and serves up to 8. Milk tea, lemon tea and matcha require extra ingredients.

<TeaStoryBrewing en />

### Tea bags, pouring and recycling

5 paper and 1 string make 3 empty tea bags. Combine an empty bag with 6 matching finished leaves to make a tea bag. Brewing bags produces tea residue, which can be recycled into fermentation powder.

Place a filled teapot and an empty cup in the Tea Table to pour. Each pour takes 40 ticks and consumes 1 teapot durability. An exhausted teapot becomes an empty teapot. The Matcha Whisk has 120 durability and loses 1 per recipe.

<TeaStoryFlow en :steps="[{ id: 'green_tea_leaf', count: 6, note: 'Craft with an empty tea bag' }, { id: 'green_tea_bag', note: 'Brew a teapot' }, { id: 'green_tea_residue', note: 'Recycle 2 residues into powder' }]" />

<details class="tea-reference">
<summary>Tea effects</summary>

| Tea | Effect | Duration |
|---|---|---:|
| Green | Haste | 260 ticks |
| Black | Strength | 220 ticks |
| Jasmine | Luck | 240 ticks |
| Oolong | Water Breathing | 260 ticks |
| Pu'er | Health Boost | 240 ticks |
| White | Regeneration | 140 ticks |
| Yellow | Absorption | 200 ticks |
| Milk | Resistance | 220 ticks |
| Lemon | Speed | 240 ticks |
| Matcha | Jump Boost II | 200 ticks |

Base tea drinks have nutrition 5 and saturation 3.5. Other food and blended drinks use their own values; their names do not guarantee an effect.

</details>

## Grow with the seasons {#tea-garden}

Each season lasts **10 in-game days**. Tea prefers spring, summer and autumn; growth slows in winter. A preference does not prohibit planting in other seasons. Light, temperature, humidity and surroundings also affect growth.

<div class="tea-season-images">
  <figure><img src="/images/vanilla-plains.png" alt="Grassland and vegetation in normal conditions" width="1920" height="1080" loading="lazy" /><figcaption>Normal conditions</figcaption></figure>
  <figure><img src="/images/season-winter.png" alt="Ground and vegetation with winter visuals" width="1920" height="1080" loading="lazy" /><figcaption>Winter appearance example</figcaption></figure>
</div>

### Pick the right ground

- **Tea and most herbs:** use suitable soil and sufficient light. Tea supports farmland, grass blocks, dirt, podzol, coarse dirt and other configured soils.
- **Cassava and ginger:** require farmland. Lotus requires nearby water with dirt, grass, mud or clay underneath.
- **Greenhouses:** enclosed structures can improve stability. A roof alone may not qualify, and a greenhouse cannot guarantee growth in every condition.
- **Wild seeds:** lemongrass, roselle and goji seeds drop from grass and ferns at 0.5%; lotus seeds drop from lily pads at 5%.

### Rice needs a nursery, then a paddy {#garden-orchard}

Plant rice grains on ordinary farmland. Harvest the mature nursery crop for seedlings, transplant them into a paddy, and harvest more rice grains when mature. Mill the grains with a wooden mortar and pestle to make rice.

<TeaStoryFlow en :steps="[{ id: 'xian_rice_seeds', note: 'Grow on farmland' }, { id: 'item_xian_rice_seedling', note: 'Transplant into a paddy' }, { id: 'xian_rice_seeds', note: 'Harvest mature rice plants' }, { id: 'xian_rice', note: 'Crafting table + mortar' }]" />

Craft a paddy from 8 dirt surrounding a water bucket; the bucket is returned. An empty bucket cannot scoop up the paddy, but breaking it recovers the block. Mature rice mainly drops 1–3 grains.

### Six fruit trees

Grow peach, lemon, jujube, pomelo, orange and persimmon. Use a Fruit Picker on visible fruiting leaves. Eligible persistent leaves regrow fruit after **20 minutes** by default. Breaking ordinary leaves has a separate random fruit drop; shears and Silk Touch do not use that drop.

### Pick the right harvesting tool {#harvest-tools}

<ul class="tea-tools">
  <li><TeaStoryItem id="sickle" en /><p>Harvests up to 3×3 on the same level. Replanting checks inventory first, then the Seed Pouch, and consumes one seed per plant.</p></li>
  <li><TeaStoryItem id="tea_shears" en /><p>For tea. Lower grades have a 35% chance to upgrade to a bud or one-bud-one-leaf.</p></li>
  <li><TeaStoryItem id="herb_shears" en /><p>For jasmine, osmanthus, mint, chrysanthemum and other herbs. A 20% chance of one extra fresh ingredient.</p></li>
  <li><TeaStoryItem id="root_spade" en /><p>For ginger and cassava. A 25% chance of one extra root ingredient.</p></li>
  <li><TeaStoryItem id="fruit_picker" en /><p>Reaches 5 blocks to the first visible fruiting leaf. It does not pass through blocks or leaves.</p></li>
  <li><TeaStoryItem id="harvest_basket" en /><p>Hold in your offhand to send harvests to your inventory first. Overflow drops on the ground.</p></li>
  <li><TeaStoryItem id="seed_pouch" en /><p>Right-click to open. Defaults to 9 slots for registered custom seeds. Left-click transfers a stack; right-click transfers one.</p></li>
</ul>

Right-click to use harvesting tools. Durability follows the number of plants actually harvested. **Without seeds, mature crops are removed and not replanted.** Check your seed supply first and watch the action-bar feedback.

<details class="tea-reference">
<summary>Harvesting tool recipes</summary>

<TeaStoryRecipes en :ids="['sickle', 'tea_shears', 'herb_shears', 'root_spade', 'fruit_picker', 'harvest_basket', 'seed_pouch']" />

</details>

## Bring the harvest to the table {#food}

Browse {{ foodIds.length }} foods and drinks. Ingredients have their own processing chains: mill grains into rice and rice into flour; dry fresh flowers before adding them to tea or pastries.

<TeaStoryRecipes en catalog />

## Tea rooms and harvest records {#tea-room}

Combine processing equipment and furniture to furnish a tea room. The Tea Pan, Frying Pan, Fermentation Barrel, Tea Stove and Tea Table are interactive machines. Decorative furniture does not gain processing behavior from its appearance.

<a id="records"></a>

`/me harvest menu` opens your harvest overview, products, tools and crops. `/me harvest stats` shows your own statistics.

Seeds, first planting and harvest, cumulative harvests, quality upgrades, processing, brewing, drinking and residue recycling have achievement milestones. New harvests participate in statistics and achievements; historical data is not guaranteed to be backfilled.

## Troubleshooting {#appendix}

<details class="tea-faq">
<summary>My tea is not growing. Is the season wrong?</summary>

Check the ground and light first, then consider season, temperature, humidity and nearby structures. Ask an administrator to run `/ne debug crop detail` beside the crop for a diagnosis. Ordinary players do not have permission for this command.

</details>
<details class="tea-faq">
<summary>Why did I get wet or burnt leaves?</summary>

Rain and thunderstorms turn fresh leaves into wet leaves. Rescue them in the Tea Pan in clear weather before frying. Putting wet leaves straight in the Frying Pan produces burnt leaves.

</details>
<details class="tea-faq">
<summary>The machine has ingredients but will not start.</summary>

Check fuel in the Frying Pan and Tea Stove; only fermentation powder works in the barrel. Use boiled water in the Tea Table and place every ingredient in its matching slot. Clear the output slot. Sneak-right-click a machine to retrieve misplaced contents.

</details>
<details class="tea-faq">
<summary>Fruit has not returned after 20 minutes.</summary>

Only eligible persistent fruiting leaves regrow. Offline time counts, but the chunk must load again. Removed leaves are not rebuilt, and non-persistent leaves do not automatically regrow fruit.

</details>

<details class="tea-reference">
<summary>Advanced reference: seasons, environment and crops</summary>

| Season | Base temperature | Base humidity | Growth multiplier | Configured yield multiplier |
|---|---:|---:|---:|---:|
| Spring | 15.0 | 0.70 | 1.2 | 1.0 |
| Summer | 25.0 | 0.50 | 1.1 | 1.1 |
| Autumn | 10.0 | 0.60 | 1.0 | 1.2 |
| Winter | 0.0 | 0.40 | 0.5 | 0.8 |

These are NatureEngine baselines. World, weather and seasonal offsets also affect actual temperature. Yield multipliers do not automatically multiply all CraftEngine loot. Seasons last 10 in-game days, with transition-title fade in / stay / fade out of 10 / 50 / 20 ticks.

| Crop | Mature age | Temperature ± tolerance | Humidity ± tolerance | Preferred seasons |
|---|---:|---:|---:|---|
| Tea | 6 | 1.20 ± 0.80 | 0.80 ± 0.60 | Spring, summer, autumn |
| Jasmine | 3 | 1.10 ± 0.75 | 0.85 ± 0.55 | Spring, summer |
| Rice nursery / rice | 3 / 7 | 1.20 ± 0.80 | 0.95 ± 0.55 | Summer |
| Osmanthus | 3 | 1.10 ± 0.75 | 0.75 ± 0.55 | Summer, autumn |
| Cassava | 4 | 1.30 ± 0.75 | 0.75 ± 0.55 | Summer |
| Mint | 3 | 0.75 ± 0.65 | 0.75 ± 0.50 | Spring, summer |
| Chrysanthemum | 3 | 0.80 ± 0.70 | 0.65 ± 0.50 | Autumn |
| Ginger | 4 | 1.15 ± 0.75 | 0.85 ± 0.50 | Summer |
| Lemongrass | 3 | 1.20 ± 0.75 | 0.80 ± 0.55 | Summer |
| Roselle | 3 | 1.20 ± 0.75 | 0.70 ± 0.55 | Summer, autumn |
| Goji | 3 | 0.90 ± 0.80 | 0.50 ± 0.55 | Summer, autumn |
| Mung bean | 3 | 1.10 ± 0.75 | 0.70 ± 0.55 | Summer |
| Lotus | 4 | 1.10 ± 0.75 | 0.95 ± 0.45 | Summer |

The seasonal sapling registry contains jujube, pomelo, orange, persimmon and peach, each with one stage and spring/summer preferences. Lemon resources exist but are not in those five seasonal registrations.

Environment scans use radius 4 and check roofs up to 6 blocks above. Enclosure 0.60 qualifies as greenhouse; openness below 0.25 is indoor, at least 0.80 is outdoor, otherwise semi-outdoor. Nearby-water bonuses are disabled.

| Environment | Stability | Progress modifier |
|---|---:|---:|
| Greenhouse | 1.00 | 1.02 |
| Indoor | 0.80 | 0.98 |
| Semi-outdoor | 0.60 | 1.00 |
| Outdoor | 0.35 | 1.00 |

Global progress threshold is 0.22, wither threshold 0.02, random tick speed 3 and environment mitigation 0.75. None can independently guarantee a maturity time.

Weather is redrawn every 90 seconds. Configured clear / rain / thunder / snow durations are 300 / 240 / 180 / 240 seconds, not guaranteed hold times. Solar terms adjust the next draw's weights; snow maps to ordinary precipitation in Bukkit.

</details>
<details class="tea-reference">
<summary>Administrator reference and sources</summary>

NatureEngine commands require OP. `/ne season info` inspects the season; `/ne season next` advances it; `/ne season set <spring|summer|autumn|winter>` sets an override; `/ne season clear` restores natural progression; `/ne season apply` reapplies visuals.

Use `/ne debug`, `/ne debug crop detail` and `/ne debug visual` to inspect state; `/ne sim crop` to simulate growth; `/ne crop randomTickSpeed [value]` to adjust ticking; `/ne reload [config|seasons|weather|growth|environment|crops|all]` to reload; `/ne metrics` for metrics.

`/me harvest stats [all|player|UUID] [all|today|week]` selects a statistics scope; ordinary players can only inspect themselves. Administrators use `/me harvest export ...` for CSV. Data is stored in `plugins/MateriaEngine/harvest_stats.db`, with exports in `plugins/MateriaEngine/exports/`. Days follow Asia/Shanghai; weeks start on Monday. Historical totals are not backfilled into daily records.

Recipes, names and item artwork come from CraftEngine resource configuration. Tea Table inputs come from MateriaEngine; environment rules from NatureEngine; achievements from BeaconEngine. This page describes local configuration. Deployment versions, chunk loading and other plugins can affect actual server behavior.

</details>

<p class="tea-credits">Derived from <a href="https://github.com/RoShioLeo/Tea-the-Story?tab=readme-ov-file#license-%E8%AE%B8%E5%8F%AF%E8%AF%81">Tea-the-Story</a> under its original license. The <a href="/en/tutorial/SeasonWiki">old seasons entry</a> remains available.</p>
