---
title: 常见问题与参考
description: 查阅茶室、收成记录、常见问题、季节环境参数与管理员命令。
aside: true
pageClass: teastory-page
---

<script setup>
import '../../.vitepress/theme/teastory-guide.css'
</script>

# 常见问题与参考

<p class="tea-lead">把茶室布置、收成记录、排障说明和进阶配置放在同一页，需要时快速查阅。</p>

[← 返回茶风纪事集合](/tutorial/Teastory)

## 茶室与收成记录 {#tea-room}

加工设备和装饰家具可以一起布置茶室。茶盘、炒茶锅、发酵桶、茶炉、茶桌是可操作的机器；普通装饰家具的外观不代表它能加工物品。

<a id="records"></a>

`/me harvest menu` 打开自己的收成面板，按总览、产物、工具和作物查看记录。`/me harvest stats` 查看自己的统计。

获取种子、第一次种植和收获、累计收获、品质升级、制茶、冲泡、饮茶与茶渣回收都有对应成就里程碑。新发生的采收参与统计和成就，旧数据不保证补记。

## 遇到问题时 {#appendix}

<details class="tea-faq">
<summary>茶树不长，是不是季节不对？</summary>

先检查底部方块和光照，再考虑季节、温湿度与周围结构。季节偏好只是影响因素之一。仍不生长时，请管理员在作物旁用 `/ne debug crop detail` 查看具体原因，普通玩家没有该命令权限。

</details>
<details class="tea-faq">
<summary>茶盘为什么产出湿茶或炒出焦叶？</summary>

雨天和雷暴会把鲜叶变成湿茶。等晴天把湿茶放回茶盘，挽救成萎凋叶后再炒；湿茶直接进入炒茶锅会产生焦叶。

</details>
<details class="tea-faq">
<summary>机器材料齐了，为什么不开始？</summary>

炒茶锅和茶炉检查燃料，发酵桶只能用发酵粉。茶桌需要开水壶，并按各自槽位放入茶叶、容器与其他材料。产出槽里留有物品时也应先取走。潜行右击机器可以取回放错的内部物品。

</details>
<details class="tea-faq">
<summary>果实过了 20 分钟还没恢复？</summary>

只有符合条件的持久结果叶会恢复。离线时间计入等待时间，但区块需要再次加载；树叶被移除后不会自动重建，普通非持久树叶也不会自动结果。

</details>

<details class="tea-reference">
<summary>进阶参考：季节、环境和作物参数</summary>

| 季节 | 基准温度 | 基准湿度 | 生长倍率 | 配置产量倍率 |
|---|---:|---:|---:|---:|
| 春 | 15.0 | 0.70 | 1.2 | 1.0 |
| 夏 | 25.0 | 0.50 | 1.1 | 1.1 |
| 秋 | 10.0 | 0.60 | 1.0 | 1.2 |
| 冬 | 0.0 | 0.40 | 0.5 | 0.8 |

这些是 NatureEngine 的配置基准，实际环境温度还叠加世界、天气和季节偏移。产量倍率不会自动乘到所有 CraftEngine 战利品。四季各 10 个游戏日，切换标题淡入 / 停留 / 淡出为 10 / 50 / 20 tick。

| 作物 | 成熟年龄 | 目标温度 ± 容差 | 目标湿度 ± 容差 | 偏好季节 |
|---|---:|---:|---:|---|
| 茶树 | 6 | 1.20 ± 0.80 | 0.80 ± 0.60 | 春夏秋 |
| 茉莉 | 3 | 1.10 ± 0.75 | 0.85 ± 0.55 | 春夏 |
| 籼稻育苗 / 水稻 | 3 / 7 | 1.20 ± 0.80 | 0.95 ± 0.55 | 夏 |
| 桂花 | 3 | 1.10 ± 0.75 | 0.75 ± 0.55 | 夏秋 |
| 木薯 | 4 | 1.30 ± 0.75 | 0.75 ± 0.55 | 夏 |
| 薄荷 | 3 | 0.75 ± 0.65 | 0.75 ± 0.50 | 春夏 |
| 菊花 | 3 | 0.80 ± 0.70 | 0.65 ± 0.50 | 秋 |
| 生姜 | 4 | 1.15 ± 0.75 | 0.85 ± 0.50 | 夏 |
| 香茅 | 3 | 1.20 ± 0.75 | 0.80 ± 0.55 | 夏 |
| 洛神花 | 3 | 1.20 ± 0.75 | 0.70 ± 0.55 | 夏秋 |
| 枸杞 | 3 | 0.90 ± 0.80 | 0.50 ± 0.55 | 夏秋 |
| 绿豆 | 3 | 1.10 ± 0.75 | 0.70 ± 0.55 | 夏 |
| 莲花 | 4 | 1.10 ± 0.75 | 0.95 ± 0.45 | 夏 |

树苗登记为枣、柚子、橘子、柿子、桃五种，阶段数 1，偏好春夏。柠檬资源存在，但不在这五种季节树苗登记中。

环境扫描半径 4，屋顶向上扫描 6 格。封闭度 0.60 判为温室，开放度小于 0.25 判为室内，达到 0.80 判为室外，其余为半室外。附近水体加成关闭。

| 环境 | 稳定性 | 推进修正 |
|---|---:|---:|
| 温室 | 1.00 | 1.02 |
| 室内 | 0.80 | 0.98 |
| 半室外 | 0.60 | 1.00 |
| 室外 | 0.35 | 1.00 |

全局推进阈值 0.22、枯萎阈值 0.02、随机刻速度 3、环境缓解强度 0.75。它们不能单独换算成保证成熟时间。

天气每 90 秒重新抽选。晴 / 雨 / 雷雨 / 雪的配置时长为 300 / 240 / 180 / 240 秒，不能视为保证的保持时间。节气改变下一场天气的权重；雪在 Bukkit 层映射为普通降水。

</details>
<details class="tea-reference">
<summary>管理员参考与文档来源</summary>

NatureEngine 命令要求 OP：`/ne season info` 查看季节，`/ne season next` 推进，`/ne season set <spring|summer|autumn|winter>` 设置覆盖，`/ne season clear` 恢复自然推进，`/ne season apply` 重应用视觉。

`/ne debug`、`/ne debug crop detail`、`/ne debug visual` 查看状态；`/ne sim crop` 模拟生长；`/ne crop randomTickSpeed [value]` 设置随机刻；`/ne reload [config|seasons|weather|growth|environment|crops|all]` 重载；`/ne metrics` 查看指标。

`/me harvest stats [all|player|UUID] [all|today|week]` 按范围查看统计，普通玩家仅能查看自己。`/me harvest export ...` 由管理员导出 CSV。数据库为 `plugins/MateriaEngine/harvest_stats.db`，导出目录为 `plugins/MateriaEngine/exports/`；今天按 Asia/Shanghai、本周从周一计算，旧累计数据不回填每日数据。

配方、名称与物品图取自 CraftEngine 资源配置，茶桌投料取自 MateriaEngine。环境规则参照 NatureEngine，成就参照 BeaconEngine。这里记录本地配置表达的规则，线上部署版本、区块加载和其他插件可能影响运行结果。

</details>

<p class="tea-credits">本玩法基于 <a href="https://github.com/RoShioLeo/Tea-the-Story?tab=readme-ov-file#license-%E8%AE%B8%E5%8F%AF%E8%AF%81">Tea-the-Story</a> 二次创作，并遵循原项目许可。<a href="/tutorial/SeasonWiki">旧季节玩法入口</a>仍保留。</p>
