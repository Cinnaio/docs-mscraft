export const CATEGORIES_ZH = [
  '功能性方块',
  '家具',
  '工具',
  '容器',
  '植物与作物',
  '装饰方块',
  '灯具',
  '其他',
] as const

export const CATEGORIES_EN = [
  'Functional Block',
  'Furniture',
  'Tool',
  'Container',
  'Plants & Crops',
  'Decoration',
  'Lighting',
  'Other',
] as const

export type CategoryZh = (typeof CATEGORIES_ZH)[number]
export type CategoryEn = (typeof CATEGORIES_EN)[number]

export function isCategoryZh(value: string): value is CategoryZh {
  return (CATEGORIES_ZH as readonly string[]).includes(value)
}

export function isCategoryEn(value: string): value is CategoryEn {
  return (CATEGORIES_EN as readonly string[]).includes(value)
}
