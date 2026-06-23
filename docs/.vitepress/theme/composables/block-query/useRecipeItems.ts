import type { ComputedRef, Ref } from 'vue'
import type { BlockEntry, CraftingRecipe, RecipeItem } from '../../data/block-query'

function createRecipeItemId(nameEn: string): string {
  return `recipe-item-${nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}

export function useRecipeItems(
  blocks: readonly BlockEntry[],
  selectedBlock: Ref<BlockEntry | null>,
  isEn: ComputedRef<boolean>,
  selectBlock: (block: BlockEntry) => void,
  hideTooltip: () => void,
) {
  function findRelated(ids: string[]): BlockEntry[] {
    return blocks.filter((block) => ids.includes(block.id))
  }

  function recipeItemName(item: RecipeItem): string {
    return isEn.value ? item.nameEn : item.nameZh
  }

  function recipeItemNote(item: RecipeItem): string | undefined {
    return isEn.value ? item.noteEn : item.noteZh
  }

  function recipeNote(recipe: CraftingRecipe): string | undefined {
    return isEn.value ? recipe.noteEn : recipe.noteZh
  }

  function recipeResult(recipe: CraftingRecipe): RecipeItem {
    return recipe.result ?? {
      nameZh: selectedBlock.value?.nameZh ?? '',
      nameEn: selectedBlock.value?.nameEn ?? '',
      entryId: selectedBlock.value?.id,
      icon: selectedBlock.value?.icon,
      count: recipe.resultCount,
    }
  }

  function recipeCountLabel(count?: number): string {
    return count && count > 1 ? String(count) : ''
  }

  function recipeEntry(item: RecipeItem): BlockEntry | undefined {
    if (item.entryId) {
      return blocks.find((block) => block.id === item.entryId)
    }

    return blocks.find(
      (block) => block.nameZh === item.nameZh || block.nameEn === item.nameEn,
    )
  }

  function recipeItemDetail(item: RecipeItem): BlockEntry {
    const noteZh = item.noteZh ?? '配方原料。'
    const noteEn = item.noteEn ?? 'Recipe ingredient.'

    return {
      id: createRecipeItemId(item.nameEn),
      icon: item.icon ?? '/images/logo.png',
      nameZh: item.nameZh,
      nameEn: item.nameEn,
      categoryZh: '其他',
      categoryEn: 'Other',
      descriptionZh: noteZh,
      descriptionEn: noteEn,
      obtainZh: noteZh,
      obtainEn: noteEn,
    }
  }

  function isCurrentRecipeItem(item: RecipeItem): boolean {
    const current = selectedBlock.value
    if (!current) return false

    return item.entryId === current.id || item.nameZh === current.nameZh || item.nameEn === current.nameEn
  }

  function canOpenRecipeItem(item: RecipeItem): boolean {
    return !isCurrentRecipeItem(item)
  }

  function recipeTooltip(item: RecipeItem): string {
    if (isCurrentRecipeItem(item)) return ''

    const linkedEntry = recipeEntry(item)
    const name = recipeItemName(item)
    const note = recipeItemNote(item)
    const description = linkedEntry ? (isEn.value ? linkedEntry.descriptionEn : linkedEntry.descriptionZh) : note
    const action = linkedEntry ? (isEn.value ? 'Click to open entry details' : '点击打开条目详情') : (isEn.value ? 'Click to view ingredient notes' : '点击查看原料说明')

    return [name, description, action].filter(Boolean).join('\n')
  }

  function openRecipeItem(item: RecipeItem) {
    if (!canOpenRecipeItem(item)) return
    hideTooltip()
    selectBlock(recipeEntry(item) ?? recipeItemDetail(item))
  }

  return {
    findRelated,
    recipeItemName,
    recipeItemNote,
    recipeNote,
    recipeResult,
    recipeCountLabel,
    recipeEntry,
    recipeItemDetail,
    isCurrentRecipeItem,
    canOpenRecipeItem,
    recipeTooltip,
    openRecipeItem,
  }
}
