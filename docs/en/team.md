---
layout: page
sidebar: false
outline: false
---

<script setup lang="ts">
import { VPTeamPage, VPTeamPageTitle } from 'vitepress/theme'
import TeamHistoryEn from '../_team-history/en.md'

/** Alphabetical by name (case-insensitive, English locale) */
/** Avatars: Mojang (Minotar → mc-heads) → skin station → logo; use Java edition names */
const members = [
  {
    avatar: '',
    name: 'bridgemoon',
    title: '2023 – present',
    desc: 'Economy design; content and tutorials.',
  },
  {
    avatar: '',
    name: 'Cinnaio',
    title: '2022 – present',
    desc: 'Wiki, site, and documentation development & upkeep.',
  },
  {
    avatar: '',
    name: 'Leo_Ranbom',
    title: '2022 – present',
    desc: 'Hardware resources.',
  },
  {
    avatar: '',
    name: 'MiddleLING',
    title: '2023 – present',
    desc: 'Docs and community support.',
  },
  {
    avatar: '',
    name: 'Remering996',
    title: '2023 – present',
    desc: 'Technical lead; occasional project support.',
  },
]
</script>

<div class="site-team">
  <VPTeamPage>
    <VPTeamPageTitle>
      <template #title>Team &amp; history</template>
      <template #lead>
        This page lists <strong>contributors</strong> (wiki, site, and related work) and a short
        <strong>ClusterGap</strong> history.<i>(Names are sorted alphabetically)</i>
        <br />
        Want to join us? You are welcome to help with the server, wiki, or site—reach out to the team
        in the community.
      </template>
    </VPTeamPageTitle>
    <section class="site-team-section" aria-labelledby="contributors-heading">
      <h2 id="contributors-heading" class="site-team-section__title">Contributors</h2>
      <SiteContributors :members="members" aria-label="Project contributors" />
    </section>
    <section id="history" class="site-team-history" aria-labelledby="history-heading">
      <TeamHistoryEn />
    </section>
  </VPTeamPage>
</div>
