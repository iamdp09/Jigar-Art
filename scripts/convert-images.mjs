/**
 * convert-images.mjs
 * Converts all PNG product images to WebP using sharp.
 * Run once: node scripts/convert-images.mjs
 */
import sharp from 'sharp'
import { readdirSync, existsSync } from 'fs'
import { join, basename, extname } from 'path'

const INPUT_DIR  = './public/products'
const OUTPUT_DIR = './public/products'
const QUALITY    = 82   // 82 is visually lossless for sculpture photos

const files = readdirSync(INPUT_DIR).filter(f =>
  ['.png', '.jpg', '.jpeg'].includes(extname(f).toLowerCase())
)

console.log(`\nConverting ${files.length} images to WebP (quality ${QUALITY})...\n`)

let saved = 0
for (const file of files) {
  const inPath  = join(INPUT_DIR, file)
  const outName = basename(file, extname(file)) + '.webp'
  const outPath = join(OUTPUT_DIR, outName)

  // Skip if webp already exists and is newer
  if (existsSync(outPath)) {
    console.log(`  ⏭  ${outName} (already exists)`)
    continue
  }

  const { size: inSize } = (await import('fs')).statSync(inPath)
  await sharp(inPath).webp({ quality: QUALITY, effort: 6 }).toFile(outPath)
  const { size: outSize } = (await import('fs')).statSync(outPath)

  const pct = Math.round((1 - outSize / inSize) * 100)
  saved += inSize - outSize
  console.log(`  ✓  ${file} → ${outName}  (${pct}% smaller, ${(outSize/1024).toFixed(0)}KB)`)
}

const totalSaved = (saved / 1024 / 1024).toFixed(2)
console.log(`\n✅ Done! Saved ~${totalSaved} MB total.\n`)
