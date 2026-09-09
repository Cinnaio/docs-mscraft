<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { fullId, items, itemName } from './data'

const props = withDefaults(defineProps<{ id: string; en?: boolean; count?: number; label?: string; interactive?: boolean }>(), { count: 1 })
const item = computed(() => items[fullId(props.id)])
const name = computed(() => props.label || itemName(props.id, props.en))
defineEmits<{ open: [id: string] }>()
</script>

<template>
  <component :is="interactive ? 'button' : 'span'" class="tea-item" :class="{ 'is-interactive': interactive }"
    :type="interactive ? 'button' : undefined" :title="name" @click="interactive && $emit('open', fullId(id))">
    <span class="tea-item__art" :class="{ 'has-model-name': !item?.icon }">
      <img v-if="item?.icon" :src="withBase(item.icon)" alt="" width="48" height="48" loading="lazy" />
      <span v-else class="tea-item__model-name">{{ name }}</span>
      <span v-if="count > 1" class="tea-item__count">{{ count }}</span>
    </span>
    <span class="tea-item__name">{{ name }}</span>
  </component>
</template>
