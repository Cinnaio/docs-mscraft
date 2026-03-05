# 🖼️ 布局系统与 Pattern 设计

:::info 信息
布局由 `mappings + patterns + items` 三者组合完成，可视为“字符画驱动 GUI”的实现。
:::

## 设计思路

PrismMarket 布局由 `mappings + patterns + items` 组合实现。  
你可以把它理解为“字符画驱动 GUI”。

## mappings

用于定义符号含义：

- 边框
- 固定物品
- 占位符映射（尤其随机位）

示例：

```yaml
mappings:
  '#':
    material: GRAY_STAINED_GLASS_PANE
```

## patterns

每个字符串代表一行，每个字符对应一个槽位。

:::warning 警告
所有 `patterns` 行的字符串长度必须一致，否则会造成槽位错位与点击异常。
:::

示例：

```yaml
patterns:
  - - '#########'
    - '#  `diamond`  #'
    - '#########'
```

## item 引用规则

- `` `itemId` ``：直接引用 `items.itemId`
- `%prismmarket_random_xxx%`：动态随机位

## 布局建议
:::tip 提示
先以占位符与边框完成整体布局，再逐步替换为具体 `items`，能显著减少改动成本。
:::

- 先固定边框与导航位，再放商品位
- 随机位尽量成组排布，便于玩家识别“今日/本周变动位”
- 保留空位给后续活动商品，避免频繁改 layout

## 常见问题

- 图形错位：检查 pattern 行长度是否一致
- 点击无效：检查该位置最终是否映射到可交易 item
