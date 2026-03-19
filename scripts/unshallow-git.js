const { execSync } = require('node:child_process')
const fs = require('node:fs')

function run(cmd) {
  // In CI/Cloudflare builds, `git` may be available but the repository may be shallow.
  execSync(cmd, { stdio: 'inherit' })
}

try {
  if (!fs.existsSync('.git')) {
    // No git metadata in build context; just continue (VitePress will skip/degenerate timestamp).
    process.exit(0)
  }

  const isShallow = execSync('git rev-parse --is-shallow-repository', {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  })
    .toString()
    .trim()
    .toLowerCase() === 'true'

  if (isShallow) {
    // Fetch full history so VitePress can call `git log -1 --pretty="%ai"` per file
    // and get correct per-page timestamps.
    run('git fetch --unshallow')
  }
} catch (e) {
  // Never fail the build because of timestamp fetching.
}

