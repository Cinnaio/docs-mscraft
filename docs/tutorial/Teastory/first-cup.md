---
title: 第一杯茶与设备
description: 从茶种子和鲜叶开始，完成第一杯绿茶，并认识茶道设备与容器配方。
aside: true
pageClass: teastory-page
---

<script setup>
import TeaStoryFlow from '../../.vitepress/theme/components/teastory/TeaStoryFlow.vue'
import TeaStoryRecipes from '../../.vitepress/theme/components/teastory/TeaStoryRecipes.vue'
import '../../.vitepress/theme/teastory-guide.css'
</script>

# 第一杯茶与设备

<p class="tea-lead">从茶种子和鲜叶开始，沿着四步流程做出第一杯绿茶。</p>

<p class="tea-chapter-back"><a href="/tutorial/Teastory"><span class="tea-chapter-link__icon" aria-hidden="true"><span class="vpi-arrow-left"></span></span><span>返回茶风纪事集合</span></a></p>

## 先做一杯绿茶 {#first-cup}

先准备 **茶盘、炒茶锅、茶桌**，再备好燃料、一个杯子和烧水用的水壶。[设备与容器配方](#equipment)就在这段教程后面。绿茶路线用不到发酵桶和茶炉。

<div class="tea-step">

### <span>1</span> 种下茶树，收获鲜叶

破坏橡树、白桦等已登记的原版树叶，有 **0.8%** 的机会获得茶种子。种在耕地或合适的泥土类方块上，保持至少 **9 级光照**，等茶树成熟后，用镰刀右击采收。背包里留一颗茶种子，就能在采收时续种。

<TeaStoryFlow :steps="[{ id: 'tea_seeds', note: '种在合适的土壤上' }, { id: 'fresh_tea_leaf_bud', label: '分级鲜叶', note: '成熟后采收，图为单芽' }]" />

</div>

<div class="tea-step">

### <span>2</span> 选晴天，把鲜叶放进茶盘

右击茶盘打开界面，把鲜叶放入输入槽，完成后取出萎凋叶。**晴天会保留鲜叶等级；雨和雷暴会把它变成湿茶。** 已经淋湿的叶子可以等晴天再次放回茶盘挽救，但等级不会恢复。

<TeaStoryFlow :steps="[{ id: 'fresh_tea_leaf_bud', label: '分级鲜叶' }, { id: 'withered_tea_leaf_bud', label: '同等级萎凋叶', note: '茶盘 · 晴天 · 100 tick' }]" />

</div>

<div class="tea-step">

### <span>3</span> 炒两次：先杀青，再炒青

给炒茶锅放入煤炭等原版燃料。萎凋叶先加工成青叶，**把青叶从产出槽取出，再投入输入槽**，第二次才得到绿茶叶。单芽和一芽一叶的萎凋叶能产出 2 份青叶，其他等级产出 1 份。

<TeaStoryFlow :steps="[{ id: 'withered_tea_leaf_bud', label: '萎凋叶' }, { id: 'tea_leaf', note: '炒茶锅 · 杀青' }, { id: 'green_tea_leaf', note: '炒茶锅 · 再炒 120 tick' }]" />

</div>

<div class="tea-step">

### <span>4</span> 烧开水，在茶桌上冲泡

9 个空水壶与 1 个水桶可以无序合成为 9 个有水水壶，再放入熔炉烧开。石、瓷、铁、紫砂水壶都能用；下面以石水壶为例。

<TeaStoryFlow :steps="[{ id: 'pot_stone', count: 9, note: '与 1 个水桶合成' }, { id: 'water_pot_stone', count: 9, note: '装好水，仍需加热' }, { id: 'boiled_water_pot_stone', label: '开水壶', note: '熔炉 160 tick / 高炉 80 tick' }]" />

最后，在茶桌放入 **绿茶叶 ×2 + 任意开水壶 + 空杯 ×1**，从输出槽取走绿茶。冲泡会返还空水壶，喝完后返还同材质空杯；绿茶提供短暂急迫效果。[查看茶桌投料位置](/tutorial/Teastory/brewing)。

</div>

### 设备与容器配方 {#equipment}

<TeaStoryRecipes :ids="['teapan', 'tea_drying_pan', 'tea_table', 'cup_glass', 'pot_stone', 'barrel', 'tea_stove', 'wooden_mortar_and_pestle']" />

<p class="tea-chapter-next"><a href="/tutorial/Teastory/tea-making"><span>下一章：制茶路线</span><span class="tea-chapter-link__icon" aria-hidden="true"><span class="vpi-arrow-right"></span></span></a></p>
