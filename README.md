# 群隙 ClusterGap Docs（VitePress）

## 中文（简体）

这是一个使用 **VitePress** 构建的文档站点（含中英文）。

### 本地运行

```bash
npm install
npm run docs:dev
```

打开终端输出的本地地址即可预览。

### 构建与预览（用于部署）

```bash
npm run docs:build
npm run docs:preview
```

- `docs:build` 会在构建前做两件事：
  - 尝试补全 Git 历史（用于 “最后提交于/最后提交者” 显示）
  - 压缩 `docs/public/images` 下的图片，并将原图备份到 `docs/public/images/_originals/`

### 目录结构速览

- **中文文档**：`docs/`
- **英文文档**：`docs/en/`
- **站点配置**：`docs/.vitepress/config.mts`
- **主题/样式**：`docs/.vitepress/theme/`
- **静态资源**（图片等）：`docs/public/`（访问路径以 `/` 开头，例如 `/images/logo.png`）

---

## 如何新增一篇文档（不懂 VitePress 也能用）

### 1) 新建 Markdown 文件

中文示例（会生成路由 `/my-page`）：

- 创建：`docs/my-page.md`
- 内容至少包含一个一级标题：

```md
# 我的新页面

这里写内容……
```

英文示例（会生成路由 `/en/my-page`）：

- 创建：`docs/en/my-page.md`

### 2) 把它挂到侧边栏（目前是手动的）

打开 `docs/.vitepress/config.mts`，在对应语言的 `themeConfig.sidebar` 里加一条：

- 中文 sidebar 例子：
  - `{ text: '我的新页面', link: '/my-page' }`
- 英文 sidebar 例子：
  - `{ text: 'My Page', link: '/en/my-page' }`

> 备注：目前只有 `BreweryX` 这块做了“自动 sidebar”，其他栏目还是手动维护。

---

## 如何给「酿酒 / BreweryX」新增文档（自动进入侧边栏）

本项目对 `BreweryX` 目录做了 **自动 sidebar**：只要往目录里新增 `.md` 文件，就会自动出现在侧边栏（标题取文件内第一个 `# 一级标题`）。

### 中文（酿酒）

1. 在目录下新增文件：`docs/tutorial/BreweryX/<slug>.md`
2. 在文件中写一个一级标题（用于侧边栏显示文字）：

```md
# 你的标题

正文……
```

3. 访问路径会是：`/tutorial/BreweryX/<slug>`

### English (BreweryX)

1. Create: `docs/en/tutorial/BreweryX/<slug>.md`
2. Add a first H1 title:

```md
# Your Title

Content…
```

3. Route: `/en/tutorial/BreweryX/<slug>`

---

## 图片怎么放？

- 放到：`docs/public/images/xxx.png`
- 在 Markdown 里引用：`/images/xxx.png`

构建时会自动压缩 `docs/public/images` 下图片；原图会备份到 `docs/public/images/_originals/`，便于随时还原。

---

## English

This is a documentation site built with **VitePress** (Chinese + English).

### Run locally

```bash
npm install
npm run docs:dev
```

### Build & preview (for deployment)

```bash
npm run docs:build
npm run docs:preview
```

`docs:build` also:

- fetches full Git history when needed (for “Last committed / Committed by”)
- optimizes images under `docs/public/images`, and backs up originals to `docs/public/images/_originals/`

### Structure

- **ZH docs**: `docs/`
- **EN docs**: `docs/en/`
- **Config**: `docs/.vitepress/config.mts`
- **Theme**: `docs/.vitepress/theme/`
- **Static assets**: `docs/public/` (served from `/`, e.g. `/images/logo.png`)

### Add a new doc page

1. Create a markdown file:
   - ZH: `docs/my-page.md` → `/my-page`
   - EN: `docs/en/my-page.md` → `/en/my-page`
2. Add it to the sidebar in `docs/.vitepress/config.mts` (most sections are manual right now).

### Add a new BreweryX page (auto sidebar)

- ZH: add a file under `docs/tutorial/BreweryX/*.md`
- EN: add a file under `docs/en/tutorial/BreweryX/*.md`

The sidebar items are generated automatically from filenames + the first `# H1` title in each file.

