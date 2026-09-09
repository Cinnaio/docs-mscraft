<script setup lang="ts">
import { withBase } from 'vitepress'
import TeaStoryItem from './TeaStoryItem.vue'
import { itemName, items } from './data'
import type { TeaRecipe } from './data'

withDefaults(defineProps<{
  recipe: TeaRecipe
  en?: boolean
  canOpen: (id: string) => boolean
}>(), { en: false })
const emit = defineEmits<{ open: [id: string] }>()
</script>

<template>
  <div class="tea-recipe-board" :class="{ 'tea-recipe-board--shapeless': !recipe.pattern }">
    <div class="tea-recipe-board__materials">
      <div v-if="recipe.pattern" class="tea-recipe-grid" role="img" :aria-label="en ? '3 by 3 crafting pattern; ingredients listed below' : '三乘三工作台摆位，材料名称与数量见下方'">
        <div v-for="(id, index) in recipe.pattern" :key="index" class="tea-recipe-slot" :title="id ? itemName(id, en) : (en ? 'Empty' : '空位')">
          <img v-if="id && items[id]?.icon" :src="withBase(items[id].icon)" :alt="itemName(id, en)" width="40" height="40" loading="lazy" />
          <span v-else-if="id">{{ itemName(id, en) }}</span>
        </div>
      </div>
      <div v-else class="tea-recipe-ingredients">
        <TeaStoryItem v-for="(part, index) in recipe.inputs" :key="index" :id="part.ids[0]" :count="part.count" :en="en"
          :label="part.ids.length > 1 ? `${en ? 'Any: ' : '任一：'}${itemName(part.ids[0], en)}` : undefined"
          :interactive="canOpen(part.ids[0])" @open="emit('open', $event)" />
      </div>
    </div>

    <div class="tea-recipe-board__connector" aria-hidden="true">
      <span class="vpi-arrow-right" />
    </div>

    <div class="tea-recipe-board__result">
      <TeaStoryItem :id="recipe.result" :en="en" :count="recipe.count" />
    </div>
  </div>

  <ul v-if="recipe.pattern" class="tea-material-list">
    <li v-for="(part, index) in recipe.inputs" :key="index">
      <button v-if="canOpen(part.ids[0])" type="button" @click="emit('open', part.ids[0])">{{ itemName(part.ids[0], en) }}</button>
      <span v-else>{{ itemName(part.ids[0], en) }}</span>
      <span>× {{ part.count }}</span>
    </li>
  </ul>
</template>
