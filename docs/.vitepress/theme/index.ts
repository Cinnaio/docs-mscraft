// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Router, Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HomeShowcase from './components/HomeShowcase'
import SkinAuthNav from './components/SkinAuthNav.vue'
import './style.css'

/**
 * OAuth 由 Cloudflare Functions 处理；VitePress 自带路由器会把部分同源链接当成文档页做 SPA 导航，
 * /api/auth/* 没有对应页面会加载失败。用捕获阶段点击 + onBeforeRouteChange 改为整页跳转。
 */
function installAuthLinkFullNavigation() {
  if (typeof window === 'undefined') return

  window.addEventListener(
    'click',
    (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const el = e.target
      if (!(el instanceof Element)) return
      const a = el.closest('a[href^="/api/auth/"]') as HTMLAnchorElement | null
      if (!a) return
      const href = a.getAttribute('href')
      if (!href) return
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
      window.location.assign(href)
    },
    true
  )
}

/**
 * VitePress 的 router 不是 vue-router，没有 beforeEach；应使用 onBeforeRouteChange。
 * normalizeHref 会给无扩展路径加 .html，需对 /api/auth/* 去掉误加的后缀再整页跳转。
 */
function installAuthRouteGuard(router: Router) {
  if (typeof window === 'undefined') return
  const prev = router.onBeforeRouteChange
  router.onBeforeRouteChange = async (href) => {
    if ((await prev?.(href)) === false) return false
    const u = new URL(href, window.location.origin)
    let path = u.pathname
    if (path.startsWith('/api/auth/') && path.endsWith('.html')) {
      path = path.slice(0, -'.html'.length)
    }
    if (!path.startsWith('/api/auth/')) return
    window.location.assign(path + u.search + u.hash)
    return false
  }
}

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'home-features-before': () => h(HomeShowcase),
      'nav-bar-content-after': () => h(SkinAuthNav)
    })
  },
  enhanceApp({ router }) {
    installAuthLinkFullNavigation()
    installAuthRouteGuard(router)
  }
} satisfies Theme
