---
title: 种植与采收
description: 了解 TeaStory 的季节、环境、稻田、果树与采收工具。
aside: true
pageClass: teastory-page
---

<script setup>
import TeaStoryFlow from '../../.vitepress/theme/components/teastory/TeaStoryFlow.vue'
import TeaStoryItem from '../../.vitepress/theme/components/teastory/TeaStoryItem.vue'
import TeaStoryRecipes from '../../.vitepress/theme/components/teastory/TeaStoryRecipes.vue'
import '../../.vitepress/theme/teastory-guide.css'
</script>

# 种植与采收 {#tea-garden}

<p class="tea-lead">把季节、环境和合适的工具安排好，才能稳定地收获茶叶、花草、稻米与果实。</p>

[← 返回茶风纪事集合](/tutorial/Teastory)

每个季节持续 **10 个游戏日**。春、夏、秋都适合茶树；冬季生长会变慢。季节偏好不代表其他季节完全不能种，光照、温湿度和种植环境也会影响生长。

<div class="tea-season-images">
  <figure><img src="/images/vanilla-plains.png" alt="常规季节的草地与植被" width="1920" height="1080" loading="lazy" /><figcaption>常规环境</figcaption></figure>
  <figure><img src="/images/season-winter.png" alt="冬季环境中的地表与植被" width="1920" height="1080" loading="lazy" /><figcaption>冬季外观示例</figcaption></figure>
</div>

## 种在哪里

- **茶树和多数花草：** 选合适的泥土类方块，保持充足光照。茶树支持耕地、草方块、泥土、灰化土、砂土等。
- **木薯、生姜：** 需要耕地。莲花则需要附近水体，底部支持泥土、草方块、泥巴、黏土。
- **温室：** 封闭结构可以改善环境稳定性；只搭一块屋顶不一定构成温室，也不能保证任何条件下都正常生长。
- **找种子：** 香茅、洛神花、枸杞种子可从草和蕨以 0.5% 概率掉落；莲花种子从睡莲以 5% 概率掉落。

## 水稻要先育苗，再移栽 {#garden-orchard}

先把稻谷种在普通耕地，育苗成熟后获得稻秧。把稻秧移栽到稻田，成熟后收获稻谷，再与木制研钵研杵合成大米。

<TeaStoryFlow :steps="[{ id: 'xian_rice_seeds', note: '普通耕地育苗' }, { id: 'item_xian_rice_seedling', note: '成熟后移栽到稻田' }, { id: 'xian_rice_seeds', note: '成熟水稻收获稻谷' }, { id: 'xian_rice', note: '工作台 + 研钵' }]" />

稻田由 8 个泥土围绕 1 个水桶合成，水桶返还；空桶不能把稻田捞回，破坏后可以回收该方块。成熟水稻主要掉落 1–3 个稻谷。

## 六种果树

果园包括桃、柠檬、枣、柚子、橘子和柿子。摘果器用于可见的结果树叶；可恢复的持久树叶默认 **20 分钟** 后重新结果。普通树叶破坏时另有果实随机掉落，剪刀或精准采集不走这条掉落。

## 选对采收工具 {#harvest-tools}

<ul class="tea-tools">
  <li><TeaStoryItem id="sickle" /><p>同一高度最多收获 3×3 范围。采收时优先从背包、再从种子袋取种续种；每株消耗一颗种子。</p></li>
  <li><TeaStoryItem id="tea_shears" /><p>专门采茶。较低等级鲜叶有 35% 的机会升级为单芽或一芽一叶。</p></li>
  <li><TeaStoryItem id="herb_shears" /><p>用于茉莉、桂花、薄荷、菊花等花草，有 20% 的机会多收一份鲜料。</p></li>
  <li><TeaStoryItem id="root_spade" /><p>用于生姜、木薯，有 25% 的机会多收一份根茎。</p></li>
  <li><TeaStoryItem id="fruit_picker" /><p>最远 5 格，采第一个可见结果叶。不会穿过其他方块或树叶。</p></li>
  <li><TeaStoryItem id="harvest_basket" /><p>放在副手，收获物优先进入背包；背包放不下的部分掉在地上。</p></li>
  <li><TeaStoryItem id="seed_pouch" /><p>右击打开，默认 9 格，仅接受登记的自定义作物种子。左键操作整组，右键操作一个。</p></li>
</ul>

工具通过右击使用，并按实际采收数量消耗耐久。**缺少种子时不会自动续种，成熟作物会被移除**；采收前先检查种子数量，采收后留意动作栏提示。

<details class="tea-reference">
<summary>采收工具合成配方</summary>

<TeaStoryRecipes :ids="['sickle', 'tea_shears', 'herb_shears', 'root_spade', 'fruit_picker', 'harvest_basket', 'seed_pouch']" />

</details>

[下一章：茶点图鉴 →](/tutorial/Teastory/food)
