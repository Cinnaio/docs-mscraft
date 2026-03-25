<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'

/** 按需改成你的 B 站空间、QQ 频道、实时地图等 */
const EXTERNAL = {
  bilibiliSpace: 'https://www.bilibili.com/',
  qqChannel: 'https://pd.qq.com/',
  liveMap: '#',
} as const

const { lang, site } = useData()
const route = useRoute()

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
      wiki: { text: en ? 'Documentation' : '文档维基', href: `${base}/getting-started` },
      skin: { text: en ? 'Skin station' : '皮肤站', href: 'https://skin.cubem.cn' },
      map: { text: en ? 'Live map' : '实时地图', href: EXTERNAL.liveMap },
    },
    social: {
      github: { text: 'GitHub', href: 'https://github.com/Cinnaio/docs-mscraft' },
      bilibili: { text: en ? 'ClusterGap on Bilibili' : '群隙时报（B站）', href: EXTERNAL.bilibiliSpace },
      qq: { text: en ? 'QQ Channel' : 'QQ 频道', href: EXTERNAL.qqChannel },
    },
    bilibiliCta: en ? 'Bilibili homepage' : '群隙时报 B站主页',
  }
})
</script>

<template>
  <footer v-if="isHomePage" class="site-footer" aria-label="Site footer">
    <div class="site-footer__glow" aria-hidden="true" />
    <div class="site-footer__grid" aria-hidden="true" />
    <div class="site-footer__inner">
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
              <a :href="copy.links.wiki.href">{{ copy.links.wiki.text }}</a>
            </li>
            <li>
              <a :href="copy.links.skin.href" target="_blank" rel="noopener noreferrer">{{
                copy.links.skin.text
              }}</a>
            </li>
            <li>
              <a :href="copy.links.map.href">{{ copy.links.map.text }}</a>
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
  </footer>
</template>

<style scoped>
/* 避免 color-mix + :global(scoped) 在部分环境下影响整页；仅用 var(--vp-*) */
.site-footer {
  --sf-warm: #f59e0b;
  --sf-warm-mid: #ea580c;
  --sf-violet: #a855f7;

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
  gap: 2rem;
  max-width: 1152px;
  margin: 0 auto;
}

@media (min-width: 960px) {
  .site-footer__inner {
    flex-direction: row;
    align-items: flex-start;
    gap: clamp(1.75rem, 4vw, 3rem);
  }
}

/* 三栏外链：与品牌区同一平面，无额外套框 */
.site-footer__nav {
  flex: 1 1 0;
  min-width: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.75rem 1.5rem;
}

@media (min-width: 640px) {
  .site-footer__nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .site-footer__col--follow {
    grid-column: 1 / -1;
  }
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
  background: linear-gradient(
    105deg,
    var(--sf-warm) 0%,
    var(--sf-warm-mid) 38%,
    var(--sf-violet) 72%,
    var(--vp-c-brand-2) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

html.dark .site-footer__name {
  filter: drop-shadow(0 0 10px rgba(100, 108, 255, 0.35));
}

html:not(.dark) .site-footer__name {
  background: linear-gradient(
    105deg,
    #b45309 0%,
    #c2410c 35%,
    #6d28d9 72%,
    #0369a1 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
}

@supports not (background-clip: text) {
  .site-footer__name {
    color: var(--vp-c-brand-1);
    background: none;
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
