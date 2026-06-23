<script setup lang="ts">
import type { CraftingRecipe, RecipeItem } from '../../data/block-query'
import CraftingRecipeGrid from './CraftingRecipeGrid.vue'

defineProps<{
  recipes: CraftingRecipe[]
  isEn: boolean
  getResult: (recipe: CraftingRecipe) => RecipeItem
  getNote: (recipe: CraftingRecipe) => string | undefined
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
  <div class="block-query__recipes">
    <CraftingRecipeGrid
      v-for="(recipe, recipeIndex) in recipes"
      :key="recipeIndex"
      :recipe="recipe"
      :is-en="isEn"
      :result="getResult(recipe)"
      :recipe-note="getNote(recipe)"
      :get-name="getName"
      :get-count-label="getCountLabel"
      :get-tooltip="getTooltip"
      :can-open="canOpen"
      @show-tooltip="(event, text) => emit('showTooltip', event, text)"
      @hide-tooltip="emit('hideTooltip')"
      @open="emit('open', $event)"
    />
  </div>
</template>
