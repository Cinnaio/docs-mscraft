import { computed, ref, type ComputedRef, type Ref } from 'vue'
import type { BlockEntry } from '../../data/block-query'

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
      list = list.filter((block) => {
        const name = isEn.value ? block.nameEn : block.nameZh
        const desc = isEn.value ? block.descriptionEn : block.descriptionZh

        return (
          name.toLowerCase().includes(q) ||
          desc.toLowerCase().includes(q) ||
          block.nameZh.toLowerCase().includes(q) ||
          block.nameEn.toLowerCase().includes(q) ||
          block.descriptionZh.toLowerCase().includes(q) ||
          block.descriptionEn.toLowerCase().includes(q)
        )
      })
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
