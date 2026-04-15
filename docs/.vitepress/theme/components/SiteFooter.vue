<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

/** 底栏年代：品牌 + 时间跨度 + 一句定位，避免仅「群隙 2022-2026」信息过薄 */
function buildEraLine(en: boolean) {
  const y = new Date().getFullYear()
  if (en) {
    return `ClusterGap · Est. 2022 — ${y} · Player-driven Minecraft community`
  }
  return `群隙 · 2022—${y} · 玩家驱动的 Minecraft 社区`
}

/** 底栏心意行署名，与 GitHub org 等保持一致时可改此处 */
const HEART_FOR = 'Cinnaio'

/** 按需改成你的 B 站空间、QQ 频道、实时地图等 */
const EXTERNAL = {
  bilibiliSpace: 'https://www.bilibili.com/',
  qqChannel: 'https://pd.qq.com/',
  liveMap: 'https://map.mscraft.uk',
} as const

const { lang, site } = useData()
const route = useRoute()

const eraDisplay = ref(buildEraLine(lang.value === 'en-US'))

onMounted(() => {
  eraDisplay.value = buildEraLine(lang.value === 'en-US')
})

watch(
  () => lang.value,
  () => {
    eraDisplay.value = buildEraLine(lang.value === 'en-US')
  },
)

/** 仅首页（根与英文首页）展示，文档页不渲染 */
const isHomePage = computed(() => {
  let path = route.path
  const baseRaw = site.value.base || '/'
  const base = baseRaw.replace(/\/$/, '')
  if (base && path.startsWith(base)) {
    path = path.slice(base.length) || '/'
  }
  const normalized = path.replace(/\/$/, '') || '/'
  return normalized === '/' || normalized === '/en'
})

const copy = computed(() => {
  const en = lang.value === 'en-US'
  const base = en ? '/en' : ''
  return {
    brandPixel: 'ClusterGap',
    tagline: en
      ? 'Player-driven economy & seasons.'
      : '有你，才叫群隙',
    colQuick: en ? 'Quick links' : '快捷链接',
    colSocial: en ? 'Social' : '社交平台',
    colFollow: en ? 'Follow us' : '关注我们',
    links: {
      status: { text: en ? 'Status monitor' : '状态监控', href: `${base}/status` },
      skin: { text: en ? 'Skin station' : '皮肤站', href: 'https://skin.cubem.cn' },
      map: { text: en ? 'Live map' : '实时地图', href: EXTERNAL.liveMap },
    },
    social: {
      github: { text: 'GitHub', href: 'https://github.com/clustergap' },
      bilibili: { text: en ? 'ClusterGap on Bilibili' : '群隙时报（B站）', href: EXTERNAL.bilibiliSpace },
      qq: { text: en ? 'QQ Channel' : 'QQ 频道', href: EXTERNAL.qqChannel },
    },
    bilibiliCta: en ? 'Bilibili homepage' : '群隙时报 B站主页',
    /** 底栏文案拆成「弱说明 + 品牌名」，避免整句同色、emoji 在各端颜色不一致 */
    cf: en
      ? { lead: 'Hosted on ', brand: 'Cloudflare', trail: '' }
      : { lead: '由 ', brand: 'Cloudflare', trail: ' 提供网络与页面服务' },
    /** 心为矢量图标；英文含蓄、中文「心」+「意」由图标衔接 */
    heart: en
      ? { before: 'With ', after: ` from ${HEART_FOR}` }
      : { before: `一份来自 ${HEART_FOR} 的`, after: '意' },
    heartAria: en
      ? `With love from ${HEART_FOR}`
      : `一份来自 ${HEART_FOR} 的心意`,
  }
})
</script>

<template>
  <footer v-if="isHomePage" class="site-footer" aria-label="Site footer">
    <div class="site-footer__glow" aria-hidden="true" />
    <div class="site-footer__grid" aria-hidden="true" />
    <div class="site-footer__inner">
      <div class="site-footer__top">
        <div class="site-footer__brand">
          <img
            class="site-footer__logo"
            src="/images/logo.png"
            width="48"
            height="48"
            alt=""
          />
          <div class="site-footer__brand-text">
            <span class="site-footer__name">{{ copy.brandPixel }}</span>
            <p class="site-footer__tagline">{{ copy.tagline }}</p>
          </div>
        </div>

        <div class="site-footer__nav">
          <div class="site-footer__col">
            <h2 class="site-footer__heading">{{ copy.colQuick }}</h2>
            <ul class="site-footer__list">
              <li>
                <a :href="copy.links.status.href">{{ copy.links.status.text }}</a>
              </li>
              <li>
                <a :href="copy.links.skin.href" target="_blank" rel="noopener noreferrer">{{
                  copy.links.skin.text
                }}</a>
              </li>
              <li>
                <a :href="copy.links.map.href" target="_blank" rel="noopener noreferrer">{{
                  copy.links.map.text
                }}</a>
              </li>
            </ul>
          </div>

          <div class="site-footer__col">
            <h2 class="site-footer__heading">{{ copy.colSocial }}</h2>
            <ul class="site-footer__list">
              <li>
                <a :href="copy.social.github.href" target="_blank" rel="noopener noreferrer">{{
                  copy.social.github.text
                }}</a>
              </li>
              <li>
                <a :href="copy.social.bilibili.href" target="_blank" rel="noopener noreferrer">{{
                  copy.social.bilibili.text
                }}</a>
              </li>
              <li>
                <a :href="copy.social.qq.href" target="_blank" rel="noopener noreferrer">{{
                  copy.social.qq.text
                }}</a>
              </li>
            </ul>
          </div>

          <div class="site-footer__col site-footer__col--follow">
            <h2 class="site-footer__heading">{{ copy.colFollow }}</h2>
            <a
              class="site-footer__bili-btn"
              :href="EXTERNAL.bilibiliSpace"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg class="site-footer__bili-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M4 4h4l2 3h4l2-3h4v2h-2.5l2 12H6.5l2-12H4V4zm3.5 4L6 18h12l-1.5-10h-9zM8 15h2v2H8v-2zm6 0h2v2h-2v-2z"
                />
              </svg>
              <span>{{ copy.bilibiliCta }}</span>
            </a>
          </div>
        </div>
      </div>

      <div class="site-footer__bar" role="contentinfo">
        <div class="site-footer__bar-meta">
          <p class="site-footer__bar-era">{{ eraDisplay }}</p>
          <p class="site-footer__bar-heart" :aria-label="copy.heartAria">
            <span class="site-footer__bar-heart-text">{{ copy.heart.before }}</span>
            <svg class="site-footer__bar-heart-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
            <span v-if="copy.heart.after" class="site-footer__bar-heart-text">{{ copy.heart.after }}</span>
          </p>
        </div>
        <span class="site-footer__bar-rule" aria-hidden="true" />
        <a
          class="site-footer__bar-cf"
          href="https://www.cloudflare.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="site-footer__bar-cf-text">
            <span class="site-footer__bar-cf-muted">{{ copy.cf.lead }}</span>
            <span class="site-footer__bar-cf-brand">{{ copy.cf.brand }}</span>
            <span v-if="copy.cf.trail" class="site-footer__bar-cf-muted">{{ copy.cf.trail }}</span>
          </span>
          <svg class="site-footer__bar-cf-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* 避免 color-mix + :global(scoped) 在部分环境下影响整页；仅用 var(--vp-*) */
.site-footer {
  position: relative;
  margin-top: 3rem;
  padding: 2.75rem 1.5rem 3rem;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-family:
    'Microsoft YaHei',
    'PingFang SC',
    system-ui,
    sans-serif;
  border-top: 1px solid var(--vp-c-divider);
  width: 100%;
  max-width: 100%;
  margin-left: 0;
  margin-right: 0;
  box-sizing: border-box;
  overflow: hidden;
}

.site-footer__glow {
  position: absolute;
  top: 0;
  left: 8%;
  width: 50%;
  max-width: 520px;
  height: 130px;
  pointer-events: none;
  background: radial-gradient(
    ellipse 85% 100% at 45% 0%,
    var(--vp-c-brand-soft) 0%,
    transparent 72%
  );
  filter: blur(2px);
  opacity: 0.65;
}

html:not(.dark) .site-footer__glow {
  opacity: 0.35;
}

.site-footer__grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.28;
  background-image:
    linear-gradient(var(--vp-c-divider) 1px, transparent 1px),
    linear-gradient(90deg, var(--vp-c-divider) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.08) 72%, transparent 100%);
}

/* 浅色主题：略强于默认，避免「看不见」又不会像上一版那样过重 */
html:not(.dark) .site-footer__grid {
  opacity: 0.36;
  background-image:
    linear-gradient(var(--vp-c-divider) 1px, transparent 1px),
    linear-gradient(90deg, var(--vp-c-divider) 1px, transparent 1px);
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.62) 0%, rgba(0, 0, 0, 0.1) 72%, transparent 100%);
}

html.dark .site-footer__grid {
  opacity: 0.4;
}

.site-footer__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1.75rem;
  max-width: 1152px;
  margin: 0 auto;
}

/* 品牌 + 外链栅格；与底部「由 Cloudflare 驱动」分离，避免桌面端被挤成第三列 */
.site-footer__top {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 2rem;
  width: 100%;
  min-width: 0;
}

@media (min-width: 960px) {
  .site-footer__top {
    flex-direction: row;
    align-items: flex-start;
    gap: clamp(1.75rem, 4vw, 3rem);
  }
}

/* 底栏：与正文容器一致的圆角条 + 层级字色，暗色不刺眼 */
.site-footer__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.65rem 1rem;
  margin: 1.5rem auto 0;
  width: 100%;
  max-width: min(42rem, 100%);
  flex: 0 0 auto;
  padding: 0.85rem 1.15rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: color-mix(in srgb, var(--vp-c-bg-alt) 72%, var(--vp-c-bg-soft) 28%);
  box-shadow: 0 1px 0 color-mix(in srgb, var(--vp-c-bg) 55%, transparent) inset;
}

@media (min-width: 960px) {
  .site-footer__bar {
    padding: 0.95rem 1.35rem;
    gap: 0.75rem 1.25rem;
  }
}

.site-footer__bar-meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  max-width: min(28rem, 100%);
  text-align: center;
}

.site-footer__bar-era {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.45;
  letter-spacing: 0.02em;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.site-footer__bar-heart {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.28em;
  margin: 0;
  font-size: 0.6875rem;
  line-height: 1.4;
  letter-spacing: 0.06em;
  color: var(--vp-c-text-3);
  font-weight: 500;
}

.site-footer__bar-heart-text {
  color: inherit;
}

.site-footer__bar-rule {
  width: 1px;
  height: 0.85rem;
  background: var(--vp-c-divider);
  flex-shrink: 0;
  opacity: 0.9;
}

.site-footer__bar-cf {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  max-width: 100%;
  text-decoration: none;
  color: var(--vp-c-text-1);
  font-size: 0.75rem;
  line-height: 1.45;
  padding: 0.2rem 0.35rem;
  margin: -0.2rem -0.35rem;
  border-radius: 8px;
  transition:
    color 0.18s ease,
    background 0.18s ease;
}

.site-footer__bar-cf:hover {
  color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-soft) 35%, transparent);
}

.site-footer__bar-cf-text {
  display: inline;
  text-align: left;
}

.site-footer__bar-cf-muted {
  color: var(--vp-c-text-3);
  font-weight: 400;
}

.site-footer__bar-cf:hover .site-footer__bar-cf-muted {
  color: color-mix(in srgb, var(--vp-c-brand-1) 35%, var(--vp-c-text-3) 65%);
}

.site-footer__bar-cf-brand {
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--vp-c-text-2);
}

.site-footer__bar-cf:hover .site-footer__bar-cf-brand {
  color: var(--vp-c-brand-2);
}

.site-footer__bar-cf-icon,
.site-footer__bar-heart-icon {
  width: 0.95rem;
  height: 0.95rem;
  flex-shrink: 0;
  opacity: 0.55;
  color: var(--vp-c-brand-3);
  transition:
    opacity 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease;
}

.site-footer__bar-cf:hover .site-footer__bar-cf-icon {
  opacity: 0.95;
  color: var(--vp-c-brand-2);
  transform: scale(1.06);
}

html.dark .site-footer__bar {
  background: color-mix(in srgb, var(--vp-c-bg-alt) 55%, var(--vp-c-bg) 45%);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.04) inset,
    0 8px 28px rgba(0, 0, 0, 0.22);
}

html.dark .site-footer__bar-cf-icon,
html.dark .site-footer__bar-heart-icon {
  opacity: 0.5;
}

/* 三栏外链：窄屏起即为「快捷链接 | 社交平台」两列，关注我们独占一行 */
.site-footer__nav {
  flex: 1 1 0;
  min-width: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem 1.25rem;
}

.site-footer__col--follow {
  grid-column: 1 / -1;
}

@media (min-width: 960px) {
  .site-footer__nav {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem 1.75rem;
    align-items: start;
  }

  .site-footer__col--follow {
    grid-column: auto;
  }

  .site-footer__nav .site-footer__col:not(:first-child) {
    padding-left: 1.35rem;
    border-left: 1px solid var(--vp-c-divider);
  }
}

.site-footer__brand {
  flex: 0 1 auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;
}

@media (min-width: 960px) {
  .site-footer__brand {
    flex: 0 0 min(240px, 28vw);
    padding-top: 0.35rem;
  }
}

.site-footer__logo {
  flex-shrink: 0;
  border-radius: 10px;
  object-fit: contain;
  box-shadow:
    0 0 0 1px var(--vp-c-divider),
    0 6px 20px rgba(0, 0, 0, 0.08);
}

/* 暗色下不加外圈，避免与 logo 图自带红底形成「框套框」和浅蓝描边/光晕感 */
html.dark .site-footer__logo {
  box-shadow: none;
}

.site-footer__brand-text {
  min-width: 0;
}

.site-footer__name {
  display: block;
  font-family: 'Press Start 2P', ui-monospace, monospace;
  font-size: clamp(0.6rem, 1.65vw, 0.72rem);
  line-height: 1.65;
  letter-spacing: 0.04em;
  /* 与首页 VPHero 标题同源：style.css 中 --vp-home-hero-name-* */
  color: var(--vp-home-hero-name-color, transparent);
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  background-clip: text;
}

html.dark .site-footer__name {
  filter: none;
}

@supports not (background-clip: text) {
  .site-footer__name {
    color: var(--vp-c-brand-1);
    background: none;
    -webkit-text-fill-color: currentColor;
  }
}

.site-footer__tagline {
  margin: 0.55rem 0 0;
  font-size: 0.8125rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
  max-width: 20rem;
}

.site-footer__heading {
  margin: 0 0 0.75rem;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--vp-c-text-1);
}

.site-footer__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.site-footer__list li + li {
  margin-top: 0.65rem;
}

.site-footer__list a {
  display: inline-block;
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 0.875rem;
  transition:
    color 0.18s ease,
    transform 0.18s ease;
}

.site-footer__list a:hover {
  color: var(--vp-c-brand-1);
  transform: translateX(3px);
}

.site-footer__col--follow .site-footer__heading {
  margin-bottom: 0.85rem;
}

.site-footer__bili-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.7rem 1.15rem;
  border-radius: 999px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-size: 0.8125rem;
  text-decoration: none;
  line-height: 1.4;
  max-width: 100%;
  border: 1px solid var(--vp-c-border);
  box-shadow: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.15s ease,
    background 0.2s ease;
}

.site-footer__bili-btn:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 1px var(--vp-c-brand-soft);
}

html.dark .site-footer__bili-btn {
  background: var(--vp-c-bg-alt);
  box-shadow:
    0 0 0 1px var(--vp-c-divider) inset,
    0 8px 24px rgba(0, 0, 0, 0.3);
}

html.dark .site-footer__bili-btn:hover {
  border-color: var(--vp-c-warning-1);
}

.site-footer__bili-btn:active {
  transform: scale(0.985);
}

.site-footer__bili-icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  opacity: 0.92;
  color: var(--vp-c-brand-1);
}
</style>
