# ⌨️ 指令与权限

## 玩家指令

- 打开默认商店：
  ```bash
  /pm
  ```
- 打开指定商店：
  ```bash
  /pm open <shopId>
  ```

## 管理指令

### 重载类

- 重载配置与商店：
  ```bash
  /pm reload config
  ```
- 重载 custom 基准内存：
  ```bash
  /pm reload memory
  ```

### debug 类

- 保存主手物品为基准：
  ```bash
  /pm debug saveitem <itemId>
  ```
- 随机组状态/强制刷新/测试刷新：
  ```bash
  /pm debug change <shopId> info
  /pm debug change <shopId> force confirm
  /pm debug change <shopId> test <seconds>
  /pm debug change <shopId> test
  ```
- 内存观测：
  ```bash
  /pm debug memory random
  /pm debug memory player <player>
  /pm debug memory custom
  ```

### 日志类

- 查询交易日志：
  ```bash
  /pm logs <player> [page]
  ```

## 权限节点

- `prismmarket.use`：允许执行主命令
- `prismmarket.admin`：允许 reload/debug/logs 管理动作

## 行为说明

- 主命令：`/prismmarket`
- 别名：`/pm`
- 命令在控制台与玩家端行为不同（如 open/debug saveitem 需要玩家上下文）
- `debug: true` 时会输出更多排障日志（包括 custom 恢复分支信息）
