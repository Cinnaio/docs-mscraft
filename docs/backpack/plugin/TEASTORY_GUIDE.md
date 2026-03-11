# 茶风·纪事（Teastory）工艺总览与实现说明

## 概览

- 技术栈
  - 主要实现：CraftEngine 配置（items、recipes、translations、categories、resourcepack）
  - 辅助逻辑：Skript（基于熔炉事件的“固化（炒青）成败概率”）
- 主要命名空间与物品
  - 原料与中间态：鲜叶、萎凋叶各品质、湿茶、青叶、碎茶、半/全/重发酵叶
  - 成品干茶：绿茶、乌龙茶、红茶、普洱（黑茶）
  - 器具与容器：各类杯具、茶壶、空茶包与茶包、发酵粉、水壶/烧开水壶
- 目录参考
  - 物品与模板：[teastory_item.yml](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/items/teastory_item.yml)
  - 翻译文本：[teastory.yml](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/translations/teastory.yml)
  - 分类目录：[categories.yml](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/categories.yml)

## 基础链路

### 采摘与品质
- 茶树作物掉落：鲜叶按品质随机掉落（单芽/一芽一叶/一芽二叶/一芽三叶/老叶）
- 配置参考：[teastory_crop.yml](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/blocks/teastory_crop.yml)

参数（营火萎凋，单位：ticks ≈ 秒/20）
- 单芽鲜叶 → 萎凋单芽：time 200（≈10s），exp 0.5，[campfire_bud_to_withered](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_campfire.yml#L2-L9)
- 一芽一叶 → 萎凋叶1：time 220（≈11s），exp 0.4，[campfire_bud_leaf1_to_withered](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_campfire.yml#L10-L17)
- 一芽二叶 → 萎凋叶2：time 240（≈12s），exp 0.3，[campfire_bud_leaf2_to_withered](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_campfire.yml#L18-L25)
- 一芽三叶 → 萎凋叶3：time 260（≈13s），exp 0.2，[campfire_bud_leaf3_to_withered](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_campfire.yml#L26-L33)
- 老叶鲜叶 → 萎凋老叶：time 280（≈14s），exp 0.1，[campfire_old_leaf_to_withered](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_campfire.yml#L34-L41)

### 萎凋（鲜叶→萎凋叶）
- 设备：营火
- 配方：参见 [teastory_campfire.yml](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_campfire.yml)

### 固化（炒青）（萎凋叶→青叶）
- 模板熔炼：按品质参数输出青叶（与模板产量）
  - 配置模板：[teastory_smelt.yml](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_smelt.yml)
- 概率控制：Skript 脚本在“熔炼完成”时按萎凋叶品质判定成功/失败
  - 成功：沿用配方产物（青叶）
  - 失败：产物替换为“焦叶”
  - 脚本： [teastory_fixation.skk](file:///e:/Program%20Files/survival_20260120_1444/plugins/Skript/scripts/teastory_fixation.skk#L18-L36)

参数（熔炉固化模板；单位：ticks/秒；经验与产量来自模板）
- 萎凋单芽 → 青叶×2：time 160（≈8s），exp 0.6，[smelt_single_bud_to_tea](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_smelt.yml#L2-L8)
- 萎凋一芽一叶 → 青叶×2：time 180（≈9s），exp 0.5，[smelt_bud_leaf1_to_tea](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_smelt.yml#L9-L15)
- 萎凋一芽二叶 → 青叶×1：time 200（≈10s），exp 0.4，[smelt_bud_leaf2_to_tea](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_smelt.yml#L16-L22)
- 萎凋一芽三叶 → 青叶×1：time 220（≈11s），exp 0.3，[smelt_bud_leaf3_to_tea](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_smelt.yml#L23-L29)
- 萎凋老叶 → 青叶×1：time 240（≈12s），exp 0.2，[smelt_old_leaf_to_tea](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_smelt.yml#L30-L36)

概率（Skript 固化成功率）
- 单芽：80% 成功（产量×2）；失败 → 焦叶×1，[L18-L21](file:///e:/Program%20Files/survival_20260120_1444/plugins/Skript/scripts/teastory_fixation.skk#L18-L21)
- 一芽一叶：65% 成功（产量×2）；失败 → 焦叶×1，[L22-L25](file:///e:/Program%20Files/survival_20260120_1444/plugins/Skript/scripts/teastory_fixation.skk#L22-L25)
- 一芽二叶：50% 成功（产量×1）；失败 → 焦叶×1，[L26-L28](file:///e:/Program%20Files/survival_20260120_1444/plugins/Skript/scripts/teastory_fixation.skk#L26-L28)
- 一芽三叶：35% 成功（产量×1）；失败 → 焦叶×1，[L29-L32](file:///e:/Program%20Files/survival_20260120_1444/plugins/Skript/scripts/teastory_fixation.skk#L29-L32)
- 老叶：20% 成功（产量×1）；失败 → 焦叶×1，[L33-L36](file:///e:/Program%20Files/survival_20260120_1444/plugins/Skript/scripts/teastory_fixation.skk#L33-L36)

环境条件对“萎凋（营火）”的影响（已实现：Skript）
- 触发时机：当营火烹饪生成“萎凋叶”掉落物时（on item spawn）
- 光照判定：营火方块光照等级 < 9 → 失败
- 覆盖判定：营火方块上方第2至第5格，如检测到“玻璃/染色玻璃/玻璃板”任一 → 视为“有覆盖”；否则“无遮挡”
- 天气判定：世界天气为雨或雷暴 → 视为“下雨”
- 失败逻辑：
  - 若“下雨”且“无遮挡” → 失败
  - 或“光照 < 9” → 失败
  - 失败结果：将掉落物替换为“湿茶叶” cgap:wet_tea_leaf
- 成功逻辑（品质分配，百分比总和 100%）：
  - 10%：单芽 cgap:withered_tea_leaf_bud
  - 25%：一芽一叶 cgap:withered_tea_leaf_bud_leaf1
  - 30%：一芽二叶 cgap:withered_tea_leaf_bud_leaf2
  - 20%：一芽三叶 cgap:withered_tea_leaf_bud_leaf3
  - 15%：老叶 cgap:withered_tea_leaf_old_leaf
- 源码参考： [teastory_wither.sk:L5-L67](file:///e:/Program%20Files/survival_20260120_1444/plugins/Skript/scripts/teastory_wither.sk#L5-L67)

### 破碎（青叶→碎茶）
- 工具：木质研钵研杵
- 配方：青叶 + 研钵 → 碎茶×3
- 配置： [teastory_mortar.yml](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_mortar.yml)

## 炼药台发酵链路（发酵粉）

> 上槽（红框）：cgap:baking_powder；下槽（蓝框）：对应叶子

- 碎茶 → 半发酵叶：[brew_shredded_to_semi](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_brewing.yml#L2-L9)
- 半发酵叶 → 全发酵叶：[brew_semi_to_fully](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_brewing.yml#L11-L18)
- 全发酵叶 → 深发酵叶：[brew_fully_to_deep](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_brewing.yml#L20-L27)
- 发酵粉合成：两个小麦 → 发酵粉×1，见 [teastory_tools.yml](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_tools.yml#L37-L45)

参数（炼药台酿造）
- 单次酿造时长：20s（原版固定）
- 燃料：烈焰粉（能量20次/份；每次开始酿造消耗1点）
- 经验：酿造不产出经验（CraftEngine brewing 配方不含经验参数）

## 干燥分支（四设备）

> 统一参数（可按需调整）：营火 400t；熔炉 200t；烟熏 100t；高炉 100t；经验 0.1  
> 配置： [teastory_drying.yml](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_drying.yml)

- 碎茶 → 绿茶干叶（基础干燥）
  - 设备：营火/熔炉/烟熏/高炉
  - 参考：[broken→green](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_drying.yml#L1-L20)
- 半发酵 → 乌龙茶干叶
  - 设备：四选一
  - 参考：[semi→oolong](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_drying.yml#L22-L57)
  - 参数：campfire 400t（20s）/ exp 0.1；smelting 200t（10s）/ exp 0.1；smoking 100t（5s）/ exp 0.1；blasting 100t（5s）/ exp 0.1
- 全发酵 → 红茶干叶
  - 设备：四选一
  - 参考：[full→black](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_drying.yml#L59-L94)
  - 参数：campfire 400t（20s）/ exp 0.1；smelting 200t（10s）/ exp 0.1；smoking 100t（5s）/ exp 0.1；blasting 100t（5s）/ exp 0.1
- 深发酵 → 黑茶干叶（普洱）
  - 设备：四选一
  - 参考：[deep→puer](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_drying.yml#L96-L131)
  - 参数：campfire 400t（20s）/ exp 0.1；smelting 200t（10s）/ exp 0.1；smoking 100t（5s）/ exp 0.1；blasting 100t（5s）/ exp 0.1

## 完整工艺流程（三条主线）

### 1) 乌龙茶
1. 采摘鲜叶 → 萎凋（营火）
2. 固化（炒青）→ 青叶（Skript 概率）
3. 破碎（研钵）→ 碎茶×3
4. 炼药台（发酵粉）→ 半发酵叶
5. 干燥（四设备）→ 乌龙茶干叶

### 2) 红茶
1. 采摘鲜叶 → 萎凋（营火）
2. 固化（炒青）→ 青叶（Skript 概率）
3. 破碎（研钵）→ 碎茶×3
4. 炼药台（发酵粉）→ 半发酵叶 → 炼药台（发酵粉）→ 全发酵叶
5. 干燥（四设备）→ 红茶干叶

### 3) 黑茶（普洱）
1. 采摘鲜叶 → 萎凋（营火）
2. 固化（炒青）→ 青叶（Skript 概率）
3. 破碎（研钵）→ 碎茶×3
4. 炼药台（发酵粉）→ 半发酵叶 → 炼药台（发酵粉）→ 全发酵叶 → 炼药台（发酵粉）→ 深发酵叶
5. 干燥（四设备）→ 普洱茶干叶（黑茶）

### 绿茶（补充）
1. 采摘鲜叶 → 萎凋（营火）
2. 固化（炒青）→ 青叶（Skript 概率）
3. 破碎（研钵）→ 碎茶×3
4. 直接干燥（四设备）→ 绿茶干叶
  - 参数：campfire 400t（20s）/ exp 0.1；smelting 200t（10s）/ exp 0.1；smoking 100t（5s）/ exp 0.1；blasting 100t（5s）/ exp 0.1

## 茶包与饮品

- 空茶包制作：线×1 + 纸×5 → 空茶包×3，[craft_empty_tea_bag](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_bag.yml#L3-L16)
- 空茶包 + 干茶叶×6 → 对应茶包（绿/红/乌龙/普洱/白/黄），见 [teastory_bag.yml](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_bag.yml)
- 茶壶出杯：各类茶壶 + 杯具 → 对应饮品（玻璃/石/瓷/紫砂），见 [teastory_kettle.yml](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_kettle.yml)
  
参数
- 合成（shaped/shapeless）：即时，无经验
- 茶壶出杯：即时，无经验

## 水壶与热水

- 批量注水：水桶×1 + 空壶×9 → 9 个有水水壶，[teastory_water_fill.yml](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_water_fill.yml)
- 加热：有水水壶 → 烧开的水壶（熔炉/高炉；低经验），[teastory_water_boil.yml](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/recipes/teastory_water_boil.yml)
  
参数（单位：ticks/秒）
- 熔炉：time 160（≈8s），exp 0.05
- 高炉：time 80（≈4s），exp 0.05

## 物品与翻译登记

- 所有新增物品均在 [teastory_item.yml](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/items/teastory_item.yml) 定义
- 翻译（中/英）均在 [teastory.yml](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/translations/teastory.yml) 补齐
- 目录（配方书分类）位于 [categories.yml](file:///e:/Program%20Files/survival_20260120_1444/plugins/CraftEngine/resources/cgap/configuration/categories.yml)

## 配方分组（避免叠组）

- 炼药台：`teastory_brewing`
- 干燥：`teastory_drying`
- 空壶注水：`teastory_fill`
- 水壶加热：`teastory_boil`
- 茶包：`teastory_bag`
- 工具与发酵粉：`teastory_tools`
- 固化模板熔炼：`teastory_smelt`
- 鲜叶营火：`teastory_campfire`

## 操作与重载

- 重载 CraftEngine 配方：`/ce reload recipe` 或 `/ce reload all`（Folia 使用 `/ce reload recipe`）
- 重载 Skript：`/skript reload teastory_fixation`

## 可调整项（建议）

- 各设备的干燥时间与经验值（按不同发酵等级微调）
- 炼药台发酵的材料与数量（例如自定义多步发酵引子）
- 固化成功率与产量（Skript 中的概率表）
- 茶壶出杯的容器与耐久/消耗策略（items 模板 settings）
