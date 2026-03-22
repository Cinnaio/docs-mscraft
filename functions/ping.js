/**
 * Health check: if GET /ping returns 200, Pages Functions are deployed.
 * GET /ping
 */
export function onRequestGet() {
  return new Response('pages-functions-ok', {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
