<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'

type SelectValue = string | number
type TeaSelectOption = { value: SelectValue; label: string }

const props = withDefaults(defineProps<{
  modelValue: SelectValue
  options: readonly TeaSelectOption[]
  ariaLabel: string
  disabled?: boolean
}>(), { disabled: false })

const emit = defineEmits<{ 'update:modelValue': [value: SelectValue] }>()
const root = ref<HTMLElement | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)
const listbox = ref<HTMLUListElement | null>(null)
const open = ref(false)
const activeIndex = ref(0)
const uid = useId()
const listboxId = `tea-select-${uid}`

const selectedIndex = computed(() => {
  const index = props.options.findIndex((option) => option.value === props.modelValue)
  return index >= 0 ? index : 0
})
const selectedOption = computed(() => props.options[selectedIndex.value])
const optionId = (index: number) => `${listboxId}-option-${index}`

function focusActiveOption() {
  nextTick(() => listbox.value?.focus({ preventScroll: true }))
}

function openMenu() {
  if (props.disabled || !props.options.length) return
  activeIndex.value = selectedIndex.value
  open.value = true
  focusActiveOption()
}

function closeMenu(restoreFocus = false) {
  open.value = false
  if (restoreFocus) nextTick(() => trigger.value?.focus({ preventScroll: true }))
}

function toggleMenu() {
  if (open.value) closeMenu()
  else openMenu()
}

function moveActive(delta: number) {
  if (!props.options.length) return
  activeIndex.value = (activeIndex.value + delta + props.options.length) % props.options.length
}

function selectOption(index: number) {
  const option = props.options[index]
  if (!option) return
  activeIndex.value = index
  emit('update:modelValue', option.value)
  closeMenu(true)
}

function onTriggerKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    if (open.value) moveActive(event.key === 'ArrowUp' ? -1 : 1)
    else openMenu()
  } else if (event.key === 'Escape' && open.value) {
    event.preventDefault()
    closeMenu()
  }
}

function onListboxKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    moveActive(1)
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    moveActive(-1)
  } else if (event.key === 'Home') {
    event.preventDefault()
    activeIndex.value = 0
  } else if (event.key === 'End') {
    event.preventDefault()
    activeIndex.value = Math.max(0, props.options.length - 1)
  } else if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    selectOption(activeIndex.value)
  } else if (event.key === 'Escape') {
    event.preventDefault()
    closeMenu(true)
  } else if (event.key === 'Tab') {
    closeMenu()
  }
}

function onDocumentPointerDown(event: PointerEvent) {
  const target = event.target
  if (target instanceof Node && !root.value?.contains(target)) closeMenu()
}

watch(open, (isOpen) => {
  if (isOpen) document.addEventListener('pointerdown', onDocumentPointerDown)
  else document.removeEventListener('pointerdown', onDocumentPointerDown)
})

watch(() => props.modelValue, () => {
  if (!open.value) activeIndex.value = selectedIndex.value
})

onBeforeUnmount(() => document.removeEventListener('pointerdown', onDocumentPointerDown))
</script>

<template>
  <div ref="root" class="tea-select" :class="{ 'is-open': open, 'is-disabled': disabled }">
    <button
      ref="trigger"
      class="tea-select__trigger"
      type="button"
      :aria-label="ariaLabel"
      aria-haspopup="listbox"
      :aria-expanded="open"
      :aria-controls="listboxId"
      :aria-activedescendant="open && options.length ? optionId(activeIndex) : undefined"
      :disabled="disabled"
      @click="toggleMenu"
      @keydown="onTriggerKeydown"
    >
      <span class="tea-select__value">{{ selectedOption?.label }}</span>
      <span class="tea-select__chevron vpi-chevron-down" aria-hidden="true" />
    </button>

    <ul
      v-if="open"
      ref="listbox"
      :id="listboxId"
      class="tea-select__menu"
      role="listbox"
      tabindex="-1"
      :aria-label="ariaLabel"
      :aria-activedescendant="options.length ? optionId(activeIndex) : undefined"
      @keydown="onListboxKeydown"
    >
      <li
        v-for="(option, index) in options"
        :id="optionId(index)"
        :key="`${option.value}`"
        class="tea-select__option"
        :class="{ 'is-active': index === activeIndex, 'is-selected': option.value === modelValue }"
        role="option"
        :aria-selected="option.value === modelValue"
        @mouseenter="activeIndex = index"
        @mousedown.prevent
        @click="selectOption(index)"
      >
        <span>{{ option.label }}</span>
        <span v-if="option.value === modelValue" class="tea-select__selected-mark" aria-hidden="true" />
      </li>
    </ul>
  </div>
</template>
