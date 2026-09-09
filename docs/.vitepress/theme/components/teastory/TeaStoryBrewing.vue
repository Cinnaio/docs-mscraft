<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import TeaStoryItem from './TeaStoryItem.vue'
import TeaStorySelect from './TeaStorySelect.vue'
import { recipes, items, itemName, slots } from './data'
const props = defineProps<{ en?: boolean }>()
const tea = ref('green_tea')
const vessel = ref('glass')
const varieties = ['green_tea', 'black_tea', 'jasmine_tea', 'oolong_tea', 'puer_tea', 'white_tea', 'yellow_tea', 'milk_tea', 'lemon_tea', 'matcha_drink']
const materials = [
  ['glass', '玻璃杯', 'Glass cup'], ['stone', '石杯', 'Stone cup'], ['wood', '木杯', 'Wooden cup'],
  ['porcelain', '瓷杯', 'Porcelain cup'], ['zisha', '紫砂杯', 'Zisha cup'],
  ['porcelain_kettle', '瓷壶 · 4 杯', 'Porcelain teapot · 4 cups'], ['zisha_kettle', '紫砂壶 · 8 杯', 'Zisha teapot · 8 cups'],
]
const teaOptions = computed(() => varieties.map((type) => ({ value: type, label: itemName(`${type}_glass`, props.en) })))
const vesselOptions = computed(() => materials.map((material) => ({ value: material[0], label: material[props.en ? 2 : 1] })))
const result = computed(() => `cgap:${tea.value}_${vessel.value}`)
const recipe = computed(() => recipes.find((r) => r.method === 'tea_table' && r.result === result.value && r.inputs.some((p) => p.role === 'water')))
const overlays = computed(() => recipe.value ? [
  ...recipe.value.inputs.map((part) => ({ id: part.ids[0], count: part.count, slot: slots[`${part.role}-slot`] })),
  { id: result.value, count: 1, slot: slots['output-slot'] },
] : [])
function position(slot: number) {
  return { left: `${(9 + slot % 9 * 18) / 176 * 100}%`, top: `${(18 + Math.floor(slot / 9) * 18) / 78 * 100}%` }
}
</script>

<template>
  <div class="tea-brewing">
    <div class="tea-brew-controls">
      <div class="tea-select-field">
        <span class="tea-select-field__label">{{ en ? 'Tea' : '茶饮' }}</span>
        <TeaStorySelect v-model="tea" :options="teaOptions" :aria-label="en ? 'Tea' : '茶饮'" />
      </div>
      <div class="tea-select-field">
        <span class="tea-select-field__label">{{ en ? 'Container' : '容器' }}</span>
        <TeaStorySelect v-model="vessel" :options="vesselOptions" :aria-label="en ? 'Container' : '容器'" />
      </div>
    </div>
    <template v-if="recipe">
      <div class="tea-brew-layout">
        <figure class="tea-gui-figure">
          <div class="tea-gui" role="img" :aria-label="en ? 'Tea Table slot layout with ingredients and result' : '茶桌槽位示意：材料及成品位置'">
            <img class="tea-gui__background" :src="withBase('/images/teastory/gui/tea_table.png')" alt="" width="256" height="256" />
            <span v-for="overlay in overlays" :key="overlay.slot" class="tea-gui__item" :style="position(overlay.slot)" :title="itemName(overlay.id, en)">
              <img v-if="items[overlay.id]?.icon" :src="withBase(items[overlay.id].icon)" alt="" width="16" height="16" />
              <span v-if="overlay.count > 1">{{ overlay.count }}</span>
            </span>
          </div>
          <figcaption>{{ en ? 'Tea Table · ingredient placement' : '茶桌 · 投料位置' }}</figcaption>
        </figure>
        <div class="tea-brew-recipe" aria-live="polite">
          <div class="tea-brew-ingredients">
            <TeaStoryItem v-for="part in recipe.inputs" :key="part.role" :id="part.ids[0]" :count="part.count" :en="en"
              :label="part.role === 'water' ? (en ? 'Any boiled kettle' : '任意开水壶') : undefined" />
          </div>
          <div class="tea-brew-result"><span class="vpi-arrow-right" aria-hidden="true" /><TeaStoryItem :id="result" :en="en" /></div>
        </div>
      </div>
      <p class="tea-recipe-note">{{ en ? 'Right-click the Tea Table to open it. Boiled water is required; unheated water will not work. The empty water kettle is returned. Take the finished drink from the output slot.' : '右击茶桌打开界面。水槽必须放开水壶，未烧开的水壶不能冲泡；冲泡后返还空水壶，从产出槽取走成品。' }}</p>
    </template>
    <p v-else>{{ en ? 'No recipe for this combination.' : '这个组合暂无配方。' }}</p>
  </div>
</template>
