import type { BlockProperty, ProcessIngredient, ProcessMethod, ProcessMethodKind, ProcessRecipe, RecipeItem } from './types'

export function teastoryIcon(id: string): string {
  return `/images/teastory/${id}.png`
}

export function prop(
  labelZh: string,
  labelEn: string,
  valueZh: string,
  valueEn: string,
): BlockProperty {
  return { labelZh, labelEn, valueZh, valueEn }
}

export function teastoryItem(
  textureId: string,
  nameZh: string,
  nameEn: string,
  options: Omit<RecipeItem, 'nameZh' | 'nameEn' | 'icon'> = {},
): RecipeItem {
  return {
    nameZh,
    nameEn,
    icon: teastoryIcon(textureId),
    ...options,
  }
}

export function method(kind: ProcessMethodKind, options: Omit<ProcessMethod, 'kind'> = {}): ProcessMethod {
  return { kind, ...options }
}

export function processIngredient(
  items: RecipeItem | RecipeItem[],
  options: Omit<ProcessIngredient, 'items'> = {},
): ProcessIngredient {
  return {
    items: Array.isArray(items) ? items : [items],
    ...options,
  }
}

export function processRecipe(
  methods: ProcessMethod | ProcessMethod[],
  inputs: ProcessIngredient[],
  result: RecipeItem,
  options: Omit<ProcessRecipe, 'methods' | 'inputs' | 'result'> = {},
): ProcessRecipe {
  return {
    methods: Array.isArray(methods) ? methods : [methods],
    inputs,
    result,
    ...options,
  }
}
