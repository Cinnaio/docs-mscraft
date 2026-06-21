# 方块/家具查询编辑指南

本文档说明如何向[方块/家具查询](/block-list/)页面添加、修改或删除条目。

## 数据文件位置

所有方块数据集中在一个文件中：

```
docs/.vitepress/theme/components/block-list-data.ts
```

编辑此文件后，重启 `npm run docs:dev` 即可预览效果。

## 基础结构

每个条目是一个 `BlockEntry` 对象，添加到 `allBlocks` 数组中：

```typescript
{
  id: 'unique-block-id',      // 必填，kebab-case 唯一标识
  icon: '/images/xxx/icon.png',  // 必填，图标路径
  nameZh: '方块中文名',        // 必填
  nameEn: 'Block English Name', // 必填
  categoryZh: '功能性方块',    // 必填，从下方分类中选择
  categoryEn: 'Functional Block', // 必填
  descriptionZh: '简短描述。',  // 必填，1~2 行
  descriptionEn: 'Short description.', // 必填
  obtainZh: '获取方式说明',     // 必填，可使用 HTML 标签
  obtainEn: 'How to obtain',    // 必填
  properties: { '硬度': '2.0' },  // 可选，属性键值对
  relatedIds: ['other-id'],     // 可选，关联方块 id 列表
}
```

## 分步操作

### 添加新条目

1. 打开 `docs/.vitepress/theme/components/block-list-data.ts`
2. 找到 `allBlocks` 数组（约第 66 行）
3. 在数组末尾（最后一个 `]` 之前）追加新对象
4. **注意**：前一个条目末尾要有逗号

示例——添加一个新方块：

```typescript
  // ─── 你自定义的分类 ───
  {
    id: 'my-custom-block',
    icon: '/images/teastory/my_block_icon.png',
    nameZh: '自定义方块',
    nameEn: 'My Custom Block',
    categoryZh: '装饰方块',
    categoryEn: 'Decoration',
    descriptionZh: '这是一个示例方块。',
    descriptionEn: 'This is an example block.',
    obtainZh: '工作台合成',
    obtainEn: 'Crafted at a crafting table',
    properties: { '硬度': '1.5', '发光等级': '0' },
    relatedIds: ['paddy-field'],
  },
```

### 修改条目

直接找到对应 `id` 的对象，修改任意字段即可。

### 删除条目

找到对应的对象，删除从 `{` 到 `},` 的整段代码。

## 可用分类

| 中文 | English |
|------|---------|
| 功能性方块 | Functional Block |
| 家具 | Furniture |
| 工具 | Tool |
| 容器 | Container |
| 植物与作物 | Plants & Crops |
| 装饰方块 | Decoration |
| 灯具 | Lighting |
| 其他 | Other |

## 字段规范

### `id`
- 格式：kebab-case（全小写，连字符分隔）
- 示例：`paddy-field`、`wooden-mortar-pestle`、`item-xian-rice-seedling`
- 必须唯一，不可重复

### `icon`
- 路径相对于站点根目录
- 图标建议 32×32 像素 PNG，透明背景，`image-rendering: pixelated`
- 图片放在 `docs/public/images/` 下
  - Teastory 相关图标放 `docs/public/images/teastory/`
  - 其他方块建议新建目录如 `docs/public/images/blocks/`

### `nameZh` / `nameEn`
- 中英文名称都必须填写
- 英文名首字母大写（"Paddy Field" 而非 "paddy field"）

### `descriptionZh` / `descriptionEn`
- 1~2 行简短描述
- 中英文都必须填写
- 不需要句号结尾的无特殊要求

### `obtainZh` / `obtainEn`
- 获取方式说明
- 支持 HTML 标签，如 `<span class="item-chip"><img src="..." alt="" />物品名</span>`
- 纯文字说明也可以，如 `'工作台合成'`

### `properties`
- 可选字段，不填则不显示属性表格
- 键值对格式，key 为属性名（中文），value 为属性值
- 示例：
  ```typescript
  properties: {
    '硬度': '2.0',
    '爆炸抗性': '3.0',
    '工具': '任何锹',
    '发光等级': '15',
  }
  ```

### `relatedIds`
- 可选字段，用于在详情弹窗底部显示关联方块
- 值为其他条目的 `id` 数组
- 示例：`['tea-seeds', 'paddy-field']`
- 引用的 id 必须存在于 `allBlocks` 中，否则不显示

## 图标准备

1. 准备方块图标（建议 32×32 PNG，像素风）
2. 放入 `docs/public/images/` 下合适目录
3. 在 `icon` 字段填写路径，如 `/images/blocks/my_block.png`

现有图标目录说明：

| 目录 | 用途 |
|------|------|
| `/images/teastory/` | TeaStory 茶道相关物品（约 105 个） |
| `/images/` | 通用截图和 logo |

> **提示**：如果还没有图标，可以先借用 `teastory/` 下已有图标测试，正式上线前替换。

## 完整示例

以下是一个完整条目的参考：

```typescript
{
  id: 'pot-zisha',
  icon: '/images/teastory/pot_zisha.png',
  nameZh: '紫砂壶',
  nameEn: 'Zisha Pot',
  categoryZh: '功能性方块',
  categoryEn: 'Functional Block',
  descriptionZh: '紫砂材质茶壶，保温性能优异，冲泡的茶饮品质更佳。',
  descriptionEn: 'Zisha clay tea pot with excellent heat retention, producing higher quality tea.',
  obtainZh: '使用 <span class="item-chip"><img src="/images/teastory/zisha_clay.png" alt="紫砂泥" />紫砂泥</span> 在工作台合成',
  obtainEn: 'Crafted from zisha clay',
  properties: {
    '保温加成': '+15%',
  },
  relatedIds: ['zisha-clay', 'zisha-clay-cup'],
},
```

## 注意事项

- **不要删除或修改** `allBlocks` 数组前后的代码（类型定义、分类列表等）
- 添加条目时注意在 `allBlocks` 数组**最后一个元素后面不能有逗号**，但前面每个元素末尾都要有逗号
- 保持条目按**分类分组**，用注释 `// ─── 分类名 ───` 分隔
- 尽量保持英文翻译同步更新，不要只写中文
- 编辑完成后运行 `npm run docs:dev` 确认页面正常渲染
