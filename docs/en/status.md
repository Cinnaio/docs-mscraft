---
description: Server status monitoring for SMP—online state, version, players.
sidebar: false
layout: page
---

<ServerStatus :use-mcsm="true" :refresh-seconds="30" />

<div class="status-note">
  <p>
    Note: Auto-refresh is enabled and an internal fallback check reduces false negatives. This page only shows the overview for “Vanilla Survival SMP #1” and never displays any address.
  </p>
</div>

<style>
.status-note {
  max-width: 1040px;
  margin: 16px auto 0;
  padding: 0 min(2rem, 4vw);
}

.status-note > p {
  margin: 0;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.55;
  box-shadow:
    0 1px 1px color-mix(in srgb, var(--vp-c-text-1) 10%, transparent),
    0 10px 30px color-mix(in srgb, var(--vp-c-text-1) 6%, transparent);
}
</style>

