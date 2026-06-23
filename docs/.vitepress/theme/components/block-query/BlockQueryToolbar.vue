<script setup lang="ts">
const searchQuery = defineModel<string>('searchQuery', { required: true })

const props = defineProps<{
  isEn: boolean
  categories: readonly string[]
  activeCategory: string | null
  resultCount: number
}>()

const emit = defineEmits<{
  setCategory: [cat: string | null]
  clearFilters: []
}>()
</script>

<template>
  <h1 class="block-query__title">
    {{ isEn ? 'Block / Furniture Query' : '方块 / 家具查询' }}
  </h1>
  <p class="block-query__subtitle">
    {{ isEn ? 'Search and browse server blocks and furniture.' : '搜索和浏览服务器中的方块与家具。' }}
  </p>

  <div class="block-query__search-wrap">
    <svg class="block-query__search-icon" viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
      <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
    <input
      v-model="searchQuery"
      class="block-query__search-input"
      :placeholder="isEn ? 'Search by name or description...' : '搜索名称或描述...'"
      type="search"
    />
  </div>

  <div class="block-query__categories">
    <button
      class="block-query__pill"
      :class="{ 'is-active': activeCategory === null }"
      @click="emit('clearFilters')"
    >
      {{ isEn ? 'All' : '全部' }}
    </button>
    <button
      v-for="cat in categories"
      :key="cat"
      class="block-query__pill"
      :class="{ 'is-active': activeCategory === cat }"
      @click="emit('setCategory', cat)"
    >
      {{ cat }}
    </button>
  </div>

  <div class="block-query__count">
    {{ isEn ? `${resultCount} result${resultCount !== 1 ? 's' : ''}` : `共 ${resultCount} 个结果` }}
  </div>
</template>
