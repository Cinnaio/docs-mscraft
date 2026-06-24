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
  shapeless: { zh: '工作台 / 无序', en: 'Crafting / Shapeless' },
  smelting: { zh: '熔炉', en: 'Furnace' },
  blasting: { zh: '高炉', en: 'Blast Furnace' },
  smoking: { zh: '烟熏炉', en: 'Smoker' },
  campfire_cooking: { zh: '营火', en: 'Campfire' },
  brewing: { zh: '炼药台 / 发酵', en: 'Brewing Stand / Fermentation' },
}

type ProcessLayout = 'crafting' | 'cooking' | 'brewing'

function processLayout(process: ProcessRecipe): ProcessLayout {
  if (process.methods.some((method) => method.kind === 'brewing')) return 'brewing'
  if (process.methods.every((method) => method.kind === 'shapeless')) return 'crafting'
  return 'cooking'
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

function ingredientCountLabel(ingredient: ProcessIngredient): string {
  return ingredient.count && ingredient.count > 1 ? `×${ingredient.count}` : ''
}

function displayItem(ingredient?: ProcessIngredient): RecipeItem | undefined {
  return ingredient?.items[0]
}

function craftingSlots(process: ProcessRecipe): Array<ProcessIngredient | null> {
  return Array.from({ length: 9 }, (_, index) => process.inputs[index] ?? null)
}

function countLabel(item: RecipeItem, ingredient?: ProcessIngredient): string {
  return ingredientCountLabel(ingredient ?? { items: [item] }) || getItemCountLabel(item)
}

function getItemCountLabel(item: RecipeItem): string {
  return item.count && item.count > 1 ? String(item.count) : ''
}
</script>

<template>
  <div class="block-query__process-list">
    <article
      v-for="(process, processIndex) in processes"
      :key="process.id ?? processIndex"
      class="block-query__process-card"
      :class="`is-${processLayout(process)}`"
    >
      <div class="block-query__process-methods" :aria-label="isEn ? 'Processing methods' : '加工方式'">
        <span v-for="(method, methodIndex) in process.methods" :key="`${method.kind}-${methodIndex}`" class="block-query__process-method">
          <span>{{ methodLabel(method, isEn) }}</span>
          <small v-if="methodMeta(method, isEn)">{{ methodMeta(method, isEn) }}</small>
        </span>
      </div>

      <div v-if="processLayout(process) === 'crafting'" class="block-query__process-crafting">
        <div class="block-query__process-crafting-grid" role="grid" :aria-label="isEn ? 'Shapeless crafting grid' : '无序合成工作台'">
          <div
            v-for="(ingredient, slotIndex) in craftingSlots(process)"
            :key="slotIndex"
            class="block-query__crafting-slot"
            :class="{ 'is-empty': !ingredient, 'is-clickable': ingredient && displayItem(ingredient) && canOpen(displayItem(ingredient)!) }"
            role="gridcell"
          >
            <template v-if="ingredient && displayItem(ingredient)">
              <RecipeItemButton
                :item="displayItem(ingredient)!"
                :class="{ 'is-clickable': canOpen(displayItem(ingredient)!) }"
                :is-clickable="canOpen(displayItem(ingredient)!)"
                :name="getName(displayItem(ingredient)!)"
                :count-label="ingredientCountLabel(ingredient) || getCountLabel(displayItem(ingredient)!.count)"
                :tooltip="getTooltip(displayItem(ingredient)!)"
                @show-tooltip="(event, text) => emit('showTooltip', event, text)"
                @hide-tooltip="emit('hideTooltip')"
                @open="emit('open', $event)"
              />
              <span v-if="ingredient.items.length > 1" class="block-query__process-any">
                {{ isEn ? 'Any' : '任选' }}
              </span>
            </template>
          </div>
        </div>

        <div class="block-query__recipe-arrow" aria-hidden="true">→</div>

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

      <div v-else-if="processLayout(process) === 'brewing'" class="block-query__process-brewing">
        <div class="block-query__process-brewing-inputs">
          <div v-for="(ingredient, ingredientIndex) in process.inputs" :key="ingredientIndex" class="block-query__process-machine-slot">
            <span v-if="ingredientRole(ingredient, isEn)" class="block-query__process-slot-label">
              {{ ingredientRole(ingredient, isEn) }}
            </span>
            <RecipeItemButton
              v-if="displayItem(ingredient)"
              :item="displayItem(ingredient)!"
              :class="{ 'is-clickable': canOpen(displayItem(ingredient)!) }"
              :is-clickable="canOpen(displayItem(ingredient)!)"
              :name="getName(displayItem(ingredient)!)"
              :count-label="ingredientCountLabel(ingredient) || getCountLabel(displayItem(ingredient)!.count)"
              :tooltip="getTooltip(displayItem(ingredient)!)"
              @show-tooltip="(event, text) => emit('showTooltip', event, text)"
              @hide-tooltip="emit('hideTooltip')"
              @open="emit('open', $event)"
            />
          </div>
        </div>

        <div class="block-query__recipe-arrow" aria-hidden="true">→</div>

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

      <div v-else class="block-query__process-cooking">
        <div class="block-query__process-machine-slot">
          <span v-if="ingredientRole(process.inputs[0], isEn)" class="block-query__process-slot-label">
            {{ ingredientRole(process.inputs[0], isEn) }}
          </span>
          <RecipeItemButton
            v-if="displayItem(process.inputs[0])"
            :item="displayItem(process.inputs[0])!"
            :class="{ 'is-clickable': canOpen(displayItem(process.inputs[0])!) }"
            :is-clickable="canOpen(displayItem(process.inputs[0])!)"
            :name="getName(displayItem(process.inputs[0])!)"
            :count-label="ingredientCountLabel(process.inputs[0]) || getCountLabel(displayItem(process.inputs[0])!.count)"
            :tooltip="getTooltip(displayItem(process.inputs[0])!)"
            @show-tooltip="(event, text) => emit('showTooltip', event, text)"
            @hide-tooltip="emit('hideTooltip')"
            @open="emit('open', $event)"
          />
        </div>

        <div class="block-query__process-machine-core" aria-hidden="true">
          <span class="block-query__process-machine-flame">▴</span>
          <span class="block-query__process-machine-bar"></span>
        </div>

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

      <div v-if="process.returns?.length || process.byproducts?.length || process.inputs.some((ingredient) => ingredientNote(ingredient, isEn)) || (isEn ? process.noteEn : process.noteZh)" class="block-query__process-details">
        <div v-for="(ingredient, ingredientIndex) in process.inputs" :key="ingredientIndex">
          <p v-if="ingredientNote(ingredient, isEn)" class="block-query__process-main-note">
            {{ ingredientNote(ingredient, isEn) }}
          </p>
        </div>
        <div v-if="process.returns?.length" class="block-query__process-detail-row">
          <strong>{{ isEn ? 'Returns' : '返还' }}</strong>
          <span>{{ process.returns.map(getName).join(isEn ? ', ' : '、') }}</span>
        </div>
        <div v-if="process.byproducts?.length" class="block-query__process-detail-row">
          <strong>{{ isEn ? 'Byproducts' : '副产物' }}</strong>
          <span>{{ process.byproducts.map(getName).join(isEn ? ', ' : '、') }}</span>
        </div>
        <p v-if="isEn ? process.noteEn : process.noteZh" class="block-query__process-main-note">
          {{ isEn ? process.noteEn : process.noteZh }}
        </p>
      </div>
    </article>
  </div>
</template>
