<script setup lang="ts">
defineProps<{
  properties: Record<string, string>
}>()
</script>

<template>
  <table class="block-query__prop-table">
    <tbody>
      <tr v-for="(val, key) in properties" :key="key">
        <td class="block-query__prop-key">{{ key }}</td>
        <td class="block-query__prop-val">{{ val }}</td>
      </tr>
    </tbody>
  </table>
</template>
