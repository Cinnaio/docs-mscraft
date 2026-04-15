---
description: 服务器状态监控：SMP 在线、版本与人数。
sidebar: false
layout: page
---

<ServerStatus :use-mcsm="true" :refresh-seconds="30" />

<div class="status-note">
  <p>
    说明：页面会自动刷新，并在后台做兜底复核；本页只展示「纯净生存 SMP #1」的概况，不展示任何地址信息。
  </p>
</div>

<style>
.status-note {
  max-width: 1040px;
  margin: 10px auto 0;
  padding: 0 2px;
}

.status-note > p {
  margin: 0;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.55;
  box-shadow:
    0 1px 1px color-mix(in srgb, var(--vp-c-text-1) 10%, transparent),
    0 10px 30px color-mix(in srgb, var(--vp-c-text-1) 6%, transparent);
}
</style>

