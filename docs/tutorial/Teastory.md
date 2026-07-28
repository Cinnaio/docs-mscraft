# 茶风纪事 游玩指南 <Badge type="tip" text="试运行" />

> 本项目仍处于试运行阶段，可能会存在部分参数影响体验，后期会持续改进。
> 如果你对本项目有任何想法，欢迎联系我进行修正，谢谢。

> 致谢与许可：本玩法在充分尊重原创的基础上进行二次创作，遵循原项目许可。  
> 原项目与许可证请见：[Tea-the-Story](https://github.com/RoShioLeo/Tea-the-Story?tab=readme-ov-file#license-%E8%AE%B8%E5%8F%AF%E8%AF%81)

> **核心摘要**：TeaStory 的主线是「采茶 → 萎凋 → 制茶 → 发酵/定型 → 冲泡/倒杯 → 茶渣回收」。全部初制与冲泡均在 **五台自定义机器** 上完成，右击机器打开专属 GUI 投料，机器按进度条自动加工。

## 五台机器一览

制茶不再依赖原版营火/熔炉，改由工作台合成出以下五台机器方块，右击打开 GUI 操作：

| 机器 | 职责 | 燃料 | 看天 |
|---|---|---|---|
| **茶盘** | 萎凋 / 淋湿 / 挽救 / 闷黄 | 无（露天） | ✅ 晴/雨/雷影响产物 |
| **炒茶锅** | 杀青 / 炒青 / 误炒 | 原版燃料（煤、木炭等） | ❌ |
| **发酵桶** | 碎茶三级发酵 | **发酵粉专属燃料** | ❌ |
| **茶炉** | 烘焙 / 烘青 / 蒸青 | 原版燃料 | ❌ |
| **茶桌** | 冲泡杯装/壶装 + 倒茶 | 无 | ❌ |

::: tip 通用操作
- **茶盘**：投料口 12，产出口 14。
- **炒茶锅 / 茶炉**：投料口 2，燃料口 20，产出口 15。
- **发酵桶**：投料口 12，发酵粉口 13，产出口 14。
- **茶桌**：六个投料槽（工具 / 糖 / 杯 / 水 / 茶叶）→ 产出口 15，详见「茶桌冲泡」。
- 潜行右击机器可打开内部储物格取回误放物品。
:::

## 参数速查

| 环节 | 机器 | 参数 |
|---|---|---|
| 萎凋（晴天） | **茶盘** | 分级鲜叶 → 同级萎凋叶，约 5 秒 |
| 淋湿（雨/雷） | **茶盘** | 鲜叶 → 湿茶（失去分级）；雨 3 秒 / 雷 2 秒 |
| 挽救（晴天） | **茶盘** | 湿茶 → 无分级萎凋叶，约 7 秒 |
| 闷黄 | **茶盘** | 绿茶叶 → 黄茶叶，约 8 秒 |
| 杀青 | **炒茶锅** | 萎凋叶 → 青叶（单芽/一芽一叶产 2，其余产 1），约 5 秒 |
| 炒青 | **炒茶锅** | 青叶 → 绿茶叶，约 6 秒 |
| 误炒 | **炒茶锅** | 湿茶 → 焦叶（陷阱），约 4 秒 |
| 研磨 | 工作台（研钵） | 1 青叶 → 3 碎茶；研钵每次掉 1 耐久 |
| 三级发酵 | **发酵桶** | 碎 → 半 → 全 → 深，各消耗 1 发酵粉 |
| 烘焙 | **茶炉** | 半→乌龙 / 全→红茶 / 深→普洱 |
| 烘青 | **茶炉** | 青叶 → 白茶 |
| 蒸青 | **茶炉** | 绿茶叶 → 抹茶叶 |
| 空茶包 | 工作台 | 1 线 + 5 纸 → 3 空茶包 |
| 成品茶包 | 工作台 | 1 空茶包 + 6 对应茶叶 → 1 茶包 |
| 壶加水（批量） | 工作台 | 9 空壶 + 1 水桶 → 9 有水壶 |
| 烧水 | 熔炉/高炉 | 熔炉 8 秒，高炉 4 秒 |
| 茶渣回收 | 工作台 | 任意 2 份茶渣/焦叶 → 1 发酵粉 |
| 茶筅 | 茶桌抹茶配方 | 每次冲泡掉 1 耐久（总 120） |
| 水稻成熟掉落 | — | 仅掉落 <span class="item-chip"><img src="/images/teastory/xian_rice_seeds.png" alt="稻谷" />稻谷</span>（当前为 1~3） |
| 大米加工 | 工作台（研钵） | <span class="item-chip"><img src="/images/teastory/wooden_mortar_and_pestle.png" alt="木制研钵研杵" />木制研钵研杵</span> + <span class="item-chip"><img src="/images/teastory/xian_rice_seeds.png" alt="稻谷" />稻谷</span> → <span class="item-chip"><img src="/images/teastory/xian_rice.png" alt="大米" />大米</span> |

## 快速流程

::: tip 温馨小提示
所有的作物种植均会受到季节、节气以及环境因素的影响。
:::

1. 在世界战利品箱获得 <span class="item-chip"><img src="/images/teastory/tea_seeds.png" alt="茶树种子" />茶树种子</span>（或破坏丛林树叶概率掉落），并在耕地上种植；野外也可能自然生成野生茶树。
2. 等待茶树成熟，采集 <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud.png" alt="鲜叶" />鲜叶</span>（品质与数量随机）。
3. **萎凋（茶盘）**：晴天把 <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud.png" alt="鲜叶" />鲜叶</span> 放入茶盘，得到同级 <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_bud.png" alt="萎凋叶" />萎凋叶</span>。
   - 雨天/雷暴会淋成 <span class="item-chip"><img src="/images/teastory/wet_tea_leaf.png" alt="湿茶叶" />湿茶叶</span>（失去分级）；晴天再放回茶盘可挽救成无分级萎凋叶。
4. **杀青（炒茶锅）**：萎凋叶经炒茶锅（需燃料）炒成 <span class="item-chip"><img src="/images/teastory/tea_leaf.png" alt="青叶" />青叶</span>；湿茶下锅只会炒焦。
5. **制茶**：按目标口味走 炒青（绿茶）/ 研磨发酵（乌龙/红茶/普洱）/ 烘青（白茶）/ 蒸青（抹茶）/ 闷黄（黄茶）。详见「制茶路线」。
6. **做茶包**（可选）：空茶包 + 对应茶叶 ×6 → 对应茶包（用于壶装冲泡）。
7. **准备壶与水**：合成茶壶胚烧成空壶；水壶装水后熔炉/高炉烧开成开水壶。
8. **冲泡（茶桌）**：茶叶/茶包 + 开水壶 + 杯或空壶 → 杯装或壶装茶饮。详见「茶桌冲泡」。
9. **倒杯（茶桌）**：满壶 + 空杯 → 杯装茶饮（瓷壶 4 杯 / 紫砂壶 8 杯，倒空返还空壶）。
10. **回收**：任意茶渣/焦叶 ×2 → 发酵粉 ×1（可回到发酵流程）。

## 制茶路线总图

```
茶树 ──收获──> 分级鲜叶（单芽/一芽一叶/二叶/三叶/老叶）
                   │
        【茶盘·萎凋(晴)】→ 同级萎凋叶      【茶盘·淋湿(雨/雷)】→ 湿茶
                   │                              │
        【炒茶锅·杀青】→ 青叶            【茶盘·挽救(晴)】→ 无分级萎凋叶 →（杀青）→ 青叶
                   │                    【炒茶锅·误炒(湿茶)】→ 焦叶
   ┌───────────────┼────────────────┬──────────────┐
【炒茶锅·炒青】  研钵(工作台)      【茶炉·烘青】   （青叶）
  → 绿茶叶        → 碎茶×3          → 白茶叶
   │                 │
【茶盘·闷黄】    【发酵桶】三级发酵（发酵粉驱动）
  绿茶→黄茶叶     碎 → 半 → 全 → 深
【茶炉·蒸青】         │
  绿茶→抹茶叶    【茶炉·烘焙】半→乌龙 / 全→红茶 / 深→普洱
                   │
              【茶桌】冲泡（杯/壶）+ 倒杯；壶装茶包 → 返茶渣；焦叶/茶渣×2 → 发酵粉（闭环）
```

## 采茶与初制

### 1) 萎凋（茶盘·看天）

把分级鲜叶放入 **茶盘** 投料口（无需燃料），机器按天气决定产物：

- **晴天 → 同级萎凋叶**：
  - <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud.png" alt="鲜叶（单芽）" />鲜叶（单芽）</span> → <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_bud.png" alt="萎凋叶（单芽）" />萎凋叶（单芽）</span>
  - <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud_leaf1.png" alt="鲜叶（一芽一叶）" />鲜叶（一芽一叶）</span> → <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_bud_leaf1.png" alt="萎凋叶（一芽一叶）" />萎凋叶（一芽一叶）</span>
  - <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud_leaf2.png" alt="鲜叶（一芽二叶）" />鲜叶（一芽二叶）</span> → <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_bud_leaf2.png" alt="萎凋叶（一芽二叶）" />萎凋叶（一芽二叶）</span>
  - <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud_leaf3.png" alt="鲜叶（一芽三叶）" />鲜叶（一芽三叶）</span> → <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_bud_leaf3.png" alt="萎凋叶（一芽三叶）" />萎凋叶（一芽三叶）</span>
  - <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_old_leaf.png" alt="鲜叶（老叶）" />鲜叶（老叶）</span> → <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_old_leaf.png" alt="萎凋叶（老叶）" />萎凋叶（老叶）</span>
- **雨天 / 雷暴 → 淋湿**：任意分级鲜叶 → <span class="item-chip"><img src="/images/teastory/wet_tea_leaf.png" alt="湿茶叶" />湿茶叶</span>（失去分级，雷暴更快）。
- **挽救（晴天）**：<span class="item-chip"><img src="/images/teastory/wet_tea_leaf.png" alt="湿茶叶" />湿茶叶</span> → <span class="item-chip"><img src="/images/teastory/withered_tea_leaf.png" alt="萎凋叶" />无分级萎凋叶</span>。

::: warning 看天下料
茶盘是露天机器，投料后请留意天气：想要分级萎凋叶就趁晴天；下雨会得到湿茶，需要再花一步挽救。
:::

### 2) 杀青与炒青（炒茶锅·需燃料）

**炒茶锅** 需要原版燃料（煤炭/木炭/木板等）。

- **杀青**：萎凋叶 → <span class="item-chip"><img src="/images/teastory/tea_leaf.png" alt="青叶" />青叶</span>

  | 萎凋叶类型 | 青叶产量 |
  |---|---:|
  | 单芽 | 2 |
  | 一芽一叶 | 2 |
  | 一芽二叶 | 1 |
  | 一芽三叶 | 1 |
  | 老叶 | 1 |
  | 无分级（挽救来） | 1 |

- **炒青**：<span class="item-chip"><img src="/images/teastory/tea_leaf.png" alt="青叶" />青叶</span> → <span class="item-chip"><img src="/images/teastory/green_tea_leaf.png" alt="绿茶茶叶" />绿茶茶叶</span>
- **误炒（陷阱）**：<span class="item-chip"><img src="/images/teastory/wet_tea_leaf.png" alt="湿茶叶" />湿茶叶</span> 下锅 → <span class="item-chip"><img src="/images/teastory/failed_fixation_tea_leaf.png" alt="焦叶" />焦叶</span>（可回收成发酵粉）。

### 3) 研磨与发酵

- 研磨（工作台，研钵消耗耐久）：<span class="item-chip"><img src="/images/teastory/wooden_mortar_and_pestle.png" alt="木制研钵研杵" />木制研钵研杵 ×1</span> + <span class="item-chip"><img src="/images/teastory/tea_leaf.png" alt="青叶" />青叶 ×1</span> → <span class="item-chip"><img src="/images/teastory/broken_tea_leaf.png" alt="碎茶" />碎茶 ×3</span>
- **发酵桶三级发酵**：投料口放茶叶，发酵粉口放 <span class="item-chip"><img src="/images/teastory/baking_powder.png" alt="发酵粉" />发酵粉</span> 作燃料（**独占燃料，1 份发酵粉可支撑多次加工**），依次升级：
  - <span class="item-chip"><img src="/images/teastory/broken_tea_leaf.png" alt="碎茶" />碎茶</span> → <span class="item-chip"><img src="/images/teastory/semi_fermented_tea_leaf.png" alt="半发酵茶" />半发酵茶</span>
  - <span class="item-chip"><img src="/images/teastory/semi_fermented_tea_leaf.png" alt="半发酵茶" />半发酵茶</span> → <span class="item-chip"><img src="/images/teastory/fully_fermented_tea_leaf.png" alt="全发酵茶" />全发酵茶</span>
  - <span class="item-chip"><img src="/images/teastory/fully_fermented_tea_leaf.png" alt="全发酵茶" />全发酵茶</span> → <span class="item-chip"><img src="/images/teastory/deep_fermented_tea_leaf.png" alt="重发酵茶" />重发酵茶</span>

补充：
- 发酵粉基础来源：`2 小麦 → 1 发酵粉`（工作台）；茶渣/焦叶回收也可产出。
- 发酵桶没放发酵粉不会启动；只吃发酵粉，普通燃料无效。

### 4) 烘焙 / 烘青 / 蒸青（茶炉·需燃料）

**茶炉** 需要原版燃料，负责三条定型路线：

- **烘焙（发酵叶 → 成品茶）**：
  - <span class="item-chip"><img src="/images/teastory/semi_fermented_tea_leaf.png" alt="半发酵茶" />半发酵茶</span> → <span class="item-chip"><img src="/images/teastory/oolong_tea_leaf.png" alt="乌龙茶茶叶" />乌龙茶茶叶</span>
  - <span class="item-chip"><img src="/images/teastory/fully_fermented_tea_leaf.png" alt="全发酵茶" />全发酵茶</span> → <span class="item-chip"><img src="/images/teastory/black_tea_leaf.png" alt="红茶茶叶" />红茶茶叶</span>
  - <span class="item-chip"><img src="/images/teastory/deep_fermented_tea_leaf.png" alt="重发酵茶" />重发酵茶</span> → <span class="item-chip"><img src="/images/teastory/puer_tea_leaf.png" alt="普洱茶茶叶" />普洱茶茶叶</span>
- **烘青（青叶低温烘干 → 白茶）**：<span class="item-chip"><img src="/images/teastory/tea_leaf.png" alt="青叶" />青叶</span> → <span class="item-chip"><img src="/images/teastory/white_tea_leaf.png" alt="白茶茶叶" />白茶茶叶</span>
- **蒸青（绿茶蒸碾 → 抹茶）**：<span class="item-chip"><img src="/images/teastory/green_tea_leaf.png" alt="绿茶茶叶" />绿茶茶叶</span> → <span class="item-chip"><img src="/images/teastory/matcha_tea_leaf.png" alt="抹茶叶" />抹茶叶</span>

### 5) 闷黄（茶盘）

- <span class="item-chip"><img src="/images/teastory/green_tea_leaf.png" alt="绿茶茶叶" />绿茶茶叶</span> 放入 **茶盘**（不看天）→ <span class="item-chip"><img src="/images/teastory/yellow_tea_leaf.png" alt="黄茶茶叶" />黄茶茶叶</span>。

> 至此六大茶类 + 抹茶的茶叶均已就绪：绿茶（炒青）、黄茶（闷黄）、白茶（烘青）、乌龙（半发酵烘焙）、红茶（全发酵烘焙）、普洱（重发酵烘焙）、抹茶（蒸青）。

## 茶包、茶壶与杯具

### 1) 空茶包与成品茶包（工作台）

- 纸 ×5 + 线 ×1 → <span class="item-chip"><img src="/images/teastory/empty_tea_bag.png" alt="空茶包" />空茶包 ×3</span>
- <span class="item-chip"><img src="/images/teastory/empty_tea_bag.png" alt="空茶包" />空茶包 ×1</span> + <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_leaf.png" alt="绿茶茶叶" /><img src="/images/teastory/black_tea_leaf.png" alt="红茶茶叶" /><img src="/images/teastory/oolong_tea_leaf.png" alt="乌龙茶茶叶" /><img src="/images/teastory/puer_tea_leaf.png" alt="普洱茶茶叶" /><img src="/images/teastory/white_tea_leaf.png" alt="白茶茶叶" /><img src="/images/teastory/yellow_tea_leaf.png" alt="黄茶茶叶" /></span>对应茶叶 ×6</span> → <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_bag.png" alt="绿茶茶包" /><img src="/images/teastory/black_tea_bag.png" alt="红茶茶包" /><img src="/images/teastory/oolong_tea_bag.png" alt="乌龙茶茶包" /><img src="/images/teastory/puer_tea_bag.png" alt="普洱茶茶包" /><img src="/images/teastory/white_tea_bag.png" alt="白茶茶包" /><img src="/images/teastory/yellow_tea_bag.png" alt="黄茶茶包" /></span>对应茶包 ×1</span>
- 支持：绿茶、红茶、乌龙、普洱、白茶、黄茶六味。

### 2) 壶与杯（工作台 + 烧制）

- 杯子：<span class="item-chip"><img src="/images/teastory/cup_glass.png" alt="玻璃杯" />玻璃杯</span>、<span class="item-chip"><img src="/images/teastory/cup_stone.png" alt="石杯" />石杯</span>、<span class="item-chip"><img src="/images/teastory/cup_wood.png" alt="木杯" />木杯</span>、<span class="item-chip"><img src="/images/teastory/cup_porcelain.png" alt="瓷杯" />瓷杯</span>、<span class="item-chip"><img src="/images/teastory/cup_zisha.png" alt="紫砂杯" />紫砂杯</span>。
- 茶壶：<span class="item-chip"><img src="/images/teastory/empty_porcelain_kettle.png" alt="瓷壶" />空瓷壶</span>、<span class="item-chip"><img src="/images/teastory/empty_zisha_kettle.png" alt="紫砂壶" />空紫砂壶</span>。
- 水壶：<span class="item-chip"><img src="/images/teastory/water_pot_stone.png" alt="水壶" />石/瓷/铁/紫砂水壶</span> 装水后可在熔炉/高炉烧成 **开水壶**。

空壶来源（茶壶胚 → 烧制）：
- 茶壶胚（工作台，严格摆位；材料：黏土球 ×6）：
  - 第一行：` 空 黏土球 空 `
  - 第二行：` 黏土球 空 黏土球 `
  - 第三行：` 黏土球 黏土球 黏土球 `
- 将茶壶胚在熔炉/高炉烧制成 <span class="item-chip"><img src="/images/teastory/empty_porcelain_kettle.png" alt="空瓷茶壶" />空瓷茶壶</span>（高炉更快）。紫砂壶同理用紫砂泥。

玩家常用技巧：
- 建议按批次做水壶：9 个空壶 + 1 水桶一次加满，效率更高。
- 开水壶不限材质：石/瓷/铁/紫砂开水壶都能用来冲泡。

## 茶桌冲泡

**茶桌** 是最终冲泡台，右击打开六槽 GUI：

- **工具槽**：茶筅（抹茶）/ 牛奶桶（奶茶）/ 柠檬（柠檬茶）
- **糖槽**：**糖**（奶/柠/抹茶需要）
- **杯槽**：空杯或空壶（决定杯装/壶装）
- **水槽**：任意 **开水壶** 或 **满壶**（倒茶时放满壶）
- **茶叶槽**：茶叶或茶包
- **产出槽**：成品

### 1) 杯装纯茶

- 对应干茶 ×2 + 任意开水壶 + 空杯 → 对应杯装茶饮（喝完返还空杯）。
- 六味 × 五种杯（玻璃/石/木/瓷/紫砂）任意组合。

### 2) 壶装纯茶（茶包冲泡，返茶渣）

- 瓷壶：茶包 ×1 + 开水壶 + 空瓷壶 → 对应瓷壶茶饮；紫砂壶：茶包 ×2 + 空紫砂壶。
- 茶包消耗后返还对应 **茶渣**（可回收成发酵粉）。

### 3) 特色茶：奶茶 / 柠檬茶 / 抹茶

| 口味 | 茶叶 | 工具 | 糖 | 说明 |
|---|---|---|---|---|
| **奶茶** | 红茶叶 ×2 | 牛奶桶（返空桶） | 3 | 杯装；壶装用红茶包 |
| **柠檬茶** | 红茶叶 ×2 | <span class="item-chip"><img src="/images/teastory/lemon.png" alt="柠檬" />柠檬</span> | 3 | 杯装；壶装用红茶包 |
| **抹茶** | 抹茶叶 ×2 | <span class="item-chip"><img src="/images/teastory/tea_whisk.png" alt="茶筅" />茶筅</span>（掉 1 耐久） | 3 | 杯装；壶装用散抹茶粉 |

> 柠檬来源：破坏 **丛林树叶** 有概率掉落 <span class="item-chip"><img src="/images/teastory/lemon.png" alt="柠檬" />柠檬</span>，也可直接食用。

### 4) 倒茶（满壶 → 杯）

- 把 **满壶** 放入水槽 + 空杯 → 杯装茶饮。
- 每倒一杯扣 1 耐久：**瓷壶 4 杯 / 紫砂壶 8 杯**，倒空后返还对应空壶。
- 九味（六茶 + 抹茶 + 奶茶 + 柠檬茶）× 两种壶 × 五种杯均可倒。

::: tip 冲泡 vs 倒茶
- **冲泡**：茶叶/茶包 + 开水壶，一次出一杯或一整壶。
- **倒茶**：已有的满壶 + 空杯，把整壶分成多杯，更省茶叶。
:::

## 稻谷与水田线

### 1) 两段式种植

- 第一段（普通耕地）：使用 <span class="item-chip"><img src="/images/teastory/xian_rice_seeds.png" alt="稻谷" />稻谷</span> 在普通耕地育秧，成熟后收获 <span class="item-chip"><img src="/images/teastory/item_xian_rice_seedling.png" alt="水稻秧苗" />水稻秧苗</span>。
- 第二段（水田移栽）：将 <span class="item-chip"><img src="/images/teastory/item_xian_rice_seedling.png" alt="水稻秧苗" />水稻秧苗</span> 移栽到 <span class="item-chip"><img src="/images/teastory/paddy_field.png" alt="水田" />水田</span> 继续生长。

### 2) 水田机制

- <span class="item-chip"><img src="/images/teastory/paddy_field.png" alt="水田" />水田</span> 支持放置、破坏和掉落回收（破坏掉回自身）。
- 水田已限制桶交互：不能被空桶直接取走，也不会被水桶重复灌入。
- 水田为浅水视觉（泥底 + 水面），并配置了水感相关交互音效。
- 合成：泥土 ×8 围 1 水桶 → 水田 ×8（水桶自动返空桶）。

### 3) 成熟产物与加工

- 成熟稻株仅掉落 <span class="item-chip"><img src="/images/teastory/xian_rice_seeds.png" alt="稻谷" />稻谷</span>（不直接掉 <span class="item-chip"><img src="/images/teastory/xian_rice.png" alt="大米" />大米</span>）。
- 加工配方：<span class="item-chip"><img src="/images/teastory/wooden_mortar_and_pestle.png" alt="木制研钵研杵" />木制研钵研杵</span> + <span class="item-chip"><img src="/images/teastory/xian_rice_seeds.png" alt="稻谷" />稻谷</span> → <span class="item-chip"><img src="/images/teastory/xian_rice.png" alt="大米" />大米</span>。

## 茶渣系统

### 1) 茶渣产出

在茶桌用 **茶包** 泡壶时会返还对应茶渣：

- <span class="item-chip"><img src="/images/teastory/black_tea_bag.png" alt="红茶茶包" />红茶茶包</span> → <span class="item-chip"><img src="/images/teastory/black_tea_residue.png" alt="红茶茶渣" />红茶茶渣</span>
- <span class="item-chip"><img src="/images/teastory/green_tea_bag.png" alt="绿茶茶包" />绿茶茶包</span> → <span class="item-chip"><img src="/images/teastory/green_tea_residue.png" alt="绿茶茶渣" />绿茶茶渣</span>
- <span class="item-chip"><img src="/images/teastory/oolong_tea_bag.png" alt="乌龙茶茶包" />乌龙茶茶包</span> → <span class="item-chip"><img src="/images/teastory/oolong_tea_residue.png" alt="乌龙茶茶渣" />乌龙茶茶渣</span>
- <span class="item-chip"><img src="/images/teastory/puer_tea_bag.png" alt="普洱茶茶包" />普洱茶茶包</span> → <span class="item-chip"><img src="/images/teastory/puer_tea_residue.png" alt="普洱茶茶渣" />普洱茶茶渣</span>
- <span class="item-chip"><img src="/images/teastory/white_tea_bag.png" alt="白茶茶包" />白茶茶包</span> → <span class="item-chip"><img src="/images/teastory/white_tea_residue.png" alt="白茶茶渣" />白茶茶渣</span>
- <span class="item-chip"><img src="/images/teastory/yellow_tea_bag.png" alt="黄茶茶包" />黄茶茶包</span> → <span class="item-chip"><img src="/images/teastory/yellow_tea_residue.png" alt="黄茶茶渣" />黄茶茶渣</span>

### 2) 茶渣回收

- 任意 <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_residue.png" alt="绿茶茶渣" /><img src="/images/teastory/black_tea_residue.png" alt="红茶茶渣" /><img src="/images/teastory/oolong_tea_residue.png" alt="乌龙茶茶渣" /><img src="/images/teastory/puer_tea_residue.png" alt="普洱茶茶渣" /><img src="/images/teastory/white_tea_residue.png" alt="白茶茶渣" /><img src="/images/teastory/yellow_tea_residue.png" alt="黄茶茶渣" /></span>茶渣</span> 或 <span class="item-chip"><img src="/images/teastory/failed_fixation_tea_leaf.png" alt="焦叶" />焦叶</span> ×2 → <span class="item-chip"><img src="/images/teastory/baking_powder.png" alt="发酵粉" />发酵粉 ×1</span>

## 常见问题（FAQ）

:::::: details Q1：制茶要用哪台机器？
A：**茶盘**萎凋/闷黄、**炒茶锅**杀青炒青、**发酵桶**发酵、**茶炉**烘焙烘青蒸青、**茶桌**冲泡倒茶。全部右击打开 GUI 投料，炒茶锅和茶炉需要原版燃料，发酵桶只吃发酵粉，茶盘和茶桌不用燃料。
::::::

:::::: details Q2：为什么茶盘产出的是湿茶而不是萎凋叶？
A：茶盘看天。雨天/雷暴会把鲜叶淋成 <span class="item-chip"><img src="/images/teastory/wet_tea_leaf.png" alt="湿茶叶" />湿茶叶</span>。晴天再放回茶盘可挽救成无分级萎凋叶；湿茶直接下炒茶锅只会炒成焦叶。
::::::

:::::: details Q3：茶筅会不会消耗？
A：会。<span class="item-chip"><img src="/images/teastory/tea_whisk.png" alt="茶筅" />茶筅</span> 在茶桌抹茶配方中每次冲泡掉 1 耐久（总 120），耐久归零会损坏。
::::::

:::::: details Q4：茶渣有什么用？
A：任意两份茶渣或焦叶可回收成一份 <span class="item-chip"><img src="/images/teastory/baking_powder.png" alt="发酵粉" />发酵粉</span>，供发酵桶继续发酵。
::::::

:::::: details Q5：奶茶/柠檬茶/抹茶怎么做？
A：都在 **茶桌** 上做，需要在糖槽放糖：
- 奶茶：红茶叶 ×2 + 牛奶桶（返空桶）+ 糖 ×3
- 柠檬茶：红茶叶 ×2 + <span class="item-chip"><img src="/images/teastory/lemon.png" alt="柠檬" />柠檬</span> + 糖 ×3
- 抹茶：抹茶叶 ×2 + <span class="item-chip"><img src="/images/teastory/tea_whisk.png" alt="茶筅" />茶筅</span> + 糖 ×3
壶装版用茶包/散粉，糖量更大。
::::::

:::::: details Q6：不同茶喝了有什么效果？
A：
- 红茶：力量（11 秒）
- 绿茶：急迫（13 秒）
- 乌龙：水下呼吸（13 秒）
- 普洱：生命提升（12 秒）
- 白茶：生命恢复（7 秒）
- 黄茶：伤害吸收（10 秒）
- 柠檬茶：速度（12 秒）
- 抹茶：跳跃提升 II（10 秒）
- 奶茶：抗性提升（11 秒）
::::::

:::::: details Q7：前期怎么最快喝上第一杯茶？
A：走这条最短链（都在机器上）：  
鲜叶 →（茶盘·晴）萎凋叶 →（炒茶锅）青叶 →（炒茶锅）绿茶叶 →（茶桌）绿茶叶 ×2 + 开水壶 + 空杯 → 绿茶杯。
::::::
