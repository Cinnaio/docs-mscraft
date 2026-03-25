<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { DefaultTheme } from 'vitepress/theme'
import { VPLink, VPSocialLinks } from 'vitepress/theme'
import { mcAvatarFallbackUrls } from '../utils/mcPlayerAvatar'

const props = defineProps<{
  member: DefaultTheme.TeamMember
}>()

const headingId = computed(() => {
  const raw = `contrib-${props.member.name}`
  const slug = raw.replace(/\s+/g, '-').replace(/[^\w\-.\u4e00-\u9fff]/g, '')
  return slug || 'contrib-member'
})

const tierIndex = ref(0)
const currentSrc = ref('')

watch(
  () => props.member.name,
  () => {
    tierIndex.value = 0
    currentSrc.value = mcAvatarFallbackUrls(props.member.name)[0]
  },
  { immediate: true }
)

function onAvatarError() {
  const chain = mcAvatarFallbackUrls(props.member.name)
  if (tierIndex.value >= chain.length - 1) return
  tierIndex.value += 1
  currentSrc.value = chain[tierIndex.value]
}
</script>

<template>
  <article
    class="site-contributor"
    :aria-labelledby="headingId"
    tabindex="0"
  >
    <div class="site-contributor__avatar">
      <img
        class="site-contributor__img"
        :src="currentSrc"
        :alt="member.name"
        loading="lazy"
        decoding="async"
        width="80"
        height="80"
        @error="onAvatarError"
      />
    </div>
    <h3 :id="headingId" class="site-contributor__name">{{ member.name }}</h3>
    <p v-if="member.title" class="site-contributor__role">{{ member.title }}</p>
    <p
      v-if="member.org"
      class="site-contributor__org"
    >
      <VPLink
        class="site-contributor__org-link"
        :class="{ link: member.orgLink }"
        :href="member.orgLink"
        no-icon
      >{{ member.org }}</VPLink>
    </p>
    <div
      v-if="member.desc"
      class="site-contributor__desc"
      v-html="member.desc"
    />
    <div v-if="member.links?.length" class="site-contributor__links">
      <VPSocialLinks :links="member.links" :me="false" />
    </div>
  </article>
</template>

<style scoped>
.site-contributor {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0.5rem 0.65rem 0.75rem;
  margin: 0;
  border-radius: 12px;
  outline: none;
  transition: background-color 0.15s ease;
}

.site-contributor:hover,
.site-contributor:focus-visible {
  background-color: var(--vp-c-bg-soft);
}

.site-contributor:focus-visible {
  box-shadow:
    0 0 0 2px var(--vp-c-bg),
    0 0 0 4px var(--vp-c-brand-1);
}

.site-contributor__avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow:
    0 0 0 1px var(--vp-c-divider, rgba(0, 0, 0, 0.1)),
    0 2px 8px rgba(0, 0, 0, 0.06);
}

html.dark .site-contributor__avatar {
  box-shadow:
    0 0 0 1px var(--vp-c-divider),
    0 4px 14px rgba(0, 0, 0, 0.35);
}

.site-contributor__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.site-contributor__name {
  margin: 0.75rem 0 0;
  padding: 0;
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1.35;
  color: var(--vp-c-text-1);
  letter-spacing: 0.01em;
}

.site-contributor__role {
  margin: 0.3rem 0 0;
  padding: 0;
  font-size: 0.8125rem;
  line-height: 1.45;
  color: var(--vp-c-text-2);
  max-width: 16rem;
}

.site-contributor__org {
  margin: 0.35rem 0 0;
  padding: 0;
  font-size: 0.78rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
  max-width: 16rem;
}

.site-contributor__org-link {
  color: inherit;
  text-decoration: none;
}

.site-contributor__org-link.link {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 2px;
}

.site-contributor__org-link.link:hover {
  color: var(--vp-c-brand-2);
}

.site-contributor__desc {
  margin: 0.5rem 0 0;
  padding: 0;
  font-size: 0.8125rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
  max-width: 18rem;
  text-wrap: pretty;
}

.site-contributor__desc :deep(a) {
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 2px;
}

.site-contributor__links {
  margin-top: 0.45rem;
  display: flex;
  justify-content: center;
}

.site-contributor__links :deep(.VPSocialLinks) {
  transform: scale(0.94);
  transform-origin: center;
}
</style>
