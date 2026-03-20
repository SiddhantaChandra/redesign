#!/usr/bin/env bun
/**
 * Generates index of all design markdown files.
 *
 * Structure:
 * - designs/name.md → slug: "name", author: null
 * - designs/author/name.md → slug: "author/name", author: "author"
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import glob from 'fast-glob'

interface Design {
  slug: string
  author: string | null
  content: string
}

interface Index {
  generatedAt: string
  designs: Design[]
}

const DESIGNS_DIR = path.resolve(process.cwd(), 'designs')
const OUTPUT_FILE = path.resolve(
  process.cwd(),
  'src',
  'generated',
  'designs.json',
)

async function generateIndex(): Promise<void> {
  console.log('🔍 Scanning designs...')

  try {
    await fs.access(DESIGNS_DIR)
  } catch {
    console.log('Creating designs directory...')
    await fs.mkdir(DESIGNS_DIR, { recursive: true })
  }

  const mdFiles = await glob('**/*.md', {
    cwd: DESIGNS_DIR,
    absolute: true,
  })

  console.log(`📄 Found ${mdFiles.length} designs`)

  const designs: Design[] = []

  for (const filePath of mdFiles) {
    const relativePath = path
      .relative(DESIGNS_DIR, filePath)
      .replace(/\\/g, '/')
    const parsed = path.parse(relativePath)

    const slug = parsed.dir ? `${parsed.dir}/${parsed.name}` : parsed.name
    const author = parsed.dir || null

    const content = await fs.readFile(filePath, 'utf-8')

    designs.push({ slug, author, content })
    console.log(`  ✓ ${slug}`)
  }

  designs.sort((a, b) => a.slug.localeCompare(b.slug))

  const generatedAt = new Date().toISOString()

  const index: Index = {
    generatedAt,
    designs,
  }

  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true })
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(index, null, 2), 'utf-8')

  console.log(`\n✅ Generated index with ${designs.length} designs`)
  console.log(`📁 ${OUTPUT_FILE}`)

  // Generate sitemap.xml
  const sitemapPath = path.resolve(process.cwd(), 'public', 'sitemap.xml')
  const urlEntries = [
    `  <url>
    <loc>https://stitchredesign.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`,
    ...designs.map(
      (d) => `  <url>
    <loc>https://stitchredesign.com/design/${d.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
    ),
  ].join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`

  await fs.writeFile(sitemapPath, sitemap, 'utf-8')
  console.log(`🗺️  Generated sitemap.xml`)
  console.log(`📁 ${sitemapPath}`)
}

generateIndex()
