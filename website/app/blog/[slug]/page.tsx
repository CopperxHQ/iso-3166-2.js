import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'

import { getContentBySlug, extractHeadings, getBlogArticles } from '@/lib/content'
import { mdxComponents } from '@/app/_components/mdx-components'
import { TOC } from '@/app/_components/toc'
import { BreadcrumbSchema } from '@/app/_components/breadcrumb-schema'

export function generateStaticParams() {
  return getBlogArticles().map((article) => ({ slug: article.slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const articles = getBlogArticles()
  const article = articles.find((a) => a.slug === slug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.description,
  }
}

export default async function BlogArticlePage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params

  const articles = getBlogArticles()
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  let content: string
  let frontmatter: Record<string, any>
  try {
    const result = getContentBySlug(['blog', slug])
    content = result.content
    frontmatter = result.frontmatter
  } catch {
    notFound()
  }

  const headings = extractHeadings(content)

  const faqs = frontmatter.faqs as { q: string; a: string }[] | undefined
  const faqSchema = faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      }
    : null

  return (
    <div className="mx-auto flex max-w-[90rem]">
      <main className="min-w-0 flex-1 px-6 py-10 md:px-8">
        <article className="mx-auto max-w-3xl">
          <BreadcrumbSchema
            items={[
              { name: 'Home', href: '/' },
              { name: 'Blog', href: '/blog' },
              { name: article.title },
            ]}
          />
          {faqSchema && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
          )}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-sky-500 transition hover:text-sky-400"
          >
            <span aria-hidden="true">&larr;</span> Back to Blog
          </Link>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {article.title}
          </h1>

          {frontmatter.description && (
            <p className="mt-3 text-lg leading-relaxed text-slate-400">
              {frontmatter.description}
            </p>
          )}

          <div className="mt-8 border-t border-slate-800" />

          <div className="mt-8">
            <MDXRemote
              source={content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypePrettyCode, { theme: 'github-dark', keepBackground: false }],
                  ],
                },
              }}
            />
          </div>
        </article>
      </main>
      <TOC headings={headings} />
    </div>
  )
}
