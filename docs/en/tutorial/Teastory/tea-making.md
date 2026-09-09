---
title: Processing routes
description: Follow fresh leaves from withering to green, white, yellow, oolong, black, pu'er and matcha tea.
aside: true
pageClass: teastory-page
---

<script setup>
import TeaStoryRoutes from '../../../.vitepress/theme/components/teastory/TeaStoryRoutes.vue'
import '../../../.vitepress/theme/teastory-guide.css'
</script>

# Processing routes {#tea-making}

<p class="tea-lead">Wither fresh leaves first, then follow a route to the tea you want.</p>

<p class="tea-chapter-back"><a href="/en/tutorial/Teastory"><span class="tea-chapter-link__icon" aria-hidden="true"><span class="vpi-arrow-left"></span></span><span>Back to the TeaStory collection</span></a></p>

Fermentation completes one stage at a time: take out the intermediate item and reinsert it to continue. Once it reaches the desired stage, roast it in the Tea Stove.

<TeaStoryRoutes en />

::: details Leaf grades, fermentation fuel and processing times

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

:::

<p class="tea-chapter-next"><a href="/en/tutorial/Teastory/brewing"><span>Next chapter: Brewing &amp; teaware</span><span class="tea-chapter-link__icon" aria-hidden="true"><span class="vpi-arrow-right"></span></span></a></p>
