---
title: Food catalog
description: Browse TeaStory foods, drinks and recipes, including each ingredient's processing chain.
aside: true
pageClass: teastory-page
---

<script setup>
import TeaStoryRecipes from '../../../.vitepress/theme/components/teastory/TeaStoryRecipes.vue'
import { foodIds } from '../../../.vitepress/theme/components/teastory/data'
import '../../../.vitepress/theme/teastory-guide.css'
</script>

# Food catalog {#food}

<p class="tea-lead">From tea, flowers and rice to a Chinese tea table, follow every ingredient from harvest to plate.</p>

<p class="tea-chapter-back"><a href="/en/tutorial/Teastory"><span class="tea-chapter-link__icon" aria-hidden="true"><span class="vpi-arrow-left"></span></span><span>Back to the TeaStory collection</span></a></p>

Browse {{ foodIds.length }} foods and drinks. Ingredients have their own processing chains: mill grains into rice and rice into flour; dry fresh flowers before adding them to tea or pastries.

<TeaStoryRecipes en catalog />

<p class="tea-chapter-next"><a href="/en/tutorial/Teastory/reference"><span>Next chapter: FAQ &amp; reference</span><span class="tea-chapter-link__icon" aria-hidden="true"><span class="vpi-arrow-right"></span></span></a></p>
