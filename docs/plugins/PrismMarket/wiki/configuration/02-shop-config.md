# 🛒 商店配置总览

## 文件级结构
:::info 信息
商店文件建议按功能划分命名，例如 `weekly_essential.yml`、`vip.yml`。  
避免使用含空格与全角字符的文件名，以降低跨平台解析异常的风险。
:::

每个商店文件位于：

```text
plugins/PrismMarket/shop/<shopId>.yml
```

核心节点：

- `layout`：界面布局定义
- `items`：商品定义
- `random`：随机池定义（可选）

---

## layout：界面布局系统

`layout` 通常包含：

- `title`：GUI 标题（MiniMessage）
- `mappings`：字符映射
- `patterns`：多行模板（可多页）

### mappings 的常见用途

- 映射边框：
  ```yaml
  '#':
    material: GRAY_STAINED_GLASS_PANE
  ```
- 映射随机占位符：
  ```yaml
  'A': '%prismmarket_random_weekly_essential_1%'
  ```

### patterns 的引用规则
:::warning 警告
每一行的 `patterns` 字符串长度必须一致，否则会导致 GUI 槽位错位。  
改动前先核对行宽，再逐步调整映射。
:::

- `#`：引用 `mappings` 符号
- `` `itemId` ``：引用 `items` 节点商品
- `%...%`：随机占位符（最终会解析为某个 itemId）

---

## items：商品定义系统

每个商品建议包含三块：

1. `material`（材质来源）
2. `display`（显示层）
3. `shop`（交易层）

### material 支持

- 原版单材质：`DIAMOND`
- 多材质轮播：
  ```yaml
  material:
    - OAK_LOG
    - BIRCH_LOG
  ```
- 自定义基准：`custom:example`
- CraftEngine：`craftengine:namespace:id`

### display 支持

- `name`：物品名
- `lore`：描述（字符串或列表，支持 MiniMessage）

### shop 支持
:::tip 提示
当仅用于展示时，可以省略 `shop` 节点；此时该商品不可交易。  
若要启用交易，请分别补齐 `buy` 与/或 `sell` 配置。
:::

- `buy`：购买规则
- `sell`：出售规则

---

## 💱 交易字段详解

常用字段：

- `type`：`vault` / `playerpoints`（默认 `vault`）
- `cost`：基础价格
- `function`：动态价格公式（可替代 cost）
- `limit.player`：个人限额，`-1` 不限
- `limit.server`：全服限额，`-1` 不限

> 当 `shop` 节点缺失时，该商品默认不可交易（可作为纯展示位）。

---

## 📈 动态公式占位符

可在 `function` 使用：

- `%prismmarket_buy_amount%`
- `%prismmarket_sell_amount%`
- `%prismmarket_buy_amount_server%`
- `%prismmarket_sell_amount_server%`

这些值会在交易时实时代入，用于构建价格曲线。

---

## ⚠️ 配置建议

- 展示物品与交易物品尽量分离思考：先定显示，再定交易规则
- `custom:xxx` 上线前先确认基准存在，避免回退材质
- 工具/附魔物品已启用紧凑展示策略，避免破坏原生 tooltip 层次
