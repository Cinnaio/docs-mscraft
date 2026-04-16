# 茶风纪事 游玩指南

> 致谢与许可：本玩法在充分尊重原创的基础上进行二次创作，遵循原项目许可。  
> 原项目与许可证请见：[Tea-the-Story](https://github.com/RoShioLeo/Tea-the-Story?tab=readme-ov-file#license-%E8%AE%B8%E5%8F%AF%E8%AF%81)

> **核心摘要**：TeaStory 的主线是「采茶 -> 萎凋 -> 制茶 -> 茶包/茶壶 -> 倒杯饮用 -> 茶渣回收」。

## 参数速查

| 环节 | 参数 |
|---|---|
| 萎凋（营火） | 10 / 11 / 12 / 13 / 14 秒（湿叶回萎凋 1 秒） |
| 萎凋 -> 青叶（熔炉） | 8 / 9 / 10 / 11 / 12 秒 |
| 青叶产量 | 单芽/一芽一叶产 2，其余叶型产 1 |
| 研钵 | 1 青叶 -> 3 碎茶；研钵每次掉 1 耐久（总 80） |
| 发酵链 | 每一步都要 1 发酵粉 |
| 干燥（碎/半/全/重发酵） | 营火 20 秒，熔炉 10 秒，烟熏炉 5 秒，高炉 5 秒 |
| 空茶包 | 1 线 + 5 纸 -> 3 空茶包 |
| 成品茶包 | 1 空茶包 + 6 对应茶叶 -> 1 茶包 |
| 壶加水（批量） | 9 空壶 + 1 水桶 -> 9 有水壶 |
| 烧水 | 熔炉 8 秒，高炉 4 秒 |
| 茶渣回收 | 任意 2 份茶渣 -> 1 发酵粉 |
| 茶筅 | 每次研磨掉 1 耐久（总 120） |
| 水稻成熟掉落 | 仅掉落 <span class="item-chip"><img src="/images/teastory/xian_rice_seeds.png" alt="稻谷" />稻谷</span>（当前为 1~3） |
| 大米加工 | <span class="item-chip"><img src="/images/teastory/wooden_mortar_and_pestle.png" alt="木制研钵研杵" />木制研钵研杵</span> + <span class="item-chip"><img src="/images/teastory/xian_rice_seeds.png" alt="稻谷" />稻谷</span> -> <span class="item-chip"><img src="/images/teastory/xian_rice.png" alt="大米" />大米</span> |

## 快速流程

::: tip 温馨小提示
所有的作物种植均会受到季节、节气以及环境因素的影响。
:::

1. 在世界战利品箱获得 <span class="item-chip"><img src="/images/teastory/tea_seeds.png" alt="茶树种子" />茶树种子</span>，并在耕地上进行种植。
2. 等待茶树成熟，采集 <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud.png" alt="鲜叶" />鲜叶</span>（芽头/叶片）。
   - 补充：成熟采集时，<span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud.png" alt="鲜叶" />鲜叶</span> 的**品质与数量**会随机。

3. 将 <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud.png" alt="鲜叶" />鲜叶</span> 放到营火进行萎凋，得到对应 <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_bud.png" alt="萎凋叶" />萎凋叶</span>。
   - 注意：雨天萎凋请确认营火**上方有遮挡**，否则可能变成 <span class="item-chip"><img src="/images/teastory/wet_tea_leaf.png" alt="湿茶叶" />湿茶叶</span>。

4. 炒制：将萎凋叶用熔炉炒制为 <span class="item-chip"><img src="/images/teastory/tea_leaf.png" alt="青叶" />青叶</span>。
5. 制茶：按目标口味选择路线（研钵 / 发酵 / 干燥定型）得到对应茶叶。详见下文「采茶与初制」。
6. 做茶包：空茶包 + 对应茶叶 x6 -> 对应茶包。详见下文「茶包、茶壶与杯具」。
7. 准备壶与水：制作茶壶胚并烧制成空壶；水壶装水并烧开成开水壶。详见下文「茶包、茶壶与杯具」。
8. 泡壶：茶包 + 空壶 + 开水壶 -> 成品茶壶（会返还茶渣）。详见下文「茶包、茶壶与杯具」。
9. 倒杯饮用：成品茶壶 + 任意杯子 -> 杯装茶饮（喝完返还空杯）。详见下文「茶包、茶壶与杯具」。
10. 回收：任意茶渣 x2 -> 发酵粉 x1（可回到发酵流程）。详见下文「茶渣系统」。

## 稻谷与水田线（新增）

### 1) 两段式种植

- 第一段（普通耕地）：使用 <span class="item-chip"><img src="/images/teastory/xian_rice_seeds.png" alt="稻谷" />稻谷</span> 在普通耕地育秧，成熟后收获 <span class="item-chip"><img src="/images/teastory/item_xian_rice_seedling.png" alt="水稻秧苗" />水稻秧苗</span>。
- 第二段（水田移栽）：将 <span class="item-chip"><img src="/images/teastory/item_xian_rice_seedling.png" alt="水稻秧苗" />水稻秧苗</span> 移栽到 <span class="item-chip"><img src="/images/teastory/paddy_field.png" alt="水田" />水田</span> 继续生长。

### 2) 水田机制

- <span class="item-chip"><img src="/images/teastory/paddy_field.png" alt="水田" />水田</span> 支持放置、破坏和掉落回收（破坏掉回自身）。
- 水田已限制桶交互：不能被空桶直接取走，也不会被水桶重复灌入。
- 水田为浅水视觉（泥底 + 水面），并配置了水感相关交互音效。

### 3) 成熟产物与加工

- 成熟稻株仅掉落 <span class="item-chip"><img src="/images/teastory/xian_rice_seeds.png" alt="稻谷" />稻谷</span>（不直接掉 <span class="item-chip"><img src="/images/teastory/xian_rice.png" alt="大米" />大米</span>）。
- 加工配方：<span class="item-chip"><img src="/images/teastory/wooden_mortar_and_pestle.png" alt="木制研钵研杵" />木制研钵研杵</span> + <span class="item-chip"><img src="/images/teastory/xian_rice_seeds.png" alt="稻谷" />稻谷</span> -> <span class="item-chip"><img src="/images/teastory/xian_rice.png" alt="大米" />大米</span>。

## 采茶与初制

### 1) 萎凋（营火）

- <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud.png" alt="鲜叶（单芽）" />鲜叶（单芽）</span> -> <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_bud.png" alt="萎凋叶（单芽）" />萎凋叶（单芽）</span>
- <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud_leaf1.png" alt="鲜叶（一芽一叶）" />鲜叶（一芽一叶）</span> -> <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_bud_leaf1.png" alt="萎凋叶（一芽一叶）" />萎凋叶（一芽一叶）</span>
- <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud_leaf2.png" alt="鲜叶（一芽二叶）" />鲜叶（一芽二叶）</span> -> <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_bud_leaf2.png" alt="萎凋叶（一芽二叶）" />萎凋叶（一芽二叶）</span>
- <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_bud_leaf3.png" alt="鲜叶（一芽三叶）" />鲜叶（一芽三叶）</span> -> <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_bud_leaf3.png" alt="萎凋叶（一芽三叶）" />萎凋叶（一芽三叶）</span>
- <span class="item-chip"><img src="/images/teastory/fresh_tea_leaf_old_leaf.png" alt="鲜叶（老叶）" />鲜叶（老叶）</span> -> <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_old_leaf.png" alt="萎凋叶（老叶）" />萎凋叶（老叶）</span>

### 2) 炒制（熔炉）

- <span class="item-chip"><img src="/images/teastory/withered_tea_leaf_bud.png" alt="萎凋叶" />萎凋叶</span> 经熔炉产出 <span class="item-chip"><img src="/images/teastory/tea_leaf.png" alt="青叶" />青叶</span>（不同叶型产量/经验不同）。

| 萎凋叶类型 | 耗时 | 青叶产量 |
|---|---:|---:|
| 单芽 | 8 秒 | 2 |
| 一芽一叶 | 9 秒 | 2 |
| 一芽二叶 | 10 秒 | 1 |
| 一芽三叶 | 11 秒 | 1 |
| 老叶 | 12 秒 | 1 |

### 3) 研钵与发酵

- <span class="item-chip"><img src="/images/teastory/wooden_mortar_and_pestle.png" alt="木制研钵研杵" />木制研钵研杵 x1</span> + <span class="item-chip"><img src="/images/teastory/tea_leaf.png" alt="青叶" />青叶 x1</span> -> <span class="item-chip"><img src="/images/teastory/broken_tea_leaf.png" alt="碎茶" />碎茶 x3</span>
- <span class="item-chip"><img src="/images/teastory/baking_powder.png" alt="发酵粉" />发酵粉 x1</span> + <span class="item-chip"><img src="/images/teastory/broken_tea_leaf.png" alt="碎茶" />碎茶 x1</span> -> <span class="item-chip"><img src="/images/teastory/semi_fermented_tea_leaf.png" alt="半发酵茶" />半发酵茶 x1</span>
- <span class="item-chip"><img src="/images/teastory/baking_powder.png" alt="发酵粉" />发酵粉 x1</span> + <span class="item-chip"><img src="/images/teastory/semi_fermented_tea_leaf.png" alt="半发酵茶" />半发酵茶 x1</span> -> <span class="item-chip"><img src="/images/teastory/fully_fermented_tea_leaf.png" alt="全发酵茶" />全发酵茶 x1</span>
- <span class="item-chip"><img src="/images/teastory/baking_powder.png" alt="发酵粉" />发酵粉 x1</span> + <span class="item-chip"><img src="/images/teastory/fully_fermented_tea_leaf.png" alt="全发酵茶" />全发酵茶 x1</span> -> <span class="item-chip"><img src="/images/teastory/deep_fermented_tea_leaf.png" alt="重发酵茶" />重发酵茶 x1</span>

补充：
- 发酵粉基础来源：`2 小麦 -> 1 发酵粉`。
- 研钵是消耗耐久工具，不会一次性消失。

### 4) 干燥定型（营火/熔炉/烟熏炉/高炉）

- 工艺容器：营火 / 熔炉 / 烟熏炉 / 高炉
- 配方 1：<span class="item-chip"><img src="/images/teastory/broken_tea_leaf.png" alt="碎茶" />碎茶 x1</span> -> <span class="item-chip"><img src="/images/teastory/green_tea_leaf.png" alt="绿茶茶叶" />绿茶茶叶 x1</span>
- 配方 2：<span class="item-chip"><img src="/images/teastory/semi_fermented_tea_leaf.png" alt="半发酵茶" />半发酵茶 x1</span> -> <span class="item-chip"><img src="/images/teastory/oolong_tea_leaf.png" alt="乌龙茶茶叶" />乌龙茶茶叶 x1</span>
- 配方 3：<span class="item-chip"><img src="/images/teastory/fully_fermented_tea_leaf.png" alt="全发酵茶" />全发酵茶 x1</span> -> <span class="item-chip"><img src="/images/teastory/black_tea_leaf.png" alt="红茶茶叶" />红茶茶叶 x1</span>
- 配方 4：<span class="item-chip"><img src="/images/teastory/deep_fermented_tea_leaf.png" alt="重发酵茶" />重发酵茶 x1</span> -> <span class="item-chip"><img src="/images/teastory/puer_tea_leaf.png" alt="普洱茶茶叶" />普洱茶茶叶 x1</span>

> 四种容器都能做以上 4 条配方；耗时统一规则：营火 20 秒、熔炉 10 秒、烟熏炉 5 秒、高炉 5 秒（每次经验 0.1）。

### 4.1) 发酵线工艺容器（酿造台）

工艺容器：酿造台（`type: brewing`）

- 配方 A：容器槽 <span class="item-chip"><img src="/images/teastory/broken_tea_leaf.png" alt="碎茶" />碎茶 x1</span> + 原料槽 <span class="item-chip"><img src="/images/teastory/baking_powder.png" alt="发酵粉" />发酵粉 x1</span> -> <span class="item-chip"><img src="/images/teastory/semi_fermented_tea_leaf.png" alt="半发酵茶" />半发酵茶 x1</span>
- 配方 B：容器槽 <span class="item-chip"><img src="/images/teastory/semi_fermented_tea_leaf.png" alt="半发酵茶" />半发酵茶 x1</span> + 原料槽 <span class="item-chip"><img src="/images/teastory/baking_powder.png" alt="发酵粉" />发酵粉 x1</span> -> <span class="item-chip"><img src="/images/teastory/fully_fermented_tea_leaf.png" alt="全发酵茶" />全发酵茶 x1</span>
- 配方 C：容器槽 <span class="item-chip"><img src="/images/teastory/fully_fermented_tea_leaf.png" alt="全发酵茶" />全发酵茶 x1</span> + 原料槽 <span class="item-chip"><img src="/images/teastory/baking_powder.png" alt="发酵粉" />发酵粉 x1</span> -> <span class="item-chip"><img src="/images/teastory/deep_fermented_tea_leaf.png" alt="重发酵茶" />重发酵茶 x1</span>

> 这 3 条是连续升级链，每一步都消耗 1 份发酵粉，产出 1 份下一阶段茶叶。

## 抹茶路线

### 1) 制作茶筅

- 工作台合成 <span class="item-chip"><img src="/images/teastory/tea_whisk.png" alt="茶筅" />茶筅</span>（有耐久，参与抹茶配方会损耗）。

配方摆位：
- 第一行：` 空 木棍 空 `
- 第二行：` 竹子 竹子 竹子 `
- 第三行：` 空 木板 空 `

### 2) 研磨抹茶

- <span class="item-chip"><img src="/images/teastory/tea_whisk.png" alt="茶筅" />茶筅 x1</span> + <span class="item-chip"><img src="/images/teastory/green_tea_leaf.png" alt="绿茶茶叶" />绿茶茶叶 x1</span> -> <span class="item-chip"><img src="/images/teastory/matcha_tea_leaf.png" alt="抹茶叶" />抹茶叶 x1</span>

### 3) 抹茶壶

- <span class="item-chip"><img src="/images/teastory/matcha_tea_leaf.png" alt="抹茶叶" />抹茶叶 x1</span> + <span class="item-chip"><img src="/images/teastory/tea_whisk.png" alt="茶筅" />茶筅 x1</span> + <span class="item-chip"><img src="/images/teastory/empty_porcelain_kettle.png" alt="空瓷茶壶" />空瓷茶壶 x1</span> + 烧开的任意水壶 x1 -> <span class="item-chip"><img src="/images/teastory/matcha_drink_porcelain_kettle.png" alt="抹茶饮瓷茶壶" />抹茶饮瓷茶壶 x1</span>
- <span class="item-chip"><img src="/images/teastory/matcha_tea_leaf.png" alt="抹茶叶" />抹茶叶 x1</span> + <span class="item-chip"><img src="/images/teastory/tea_whisk.png" alt="茶筅" />茶筅 x1</span> + <span class="item-chip"><img src="/images/teastory/empty_zisha_kettle.png" alt="空紫砂茶壶" />空紫砂茶壶 x1</span> + 烧开的任意水壶 x1 -> <span class="item-chip"><img src="/images/teastory/matcha_drink_zisha_kettle.png" alt="抹茶饮紫砂茶壶" />抹茶饮紫砂茶壶 x1</span>

## 茶包、茶壶与杯具

### 1) 空茶包

- 纸 x5 + 线 x1 -> <span class="item-chip"><img src="/images/teastory/empty_tea_bag.png" alt="空茶包" />空茶包 x3</span>

### 2) 成品茶包

- <span class="item-chip"><img src="/images/teastory/empty_tea_bag.png" alt="空茶包" />空茶包 x1</span> + <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_leaf.png" alt="绿茶茶叶" /><img src="/images/teastory/black_tea_leaf.png" alt="红茶茶叶" /><img src="/images/teastory/oolong_tea_leaf.png" alt="乌龙茶茶叶" /><img src="/images/teastory/puer_tea_leaf.png" alt="普洱茶茶叶" /><img src="/images/teastory/white_tea_leaf.png" alt="白茶茶叶" /><img src="/images/teastory/yellow_tea_leaf.png" alt="黄茶茶叶" /></span>对应茶叶 x6</span> -> <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_bag.png" alt="绿茶茶包" /><img src="/images/teastory/black_tea_bag.png" alt="红茶茶包" /><img src="/images/teastory/oolong_tea_bag.png" alt="乌龙茶茶包" /><img src="/images/teastory/puer_tea_bag.png" alt="普洱茶茶包" /><img src="/images/teastory/white_tea_bag.png" alt="白茶茶包" /><img src="/images/teastory/yellow_tea_bag.png" alt="黄茶茶包" /></span>对应茶包 x1</span>
- 包含：绿茶、红茶、乌龙、普洱、白茶、黄茶。

### 3) 壶与杯

- 杯子：<span class="item-chip"><img src="/images/teastory/cup_glass.png" alt="玻璃杯" />玻璃杯</span>、<span class="item-chip"><img src="/images/teastory/cup_stone.png" alt="石杯" />石杯</span>、<span class="item-chip"><img src="/images/teastory/cup_wood.png" alt="木杯" />木杯</span>、<span class="item-chip"><img src="/images/teastory/cup_porcelain.png" alt="瓷杯" />瓷杯</span>、<span class="item-chip"><img src="/images/teastory/cup_zisha.png" alt="紫砂杯" />紫砂杯</span>。
- 茶壶：<span class="item-chip"><img src="/images/teastory/empty_porcelain_kettle.png" alt="瓷壶" />瓷壶</span>、<span class="item-chip"><img src="/images/teastory/empty_zisha_kettle.png" alt="紫砂壶" />紫砂壶</span>。
- 开水壶：<span class="item-chip"><img src="/images/teastory/water_pot_stone.png" alt="水壶" />水壶 x1</span> 装水后可在熔炉/高炉烧开。

茶壶胚与烧制（空壶来源）：
- 茶壶胚（工作台，严格摆位；材料：黏土球 x6）：
  - 第一行：` 空 黏土球 空 `
  - 第二行：` 黏土球 空 黏土球 `
  - 第三行：` 黏土球 黏土球 黏土球 `
- 将茶壶胚烧制为 <span class="item-chip"><img src="/images/teastory/empty_porcelain_kettle.png" alt="空瓷茶壶" />空瓷茶壶</span>（熔炉/高炉均可；高炉更快）。

玩家常用技巧：
- 建议按批次做水壶：一次 9 个壶一起加水，效率更高。
- 倒杯时不限制杯子材质，壶可以和任意杯组合出杯。
- 杯装茶饮喝完会返还对应空杯。

### 4) 泡壶与倒杯

- <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_bag.png" alt="绿茶茶包" /><img src="/images/teastory/black_tea_bag.png" alt="红茶茶包" /><img src="/images/teastory/oolong_tea_bag.png" alt="乌龙茶茶包" /><img src="/images/teastory/puer_tea_bag.png" alt="普洱茶茶包" /><img src="/images/teastory/white_tea_bag.png" alt="白茶茶包" /><img src="/images/teastory/yellow_tea_bag.png" alt="黄茶茶包" /></span>茶包 x1</span> + <span class="item-chip"><img src="/images/teastory/empty_porcelain_kettle.png" alt="空壶" />空壶 x1</span> + <span class="item-chip"><img src="/images/teastory/water_pot_stone.png" alt="开水壶" />开水壶 x1</span> -> <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_porcelain_kettle.png" alt="绿茶瓷茶壶" /><img src="/images/teastory/black_tea_porcelain_kettle.png" alt="红茶瓷茶壶" /><img src="/images/teastory/oolong_tea_porcelain_kettle.png" alt="乌龙茶瓷茶壶" /><img src="/images/teastory/puer_tea_porcelain_kettle.png" alt="普洱茶瓷茶壶" /><img src="/images/teastory/white_tea_porcelain_kettle.png" alt="白茶瓷茶壶" /><img src="/images/teastory/yellow_tea_porcelain_kettle.png" alt="黄茶瓷茶壶" /></span>对应茶壶饮品 x1</span>。
- <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_porcelain_kettle.png" alt="绿茶瓷茶壶" /><img src="/images/teastory/black_tea_porcelain_kettle.png" alt="红茶瓷茶壶" /><img src="/images/teastory/oolong_tea_porcelain_kettle.png" alt="乌龙茶瓷茶壶" /><img src="/images/teastory/puer_tea_porcelain_kettle.png" alt="普洱茶瓷茶壶" /><img src="/images/teastory/white_tea_porcelain_kettle.png" alt="白茶瓷茶壶" /><img src="/images/teastory/yellow_tea_porcelain_kettle.png" alt="黄茶瓷茶壶" /></span>成品茶壶 x1</span> + <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/cup_glass.png" alt="玻璃杯" /><img src="/images/teastory/cup_stone.png" alt="石杯" /><img src="/images/teastory/cup_wood.png" alt="木杯" /><img src="/images/teastory/cup_porcelain.png" alt="瓷杯" /><img src="/images/teastory/cup_zisha.png" alt="紫砂杯" /></span>任意杯子 x1</span> -> <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_porcelain.png" alt="绿茶瓷杯" /><img src="/images/teastory/black_tea_porcelain.png" alt="红茶瓷杯" /><img src="/images/teastory/oolong_tea_porcelain.png" alt="乌龙茶瓷杯" /><img src="/images/teastory/puer_tea_porcelain.png" alt="普洱茶瓷杯" /><img src="/images/teastory/white_tea_porcelain.png" alt="白茶瓷杯" /><img src="/images/teastory/yellow_tea_porcelain.png" alt="黄茶瓷杯" /></span>对应杯装茶饮 x1</span>。

当前可用口味线：
- 常规六茶：<span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_leaf.png" alt="绿茶茶叶" /><img src="/images/teastory/black_tea_leaf.png" alt="红茶茶叶" /><img src="/images/teastory/oolong_tea_leaf.png" alt="乌龙茶茶叶" /><img src="/images/teastory/puer_tea_leaf.png" alt="普洱茶茶叶" /><img src="/images/teastory/white_tea_leaf.png" alt="白茶茶叶" /><img src="/images/teastory/yellow_tea_leaf.png" alt="黄茶茶叶" /></span>六类茶叶</span>（均支持瓷壶与紫砂壶）。
- 抹茶：`绿茶叶 + 茶筅` 先做抹茶叶，再做抹茶壶。

## 茶渣系统

### 1) 茶渣产出

在茶包参与“制茶壶”配方时会返还对应茶渣：

- <span class="item-chip"><img src="/images/teastory/black_tea_bag.png" alt="红茶茶包" />红茶茶包 x1</span> -> <span class="item-chip"><img src="/images/teastory/black_tea_residue.png" alt="红茶茶渣" />红茶茶渣 x1</span>
- <span class="item-chip"><img src="/images/teastory/green_tea_bag.png" alt="绿茶茶包" />绿茶茶包 x1</span> -> <span class="item-chip"><img src="/images/teastory/green_tea_residue.png" alt="绿茶茶渣" />绿茶茶渣 x1</span>
- <span class="item-chip"><img src="/images/teastory/oolong_tea_bag.png" alt="乌龙茶茶包" />乌龙茶茶包 x1</span> -> <span class="item-chip"><img src="/images/teastory/oolong_tea_residue.png" alt="乌龙茶茶渣" />乌龙茶茶渣 x1</span>
- <span class="item-chip"><img src="/images/teastory/puer_tea_bag.png" alt="普洱茶茶包" />普洱茶茶包 x1</span> -> <span class="item-chip"><img src="/images/teastory/puer_tea_residue.png" alt="普洱茶茶渣" />普洱茶茶渣 x1</span>
- <span class="item-chip"><img src="/images/teastory/white_tea_bag.png" alt="白茶茶包" />白茶茶包 x1</span> -> <span class="item-chip"><img src="/images/teastory/white_tea_residue.png" alt="白茶茶渣" />白茶茶渣 x1</span>
- <span class="item-chip"><img src="/images/teastory/yellow_tea_bag.png" alt="黄茶茶包" />黄茶茶包 x1</span> -> <span class="item-chip"><img src="/images/teastory/yellow_tea_residue.png" alt="黄茶茶渣" />黄茶茶渣 x1</span>

### 2) 茶渣回收

- 任意 <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_residue.png" alt="绿茶茶渣" /><img src="/images/teastory/black_tea_residue.png" alt="红茶茶渣" /><img src="/images/teastory/oolong_tea_residue.png" alt="乌龙茶茶渣" /><img src="/images/teastory/puer_tea_residue.png" alt="普洱茶茶渣" /><img src="/images/teastory/white_tea_residue.png" alt="白茶茶渣" /><img src="/images/teastory/yellow_tea_residue.png" alt="黄茶茶渣" /></span>茶渣 x2</span> -> <span class="item-chip"><img src="/images/teastory/baking_powder.png" alt="发酵粉" />发酵粉 x1</span>

## 常见问题（FAQ）

:::::: details Q1：为什么我做不出某种茶？
A：先确认你走的是正确前置链条（萎凋/发酵/干燥），再检查是否有 <span class="item-chip"><img src="/images/teastory/empty_tea_bag.png" alt="空茶包" />空茶包 x1</span> 与 <span class="item-chip"><img src="/images/teastory/water_pot_stone.png" alt="开水壶" />开水壶 x1</span>。
::::::

:::::: details Q2：茶筅会不会消耗？
A：会。<span class="item-chip"><img src="/images/teastory/tea_whisk.png" alt="茶筅" />茶筅</span> 在抹茶配方中会按耐久损耗，耐久归零会损坏。
::::::

:::::: details Q3：茶渣有什么用？
A：任意两份 <span class="item-chip item-chip--cycle"><span class="item-chip__icon-stack"><img src="/images/teastory/green_tea_residue.png" alt="绿茶茶渣" /><img src="/images/teastory/black_tea_residue.png" alt="红茶茶渣" /><img src="/images/teastory/oolong_tea_residue.png" alt="乌龙茶茶渣" /><img src="/images/teastory/puer_tea_residue.png" alt="普洱茶茶渣" /><img src="/images/teastory/white_tea_residue.png" alt="白茶茶渣" /><img src="/images/teastory/yellow_tea_residue.png" alt="黄茶茶渣" /></span>茶渣 x2</span> 可以回收成一份 <span class="item-chip"><img src="/images/teastory/baking_powder.png" alt="发酵粉" />发酵粉 x1</span>，可回到发酵流程。
::::::

:::::: details Q4：不同茶喝了有什么效果？
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

:::::: details Q5：前期怎么最快喝上第一杯茶？
A：先做研钵 + 空茶包，走这条最短链：  
鲜叶 -> 萎凋叶 -> 青叶 -> 碎茶 -> 绿茶叶 -> 绿茶包 -> 绿茶壶 -> 倒杯。
::::::


