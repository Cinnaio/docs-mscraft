# TeaStory: From Fresh Leaf to Tea Table <Badge type="tip" text="Testing" />

> TeaStory is a farming, tea-making, brewing, and Chinese food progression. This guide follows the current CraftEngine, NatureEngine, MateriaEngine, and BeaconEngine configuration. Values and recipes can change when the server configuration changes.

> Credits and license: this gameplay is a respectful derivative work and follows the original project license. See [Tea-the-Story](https://github.com/RoShioLeo/Tea-the-Story?tab=readme-ov-file#license-%E8%AE%B8%E5%8F%AF%E8%AF%81) for the original project and license.

The main loop is **plant → harvest → wither → fix or ferment → brew → pour → recycle residue**. The Tea Pan, Frying Pan, Fermentation Barrel, Tea Stove, and Tea Table handle processing. NatureEngine contributes season, weather, and environment calculations. MateriaEngine handles harvesting, fruit regrowth, and harvest statistics.

## Quick navigation

- [First cup: green tea](#first-cup)
- [Tea garden: seasons and environment](#tea-garden)
- [Harvesting, replanting, and tools](#harvest-tools)
- [Tea-making routes](#tea-making)
- [Brewing, tea ware, and pouring](#brewing)
- [Garden, paddy, and orchard](#garden-orchard)
- [Food, dishes, and blended drinks](#food)
- [Tea room, machines, and display](#tea-room)
- [Harvest records and achievements](#records)
- [Configuration boundaries and troubleshooting](#appendix)

<a id="first-cup"></a>
## First cup: green tea

Follow this path when you are new to the system.

1. **Craft the stations and tools.** The crafting table provides the Tea Pan, Frying Pan, Fermentation Barrel, Tea Stove, Tea Table, sickle, wooden mortar and pestle, and tea whisk. The Tea Pan and Barrel use planks; the Stove uses bricks and cobblestone; the Frying Pan uses iron ingots, a cauldron, and logs; the Tea Table uses smooth stone slabs and planks. Use the CraftEngine recipe interface for the exact shaped patterns.
2. **Plant tea.** Find `cgap:tea_seeds` in world loot and plant it on a valid base block with enough light. The tea tree reaches mature age 6. When a sickle harvest finds a matching seed in your inventory or seed pouch, it resets the plant to age 0 and consumes one seed.
3. **Wither on a clear day.** Put graded fresh leaves into the Tea Pan. Clear weather preserves the grade and creates the matching withered leaf. Rain or thunder creates ungraded wet leaf; putting it back into the pan on a clear day rescues it as ungraded withered leaf.
4. **Fix and pan-fire.** Fuel the Frying Pan. Withered leaf becomes `cgap:tea_leaf` (green leaf), and green leaf put through the Frying Pan again becomes `cgap:green_tea_leaf`.
5. **Prepare hot water.** Water pots support stone, porcelain, iron, and zisha materials. Nine empty pots plus one water bucket fill nine pots, which can be fired in a furnace or blast furnace into boiled water pots.
6. **Brew.** Put two green tea leaves, any boiled water pot, and an empty cup into the Tea Table. The result keeps the cup material. Drinking returns the matching empty cup; the configured green tea effect is Haste for 260 ticks (about 13 seconds).
7. **If it fails, check the weather and slots.** Rain on the Tea Pan, missing vanilla fuel in the Frying Pan, or putting a water pot/leaf in the wrong Tea Table slot are the common causes.

### Five machines and their slots

| Machine | Main job | Slots and fuel | Default processing |
|---|---|---|---:|
| **Tea Pan** `cgap:teapan` | Clear-day withering, rain soaking, rescue, yellowing | Input 12, output 14; no fuel | 40–160 ticks |
| **Frying Pan** `cgap:tea_drying_pan` | Fixation, pan-firing, wet-leaf mistake | Input 2, fuel 20, output 15; vanilla fuel | 80–120 ticks |
| **Fermentation Barrel** `cgap:barrel` | Semi-, full-, and deep-fermentation | Input 12, baking powder 13, output 14; baking powder only | 160–200 ticks |
| **Tea Stove** `cgap:tea_stove` | Oolong, black, pu'er roasting; white baking; matcha steaming | Input 2, fuel 20, output 15; vanilla fuel | 160–200 ticks |
| **Tea Table** `cgap:tea_table` | Cup brewing, kettle brewing, pouring | Tool 1, sugar 2, cup/kettle 6, water 10, leaf 11, output 15; no fuel | 40–160 ticks |

The Tea Table uses one cup/kettle slot: an empty cup makes one serving, while an empty kettle makes a kettle. Tool and sugar slots are only needed for matcha, milk tea, lemon tea, and their kettle variants.

<a id="tea-garden"></a>
## Tea garden: seasons and environment

### Four rules that explain most growth issues

- Most TeaStory crops require light level 9 or higher. Tea tree bases accept the configured farmland, grass, dirt, podzol, and coarse dirt blocks.
- A preferred season is a target range in the growth calculation, not a hard planting ban. Moving away from the target lowers progress. Tea trees are marked as not easy to wither in Winter; other crops can still reach the wither condition.
- NatureEngine combines crop temperature/humidity targets, the vanilla world temperature, season/weather offsets, and structure scanning. `base-temperature` is a configuration baseline, not the final vanilla temperature value.
- Lotus needs water at the same position and a dirt, grass, mud, or clay base. Rice first grows as a seedling and is then transplanted to a paddy field.

### Season parameters

Each season lasts **10 in-game days**, for a 40-day cycle. A season change uses the configured title timing: 10 tick fade-in, 50 tick stay, and 20 tick fade-out. Temperature values below are NatureEngine baselines and humidity is 0–1. The yield multiplier is a season configuration hint; it does not automatically multiply every CraftEngine loot table.

| Season | Base temperature | Base humidity | Growth multiplier | Yield multiplier | Easy to wither |
|---|---:|---:|---:|---:|---|
| Spring | 15.0 | 0.70 | ×1.2 | ×1.0 | No |
| Summer | 25.0 | 0.50 | ×1.1 | ×1.1 | No |
| Autumn | 10.0 | 0.60 | ×1.0 | ×1.2 | No |
| Winter | 0.0 | 0.40 | ×0.5 | ×0.8 | Yes |

### Weather, solar terms, and offsets

The weather manager reselects weather for each world every **90 seconds**. Configured target durations are Sunny 300 seconds, Rain 240, Storm 180, and Snow 240. These are selection targets; the visible Bukkit state and loaded-world timing can affect what players observe.

| Weather | Seasonal selection weights (Spring / Summer / Autumn / Winter) | Temperature | Humidity | Soil | Growth multiplier |
|---|---|---:|---:|---:|---:|
| Sunny | 8 / 16 / 9 / 5 | +0.05 | -0.02 | -0.02 | ×1.00 |
| Rain | 7 / 3 / 6 / 1 | -0.03 | +0.05 | +0.20 | ×1.10 |
| Storm | 1 / 1 / 2 / 2 | -0.05 | +0.06 | +0.25 | ×0.93 |
| Snow | 0 / 0 / 0 / 10 | -0.12 | +0.02 | +0.10 | ×0.85 |

The 24 solar terms modify the **next-weather selection weights** only. They do not rewrite the weather profile's temperature, humidity, or growth multiplier. The current direction is more rain from Qingming to Guyu, slightly more storms in summer terms, more sun in autumn, and more snow with less rain from Lidong through Dahan. At the Bukkit weather layer, Snow currently maps to ordinary rain, so do not describe a separately verified snow-cover mechanic.

### Environment scanning

Environment scanning is enabled. It scans a radius of 4 blocks and checks up to 6 blocks upward for a roof. A closedness score of 0.60 classifies a greenhouse; openness below 0.25 is indoor, openness at least 0.80 is outdoor, and the rest is semi-outdoor. The nearby-water bonus is disabled.

| Environment | Stability | Progress adjustment | Typical use |
|---|---:|---:|---|
| Greenhouse | 1.00 | ×1.02 | Winter protection and stable seedlings |
| Indoor | 0.80 | ×0.98 | A normal roofed farm room |
| Semi-outdoor | 0.60 | ×1.00 | Partly covered, still weather-exposed |
| Outdoor | 0.35 | ×1.00 | Open tea gardens and natural trees |

The global advance threshold is **0.22**, the wither threshold is **0.02**, plugin random-tick speed is **3**, and environment mitigation strength is **0.75**. These values feed a combined calculation and are not a direct “blocks per minute” promise.

### Fourteen registered crops

Stage is the maximum age; age starts at 0. Temperature and humidity show the NatureEngine target and tolerance.

| Crop | Stage | Temperature target ±tolerance | Humidity target ±tolerance | Preferred seasons |
|---|---:|---:|---:|---|
| Tea tree | 6 | 1.20 ±0.80 | 0.80 ±0.60 | Spring, Summer, Autumn |
| Jasmine | 3 | 1.10 ±0.75 | 0.85 ±0.55 | Spring, Summer |
| Xian rice seedling | 3 | 1.20 ±0.80 | 0.95 ±0.55 | Summer |
| Xian rice plant | 7 | 1.20 ±0.80 | 0.95 ±0.55 | Summer |
| Osmanthus | 3 | 1.10 ±0.75 | 0.75 ±0.55 | Summer, Autumn |
| Cassava | 4 | 1.30 ±0.75 | 0.75 ±0.55 | Summer |
| Mint | 3 | 0.75 ±0.65 | 0.75 ±0.50 | Spring, Summer |
| Chrysanthemum | 3 | 0.80 ±0.70 | 0.65 ±0.50 | Autumn |
| Ginger | 4 | 1.15 ±0.75 | 0.85 ±0.50 | Summer |
| Lemongrass | 3 | 1.20 ±0.75 | 0.80 ±0.55 | Summer |
| Roselle | 3 | 1.20 ±0.75 | 0.70 ±0.55 | Summer, Autumn |
| Goji | 3 | 0.90 ±0.80 | 0.50 ±0.55 | Summer, Autumn |
| Mung bean | 3 | 1.10 ±0.75 | 0.70 ±0.55 | Summer |
| Lotus | 4 | 1.10 ±0.75 | 0.95 ±0.45 | Summer |

### NatureEngine commands (admin)

The NatureEngine root command requires OP. Regular players cannot use these commands to change seasons or read debug data.

| Command | Purpose |
|---|---|
| `/ne season info` | Show the world's season, progress, and override state |
| `/ne season next` | Move to the next season |
| `/ne season set <spring\|summer\|autumn\|winter>` | Set a manual season override |
| `/ne season clear` | Clear the manual override and resume natural progression |
| `/ne season apply` | Reapply the current season visuals |
| `/ne debug` | Show a season, weather, and environment summary |
| `/ne debug crop [detail]` | Show a crop summary or full debug details |
| `/ne debug visual` | Inspect visual season application |
| `/ne sim crop` | Simulate crop calculations without changing blocks |
| `/ne crop randomTickSpeed [value]` | Read or change plugin random-tick speed |
| `/ne reload [config\|seasons\|weather\|growth\|environment\|crops\|all]` | Reload selected configuration |
| `/ne metrics` | Show runtime metrics |

<a id="harvest-tools"></a>
## Harvesting, replanting, and tools

Harvest tools activate on right-click and use a 4-tick cooldown. Durability is charged per plant actually harvested.

| Tool | Durability | Target and behavior |
|---|---:|---|
| Sickle `cgap:sickle` | 500 | Radius 1 on the same Y level, up to 3×3; supports the 14 TeaStory crops plus wheat, carrots, potatoes, beetroots, and nether wart |
| Tea shears `cgap:tea_shears` | 320 | Tea quality mode; matching two-leaf, three-leaf, or old-leaf sources have a 35% chance to upgrade toward bud or one-bud-one-leaf targets |
| Herb shears `cgap:herb_shears` | 280 | Jasmine, osmanthus, mint, chrysanthemum, lemongrass, and roselle can give one extra fresh ingredient at 20% chance |
| Root spade `cgap:root_spade` | 400 | Ginger and cassava can give one extra root product at 25% chance |
| Fruit picker `cgap:fruit_picker` | 360 | Five-block ray trace; takes the first visible fruiting leaf and does not pierce blocks or foliage |
| Harvest basket `cgap:harvest_basket` | — | In the off-hand, routes harvest output into the inventory first; overflow stays on the ground |
| Seed pouch `cgap:seed_pouch` | — | Right-click to open; nine slots by default, expandable to 18 or 27 |

Quality and bonus chances are opportunities, not fixed per-plant yields. Base drops remain defined by the CraftEngine block loot tables.

### Sickle and automatic replanting

- The sickle checks only the same-height 3×3 area and skips unloaded or unavailable blocks. It does not harvest an entire field in one click.
- For a mature custom crop, the plugin checks the player's inventory and then the seed pouch. A matching seed resets the crop to age 0 and consumes one seed. Without one, the custom crop is removed; an equivalent vanilla crop becomes air.
- Action-bar feedback reports harvests, replanting, missing seeds, and overflow. Unknown or immature blocks are left alone.

### Seed pouch

The shaped pouch recipe uses string, leather, and blue dye. It accepts only registered custom-crop seeds and keeps their full item data. Right-click stores or withdraws one item; left-click stores or withdraws the whole stack. Reducing the configured capacity does not truncate existing contents; the maximum is 27 slots. Harvest checks both the pouch and the normal inventory.

### Fruit regrowth

Fruit leaves use `fruiting=false/true` to distinguish an unfruitful leaf from a fruiting leaf. The picker handles only fruiting, persistent leaves. The default regrowth delay is **1200 seconds (20 minutes)**. The pending record is stored in chunk persistent data, counts offline time, and does not force an unloaded chunk to load. If the leaf is removed before regrowth, the pending entry is cleared and no block is recreated.

<a id="tea-making"></a>
## Tea-making routes

### Route table

| Tea | Route |
|---|---|
| Green tea | Same-grade withered leaf → Frying Pan fixation → green leaf → pan-firing |
| Yellow tea | Green tea leaf → Tea Pan yellowing |
| White tea | Withered leaf → Frying Pan fixation → green leaf → Tea Stove baking |
| Oolong | Green leaf → mortar → broken tea → Barrel semi-fermentation → Tea Stove |
| Black tea | Broken tea → semi → full fermentation → Tea Stove |
| Pu'er | Broken tea → semi → full → deep fermentation → Tea Stove |
| Matcha | Green tea leaf → Tea Stove steaming |
| Jasmine tea | Black tea leaf ×6 + dried jasmine ×2 → crafting table |

### Tea Pan: weather-dependent withering

| Input | Condition | Output | Time |
|---|---|---|---:|
| Graded fresh leaf | Clear | Same-grade withered leaf | 100 ticks |
| Any graded fresh leaf | Rain | Ungraded wet leaf | 60 ticks |
| Any graded fresh leaf | Thunder | Ungraded wet leaf | 40 ticks |
| Wet leaf | Clear | Ungraded withered leaf | 140 ticks |
| Green tea leaf | Any weather | Yellow tea leaf | 160 ticks |

Rain and thunder remove the grade. Frying wet leaf directly creates scorched leaf.

### Frying Pan: fixation, pan-firing, and the mistake path

The Frying Pan uses vanilla fuel. Fixation yields two green leaves from bud or one-bud-one-leaf withered sources, and one from two-leaf, three-leaf, old-leaf, or ungraded withered sources. Pan-firing green leaf takes 120 ticks and creates green tea leaf. Wet leaf takes 80 ticks and creates scorched leaf.

### Mortar and Fermentation Barrel

- Wooden mortar and pestle + green leaf → broken tea ×3; each crafting recipe consumes one durability.
- The Barrel accepts only `cgap:baking_powder`, with a configured fuel value of **800**. Coal and other vanilla fuel do not start it. The discrete steps are broken → semi (160 ticks) → full (180) → deep (200); remove the intermediate output and insert it for the next step.
- Two wheat craft one baking powder. Any two tea residues or scorched leaves also recycle into one. Actual throughput depends on the machine's fuel accounting, so one powder is not documented as a fixed number of batches.

### Tea Stove finishing

| Input | Output | Time |
|---|---|---:|
| Semi-fermented tea | Oolong tea leaf | 200 ticks |
| Fully fermented tea | Black tea leaf | 200 ticks |
| Deep-fermented tea | Pu'er tea leaf | 200 ticks |
| Green leaf | White tea leaf | 160 ticks |
| Green tea leaf | Matcha leaf | 160 ticks |

The Stove uses vanilla fuel. White tea bypasses the Barrel; yellow tea and matcha use their independent Tea Pan and Tea Stove recipes.

<a id="brewing"></a>
## Brewing, tea ware, and pouring

### Tea bags, kettles, and boiled water

- Five paper + one string craft three empty tea bags. One empty bag + six matching finished leaves crafts one bag. Green, jasmine, black, oolong, pu'er, white, and yellow tea bags are configured.
- Clay balls or zisha clay form kettle blanks, which are fired in a furnace or blast furnace into empty porcelain or zisha kettles. Water pots exist in stone, porcelain, iron, and zisha materials.
- Nine empty water pots + one water bucket → nine water-filled pots. Furnace time is 160 ticks and blast-furnace time is 80 ticks. Any boiled pot material works at the Tea Table; the recipe returns the matching empty pot.

### Cup brewing

The plain recipe is **two matching tea leaves + any boiled water pot + one empty cup**. Cups support glass, stone, wood, porcelain, and zisha materials, and the result keeps the cup material. Drinking returns the corresponding empty cup. Tea-table drinks use nutrition 5 and saturation 3.5 in the item configuration.

| Drink | Tea Table inputs | Configured effect |
|---|---|---|
| Black tea | Black tea leaf ×2 | Strength, 220 ticks (about 11 s) |
| Green tea | Green tea leaf ×2 | Haste, 260 ticks (about 13 s) |
| Jasmine tea | Jasmine tea leaf ×2 | Luck, 240 ticks (about 12 s) |
| Lemon tea | Black tea leaf ×2 + lemon + sugar ×3 | Speed, 240 ticks (about 12 s) |
| Matcha | Matcha leaf ×2 + tea whisk + sugar ×3 | Jump Boost II, 200 ticks (about 10 s) |
| Milk tea | Black tea leaf ×2 + milk bucket + sugar ×3 | Resistance, 220 ticks (about 11 s) |
| Oolong | Oolong tea leaf ×2 | Water Breathing, 260 ticks (about 13 s) |
| Pu'er | Pu'er tea leaf ×2 | Health Boost, 240 ticks (about 12 s) |
| White tea | White tea leaf ×2 | Regeneration, 140 ticks (about 7 s) |
| Yellow tea | Yellow tea leaf ×2 | Absorption, 200 ticks (about 10 s) |

The seconds above are 20-tick conversions. Effects are configured durations, not permanent status effects.

### Kettle brewing and pouring

- Plain kettle brewing uses a matching tea bag, a boiled water pot, and an empty kettle. A porcelain kettle uses one bag; a zisha kettle uses two. Brewing returns the configured matching residue.
- Milk kettles use black tea bag ×1/×2, milk bucket, sugar ×12/×24, boiled water, and an empty porcelain/zisha kettle. The milk bucket returns an empty bucket.
- Lemon kettles prefer lemon tea bag ×1/×2 and sugar ×12/×24. A compatibility recipe also accepts black tea bag plus lemon; the returned residue follows the current configuration.
- Matcha kettles use matcha leaf ×6/×12, tea whisk, sugar ×12/×24, boiled water, and an empty kettle. Each recipe consumes one whisk durability; the whisk has 120 durability.
- A full kettle plus an empty cup pours one serving in 40 ticks and consumes one kettle durability. Porcelain kettles pour four cups; zisha kettles pour eight, then return the matching empty kettle.

### Residue recycling

Brewing black, green, oolong, pu'er, white, yellow, or jasmine tea bags produces configured matching residues. Any two residues or scorched leaves craft one baking powder, closing the tea → drink → fermentation-fuel loop.

<a id="garden-orchard"></a>
## Garden, paddy, and orchard

### Two-stage rice line

1. Plant `cgap:xian_rice_seeds` on ordinary farmland to grow a xian rice seedling. A mature seedling yields rice seedlings and seeds.
2. Transplant the seedling into `cgap:paddy_field` and grow the xian rice plant to age 7. Mature rice currently drops rice seeds (1–3), not finished rice.
3. Wooden mortar and pestle + rice seed → rice. Rice then feeds steamed rice, congee, rice cakes, and other dishes.

The paddy field is crafted from eight dirt around one water bucket; the bucket returns. An empty bucket cannot scoop it up, and a water bucket cannot refill it. It is a recoverable custom block.

### Ingredient crops and wild seeds

| Crop | Mature product | Planting or wild source |
|---|---|---|
| Osmanthus | Fresh osmanthus | Farmland, grass, dirt, and configured soil bases |
| Cassava | Cassava root | Farmland; root processes into cassava starch |
| Mint | Fresh mint | Ordinary soil bases |
| Chrysanthemum | Fresh chrysanthemum | Ordinary soil bases |
| Ginger | Ginger | Farmland |
| Mung bean | Fresh mung beans | Ordinary soil; fresh beans process to seeds |
| Lemongrass | Fresh lemongrass | Ordinary soil bases |
| Roselle | Fresh roselle | Ordinary soil bases |
| Goji | Fresh goji | Ordinary soil bases |
| Lotus | Lotus flower, seed pod, lotus root | Water at the same position; dirt, grass, mud, or clay base |

Wild lemongrass, roselle, and goji seeds can drop from grass and ferns at **0.5%**. Lotus seeds can drop from lily pads at **5%**. Mature ingredient crops provide fresh material and planting material according to their CraftEngine loot tables.

### Tea-tree harvest

At age 6, the tea tree's mature loot chooses a fresh-leaf grade by weight: bud 5, one-bud-one-leaf 15, two-leaf 25, three-leaf 30, old leaf 25. Tea seeds are also present; Fortune changes the configured bonus seed roll. Tea shears add an upgrade chance and do not turn the plant into a fixed-yield source.

### Orchard and fruiting leaves

CraftEngine defines peach, lemon, jujube, pomelo, orange, and persimmon trunks, leaves, fruiting states, and drops. Ordinary leaves have an approximately **0.8%** fruit-drop chance when not harvested with shears or Silk Touch. Natural foliage providers use a plain 7 to fruiting 3 weight.

NatureEngine directly registers five saplings—jujube, pomelo, orange, persimmon, and peach—with stage 1 and Spring/Summer preference. The lemon tree definition exists in CraftEngine but is not in that five-sapling registry, so this guide does not assign it an independent registered seasonal preference. The picker handles only `fruiting=true` persistent leaves and uses a 20-minute default regrowth delay.

<a id="food"></a>
## Food, dishes, and blended drinks

The CraftEngine `teastory_foods` category currently registers **94 food and drink entries**. They are primarily shapeless crafting-table recipes. Whether a bucket, bowl, or honeycomb returns is controlled per item by `consume-replacement`; bowl-based rice and soup items generally return a bowl.

### Basic processing

| Input chain | Recipe |
|---|---|
| Wheat | Wheat ×2 → baking powder ×1 |
| Sugar cane | Sugar cane → brown sugar |
| Fresh osmanthus, mint, chrysanthemum, ginger | Furnace 160 ticks or blast furnace 80 → matching dried ingredient |
| Fresh mung beans | Fresh mung beans → mung-bean seeds ×2 |
| Cassava root | Cassava root ×2 + wooden mortar and pestle → cassava starch ×2 |
| Cassava starch | Cassava starch ×2 + sugar → tapioca pearls |
| Fresh jasmine, lemon, and fruit | Dry or process into dried jasmine, dried lemon, chenpi, and other ingredients |

### Representative recipes

| Result | Shapeless ingredients | Output |
|---|---|---:|
| Steamed rice | Rice + water bucket + bowl | 1 |
| Red-date goji congee | Rice + dried jujube + dried goji + water bucket + bowl | 1 |
| Osmanthus rice cake | Rice flour + dried osmanthus + sugar | 1 |
| Matcha cookie | Matcha leaf + wheat ×2 + sugar | 4 |
| Tea egg | Black tea leaf + egg | 1 |
| Brown-sugar ginger candy | Dried ginger + sugar + brown sugar | 4 |
| Boba milk tea | Glass of black tea + milk bucket + sugar + tapioca pearls | 1 |
| Matcha latte | Glass of matcha drink + milk bucket + sugar | 1 |
| Chenpi pu'er tea | Glass of pu'er tea + chenpi + sugar | 1 |
| Longjing shrimp | Green tea leaf + shrimp meat ×2 + bowl | 1 |
| Pork dumplings | Wheat ×2 + cooked pork + ginger + water bucket + bowl | 1 |
| Xiaolongbao | Wheat ×2 + cooked pork + ginger + water bucket | 2 |
| Youtiao | Wheat ×2 + baking powder + water bucket | 2 |
| Eight-treasure rice | Rice, dried jujube, lotus seeds, dried goji, fresh mung beans, persimmon cake, sweet berries, brown sugar, bowl | 1 |

### Blended-drink coverage

Beyond the Tea Table's base teas, the food recipes cover peach jasmine tea, osmanthus oolong, brown-sugar milk tea, honey lemon tea, chrysanthemum goji tea, mint green tea, ginger milk tea, orange jasmine tea, roselle lemon tea, osmanthus milk tea, chenpi ginger tea, roasted-rice tea, lotus-seed milk, mint watermelon juice, pumpkin milk, ginger-date milk, brown-sugar rice milk, peach pomelo milk, honey apple tea, sugarcane lemon juice, jujube lotus tea, and chrysanthemum pu'er. The exact inputs are shown in the recipe interface.

The Chinese-dish set also includes roujiamo, osmanthus lotus root, shrimp fried rice, braised pork, lotus pork soup, lemon steamed fish, spring rolls, berry tanghulu, sachima, egg tart, mint qingtuan, jujube steamed cake, mung-bean soup, beef noodle soup, shrimp rice rolls, pan-fried dumplings, sticky-rice chicken, sweet-and-sour pork, mushroom steamed chicken, lamb skewers, lotus-root meatballs, jianbing, longevity peach bun, osmanthus pastry, brown-sugar ciba, mahua, dragon-beard candy, pumpkin cake, honey char siu, shrimp egg custard, chicken clay-pot rice, pork wonton soup, fried lotus sandwich, osmanthus crystal cake, milk flower bun, golden shrimp balls, potato beef stew, pearl meatballs, egg fried noodles, shrimp potato cake, tiger-skin eggs, crispy fried milk, sugar shaobing, and egg waffles.

Nutrition, saturation, and replacement items are configured per food. Do not infer a tea effect from a food's name.

<a id="tea-room"></a>
## Tea room, machines, and display

The Tea Pan, Frying Pan, Fermentation Barrel, Tea Stove, and Tea Table are interactive machines. Right-click opens each GUI; collect the output and reinsert intermediate products for the next recipe. The Frying Pan and Tea Stove use vanilla fuel, the Barrel uses baking powder only, and the Tea Pan and Tea Table use no fuel.

The Tea Table's tool, sugar, cup/kettle, water, leaf, and output slots are fixed. Furniture and decorative models are resource-pack content; only the machines, paddy field, fruiting leaves, and harvest interactions described here are assigned behavior.

<a id="records"></a>
## Harvest records and achievements

### MateriaEngine harvest statistics

- `/me harvest menu` opens your own overview, product, tool, and crop tabs.
- `/me harvest stats [all|player|UUID] [all|today|week]` reads statistics. Regular players default to their own data; administrators or the console can select another target.
- `/me harvest export ...` exports an UTF-8 BOM CSV for administrators to `plugins/MateriaEngine/exports/harvest-*.csv`.
- The database is `plugins/MateriaEngine/harvest_stats.db`. Cumulative and daily counters are separate; “today” uses the Asia/Shanghai timezone, and “week” runs Monday through today. Old cumulative values are not backfilled into daily records.
- The UI distinguishes stored, dropped, quality, bonus, and fruit harvest metrics. An off-hand basket changes delivery, while overflow remains a drop.

### BeaconEngine milestones

The current TeaStory achievement configuration covers seeds, planting, first harvest, 100 harvests, quality upgrades, fruit harvests, harvest outputs, withered leaves, green leaves, broken tea, six finished tea types, tea bags, boiled water pots, zisha materials, cups, drinking counts, and tea residue. MateriaEngine sends actual harvest and harvest-output contexts through the BeaconEngine API, so new harvests can progress those milestones. Historical statistics are not treated as automatically backfilled achievements.

<a id="appendix"></a>
## Configuration boundaries and troubleshooting

Use the component that owns the data when diagnosing an issue:

1. **Crop is not growing:** run `/ne debug crop detail` and inspect light, temperature, humidity, season, weather, and environment. Then check that the crop is registered and its CraftEngine base block is valid.
2. **Tea Pan output is wrong:** check the world's weather. Rain or thunder makes wet leaf; a clear-day rescue produces only ungraded withered leaf.
3. **Machine does not start:** add vanilla fuel to the Frying Pan or Stove, baking powder to the Barrel, and place Tea Table inputs in their fixed slots. A normal filled water pot is not a boiled water pot.
4. **Harvest does not replant:** check both the inventory and seed pouch for the matching seed. Without one, the current custom-crop logic removes the block.
5. **Fruit does not return:** the leaf must be persistent and the chunk must load again. The plugin does not force-load chunks and does not recreate removed foliage.
6. **Stats or achievements are missing:** confirm that the event happened after the relevant tracker or trigger was enabled. Daily counters and achievements do not promise historical backfill.

This guide records rules expressed by the current configuration and source. A live server can still differ because of chunk loading, permissions, resource-pack versions, or event ordering with other plugins. Verify runtime behavior on the target server with the relevant command, GUI, and item.

## Related pages

- [Legacy Season System compatibility page](/en/tutorial/SeasonWiki)
- [EcoEnchants](/en/tutorial/EcoEnchants)
