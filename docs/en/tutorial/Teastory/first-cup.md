---
title: First cup & equipment
description: Make your first green tea from seeds and fresh leaves, then learn the equipment and container recipes.
aside: true
pageClass: teastory-page
---

<script setup>
import TeaStoryFlow from '../../../.vitepress/theme/components/teastory/TeaStoryFlow.vue'
import TeaStoryRecipes from '../../../.vitepress/theme/components/teastory/TeaStoryRecipes.vue'
import '../../../.vitepress/theme/teastory-guide.css'
</script>

# First cup & equipment

<p class="tea-lead">Start with tea seeds and fresh leaves, then follow four steps to make your first green tea.</p>

[← Back to the TeaStory collection](/en/tutorial/Teastory)

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

Put **2 green tea leaves + any boiled kettle + 1 empty cup** into the Tea Table. Collect the green tea from the output. Brewing returns the empty water kettle; drinking returns the matching cup and grants brief Haste. [See the Tea Table slots](/en/tutorial/Teastory/brewing).

</div>

### Equipment and containers {#equipment}

<TeaStoryRecipes en :ids="['teapan', 'tea_drying_pan', 'tea_table', 'cup_glass', 'pot_stone', 'barrel', 'tea_stove', 'wooden_mortar_and_pestle']" />

[Next chapter: Processing routes →](/en/tutorial/Teastory/tea-making)
