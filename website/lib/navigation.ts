export interface NavItem {
  title: string
  href: string
  children?: NavItem[]
  hidden?: boolean
  sidebar?: boolean
}

type MetaValue =
  | string
  | {
      title?: string
      display?: 'hidden'
      theme?: Record<string, any>
    }
  | { '*': { theme: Record<string, any> } }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MetaMap = Record<string, any>

// Import all _meta.ts files
import rootMeta from '../content/_meta'
import docsMeta from '../content/docs/_meta'
import docsApiMeta from '../content/docs/api/_meta'
import docsGuidesMeta from '../content/docs/guides/_meta'
import docsExamplesMeta from '../content/docs/examples/_meta'
import blogMeta from '../content/blog/_meta'
import compareMeta from '../content/compare/_meta'
import useCasesMeta from '../content/use-cases/_meta'

const META_REGISTRY: Record<string, MetaMap> = {
  '': rootMeta as MetaMap,
  docs: docsMeta as MetaMap,
  'docs/api': docsApiMeta as MetaMap,
  'docs/guides': docsGuidesMeta as MetaMap,
  'docs/examples': docsExamplesMeta as MetaMap,
  blog: blogMeta as MetaMap,
  compare: compareMeta as MetaMap,
  'use-cases': useCasesMeta as MetaMap,
}

function buildNavItems(metaPath: string, basePath: string): NavItem[] {
  const meta = META_REGISTRY[metaPath]
  if (!meta) return []

  const items: NavItem[] = []

  for (const [key, value] of Object.entries(meta)) {
    // Skip wildcard config entries
    if (key === '*') continue

    const href = basePath ? `/${basePath}/${key}` : `/${key}`

    if (typeof value === 'string') {
      // Check if this key has children in the registry
      const childPath = basePath ? `${basePath}/${key}` : key
      const children = META_REGISTRY[childPath]
        ? buildNavItems(childPath, childPath)
        : undefined

      items.push({ title: value, href, children })
    } else {
      const isHidden = value.display === 'hidden'
      const childPath = basePath ? `${basePath}/${key}` : key
      const children = META_REGISTRY[childPath]
        ? buildNavItems(childPath, childPath)
        : undefined

      items.push({
        title: value.title,
        href,
        hidden: isHidden,
        sidebar: value.theme?.sidebar,
        children,
      })
    }
  }

  return items
}

let navTreeCache: NavItem[] | null = null

export function getNavTree(): NavItem[] {
  if (navTreeCache) return navTreeCache
  navTreeCache = buildNavItems('', '')
  return navTreeCache
}

export function getSidebar(section: string): NavItem[] {
  const tree = getNavTree()
  const sectionItem = tree.find(
    (item) => item.href === `/${section}` || item.href === `/${section}/`
  )
  if (!sectionItem?.children) return []
  return sectionItem.children
}

export function getSectionConfig(slug: string[]): { sidebar: boolean; toc: boolean } {
  // Determine section from first slug segment
  const section = slug[0]

  const rootMeta = META_REGISTRY[''] as MetaMap
  const sectionConfig = rootMeta[section]

  if (typeof sectionConfig === 'object' && 'theme' in sectionConfig) {
    return {
      sidebar: sectionConfig.theme?.sidebar !== false,
      toc: sectionConfig.theme?.toc !== false,
    }
  }

  // Default: show sidebar and TOC for docs, hide sidebar for blog/use-cases/compare
  if (section === 'blog' || section === 'use-cases' || section === 'compare') {
    return { sidebar: false, toc: true }
  }

  return { sidebar: true, toc: true }
}

function flattenNav(items: NavItem[]): NavItem[] {
  const flat: NavItem[] = []
  for (const item of items) {
    if (!item.hidden) {
      flat.push(item)
    }
    if (item.children) {
      flat.push(...flattenNav(item.children))
    }
  }
  return flat
}

export function getPrevNext(
  slug: string[]
): { prev: NavItem | null; next: NavItem | null } {
  const section = slug[0]
  const sidebar = getSidebar(section)
  const flat = flattenNav(sidebar)
  const currentHref = '/' + slug.join('/')

  const index = flat.findIndex((item) => item.href === currentHref)
  if (index === -1) return { prev: null, next: null }

  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
  }
}

export function getParentTitle(slug: string[]): string | null {
  if (slug.length < 2) return null

  const section = slug[0]
  const sidebar = getSidebar(section)
  const currentHref = '/' + slug.join('/')

  for (const item of sidebar) {
    if (item.children) {
      for (const child of item.children) {
        if (child.href === currentHref) return item.title
        if (child.children) {
          for (const grandchild of child.children) {
            if (grandchild.href === currentHref) return child.title
          }
        }
      }
    }
  }

  // For top-level section items, return section title from root meta
  const rootMeta = META_REGISTRY[''] as MetaMap
  const sectionMeta = rootMeta[section]
  if (typeof sectionMeta === 'string') return sectionMeta
  if (typeof sectionMeta === 'object' && 'title' in sectionMeta) return sectionMeta.title || null
  return null
}
