import type { CategoryEn, CategoryZh } from './categories'

export interface RecipeItem {
  nameZh: string
  nameEn: string
  /** 可选关联条目；存在时合成表物品可点击打开对应详情 */
  entryId?: string
  /** 图标路径，相对于站点根目录；缺省时在合成格中显示文字 */
  icon?: string
  /** 物品数量，省略时按 1 处理 */
  count?: number
  /** 可选补充说明，用于任意材料、返还物等提示 */
  noteZh?: string
  noteEn?: string
}

export type CraftingPattern = [
  RecipeItem | null,
  RecipeItem | null,
  RecipeItem | null,
  RecipeItem | null,
  RecipeItem | null,
  RecipeItem | null,
  RecipeItem | null,
  RecipeItem | null,
  RecipeItem | null,
]

export interface CraftingRecipe {
  /** 3×3 工作台摆位：从左到右、从上到下；空槽用 null */
  pattern: CraftingPattern
  /** 产物；省略时详情弹窗会回退到当前条目 */
  result?: RecipeItem
  /** result 省略时使用的产物数量 */
  resultCount?: number
  /** 配方说明，例如严格摆位、无序示例摆放、返还物等 */
  noteZh?: string
  noteEn?: string
}

export interface BlockProperty {
  labelZh: string
  labelEn: string
  valueZh: string
  valueEn: string
}

export interface BlockEntry {
  /** kebab-case 唯一标识，用于去重和关联引用 */
  id: string
  /** 图标路径，相对于站点根目录，如 "/images/teastory/paddy_field.png" */
  icon: string
  nameZh: string
  nameEn: string
  categoryZh: CategoryZh
  categoryEn: CategoryEn
  /** 简短描述（1~2 行） */
  descriptionZh: string
  descriptionEn: string
  /** 获取方式说明 */
  obtainZh: string
  obtainEn: string
  /** 搜索别名；用于覆盖分组条目中的实际物品名、俗称或流程名 */
  aliasesZh?: string[]
  aliasesEn?: string[]
  /** 可选合成配方，显示为 3×3 工作台合成表 */
  recipes?: CraftingRecipe[]
  /** 可选属性键值对，显示在详情弹窗的表格中 */
  properties?: BlockProperty[]
  /** 关联条目 id 列表，用于交叉链接 */
  relatedIds?: string[]
}
