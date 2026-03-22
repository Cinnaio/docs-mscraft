/**
 * Copies repository-root `functions/` → `docs/functions/` so Cloudflare Pages
 * projects with "Root directory" = docs still deploy Pages Functions.
 * Runs from predocs:build (see package.json).
 */
// @ts-ignore
const fs = require('fs')
// @ts-ignore
const path = require('path')

const root = path.join(__dirname, '..')
const src = path.join(root, 'functions')
const dest = path.join(root, 'docs', 'functions')

function rmrf(dir) {
  if (!fs.existsSync(dir)) return
  fs.rmSync(dir, { recursive: true, force: true })
}

function copyRecursive(from, to) {
  const stat = fs.statSync(from)
  if (stat.isDirectory()) {
    fs.mkdirSync(to, { recursive: true })
    for (const name of fs.readdirSync(from)) {
      copyRecursive(path.join(from, name), path.join(to, name))
    }
  } else {
    fs.copyFileSync(from, to)
  }
}

if (!fs.existsSync(src)) {
  console.warn('[sync-functions] skip: no functions/ at repo root')
  process.exit(0)
}

rmrf(dest)
copyRecursive(src, dest)
console.log('[sync-functions] copied functions/ → docs/functions/')
