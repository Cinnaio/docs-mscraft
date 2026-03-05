# 🔗 自定义物品与 CraftEngine

## A. `custom:xxx` 基准体系

`custom:xxx` 是 PrismMarket 自带的基准物品机制。  
它的目标是：**保证展示、发放、校验使用同一份物品基准**。

### 数据存储模型

基准表 `pm_item_benchmark` 主要字段：

- `item_id`：基准 ID
- `hash`：归一化 NBT 哈希，用于校验
- `material`：兜底材质
- `nbt`：SNBT 文本（用于重建）

### 运行时恢复逻辑

1. 先查内存缓存
2. 缓存不存在时读数据库
3. 优先用 `nbt` 重建完整 ItemStack
4. 若重建失败，回退到 `material`

### 如何录入基准

1. 管理员手持目标物品
2. 执行：
   ```bash
   /pm debug saveitem <itemId>
   ```
3. 商店中引用：
   ```yaml
   material: custom:<itemId>
   ```

### 校验机制

- 出售/收购物品时可按基准 `hash` 校验
- 若当前物品与基准不匹配，将拒绝交易，降低伪造风险

### 默认示例基准

为避免首次安装 `custom:example` 无数据，系统会在缺失时自动写入一条默认示例基准。

---

## B. CraftEngine 物品接入

PrismMarket 支持直接使用 CraftEngine 物品：

```yaml
material: craftengine:namespace:id
```

示例：

```yaml
material: craftengine:internal:cooking_info
```

对 CE 物品：

- 显示与匹配优先走 CE 提供能力
- 不依赖 `custom:xxx` 基准表
- 可与 CE 资源包生态并行使用

---

## C. 使用场景建议

- 要由 PrismMarket 统一管理物品基准：用 `custom:xxx`
- 已在 CraftEngine 内管理完整资源：用 `craftengine:...`
- 两者可并存：按商品来源拆分
