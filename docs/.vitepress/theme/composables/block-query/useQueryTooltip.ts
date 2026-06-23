import { nextTick, ref } from 'vue'
import { getElementFloatingPosition } from '../../utils/floatingTooltip'

type TooltipRefTarget = Element | { el?: HTMLElement | null } | null

export function useQueryTooltip() {
  const tooltipRef = ref<HTMLElement | null>(null)
  const tooltipText = ref('')
  const tooltipStyle = ref<Record<string, string>>({})

  function setTooltipRef(target: TooltipRefTarget) {
    if (target instanceof HTMLElement) {
      tooltipRef.value = target
      return
    }

    tooltipRef.value = target?.el instanceof HTMLElement ? target.el : null
  }

  function showTooltip(event: FocusEvent | MouseEvent, text: string) {
    if (!text) return

    tooltipText.value = text
    nextTick(() => positionTooltip(event.currentTarget as HTMLElement))
  }

  function positionTooltip(target: HTMLElement) {
    const tooltip = tooltipRef.value
    if (!tooltip) return

    tooltipStyle.value = getElementFloatingPosition(target, tooltip)
  }

  function hideTooltip() {
    tooltipText.value = ''
  }

  return {
    tooltipRef,
    tooltipText,
    tooltipStyle,
    setTooltipRef,
    showTooltip,
    hideTooltip,
  }
}
