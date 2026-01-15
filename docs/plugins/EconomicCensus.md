# Economic Census System - 经济普查系统

一款专为 Minecraft 服务器打造的高级经济监控系统。通过实现一个高优先级的 Vault Economy 包装器，对服务器内的每一笔资金流动进行严格的拦截、审计与记录。

## 核心组件

### EconomicCensus 插件 (Spigot/Paper)
- **Vault 拦截器 (Wrapper)**：以 `ServicePriority.Highest` 优先级注册，确保能够拦截并记录所有的 `withdraw`/`deposit` 操作。
- **智能来源识别**：利用堆栈分析技术 (Stack Trace Analysis) 自动识别资金变动的来源插件（如商店插件 QuickShop、职业插件 Jobs、或 CMI 自带指令）。
- **原生事件监听**：除了 Vault API，还额外监听 CMI 和 Essentials 的原生经济事件，确保 `/money give` 等管理指令也能被记录。
- **异步高性能日志**：使用 HikariCP 连接池与异步线程将数据写入 MySQL/PostgreSQL，对服务器 TPS 零影响。
- **数据安全**：本插件仅负责“审计”与“拦截”，实际的余额存储与计算仍全权委托给您现有的经济插件（如 CMI, Essentials），确保玩家资产安全。

## 数据库架构 (Database Schema)

插件启动时会自动在数据库中创建 `economy_logs` 表，核心字段定义如下：

| 字段名 | 类型 | 说明 | 示例 |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | 自增主键 | 1 |
| `timestamp` | TIMESTAMP | 交易发生时间 | 2024-01-01 12:00:00 |
| `player_uuid` | VARCHAR(36) | 玩家 UUID | 550e8400-e29b-41d4-a716-446655440000 |
| `player_name` | VARCHAR(16) | 玩家名称 | Steve |
| `amount` | DOUBLE | 变动金额 (保留2位小数) | 100.50 |
| `type` | VARCHAR(10) | 变动方向 | `IN` (收入), `OUT` (支出) |
| `balance_before` | DOUBLE | 变动前余额 | 500.00 |
| `balance_after` | DOUBLE | 变动后余额 | 600.50 |
| `world` | VARCHAR(64) | 玩家所在世界 | world |
| `source_plugin` | VARCHAR(64) | 来源插件 (自动识别) | `QuickShop`, `CMI-Native`, `Jobs` |
| `thread_name` | VARCHAR(64) | 调用线程名 | Server thread |

> **注意**：所有金额字段在入库前均经过 `RoundingMode.HALF_UP` 处理，严格保留两位小数，避免浮点数精度问题。

## 安装指南

### 插件部署
1. **构建**：在项目根目录执行构建命令：
   ```bash
   ./gradlew shadowJar
   ```
2. **安装**：将构建生成的 `build/libs/EconomicCensus-1.0-SNAPSHOT-all.jar` 文件复制到服务器的 `plugins/` 文件夹中。
3. **配置**：启动一次服务器以生成配置文件，然后编辑 `plugins/EconomicCensus/config.yml` 填入您的数据库信息。
   ```yaml
   database:
     url: "jdbc:mysql://localhost:3306/minecraft" # 支持 PostgreSQL
     user: "root"
     password: "password"
   ```
4. **重启**：重启服务器即可生效。

## 常用指令
- `/census debug`: 检查当前生效的经济插件提供者，验证拦截是否成功以及是否被其他插件覆盖。

## 故障排查

- **数据库无数据**：
  - 检查启动日志中是否有 `Database self-test passed`。
  - 检查是否有 `Logging TX` 日志输出。
- **拦截失败**：
  - 使用 `/census debug` 确认 `Current Economy Provider` 是否为 `CensusEconomy`。
  - 如果不是，说明有其他插件以更高优先级覆盖了注册，请检查插件加载顺序。

## 技术架构
- **Vault Hook**: 插件会在 `STARTUP` 阶段及 `ServiceRegisterEvent` 事件中动态侦测并包装已加载的经济插件。
- **Native Hook**: 通过反射机制直接监听 CMI / Essentials 的底层事件，捕获绕过 Vault 的操作。
- **Database**: 支持 MySQL 和 PostgreSQL，自动建表。
