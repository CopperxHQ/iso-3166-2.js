import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'

import { getContentBySlug, getAllContentPaths, extractHeadings } from '@/lib/content'
import { getSidebar, getSectionConfig, getPrevNext, getParentTitle } from '@/lib/navigation'
import { mdxComponents } from '@/app/_components/mdx-components'
import { Sidebar } from '@/app/_components/sidebar'
import { TOC } from '@/app/_components/toc'
import { PrevNext } from '@/app/_components/prev-next'

export function generateStaticParams() {
  return getAllContentPaths().map((slug) => ({ mdxPath: slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ mdxPath: string[] }>
}): Promise<Metadata> {
  const { mdxPath } = await props.params
  try {
    const { frontmatter } = getContentBySlug(mdxPath)
    return {
      title: frontmatter.title,
      description: frontmatter.description,
    }
  } catch {
    return {}
  }
}

export default async function Page(props: {
  params: Promise<{ mdxPath: string[] }>
}) {
  const { mdxPath } = await props.params

  let content: string
  let frontmatter: Record<string, any>
  try {
    const result = getContentBySlug(mdxPath)
    content = result.content
    frontmatter = result.frontmatter
  } catch {
    notFound()
  }

  const headings = extractHeadings(content)
  const section = mdxPath[0]
  const sectionConfig = getSectionConfig(mdxPath)
  const sidebarItems = sectionConfig.sidebar ? getSidebar(section) : []
  const { prev, next } = getPrevNext(mdxPath)
  const currentPath = '/' + mdxPath.join('/')
  const parentTitle = getParentTitle(mdxPath)

  return (
    <div className="mx-auto flex max-w-[90rem]">
      {sectionConfig.sidebar && <Sidebar items={sidebarItems} currentPath={currentPath} />}
      <main className="min-w-0 flex-1 px-6 py-10 md:px-8">
        <article className="mx-auto max-w-3xl">
          {parentTitle && (
            <p className="mb-2 text-sm font-medium text-sky-500">{parentTitle}</p>
          )}
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
        </article>
        <div className="mx-auto max-w-3xl">
          <PrevNext prev={prev} next={next} />
        </div>
      </main>
      {sectionConfig.toc && <TOC headings={headings} />}
    </div>
  )
}
