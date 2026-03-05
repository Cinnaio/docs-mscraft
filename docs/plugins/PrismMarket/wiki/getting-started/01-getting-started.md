# ✨ 快速开始

> 本章目标：10 分钟内完成 PrismMarket 首次可用部署。

:::danger 警告
请确保使用 Java 21+ 与可用的经济插件（Vault 生态）。  
在不满足环境要求的情况下部署，可能导致无法启动或交易异常。
:::

## 运行环境要求

- Java：**JDK 21+**
- 服务端：Paper 及兼容分支（含 Folia）
- 必需依赖：
  - Vault
  - 任意 Vault 兼容经济插件
- 可选依赖：
  - PlaceholderAPI（文本占位符）
  - PlayerPoints（点券货币）
  - CraftEngine（自定义物品生态）

## 安装流程

1. 将 `PrismMarket.jar` 放入 `plugins/`
2. 启动服务器（首次启动会生成默认配置）
3. 检查控制台日志确认依赖正常
4. 进入 `plugins/PrismMarket/` 按需修改配置
5. 使用命令重载：
   ```bash
   /pm reload config
   ```

:::tip 提示
首次启动后请浏览 `plugins/PrismMarket/` 目录，确认已生成默认配置与示例商店。  
建议先在测试服演练配置与交易流程，再迁移至生产环境。
:::

## 关键目录结构

- 主配置：`plugins/PrismMarket/config.yml`
- 商店配置：`plugins/PrismMarket/shop/*.yml`
- 语言文件：`plugins/PrismMarket/languages/*.yml`
- 数据库：
  - SQLite：`plugins/PrismMarket/database.db`
  - MySQL：按 `config.yml > database` 连接

## 首次启动自动行为

- 初始化交易统计缓存
- 初始化随机轮换状态
- 初始化基准物品缓存（custom benchmark）
- 若缺少 `custom:example` 基准，系统会自动写入一条带附魔/NBT 的示例记录，避免示例商店首次显示异常

## 验收清单

- 控制台没有 Vault 缺失报错
- 玩家可执行 `/pm` 打开商店
- 指定商店可打开：
  ```bash
  /pm open default
  ```
- 修改配置后重载成功：
  ```bash
  /pm reload config
  ```

## 下一步

完成基础部署后，建议继续阅读：

- [商店配置总览](../configuration/shop-config)
- [主配置详解（config.yml）](../configuration/config-reference)
