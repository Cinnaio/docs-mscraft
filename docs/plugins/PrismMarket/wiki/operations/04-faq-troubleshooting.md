# 🧯 常见问题与排查

## Q1：`/pm` 无法打开商店

优先排查：

1. Vault 与经济插件是否正常加载
2. 玩家是否有 `prismmarket.use`
3. `config.yml > default-shop` 是否存在对应商店文件
4. 控制台是否出现商店解析错误

## Q2：custom 商品显示成基础材质

高频原因：

- `custom:ID` 未录入基准
- 基准 `nbt` 无法恢复
- memory 缓存未刷新

建议流程：

1. 手持目标物品执行：
   ```bash
   /pm debug saveitem <itemId>
   ```
2. 执行：
   ```bash
   /pm reload memory
   ```
3. 检查：
   ```bash
   /pm debug memory custom
   ```

## Q3：点击交易无反馈或失败

检查维度：

- 余额不足
- 背包空间不足（买入）
- `shop.buy`/`shop.sell` 节点缺失
- 触发个人/全服限额
- 命中刷新阻断窗口

## Q4：MiniMessage 解析异常

若文本来源含 legacy 格式（如 `§a`、`§x§R§R...`），当前版本会自动兼容。  
若仍异常，重点检查：

- 外部占位符返回值
- 语言文件中是否混入非法标签

## Q5：数据库该用 SQLite 还是 MySQL

- SQLite：单服、低运维成本（默认）
- MySQL：多实例/统一数据管理

切换后建议：

1. 备份原库
2. 首次启动观察表初始化
3. 运行基础交易回归（买入/卖出/日志）

## Q6：如何快速做线上健康检查

建议每天例行：

1. `/pm open <shopId>` 抽查 GUI 打开
2. 执行 1 次买入 + 1 次卖出
3. `/pm logs <player> 1` 验证日志写入
4. 检查随机商店下一次刷新时间
