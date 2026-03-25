<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme'
import SiteContributorAvatar from './SiteContributorAvatar.vue'

withDefaults(
  defineProps<{
    members: DefaultTheme.TeamMember[]
    /** 供无障碍列表说明，如「贡献者」/ "Contributors" */
    ariaLabel?: string
  }>(),
  { ariaLabel: 'Contributors' }
)
</script>

<template>
  <div class="site-contributors-wrap">
    <ul class="site-contributors" :aria-label="ariaLabel">
      <li v-for="m in members" :key="m.name" class="site-contributors__item">
        <SiteContributorAvatar :member="m" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.site-contributors-wrap {
  width: 100%;
}

.site-contributors {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14.5rem, 1fr));
  gap: 0.5rem 0.65rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.site-contributors__item {
  margin: 0;
  padding: 0;
  min-width: 0;
}
</style>
