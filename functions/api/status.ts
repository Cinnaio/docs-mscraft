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

  const u = new URL(`${base}/api/instance`)
  u.searchParams.set('uuid', uuid)
  u.searchParams.set('daemonId', daemonId)
  u.searchParams.set('apikey', apikey)

  const res = await fetch(u.toString(), {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json; charset=utf-8',
    },
  })

  const text = await res.text()
  if (!res.ok) {
    return json({ ok: false, error: `Upstream HTTP ${res.status}` }, { status: 502 })
  }

  let parsed: MCSMInstanceResponse | null = null
  try {
    parsed = JSON.parse(text) as MCSMInstanceResponse
  } catch {
    return json({ ok: false, error: 'Invalid upstream JSON' }, { status: 502 })
  }

  if (!parsed || parsed.status !== 200) {
    return json({ ok: false, error: `Upstream status ${parsed?.status ?? 'unknown'}` }, { status: 502 })
  }

  const inst = parsed.data
  const running = inst?.status === 3

  const onlinePlayers =
    typeof inst?.info?.currentPlayers === 'number' ? inst?.info?.currentPlayers : undefined
  const maxPlayers = typeof inst?.info?.maxPlayers === 'number' ? inst?.info?.maxPlayers : undefined
  const version = (inst?.info?.version || '').trim() || undefined
  const software =
    guessSoftwareFromStartCommand(inst?.config?.startCommand) ||
    (inst?.config?.type || '').toString().trim() ||
    (inst?.config?.processType || '').toString().trim() ||
    undefined

  return json({
    online: running,
    players: { online: onlinePlayers, max: maxPlayers },
    version,
    software,
    updatedAt: typeof parsed.time === 'number' ? parsed.time : Date.now(),
  })
}

