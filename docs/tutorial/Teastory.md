# 茶风纪事：从一片鲜叶到一席茶点 <Badge type="tip" text="试运行" />

> TeaStory 是一条以种植、制茶、冲泡和中式茶点为核心的生活玩法。本文按当前 CraftEngine、NatureEngine、MateriaEngine 与 BeaconEngine 配置整理；配置更新后，数值和配方可能随之变化。

> 致谢与许可：本玩法在尊重原创的基础上进行二次创作，遵循原项目许可。原项目与许可证见 [Tea-the-Story](https://github.com/RoShioLeo/Tea-the-Story?tab=readme-ov-file#license-%E8%AE%B8%E5%8F%AF%E8%AF%81)。

TeaStory 的主线可以概括为：**种植 → 采收 → 萎凋 → 定型或发酵 → 冲泡 → 倒杯 → 茶渣回收**。茶盘、炒茶锅、发酵桶、茶炉、茶桌负责加工；季节、天气和环境由 NatureEngine 参与生长计算；采收、果实恢复和收成统计由 MateriaEngine 负责。

<div class="teastory-hero">
  <div class="teastory-hero__copy">
    <p class="teastory-hero__lead">把一片鲜叶，走成一席茶。</p>
    <p>先在茶园里照看作物，再把每一次采收送进机器、茶桌和茶点配方。下面的图标是阅读线索，详细数值仍以各章节和服务器配置为准。</p>
    <div class="teastory-hero__chips" aria-label="玩法核心物品">
      <span class="item-chip"><img src="/images/teastory/tea_seeds.png" alt="茶树种子" />茶树种子</span>
      <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud.png" alt="鲜叶" />鲜叶</span>
      <span class="item-chip"><img src="/images/teastory/wooden_mortar_and_pestle.png" alt="木制研钵研杵" />研磨</span>
      <span class="item-chip"><img src="/images/teastory/green_tea_glass.png" alt="绿茶杯" />一杯绿茶</span>
    </div>
  </div>
  <div class="teastory-hero__art" aria-label="茶风纪事物品预览">
    <figure class="teastory-hero__tile"><img src="/images/teastory/fresh_tea_leaf_bud.png" alt="单芽鲜叶" /><figcaption>采茶</figcaption></figure>
    <figure class="teastory-hero__tile"><img src="/images/teastory/tea_leaf.png" alt="青叶" /><figcaption>定型</figcaption></figure>
    <figure class="teastory-hero__tile"><img src="/images/teastory/green_tea_glass.png" alt="绿茶玻璃杯" /><figcaption>冲泡</figcaption></figure>
    <figure class="teastory-hero__tile"><img src="/images/teastory/paddy_field.png" alt="稻田" /><figcaption>田园</figcaption></figure>
  </div>
</div>

## 快速导航

- [从零开始：第一杯绿茶](#first-cup)
- [茶园：种植、季节和环境](#tea-garden)
- [采收、续种和工具](#harvest-tools)
- [制茶路线](#tea-making)
- [冲泡、茶具和倒杯](#brewing)
- [田园、稻田与果园](#garden-orchard)
- [茶点、料理与复配饮品](#food)
- [茶室、机器和显示](#tea-room)
- [收成记录与成就](#records)
- [配置边界与排错](#appendix)

<div class="teastory-flow" aria-label="TeaStory 工艺流程">
  <div class="teastory-flow__item"><img src="/images/teastory/fresh_tea_leaf_bud.png" alt="鲜叶" /><div><strong>采茶</strong><span>分级鲜叶</span></div></div>
  <span class="teastory-flow__arrow" aria-hidden="true">&rarr;</span>
  <div class="teastory-flow__item"><img src="/images/teastory/withered_tea_leaf_bud.png" alt="萎凋叶" /><div><strong>萎凋</strong><span>茶盘看天气</span></div></div>
  <span class="teastory-flow__arrow" aria-hidden="true">&rarr;</span>
  <div class="teastory-flow__item"><img src="/images/teastory/tea_leaf.png" alt="青叶" /><div><strong>定型</strong><span>锅与茶炉</span></div></div>
  <span class="teastory-flow__arrow" aria-hidden="true">&rarr;</span>
  <div class="teastory-flow__item"><img src="/images/teastory/green_tea_leaf.png" alt="绿茶叶" /><div><strong>成茶</strong><span>七条路线</span></div></div>
  <span class="teastory-flow__arrow" aria-hidden="true">&rarr;</span>
  <div class="teastory-flow__item"><img src="/images/teastory/green_tea_glass.png" alt="绿茶杯" /><div><strong>茶桌</strong><span>冲泡与倒杯</span></div></div>
  <span class="teastory-flow__arrow" aria-hidden="true">&rarr;</span>
  <div class="teastory-flow__item"><img src="/images/teastory/baking_powder.png" alt="发酵粉" /><div><strong>回收</strong><span>茶渣再利用</span></div></div>
</div>

<a id="first-cup"></a>
## 从零开始：第一杯绿茶

这条路线只使用已经配置的机器和配方，适合第一次接触玩法时照着做。

1. **准备工具和机器。** 工作台可合成茶盘、炒茶锅、发酵桶、茶炉、茶桌、镰刀、木制研钵研杵和茶筅。茶盘与发酵桶使用木板，茶炉使用砖块和圆石，炒茶锅使用铁锭、炼药锅和原木，茶桌使用磨制石台阶与木板；具体形状可在 CraftEngine 配方界面查看。茶桌冲泡还需要杯子、空壶和水壶。
2. **获得茶树种子并种植。** 世界战利品中可找到 <span class="item-chip"><img src="/images/teastory/tea_seeds.png" alt="茶树种子" />茶树种子</span>；茶树成熟年龄为 6，种在符合底部方块和光照要求的位置。用镰刀采收时，背包或种子袋中有对应种子会自动重植并消耗 1 个种子。
3. **晴天萎凋。** 把 <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud.png" alt="鲜叶" />分级鲜叶</span> 放入茶盘。晴天会保留等级并得到对应 <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_bud.png" alt="萎凋叶" />萎凋叶</span>；雨天或雷暴会得到 <span class="item-chip"><img src="/images/teastory/wet_tea_leaf.png" alt="湿茶" />无等级湿茶</span>。湿茶在晴天再次放入茶盘可挽救成无等级萎凋叶。
4. **杀青和炒青。** 炒茶锅加入原版燃料，把萎凋叶加工为 <span class="item-chip"><img src="/images/teastory/tea_leaf.png" alt="青叶" />青叶</span>；再把青叶放回炒茶锅炒青，得到 <span class="item-chip"><img src="/images/teastory/green_tea_leaf.png" alt="绿茶叶" />绿茶叶</span>。
5. **准备开水。** 水壶配方支持石、瓷、铁、紫砂四种材质。9 个空水壶加 1 个水桶会批量得到 9 个有水水壶，再用熔炉或高炉烧成 <span class="item-chip"><img src="/images/teastory/water_pot_porcelain.png" alt="开水壶" />开水壶</span>。
6. **冲泡。** 茶桌放入绿茶叶 ×2、任意开水壶和一个空杯，得到对应材质的 <span class="item-chip"><img src="/images/teastory/green_tea_glass.png" alt="绿茶杯" />绿茶杯</span>。饮用后按杯子配置返还空杯；绿茶饮品配置为急迫效果 260 tick（约 13 秒）。
7. **遇到失败先检查天气和槽位。** 茶盘是否在雨中、炒茶锅是否放入燃料、茶桌是否把水壶放在水槽、茶叶是否放在茶叶槽，是最常见的三类问题。

### 五台机器和槽位

| 机器 | 主要职责 | 槽位与燃料 | 默认加工时间 |
|---|---|---|---:|
| **茶盘** `cgap:teapan` | 晴天萎凋、雨天淋湿、晴天挽救、闷黄 | 输入 12，输出 14；无燃料 | 40–160 tick |
| **炒茶锅** `cgap:tea_drying_pan` | 杀青、炒青、湿茶误炒 | 输入 2，燃料 20，输出 15；原版燃料 | 80–120 tick |
| **发酵桶** `cgap:barrel` | 碎茶的半发酵、全发酵、重发酵 | 输入 12，发酵粉 13，输出 14；只接受发酵粉 | 160–200 tick |
| **茶炉** `cgap:tea_stove` | 乌龙、红茶、普洱烘焙，白茶烘青，抹茶蒸青 | 输入 2，燃料 20，输出 15；原版燃料 | 160–200 tick |
| **茶桌** `cgap:tea_table` | 杯装冲泡、壶装冲泡、倒杯 | 工具 1、糖 2、杯/壶 6、水 10、茶叶 11、输出 15；无燃料 | 40–160 tick |

茶桌的“杯/壶”是同一个槽位：放空杯会做一杯，放空茶壶会做一壶。工具和糖只在抹茶、奶茶、柠檬茶等配方中使用，纯茶可以留空。

<a id="tea-garden"></a>
## 茶园：种植、季节和环境

### 种植时先记住四条规则

- 大多数 TeaStory 作物要求最低光照 9；茶树的底部可为耕地、草方块、泥土、灰化土或砂土等配置方块。
- 季节偏好是生长计算中的目标范围，不是硬性禁种名单。偏离目标时推进率下降，冬季茶树登记为不易枯萎，但冬季环境仍可能让其他作物进入枯萎判定。
- 环境计算会结合作物目标温度、湿度、当前世界温度、天气偏移和结构扫描结果。`base-temperature` 是 NatureEngine 的配置基准，实际环境温度还会叠加原版世界温度与天气/季节偏移。
- 莲花需要同位置附近水体，并且底部允许泥土、草方块、泥巴或黏土；稻谷则需要先育苗，再移栽到稻田。

### 四季参数

四季各持续 **10 个游戏日**，完整周期为 40 个游戏日。季节切换会按配置发送标题提示（淡入 10、停留 50、淡出 20 tick）。下表的温度是 NatureEngine 的基准值，湿度范围为 0–1；“产量倍率”是季节配置提示，不会自动乘到所有 CraftEngine 战利品。

| 季节 | 基准温度 | 基准湿度 | 生长倍率 | 产量倍率 | 易枯萎 |
|---|---:|---:|---:|---:|---|
| 春 | 15.0 | 0.70 | ×1.2 | ×1.0 | 否 |
| 夏 | 25.0 | 0.50 | ×1.1 | ×1.1 | 否 |
| 秋 | 10.0 | 0.60 | ×1.0 | ×1.2 | 否 |
| 冬 | 0.0 | 0.40 | ×0.5 | ×0.8 | 是 |

### 天气、节气和生长偏移

天气管理器每 **90 秒** 为每个世界重新抽选天气，并把配置时长设置为晴 300 秒、雨 240 秒、雷雨 180 秒、雪 240 秒。这里的时长是下一次抽选使用的目标时长，实际画面还会受到 Bukkit 天气状态和世界加载情况影响。

| 天气 | 季节抽选权重（春 / 夏 / 秋 / 冬） | 温度偏移 | 湿度偏移 | 土壤偏移 | 生长倍率 |
|---|---|---:|---:|---:|---:|
| 晴 | 8 / 16 / 9 / 5 | +0.05 | -0.02 | -0.02 | ×1.00 |
| 雨 | 7 / 3 / 6 / 1 | -0.03 | +0.05 | +0.20 | ×1.10 |
| 雷雨 | 1 / 1 / 2 / 2 | -0.05 | +0.06 | +0.25 | ×0.93 |
| 雪 | 0 / 0 / 0 / 10 | -0.12 | +0.02 | +0.10 | ×0.85 |

二十四节气只改动**下一场天气的抽选权重**，不会直接改写天气档案的温湿度或生长倍率。当前方向是清明至谷雨提高降雨，夏季节气略提高雷雨，秋季提高晴天，立冬至大寒提高降雪并降低降雨。Bukkit 层的雪目前映射为普通降雨状态，因此不要把它当作已经验证的独立积雪机制。

### 环境扫描

环境模块已启用：扫描半径 4 格，向上检查屋顶最多 6 格；封闭度达到 0.60 判为温室，开放度小于 0.25 判为室内，开放度达到 0.80 判为室外，其余为半室外。附近水体加成当前关闭。

| 环境 | 稳定性 | 推进修正 | 适用场景 |
|---|---:|---:|---|
| 温室 | 1.00 | ×1.02 | 冬季保护、稳定育苗 |
| 室内 | 0.80 | ×0.98 | 有屋顶的普通种植房 |
| 半室外 | 0.60 | ×1.00 | 有遮挡但仍受天气影响 |
| 室外 | 0.35 | ×1.00 | 露天茶园和果树 |

全局推进阈值为 **0.22**，枯萎阈值为 **0.02**，插件随机刻速度为 **3**，环境缓解强度为 **0.75**。这些值参与最终计算，不能单独换算成“每分钟长几格”。

### 已登记的 14 种作物

阶段数表示年龄上限，年龄从 0 开始；温度和湿度是 NatureEngine 的目标值及容差。

| 作物 | 阶段 | 温度目标 ±容差 | 湿度目标 ±容差 | 偏好季节 |
|---|---:|---:|---:|---|
| 茶树 | 6 | 1.20 ±0.80 | 0.80 ±0.60 | 春、夏、秋 |
| 茉莉花 | 3 | 1.10 ±0.75 | 0.85 ±0.55 | 春、夏 |
| 籼稻育苗 | 3 | 1.20 ±0.80 | 0.95 ±0.55 | 夏 |
| 水稻 | 7 | 1.20 ±0.80 | 0.95 ±0.55 | 夏 |
| 桂花 | 3 | 1.10 ±0.75 | 0.75 ±0.55 | 夏、秋 |
| 木薯 | 4 | 1.30 ±0.75 | 0.75 ±0.55 | 夏 |
| 薄荷 | 3 | 0.75 ±0.65 | 0.75 ±0.50 | 春、夏 |
| 菊花 | 3 | 0.80 ±0.70 | 0.65 ±0.50 | 秋 |
| 生姜 | 4 | 1.15 ±0.75 | 0.85 ±0.50 | 夏 |
| 香茅 | 3 | 1.20 ±0.75 | 0.80 ±0.55 | 夏 |
| 洛神花 | 3 | 1.20 ±0.75 | 0.70 ±0.55 | 夏、秋 |
| 枸杞 | 3 | 0.90 ±0.80 | 0.50 ±0.55 | 夏、秋 |
| 绿豆 | 3 | 1.10 ±0.75 | 0.70 ±0.55 | 夏 |
| 莲花 | 4 | 1.10 ±0.75 | 0.95 ±0.45 | 夏 |

### NatureEngine 指令（管理员）

NatureEngine 根命令要求 OP；普通玩家不能用这些命令修改季节或读取调试数据。

| 指令 | 用途 |
|---|---|
| `/ne season info` | 查看当前世界季节、进度和覆盖状态 |
| `/ne season next` | 切换到下一季节 |
| `/ne season set <spring\|summer\|autumn\|winter>` | 设置手动季节覆盖 |
| `/ne season clear` | 清除手动覆盖，恢复自然推进 |
| `/ne season apply` | 重新应用当前季节视觉 |
| `/ne debug` | 查看季节、天气、环境摘要 |
| `/ne debug crop [detail]` | 查看脚下作物摘要或完整调试信息 |
| `/ne debug visual` | 查看季节视觉应用状态 |
| `/ne sim crop` | 模拟作物在不同条件下的计算结果，不修改方块 |
| `/ne crop randomTickSpeed [value]` | 查看或调整插件随机刻速度 |
| `/ne reload [config\|seasons\|weather\|growth\|environment\|crops\|all]` | 重载指定配置 |
| `/ne metrics` | 查看运行指标 |

<a id="harvest-tools"></a>
## 采收、续种和工具

所有收获工具都通过右击触发，并有 4 tick 冷却；工具耐久按实际采收的植株扣除。

<div class="teastory-figure-row" aria-label="采收工具预览">
  <figure class="teastory-figure"><img src="/images/teastory/sickle.png" alt="镰刀" /><figcaption>镰刀</figcaption></figure>
  <figure class="teastory-figure"><img src="/images/teastory/tea_whisk.png" alt="茶筅" /><figcaption>茶筅</figcaption></figure>
  <figure class="teastory-figure"><img src="/images/teastory/wooden_mortar_and_pestle.png" alt="木制研钵研杵" /><figcaption>研钵</figcaption></figure>
  <figure class="teastory-figure"><img src="/images/teastory/tea_seeds.png" alt="茶树种子" /><figcaption>种子袋</figcaption></figure>
</div>

| 工具 | 耐久 | 目标与行为 |
|---|---:|---|
| 镰刀 `cgap:sickle` | 500 | 半径 1 的同一高度区域，最多处理 3×3；支持 14 种 TeaStory 作物和小麦、胡萝卜、马铃薯、甜菜根、下界疣 |
| 茶剪 `cgap:tea_shears` | 320 | 茶树品质模式；匹配一芽二叶、一芽三叶或老叶时有 35% 概率升级为单芽或一芽一叶，升级数量按配置目标发放 |
| 草药剪 `cgap:herb_shears` | 280 | 茉莉、桂花、薄荷、菊花、香茅、洛神花等目标有 20% 概率额外获得 1 个对应鲜料 |
| 根茎铲 `cgap:root_spade` | 400 | 生姜、木薯有 25% 概率额外获得 1 个根茎产物 |
| 摘果器 `cgap:fruit_picker` | 360 | 5 格射线距离，只采第一个可见的结果树叶，不穿透方块或树叶 |
| 收获篮 `cgap:harvest_basket` | — | 放在副手时将收获物优先送入背包，溢出物仍掉落在地上 |
| 种子袋 `cgap:seed_pouch` | — | 右击打开；默认 9 格，可配置扩展到 18 或 27 格 |

茶剪、草药剪和根茎铲的概率是额外或升级机会，不是每株固定产量。基础产物仍以 CraftEngine 方块战利品为准。

### 镰刀和自动重植

- 镰刀只处理当前高度的 3×3 邻域，并跳过未加载或不可用的方块；不等于整片农田一次性收完。
- 自定义作物成熟后，系统先查玩家背包，再查种子袋。找到对应种子就将作物重置到年龄 0 并消耗 1 个；找不到时会移除自定义作物，原版作物则变为空气。
- 动作栏会提示收获、重植、缺少种子和溢出情况；不认识的方块或未成熟作物不会被强行破坏。

### 种子袋

种子袋配方为线、皮革和蓝色染料组成的 shaped 配方。它只接受已登记的自定义作物种子，保留完整物品数据：右键存入或取出 1 个，左键存入或取出整组。配置缩小容量时不会截断已有内容；容量上限为 27 格。种子袋本身不能代替普通背包中的种子检查，收获时两处都会查找。

### 果实恢复

果树叶通过 `fruiting=false/true` 区分未结果和结果状态。摘果器只处理结果叶，默认恢复时间为 **1200 秒（20 分钟）**；恢复记录写入区块持久化数据，离线时间也会计入，但不会为了恢复而强制加载未加载区块。若恢复期间树叶被移除，待处理记录会清理，不会凭空重建方块；非持久树叶不会自动结果。

<a id="tea-making"></a>
## 制茶路线

### 总路线

| 目标茶 | 需要的路线 |
|---|---|
| 绿茶 | 同级萎凋叶 → 炒茶锅杀青得青叶 → 炒茶锅炒青 |
| 黄茶 | 绿茶叶 → 茶盘闷黄 |
| 白茶 | 萎凋叶 → 炒茶锅杀青得青叶 → 茶炉烘青 |
| 乌龙茶 | 青叶 → 研钵研磨得碎茶 → 发酵桶半发酵 → 茶炉烘焙 |
| 红茶 | 碎茶 → 半发酵 → 全发酵 → 茶炉烘焙 |
| 普洱茶 | 碎茶 → 半发酵 → 全发酵 → 重发酵 → 茶炉烘焙 |
| 抹茶 | 绿茶叶 → 茶炉蒸青得抹茶叶 |
| 茉莉花茶 | 红茶叶 ×6 + 干茉莉 ×2 → 工作台配方 |

### 茶盘：天气决定萎凋结果

| 输入 | 条件 | 输出 | 时间 |
|---|---|---|---:|
| 分级鲜叶 | 晴天 | 对应等级萎凋叶 | 100 tick |
| 任意分级鲜叶 | 雨天 | 无等级湿茶 | 60 tick |
| 任意分级鲜叶 | 雷暴 | 无等级湿茶 | 40 tick |
| 湿茶 | 晴天 | 无等级萎凋叶 | 140 tick |
| 绿茶叶 | 任意天气 | 黄茶叶 | 160 tick |

分级鲜叶包括单芽、一芽一叶、一芽二叶、一芽三叶和老叶。雨天或雷暴会丢失等级；湿茶直接进炒茶锅会得到焦叶。

### 炒茶锅：杀青、炒青和误炒

炒茶锅使用原版燃料。杀青产量按萎凋等级配置：单芽和一芽一叶各产青叶 2 个，一芽二叶、一芽三叶、老叶和无等级萎凋叶各产 1 个。之后青叶再炒 120 tick 得绿茶叶；湿茶误炒 80 tick 得焦叶。

### 研钵与发酵桶

- 木制研钵研杵 + 青叶 → 碎茶 ×3；研钵每次配方消耗 1 点耐久。
- 发酵桶只接受 `cgap:baking_powder` 作为燃料，配置燃料值为 **800**；普通煤、木炭等不会启动。一次加工是一个离散步骤：碎茶 → 半发酵（160 tick）→ 全发酵（180 tick）→ 重发酵（200 tick）。取出中间产物后，再次投入下一步配方。
- 发酵粉可由 2 个小麦合成 1 个，也可由任意两份茶渣或焦叶回收 1 个。燃料值与机器如何扣除之间的实际吞吐量取决于机器燃料核算，不把“1 粉固定支持几批”写死。

### 茶炉定型

| 输入 | 输出 | 时间 |
|---|---|---:|
| 半发酵茶 | 乌龙茶叶 | 200 tick |
| 全发酵茶 | 红茶叶 | 200 tick |
| 重发酵茶 | 普洱茶叶 | 200 tick |
| 青叶 | 白茶叶 | 160 tick |
| 绿茶叶 | 抹茶叶 | 160 tick |

茶炉使用原版燃料。白茶路线不经过发酵桶，黄茶和抹茶也分别使用茶盘与茶炉的独立配方。

<a id="brewing"></a>
## 冲泡、茶具和倒杯

### 茶包、空壶和开水壶

- 纸 ×5 + 线 ×1 → 空茶包 ×3；空茶包 + 对应成品茶叶 ×6 → 对应茶包。当前支持绿、茉莉、红、乌龙、普洱、白、黄七类茶包。
- 黏土球、紫砂黏土可分别制作壶坯，熔炉或高炉烧成空瓷壶、空紫砂壶。水壶支持石、瓷、铁、紫砂四种材质。
- 9 个空水壶 + 1 个水桶 → 9 个有水水壶；有水水壶经熔炉 160 tick 或高炉 80 tick 得开水壶。任何材质的开水壶都能用于茶桌配方，消耗后按配方返还对应空水壶。

<div class="teastory-figure-row" aria-label="茶具预览">
  <figure class="teastory-figure"><img src="/images/teastory/cup_glass.png" alt="玻璃杯" /><figcaption>空杯</figcaption></figure>
  <figure class="teastory-figure"><img src="/images/teastory/empty_porcelain_kettle.png" alt="空瓷壶" /><figcaption>空瓷壶</figcaption></figure>
  <figure class="teastory-figure"><img src="/images/teastory/water_pot_porcelain.png" alt="瓷水壶" /><figcaption>水壶</figcaption></figure>
  <figure class="teastory-figure"><img src="/images/teastory/tea_whisk.png" alt="茶筅" /><figcaption>茶筅</figcaption></figure>
</div>

### 杯装冲泡

茶桌的纯茶配方为：**对应茶叶 ×2 + 任意开水壶 + 一个空杯**。杯子支持玻璃、石、木、瓷、紫砂五种材质，成品分别保留杯子材质。饮用后返还同材质空杯；茶饮的基础营养和饱和度配置为 5 与 3.5。

<div class="teastory-figure-row" aria-label="成品茶叶预览">
  <figure class="teastory-figure"><img src="/images/teastory/green_tea_leaf.png" alt="绿茶叶" /><figcaption>绿茶</figcaption></figure>
  <figure class="teastory-figure"><img src="/images/teastory/black_tea_leaf.png" alt="红茶叶" /><figcaption>红茶</figcaption></figure>
  <figure class="teastory-figure"><img src="/images/teastory/oolong_tea_leaf.png" alt="乌龙茶叶" /><figcaption>乌龙</figcaption></figure>
  <figure class="teastory-figure"><img src="/images/teastory/puer_tea_leaf.png" alt="普洱茶叶" /><figcaption>普洱</figcaption></figure>
</div>

| 茶饮 | 茶桌原料 | 配置效果 |
|---|---|---|
| 红茶 | 红茶叶 ×2 | 力量，220 tick（约 11 秒） |
| 绿茶 | 绿茶叶 ×2 | 急迫，260 tick（约 13 秒） |
| 茉莉花茶 | 茉莉花茶叶 ×2 | 幸运，240 tick（约 12 秒） |
| 柠檬茶 | 红茶叶 ×2 + 柠檬 + 糖 ×3 | 速度，240 tick（约 12 秒） |
| 抹茶 | 抹茶叶 ×2 + 茶筅 + 糖 ×3 | 跳跃提升 II，200 tick（约 10 秒） |
| 奶茶 | 红茶叶 ×2 + 牛奶桶 + 糖 ×3 | 抗性提升，220 tick（约 11 秒） |
| 乌龙茶 | 乌龙茶叶 ×2 | 水下呼吸，260 tick（约 13 秒） |
| 普洱茶 | 普洱茶叶 ×2 | 生命提升，240 tick（约 12 秒） |
| 白茶 | 白茶叶 ×2 | 生命恢复，140 tick（约 7 秒） |
| 黄茶 | 黄茶叶 ×2 | 吸收，200 tick（约 10 秒） |

上表的秒数按 20 tick/s 换算，效果持续时间以物品配置为准；它们不是永久状态。

### 壶装冲泡与倒杯

- 纯茶壶装使用对应茶包、开水壶和空茶壶：空瓷壶需要茶包 ×1，空紫砂壶需要茶包 ×2；成壶后茶包会按配置返还对应茶渣。
- 奶茶壶装使用红茶包 ×1/×2、牛奶桶、糖 ×12/×24、开水壶和空瓷壶/空紫砂壶；牛奶桶返还空桶。
- 柠檬茶壶装优先使用柠檬茶包 ×1/×2 和糖 ×12/×24；当前配方另有红茶包加柠檬的兼容路径，返还物以配置的茶渣替代物为准。
- 抹茶壶装使用抹茶叶 ×6/×12、茶筅、糖 ×12/×24、开水壶和空壶；茶筅每次配方消耗 1 点耐久，总耐久 120。
- 满壶 + 空杯可在茶桌倒出一杯，单次 40 tick 并消耗壶的 1 点耐久。瓷壶最多倒 4 杯，紫砂壶最多倒 8 杯，耗尽后返还对应空壶。

### 茶渣回收

红、绿、乌龙、普洱、白、黄、茉莉茶包冲泡会产生对应茶渣；任意两份茶渣或焦叶可在工作台回收为 1 个发酵粉，形成“制茶 → 冲泡 → 发酵燃料”的循环。

<a id="garden-orchard"></a>
## 田园、稻田与果园

<div class="teastory-figure-row" aria-label="田园与果园预览">
  <figure class="teastory-figure"><img src="/images/teastory/paddy_field.png" alt="稻田" /><figcaption>稻田</figcaption></figure>
  <figure class="teastory-figure"><img src="/images/teastory/xian_rice_seeds.png" alt="稻谷" /><figcaption>稻谷</figcaption></figure>
  <figure class="teastory-figure"><img src="/images/teastory/tea_seeds.png" alt="茶树种子" /><figcaption>茶园</figcaption></figure>
  <figure class="teastory-figure"><img src="/images/teastory/lemon.png" alt="柠檬" /><figcaption>果园</figcaption></figure>
</div>

### 稻田两阶段

1. 把 `cgap:xian_rice_seeds` 种在普通耕地，先长成籼稻育苗；成熟育苗会掉落稻秧和种子。
2. 把稻秧移栽到 `cgap:paddy_field`，继续生长到水稻年龄 7。成熟水稻当前主要掉落稻谷（1–3 个），不是直接掉大米。
3. 木制研钵研杵 + 稻谷 → 大米；大米可继续用于米饭、粥、米糕和料理配方。

稻田由 8 个泥土围绕 1 个水桶合成，水桶会返还；空桶不能把稻田捞回，水桶也不能重复灌满。它是独立方块，破坏后可作为物品回收。

### 田园作物与野生种子

| 作物 | 成熟产物 | 种植/野生来源 |
|---|---|---|
| 桂花 | 鲜桂花 | 耕地、草方块、泥土等；种子按方块掉落 |
| 木薯 | 木薯根 | 需要耕地；木薯根可加工木薯淀粉 |
| 薄荷 | 鲜薄荷 | 普通土壤底部 |
| 菊花 | 鲜菊花 | 普通土壤底部 |
| 生姜 | 生姜 | 需要耕地 |
| 绿豆 | 鲜绿豆 | 普通土壤底部；可加工绿豆种子 |
| 香茅 | 鲜香茅 | 普通土壤底部 |
| 洛神花 | 鲜洛神花 | 普通土壤底部 |
| 枸杞 | 鲜枸杞 | 普通土壤底部 |
| 莲花 | 莲花、莲蓬、莲藕 | 同位置附近水体；底部支持泥土、草方块、泥巴、黏土 |

香茅、洛神花和枸杞的野生种子可从草和蕨以 **0.5%** 概率掉落；莲花种子可从睡莲以 **5%** 概率掉落。桂花、薄荷、菊花等成熟时会掉鲜料并保留种植材料，实际数量以方块战利品表为准。

### 茶树采收

茶树成熟年龄为 6，成熟战利品按权重抽取鲜叶等级：芽 5、一芽一叶 15、一芽二叶 25、一芽三叶 30、老叶 25；同时会掉茶树种子，财富附魔会影响配置的种子额外掉落。茶剪只改变部分等级的升级机会，不会把每株产量固定成一个数字。

### 果园和结果树叶

CraftEngine 当前定义了桃、柠檬、枣、柚子、橘子、柿子六种果树的树干、树叶、结果状态和掉落；普通树叶有约 **0.8%** 的果实随机掉落配置（剪刀或精准采集时不走该掉落）。自然果树的叶提供器按普通 7、结果 3 的权重生成结果状态。

NatureEngine 的 `craftengine-trees` 当前直接登记枣、柚子、橘子、柿子、桃五种树苗，阶段数为 1，偏好春夏。柠檬树的 CraftEngine 定义存在，但尚未进入这五种树苗登记，因此本文不把柠檬列为已登记的独立季节偏好。摘果器只采 `fruiting=true` 的持久树叶，默认 20 分钟后恢复。

<a id="food"></a>
## 茶点、料理与复配饮品

CraftEngine 的 `teastory_foods` 类别当前登记 **94 个食品与饮品条目**。它们主要是工作台无序配方，水桶、牛奶桶、蜂蜜脆片等容器或原料是否返还，以对应物品的 `consume-replacement` 配置为准；碗装米饭和汤类通常会返还碗。

### 基础加工

| 原料链 | 配方 |
|---|---|
| 小麦 | 小麦 ×2 → 发酵粉 ×1 |
| 甘蔗 | 甘蔗 → 黑糖 |
| 鲜桂花 / 鲜薄荷 / 鲜菊花 / 生姜 | 各自熔炉 160 tick、高炉 80 tick → 对应干料 |
| 鲜绿豆 | 鲜绿豆 → 绿豆种子 ×2 |
| 木薯根 | 木薯根 ×2 + 木制研钵研杵 → 木薯淀粉 ×2 |
| 木薯淀粉 | 木薯淀粉 ×2 + 糖 → 木薯珍珠 |
| 鲜茉莉、柠檬、果实 | 分别烘干或加工为干茉莉、干柠檬、陈皮等茶点原料 |

### 代表性配方

| 成品 | 原料（无序） | 数量 |
|---|---|---:|
| 白米饭 | 大米 + 水桶 + 碗 | 1 |
| 红枣枸杞粥 | 大米 + 干红枣 + 干枸杞 + 水桶 + 碗 | 1 |
| 桂花米糕 | 米粉 + 干桂花 + 糖 | 1 |
| 抹茶曲奇 | 抹茶叶 + 小麦 ×2 + 糖 | 4 |
| 茶叶蛋 | 红茶叶 + 鸡蛋 | 1 |
| 黑糖姜糖 | 干姜 + 糖 + 黑糖 | 4 |
| 珍珠奶茶 | 红茶玻璃杯 + 牛奶桶 + 糖 + 木薯珍珠 | 1 |
| 抹茶拿铁 | 抹茶饮玻璃杯 + 牛奶桶 + 糖 | 1 |
| 陈皮普洱茶 | 普洱茶玻璃杯 + 陈皮 + 糖 | 1 |
| 龙井虾仁 | 绿茶叶 + 虾仁 ×2 + 碗 | 1 |
| 猪肉水饺 | 小麦 ×2 + 熟猪肉 + 生姜 + 水桶 + 碗 | 1 |
| 小笼包 | 小麦 ×2 + 熟猪肉 + 生姜 + 水桶 | 2 |
| 油条 | 小麦 ×2 + 发酵粉 + 水桶 | 2 |
| 八宝饭 | 大米、干红枣、莲子、干枸杞、鲜绿豆、柿饼、甜浆果、黑糖、碗 | 1 |

### 复配饮品覆盖

除茶桌的基础茶饮外，食品配方还覆盖蜜桃茉莉茶、桂香乌龙茶、黑糖奶茶、蜂蜜柠檬茶、菊花枸杞茶、薄荷绿茶、姜奶茶、橙香茉莉茶、洛神柠檬茶、桂花奶茶、陈皮姜茶、烘米茶、莲子奶、薄荷西瓜汁、南瓜奶、姜枣奶、黑糖米乳、蜜桃柚子奶、蜂蜜苹果茶、甘蔗柠檬汁、枣莲茶和菊花普洱等。它们是茶饮成品上的复配路线，具体输入以配方界面显示为准。

中式餐点还包括肉夹馍、桂花糯米藕、虾仁蛋炒饭、红烧肉、莲藕肉汤、柠檬蒸鱼、春卷、糖葫芦、沙琪玛、蛋挞、薄荷青团、红枣发糕、绿豆汤、牛肉面、虾仁肠粉、煎饺、糯米鸡、糖醋里脊、蘑菇蒸鸡、羊肉串、莲藕肉丸、煎饼、长寿桃包、桂花糕、黑糖糍粑、麻花、龙须糖、南瓜饼、蜜汁叉烧、虾仁蒸蛋、鸡肉煲仔饭、馄饨汤、炸藕盒、桂花水晶糕、奶香花卷、黄金虾球、土豆炖牛肉、珍珠丸子、鸡蛋炒面、虾仁土豆饼、虎皮蛋、脆皮炸鲜奶、糖烧饼和鸡蛋仔。

这些食品的营养、饱和度和食用替代物是逐物品配置的；不要根据名称推断它们一定带有茶饮效果。

<a id="tea-room"></a>
## 茶室、机器和显示

茶盘、炒茶锅、发酵桶、茶炉、茶桌都是可交互机器，右击打开专属 GUI，进度完成后从输出槽取回成品。炒茶锅和茶炉需要原版燃料，发酵桶只吃发酵粉，茶盘与茶桌不需要燃料。

茶桌的工具槽、糖槽、杯/壶槽、水槽、茶叶槽和输出槽是固定位置；机器加工完成后请及时取出中间产物，再投入下一段配方。潜行右击机器可取回放错的内部物品。

家具与装饰方块的外观属于资源包内容。除本文明确写出的机器、稻田、果树叶和采收交互外，不把装饰模型推断成有额外功能。

<a id="records"></a>
## 收成记录与成就

### MateriaEngine 收成统计

- `/me harvest menu` 打开自己的收成面板，包含总览、产物、工具和作物标签。
- `/me harvest stats [all|player|UUID] [all|today|week]` 查看统计；普通玩家默认只能查看自己，管理员或控制台可指定目标。
- `/me harvest export ...` 由管理员导出 UTF-8 BOM CSV 到 `plugins/MateriaEngine/exports/harvest-*.csv`。
- 统计数据库位于 `plugins/MateriaEngine/harvest_stats.db`，累计数据与每日数据分开记录；“今天”使用 Asia/Shanghai 时区，“本周”从周一计算到今天。旧的累计数据不会自动回填到每日数据。
- 面板会区分存入、掉落、品质升级、额外奖励和果实采收。副手收获篮只改变物品投递路径，溢出物仍计为掉落。

### BeaconEngine 成就里程碑

当前 TeaStory 成就按配置记录种子、种植、首次收获、100 次收获、品质升级、果实采收、收获产物、萎凋叶、青叶、碎茶、六类成品茶、茶包、开水壶、紫砂材料、杯具、饮茶次数和茶渣等里程碑。MateriaEngine 的实际收获会通过 BeaconEngine API 写入收获与收获产物上下文，因此新发生的收获可参与对应成就；不要把历史统计理解成已经自动补录。

<a id="appendix"></a>
## 配置边界与排错

遇到问题时按数据来源排查：

1. **作物不生长：** 先用 `/ne debug crop detail` 看光照、温湿度、季节、天气和环境分类；再检查作物是否已登记、底部方块是否符合 CraftEngine 配置。
2. **茶盘产物不对：** 查看当前世界是否晴天。雨或雷暴会把分级鲜叶变成湿茶，晴天挽救后只恢复为无等级萎凋叶。
3. **机器不启动：** 炒茶锅、茶炉检查原版燃料；发酵桶只能放发酵粉；茶桌按固定槽位放料，并确认使用开水壶而非普通有水水壶。
4. **收获不重植：** 检查背包和种子袋是否有该作物种子；无种子时自定义作物会被移除，这是当前工具逻辑。
5. **果实不恢复：** 结果叶必须是持久叶，区块需要再次加载；系统不会强制加载区块，树叶被拆除后也不会重建。
6. **统计或成就缺记录：** 先确认事件发生在启用统计/触发器之后；统计的旧累计值不会回填每日数据，成就也不承诺追溯历史。

本页记录的是配置和源码已经表达的规则。真实服务器仍可能受到区块加载、权限、资源包版本和其他插件事件顺序影响；需要证明运行时行为时，应在目标服务器上用对应命令、GUI 和实际物品再做验收。

## 相关页面

- [旧季节玩法兼容页](/tutorial/SeasonWiki)
- [EcoEnchants](/tutorial/EcoEnchants)
