<script setup lang="ts">
import { withBase } from 'vitepress'
import type { BlockEntry } from '../../data/block-query'

defineProps<{
  block: BlockEntry
  isEn: boolean
}>()
</script>

<template>
  <button class="block-query__card">
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
</template>
