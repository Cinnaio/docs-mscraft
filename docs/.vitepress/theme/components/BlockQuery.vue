<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useData, withBase } from 'vitepress'
import { allBlocks, CATEGORIES_ZH, CATEGORIES_EN, type BlockEntry } from './block-list-data'

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
              <p>{{ isEn ? selectedBlock.obtainEn : selectedBlock.obtainZh }}</p>
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
  max-width: 560px;
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
  width: 40%;
  padding: 0.5rem 0.7rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border-right: 1px solid var(--vp-c-divider);
  text-align: left;
}

.block-query__prop-val {
  padding: 0.5rem 0.7rem;
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
}

@media (min-width: 641px) and (max-width: 960px) {
  .block-query__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
