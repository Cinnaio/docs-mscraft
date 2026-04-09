type TooltipMeta = {
  title?: string
  desc: string
}

import zhMetaRaw from '../../_item-chip-tooltip/zh.md?raw'
import enMetaRaw from '../../_item-chip-tooltip/en.md?raw'

function parseMetaFromMarkdown(raw: string): Record<string, TooltipMeta> {
  const m = raw.match(/```json\s*([\s\S]*?)\s*```/i)
  if (!m?.[1]) return {}
  try {
    return JSON.parse(m[1]) as Record<string, TooltipMeta>
  } catch {
    return {}
  }
}

const ITEM_META_ZH = parseMetaFromMarkdown(zhMetaRaw)
const ITEM_META_EN = parseMetaFromMarkdown(enMetaRaw)

function isEnglishLocale(): boolean {
  const lang = (document.documentElement.lang || '').toLowerCase()
  return lang.startsWith('en')
}

function normalizeChipName(text: string): string {
  return text
    .replace(/\s*x\d+\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function installItemChipTooltip() {
  if (typeof window === 'undefined') return

  const tooltip = document.createElement('div')
  tooltip.className = 'mc-item-tooltip'
  tooltip.innerHTML = '<div class="mc-item-tooltip__title"></div><div class="mc-item-tooltip__desc"></div>'
  document.body.appendChild(tooltip)

  const titleEl = tooltip.querySelector('.mc-item-tooltip__title') as HTMLDivElement
  const descEl = tooltip.querySelector('.mc-item-tooltip__desc') as HTMLDivElement

  let currentChip: HTMLElement | null = null

  const hide = () => {
    currentChip = null
    tooltip.classList.remove('is-visible')
  }

  const positionTooltip = (x: number, y: number) => {
    const pad = 14
    const rect = tooltip.getBoundingClientRect()
    let left = x + 16
    let top = y + 16
    if (left + rect.width > window.innerWidth - pad) left = x - rect.width - 16
    if (top + rect.height > window.innerHeight - pad) top = y - rect.height - 16
    tooltip.style.left = `${Math.max(pad, left)}px`
    tooltip.style.top = `${Math.max(pad, top)}px`
  }

  document.addEventListener('pointerover', (e) => {
    const t = e.target as HTMLElement | null
    const chip = t?.closest?.('.item-chip') as HTMLElement | null
    if (!chip) return

    currentChip = chip
    const rawName = normalizeChipName(chip.innerText || '')
    const localePrimary = isEnglishLocale() ? ITEM_META_EN : ITEM_META_ZH
    const localeFallback = isEnglishLocale() ? ITEM_META_ZH : ITEM_META_EN
    const mapped = localePrimary[rawName] ?? localeFallback[rawName]
    const title = chip.dataset.tipTitle || mapped?.title || rawName || (isEnglishLocale() ? 'Item' : '物品')
    const desc = chip.dataset.tipDesc || mapped?.desc || (isEnglishLocale() ? 'No description yet.' : '暂无描述')
    titleEl.textContent = title
    descEl.textContent = desc

    tooltip.classList.add('is-visible')
    const pe = e as PointerEvent
    positionTooltip(pe.clientX, pe.clientY)
  })

  document.addEventListener('pointermove', (e) => {
    if (!currentChip || !tooltip.classList.contains('is-visible')) return
    const pe = e as PointerEvent
    positionTooltip(pe.clientX, pe.clientY)
  })

  document.addEventListener('pointerout', (e) => {
    const t = e.target as HTMLElement | null
    if (!t?.closest?.('.item-chip')) return
    hide()
  })

  document.addEventListener('scroll', hide, true)
  window.addEventListener('blur', hide)
}

