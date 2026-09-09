<script setup lang="ts">
import { computed, ref, watch, useId } from 'vue'
import { withBase } from 'vitepress'
import TeaStoryItem from './TeaStoryItem.vue'
import { fullId, items, foodIds, recipeFor, itemName, methodName } from './data'

const props = withDefaults(defineProps<{ ids?: string[]; en?: boolean; catalog?: boolean }>(), { ids: () => [] })
const uid = useId()
const query = ref('')
const filter = ref('all')
const limit = ref(12)
const featured = ['osmanthus_rice_cake', 'xiaolongbao', 'boba_milk_tea_glass', 'pork_dumplings', 'longjing_shrimp', 'matcha_cookie', 'jujube_goji_congee', 'chenpi_puer_tea_glass', 'mint_qingtuan', 'lotus_mooncake', 'youtiao', 'double_skin_milk_pudding'].map(fullId)
const ids = computed(() => props.catalog ? [...featured, ...foodIds.filter((id) => !featured.includes(id))] : props.ids.map(fullId))
const filtered = computed(() => ids.value.filter((id) => {
  const item = items[id]
  const isDrink = id.endsWith('_glass')
  return (filter.value === 'all' || (filter.value === 'drinks' ? isDrink : !isDrink)) &&
    `${item?.zh} ${item?.en} ${id}`.toLocaleLowerCase().includes(query.value.trim().toLocaleLowerCase())
}))
const selected = ref(ids.value[0])
const history = ref<string[]>([])
const variant = ref(0)
const options = computed(() => recipeFor(selected.value))
const recipe = computed(() => options.value[variant.value] || options.value[0])
const canOpen = (id: string) => recipeFor(id).length > 0
const selectedItem = computed(() => items[selected.value])
function choose(id: string, nested = false) {
  history.value = nested ? [...history.value, selected.value] : []
  selected.value = fullId(id)
  variant.value = 0
}
function back() {
  const id = history.value.pop()
  if (id) { selected.value = id; variant.value = 0 }
}
function reset() { query.value = ''; filter.value = 'all' }
watch([query, filter], () => {
  limit.value = 12
  if (filtered.value.length && !filtered.value.includes(selected.value)) choose(filtered.value[0])
})
</script>

<template>
  <div class="tea-recipes" :class="{ 'tea-recipes--catalog': catalog }">
    <template v-if="catalog">
      <div class="tea-catalog-toolbar">
        <label class="tea-search" :for="`${uid}-search`">
          <span class="vpi-search" aria-hidden="true" />
          <span class="tea-sr-only">{{ en ? 'Search food and drinks' : '搜索茶点和饮品' }}</span>
          <input :id="`${uid}-search`" v-model="query" type="search" :placeholder="en ? 'Search name, e.g. dumplings' : '搜索名称，如：水饺、奶茶'" />
        </label>
        <label class="tea-filter" :for="`${uid}-filter`">
          <span class="tea-sr-only">{{ en ? 'Category' : '分类' }}</span>
          <select :id="`${uid}-filter`" v-model="filter">
            <option value="all">{{ en ? 'All' : '全部' }}</option>
            <option value="food">{{ en ? 'Food' : '茶点与料理' }}</option>
            <option value="drinks">{{ en ? 'Drinks' : '饮品' }}</option>
          </select>
        </label>
        <span class="tea-result-count" role="status">{{ filtered.length }} {{ en ? 'items' : '种' }}</span>
      </div>
      <div v-if="!filtered.length" class="tea-empty">
        <p>{{ en ? 'No matching items.' : '没有找到匹配的茶点或饮品。' }}</p>
        <button type="button" @click="reset">{{ en ? 'Clear filters' : '清除筛选' }}</button>
      </div>
    </template>

    <div class="tea-recipe-picker" :class="{ 'tea-recipe-picker--catalog': catalog }" :aria-label="en ? 'Choose an item' : '选择物品'">
      <button v-for="id in catalog ? filtered.slice(0, limit) : ids" :key="id" type="button"
        :aria-pressed="selected === id && !history.length" @click="choose(id)">
        <TeaStoryItem :id="id" :en="en" />
      </button>
    </div>
    <button v-if="catalog && filtered.length > limit" class="tea-show-more" type="button" @click="limit += 12">
      {{ en ? 'Show more' : '显示更多' }} <span class="vpi-arrow-down" aria-hidden="true" />
    </button>

    <section v-if="!catalog || filtered.length" class="tea-recipe-detail" :aria-label="itemName(selected, en)">
      <div class="tea-recipe-heading">
        <button v-if="history.length" type="button" class="tea-icon-button" :title="en ? 'Back to previous recipe' : '返回上一个配方'" :aria-label="en ? 'Back to previous recipe' : '返回上一个配方'" @click="back">
          <span class="vpi-arrow-left" aria-hidden="true" />
        </button>
        <h3>{{ itemName(selected, en) }}</h3>
        <span v-if="recipe" class="tea-method">{{ methodName(recipe.method, en) }}</span>
      </div>
      <label v-if="options.length > 1" class="tea-variant" :for="`${uid}-variant`">
        {{ en ? 'Recipe' : '配方' }}
        <select :id="`${uid}-variant`" v-model="variant">
          <option v-for="(option, index) in options" :key="option.id" :value="index">
            {{ methodName(option.method, en) }}{{ option.time ? ` · ${option.time} tick` : '' }}{{ options.filter((r) => r.method === option.method).length > 1 ? ` (${index + 1})` : '' }}
          </option>
        </select>
      </label>
      <template v-if="recipe">
        <div class="tea-crafting" :class="{ 'tea-crafting--shapeless': !recipe.pattern }">
          <div v-if="recipe.pattern" class="tea-crafting-grid" role="img" :aria-label="en ? '3 by 3 crafting pattern; ingredients listed below' : '三乘三工作台摆位，材料名称与数量见下方'">
            <div v-for="(id, index) in recipe.pattern" :key="index" class="tea-crafting-slot" :title="id ? itemName(id, en) : (en ? 'Empty' : '空位')">
              <img v-if="id && items[id]?.icon" :src="withBase(items[id].icon)" :alt="itemName(id, en)" width="40" height="40" loading="lazy" />
              <span v-else-if="id">{{ itemName(id, en) }}</span>
            </div>
          </div>
          <div v-else class="tea-ingredients">
            <TeaStoryItem v-for="(part, index) in recipe.inputs" :key="index" :id="part.ids[0]" :count="part.count" :en="en"
              :label="part.ids.length > 1 ? `${en ? 'Any: ' : '任一：'}${itemName(part.ids[0], en)}` : undefined"
              :interactive="canOpen(part.ids[0])" @open="choose($event, true)" />
          </div>
          <span class="vpi-arrow-right tea-crafting-arrow" aria-hidden="true" />
          <TeaStoryItem :id="recipe.result" :en="en" :count="recipe.count" class="tea-crafting-result" />
        </div>
        <ul v-if="recipe.pattern" class="tea-material-list">
          <li v-for="(part, index) in recipe.inputs" :key="index">
            <button v-if="canOpen(part.ids[0])" type="button" @click="choose(part.ids[0], true)">{{ itemName(part.ids[0], en) }}</button>
            <span v-else>{{ itemName(part.ids[0], en) }}</span>
            <span>× {{ part.count }}</span>
          </li>
        </ul>
        <div class="tea-recipe-facts">
          <span v-if="recipe.time">{{ en ? 'Processing' : '加工时间' }} {{ recipe.time }} tick</span>
          <span v-if="selectedItem?.food">{{ en ? 'Nutrition' : '营养值' }} {{ selectedItem.food.nutrition }} · {{ en ? 'Saturation' : '饱和度' }} {{ selectedItem.food.saturation }}</span>
          <span v-if="selectedItem?.returns">{{ en ? 'After consuming: ' : '食用后返还：' }}{{ itemName(selectedItem.returns, en) }}</span>
        </div>
        <p v-if="recipe.inputs.some((part) => part.ids.length > 1)" class="tea-recipe-note">
          {{ en ? 'Accepted alternatives: ' : '可替换材料：' }}{{ recipe.inputs.filter((part) => part.ids.length > 1).map((part) => part.ids.map((id) => itemName(id, en)).join(' / ')).join('; ') }}
        </p>
      </template>
      <p v-else>{{ en ? 'Obtain this item through growing or tea processing.' : '该物品通过种植采收或制茶加工获得。' }} <a href="#tea-making">{{ en ? 'Tea processing' : '查看制茶路线' }}</a></p>
    </section>
  </div>
</template>
