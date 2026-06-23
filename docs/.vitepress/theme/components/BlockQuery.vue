<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useData, withBase } from 'vitepress'
import {
  allBlocks,
  CATEGORIES_ZH,
  CATEGORIES_EN,
  type BlockEntry,
  type CraftingRecipe,
  type RecipeItem,
} from './block-list-data'

const { lang } = useData()
const isEn = computed(() => lang.value === 'en-US')

const searchQuery = ref('')
const activeCategory = ref<string | null>(null)
const selectedBlock = ref<BlockEntry | null>(null)

const categories = computed(() => (isEn.value ? CATEGORIES_EN : CATEGORIES_ZH) as readonly string[])

function categoryLabel(catZh: string, catEn: string): string {
  return isEn.value ? catEn : catZh
}

const filteredBlocks = computed(() => {
  let list = allBlocks

  // Category filter
  if (activeCategory.value !== null) {
    list = list.filter(
      (b) =>
        (isEn.value ? b.categoryEn : b.categoryZh) === activeCategory.value,
    )
  }

  // Search filter
  const q = searchQuery.value.trim().toLowerCase()
  if (q) {
    list = list.filter((b) => {
      const name = isEn.value ? b.nameEn : b.nameZh
      const desc = isEn.value ? b.descriptionEn : b.descriptionZh
      // Always search both locales for flexibility
      return (
        name.toLowerCase().includes(q) ||
        desc.toLowerCase().includes(q) ||
        b.nameZh.toLowerCase().includes(q) ||
        b.nameEn.toLowerCase().includes(q) ||
        b.descriptionZh.toLowerCase().includes(q) ||
        b.descriptionEn.toLowerCase().includes(q)
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

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape' && selectedBlock.value) {
    closeDetail()
  }
}

watch(selectedBlock, (val) => {
  if (val) {
    document.addEventListener('keydown', onKeyDown)
  } else {
    document.removeEventListener('keydown', onKeyDown)
  }
})

onMounted(() => {
  document.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeyDown)
})

function selectBlock(block: BlockEntry) {
  selectedBlock.value = block
  document.body.style.overflow = 'hidden'
}

function closeDetail() {
  selectedBlock.value = null
  document.body.style.overflow = ''
}

function findRelated(ids: string[]): BlockEntry[] {
  return allBlocks.filter((b) => ids.includes(b.id))
}

function recipeItemName(item: RecipeItem): string {
  return isEn.value ? item.nameEn : item.nameZh
}

function recipeItemNote(item: RecipeItem): string | undefined {
  return isEn.value ? item.noteEn : item.noteZh
}

function recipeNote(recipe: CraftingRecipe): string | undefined {
  return isEn.value ? recipe.noteEn : recipe.noteZh
}

function recipeResult(recipe: CraftingRecipe): RecipeItem {
  return recipe.result ?? {
    nameZh: selectedBlock.value?.nameZh ?? '',
    nameEn: selectedBlock.value?.nameEn ?? '',
    entryId: selectedBlock.value?.id,
    icon: selectedBlock.value?.icon,
    count: recipe.resultCount,
  }
}

function recipeCountLabel(count?: number): string {
  return count && count > 1 ? String(count) : ''
}

function recipeEntry(item: RecipeItem): BlockEntry | undefined {
  if (item.entryId) {
    return allBlocks.find((block) => block.id === item.entryId)
  }

  return allBlocks.find(
    (block) => block.nameZh === item.nameZh || block.nameEn === item.nameEn,
  )
}

function recipeItemDetail(item: RecipeItem): BlockEntry {
  const nameZh = item.nameZh
  const nameEn = item.nameEn
  const noteZh = item.noteZh ?? '配方原料。'
  const noteEn = item.noteEn ?? 'Recipe ingredient.'

  return {
    id: `recipe-item-${nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    icon: item.icon ?? '/images/logo.png',
    nameZh,
    nameEn,
    categoryZh: '其他',
    categoryEn: 'Other',
    descriptionZh: noteZh,
    descriptionEn: noteEn,
    obtainZh: noteZh,
    obtainEn: noteEn,
  }
}

function recipeTooltip(item: RecipeItem): string {
  const linkedEntry = recipeEntry(item)
  const name = recipeItemName(item)
  const note = recipeItemNote(item)
  const description = linkedEntry ? (isEn.value ? linkedEntry.descriptionEn : linkedEntry.descriptionZh) : note
  const action = linkedEntry ? (isEn.value ? 'Click to open entry details' : '点击打开条目详情') : (isEn.value ? 'Click to view ingredient notes' : '点击查看原料说明')

  return [name, description, action].filter(Boolean).join('\n')
}

function openRecipeItem(item: RecipeItem) {
  selectBlock(recipeEntry(item) ?? recipeItemDetail(item))
}
</script>

<template>
  <div class="block-query">
    <!-- Header -->
    <h1 class="block-query__title">
      {{ isEn ? 'Block / Furniture Query' : '方块 / 家具查询' }}
    </h1>
    <p class="block-query__subtitle">
      {{ isEn ? 'Search and browse server blocks and furniture.' : '搜索和浏览服务器中的方块与家具。' }}
    </p>

    <!-- Search bar -->
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

    <!-- Category filter pills -->
    <div class="block-query__categories">
      <button
        class="block-query__pill"
        :class="{ 'is-active': activeCategory === null }"
        @click="clearFilters"
      >
        {{ isEn ? 'All' : '全部' }}
      </button>
      <button
        v-for="cat in categories"
        :key="cat"
        class="block-query__pill"
        :class="{ 'is-active': activeCategory === cat }"
        @click="setCategory(cat)"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Results count -->
    <div class="block-query__count">
      {{ isEn ? `${filteredBlocks.length} result${filteredBlocks.length !== 1 ? 's' : ''}` : `共 ${filteredBlocks.length} 个结果` }}
    </div>

    <!-- Card grid -->
    <div v-if="filteredBlocks.length > 0" class="block-query__grid">
      <button
        v-for="block in filteredBlocks"
        :key="block.id"
        class="block-query__card"
        @click="selectBlock(block)"
      >
        <div class="block-query__card-icon-wrap">
          <img
            class="block-query__card-icon"
            :src="withBase(block.icon)"
            :alt="isEn ? block.nameEn : block.nameZh"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="block-query__card-body">
          <div class="block-query__card-name">
            {{ isEn ? block.nameEn : block.nameZh }}
          </div>
          <span class="block-query__card-badge">
            {{ isEn ? block.categoryEn : block.categoryZh }}
          </span>
          <p class="block-query__card-desc">
            {{ isEn ? block.descriptionEn : block.descriptionZh }}
          </p>
        </div>
      </button>
    </div>

    <!-- Empty state -->
    <div v-else class="block-query__empty">
      <p class="block-query__empty-text">
        {{ isEn ? 'No matching blocks or furniture found.' : '没有找到匹配的方块或家具。' }}
      </p>
      <button class="block-query__empty-btn" @click="clearFilters">
        {{ isEn ? 'Clear filters' : '清除筛选' }}
      </button>
    </div>

    <!-- Detail modal -->
    <Teleport to="body">
      <div
        v-if="selectedBlock"
        class="block-query__modal-backdrop"
        @click.self="closeDetail"
      >
        <div class="block-query__modal" role="dialog" :aria-label="isEn ? selectedBlock.nameEn : selectedBlock.nameZh">
          <button class="block-query__modal-close" @click="closeDetail" :aria-label="isEn ? 'Close' : '关闭'">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>

          <div class="block-query__modal-header">
            <img
              class="block-query__modal-icon"
              :src="withBase(selectedBlock.icon)"
              :alt="isEn ? selectedBlock.nameEn : selectedBlock.nameZh"
            />
            <div>
              <h2 class="block-query__modal-title">
                {{ isEn ? selectedBlock.nameEn : selectedBlock.nameZh }}
              </h2>
              <span class="block-query__modal-badge">
                {{ isEn ? selectedBlock.categoryEn : selectedBlock.categoryZh }}
              </span>
            </div>
          </div>

          <div class="block-query__modal-body">
            <section class="block-query__modal-section">
              <h3>{{ isEn ? 'Description' : '描述' }}</h3>
              <p>{{ isEn ? selectedBlock.descriptionEn : selectedBlock.descriptionZh }}</p>
            </section>

            <section class="block-query__modal-section">
              <h3>{{ isEn ? 'How to Obtain' : '获取方式' }}</h3>
              <p v-html="isEn ? selectedBlock.obtainEn : selectedBlock.obtainZh"></p>
            </section>

            <section v-if="selectedBlock.recipes && selectedBlock.recipes.length > 0" class="block-query__modal-section">
              <h3>{{ isEn ? 'Crafting Recipe' : '合成表' }}</h3>
              <div class="block-query__recipes">
                <div
                  v-for="(recipe, recipeIndex) in selectedBlock.recipes"
                  :key="recipeIndex"
                  class="block-query__recipe"
                >
                  <div
                    class="block-query__crafting-grid"
                    role="grid"
                    :aria-label="isEn ? '3 by 3 crafting grid' : '3×3 工作台合成表'"
                  >
                    <div
                      v-for="(slot, slotIndex) in recipe.pattern"
                      :key="slotIndex"
                      class="block-query__crafting-slot"
                      :class="{ 'is-empty': !slot, 'has-icon': slot?.icon, 'is-clickable': slot }"
                      role="gridcell"
                      :aria-label="slot ? recipeItemName(slot) : (isEn ? 'Empty slot' : '空槽')"
                    >
                      <button
                        v-if="slot"
                        type="button"
                        class="block-query__crafting-item"
                        :class="{ 'is-clickable': true }"
                        :data-tip="recipeTooltip(slot)"
                        :aria-label="recipeTooltip(slot)"
                        @click.stop="openRecipeItem(slot)"
                      >
                        <img
                          v-if="slot.icon"
                          class="block-query__crafting-icon"
                          :src="withBase(slot.icon)"
                          :alt="recipeItemName(slot)"
                          loading="lazy"
                          decoding="async"
                        />
                        <span v-else class="block-query__crafting-name">
                          {{ recipeItemName(slot) }}
                        </span>
                        <span v-if="recipeCountLabel(slot.count)" class="block-query__crafting-count">
                          {{ recipeCountLabel(slot.count) }}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div class="block-query__recipe-arrow" aria-hidden="true">→</div>

                  <button
                    type="button"
                    class="block-query__recipe-result"
                    :class="{ 'is-clickable': true }"
                    :data-tip="recipeTooltip(recipeResult(recipe))"
                    :aria-label="recipeTooltip(recipeResult(recipe))"
                    @click.stop="openRecipeItem(recipeResult(recipe))"
                  >
                    <img
                      v-if="recipeResult(recipe).icon"
                      class="block-query__recipe-result-icon"
                      :src="withBase(recipeResult(recipe).icon || '')"
                      :alt="recipeItemName(recipeResult(recipe))"
                      loading="lazy"
                      decoding="async"
                    />
                    <span v-else class="block-query__recipe-result-initial">
                      {{ recipeItemName(recipeResult(recipe)).slice(0, 2) }}
                    </span>
                    <span v-if="recipeCountLabel(recipeResult(recipe).count)" class="block-query__crafting-count">
                      {{ recipeCountLabel(recipeResult(recipe).count) }}
                    </span>
                    <span class="block-query__recipe-result-name">
                      {{ recipeItemName(recipeResult(recipe)) }}
                    </span>
                  </button>

                  <p v-if="recipeNote(recipe)" class="block-query__recipe-note">
                    {{ recipeNote(recipe) }}
                  </p>
                </div>
              </div>
            </section>

            <section v-if="selectedBlock.properties && Object.keys(selectedBlock.properties).length > 0" class="block-query__modal-section">
              <h3>{{ isEn ? 'Properties' : '属性' }}</h3>
              <table class="block-query__prop-table">
                <tbody>
                  <tr v-for="(val, key) in selectedBlock.properties" :key="key">
                    <td class="block-query__prop-key">{{ key }}</td>
                    <td class="block-query__prop-val">{{ val }}</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section v-if="selectedBlock.relatedIds && selectedBlock.relatedIds.length > 0" class="block-query__modal-section">
              <h3>{{ isEn ? 'Related' : '关联方块' }}</h3>
              <div class="block-query__related-list">
                <button
                  v-for="related in findRelated(selectedBlock.relatedIds!)"
                  :key="related.id"
                  class="block-query__related-chip"
                  @click="selectBlock(related)"
                >
                  <img
                    class="block-query__related-icon"
                    :src="withBase(related.icon)"
                    :alt="isEn ? related.nameEn : related.nameZh"
                  />
                  {{ isEn ? related.nameEn : related.nameZh }}
                </button>
                <span v-if="findRelated(selectedBlock.relatedIds!).length === 0" class="block-query__related-none">
                  {{ isEn ? 'No entries yet.' : '暂无对应条目。' }}
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
/* ─── Layout ─── */
.block-query {
  max-width: 1152px;
  margin: 0 auto;
  padding: 2rem min(2rem, 4vw) 3rem;
}

.block-query__title {
  margin: 0;
  font-size: clamp(1.75rem, 2.8vw, 2.35rem);
  font-weight: 800;
  line-height: 1.2;
  color: var(--vp-c-text-1);
  letter-spacing: -0.02em;
}

.block-query__subtitle {
  margin: 0.5rem 0 0;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

/* ─── Search ─── */
.block-query__search-wrap {
  position: relative;
  margin-top: 1.5rem;
}

.block-query__search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--vp-c-text-3);
  pointer-events: none;
}

.block-query__search-input {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
  line-height: 1.5;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-sizing: border-box;
}

.block-query__search-input::placeholder {
  color: var(--vp-c-text-3);
}

.block-query__search-input:focus {
  border-color: var(--vp-c-brand-2);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.block-query__search-input::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  width: 16px;
  height: 16px;
  background: var(--vp-c-text-3);
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/%3E%3C/svg%3E") no-repeat center;
  mask-size: contain;
}

/* ─── Category pills ─── */
.block-query__categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.block-query__pill {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.9rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
  font-weight: 550;
  line-height: 1.4;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.block-query__pill:hover {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-soft) 30%, var(--vp-c-bg-soft));
}

.block-query__pill.is-active {
  border-color: var(--vp-c-brand-2);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

/* ─── Results count ─── */
.block-query__count {
  margin-top: 1.25rem;
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
  font-weight: 500;
}

/* ─── Card grid ─── */
.block-query__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-top: 0.75rem;
}

.block-query__card {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  padding: 0.85rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg);
  cursor: pointer;
  text-align: left;
  transition: all 0.18s ease;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  color: inherit;
}

.block-query__card:hover {
  border-color: var(--vp-c-brand-soft);
  box-shadow:
    0 0 0 1px var(--vp-c-brand-soft),
    0 8px 24px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}

.block-query__card:focus-visible {
  outline: 2px solid var(--vp-c-brand-2);
  outline-offset: 2px;
}

.block-query__card-icon-wrap {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

.block-query__card-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
  image-rendering: pixelated;
}

.block-query__card-body {
  flex: 1;
  min-width: 0;
}

.block-query__card-name {
  font-weight: 650;
  font-size: 0.92rem;
  line-height: 1.3;
  color: var(--vp-c-text-1);
  margin: 0;
}

.block-query__card-badge {
  display: inline-block;
  margin-top: 0.25rem;
  padding: 0.1em 0.5em;
  border-radius: 6px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 0.68rem;
  font-weight: 600;
  line-height: 1.4;
  border: 1px solid transparent;
}

.block-query__card-desc {
  margin: 0.35rem 0 0;
  font-size: 0.78rem;
  line-height: 1.45;
  color: var(--vp-c-text-2);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ─── Empty state ─── */
.block-query__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3.5rem 1rem;
  text-align: center;
}

.block-query__empty-text {
  margin: 0;
  font-size: 1rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.block-query__empty-btn {
  margin-top: 1rem;
  padding: 0.5rem 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.15s ease;
}

.block-query__empty-btn:hover {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-soft) 30%, var(--vp-c-bg-soft));
}

/* ─── Modal backdrop ─── */
.block-query__modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  overflow-y: auto;
}

/* ─── Modal ─── */
.block-query__modal {
  position: relative;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  max-width: 640px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.04),
    0 24px 48px rgba(0, 0, 0, 0.18);
  animation: block-query-modal-in 0.18s ease;
}

@keyframes block-query-modal-in {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.block-query__modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  z-index: 1;
  transition: all 0.15s ease;
}

.block-query__modal-close:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-brand-2);
}

/* ─── Modal header ─── */
.block-query__modal-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 1.5rem 0;
}

.block-query__modal-icon {
  width: 64px;
  height: 64px;
  object-fit: contain;
  image-rendering: pixelated;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  padding: 6px;
  box-sizing: border-box;
}

.block-query__modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.25;
  color: var(--vp-c-text-1);
}

.block-query__modal-badge {
  display: inline-block;
  margin-top: 0.35rem;
  padding: 0.15em 0.6em;
  border-radius: 6px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 0.72rem;
  font-weight: 600;
  line-height: 1.4;
}

/* ─── Modal body ─── */
.block-query__modal-body {
  padding: 1.25rem 1.5rem 1.5rem;
}

.block-query__modal-section {
  margin-top: 1rem;
}

.block-query__modal-section:first-child {
  margin-top: 0;
}

.block-query__modal-section h3 {
  margin: 0 0 0.35rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  letter-spacing: 0.02em;
}

.block-query__modal-section p {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

/* ─── Crafting recipes ─── */
.block-query__recipes {
  display: grid;
  gap: 0.75rem;
}

.block-query__recipe {
  display: grid;
  grid-template-columns: auto 32px minmax(116px, 1fr);
  align-items: center;
  gap: 0.8rem;
  padding: 0.9rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  overflow: visible;
}

.block-query__crafting-grid {
  display: grid;
  grid-template-columns: repeat(3, 42px);
  grid-template-rows: repeat(3, 42px);
  gap: 4px;
  padding: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: color-mix(in srgb, var(--vp-c-brand-soft) 18%, var(--vp-c-bg-soft));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-bg) 70%, transparent);
}

.block-query__crafting-slot {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 86%, var(--vp-c-brand-2));
  border-radius: 9px;
  background: color-mix(in srgb, var(--vp-c-bg) 92%, var(--vp-c-bg-soft));
  overflow: visible;
  transition: border-color 0.16s ease, background-color 0.16s ease, box-shadow 0.16s ease;
}

.block-query__crafting-slot.is-empty {
  background:
    linear-gradient(135deg, transparent 0 46%, color-mix(in srgb, var(--vp-c-divider) 42%, transparent) 46% 54%, transparent 54%),
    color-mix(in srgb, var(--vp-c-bg-soft) 80%, var(--vp-c-bg));
  opacity: 0.62;
}

.block-query__crafting-slot.is-clickable:hover,
.block-query__crafting-slot:focus-within {
  border-color: var(--vp-c-brand-2);
  background: color-mix(in srgb, var(--vp-c-brand-soft) 24%, var(--vp-c-bg));
  box-shadow: 0 0 0 2px var(--vp-c-brand-soft);
}

.block-query__crafting-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: default;
}

.block-query__crafting-item.is-clickable,
.block-query__recipe-result.is-clickable {
  cursor: pointer;
}

.block-query__crafting-item.is-clickable:focus-visible,
.block-query__recipe-result.is-clickable:focus-visible {
  outline: none;
}

.block-query__crafting-item::before,
.block-query__recipe-result::before {
  content: attr(data-tip);
  position: absolute;
  left: 50%;
  bottom: calc(100% + 10px);
  z-index: 3;
  width: max-content;
  min-width: 132px;
  max-width: 220px;
  padding: 0.45rem 0.58rem;
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-2) 42%, var(--vp-c-divider));
  border-radius: 9px;
  background: color-mix(in srgb, var(--vp-c-bg) 96%, var(--vp-c-brand-soft));
  color: var(--vp-c-text-1);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.16);
  font-size: 0.72rem;
  font-weight: 600;
  line-height: 1.35;
  white-space: pre-line;
  text-align: left;
  transform: translate(-50%, 4px) scale(0.96);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.block-query__crafting-item:hover::before,
.block-query__crafting-item:focus-visible::before,
.block-query__recipe-result:hover::before,
.block-query__recipe-result:focus-visible::before {
  opacity: 1;
  transform: translate(-50%, 0) scale(1);
}

.block-query__crafting-icon,
.block-query__recipe-result-icon {
  width: 30px;
  height: 30px;
  object-fit: contain;
  image-rendering: pixelated;
  transition: transform 0.16s ease;
}

.block-query__crafting-item.is-clickable:hover .block-query__crafting-icon,
.block-query__crafting-item.is-clickable:focus-visible .block-query__crafting-icon,
.block-query__recipe-result.is-clickable:hover .block-query__recipe-result-icon,
.block-query__recipe-result.is-clickable:focus-visible .block-query__recipe-result-icon {
  transform: translateY(-1px) scale(1.06);
}

.block-query__crafting-name {
  max-width: 34px;
  padding: 0 0.15rem;
  color: var(--vp-c-text-1);
  font-size: 0.58rem;
  font-weight: 650;
  line-height: 1.15;
  text-align: center;
  word-break: keep-all;
  overflow-wrap: anywhere;
}

.block-query__crafting-count {
  position: absolute;
  right: 3px;
  bottom: 2px;
  color: #fff;
  font-size: 0.66rem;
  font-weight: 900;
  line-height: 1;
  text-shadow:
    1px 1px 0 #000,
    -1px 1px 0 #000,
    1px -1px 0 #000,
    -1px -1px 0 #000;
}

.block-query__recipe-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
}

.block-query__recipe-result {
  position: relative;
  display: grid;
  justify-items: center;
  align-content: center;
  gap: 0.38rem;
  min-height: 88px;
  padding: 0.72rem 0.65rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  color: inherit;
  font: inherit;
  text-align: center;
  transition: transform 0.16s ease, border-color 0.16s ease, background-color 0.16s ease, box-shadow 0.16s ease;
}

.block-query__recipe-result.is-clickable:hover,
.block-query__recipe-result.is-clickable:focus-visible {
  border-color: var(--vp-c-brand-2);
  background: color-mix(in srgb, var(--vp-c-brand-soft) 26%, var(--vp-c-bg-soft));
  box-shadow: 0 0 0 2px var(--vp-c-brand-soft);
  transform: translateY(-1px);
}

.block-query__recipe-result-icon {
  width: 34px;
  height: 34px;
}

.block-query__recipe-result-initial {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 0.78rem;
  font-weight: 750;
}

.block-query__recipe-result-name {
  color: var(--vp-c-text-1);
  font-size: 0.76rem;
  font-weight: 650;
  line-height: 1.25;
}

.block-query__recipe-note {
  grid-column: 1 / -1;
  margin-top: -0.15rem !important;
  padding: 0.55rem 0.7rem;
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 84%, var(--vp-c-brand-2));
  border-radius: 10px;
  background: color-mix(in srgb, var(--vp-c-brand-soft) 12%, var(--vp-c-bg-soft));
  color: var(--vp-c-text-2) !important;
  font-size: 0.78rem !important;
}

/* ─── Properties table ─── */
.block-query__prop-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
}

.block-query__prop-table tr {
  border-bottom: 1px solid var(--vp-c-divider);
}

.block-query__prop-table tr:last-child {
  border-bottom: none;
}

.block-query__prop-key {
  width: 28%;
  padding: 0.6rem 0.85rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-soft) 20%, var(--vp-c-bg-soft));
  border-right: 1px solid var(--vp-c-divider);
  text-align: left;
}

.block-query__prop-val {
  padding: 0.6rem 0.85rem;
  font-size: 0.82rem;
  color: var(--vp-c-text-1);
  text-align: left;
}

/* ─── Related items ─── */
.block-query__related-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.block-query__related-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
  padding: 0.3rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.82rem;
  cursor: pointer;
  transition: all 0.15s ease;
}

.block-query__related-chip:hover {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-soft) 30%, var(--vp-c-bg-soft));
}

.block-query__related-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
  image-rendering: pixelated;
  flex-shrink: 0;
}

.block-query__related-none {
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
}

/* ─── Responsive ─── */
@media (max-width: 640px) {
  .block-query__grid {
    grid-template-columns: 1fr;
  }

  .block-query__modal {
    max-height: 90vh;
    border-radius: 14px;
  }

  .block-query__modal-header {
    padding: 1.25rem 1.25rem 0;
  }

  .block-query__modal-body {
    padding: 1rem 1.25rem 1.25rem;
  }

  .block-query__recipe {
    grid-template-columns: 1fr;
    justify-items: center;
  }

  .block-query__recipe-arrow {
    transform: rotate(90deg);
  }

  .block-query__recipe-result {
    width: min(100%, 180px);
    box-sizing: border-box;
  }
}

@media (min-width: 641px) and (max-width: 960px) {
  .block-query__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
