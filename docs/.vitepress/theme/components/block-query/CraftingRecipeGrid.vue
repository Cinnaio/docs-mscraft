<script setup lang="ts">
import type { CraftingRecipe, RecipeItem } from '../../data/block-query'
import RecipeItemButton from './RecipeItemButton.vue'

defineProps<{
  recipe: CraftingRecipe
  isEn: boolean
  result: RecipeItem
  recipeNote?: string
  getName: (item: RecipeItem) => string
  getCountLabel: (count?: number) => string
  getTooltip: (item: RecipeItem) => string
  canOpen: (item: RecipeItem) => boolean
}>()

const emit = defineEmits<{
  showTooltip: [event: FocusEvent | MouseEvent, text: string]
  hideTooltip: []
  open: [item: RecipeItem]
}>()
</script>

<template>
  <div class="block-query__recipe">
    <div
      class="block-query__crafting-grid"
      role="grid"
      :aria-label="isEn ? '3 by 3 crafting grid' : '3×3 工作台合成表'"
    >
      <div
        v-for="(slot, slotIndex) in recipe.pattern"
        :key="slotIndex"
        class="block-query__crafting-slot"
        :class="{ 'is-empty': !slot, 'has-icon': slot?.icon, 'is-clickable': slot && canOpen(slot) }"
        role="gridcell"
        :aria-label="slot ? getName(slot) : (isEn ? 'Empty slot' : '空槽')"
      >
        <RecipeItemButton
          v-if="slot"
          :item="slot"
          :class="{ 'is-clickable': canOpen(slot) }"
          :is-clickable="canOpen(slot)"
          :name="getName(slot)"
          :count-label="getCountLabel(slot.count)"
          :tooltip="getTooltip(slot)"
          @show-tooltip="(event, text) => emit('showTooltip', event, text)"
          @hide-tooltip="emit('hideTooltip')"
          @open="emit('open', $event)"
        />
      </div>
    </div>

    <div class="block-query__recipe-arrow" aria-hidden="true">→</div>

    <RecipeItemButton
      :item="result"
      is-result
      :class="{ 'is-clickable': canOpen(result) }"
      :is-clickable="canOpen(result)"
      :name="getName(result)"
      :count-label="getCountLabel(result.count)"
      :tooltip="getTooltip(result)"
      @show-tooltip="(event, text) => emit('showTooltip', event, text)"
      @hide-tooltip="emit('hideTooltip')"
      @open="emit('open', $event)"
    />

    <p v-if="recipeNote" class="block-query__recipe-note">
      {{ recipeNote }}
    </p>
  </div>
</template>
