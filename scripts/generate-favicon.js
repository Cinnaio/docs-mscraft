/* eslint-disable no-console */
/**
 * 可选：从 logo.png 生成 favicon.png（48×48）与 apple-touch-icon.png（180×180）。
 * 默认不参与 docs:build；直接维护静态文件即可。换 logo 后需要时执行：npm run docs:favicon
 */
const path = require('node:path')
const sharp = require('sharp')

const ROOT = path.join(__dirname, '..')
const LOGO = path.join(ROOT, 'docs', 'public', 'images', 'logo.png')
const OUT_FAVICON = path.join(ROOT, 'docs', 'public', 'favicon.png')
const OUT_APPLE = path.join(ROOT, 'docs', 'public', 'apple-touch-icon.png')

async function main() {
  await sharp(LOGO)
    .resize(48, 48, { fit: 'cover', position: 'centre' })
    .png()
    .toFile(OUT_FAVICON)
  await sharp(LOGO)
    .resize(180, 180, { fit: 'cover', position: 'centre' })
    .png()
    .toFile(OUT_APPLE)
  console.log('generate-favicon:', path.relative(ROOT, OUT_FAVICON), path.relative(ROOT, OUT_APPLE))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
