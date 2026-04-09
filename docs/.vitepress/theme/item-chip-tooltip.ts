type TooltipMeta = {
  title?: string
  desc: string
}

const ITEM_META: Record<string, TooltipMeta> = {
  鲜叶: { desc: '采茶阶段的原料，可继续萎凋处理。' },
  '鲜叶（单芽）': { title: '鲜叶（单芽）', desc: '高品质鲜叶，可萎凋后制成青叶。' },
  '鲜叶（一芽一叶）': { title: '鲜叶（一芽一叶）', desc: '常见高品质鲜叶，可萎凋后制成青叶。' },
  '鲜叶（一芽二叶）': { title: '鲜叶（一芽二叶）', desc: '中等品质鲜叶，可萎凋后制成青叶。' },
  '鲜叶（一芽三叶）': { title: '鲜叶（一芽三叶）', desc: '中低品质鲜叶，可萎凋后制成青叶。' },
  '鲜叶（老叶）': { title: '鲜叶（老叶）', desc: '基础鲜叶，可萎凋后制成青叶。' },
  萎凋叶: { desc: '鲜叶经营火萎凋后的中间物，可熔炉加工为青叶。' },
  '萎凋叶（单芽）': { title: '萎凋叶（单芽）', desc: '高品质萎凋叶，熔炉加工耗时更短。' },
  '萎凋叶（一芽一叶）': { title: '萎凋叶（一芽一叶）', desc: '常见高品质萎凋叶。' },
  '萎凋叶（一芽二叶）': { title: '萎凋叶（一芽二叶）', desc: '中等品质萎凋叶。' },
  '萎凋叶（一芽三叶）': { title: '萎凋叶（一芽三叶）', desc: '中低品质萎凋叶。' },
  '萎凋叶（老叶）': { title: '萎凋叶（老叶）', desc: '基础萎凋叶。' },
  青叶: { desc: '熔炉加工后的基础茶叶中间物。' },
  碎茶: { desc: '青叶经研钵处理的产物，是发酵与绿茶路线起点。' },
  半发酵茶: { desc: '发酵链第一阶段，可继续升级或走乌龙路线。' },
  全发酵茶: { desc: '发酵链第二阶段，可继续升级或走红茶路线。' },
  重发酵茶: { desc: '发酵链第三阶段，可走普洱路线。' },
  绿茶茶叶: { desc: '可制作绿茶茶包或进一步用于抹茶路线。' },
  乌龙茶茶叶: { desc: '可制作乌龙茶茶包。' },
  红茶茶叶: { desc: '可制作红茶茶包。' },
  普洱茶茶叶: { desc: '可制作普洱茶茶包。' },
  白茶茶叶: { desc: '可制作白茶茶包。' },
  黄茶茶叶: { desc: '可制作黄茶茶包。' },
  木制研钵研杵: { desc: '处理青叶为碎茶的工具，会消耗耐久。' },
  发酵粉: { desc: '发酵链核心材料，可由茶渣回收获得。' },
  茶筅: { desc: '抹茶路线核心工具，参与配方会消耗耐久。' },
  抹茶叶: { desc: '由茶筅与绿茶茶叶制得，可泡抹茶饮。' },
  空茶包: { desc: '装入茶叶后可得到各类茶包。' },
  对应茶叶: { desc: '指绿茶/红茶/乌龙/普洱/白茶/黄茶六类之一。' },
  对应茶包: { desc: '随放入茶叶类型变化。' },
  茶包: { desc: '与空壶和开水壶组合后可制成茶壶饮品。' },
  空壶: { desc: '泡壶所需壶体，可使用瓷壶或紫砂壶。' },
  成品茶壶: { desc: '可持续倒杯，直至内容耗尽。' },
  对应茶壶饮品: { desc: '按茶包类型生成对应口味的壶装饮品。' },
  杯子: { desc: '可用玻璃/石/木/瓷/紫砂等杯具。' },
  '任意杯子': { title: '任意杯子', desc: '任意材质杯具均可用于倒杯。' },
  对应杯装茶饮: { desc: '按茶壶口味和杯子材质生成对应成品。' },
  茶渣: { desc: '制壶过程返还，可回收发酵粉。' },
  玻璃杯: { desc: '可用于倒杯。' },
  石杯: { desc: '可用于倒杯。' },
  木杯: { desc: '可用于倒杯。' },
  瓷杯: { desc: '可用于倒杯。' },
  紫砂杯: { desc: '可用于倒杯。' },
  瓷壶: { desc: '泡壶容器之一。' },
  紫砂壶: { desc: '泡壶容器之一。' },
  水壶: { desc: '装水后加热可作为开水壶使用。' },
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
    const mapped = ITEM_META[rawName]
    const title = chip.dataset.tipTitle || mapped?.title || rawName || '物品'
    const desc = chip.dataset.tipDesc || mapped?.desc || '暂无描述'
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

