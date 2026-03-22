/**
 * Returns Blessing Skin user JSON when session cookie is present.
 * GET /api/auth/me
 */
import { getCookie } from '../../../_shared/cookies.js'

const DEFAULT_SKIN_BASE = 'https://skin.cubem.cn'

export async function onRequestGet(context) {
  const { env, request } = context
  const skinBase = (env.BLESSING_SKIN_BASE_URL || DEFAULT_SKIN_BASE).replace(/\/$/, '')
  const token = getCookie(request, 'oauth_bs_access')

  if (!token) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'private, no-store',
      },
    })
  }

  const userUrl = `${skinBase}/api/user`
  let res
  try {
    res = await fetch(userUrl, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  } catch {
    return new Response(JSON.stringify({ authenticated: false, error: 'user_fetch_failed' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
  }

  const text = await res.text()
  if (!res.ok) {
    return new Response(JSON.stringify({ authenticated: false, error: 'invalid_token', detail: text.slice(0, 200) }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'private, no-store',
      },
    })
  }

  let data
  try {
    data = JSON.parse(text)
  } catch {
    return new Response(JSON.stringify({ authenticated: false, error: 'invalid_user_json' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
  }

  return new Response(
    JSON.stringify({
      authenticated: true,
      user: data,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'private, no-store',
      },
    }
  )
}
