<script setup lang="ts">
import { withBase } from 'vitepress'
import type { RecipeItem } from '../../data/block-query'

defineProps<{
  item: RecipeItem
  isResult?: boolean
  isClickable: boolean
  name: string
  countLabel: string
  tooltip: string
}>()

const emit = defineEmits<{
  showTooltip: [event: FocusEvent | MouseEvent, text: string]
  hideTooltip: []
  open: [item: RecipeItem]
}>()
</script>

<template>
  <button
    type="button"
    :class="isResult ? 'block-query__recipe-result' : 'block-query__crafting-item'"
    :disabled="!isClickable"
    :aria-label="tooltip || name"
    @mouseenter="emit('showTooltip', $event, tooltip)"
    @focus="emit('showTooltip', $event, tooltip)"
    @mouseleave="emit('hideTooltip')"
    @blur="emit('hideTooltip')"
    @click.stop="emit('open', item)"
  >
    <template v-if="isResult">
      <img
        v-if="item.icon"
        class="block-query__recipe-result-icon"
        :src="withBase(item.icon)"
        :alt="name"
        loading="lazy"
        decoding="async"
      />
      <span v-else class="block-query__recipe-result-initial">
        {{ name.slice(0, 2) }}
      </span>
      <span v-if="countLabel" class="block-query__crafting-count">
        {{ countLabel }}
      </span>
      <span class="block-query__recipe-result-name">
        {{ name }}
      </span>
    </template>

    <template v-else>
      <img
        v-if="item.icon"
        class="block-query__crafting-icon"
        :src="withBase(item.icon)"
        :alt="name"
        loading="lazy"
        decoding="async"
      />
      <span v-else class="block-query__crafting-name">
        {{ name }}
      </span>
      <span v-if="countLabel" class="block-query__crafting-count">
        {{ countLabel }}
      </span>
    </template>
  </button>
</template>
