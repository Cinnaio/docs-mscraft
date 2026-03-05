# conomic Census System Http - 经济普查系统可视化

这是一个现代化的全栈 Web 应用，用于可视化分析 Minecraft 服务器的经济数据。通过直观的图表和交互式界面，帮助腐竹（服务器管理员）实时监控资金流向、玩家活跃度及插件经济占比。

## ✨ 主要功能

*   **📊 实时数据大屏**：
    *   **核心指标**：总流入、总流出、净流入、交易次数、活跃玩家数。
    *   **趋势图表**：资金流向折线图（支持按天/周/月切换）。
    *   **占比分析**：各插件（如 QuickShop, CMI 等）的经济贡献占比饼图。
*   **🔍 交互式详情钻取**：
    *   点击任意指标卡片即可查看详细数据。
    *   **交易明细**：查看每一笔交易的时间、玩家、类型（收入/支出）、金额及来源。
    *   **玩家排行**：按交易流水自动排序的玩家活跃度榜单。
*   **📂 数据导出**：支持一键导出当前报表为 **Excel** 表格或 **PDF** 文档。
*   **🔌 智能连接**：
    *   支持 `.env` 配置文件自动连接数据库。
    *   内置状态检测，自动映射插件名称（如自动将 `Economy_Vault` 显示为 `QuickShop`）。
*   **🎨 现代化 UI**：基于 Element Plus 的圆角设计，自适应布局，提供舒适的用户体验。

## 🛠️ 技术栈

*   **前端**：Vue 3, TypeScript, Vite, Element Plus, ECharts
*   **后端**：Node.js, Express
*   **数据库**：MySQL
*   **工具库**：Axios, Day.js, XLSX, jsPDF, html2canvas

## 🚀 快速开始

### 1. 环境准备
*   [Node.js](https://nodejs.org/) (推荐 v16+)
*   MySQL 数据库

### 2. 安装依赖
在项目根目录下运行终端命令：

```bash
npm install
```

### 3. 数据库配置
在项目根目录创建一个 `.env` 文件（可以直接复制 `.env.example`），并填入您的 MySQL 数据库信息：

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=您的数据库密码
DB_NAME=minecraft_economy
PORT=3000
```

> **注意**：您的数据库中需要有一个名为 `economy_logs` 的表。如果尚未创建，请参考下方的[数据库表结构](#-数据库表结构)。

### 4. 启动开发环境

您需要同时启动前端和后端服务：

**终端 1 (后端 API):**
```bash
node server.js
```
*如果看到 `Server running on port 3000` 和 `Connected to MySQL database`，说明后端启动成功。*

**终端 2 (前端页面):**
```bash
npm run dev
```
*点击终端显示的 Local 链接（通常是 `http://localhost:5173`）即可在浏览器访问。*

## 📦 部署上线

当您准备将项目部署到生产服务器时：

1.  **构建前端资源**：
    ```bash
    npm run build
    ```
    这会在项目目录下生成一个 `dist` 文件夹，里面包含了所有静态网页文件。

2.  **上传文件到服务器**：
    请上传以下文件/文件夹：
    *   `dist/` 文件夹
    *   `server.js`
    *   `package.json`
    *   `.env`

3.  **在服务器上运行**：
    ```bash
    # 安装生产环境依赖
    npm install --production

    # 启动服务
    node server.js
    ```
    现在，您可以通过 `http://服务器IP:3000` 访问您的经济分析面板了。

    > 推荐使用 `pm2` 来让服务在后台常驻运行：`pm2 start server.js --name economy-dashboard`

## 🗄️ 数据库表结构

项目依赖 `economy_logs` 表，请确保您的数据库中有此表。基础结构如下：

```sql
CREATE TABLE IF NOT EXISTS `economy_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` datetime NOT NULL,
  `player_name` varchar(64) NOT NULL,
  `player_uuid` varchar(36) DEFAULT NULL,
  `amount` decimal(15,2) NOT NULL,
  `type` enum('IN','OUT') NOT NULL,
  `source_plugin` varchar(64) DEFAULT NULL,
  `world` varchar(64) DEFAULT NULL,
  `balance_after` decimal(15,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_timestamp` (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## 📝 常见问题

**Q: 为什么显示“未检测到后端连接”？**
A: 请检查您是否运行了 `node server.js`。前端页面需要依赖后端服务来读取数据库。

**Q: 为什么图表没有数据？**
A: 请检查右上角的“日期”和“时间维度”选择是否正确，或者数据库中该时间段内是否有交易记录。

**Q: 如何修改数据库密码？**
A: 修改项目根目录下的 `.env` 文件，然后**重启后端服务** (`node server.js`)。

---
Made with ❤️ for Minecraft Server Admins
