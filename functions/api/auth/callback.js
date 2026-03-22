/**
 * OAuth callback: validates state, exchanges code for tokens, sets HttpOnly session cookie.
 * GET /api/auth/callback
 */
import { getCookie, setCookieHeader, clearCookieHeader } from '../../../_shared/cookies.js'

const DEFAULT_SKIN_BASE = 'https://skin.cubem.cn'

export async function onRequestGet(context) {
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
  } catch (e) {
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
  // Clear state cookie
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
