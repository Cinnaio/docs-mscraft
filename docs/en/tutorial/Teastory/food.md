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

[← Back to the TeaStory collection](/en/tutorial/Teastory)

Browse {{ foodIds.length }} foods and drinks. Ingredients have their own processing chains: mill grains into rice and rice into flour; dry fresh flowers before adding them to tea or pastries.

<TeaStoryRecipes en catalog />

[Next chapter: FAQ & reference →](/en/tutorial/Teastory/reference)
