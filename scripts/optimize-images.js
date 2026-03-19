/* eslint-disable no-console */
const fs = require('node:fs')
const fsp = require('node:fs/promises')
const path = require('node:path')
const os = require('node:os')
const { execSync } = require('node:child_process')

let sharp
try {
  sharp = require('sharp')
} catch {
  // sharp may not be installed yet (e.g. first install). Don't fail the build.
  process.exit(0)
}

const IMAGES_DIR = path.join(process.cwd(), 'docs', 'public', 'images')
const ORIGINALS_DIR = path.join(IMAGES_DIR, '_originals')
const MIN_BYTES = 10 * 1024
const MIN_SAVINGS_RATIO = 0.95 // only replace if new <= 95% of old

function isImageFile(file) {
  const ext = path.extname(file).toLowerCase()
  return ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.webp'
}

async function* walk(dir) {
  let entries
  try {
    entries = await fsp.readdir(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const e of entries) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) yield* walk(p)
    else if (e.isFile()) yield p
  }
}

function hasGitRepo() {
  return fs.existsSync(path.join(process.cwd(), '.git'))
}

function toPosix(p) {
  return p.replace(/\\/g, '/')
}

async function ensureBackupFromGitIfPossible(filePath) {
  // If backup already exists, nothing to do.
  const rel = path.relative(IMAGES_DIR, filePath)
  const backupPath = path.join(ORIGINALS_DIR, rel)
  if (fs.existsSync(backupPath)) return

  if (!hasGitRepo()) return

  // Try to materialize the original from HEAD (works when current working tree
  // has optimized images but HEAD still contains originals, i.e. before commit).
  const gitPath = toPosix(path.join('docs', 'public', 'images', rel))
  try {
    const buf = execSync(`git show HEAD:"${gitPath}"`, {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
    if (!buf || !buf.length) return
    await fsp.mkdir(path.dirname(backupPath), { recursive: true })
    await fsp.writeFile(backupPath, buf)
  } catch {
    // ignore
  }
}

async function optimizeOne(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const stat = await fsp.stat(filePath)
  const before = stat.size
  if (before < MIN_BYTES) return { changed: false, before, after: before }

  // Don't optimize backups
  if (path.normalize(filePath).startsWith(path.normalize(ORIGINALS_DIR + path.sep))) {
    return { changed: false, before, after: before }
  }

  const tmp = path.join(
    os.tmpdir(),
    `docs-mscraft-opt-${Date.now()}-${Math.random().toString(16).slice(2)}${ext}`
  )

  const img = sharp(filePath, { failOn: 'none' })
  const meta = await img.metadata()

  // Skip animations / unsupported
  if (meta.pages && meta.pages > 1) return { changed: false, before, after: before }

  let pipeline = img
  if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline.jpeg({
      quality: 82,
      mozjpeg: true,
      chromaSubsampling: '4:4:4',
    })
  } else if (ext === '.png') {
    pipeline = pipeline.png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      palette: true,
      effort: 7,
    })
  } else if (ext === '.webp') {
    pipeline = pipeline.webp({
      quality: 82,
      effort: 5,
      smartSubsample: true,
    })
  }

  await pipeline.toFile(tmp)

  const after = (await fsp.stat(tmp)).size
  if (after <= before * MIN_SAVINGS_RATIO) {
    // Backup original once, preserving relative path under images/
    const rel = path.relative(IMAGES_DIR, filePath)
    const backupPath = path.join(ORIGINALS_DIR, rel)
    if (!fs.existsSync(backupPath)) {
      await fsp.mkdir(path.dirname(backupPath), { recursive: true })
      await fsp.copyFile(filePath, backupPath)
    }

    await fsp.copyFile(tmp, filePath)
    await fsp.unlink(tmp).catch(() => {})
    return { changed: true, before, after }
  }

  await fsp.unlink(tmp).catch(() => {})
  return { changed: false, before, after: before }
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) return

  const files = []
  for await (const p of walk(IMAGES_DIR)) {
    if (isImageFile(p)) files.push(p)
  }

  if (!files.length) return

  // Best-effort: if originals folder is empty (e.g. images were optimized once already),
  // try to restore originals from HEAD before any further optimization.
  for (const file of files) {
    try {
      if (
        !path.normalize(file).startsWith(path.normalize(ORIGINALS_DIR + path.sep))
      ) {
        await ensureBackupFromGitIfPossible(file)
      }
    } catch {
      // ignore
    }
  }

  let changed = 0
  let beforeTotal = 0
  let afterTotal = 0

  for (const file of files) {
    try {
      const r = await optimizeOne(file)
      beforeTotal += r.before
      afterTotal += r.after
      if (r.changed) changed++
    } catch {
      // never fail build because of one image
    }
  }

  const saved = beforeTotal - afterTotal
  if (saved > 0) {
    console.log(
      `[optimize-images] optimized ${changed}/${files.length} files; saved ${(saved / 1024).toFixed(
        1
      )} KiB`
    )
  }
}

main().catch(() => {})

