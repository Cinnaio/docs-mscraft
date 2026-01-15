# Docs MSCraft

本仓库用于维护 **MSCraft 项目的官方文档站点**，  
基于 **Docusaurus + Cloudflare Pages** 构建，支持多人协作、自动部署。

---

## 🌐 在线访问

- 文档地址： https://mscraft.cn  
- 部署平台： Cloudflare Pages

> 推送到 `main` 分支后会自动构建并上线，无需手动操作。

---

## 📦 技术栈

- Node.js 18+
- Docusaurus
- GitHub（源码管理）
- Cloudflare Pages（构建 & 托管）

---

## 📁 项目结构说明

```text
.
├─ docs/              # 文档内容（主要协作目录）
│  ├─ feature/        # 功能说明
│  ├─ tutorial/       # 使用教程
│  └─ plugin/         # 团队开发插件说明
├─ src/               # Docusaurus 页面源码
├─ static/            # 图片 / 静态资源
├─ sidebars.js        # 侧边栏配置（建议仅维护者修改）
├─ docusaurus.config.js
├─ babel.config.js
├─ package-lock.json
├─ package.json
├─ LICENSE
├─ README.md
└─ .gitignore
