---
title: 制茶路线
description: 从鲜叶萎凋开始，了解绿茶、白茶、黄茶、乌龙、红茶、普洱与抹茶的加工路线。
aside: true
pageClass: teastory-page
---

<script setup>
import TeaStoryRoutes from '../../.vitepress/theme/components/teastory/TeaStoryRoutes.vue'
import '../../.vitepress/theme/teastory-guide.css'
</script>

# 制茶路线 {#tea-making}

<p class="tea-lead">鲜叶先经过萎凋，再沿着不同工艺走向不同的茶。</p>

[← 返回茶风纪事集合](/tutorial/Teastory)

发酵每次只完成一级，取出中间产物后才能继续下一步；达到需要的发酵程度，就放入茶炉烘焙。

<TeaStoryRoutes />

<details class="tea-reference">
<summary>鲜叶等级、发酵燃料和加工时间</summary>

鲜叶分为单芽、一芽一叶、一芽二叶、一芽三叶、老叶。茶树成熟时按 5 / 15 / 25 / 30 / 25 的权重抽取等级；茶剪另有品质升级机会。雨天萎凋和湿茶挽救会丢失等级。

| 加工 | 输入 → 输出 | 时间 |
|---|---|---:|
| 茶盘 · 晴天 | 分级鲜叶 → 同级萎凋叶 | 100 tick |
| 茶盘 · 雨 / 雷暴 | 分级鲜叶 → 湿茶 | 60 / 40 tick |
| 茶盘 · 晴天挽救 | 湿茶 → 无等级萎凋叶 | 140 tick |
| 茶盘 · 闷黄 | 绿茶叶 → 黄茶叶 | 160 tick |
| 炒茶锅 · 炒青 | 青叶 → 绿茶叶 | 120 tick |
| 炒茶锅 · 误炒 | 湿茶 → 焦叶 | 80 tick |
| 发酵桶 | 碎茶 → 半发酵 → 全发酵 → 重发酵 | 160 / 180 / 200 tick |
| 茶炉 · 烘焙 | 半 / 全 / 重发酵 → 乌龙 / 红茶 / 普洱 | 200 tick |
| 茶炉 · 烘青 / 蒸青 | 青叶 → 白茶；绿茶叶 → 抹茶 | 160 tick |

木制研钵研杵与 1 份青叶在工作台合成 3 份碎茶，研钵消耗 1 点耐久。发酵桶只接受发酵粉：2 个小麦，或任意 2 份茶渣 / 焦叶，都能合成 1 个发酵粉。发酵粉燃料值为 800，实际支持的加工批次取决于机器燃料核算。

时间为配置 tick，20 tick 约为 1 秒；服务器运行速度会影响实际等待时间。

</details>

[下一章：冲泡与茶具 →](/tutorial/Teastory/brewing)
