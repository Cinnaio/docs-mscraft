# ClusterGap 文档站

<p align="center">
  <a href="https://mscraft.uk">
    <img src="/images/logo.png" alt="ClusterGap Logo" width="80" height="80" style="border-radius: 50%;">
  </a>
</p>

<p align="center">
  <strong>群隙 ClusterGap</strong> — 玩家驱动的轻度经济社会模拟 Minecraft 服务器文档
</p>

<p align="center">
  <a href="https://mscraft.uk">🌐 访问官网</a> •
  <a href="https://mscraft.uk/getting-started">📖 在线文档</a>
</p>

---

## 📋 简介

本项目是 **群隙 (ClusterGap)** 服务器的双语文档站点，基于 [VitePress](https://vitepress.dev/) 构建，提供中文/English 两种语言支持。

### 核心特色

- 🏮 **中式主题** — 建筑风格、节气活动、茶道与酿造等传统文化元素
- 🌱 **季节玩法** — 四季更替的独特世界体验
- 🤝 **社会模拟** — 玩家驱动的经济、市场与契约系统
- ⛏️ **生存 SMP** — 长期生存、探索与协作

### 文档涵盖

- 新手指南与服务器规则
- 玩法教程（茶道、经济附魔、交通运输等）
- 领地系统与居住指南
- 反馈与建议通道

---

## 🛠️ 技术栈

- **框架**: VitePress v2
- **构建工具**: Vite
- **图片处理**: Sharp
- **部署平台**: 静态站点托管

---

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run docs:dev
```

启动后访问 `http://localhost:5173`

### 构建生产版本

```bash
npm run docs:build
```

### 预览构建结果

```bash
npm run docs:preview
```

---

## 📁 项目结构

```
.
├── docs/                      # 文档源文件
│   ├── .vitepress/            # VitePress 配置
│   │   ├── config.mts         # 站点配置
│   │   └── theme/             # 自定义主题
│   │       ├── components/    # Vue 组件
│   │       ├── utils/         # 工具函数
│   │       └── style.css      # 样式覆盖
│   ├── public/               # 静态资源
│   │   └── images/           # 图片文件
│   ├── index.md               # 中文首页
│   ├── getting-started.md    # 新手指南
│   ├── server-faq.md         # 服务器规则
│   ├── residence.md          # 居住领地
│   ├── feedback.md           # 反馈建议
│   ├── team.md               # 团队页面
│   ├── tutorial/             # 教程目录
│   │   ├── Teastory.md       # 茶道
│   │   ├── EcoEnchants.md    # 经济附魔
│   │   └── transportation.md # 交通运输
│   ├── _team-history/        # 团队历史
│   └── en/                   # 英文文档
│       └── ...               # 与中文对应
├── scripts/                  # 构建脚本
│   ├── optimize-images.js    # 图片优化
│   └── unshallow-git.js      # Git 历史补全
├── package.json
└── README.md
```

---

## 📝 添加新文档

1. 在 `docs/`（中文）或 `docs/en/`（英文）下创建 `.md` 文件
2. 在 `docs/.vitepress/config.mts` 的 `sidebar` 中添加链接

> **注意**: 若在 `docs/tutorial/` 目录下添加新文档，需手动配置侧边栏。

---

## 🎨 自定义主题

主题基于 VitePress 默认主题进行定制，主要包括：

- **配色方案**: 奶茶/奶油感低饱和品牌色
- **选中文字**: 柔和高亮样式
- **自定义组件**:
  - `ServerStatus` - 服务器状态显示
  - `SiteContributors` - 贡献者列表
  - `HomeShowcase` - 首页展示区块

---

## 📄 许可证

本项目文档基于 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可证。

---

## 🤝 贡献

欢迎提交 Pull Request 或 Issue！

---

## 📧 联系方式

- 服务器官网: https://mscraft.uk
- 文档反馈: https://mscraft.uk/feedback