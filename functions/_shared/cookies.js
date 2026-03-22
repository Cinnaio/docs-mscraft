/**
 * Cookie helpers for Cloudflare Pages Functions (Workers runtime).
 */

/**
 * @param {Request} request
 * @param {string} name
 * @returns {string | null}
 */
export function getCookie(request, name) {
  const raw = request.headers.get('Cookie') || ''
  const parts = raw.split(';').map((p) => p.trim())
  const prefix = `${name}=`
  for (const p of parts) {
    if (p.startsWith(prefix)) {
      return decodeURIComponent(p.slice(prefix.length))
    }
  }
  return null
}

/**
 * @param {string} name
 * @param {string} value
 * @param {object} opts
 * @param {number} [opts.maxAge]
 * @param {string} [opts.path]
 * @param {boolean} [opts.httpOnly]
 * @param {boolean} [opts.secure]
 * @param {'Lax'|'Strict'|'None'} [opts.sameSite]
 */
export function setCookieHeader(name, value, opts = {}) {
  const path = opts.path ?? '/'
  let s = `${name}=${encodeURIComponent(value)}; Path=${path}`
  if (opts.maxAge !== undefined) s += `; Max-Age=${opts.maxAge}`
  if (opts.httpOnly) s += '; HttpOnly'
  if (opts.secure) s += '; Secure'
  if (opts.sameSite) s += `; SameSite=${opts.sameSite}`
  return s
}

/**
 * Clear cookie (best-effort).
 * @param {string} name
 * @param {object} opts
 */
export function clearCookieHeader(name, opts = {}) {
  const path = opts.path ?? '/'
  return `${name}=; Path=${path}; Max-Age=0; HttpOnly; Secure; SameSite=Lax`
}
