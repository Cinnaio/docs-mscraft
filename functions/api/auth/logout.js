/**
 * Clears OAuth session cookies and redirects home.
 * GET /api/auth/logout
 */
import { clearCookieHeader } from '../../../_shared/cookies.js'

export async function onRequestGet(context) {
  const url = new URL(context.request.url)
  const origin = url.origin

  const headers = new Headers()
  headers.append('Set-Cookie', clearCookieHeader('oauth_bs_access', { path: '/' }))
  headers.append('Set-Cookie', clearCookieHeader('oauth_bs_refresh', { path: '/' }))
  headers.append('Set-Cookie', clearCookieHeader('oauth_state', { path: '/' }))
  headers.set('Location', `${origin}/`)

  return new Response(null, { status: 302, headers })
}
