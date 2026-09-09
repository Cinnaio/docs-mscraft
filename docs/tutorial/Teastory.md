---
title: 茶风纪事
description: 从种下一颗茶种子开始，学会采茶、制茶、冲泡，再把田园收获做成中式茶点。
aside: true
pageClass: teastory-page
---

<script setup>
import TeaStoryFlow from '../.vitepress/theme/components/teastory/TeaStoryFlow.vue'
import TeaStoryItem from '../.vitepress/theme/components/teastory/TeaStoryItem.vue'
import TeaStoryRecipes from '../.vitepress/theme/components/teastory/TeaStoryRecipes.vue'
import TeaStoryRoutes from '../.vitepress/theme/components/teastory/TeaStoryRoutes.vue'
import TeaStoryBrewing from '../.vitepress/theme/components/teastory/TeaStoryBrewing.vue'
import { foodIds } from '../.vitepress/theme/components/teastory/data'
import '../.vitepress/theme/teastory-guide.css'
</script>

# 茶风纪事 <Badge type="tip" text="试运行" />

<p class="tea-lead">种一小片茶园，做第一杯茶，再把当季的收获变成一桌茶点。</p>

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

最后，在茶桌放入 **绿茶叶 ×2 + 任意开水壶 + 空杯 ×1**，从输出槽取走绿茶。冲泡会返还空水壶，喝完后返还同材质空杯；绿茶提供短暂急迫效果。[查看茶桌投料位置](#brewing)。

</div>

### 设备与容器配方 {#equipment}

<TeaStoryRecipes :ids="['teapan', 'tea_drying_pan', 'tea_table', 'cup_glass', 'pot_stone', 'barrel', 'tea_stove', 'wooden_mortar_and_pestle']" />

## 把鲜叶做成不同的茶 {#tea-making}

鲜叶先经过萎凋，再走向不同工艺。发酵每次只完成一级，取出中间产物后才能继续下一步；达到需要的发酵程度，就放入茶炉烘焙。

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

## 冲一杯，也可以泡一壶 {#brewing}

杯装纯茶用 **2 份茶叶**。壶装使用茶包：瓷壶用 1 个，紫砂壶用 2 个，分别最多倒出 4 杯和 8 杯。奶茶、柠檬茶、抹茶还有额外材料。

<TeaStoryBrewing />

### 茶包、倒杯与回收

5 张纸和 1 根线合成 3 个空茶包；空茶包与 6 份对应成品茶叶合成茶包。茶包冲泡后产生对应茶渣，茶渣可回收为发酵粉。

满壶和空杯放进茶桌就能倒出一杯，单次消耗壶 1 点耐久、耗时 40 tick；壶倒空后返还空壶。抹茶使用的茶筅总耐久为 120，每次配方消耗 1 点。

<TeaStoryFlow :steps="[{ id: 'green_tea_leaf', count: 6, note: '与空茶包合成' }, { id: 'green_tea_bag', note: '用于壶装冲泡' }, { id: 'green_tea_residue', note: '两份茶渣可回收发酵粉' }]" />

<details class="tea-reference">
<summary>茶饮效果速查</summary>

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

</details>

## 照料茶园，安排四季收成 {#tea-garden}

每个季节持续 **10 个游戏日**。春、夏、秋都适合茶树；冬季生长会变慢。季节偏好不代表其他季节完全不能种，光照、温湿度和种植环境也会影响生长。

<div class="tea-season-images">
  <figure><img src="/images/vanilla-plains.png" alt="常规季节的草地与植被" width="1920" height="1080" loading="lazy" /><figcaption>常规环境</figcaption></figure>
  <figure><img src="/images/season-winter.png" alt="冬季环境中的地表与植被" width="1920" height="1080" loading="lazy" /><figcaption>冬季外观示例</figcaption></figure>
</div>

### 种在哪里

- **茶树和多数花草：** 选合适的泥土类方块，保持充足光照。茶树支持耕地、草方块、泥土、灰化土、砂土等。
- **木薯、生姜：** 需要耕地。莲花则需要附近水体，底部支持泥土、草方块、泥巴、黏土。
- **温室：** 封闭结构可以改善环境稳定性；只搭一块屋顶不一定构成温室，也不能保证任何条件下都正常生长。
- **找种子：** 香茅、洛神花、枸杞种子可从草和蕨以 0.5% 概率掉落；莲花种子从睡莲以 5% 概率掉落。

### 水稻要先育苗，再移栽 {#garden-orchard}

先把稻谷种在普通耕地，育苗成熟后获得稻秧。把稻秧移栽到稻田，成熟后收获稻谷，再与木制研钵研杵合成大米。

<TeaStoryFlow :steps="[{ id: 'xian_rice_seeds', note: '普通耕地育苗' }, { id: 'item_xian_rice_seedling', note: '成熟后移栽到稻田' }, { id: 'xian_rice_seeds', note: '成熟水稻收获稻谷' }, { id: 'xian_rice', note: '工作台 + 研钵' }]" />

稻田由 8 个泥土围绕 1 个水桶合成，水桶返还；空桶不能把稻田捞回，破坏后可以回收该方块。成熟水稻主要掉落 1–3 个稻谷。

### 六种果树

果园包括桃、柠檬、枣、柚子、橘子和柿子。摘果器用于可见的结果树叶；可恢复的持久树叶默认 **20 分钟** 后重新结果。普通树叶破坏时另有果实随机掉落，剪刀或精准采集不走这条掉落。

### 选对采收工具 {#harvest-tools}

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

## 把收获端上茶桌 {#food}

这里收录 {{ foodIds.length }} 种茶点、料理与饮品。配方中的原料有自己的加工路线，例如稻谷磨成大米、大米磨成米粉，鲜花烘成干料后再入茶或做点心。

<TeaStoryRecipes catalog />

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
