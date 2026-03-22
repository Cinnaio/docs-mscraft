/**
 * OAuth routes: /api/auth/login | callback | me | logout
 * Single dynamic file so Cloudflare Pages reliably registers /api/auth/* (see [action] segment).
 */
import { getCookie, setCookieHeader, clearCookieHeader } from '../../_shared/cookies.js'

const DEFAULT_SKIN_BASE = 'https://skin.cubem.cn'

export async function onRequestGet(context) {
  const action = context.params?.action
  switch (action) {
    case 'login':
      return handleLogin(context)
    case 'callback':
      return handleCallback(context)
    case 'me':
      return handleMe(context)
    case 'logout':
      return handleLogout(context)
    default:
      return new Response('Not Found', { status: 404, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  }
}

async function handleLogin(context) {
  const { env, request } = context
  const clientId = env.BLESSING_SKIN_CLIENT_ID
  const redirectUri = env.BLESSING_SKIN_REDIRECT_URI
  const skinBase = (env.BLESSING_SKIN_BASE_URL || DEFAULT_SKIN_BASE).replace(/\/$/, '')

  if (!clientId || !redirectUri) {
    return new Response('OAuth is not configured (missing BLESSING_SKIN_CLIENT_ID or BLESSING_SKIN_REDIRECT_URI).', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  const state = crypto.randomUUID()
  const authorizeUrl = new URL(`${skinBase}/oauth/authorize`)
  authorizeUrl.searchParams.set('client_id', clientId)
  authorizeUrl.searchParams.set('redirect_uri', redirectUri)
  authorizeUrl.searchParams.set('response_type', 'code')
  authorizeUrl.searchParams.set('scope', '')
  authorizeUrl.searchParams.set('state', state)

  const headers = new Headers()
  headers.set(
    'Set-Cookie',
    setCookieHeader('oauth_state', state, {
      maxAge: 600,
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
    })
  )
  headers.set('Location', authorizeUrl.toString())
  return new Response(null, { status: 302, headers })
}

async function handleCallback(context) {
  const { env, request } = context
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const oauthError = url.searchParams.get('error')
  const errorDescription = url.searchParams.get('error_description')

  const clientId = env.BLESSING_SKIN_CLIENT_ID
  const clientSecret = env.BLESSING_SKIN_CLIENT_SECRET
  const redirectUri = env.BLESSING_SKIN_REDIRECT_URI
  const skinBase = (env.BLESSING_SKIN_BASE_URL || DEFAULT_SKIN_BASE).replace(/\/$/, '')

  const origin = url.origin
  const failRedirect = (msg) => {
    const u = new URL('/', origin)
    u.searchParams.set('oauth_error', msg.slice(0, 200))
    return Response.redirect(u.toString(), 302)
  }

  if (oauthError) {
    const msg = errorDescription || oauthError
    return failRedirect(msg)
  }

  if (!clientId || !clientSecret || !redirectUri) {
    return failRedirect('oauth_not_configured')
  }

  const savedState = getCookie(request, 'oauth_state')
  if (!state || !savedState || state !== savedState) {
    return failRedirect('invalid_state')
  }

  if (!code) {
    return failRedirect('missing_code')
  }

  const tokenUrl = `${skinBase}/oauth/token`
  const form = new URLSearchParams()
  form.set('grant_type', 'authorization_code')
  form.set('client_id', clientId)
  form.set('client_secret', clientSecret)
  form.set('redirect_uri', redirectUri)
  form.set('code', code)

  let tokenRes
  try {
    tokenRes = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form.toString(),
    })
  } catch {
    return failRedirect('token_request_failed')
  }

  const tokenText = await tokenRes.text()
  let tokenJson
  try {
    tokenJson = JSON.parse(tokenText)
  } catch {
    return failRedirect('token_invalid_json')
  }

  if (!tokenRes.ok || !tokenJson.access_token) {
    const errMsg = tokenJson.error_description || tokenJson.error || tokenText.slice(0, 100) || 'token_error'
    return failRedirect(String(errMsg))
  }

  const accessToken = tokenJson.access_token
  const refreshToken = tokenJson.refresh_token || ''
  const expiresIn = typeof tokenJson.expires_in === 'number' ? tokenJson.expires_in : 3600

  const headers = new Headers()
  headers.append('Set-Cookie', clearCookieHeader('oauth_state', { path: '/' }))

  const maxAge = Math.min(Math.max(expiresIn, 60), 60 * 60 * 24 * 7)
  headers.append(
    'Set-Cookie',
    setCookieHeader('oauth_bs_access', accessToken, {
      maxAge,
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
    })
  )

  if (refreshToken) {
    headers.append(
      'Set-Cookie',
      setCookieHeader('oauth_bs_refresh', refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'Lax',
      })
    )
  }

  headers.set('Location', `${origin}/`)
  return new Response(null, { status: 302, headers })
}

async function handleMe(context) {
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

function handleLogout(context) {
  const url = new URL(context.request.url)
  const origin = url.origin

  const headers = new Headers()
  headers.append('Set-Cookie', clearCookieHeader('oauth_bs_access', { path: '/' }))
  headers.append('Set-Cookie', clearCookieHeader('oauth_bs_refresh', { path: '/' }))
  headers.append('Set-Cookie', clearCookieHeader('oauth_state', { path: '/' }))
  headers.set('Location', `${origin}/`)

  return new Response(null, { status: 302, headers })
}
