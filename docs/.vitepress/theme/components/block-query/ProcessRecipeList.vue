<script setup lang="ts">
import type { ProcessIngredient, ProcessMethod, ProcessRecipe, RecipeItem } from '../../data/block-query'
import RecipeItemButton from './RecipeItemButton.vue'

defineProps<{
  processes: ProcessRecipe[]
  isEn: boolean
  getName: (item: RecipeItem) => string
  getCountLabel: (count?: number) => string
  getTooltip: (item: RecipeItem) => string
  canOpen: (item: RecipeItem) => boolean
}>()

const emit = defineEmits<{
  showTooltip: [event: FocusEvent | MouseEvent, text: string]
  hideTooltip: []
  open: [item: RecipeItem]
}>()

const methodLabels: Record<ProcessMethod['kind'], { zh: string; en: string }> = {
  shapeless: { zh: '无序合成', en: 'Shapeless' },
  smelting: { zh: '熔炉', en: 'Furnace' },
  blasting: { zh: '高炉', en: 'Blast Furnace' },
  smoking: { zh: '烟熏炉', en: 'Smoker' },
  campfire_cooking: { zh: '营火', en: 'Campfire' },
  brewing: { zh: '酿造', en: 'Brewing' },
}

function methodLabel(method: ProcessMethod, isEn: boolean): string {
  return isEn ? methodLabels[method.kind].en : methodLabels[method.kind].zh
}

function methodMeta(method: ProcessMethod, isEn: boolean): string | undefined {
  const parts: string[] = []

  if (method.timeTicks !== undefined) {
    const seconds = method.timeTicks / 20
    parts.push(isEn ? `${seconds}s` : `${seconds} 秒`)
  }

  if (method.experience !== undefined) {
    parts.push(isEn ? `XP ${method.experience}` : `经验 ${method.experience}`)
  }

  return parts.length > 0 ? parts.join(' · ') : undefined
}

function ingredientRole(ingredient: ProcessIngredient, isEn: boolean): string | undefined {
  return isEn ? ingredient.roleEn : ingredient.roleZh
}

function ingredientNote(ingredient: ProcessIngredient, isEn: boolean): string | undefined {
  return isEn ? ingredient.noteEn : ingredient.noteZh
}

function ingredientCountLabel(ingredient: ProcessIngredient, isEn: boolean): string {
  return ingredient.count && ingredient.count > 1 ? (isEn ? `×${ingredient.count}` : `×${ingredient.count}`) : ''
}
</script>

<template>
  <div class="block-query__process-list">
    <article v-for="(process, processIndex) in processes" :key="process.id ?? processIndex" class="block-query__process-card">
      <div class="block-query__process-flow">
        <div class="block-query__process-inputs">
          <div
            v-for="(ingredient, ingredientIndex) in process.inputs"
            :key="ingredientIndex"
            class="block-query__process-group"
          >
            <div v-if="ingredientRole(ingredient, isEn)" class="block-query__process-role">
              {{ ingredientRole(ingredient, isEn) }}
            </div>

            <div class="block-query__process-items">
              <template v-for="(item, itemIndex) in ingredient.items" :key="`${item.nameEn}-${itemIndex}`">
                <RecipeItemButton
                  :item="item"
                  :class="{ 'is-clickable': canOpen(item) }"
                  :is-clickable="canOpen(item)"
                  :name="getName(item)"
                  :count-label="getCountLabel(item.count)"
                  :tooltip="getTooltip(item)"
                  @show-tooltip="(event, text) => emit('showTooltip', event, text)"
                  @hide-tooltip="emit('hideTooltip')"
                  @open="emit('open', $event)"
                />
                <span v-if="itemIndex < ingredient.items.length - 1" class="block-query__process-or">
                  {{ isEn ? 'or' : '或' }}
                </span>
              </template>
            </div>

            <div v-if="ingredient.count && ingredient.count > 1" class="block-query__process-count">
              {{ ingredientCountLabel(ingredient, isEn) }}
            </div>
            <p v-if="ingredientNote(ingredient, isEn)" class="block-query__process-note">
              {{ ingredientNote(ingredient, isEn) }}
            </p>
          </div>
        </div>

        <div class="block-query__process-arrow" aria-hidden="true">→</div>

        <RecipeItemButton
          :item="process.result"
          is-result
          :class="{ 'is-clickable': canOpen(process.result) }"
          :is-clickable="canOpen(process.result)"
          :name="getName(process.result)"
          :count-label="getCountLabel(process.result.count)"
          :tooltip="getTooltip(process.result)"
          @show-tooltip="(event, text) => emit('showTooltip', event, text)"
          @hide-tooltip="emit('hideTooltip')"
          @open="emit('open', $event)"
        />
      </div>

      <div class="block-query__process-methods">
        <span v-for="(method, methodIndex) in process.methods" :key="`${method.kind}-${methodIndex}`" class="block-query__process-method">
          <span>{{ methodLabel(method, isEn) }}</span>
          <small v-if="methodMeta(method, isEn)">{{ methodMeta(method, isEn) }}</small>
        </span>
      </div>

      <div v-if="process.returns?.length || process.byproducts?.length" class="block-query__process-returns">
        <div v-if="process.returns?.length">
          <strong>{{ isEn ? 'Returns:' : '返还：' }}</strong>
          <span>{{ process.returns.map(getName).join(isEn ? ', ' : '、') }}</span>
        </div>
        <div v-if="process.byproducts?.length">
          <strong>{{ isEn ? 'Byproducts:' : '副产物：' }}</strong>
          <span>{{ process.byproducts.map(getName).join(isEn ? ', ' : '、') }}</span>
        </div>
      </div>

      <p v-if="isEn ? process.noteEn : process.noteZh" class="block-query__recipe-note block-query__process-main-note">
        {{ isEn ? process.noteEn : process.noteZh }}
      </p>
    </article>
  </div>
</template>
