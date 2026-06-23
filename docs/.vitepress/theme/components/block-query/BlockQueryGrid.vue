<script setup lang="ts">
import type { BlockEntry } from '../../data/block-query'
import BlockQueryCard from './BlockQueryCard.vue'

defineProps<{
  blocks: BlockEntry[]
  isEn: boolean
}>()

const emit = defineEmits<{
  select: [block: BlockEntry]
  clearFilters: []
}>()
</script>

<template>
  <div v-if="blocks.length > 0" class="block-query__grid">
    <BlockQueryCard
      v-for="block in blocks"
      :key="block.id"
      :block="block"
      :is-en="isEn"
      @click="emit('select', block)"
    />
  </div>

  <div v-else class="block-query__empty">
    <p class="block-query__empty-text">
      {{ isEn ? 'No matching blocks or furniture found.' : '没有找到匹配的方块或家具。' }}
    </p>
    <button class="block-query__empty-btn" @click="emit('clearFilters')">
      {{ isEn ? 'Clear filters' : '清除筛选' }}
    </button>
  </div>
</template>
