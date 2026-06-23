<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  text: string
  tooltipStyle: Record<string, string>
}>()

const el = ref<HTMLElement | null>(null)

defineExpose({ el })
</script>

<template>
  <div ref="el" class="block-query__recipe-tooltip" :style="tooltipStyle">
    {{ text }}
  </div>
</template>
