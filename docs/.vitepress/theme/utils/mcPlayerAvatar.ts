import { withBase } from 'vitepress'

const SKIN_BASE = 'https://skin.cubem.cn'

export function skinAvatarUrl(playerName: string) {
  const base = SKIN_BASE.replace(/\/$/, '')
  return `${base}/avatar/player/${encodeURIComponent(playerName)}?size=128&png`
}

export function minotarHelm(playerName: string) {
  return `https://minotar.net/helm/${encodeURIComponent(playerName)}/128.png`
}

export function mcHeadsAvatar(playerName: string) {
  return `https://minotar.net/helm/${encodeURIComponent(playerName)}/128.png`
}

/**
 * 皮肤站常 200 + 默认 Steve，故 Mojang 代理优先，再皮肤站，最后站点 logo。
 */
export function mcAvatarFallbackUrls(playerName: string): string[] {
  return [
    minotarHelm(playerName),
    mcHeadsAvatar(playerName),
    skinAvatarUrl(playerName),
    withBase('/images/logo.png'),
  ]
}
