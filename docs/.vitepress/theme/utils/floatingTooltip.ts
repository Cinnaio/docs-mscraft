export interface FloatingTooltipPositionOptions {
  gap?: number
  viewportPadding?: number
}

export function getElementFloatingPosition(
  target: HTMLElement,
  floating: HTMLElement,
  options: FloatingTooltipPositionOptions = {},
): Record<string, string> {
  const gap = options.gap ?? 10
  const viewportPadding = options.viewportPadding ?? 12
  const targetRect = target.getBoundingClientRect()
  const floatingRect = floating.getBoundingClientRect()
  const maxLeft = window.innerWidth - viewportPadding - floatingRect.width
  const preferredLeft = targetRect.left + targetRect.width / 2 - floatingRect.width / 2
  const left = Math.min(Math.max(preferredLeft, viewportPadding), Math.max(viewportPadding, maxLeft))
  const topCandidate = targetRect.top - floatingRect.height - gap
  const top = topCandidate >= viewportPadding ? topCandidate : targetRect.bottom + gap

  return {
    left: `${left}px`,
    top: `${top}px`,
  }
}

export function getPointerFloatingPosition(
  x: number,
  y: number,
  floating: HTMLElement,
  options: FloatingTooltipPositionOptions = {},
): Record<string, string> {
  const gap = options.gap ?? 16
  const viewportPadding = options.viewportPadding ?? 14
  const rect = floating.getBoundingClientRect()
  let left = x + gap
  let top = y + gap

  if (left + rect.width > window.innerWidth - viewportPadding) left = x - rect.width - gap
  if (top + rect.height > window.innerHeight - viewportPadding) top = y - rect.height - gap

  return {
    left: `${Math.max(viewportPadding, left)}px`,
    top: `${Math.max(viewportPadding, top)}px`,
  }
}
