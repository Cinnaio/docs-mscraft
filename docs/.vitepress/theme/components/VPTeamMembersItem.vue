<script setup lang="ts">
import { ref, watch } from 'vue'
import type { DefaultTheme } from 'vitepress/theme'
import { VPLink, VPSocialLinks } from 'vitepress/theme'
import { mcAvatarFallbackUrls } from '../utils/mcPlayerAvatar'

interface Props {
  size?: 'small' | 'medium'
  member: DefaultTheme.TeamMember
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
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
  <article class="VPTeamMembersItem" :class="[size]">
    <div class="profile">
      <figure class="avatar">
        <img
          class="avatar-img"
          :src="currentSrc"
          :alt="member.name"
          loading="lazy"
          decoding="async"
          @error="onAvatarError"
        />
      </figure>
      <div class="data">
        <h1 class="name">
          {{ member.name }}
        </h1>
        <p v-if="member.title || member.org" class="affiliation">
          <span v-if="member.title" class="title">
            {{ member.title }}
          </span>
          <span v-if="member.title && member.org" class="at"> @ </span>
          <VPLink
            v-if="member.org"
            class="org"
            :class="{ link: member.orgLink }"
            :href="member.orgLink"
            no-icon
          >
            {{ member.org }}
          </VPLink>
        </p>
        <p v-if="member.desc" class="desc" v-html="member.desc" />
        <div v-if="member.links" class="links">
          <VPSocialLinks :links="member.links" :me="false" />
        </div>
      </div>
    </div>
    <div v-if="member.sponsor" class="sp">
      <VPLink class="sp-link" :href="member.sponsor" no-icon>
        <span class="vpi-heart sp-icon" /> {{ member.actionText || 'Sponsor' }}
      </VPLink>
    </div>
  </article>
</template>

<style scoped>
.VPTeamMembersItem {
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-radius: 12px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.VPTeamMembersItem.small .profile {
  padding: 32px;
}

.VPTeamMembersItem.small .data {
  padding-top: 20px;
}

.VPTeamMembersItem.small .avatar {
  width: 64px;
  height: 64px;
}

.VPTeamMembersItem.small .name {
  line-height: 24px;
  font-size: 16px;
}

.VPTeamMembersItem.small .affiliation {
  padding-top: 4px;
  line-height: 20px;
  font-size: 14px;
}

.VPTeamMembersItem.small .desc {
  padding-top: 12px;
  line-height: 20px;
  font-size: 14px;
}

.VPTeamMembersItem.small .links {
  margin: 0 -16px -20px;
  padding: 10px 0 0;
}

.VPTeamMembersItem.medium .profile {
  padding: 1.2rem 1.1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: linear-gradient(
    155deg,
    var(--vp-c-bg-soft) 0%,
    var(--vp-c-bg-alt) 42%,
    var(--vp-c-bg-soft) 100%
  );
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.VPTeamMembersItem.medium .data {
  padding-top: 1rem;
  text-align: center;
}

.VPTeamMembersItem.medium .avatar {
  width: 80px;
  height: 80px;
}

.VPTeamMembersItem.medium .name {
  letter-spacing: 0.02em;
  line-height: 1.35;
  font-size: 1.125rem;
  font-weight: 700;
}

.VPTeamMembersItem.medium .affiliation {
  padding-top: 0.35rem;
  font-size: 0.9rem;
  line-height: 1.5;
}

.VPTeamMembersItem.medium .affiliation .title {
  display: inline-block;
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  vertical-align: middle;
}

.VPTeamMembersItem.medium .desc {
  padding-top: 12px;
  max-width: none;
  font-size: 0.9375rem;
}

.VPTeamMembersItem.medium .links {
  margin: 0 -12px -8px;
  padding: 12px 8px 0;
  height: auto;
  min-height: 48px;
  justify-content: center;
}

@media (min-width: 640px) {
  .VPTeamMembersItem.medium .profile {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.1rem;
    padding: 1rem 1.15rem;
    text-align: left;
  }

  .VPTeamMembersItem.medium .data {
    padding-top: 0;
    text-align: left;
    flex: 1;
    min-width: 0;
  }

  .VPTeamMembersItem.medium .avatar {
    width: 72px;
    height: 72px;
    margin: 0;
  }

  .VPTeamMembersItem.medium .name {
    font-size: 1.05rem;
  }

  .VPTeamMembersItem.medium .links {
    justify-content: flex-start;
  }
}

.profile {
  flex-grow: 1;
  background-color: var(--vp-c-bg-soft);
}

.data {
  text-align: center;
}

.avatar {
  position: relative;
  flex-shrink: 0;
  margin: 0 auto;
  border-radius: 50%;
  box-shadow:
    0 0 0 2px var(--vp-c-bg),
    0 0 0 3px var(--vp-c-brand-soft),
    0 10px 28px rgba(100, 108, 255, 0.14);
}

.avatar-img {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  object-fit: cover;
}

.name {
  margin: 0;
  font-weight: 600;
}

.affiliation {
  margin: 0;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.org.link {
  color: var(--vp-c-text-2);
  transition: color 0.25s;
}

.org.link:hover {
  color: var(--vp-c-brand-1);
}

.desc {
  margin: 0 auto;
}

.desc :deep(a) {
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration-style: dotted;
  transition: color 0.25s;
}

.links {
  display: flex;
  justify-content: center;
  height: 56px;
}

.sp-link {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-sponsor);
  background-color: var(--vp-c-bg-soft);
  transition:
    color 0.25s,
    background-color 0.25s;
}

.sp .sp-link.link:hover,
.sp .sp-link.link:focus {
  outline: none;
  color: var(--vp-c-white);
  background-color: var(--vp-c-sponsor);
}

.sp-icon {
  margin-right: 8px;
  font-size: 16px;
}
</style>
