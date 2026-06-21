# Block/Furniture Query Editor Guide

This document explains how to add, modify, or remove entries in the [Block/Furniture Query](/en/block-list/) page.

## Data File Location

All block data is stored in a single file:

```
docs/.vitepress/theme/components/block-list-data.ts
```

After editing, restart `npm run docs:dev` to preview changes.

## Basic Structure

Each entry is a `BlockEntry` object added to the `allBlocks` array:

```typescript
{
  id: 'unique-block-id',       // Required, kebab-case unique identifier
  icon: '/images/xxx/icon.png',   // Required, icon path
  nameZh: '方块中文名',         // Required
  nameEn: 'Block English Name',  // Required
  categoryZh: '功能性方块',     // Required, choose from categories below
  categoryEn: 'Functional Block', // Required
  descriptionZh: '简短描述。',   // Required, 1-2 lines
  descriptionEn: 'Short description.', // Required
  obtainZh: '获取方式说明',      // Required, supports HTML tags
  obtainEn: 'How to obtain',     // Required
  properties: { '硬度': '2.0' },   // Optional, key-value pairs
  relatedIds: ['other-id'],      // Optional, list of related block IDs
}
```

## Step-by-Step

### Adding a New Entry

1. Open `docs/.vitepress/theme/components/block-list-data.ts`
2. Locate the `allBlocks` array (around line 66)
3. Append a new object before the closing `]`
4. **Note**: the previous entry must end with a comma

Example — adding a new block:

```typescript
  // ─── Your Category ───
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

### Modifying an Entry

Find the object by its `id` and edit any field directly.

### Deleting an Entry

Delete the entire block from `{` to `},` for the target entry.

## Available Categories

| CategoryZh | CategoryEn |
|------|---------|
| 功能性方块 | Functional Block |
| 家具 | Furniture |
| 工具 | Tool |
| 容器 | Container |
| 植物与作物 | Plants & Crops |
| 装饰方块 | Decoration |
| 灯具 | Lighting |
| 其他 | Other |

## Field Guidelines

### `id`
- kebab-case (lowercase, hyphen-separated)
- Examples: `paddy-field`, `wooden-mortar-pestle`, `item-xian-rice-seedling`
- Must be unique

### `icon`
- Path relative to site root
- Recommended: 32×32 PNG, transparent background, pixel art style
- Place images under `docs/public/images/`
  - Teastory items → `docs/public/images/teastory/`
  - Other blocks → create a new directory like `docs/public/images/blocks/`

### `nameZh` / `nameEn`
- Both required, fill in both languages
- English names: title case ("Paddy Field" not "paddy field")

### `descriptionZh` / `descriptionEn`
- 1-2 line short description
- Both required

### `obtainZh` / `obtainEn`
- How to obtain the item
- Supports HTML tags like `<span class="item-chip"><img src="..." alt="" />Item</span>`
- Plain text is also fine: `'Crafted at a crafting table'`

### `properties`
- Optional; omit to hide the properties table
- Key-value pairs; keys are property names (keep in Chinese), values are property values
- Example:
  ```typescript
  properties: {
    '硬度': '2.0',
    '爆炸抗性': '3.0',
    '工具': '任何锹',
    '发光等级': '15',
  }
  ```

### `relatedIds`
- Optional; displays related items at the bottom of the detail modal
- Array of other entries' `id` values
- Example: `['tea-seeds', 'paddy-field']`
- Referenced IDs must exist in `allBlocks`, otherwise they won't display

## Preparing Icons

1. Prepare a block icon (recommended: 32×32 PNG, pixel style)
2. Place it under `docs/public/images/` in the appropriate directory
3. Fill in the `icon` field, e.g. `/images/blocks/my_block.png`

Existing icon directories:

| Directory | Usage |
|------|------|
| `/images/teastory/` | Teastory items (approx. 105 icons) |
| `/images/` | General screenshots and logo |

> **Tip**: If you don't have an icon yet, you can borrow one from `teastory/` for testing and replace it later.

## Complete Example

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

## Notes

- **Do not delete or modify** the code before/after the `allBlocks` array (type definitions, category lists)
- The **last element** in the `allBlocks` array must NOT have a trailing comma, but all others must
- Group entries by **category** using `// ─── Category Name ───` comments
- Keep English translations in sync; don't add Chinese-only entries
- After editing, run `npm run docs:dev` to verify the page renders correctly
