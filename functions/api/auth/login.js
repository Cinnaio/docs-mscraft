/**
 * Starts OAuth: sets oauth_state cookie and redirects to Blessing Skin authorize URL.
 * GET /api/auth/login
 */
import { setCookieHeader } from '../../_shared/cookies.js'

const DEFAULT_SKIN_BASE = 'https://skin.cubem.cn'

export async function onRequestGet(context) {
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
