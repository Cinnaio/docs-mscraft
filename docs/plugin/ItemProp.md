# ItemProp - 自定义物品插件

ItemProp 是一个轻量级但功能强大的 Minecraft Spigot/Paper/Folia 插件，允许你为物品绑定自定义指令、药水效果和交互行为。它支持通过配置文件灵活定义物品属性，并提供了便捷的游戏内管理命令。

## ✨ 主要特性

*   **全平台支持**: 完美支持 **Spigot**, **Paper**, 以及 **Folia** 服务端（支持多线程区域化更新）。
*   **指令绑定**: 将手持物品与配置文件中的 ID 绑定，右键即可触发一系列动作。
*   **丰富的动作支持**:
    *   发送标题 (`[title]`) 和消息 (`[message]`)。
    *   给予药水效果 (`[potion]`)。
    *   多种指令执行身份：控制台 (`[console]`)、临时 OP (`[op]`) 或玩家自身 (`[player]`)。
*   **物品属性编辑**: 游戏内直接修改物品名称和 Lore，**完美支持 RGB 颜色** (`&#RRGGBB`)。
*   **智能管理**:
    *   支持物品消耗设置（右键后数量 -1）。
    *   **命令反馈检查**：支持检查控制台命令执行结果，仅在成功时消耗物品（Folia 环境下该功能受限）。
    *   配置文件**自动热重载**，修改后立即生效，无需重启服务器。
    *   完善的 Tab 补全支持。

## 🛠️ 安装与使用

1.  下载插件 jar 文件并放入服务器的 `plugins` 目录。
2.  启动服务器生成默认配置文件。
3.  编辑 `plugins/ItemProp/config.yml` 添加你的自定义物品配置。
4.  在游戏中使用 `/ipp bind <id>` 将配置绑定到手持物品。

## 📜 命令列表

主命令别名：`/ipp` 或 `/itemprop`

| 命令 | 描述 | 权限 |
| :--- | :--- | :--- |
| `/ipp bind <id>` | 将手持物品绑定到配置文件的指定 ID | `itemprop.use` |
| `/ipp name <文本>` | 修改手持物品的名称 (支持 RGB) | `itemprop.use` |
| `/ipp lore add <文本>` | 添加一行 Lore (支持 RGB) | `itemprop.use` |
| `/ipp lore set <行> <文本>` | 修改指定行 Lore | `itemprop.use` |
| `/ipp lore remove <行>` | 移除指定行 Lore | `itemprop.use` |
| `/ipp lore clear` | 清空所有 Lore | `itemprop.use` |
| `/ipp check` | 查看当前物品的绑定信息 | `itemprop.use` |
| `/ipp nbt` | 查看物品的 NBT 标签 (调试用) | `itemprop.use` |
| `/ipp reload` | 手动重载配置文件 | `itemprop.admin` |

## ⚙️ 配置指南 (config.yml)

```yaml
items:
  # 自定义 ID (例如 "super_cookie")
  super_cookie:
    commands:
      # 动作列表
      - "[title] &b能量爆发! | &7你吃下了超级饼干"
      - "[message] &#00FFAA你感到充满了力量..."
      - "[potion] SPEED 10 2"      # 给予速度 II，持续 10 秒
      - "[potion] REGENERATION 5 1" # 给予生命恢复 I，持续 5 秒
      - "[console] give %player% diamond 1" # 控制台给予奖励
    consume: true # 使用后是否消耗物品 (true/false)

  # 示例：仅当命令成功时消耗
  lucky_box:
    commands:
      # 如果开启了 require_success，且此命令执行失败（无输出或被插件取消），物品将不会被消耗
      # 注意：此功能在 Folia 环境下不可用（会自动忽略检查）
      - "[console] give %player% diamond 1"
    consume: true
    require_success: true # 开启成功检查 (默认为 false)
```

### 动作标签说明

| 标签 | 格式 | 说明 |
| :--- | :--- | :--- |
| **消息** | `[message] <文本>` | 发送聊天栏消息 |
| **标题** | `[title] <主标题> \| <副标题>` | 发送屏幕标题 |
| **药水** | `[potion] <效果> <秒数> <等级>` | 给予药水效果 (等级 1=I, 2=II) |
| **控制台** | `[console] <指令>` | 以控制台身份执行指令 |
| **临时OP** | `[op] <指令>` | 临时赋予玩家 OP 权限执行指令 |
| **玩家** | `[player] <指令>` | 以玩家身份执行指令 (默认) |

### 变量与颜色

*   **变量**: `%player%` 会被替换为使用物品的玩家名称。
*   **颜色代码**:
    *   标准颜色: `&a`, `&b`, `&c`, `&1`...
    *   **RGB 颜色**: `&#RRGGBB` (例如 `&#FF5555` 为红色, `&#00FFAA` 为青色)
    *   可在名称、Lore、标题和消息中随意混合使用。

## ⚠️ Folia 支持特别说明

ItemProp 已经针对 **Folia** 进行了适配，支持在多线程区域化环境下运行。

由于 Folia 的异步特性，存在以下差异：
*   **require_success (命令反馈检查)**: 在 Folia 环境下，控制台命令是异步调度的，无法立即获取执行结果。因此，在 Folia 服务器上，`require_success: true` 设置将被**忽略**，插件会记录一条警告并继续执行（即默认视为成功）。
*   **命令调度**: 所有的 `[console]` 命令会通过 Folia 的 `GlobalRegionScheduler` 调度执行，确保线程安全。

## 🏗️ 构建项目

本项目使用 Gradle 构建。

```bash
# Windows
./gradlew build

# Linux/Mac
./gradlew build
```

构建产物位于 `build/libs/` 目录。

## 📄 许可证

本项目采用 MIT 许可证。
