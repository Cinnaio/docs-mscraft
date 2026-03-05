# ⚙️ 主配置详解（config.yml）

:::danger 警告
修改价格函数、刷新周期等高风险字段前，请备份并采用双人复核流程。  
建议在测试服演练配置后再上线，避免影响正式交易。
:::

## 基础项

- `debug`：调试开关（影响日志详细度）
- `default-shop`：`/pm` 默认打开商店 ID

## database

```yaml
database:
  type: sqlite # sqlite / mysql
  host: localhost
  port: 3306
  database: prismmarket
  user: root
  password: ""
```

### 字段说明

- `type=sqlite`：使用本地 `database.db`
- `type=mysql`：走远程 MySQL 连接参数

## random

```yaml
random:
  refresh-blocking-seconds: 3
  startup-refresh-check: true
  check-strategy: "dynamic"
```

### 关键逻辑

- `refresh-blocking-seconds`：刷新前阻断交易，避免边界并发
- `startup-refresh-check`：启动时补偿检查
- `check-strategy`：
  - `default`：固定高频检测
  - `dynamic`：按下次刷新动态调整检测频率

## ✅ 推荐配置模板

### 轻量单服

- `database.type: sqlite`
- `random.check-strategy: dynamic`
- `debug: false`

### 多服/集中运维

- `database.type: mysql`
- 使用独立 DB 用户
- 发布期可临时 `debug: true`，稳定后关闭
