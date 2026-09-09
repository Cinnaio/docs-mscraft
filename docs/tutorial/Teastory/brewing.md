---
title: 冲泡与茶具
description: 了解杯装、壶装、茶包、倒杯回收与不同茶饮的冲泡规则。
aside: true
pageClass: teastory-page
---

<script setup>
import TeaStoryFlow from '../../.vitepress/theme/components/teastory/TeaStoryFlow.vue'
import TeaStoryBrewing from '../../.vitepress/theme/components/teastory/TeaStoryBrewing.vue'
import '../../.vitepress/theme/teastory-guide.css'
</script>

# 冲泡与茶具 {#brewing}

<p class="tea-lead">从一只杯子到一整壶茶，掌握茶桌的投料位置、茶包和回收规则。</p>

<p class="tea-chapter-back"><a href="/tutorial/Teastory"><span class="tea-chapter-link__icon" aria-hidden="true"><span class="vpi-arrow-left"></span></span><span>返回茶风纪事集合</span></a></p>

杯装纯茶用 **2 份茶叶**。壶装使用茶包：瓷壶用 1 个，紫砂壶用 2 个，分别最多倒出 4 杯和 8 杯。奶茶、柠檬茶、抹茶还有额外材料。

<TeaStoryBrewing />

## 茶包、倒杯与回收

5 张纸和 1 根线合成 3 个空茶包；空茶包与 6 份对应成品茶叶合成茶包。茶包冲泡后产生对应茶渣，茶渣可回收为发酵粉。

满壶和空杯放进茶桌就能倒出一杯，单次消耗壶 1 点耐久、耗时 40 tick；壶倒空后返还空壶。抹茶使用的茶筅总耐久为 120，每次配方消耗 1 点。

<TeaStoryFlow :steps="[{ id: 'green_tea_leaf', count: 6, note: '与空茶包合成' }, { id: 'green_tea_bag', note: '用于壶装冲泡' }, { id: 'green_tea_residue', note: '两份茶渣可回收发酵粉' }]" />

::: details 茶饮效果速查

| 茶饮 | 效果 | 持续时间 |
|---|---|---:|
| 绿茶 | 急迫 | 260 tick |
| 红茶 | 力量 | 220 tick |
| 茉莉花茶 | 幸运 | 240 tick |
| 乌龙 | 水下呼吸 | 260 tick |
| 普洱 | 生命提升 | 240 tick |
| 白茶 | 生命恢复 | 140 tick |
| 黄茶 | 吸收 | 200 tick |
| 奶茶 | 抗性提升 | 220 tick |
| 柠檬茶 | 速度 | 240 tick |
| 抹茶 | 跳跃提升 II | 200 tick |

基础茶饮营养值为 5、饱和度为 3.5。复配饮品和食品各有自己的配置，不能仅凭名称推断效果。

:::

<p class="tea-chapter-next"><a href="/tutorial/Teastory/tea-garden"><span>下一章：种植与采收</span><span class="tea-chapter-link__icon" aria-hidden="true"><span class="vpi-arrow-right"></span></span></a></p>
