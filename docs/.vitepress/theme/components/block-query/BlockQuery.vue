<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import {
  allBlocks,
  CATEGORIES_ZH,
  CATEGORIES_EN,
} from '../../data/block-query'
import { useBlockDetailModal } from '../../composables/block-query/useBlockDetailModal'
import { useBlockSearch } from '../../composables/block-query/useBlockSearch'
import { useQueryTooltip } from '../../composables/block-query/useQueryTooltip'
import { useRecipeItems } from '../../composables/block-query/useRecipeItems'
import BlockDetailModal from './BlockDetailModal.vue'
import BlockQueryGrid from './BlockQueryGrid.vue'
import BlockQueryToolbar from './BlockQueryToolbar.vue'
import './BlockQuery.css'

const { lang } = useData()
const isEn = computed(() => lang.value === 'en-US')

const {
  tooltipText,
  tooltipStyle,
  setTooltipRef,
  showTooltip,
  hideTooltip,
} = useQueryTooltip()

const {
  selectedBlock,
  selectBlock,
  closeDetail,
} = useBlockDetailModal(undefined, hideTooltip)

const {
  searchQuery,
  activeCategory,
  categories,
  filteredBlocks,
  setCategory,
  clearFilters,
} = useBlockSearch(allBlocks, isEn, CATEGORIES_ZH, CATEGORIES_EN)

const {
  findRelated,
  recipeItemName,
  recipeNote,
  recipeResult,
  recipeCountLabel,
  canOpenRecipeItem,
  recipeTooltip,
  openRecipeItem,
} = useRecipeItems(allBlocks, selectedBlock, isEn, selectBlock, hideTooltip)
</script>

<template>
  <div class="block-query">
    <BlockQueryToolbar
      v-model:search-query="searchQuery"
      :is-en="isEn"
      :categories="categories"
      :active-category="activeCategory"
      :result-count="filteredBlocks.length"
      @set-category="setCategory"
      @clear-filters="clearFilters"
    />

    <BlockQueryGrid
      :blocks="filteredBlocks"
      :is-en="isEn"
      @select="selectBlock"
      @clear-filters="clearFilters"
    />

    <BlockDetailModal
      v-if="selectedBlock"
      :block="selectedBlock"
      :is-en="isEn"
      :related="findRelated(selectedBlock.relatedIds ?? [])"
      :tooltip-text="tooltipText"
      :tooltip-style="tooltipStyle"
      :set-tooltip-ref="setTooltipRef"
      :get-recipe-result="recipeResult"
      :get-recipe-note="recipeNote"
      :get-recipe-item-name="recipeItemName"
      :get-recipe-count-label="recipeCountLabel"
      :get-recipe-tooltip="recipeTooltip"
      :can-open-recipe-item="canOpenRecipeItem"
      @close="closeDetail"
      @select-block="selectBlock"
      @open-recipe-item="openRecipeItem"
      @show-tooltip="showTooltip"
      @hide-tooltip="hideTooltip"
    />
  </div>
</template>
