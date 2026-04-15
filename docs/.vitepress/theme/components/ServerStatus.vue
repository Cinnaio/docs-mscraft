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
    // MCSM may include additional runtime stats; we treat them as optional/unknown.
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
      cpu: 'CPU',
      memory: 'Memory',
      storage: 'Storage',
      network: 'Network',
      version: 'Version',
      players: 'Players',
      currentTime: 'Current time',
    }
  }
  return {
    online: '在线',
    offline: '离线',
    serverName: '服务器',
    cpu: 'CPU',
    memory: '内存',
    storage: '存储',
    network: '网络',
    version: '版本',
    players: '在线人数',
    currentTime: '当前时间',
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

const versionLine = computed(() => (data.value as any)?.version || '—')

function formatPercent(v?: number): string {
  if (typeof v !== 'number' || !Number.isFinite(v)) return '—'
  // Accept 0..1 or 0..100
  const pct = v <= 1 ? v * 100 : v
  return `${pct.toFixed(pct >= 10 ? 0 : 1)}%`
}

function formatRatioPercent(used?: number, total?: number): string {
  if (
    typeof used !== 'number' ||
    typeof total !== 'number' ||
    !Number.isFinite(used) ||
    !Number.isFinite(total) ||
    used < 0 ||
    total <= 0
  )
    return '—'
  return formatPercent((used / total) * 100)
}

function formatBytes(v?: number): string {
  if (typeof v !== 'number' || !Number.isFinite(v) || v < 0) return '—'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let n = v
  let i = 0
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024
    i++
  }
  const dp = i >= 3 ? 1 : 0
  return `${n.toFixed(dp)} ${units[i]}`
}

function formatBytesPerSec(v?: number): string {
  if (typeof v !== 'number' || !Number.isFinite(v) || v < 0) return '—'
  return `${formatBytes(v)}/s`
}

function pickFirstNumber(obj: any, paths: string[]): number | undefined {
  for (const p of paths) {
    const parts = p.split('.')
    let cur = obj
    for (const key of parts) cur = cur?.[key]
    if (typeof cur === 'number' && Number.isFinite(cur)) return cur
  }
}

const cpuLine = computed(() => formatPercent((data.value as any)?.cpu))

function parseJavaXmxBytes(cmd?: string): number | undefined {
  const s = (cmd || '').toLowerCase()
  if (!s) return
  const m = s.match(/-xmx(\d+(?:\.\d+)?)([kmgt]?)/i)
  if (!m) return
  const n = Number(m[1])
  if (!Number.isFinite(n) || n <= 0) return
  const unit = (m[2] || '').toLowerCase()
  const mul =
    unit === 't'
      ? 1024 ** 4
      : unit === 'g'
        ? 1024 ** 3
        : unit === 'm'
          ? 1024 ** 2
          : unit === 'k'
            ? 1024
            : 1
  return Math.round(n * mul)
}

const memoryLine = computed(() => {
  const memObj = (data.value as any)?.memory
  const ratio = typeof memObj?.ratio === 'number' ? memObj.ratio : undefined
  if (typeof ratio === 'number') return formatPercent(ratio)
  return '—'
})
const storageLine = computed(() => {
  const stObj = (data.value as any)?.storage
  const ratio = typeof stObj?.ratio === 'number' ? stObj.ratio : undefined
  if (typeof ratio === 'number') return formatPercent(ratio)
  return '—'
})
const networkLine = computed(() => {
  const netObj = (data.value as any)?.network
  const rxFromObj = typeof netObj?.rx === 'number' ? netObj.rx : undefined
  const txFromObj = typeof netObj?.tx === 'number' ? netObj.tx : undefined

  const rx = rxFromObj
  const tx = txFromObj
  if (typeof rx === 'number' && typeof tx === 'number')
    return `↓ ${formatBytesPerSec(rx)}  ↑ ${formatBytesPerSec(tx)}`
  return '—'
})

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

  return {
    online,
    players: { online: currentPlayers, max: maxPlayers },
    version,
    // Per requirement: CPU/memory/storage/network must come from node API (overview),
    // never from instance fields.
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

async function fetchMcsmOverview(signal: AbortSignal) {
  const path = `${mcsmBase}/api/overview`
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
  return json
}

async function load() {
  state.value = data.value ? 'loading' : 'loading'
  errorText.value = null

  abort?.abort()
  abort = new AbortController()

  if (props.useMcsm) {
    try {
      const r = await fetchMcsmInstance(abort.signal)
      let payload = import.meta.env.PROD ? (r as any) : (normalizeMcsmToStatusPayload(r as any) as any)

      // Dev-only: merge daemon overview fallback (node API) for cpu/memory totals if instance is missing them.
      if (!import.meta.env.PROD) {
        try {
          const ov = await fetchMcsmOverview(abort.signal)
          const daemonId =
            (import.meta.env as any)?.VITE_MCSM_DAEMON_ID || (import.meta.env as any)?.VITE_MCSM_DAEMON || undefined
          const remotes = Array.isArray(ov?.data?.remote) ? ov.data.remote : []
          const remoteById = daemonId ? remotes.find((x: any) => x?.uuid === daemonId) : undefined
          const remoteByRunning = remotes.find((x: any) => Number(x?.instance?.running || 0) > 0)
          const remote = remoteById || remoteByRunning || remotes.find((x: any) => x?.available) || remotes[0]

          // Per requirement: CPU/memory/storage/network should come from node API when possible.
          if (remote?.system) {
            if (typeof remote.system.cpuUsage === 'number') payload.cpu = remote.system.cpuUsage
            if (typeof remote.system.memUsage === 'number') {
              payload.memory = payload.memory || {}
              payload.memory.ratio = remote.system.memUsage
            }
          }
        } catch {
          // ignore overview failures in dev
        }
      }

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
    </div>

    <div class="status-bar">
      <div class="status-bar__left">
        <span class="metric-dot" :class="online ? 'is-online' : 'is-offline'" />
        <div class="status-bar__name">纯净生存 SMP #1</div>
        <div class="status-bar__state">
          {{ online ? labels.online : labels.offline }}<span v-if="state === 'loading'" class="muted">&nbsp;…</span>
        </div>
      </div>

      <div class="status-sep status-sep--main" aria-hidden="true" />

      <div class="status-bar__right">
        <div class="status-item">
          <div class="status-item__k">{{ labels.players }}</div>
          <div class="status-item__v">{{ playerLine }}</div>
        </div>
        <div class="status-item">
          <div class="status-item__k">{{ labels.cpu }}</div>
          <div class="status-item__v">{{ cpuLine }}</div>
        </div>
        <div class="status-item">
          <div class="status-item__k">{{ labels.memory }}</div>
          <div class="status-item__v">{{ memoryLine }}</div>
        </div>
        <div class="status-item">
          <div class="status-item__k">{{ labels.storage }}</div>
          <div class="status-item__v">{{ storageLine }}</div>
        </div>
        <div class="status-item">
          <div class="status-item__k">{{ labels.network }}</div>
          <div class="status-item__v">{{ networkLine }}</div>
        </div>
        <div class="status-item">
          <div class="status-item__k">{{ labels.version }}</div>
          <div class="status-item__v">{{ versionLine }}</div>
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
  /* Match team page: keep distance from navbar */
  margin: 0 auto;
  padding: 3.25rem min(2rem, 4vw) 0.25rem;
  display: grid;
  gap: 18px;
}

.status-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  padding: 0;
}
.status-top__heading {
  font-weight: 900;
  font-size: clamp(1.75rem, 2.4vw, 2.25rem);
  line-height: 1.2;
  letter-spacing: -0.02em;
}
.status-top__sub {
  margin-top: 4px;
  font-size: 0.95rem;
}
.status-top__right {
  display: flex;
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
  padding: 20px 12px;
  background: var(--vp-c-bg);
  box-shadow:
    0 1px 1px color-mix(in srgb, var(--vp-c-text-1) 10%, transparent),
    0 10px 30px color-mix(in srgb, var(--vp-c-text-1) 6%, transparent);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.status-bar__left {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 240px;
}

.status-bar__name {
  font-weight: 700;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  font-size: 0.92rem;
  line-height: 1.1;
}

.status-bar__state {
  font-weight: 650;
  color: var(--vp-c-text-1);
  font-size: 0.92rem;
  line-height: 1.1;
}

.status-bar__right {
  display: flex;
  align-items: center;
  gap: 18px;
  flex: 1;
  justify-content: flex-end;
  min-width: 0;
}

.status-item {
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 92px;
}

.status-item__k {
  font-size: 0.74rem;
  font-weight: 550;
  color: var(--vp-c-text-2);
  line-height: 1.1;
  letter-spacing: 0.015em;
}

.status-item__v {
  margin-top: 3px;
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  overflow-wrap: anywhere;
  line-height: 1.15;
  font-variant-numeric: tabular-nums;
}

.status-sep {
  width: 1px;
  align-self: stretch;
  background: var(--vp-c-divider);
  opacity: 1;
}

.status-sep--main {
  opacity: 0.9;
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

