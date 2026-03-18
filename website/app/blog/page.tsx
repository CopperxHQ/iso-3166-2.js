import type { Metadata } from 'next'
import Link from 'next/link'
import { getBlogArticles } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Guides & References',
  description:
    'Comprehensive guides on ISO country codes, regional groupings, subdivisions, currencies, dial codes, and compliance topics.',
}

const CATEGORY_ORDER = [
  'Library',
  'ISO Standards',
  'Tutorials',
  'Regional Guides',
  'EU & Compliance',
  'Currency & Dial Codes',
  'Subdivision Guides',
]

export default function BlogListingPage() {
  const articles = getBlogArticles()

  const grouped = new Map<string, typeof articles>()
  for (const cat of CATEGORY_ORDER) {
    grouped.set(cat, [])
  }
  for (const article of articles) {
    const list = grouped.get(article.category)
    if (list) {
      list.push(article)
    } else {
      grouped.set(article.category, [article])
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 md:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Guides &amp; References
      </h1>
      <p className="mt-3 text-lg text-slate-400">
        Everything you need to work with country codes, subdivisions, and international data.
      </p>

      <div className="mt-14 space-y-14">
        {CATEGORY_ORDER.map((category) => {
          const items = grouped.get(category)
          if (!items || items.length === 0) return null

          return (
            <section key={category}>
              <h2 className="border-b border-slate-800 pb-2 text-sm font-medium uppercase tracking-wider text-sky-500">
                {category}
              </h2>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {items.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="group rounded-lg px-4 py-3 transition hover:bg-slate-800/50"
                  >
                    <h3 className="text-base font-medium text-white">{article.title}</h3>
                    {article.description && (
                      <p className="mt-1 line-clamp-2 text-sm text-slate-400">
                        {article.description}
                      </p>
                    )}
                    <span className="mt-2 inline-block text-sm text-sky-500 opacity-0 transition group-hover:opacity-100">
                      Read &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </main>
  )
}
