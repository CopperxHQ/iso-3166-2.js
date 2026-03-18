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

export interface BlogArticle {
  slug: string
  title: string
  description: string
  category: string
}

const BLOG_CATEGORIES: Record<string, string> = {
  'introducing-koshmoney-countries': 'Library',
  'tree-shaking-country-data': 'Library',
  'best-country-npm-packages-2026': 'Library',
  'iso-3166-country-codes-guide': 'ISO Standards',
  'country-code-formats-alpha2-alpha3-numeric': 'ISO Standards',
  'all-249-country-codes-list': 'ISO Standards',
  'country-code-faq': 'ISO Standards',
  'african-countries-list-codes': 'Regional Guides',
  'asian-countries-list-codes': 'Regional Guides',
  'european-countries-list-codes': 'Regional Guides',
  'south-american-countries-list-codes': 'Regional Guides',
  'north-american-countries-list-codes': 'Regional Guides',
  'oceania-countries-list-codes': 'Regional Guides',
  'us-state-codes-list': 'Subdivision Guides',
  'canadian-province-codes': 'Subdivision Guides',
  'australian-state-codes-list': 'Subdivision Guides',
  'indian-state-codes-list': 'Subdivision Guides',
  'german-state-codes-list': 'Subdivision Guides',
  'uk-region-codes-list': 'Subdivision Guides',
  'uk-country-codes-subdivisions': 'Subdivision Guides',
  'japanese-prefecture-codes-list': 'Subdivision Guides',
  'brazilian-state-codes-list': 'Subdivision Guides',
  'mexican-state-codes-list': 'Subdivision Guides',
  'french-region-codes-list': 'Subdivision Guides',
  'italian-region-codes-list': 'Subdivision Guides',
  'spanish-community-codes-list': 'Subdivision Guides',
  'chinese-province-codes-list': 'Subdivision Guides',
  'south-korean-province-codes-list': 'Subdivision Guides',
  'eu-country-codes-list': 'EU & Compliance',
  'gdpr-eu-countries-developers': 'EU & Compliance',
  'sepa-countries-list': 'EU & Compliance',
  'eurozone-countries-list': 'EU & Compliance',
  'schengen-countries-list': 'EU & Compliance',
  'iso-country-codes-kyc-compliance': 'EU & Compliance',
  'countries-using-us-dollar': 'Currency & Dial Codes',
  'countries-using-euro': 'Currency & Dial Codes',
  'international-dialing-codes-list': 'Currency & Dial Codes',
  'countries-sharing-dial-code': 'Currency & Dial Codes',
  'phone-country-codes-dial-codes': 'Currency & Dial Codes',
  'react-country-dropdown-typescript': 'Tutorials',
  'nodejs-country-code-validation': 'Tutorials',
  'international-shipping-zones-country-state': 'Tutorials',
}

export function getBlogArticles(): BlogArticle[] {
  const blogDir = path.join(CONTENT_DIR, 'blog')
  const metaPath = path.join(blogDir, '_meta.ts')

  if (!fs.existsSync(metaPath)) return []

  // Read _meta.ts to get titles and ordering
  const metaRaw = fs.readFileSync(metaPath, 'utf-8')
  const articles: BlogArticle[] = []

  // Parse entries from _meta.ts (format: 'slug': 'Title')
  const entryRegex = /^\s*'([^']+)':\s*'([^']+)'/gm
  let match

  while ((match = entryRegex.exec(metaRaw)) !== null) {
    const slug = match[1]
    const title = match[2]

    // Read article frontmatter for description
    const articlePath = path.join(blogDir, `${slug}.mdx`)
    let description = ''
    if (fs.existsSync(articlePath)) {
      const raw = fs.readFileSync(articlePath, 'utf-8')
      const { data } = matter(raw)
      description = data.description || ''
    }

    articles.push({
      slug,
      title,
      description,
      category: BLOG_CATEGORIES[slug] || 'Guides',
    })
  }

  return articles
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
