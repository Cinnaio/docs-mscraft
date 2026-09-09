import snapshot from '../../data/teastory-guide.json'

export interface TeaItem {
  id: string
  zh: string
  en: string
  icon: string
  food?: { nutrition: number; saturation: number }
  returns?: string
}
export interface Ingredient {
  ids: string[]
  count: number
  role?: string
  returns?: string
  damage?: number
}
export interface TeaRecipe {
  id: string
  method: string
  result: string
  count: number
  time?: number
  pattern?: (string | null)[]
  inputs: Ingredient[]
}
export const items = snapshot.items as Record<string, TeaItem>
export const recipes = snapshot.recipes as TeaRecipe[]
export const foodIds = snapshot.foodIds
export const slots = snapshot.slots as Record<string, number>
export const fullId = (id: string) => id.includes(':') ? id : `cgap:${id}`
export const itemName = (id: string, en = false) => items[fullId(id)]?.[en ? 'en' : 'zh'] || id
export const recipeFor = (id: string) => recipes.filter((recipe) => recipe.result === fullId(id))
export const methodName = (method: string, en: boolean) => ({
  shaped: ['工作台 · 按图摆放', 'Crafting table · shaped'],
  shapeless: ['工作台 · 无序合成', 'Crafting table · shapeless'],
  smelting: ['熔炉', 'Furnace'],
  blasting: ['高炉', 'Blast furnace'],
  smoking: ['烟熏炉', 'Smoker'],
  campfire_cooking: ['营火', 'Campfire'],
  tea_table: ['茶桌', 'Tea Table'],
}[method]?.[en ? 1 : 0] || method)
