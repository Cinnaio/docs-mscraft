---
title: Growing & harvesting
description: Learn about TeaStory seasons, environments, rice paddies, fruit trees and harvesting tools.
aside: true
pageClass: teastory-page
---

<script setup>
import TeaStoryFlow from '../../../.vitepress/theme/components/teastory/TeaStoryFlow.vue'
import TeaStoryItem from '../../../.vitepress/theme/components/teastory/TeaStoryItem.vue'
import TeaStoryRecipes from '../../../.vitepress/theme/components/teastory/TeaStoryRecipes.vue'
import '../../../.vitepress/theme/teastory-guide.css'
</script>

# Growing & harvesting {#tea-garden}

<p class="tea-lead">Coordinate seasons, surroundings and the right tools for a steady harvest of tea, herbs, rice and fruit.</p>

<p class="tea-chapter-back"><a href="/en/tutorial/Teastory"><span class="tea-chapter-link__icon" aria-hidden="true"><span class="vpi-arrow-left"></span></span><span>Back to the TeaStory collection</span></a></p>

Each season lasts **10 in-game days**. Tea prefers spring, summer and autumn; growth slows in winter. A preference does not prohibit planting in other seasons. Light, temperature, humidity and surroundings also affect growth.

<div class="tea-season-images">
  <figure><img src="/images/vanilla-plains.png" alt="Grassland and vegetation in normal conditions" width="1920" height="1080" loading="lazy" /><figcaption>Normal conditions</figcaption></figure>
  <figure><img src="/images/season-winter.png" alt="Ground and vegetation with winter visuals" width="1920" height="1080" loading="lazy" /><figcaption>Winter appearance example</figcaption></figure>
</div>

## Pick the right ground

- **Tea and most herbs:** use suitable soil and sufficient light. Tea supports farmland, grass blocks, dirt, podzol, coarse dirt and other configured soils.
- **Cassava and ginger:** require farmland. Lotus requires nearby water with dirt, grass, mud or clay underneath.
- **Greenhouses:** enclosed structures can improve stability. A roof alone may not qualify, and a greenhouse cannot guarantee growth in every condition.
- **Wild seeds:** lemongrass, roselle and goji seeds drop from grass and ferns at 0.5%; lotus seeds drop from lily pads at 5%.

## Rice needs a nursery, then a paddy {#garden-orchard}

Plant rice grains on ordinary farmland. Harvest the mature nursery crop for seedlings, transplant them into a paddy, and harvest more rice grains when mature. Mill the grains with a wooden mortar and pestle to make rice.

<TeaStoryFlow en :steps="[{ id: 'xian_rice_seeds', note: 'Grow on farmland' }, { id: 'item_xian_rice_seedling', note: 'Transplant into a paddy' }, { id: 'xian_rice_seeds', note: 'Harvest mature rice plants' }, { id: 'xian_rice', note: 'Crafting table + mortar' }]" />

Craft a paddy from 8 dirt surrounding a water bucket; the bucket is returned. An empty bucket cannot scoop up the paddy, but breaking it recovers the block. Mature rice mainly drops 1–3 grains.

## Six fruit trees

Grow peach, lemon, jujube, pomelo, orange and persimmon. Use a Fruit Picker on visible fruiting leaves. Eligible persistent leaves regrow fruit after **20 minutes** by default. Breaking ordinary leaves has a separate random fruit drop; shears and Silk Touch do not use that drop.

## Pick the right harvesting tool {#harvest-tools}

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

### Harvesting tool recipes

<TeaStoryRecipes en :ids="['sickle', 'tea_shears', 'herb_shears', 'root_spade', 'fruit_picker', 'harvest_basket', 'seed_pouch']" />

<p class="tea-chapter-next"><a href="/en/tutorial/Teastory/food"><span>Next chapter: Food catalog</span><span class="tea-chapter-link__icon" aria-hidden="true"><span class="vpi-arrow-right"></span></span></a></p>
