import { computed, ref, type ComputedRef, type Ref } from 'vue'
import type { BlockEntry, BlockProperty, ProcessRecipe } from '../../data/block-query'

const processMethodTokens: Record<string, string[]> = {
  shapeless: ['无序合成', 'shapeless'],
  smelting: ['熔炉', '烧制', 'furnace', 'smelting'],
  blasting: ['高炉', 'blast furnace', 'blasting'],
  smoking: ['烟熏炉', 'smoker', 'smoking'],
  campfire_cooking: ['营火', '篝火', 'campfire', 'campfire cooking'],
  brewing: ['酿造', '发酵', 'brewing', 'fermentation'],
}

function propertyTokens(properties?: BlockProperty[]): string[] {
  if (!properties) return []
  return properties.flatMap((property) => [
    property.labelZh,
    property.labelEn,
    property.valueZh,
    property.valueEn,
  ])
}

function processTokens(processes?: ProcessRecipe[]): string[] {
  if (!processes) return []

  return processes.flatMap((process) => [
    process.id,
    process.noteZh,
    process.noteEn,
    ...process.methods.flatMap((method) => processMethodTokens[method.kind] ?? [method.kind]),
    ...process.inputs.flatMap((ingredient) => [
      ingredient.roleZh,
      ingredient.roleEn,
      ingredient.noteZh,
      ingredient.noteEn,
      ...ingredient.items.flatMap((item) => [item.nameZh, item.nameEn, item.noteZh, item.noteEn]),
    ]),
    process.result.nameZh,
    process.result.nameEn,
    process.result.noteZh,
    process.result.noteEn,
    ...(process.returns ?? []).flatMap((item) => [item.nameZh, item.nameEn, item.noteZh, item.noteEn]),
    ...(process.byproducts ?? []).flatMap((item) => [item.nameZh, item.nameEn, item.noteZh, item.noteEn]),
  ]).filter((token): token is string => Boolean(token))
}

function blockSearchTokens(block: BlockEntry, isEn: boolean): string[] {
  const localizedName = isEn ? block.nameEn : block.nameZh
  const localizedDescription = isEn ? block.descriptionEn : block.descriptionZh

  return [
    block.id,
    localizedName,
    localizedDescription,
    block.nameZh,
    block.nameEn,
    block.descriptionZh,
    block.descriptionEn,
    block.obtainZh,
    block.obtainEn,
    ...(block.aliasesZh ?? []),
    ...(block.aliasesEn ?? []),
    ...propertyTokens(block.properties),
    ...processTokens(block.processes),
  ].filter((token): token is string => Boolean(token))
}

export function useBlockSearch(
  blocks: readonly BlockEntry[],
  isEn: ComputedRef<boolean>,
  categoriesZh: readonly string[],
  categoriesEn: readonly string[],
): {
  searchQuery: Ref<string>
  activeCategory: Ref<string | null>
  categories: ComputedRef<readonly string[]>
  filteredBlocks: ComputedRef<BlockEntry[]>
  setCategory: (cat: string | null) => void
  clearFilters: () => void
} {
  const searchQuery = ref('')
  const activeCategory = ref<string | null>(null)
  const categories = computed(() => (isEn.value ? categoriesEn : categoriesZh) as readonly string[])

  const filteredBlocks = computed(() => {
    let list = [...blocks]

    if (activeCategory.value !== null) {
      list = list.filter(
        (block) =>
          (isEn.value ? block.categoryEn : block.categoryZh) === activeCategory.value,
      )
    }

    const q = searchQuery.value.trim().toLowerCase()
    if (q) {
      list = list.filter((block) =>
        blockSearchTokens(block, isEn.value).some((token) => token.toLowerCase().includes(q)),
      )
    }

    return list
  })

  function setCategory(cat: string | null) {
    activeCategory.value = activeCategory.value === cat ? null : cat
  }

  function clearFilters() {
    searchQuery.value = ''
    activeCategory.value = null
  }

  return {
    searchQuery,
    activeCategory,
    categories,
    filteredBlocks,
    setCategory,
    clearFilters,
  }
}
