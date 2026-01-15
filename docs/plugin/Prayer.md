# Prayer - 自定义祭坛仪式插件

Prayer 是一个强大的 Minecraft 祭坛仪式插件，允许服主通过 WorldEdit 创建自定义结构的祭坛，并配置多种触发条件和奖励动作。支持严格的结构匹配、多种消耗需求（金币、点券、经验）以及 ItemsAdder 自定义物品。

## ✨ 主要功能

*   **自定义结构**：使用 WorldEdit 选区轻松创建祭坛模板，支持保存为 Schematic 文件。
*   **严格匹配**：精确检测方块结构，包括空气方块，防止玩家通过简单堆砌作弊。
*   **灵活触发**：
    *   支持原版物品或 **ItemsAdder** 自定义物品作为激活媒介。
    *   可配置丢弃物品的检测半径。
*   **多重消耗需求**：
    *   权限节点 (Permission)
    *   金币 (Vault Economy)
    *   点券 (PlayerPoints)
    *   经验等级 (Experience Level)
*   **丰富的动作系统**：
    *   `[console]`: 执行后台指令
    *   `[player]`: 以玩家身份执行指令
    *   `[op]`: 临时赋予 OP 权限执行指令
    *   `[message]`: 发送消息 (支持 RGB 颜色)
    *   `[title]`: 发送全屏标题 (支持 RGB 颜色)
*   **完全自定义消息**：
    *   支持 RGB 颜色 (格式 `&#RRGGBB`)。
    *   可自定义祭坛建立、激活提示、仪式开始、激活成功等各个阶段的文本。
    *   支持设置为空以静默执行。
*   **便捷开发**：
    *   游戏内指令一键创建模板。
    *   **配置文件热重载**：修改 `config.yml` 后自动生效，无需重启。

## 📦 依赖插件

*   **必须**: [WorldEdit](https://dev.bukkit.org/projects/worldedit) (用于结构保存和匹配)
*   **可选**:
    *   [Vault](https://www.spigotmc.org/resources/vault.34315/) + 经济插件 (用于金币消耗)
    *   [PlayerPoints](https://www.spigotmc.org/resources/playerpoints.80745/) (用于点券消耗)
    *   [ItemsAdder](https://www.spigotmc.org/resources/itemsadder.73355/) (用于自定义物品支持)

## 🛠️ 安装与使用

1.  下载插件 Jar 文件并放入 `plugins` 文件夹。
2.  确保已安装 WorldEdit 及其他所需前置。
3.  重启服务器。

### 如何创建一个祭坛

1.  **建造**：在游戏中搭建好你的祭坛结构。
2.  **选区**：使用 WorldEdit 木斧 (`//wand`) 选取整个祭坛结构（建议包含周围的空气，以防止玩家在祭坛上乱放方块）。
3.  **定位**：站在祭坛的核心位置，准星**对准**你希望作为“锚点”的方块（例如一个金块）。玩家只有放置这个方块才会触发结构检测。
4.  **指令**：输入 `/prayer create <ID> [触发物品] [半径]`。
    *   示例 1 (原版物品): `/prayer create sun_altar DIAMOND 3`
    *   示例 2 (ItemsAdder物品): `/prayer create magic_altar itemsadder:ruby 5`
5.  **完成**：插件会自动保存 Schematic 并生成配置。

### 玩家如何使用

1.  玩家按照模板结构搭建祭坛。
2.  最后放置“锚点方块”，如果结构正确，会收到建立成功的提示。
3.  在祭坛附近丢弃指定的触发物品。
4.  若满足所有条件（金币、权限等），仪式激活，消耗物品并执行奖励动作。

## 📜 指令与权限

| 指令 | 描述 | 权限 |
| :--- | :--- | :--- |
| `/prayer create <id> [item] [radius]` | 将当前选区保存为祭坛模板 | `prayer.admin` |
| `/prayer reload` | 手动重载配置文件 (通常不需要，支持热重载) | `prayer.admin` |

## ⚙️ 配置文件示例

```yaml
debug: false
templates:
  example_altar:
    anchor-material: GOLD_BLOCK
    schematic-file: "example.schem"
    # 锚点偏移 (自动生成)
    anchor-offset:
      x: 0
      y: 0
      z: 0
    
    # 触发物品: 支持原版物品名 (DIAMOND) 或 ItemsAdder ID (namespace:id)
    trigger-item: "itemsadder:ruby"
    trigger-radius: 3.0
    
    # 消耗与限制 (可选)
    permission: "prayer.use.example"
    cost: 100.0        # 金币
    points-cost: 50    # 点券
    exp-cost: 5        # 等级
    
    # 消息配置 (支持 RGB &#RRGGBB)
    # 留空 "" 则不发送该消息
    messages:
      created: "&a祭坛结构完整，请献上祭品..."
      activate-hint: "&7丢弃 &f红宝石 &7以激活"
      ritual-start: "&#FF0000仪式正在启动..."
      activated: "&a仪式完成！获得神力！"
      
    # 执行动作
    actions:
      - "[title] &#FF5555仪式完成;&b获得力量;10;70;20"
      - "[message] &e你感觉充满了力量！"
      - "[console] say %player% 激活了祭坛"
      - "[op] say 我获得了临时的OP力量！"
      - "[command] give %player% diamond 1"
```
