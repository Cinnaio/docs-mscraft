import { computed, ref, type ComputedRef, type Ref } from 'vue'
import type { BlockEntry, BlockProperty } from '../../data/block-query'

function propertyTokens(properties?: BlockProperty[]): string[] {
  if (!properties) return []
  return properties.flatMap((property) => [
    property.labelZh,
    property.labelEn,
    property.valueZh,
    property.valueEn,
  ])
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
