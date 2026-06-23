<script setup lang="ts">
import { withBase } from 'vitepress'
import type { BlockEntry } from '../../data/block-query'

defineProps<{
  related: BlockEntry[]
  isEn: boolean
}>()

const emit = defineEmits<{
  select: [block: BlockEntry]
}>()
</script>

<template>
  <div class="block-query__related-list">
    <button
      v-for="entry in related"
      :key="entry.id"
      class="block-query__related-chip"
      @click="emit('select', entry)"
    >
      <img
        class="block-query__related-icon"
        :src="withBase(entry.icon)"
        :alt="isEn ? entry.nameEn : entry.nameZh"
      />
      {{ isEn ? entry.nameEn : entry.nameZh }}
    </button>
    <span v-if="related.length === 0" class="block-query__related-none">
      {{ isEn ? 'No entries yet.' : '暂无对应条目。' }}
    </span>
  </div>
</template>
