---
title: 茶点图鉴
description: 浏览 TeaStory 的茶点、料理与饮品，查看配方和原料加工路线。
aside: true
pageClass: teastory-page
---

<script setup>
import TeaStoryRecipes from '../../.vitepress/theme/components/teastory/TeaStoryRecipes.vue'
import { foodIds } from '../../.vitepress/theme/components/teastory/data'
import '../../.vitepress/theme/teastory-guide.css'
</script>

# 茶点图鉴 {#food}

<p class="tea-lead">从茶叶、鲜花和稻米，到一桌中式茶点，把每条原料路线都查清楚。</p>

<p class="tea-chapter-back"><a href="/tutorial/Teastory"><span class="tea-chapter-link__icon" aria-hidden="true"><span class="vpi-arrow-left"></span></span><span>返回茶风纪事集合</span></a></p>

这里收录 {{ foodIds.length }} 种茶点、料理与饮品。配方中的原料有自己的加工路线，例如稻谷磨成大米、大米磨成米粉，鲜花烘成干料后再入茶或做点心。

<TeaStoryRecipes catalog />

<p class="tea-chapter-next"><a href="/tutorial/Teastory/reference"><span>下一章：常见问题与参考</span><span class="tea-chapter-link__icon" aria-hidden="true"><span class="vpi-arrow-right"></span></span></a></p>
