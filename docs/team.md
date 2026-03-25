---
layout: page
sidebar: false
outline: false
---

<script setup lang="ts">
import { VPTeamPage, VPTeamPageTitle } from 'vitepress/theme'
import TeamHistoryZh from './_team-history/zh.md'

/** 按首字母排序（不区分大小写，en 区域规则） */
/** 头像：Mojang（Minotar→mc-heads）→ 皮肤站 → logo；请填写正版 Java 角色名 */
const members = [
  {
    avatar: '',
    name: 'bridgemoon',
    title: '2023 – 至今',
    desc: '经济策划，内容与教程整理。',
  },
  {
    avatar: '',
    name: 'Cinnaio',
    title: '2022 – 至今',
    desc: 'Wiki、站点与文档等开发维护。',
  },
  {
    avatar: '',
    name: 'Leo_Ranbom',
    title: '2022 – 至今',
    desc: '硬件资源提供者。',
  },
  {
    avatar: '',
    name: 'MiddleLING',
    title: '2023 – 至今',
    desc: '文档与社区支持。',
  },
  {
    avatar: '',
    name: 'Remering996',
    title: '2023 – 至今',
    desc: '技术大拿，不定期支援项目！',
  },
]
</script>

<div class="site-team">
  <VPTeamPage>
    <VPTeamPageTitle>
      <template #title>团队与历史</template>
      <template #lead>
        本页汇总 <strong>贡献者</strong>（维护 Wiki、站点与相关内容）与 <strong>群隙</strong>的简要沿革；<i>（按名称首字母排序）</i>
        <br />
        如果你想加入我们，也欢迎参与服务器建设、Wiki 与站点维护——在社区中联系现有成员即可。
      </template>
    </VPTeamPageTitle>
    <section class="site-team-section" aria-labelledby="contributors-heading">
      <h2 id="contributors-heading" class="site-team-section__title">贡献者</h2>
      <SiteContributors :members="members" aria-label="项目贡献者列表" />
    </section>
    <section id="history" class="site-team-history" aria-labelledby="history-heading">
      <TeamHistoryZh />
    </section>
  </VPTeamPage>
</div>
