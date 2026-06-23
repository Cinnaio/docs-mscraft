<script setup lang="ts">
import type { BlockProperty } from '../../data/block-query'

defineProps<{
  properties: BlockProperty[]
  isEn: boolean
}>()
</script>

<template>
  <table class="block-query__prop-table">
    <tbody>
      <tr v-for="property in properties" :key="`${property.labelZh}-${property.labelEn}`">
        <td class="block-query__prop-key">{{ isEn ? property.labelEn : property.labelZh }}</td>
        <td class="block-query__prop-val">{{ isEn ? property.valueEn : property.valueZh }}</td>
      </tr>
    </tbody>
  </table>
</template>
