<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

type MCSrvStatResponse = {
  online?: boolean
  ip?: string
  port?: number
  hostname?: string
  version?: string
  protocol?: number
  debug?: { ping?: boolean; query?: boolean; srv?: boolean; cachehit?: boolean }
  players?: { online?: number; max?: number; list?: string[] }
  motd?: { raw?: string[]; clean?: string[]; html?: string[] }
  icon?: string
  software?: string
}

type MCSMInstanceResponse = {
  status: number
  data?: {
    config?: {
      nickname?: string
      startCommand?: string
      type?: string
      processType?: string
    }
    info?: {
      currentPlayers?: number
      maxPlayers?: number
      version?: string
    }
    status?: number // 3 = running
  }
  time?: number
}

const props = defineProps<{
  address?: string
  /**
   * Optional fallback address (host:port) to query when SRV/caching makes
   * the primary address appear offline in the public API.
   */
  fallbackAddress?: string
  /**
   * Use MCSManager instance API instead of public ping API.
   * When enabled, `mcsmDaemonId` and `mcsmInstanceId` are required.
   */
  useMcsm?: boolean
  refreshSeconds?: number
}>()

const { lang } = useData()
const isEn = computed(() => lang.value === 'en-US')
const refreshSeconds = computed(() => Math.max(10, props.refreshSeconds ?? 30))

const state = ref<'idle' | 'loading' | 'ok' | 'error'>('idle')
const lastUpdatedAt = ref<number | null>(null)
const errorText = ref<string | null>(null)
const data = ref<MCSrvStatResponse | null>(null)

const mcsrvstatUrl = (addr: string) => `https://api.mcsrvstat.us/3/${encodeURIComponent(addr)}`
// Use a dev-server proxy path to avoid leaking panel host in client UI and to avoid mixed-content issues.
const mcsmBase = '/mcsm'

const title = computed(() => (isEn.value ? 'Server status' : '服务器状态'))
const labels = computed(() => {
  if (isEn.value) {
    return {
      online: 'Online',
      offline: 'Offline',
      serverName: 'Server',
      version: 'Version',
      software: 'Software',
      players: 'Players',
      lastUpdated: 'Last updated',
      currentTime: 'Current time',
      refresh: `Auto refresh: ${refreshSeconds.value}s`,
      retry: 'Retry',
    }
  }
  return {
    online: '在线',
    offline: '离线',
    serverName: '服务器',
    version: '版本',
    software: '服务端',
    players: '在线人数',
    lastUpdated: '更新时间',
    currentTime: '当前时间',
    refresh: `自动刷新：${refreshSeconds.value} 秒`,
    retry: '重试',
  }
})

const online = computed(() => {
  if (props.useMcsm) return Boolean((data.value as any)?.online)
  return Boolean((data.value as any)?.online)
})

const playerLine = computed(() => {
  const p = (data.value as any)?.players
  if (!p) return '—'
  const o = typeof p.online === 'number' ? p.online : null
  const m = typeof p.max === 'number' ? p.max : null
  if (o === null && m === null) return '—'
  if (o !== null && m !== null) return `${o} / ${m}`
  return `${o ?? '—'} / ${m ?? '—'}`
})

const softwareLine = computed(() => (data.value as any)?.software || '—')
const versionLine = computed(() => (data.value as any)?.version || '—')

const motd = computed(() => {
  const clean = (data.value as any)?.motd?.clean
  if (!clean?.length) return null
  return clean.join('\n').trim() || null
})

const lastUpdatedText = computed(() => {
  if (!lastUpdatedAt.value) return '—'
  try {
    const dt = new Date(lastUpdatedAt.value)
    return new Intl.DateTimeFormat(isEn.value ? 'en-US' : 'zh-CN', {
      dateStyle: 'medium',
      timeStyle: 'medium',
    }).format(dt)
  } catch {
    return new Date(lastUpdatedAt.value).toLocaleString()
  }
})

const now = ref(Date.now())
const currentTimeText = computed(() => {
  try {
    return new Intl.DateTimeFormat(isEn.value ? 'en-US' : 'zh-CN', {
      dateStyle: 'medium',
      timeStyle: 'medium',
    }).format(new Date(now.value))
  } catch {
    return new Date(now.value).toLocaleString()
  }
})

let timer: number | undefined
let abort: AbortController | null = null
let clockTimer: number | undefined

type LoadResult = { ok: true; data: MCSrvStatResponse } | { ok: false; error: string }

async function fetchStatus(addr: string, signal: AbortSignal): Promise<LoadResult> {
  try {
    const res = await fetch(mcsrvstatUrl(addr), {
      method: 'GET',
      signal,
      headers: { accept: 'application/json' },
    })
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` }
    const json = (await res.json()) as MCSrvStatResponse
    return { ok: true, data: json }
  } catch (e: any) {
    if (e?.name === 'AbortError') return { ok: false, error: 'aborted' }
    return { ok: false, error: String(e?.message || e || 'Unknown error') }
  }
}

function guessSoftwareFromStartCommand(cmd?: string): string | undefined {
  const v = (cmd || '').toLowerCase()
  if (!v) return
  const m = v.match(/\b(purpur|paper|spigot|bukkit|fabric|forge|quilt|vanilla)\b/)
  if (m?.[1]) return m[1].toUpperCase()
}

function normalizeMcsmToStatusPayload(r: MCSMInstanceResponse) {
  const inst = r.data
  const status = inst?.status
  const online = status === 3

  const currentPlayers =
    typeof inst?.info?.currentPlayers === 'number' ? inst?.info?.currentPlayers : undefined
  const maxPlayers = typeof inst?.info?.maxPlayers === 'number' ? inst?.info?.maxPlayers : undefined

  const version = (inst?.info?.version || '').trim() || undefined
  const software =
    guessSoftwareFromStartCommand(inst?.config?.startCommand) ||
    (inst?.config?.type || '').toString().trim() ||
    (inst?.config?.processType || '').toString().trim() ||
    undefined

  return {
    online,
    players: { online: currentPlayers, max: maxPlayers },
    version,
    software,
    motd: { clean: [] as string[] },
    __mcsmTime: typeof r.time === 'number' ? r.time : undefined,
  }
}

async function fetchMcsmInstance(signal: AbortSignal) {
  // In dev: request the local dev proxy; it injects apikey + ids server-side.
  // In prod (Cloudflare Pages): call our own function endpoint.
  const path = import.meta.env.PROD ? '/api/status' : `${mcsmBase}/api/instance`
  const u = new URL(path, window.location.origin)

  const res = await fetch(u.toString(), {
    method: 'GET',
    signal,
    headers: {
      accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = (await res.json()) as any

  // Prod: already normalized by our function.
  if (import.meta.env.PROD) return json as any

  // Dev: MCSM panel response.
  const r = json as MCSMInstanceResponse
  if (r.status !== 200) throw new Error(`API status ${r.status}`)
  return r
}

async function load() {
  state.value = data.value ? 'loading' : 'loading'
  errorText.value = null

  abort?.abort()
  abort = new AbortController()

  if (props.useMcsm) {
    try {
      const r = await fetchMcsmInstance(abort.signal)
      const payload =
        import.meta.env.PROD ? (r as any) : (normalizeMcsmToStatusPayload(r as any) as any)
      data.value = payload as any
      lastUpdatedAt.value =
        typeof (payload as any).__mcsmTime === 'number'
          ? (payload as any).__mcsmTime
          : typeof (payload as any).updatedAt === 'number'
            ? (payload as any).updatedAt
            : Date.now()
      state.value = 'ok'
    } catch (e: any) {
      if (e?.name === 'AbortError') return
      state.value = 'error'
      errorText.value = String(e?.message || e || 'Unknown error')
    }
    return
  }

  const primary = await fetchStatus(props.address || '', abort.signal)
  if (primary.ok) {
    // If SRV/caching makes it look offline, optionally verify with fallback.
    if (!primary.data.online && props.fallbackAddress) {
      const fb = await fetchStatus(props.fallbackAddress, abort.signal)
      if (fb.ok && fb.data.online) {
        data.value = fb.data
        lastUpdatedAt.value = Date.now()
        state.value = 'ok'
        return
      }
    }

    data.value = primary.data
    lastUpdatedAt.value = Date.now()
    state.value = 'ok'
    return
  }

  if (primary.error === 'aborted') return

  // Primary failed: try fallback if present.
  if (props.fallbackAddress) {
    const fb = await fetchStatus(props.fallbackAddress, abort.signal)
    if (fb.ok) {
      data.value = fb.data
      lastUpdatedAt.value = Date.now()
      state.value = 'ok'
      return
    }
    if (fb.error === 'aborted') return
    state.value = 'error'
    errorText.value = `${primary.error}; fallback: ${fb.error}`
    return
  }

  state.value = 'error'
  errorText.value = primary.error
}

function startTimer() {
  stopTimer()
  timer = window.setInterval(() => {
    // avoid pointless background polling
    if (typeof document !== 'undefined' && document.hidden) return
    void load()
  }, refreshSeconds.value * 1000)
}

function stopTimer() {
  if (timer) {
    window.clearInterval(timer)
    timer = undefined
  }
}

function startClock() {
  stopClock()
  clockTimer = window.setInterval(() => {
    now.value = Date.now()
  }, 1000)
}

function stopClock() {
  if (clockTimer) {
    window.clearInterval(clockTimer)
    clockTimer = undefined
  }
}

onMounted(() => {
  void load()
  startTimer()
  startClock()
})

onBeforeUnmount(() => {
  stopTimer()
  stopClock()
  abort?.abort()
})
</script>

<template>
  <div class="status-panel">
    <div class="status-top">
      <div class="status-top__left">
        <div class="status-top__heading">{{ title }}</div>
        <div class="status-top__sub muted">
          {{ labels.currentTime }}：{{ currentTimeText }}
        </div>
      </div>
      <div class="status-top__right">
        <span class="muted">{{ labels.refresh }}</span>
        <button class="vp-button status-top__btn" type="button" @click="load">
          {{ labels.retry }}
        </button>
      </div>
    </div>

    <div class="status-bar">
      <div class="status-bar__left">
        <span class="metric-dot" :class="online ? 'is-online' : 'is-offline'" />
        <div class="status-bar__name">纯净生存 SMP #1</div>
        <div class="status-bar__state">
          {{ online ? labels.online : labels.offline }}<span v-if="state === 'loading'" class="muted">&nbsp;…</span>
        </div>
      </div>

      <div class="status-bar__right">
        <div class="status-item">
          <div class="status-item__k">{{ labels.players }}</div>
          <div class="status-item__v">{{ playerLine }}</div>
        </div>
        <div class="status-sep" aria-hidden="true" />
        <div class="status-item">
          <div class="status-item__k">{{ labels.version }}</div>
        <div class="status-item__v">{{ versionLine }}</div>
        </div>
        <div class="status-sep" aria-hidden="true" />
        <div class="status-item">
          <div class="status-item__k">{{ labels.software }}</div>
        <div class="status-item__v">{{ softwareLine }}</div>
        </div>
        <div class="status-sep" aria-hidden="true" />
        <div class="status-item">
          <div class="status-item__k">{{ labels.lastUpdated }}</div>
          <div class="status-item__v">{{ lastUpdatedText }}</div>
        </div>
      </div>
    </div>

    <div v-if="state === 'error'" class="status-card status-card--error">
      <div class="status-section-title">{{ isEn ? 'Fetch failed' : '获取失败' }}</div>
      <div class="status-field">
        <code>{{ errorText }}</code>
      </div>
    </div>

  </div>
</template>

<style scoped>
.muted {
  color: var(--vp-c-text-2);
}

.status-panel {
  max-width: 1040px;
  margin: 12px auto 0;
  display: grid;
  gap: 14px;
}

.status-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  padding: 6px 2px 2px;
}
.status-top__heading {
  font-weight: 900;
  font-size: 16px;
  line-height: 1.2;
}
.status-top__sub {
  margin-top: 4px;
  font-size: 11px;
}
.status-top__right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.status-top__btn {
  font-size: 12px;
  line-height: 1;
  padding: 8px 10px;
}

.metric-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--vp-c-default-3);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp-c-default-3) 18%, transparent);
}
.metric-dot.is-online {
  background: #22c55e;
  box-shadow: 0 0 0 3px color-mix(in srgb, #22c55e 18%, transparent);
}
.metric-dot.is-offline {
  background: #ef4444;
  box-shadow: 0 0 0 3px color-mix(in srgb, #ef4444 18%, transparent);
}

.status-bar {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 12px 14px;
  background: var(--vp-c-bg);
  box-shadow:
    0 1px 1px color-mix(in srgb, var(--vp-c-text-1) 10%, transparent),
    0 10px 30px color-mix(in srgb, var(--vp-c-text-1) 6%, transparent);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.status-bar__left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 240px;
}

.status-bar__name {
  font-weight: 900;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  font-size: 13px;
}

.status-bar__state {
  font-weight: 800;
  color: var(--vp-c-text-1);
  font-size: 13px;
}

.status-bar__right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  justify-content: flex-end;
  min-width: 0;
}

.status-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 120px;
}

.status-item__k {
  font-size: 11px;
  font-weight: 700;
  color: var(--vp-c-text-2);
}

.status-item__v {
  font-size: 13px;
  font-weight: 800;
  color: var(--vp-c-text-1);
  overflow-wrap: anywhere;
}

.status-sep {
  width: 1px;
  align-self: stretch;
  background: var(--vp-c-divider);
  opacity: 1;
}

@media (max-width: 900px) {
  .status-bar {
    flex-direction: column;
    align-items: stretch;
  }
  .status-bar__left {
    min-width: 0;
  }
  .status-bar__right {
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .status-sep {
    display: none;
  }
}

.status-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  background: var(--vp-c-bg);
  box-shadow:
    0 1px 1px color-mix(in srgb, var(--vp-c-text-1) 10%, transparent),
    0 10px 30px color-mix(in srgb, var(--vp-c-text-1) 6%, transparent);
}

.status-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 14px;
}

.status-card__title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
}

.status-card__meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.status-card__btn {
  font-size: 12px;
  line-height: 1;
  padding: 8px 10px;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--vp-c-default-3);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp-c-default-3) 18%, transparent);
}
.status-dot.is-online {
  background: #22c55e;
  box-shadow: 0 0 0 3px color-mix(in srgb, #22c55e 18%, transparent);
}
.status-dot.is-offline {
  background: #ef4444;
  box-shadow: 0 0 0 3px color-mix(in srgb, #ef4444 18%, transparent);
}

.status-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.status-row {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 12px;
  align-items: baseline;
}

@media (max-width: 480px) {
  .status-row {
    grid-template-columns: 110px 1fr;
  }
}

.status-k {
  color: var(--vp-c-text-2);
  font-weight: 600;
}
.status-v {
  color: var(--vp-c-text-1);
  overflow-wrap: anywhere;
}

.status-section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  margin-bottom: 10px;
}

.status-field {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 12px 14px;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  line-height: 1.45;
}

.pill {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 12px;
  border: 1px solid var(--vp-c-divider);
}
.pill--ok {
  background: color-mix(in srgb, #22c55e 16%, transparent);
  border-color: color-mix(in srgb, #22c55e 30%, var(--vp-c-divider));
}
.pill--bad {
  background: color-mix(in srgb, #ef4444 14%, transparent);
  border-color: color-mix(in srgb, #ef4444 30%, var(--vp-c-divider));
}

.status-card--error .status-section-title {
  color: color-mix(in srgb, var(--vp-c-danger-2) 70%, var(--vp-c-text-1) 30%);
}

</style>

