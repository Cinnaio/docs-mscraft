<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { withBase } from 'vitepress'
import type { BlockEntry, CraftingRecipe, RecipeItem } from '../../data/block-query'
import { useModalScrollbar } from '../../composables/block-query/useModalScrollbar'
import BlockPropertiesTable from './BlockPropertiesTable.vue'
import BlockRelatedList from './BlockRelatedList.vue'
import CraftingRecipeList from './CraftingRecipeList.vue'
import QueryFloatingTooltip from './QueryFloatingTooltip.vue'

const props = defineProps<{
  block: BlockEntry
  isEn: boolean
  related: BlockEntry[]
  tooltipText: string
  tooltipStyle: Record<string, string>
  setTooltipRef: (el: Element | { el?: HTMLElement | null } | null) => void
  getRecipeResult: (recipe: CraftingRecipe) => RecipeItem
  getRecipeNote: (recipe: CraftingRecipe) => string | undefined
  getRecipeItemName: (item: RecipeItem) => string
  getRecipeCountLabel: (count?: number) => string
  getRecipeTooltip: (item: RecipeItem) => string
  canOpenRecipeItem: (item: RecipeItem) => boolean
}>()

const emit = defineEmits<{
  close: []
  selectBlock: [block: BlockEntry]
  openRecipeItem: [item: RecipeItem]
  showTooltip: [event: FocusEvent | MouseEvent, text: string]
  hideTooltip: []
}>()

const {
  modalScrollRef,
  modalScrollbarRef,
  modalThumbTop,
  modalThumbHeight,
  isDraggingModalThumb,
  updateModalScrollbar,
  onModalTrackPointerDown,
  onModalThumbPointerDown,
  stopModalThumbDrag,
} = useModalScrollbar(() => emit('hideTooltip'))

watch(
  () => props.block,
  () => nextTick(updateModalScrollbar),
)

onMounted(() => {
  nextTick(updateModalScrollbar)
  window.addEventListener('resize', updateModalScrollbar)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateModalScrollbar)
  stopModalThumbDrag()
})
</script>

<template>
  <Teleport to="body">
    <div class="block-query__modal-backdrop" @click.self="emit('close')">
      <div class="block-query__modal" role="dialog" :aria-label="isEn ? block.nameEn : block.nameZh">
        <button class="block-query__modal-close" @click="emit('close')" :aria-label="isEn ? 'Close' : '关闭'">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>

        <div ref="modalScrollRef" class="block-query__modal-scroll" @scroll="updateModalScrollbar">
          <div class="block-query__modal-header">
            <img
              class="block-query__modal-icon"
              :src="withBase(block.icon)"
              :alt="isEn ? block.nameEn : block.nameZh"
            />
            <div>
              <h2 class="block-query__modal-title">
                {{ isEn ? block.nameEn : block.nameZh }}
              </h2>
              <span class="block-query__modal-badge">
                {{ isEn ? block.categoryEn : block.categoryZh }}
              </span>
            </div>
          </div>

          <div class="block-query__modal-body">
            <section class="block-query__modal-section">
              <h3>{{ isEn ? 'Description' : '描述' }}</h3>
              <p>{{ isEn ? block.descriptionEn : block.descriptionZh }}</p>
            </section>

            <section class="block-query__modal-section">
              <h3>{{ isEn ? 'How to Obtain' : '获取方式' }}</h3>
              <p v-html="isEn ? block.obtainEn : block.obtainZh"></p>
            </section>

            <section v-if="block.recipes && block.recipes.length > 0" class="block-query__modal-section">
              <h3>{{ isEn ? 'Crafting Recipe' : '合成表' }}</h3>
              <CraftingRecipeList
                :recipes="block.recipes"
                :is-en="isEn"
                :get-result="getRecipeResult"
                :get-note="getRecipeNote"
                :get-name="getRecipeItemName"
                :get-count-label="getRecipeCountLabel"
                :get-tooltip="getRecipeTooltip"
                :can-open="canOpenRecipeItem"
                @show-tooltip="(event, text) => emit('showTooltip', event, text)"
                @hide-tooltip="emit('hideTooltip')"
                @open="emit('openRecipeItem', $event)"
              />
            </section>

            <section v-if="block.properties && Object.keys(block.properties).length > 0" class="block-query__modal-section">
              <h3>{{ isEn ? 'Properties' : '属性' }}</h3>
              <BlockPropertiesTable :properties="block.properties" />
            </section>

            <section v-if="block.relatedIds && block.relatedIds.length > 0" class="block-query__modal-section">
              <h3>{{ isEn ? 'Related' : '关联方块' }}</h3>
              <BlockRelatedList
                :related="related"
                :is-en="isEn"
                @select="emit('selectBlock', $event)"
              />
            </section>
          </div>
        </div>

        <QueryFloatingTooltip
          v-if="tooltipText"
          :ref="setTooltipRef"
          :text="tooltipText"
          :tooltip-style="tooltipStyle"
        />

        <div
          ref="modalScrollbarRef"
          class="block-query__modal-scrollbar"
          :class="{ 'has-scrollbar': modalThumbHeight > 0, 'is-dragging': isDraggingModalThumb }"
          aria-hidden="true"
          @pointerdown="onModalTrackPointerDown"
        >
          <div
            class="block-query__modal-scrollbar-thumb"
            :style="{ height: `${modalThumbHeight}px`, transform: `translateY(${modalThumbTop}px)` }"
            @pointerdown.stop.prevent="onModalThumbPointerDown"
          ></div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
