import { computed, defineComponent, h } from 'vue'
import { useData, withBase } from 'vitepress'

type ShowcaseItem = {
  title: string
  description?: string
  image?: string
}

type ShowcaseFrontmatter = {
  showcase?: {
    eyebrow?: string
    title?: string
    subtitle?: string
    items?: ShowcaseItem[]
  }
}

function normalizeItems(items: unknown): ShowcaseItem[] {
  if (!Array.isArray(items)) return []
  return items
    .filter((x) => x && typeof x === 'object')
    .map((x: any) => ({
      title: String(x.title || ''),
      description: x.description ? String(x.description) : undefined,
      image: x.image ? String(x.image) : undefined
    }))
    .filter((x) => x.title.trim().length > 0)
}

export default defineComponent({
  name: 'HomeShowcase',
  setup() {
    const { frontmatter, lang } = useData<ShowcaseFrontmatter>()

    const isZh = computed(() => (lang.value || '').toLowerCase().startsWith('zh'))

    const content = computed(() => {
      const fm = (frontmatter.value || {}) as ShowcaseFrontmatter
      const sc = fm.showcase || {}
      const items = normalizeItems(sc.items).slice(0, 2)

      const rawEyebrow = sc.eyebrow != null ? String(sc.eyebrow).trim() : ''

      return {
        eyebrow: rawEyebrow,
        title: sc.title || (isZh.value ? '服务器特色' : 'Server Features'),
        subtitle:
          sc.subtitle ||
          (isZh.value ? '把核心玩法、机制与运营能力集中展示。' : 'A focused view of gameplay, mechanics, and ops.'),
        items
      }
    })

    const hasContent = computed(() => content.value.items.length === 2)

    return () => {
      if (!hasContent.value) return null

      const a = content.value.items[0]
      const b = content.value.items[1]
      const aStyle = a.image ? { backgroundImage: `url(${withBase(a.image)})` } : undefined
      const bStyle = b.image ? { backgroundImage: `url(${withBase(b.image)})` } : undefined

      const headerChildren: ReturnType<typeof h>[] = []
      if (content.value.eyebrow) {
        headerChildren.push(h('div', { class: 'home-showcase__eyebrow' }, content.value.eyebrow))
      }
      headerChildren.push(h('h2', { class: 'home-showcase__title' }, content.value.title))
      headerChildren.push(h('p', { class: 'home-showcase__subtitle' }, content.value.subtitle))

      return h('section', { class: 'home-showcase' }, [
        h('header', { class: 'home-showcase__header' }, headerChildren),
        h('div', { class: 'home-showcase__grid' }, [
          h('div', {
            class: ['home-showcase__card', 'home-showcase__card--media', a.image ? 'is-image' : 'is-fallback'].join(
              ' '
            ),
            style: aStyle,
            'aria-hidden': 'true'
          }),
          h('article', { class: ['home-showcase__card', 'home-showcase__card--text'].join(' ') }, [
            h('h3', { class: 'home-showcase__h3' }, a.title),
            a.description ? h('p', { class: 'home-showcase__p' }, a.description) : null
          ]),
          h('article', { class: ['home-showcase__card', 'home-showcase__card--text'].join(' ') }, [
            h('h3', { class: 'home-showcase__h3' }, b.title),
            b.description ? h('p', { class: 'home-showcase__p' }, b.description) : null
          ]),
          h('div', {
            class: ['home-showcase__card', 'home-showcase__card--media', b.image ? 'is-image' : 'is-fallback'].join(
              ' '
            ),
            style: bStyle,
            'aria-hidden': 'true'
          })
        ])
      ])
    }
  }
})

