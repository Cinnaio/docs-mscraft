// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HomeShowcase from './components/HomeShowcase'
import SiteFooter from './components/SiteFooter.vue'
import SiteContributors from './components/SiteContributors.vue'
import ServerStatus from './components/ServerStatus.vue'
import { installItemChipTooltip } from './item-chip-tooltip'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'home-features-after': () => h(HomeShowcase),
      'layout-bottom': () => h(SiteFooter)
    })
  },
  enhanceApp({ app }) {
    app.component('SiteContributors', SiteContributors)
    app.component('ServerStatus', ServerStatus)
    installItemChipTooltip()
  }
} satisfies Theme
