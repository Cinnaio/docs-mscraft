---
title: Brewing & teaware
description: Learn the rules for cups, teapots, tea bags, pouring, recycling and tea effects.
aside: true
pageClass: teastory-page
---

<script setup>
import TeaStoryFlow from '../../../.vitepress/theme/components/teastory/TeaStoryFlow.vue'
import TeaStoryBrewing from '../../../.vitepress/theme/components/teastory/TeaStoryBrewing.vue'
import '../../../.vitepress/theme/teastory-guide.css'
</script>

# Brewing & teaware {#brewing}

<p class="tea-lead">From a single cup to a full teapot, learn the Tea Table slots, tea bags and recycling rules.</p>

[← Back to the TeaStory collection](/en/tutorial/Teastory)

A cup of plain tea needs **2 leaves**. A porcelain teapot uses 1 tea bag and serves up to 4 cups; a zisha teapot uses 2 bags and serves up to 8. Milk tea, lemon tea and matcha require extra ingredients.

<TeaStoryBrewing en />

## Tea bags, pouring and recycling

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

[Next chapter: Growing & harvesting →](/en/tutorial/Teastory/tea-garden)
