// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import type { Router } from 'vue-router'
import DefaultTheme from 'vitepress/theme'
import HomeShowcase from './components/HomeShowcase'
import SkinAuthNav from './components/SkinAuthNav.vue'
import './style.css'

/**
 * OAuth 由 Cloudflare Functions 处理；Vue Router 会在捕获阶段拦截同源链接并 client-side 导航，
 * 导致 /api/auth/* 无路由 → 404。必须在 window 捕获阶段最早拦截并整页跳转。
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

/** 若点击拦截仍晚于路由，阻止 SPA 导航并改为整页请求 Functions */
function installAuthRouteGuard(router: Router) {
  if (typeof window === 'undefined') return
  router.beforeEach((to) => {
    if (!to.path.startsWith('/api/auth/')) return
    const path = to.fullPath || to.path
    window.location.assign(path.startsWith('/') ? path : `/${path}`)
    return false
  })
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
