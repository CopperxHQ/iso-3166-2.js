import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export function getContentBySlug(slug: string[]): {
  content: string
  frontmatter: Record<string, any>
} {
  // Try exact path first, then with /index
  const candidates = [
    path.join(CONTENT_DIR, ...slug) + '.mdx',
    path.join(CONTENT_DIR, ...slug, 'index.mdx'),
    path.join(CONTENT_DIR, ...slug) + '.md',
  ]

  for (const filePath of candidates) {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { content, data } = matter(raw)
      return { content, frontmatter: data }
    }
  }

  throw new Error(`Content not found for slug: ${slug.join('/')}`)
}

export function getAllContentPaths(): string[][] {
  const paths: string[][] = []

  function walk(dir: string, prefix: string[]) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.name.startsWith('_')) continue

      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), [...prefix, entry.name])
      } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
        const name = entry.name.replace(/\.(mdx|md)$/, '')
        if (name === 'index') {
          // index.mdx maps to the directory slug
          if (prefix.length > 0) {
            paths.push(prefix)
          } else {
            // root index.mdx — this is the docs home page
            paths.push(['index'])
          }
        } else {
          paths.push([...prefix, name])
        }
      }
    }
  }

  walk(CONTENT_DIR, [])
  return paths
}

export interface Heading {
  depth: number
  text: string
  id: string
}

export function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = []
  const regex = /^(#{2,3})\s+(.+)$/gm
  let match

  while ((match = regex.exec(content)) !== null) {
    const depth = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
    headings.push({ depth, text, id })
  }

  return headings
}
