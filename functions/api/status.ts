type PagesEnv = {
  MCSM_BASE_URL?: string
  MCSM_APIKEY?: string
  MCSM_DAEMON_ID?: string
  MCSM_INSTANCE_ID?: string
}

type MCSMInstanceResponse = {
  status: number
  data?: {
    config?: { startCommand?: string; type?: string; processType?: string }
    info?: { currentPlayers?: number; maxPlayers?: number; version?: string }
    status?: number // 3 = running
    // Other fields may exist (runtime stats etc). We keep it flexible.
  }
  time?: number
}

type MCSMOverviewResponse = {
  status: number
  data?: {
    remote?: Array<{
      uuid?: string
      system?: {
        cpuUsage?: number // 0..1
        memUsage?: number // 0..1
        totalmem?: number
        freemem?: number
      }
    }>
  }
  time?: number
}

function json(body: any, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...(init?.headers || {}),
    },
    ...init,
  })
}

function guessSoftwareFromStartCommand(cmd?: string): string | undefined {
  const v = (cmd || '').toLowerCase()
  if (!v) return
  const m = v.match(/\b(purpur|paper|spigot|bukkit|fabric|forge|quilt|vanilla)\b/)
  if (m?.[1]) return m[1].toUpperCase()
}

function pickFirstNumber(obj: any, paths: string[]): number | undefined {
  for (const p of paths) {
    const parts = p.split('.')
    let cur = obj
    for (const key of parts) cur = cur?.[key]
    if (typeof cur === 'number' && Number.isFinite(cur)) return cur
  }
}

export const onRequestGet: PagesFunction<PagesEnv> = async ({ env }) => {
  const base = (env.MCSM_BASE_URL || '').trim().replace(/\/+$/, '')
  const apikey = (env.MCSM_APIKEY || '').trim()
  const daemonId = (env.MCSM_DAEMON_ID || '').trim()
  const uuid = (env.MCSM_INSTANCE_ID || '').trim()

  if (!base || !apikey || !daemonId || !uuid) {
    return json(
      { ok: false, error: 'Missing server env vars for status API' },
      { status: 500 }
    )
  }

  const instUrl = new URL(`${base}/api/instance`)
  instUrl.searchParams.set('uuid', uuid)
  instUrl.searchParams.set('daemonId', daemonId)
  instUrl.searchParams.set('apikey', apikey)

  const overviewUrl = new URL(`${base}/api/overview`)
  overviewUrl.searchParams.set('apikey', apikey)

  const commonHeaders = {
    accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=utf-8',
  }

  // Fetch instance + overview (node) data in parallel.
  const [instRes, ovRes] = await Promise.all([
    fetch(instUrl.toString(), { method: 'GET', headers: commonHeaders }),
    fetch(overviewUrl.toString(), { method: 'GET', headers: commonHeaders }).catch(() => null as any),
  ])

  const instText = await instRes.text()
  if (!instRes.ok) {
    return json({ ok: false, error: `Upstream HTTP ${instRes.status}` }, { status: 502 })
  }

  let parsed: MCSMInstanceResponse | null = null
  try {
    parsed = JSON.parse(instText) as MCSMInstanceResponse
  } catch {
    return json({ ok: false, error: 'Invalid upstream JSON' }, { status: 502 })
  }

  if (!parsed || parsed.status !== 200) {
    return json({ ok: false, error: `Upstream status ${parsed?.status ?? 'unknown'}` }, { status: 502 })
  }

  // Optional overview parse: provides daemon-level CPU/mem ratios.
  let overview: MCSMOverviewResponse | null = null
  try {
    if (ovRes && typeof ovRes?.ok === 'boolean' && ovRes.ok) {
      overview = (await ovRes.json()) as any
    }
  } catch {
    overview = null
  }

  const inst = parsed.data
  const running = inst?.status === 3

  const onlinePlayers =
    typeof inst?.info?.currentPlayers === 'number' ? inst?.info?.currentPlayers : undefined
  const maxPlayers = typeof inst?.info?.maxPlayers === 'number' ? inst?.info?.maxPlayers : undefined
  const version = (inst?.info?.version || '').trim() || undefined
  // Per requirement: CPU/memory/storage/network must come from node API (overview),
  // never from instance fields.
  let cpu: number | undefined = undefined
  let memoryTotal: number | undefined = undefined

  // Fallbacks from overview (daemon/node API): cpuUsage + memUsage + totalmem/freemem.
  const remote = overview?.status === 200 ? overview?.data?.remote?.find((r) => r?.uuid === daemonId) : undefined
  const daemonCpu = typeof remote?.system?.cpuUsage === 'number' ? remote.system.cpuUsage : undefined
  const daemonMemUsage = typeof remote?.system?.memUsage === 'number' ? remote.system.memUsage : undefined
  const daemonTotalMem = typeof remote?.system?.totalmem === 'number' ? remote.system.totalmem : undefined
  const daemonFreeMem = typeof remote?.system?.freemem === 'number' ? remote.system.freemem : undefined

  // Per requirement: prefer node API metrics (cpu/mem) when available.
  if (typeof daemonCpu === 'number') cpu = daemonCpu

  // We return memory ratio when possible (0..1), to avoid misleading JVM-vs-Xmx calculations.
  const memoryRatio = typeof daemonMemUsage === 'number' ? daemonMemUsage : undefined
  if (typeof daemonTotalMem === 'number') memoryTotal = daemonTotalMem

  let memoryUsedFinal: number | undefined = undefined
  if (typeof daemonTotalMem === 'number' && typeof daemonFreeMem === 'number') {
    memoryUsedFinal = Math.max(0, daemonTotalMem - daemonFreeMem)
  } else if (typeof daemonTotalMem === 'number' && typeof daemonMemUsage === 'number') {
    memoryUsedFinal = Math.max(0, daemonTotalMem * daemonMemUsage)
  }

  return json({
    online: running,
    players: { online: onlinePlayers, max: maxPlayers },
    version,
    cpu,
    memory: { used: memoryUsedFinal, total: memoryTotal, ratio: memoryRatio },
    // Storage/network not returned unless node API provides them.
    storage: {},
    network: {},
    updatedAt: typeof parsed.time === 'number' ? parsed.time : Date.now(),
  })
}

