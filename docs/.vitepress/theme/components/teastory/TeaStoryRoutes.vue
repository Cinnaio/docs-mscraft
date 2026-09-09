<script setup lang="ts">
import { computed, ref } from 'vue'
import TeaStoryItem from './TeaStoryItem.vue'
import { itemName } from './data'
const props = defineProps<{ en?: boolean }>()
const chosen = ref('green')
const types = ['green', 'yellow', 'white', 'oolong', 'black', 'puer', 'matcha', 'jasmine']
const routes: Record<string, [string, string, string][]> = {
  green: [['tea_leaf', '炒茶锅 · 杀青', 'Frying Pan · fixation'], ['green_tea_leaf', '炒茶锅 · 再炒一次', 'Frying Pan · pan-fire again']],
  yellow: [['tea_leaf', '炒茶锅 · 杀青', 'Frying Pan · fixation'], ['green_tea_leaf', '炒茶锅 · 炒青', 'Frying Pan · pan-firing'], ['yellow_tea_leaf', '茶盘 · 闷黄', 'Tea Pan · yellowing']],
  white: [['tea_leaf', '炒茶锅 · 杀青', 'Frying Pan · fixation'], ['white_tea_leaf', '茶炉 · 烘青', 'Tea Stove · drying']],
  oolong: [['tea_leaf', '炒茶锅 · 杀青', 'Frying Pan · fixation'], ['broken_tea_leaf', '工作台 + 研钵 · 研磨', 'Crafting table + mortar · grinding'], ['semi_fermented_tea_leaf', '发酵桶 · 半发酵', 'Barrel · partial fermentation'], ['oolong_tea_leaf', '茶炉 · 烘焙', 'Tea Stove · roasting']],
  black: [['tea_leaf', '炒茶锅 · 杀青', 'Frying Pan · fixation'], ['broken_tea_leaf', '工作台 + 研钵 · 研磨', 'Crafting table + mortar · grinding'], ['semi_fermented_tea_leaf', '发酵桶 · 半发酵', 'Barrel · partial fermentation'], ['fully_fermented_tea_leaf', '发酵桶 · 取出后再投入', 'Barrel · take out, then put back'], ['black_tea_leaf', '茶炉 · 烘焙', 'Tea Stove · roasting']],
  puer: [['tea_leaf', '炒茶锅 · 杀青', 'Frying Pan · fixation'], ['broken_tea_leaf', '工作台 + 研钵 · 研磨', 'Crafting table + mortar · grinding'], ['semi_fermented_tea_leaf', '发酵桶 · 半发酵', 'Barrel · partial fermentation'], ['fully_fermented_tea_leaf', '发酵桶 · 全发酵', 'Barrel · full fermentation'], ['deep_fermented_tea_leaf', '发酵桶 · 重发酵', 'Barrel · deep fermentation'], ['puer_tea_leaf', '茶炉 · 烘焙', 'Tea Stove · roasting']],
  matcha: [['tea_leaf', '炒茶锅 · 杀青', 'Frying Pan · fixation'], ['green_tea_leaf', '炒茶锅 · 炒青', 'Frying Pan · pan-firing'], ['matcha_tea_leaf', '茶炉 · 蒸青', 'Tea Stove · steaming']],
  jasmine: [['black_tea_leaf', '先完成红茶路线，准备红茶叶 ×6', 'Follow the black tea route; prepare 6 leaves'], ['jasmine_tea_leaf', '工作台 + 干茉莉 ×2 · 无序合成', 'Crafting table + 2 dried jasmine · shapeless']],
}
const steps = computed(() => chosen.value === 'jasmine' ? routes.jasmine : [
  ['fresh_tea_leaf_bud', '采收茶树', 'Harvest tea'],
  ['withered_tea_leaf_bud', '茶盘 · 晴天萎凋', 'Tea Pan · wither in clear weather'],
  ...routes[chosen.value],
])
</script>

<template>
  <div class="tea-routes">
    <div class="tea-route-picker" :aria-label="en ? 'Tea varieties' : '茶叶种类'">
      <button v-for="type in types" :key="type" type="button" :aria-pressed="chosen === type" @click="chosen = type">
        <TeaStoryItem :id="`${type}_tea_leaf`" :en="en" />
      </button>
    </div>
    <ol class="tea-route-steps" aria-live="polite">
      <li v-for="(step, index) in steps" :key="`${chosen}-${index}`">
        <span class="tea-route-number">{{ index + 1 }}</span>
        <TeaStoryItem :id="step[0]" :en="en" />
        <span>{{ step[en ? 2 : 1] }}</span>
      </li>
    </ol>
    <p class="tea-recipe-note">{{ en ? 'Each row shows the item after the named operation. Drying Pan and Tea Stove need fuel; fermentation uses only fermentation powder.' : '每行物品为该步完成后的产物。炒茶锅与茶炉需要燃料；发酵桶只用发酵粉。' }}</p>
  </div>
</template>
