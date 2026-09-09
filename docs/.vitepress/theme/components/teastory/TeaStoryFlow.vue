<script setup lang="ts">
import TeaStoryItem from './TeaStoryItem.vue'
defineProps<{ en?: boolean; steps: { id: string; label?: string; note?: string; count?: number }[] }>()
</script>

<template>
  <ol class="tea-flow" :class="{ 'tea-flow--long': steps.length > 4 }" :aria-label="en ? 'Processing sequence' : '加工顺序'">
    <li v-for="(step, index) in steps" :key="`${step.id}-${index}`">
      <TeaStoryItem :id="step.id" :en="en" :count="step.count" :label="step.label" />
      <span v-if="step.note" class="tea-flow__note">{{ step.note }}</span>
      <span v-if="index < steps.length - 1" class="vpi-arrow-right tea-flow__arrow" aria-hidden="true" />
    </li>
  </ol>
</template>
