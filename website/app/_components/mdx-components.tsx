import type { MDXComponents } from 'mdx/types'
import type { ComponentPropsWithoutRef } from 'react'
import { CopyButton } from './copy-button'
import { Callout } from './callout'
import { Steps } from './steps'

function Pre(props: ComponentPropsWithoutRef<'pre'>) {
  const code =
    typeof props.children === 'object' &&
    props.children !== null &&
    'props' in props.children
      ? (props.children as any).props?.children || ''
      : ''

  return (
    <div className="group relative my-6">
      <pre
        className="overflow-x-auto rounded-xl bg-slate-800/60 px-4 py-3 text-sm leading-[1.7143] text-slate-50 ring-1 ring-slate-300/10"
        {...props}
      />
      <CopyButton
        text={typeof code === 'string' ? code : ''}
        className="absolute right-3 top-3 opacity-0 transition group-hover:opacity-100"
      />
    </div>
  )
}

function InlineCode(props: ComponentPropsWithoutRef<'code'>) {
  const isInPre =
    props.className?.includes('hljs') ||
    props.className?.includes('shiki') ||
    props['data-language' as keyof typeof props]

  if (isInPre) {
    return <code {...props} />
  }

  return (
    <code
      className="rounded bg-slate-800 px-1.5 py-0.5 text-[0.875em] font-medium text-slate-200 ring-1 ring-white/10"
      {...props}
    />
  )
}

export const mdxComponents: MDXComponents = {
  pre: Pre,
  code: InlineCode,
  h1: (props) => (
    <h1
      className="text-[2rem] font-normal leading-tight tracking-[-0.025em] text-white"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-12 border-t border-slate-800 pt-10 text-2xl font-normal leading-snug text-white first:mt-0 first:border-0 first:pt-0"
      id={slugify(props.children)}
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 text-xl font-normal leading-snug text-white"
      id={slugify(props.children)}
      {...props}
    />
  ),
  h4: (props) => (
    <h4 className="mt-6 text-base font-medium text-white" {...props} />
  ),
  p: (props) => <p className="mt-6 text-[1rem] leading-7 text-slate-400" {...props} />,
  a: (props) => (
    <a className="text-sky-500 underline decoration-sky-500/30 underline-offset-2 transition hover:text-sky-400 hover:decoration-sky-400/50" {...props} />
  ),
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-400" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-slate-400" {...props} />,
  li: (props) => <li className="leading-7" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-2 border-sky-500 pl-4 text-slate-300 [&>p]:mt-0"
      {...props}
    />
  ),
  table: (props) => (
    <div className="my-6 overflow-x-auto rounded-xl ring-1 ring-white/10">
      <table className="w-full text-left text-sm" {...props} />
    </div>
  ),
  thead: (props) => <thead className="border-b border-slate-700 bg-slate-800/50" {...props} />,
  th: (props) => (
    <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-slate-300" {...props} />
  ),
  td: (props) => (
    <td className="border-t border-slate-800 px-4 py-2.5 text-slate-400" {...props} />
  ),
  tr: (props) => <tr className="even:bg-slate-800/30" {...props} />,
  hr: () => <hr className="my-10 border-t border-slate-800" />,
  strong: (props) => <strong className="font-semibold text-slate-200" {...props} />,
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="my-6 rounded-xl ring-1 ring-white/10" alt="" {...props} />
  ),
  Callout,
  Steps,
  Tabs: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  'Tabs.Tab': ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}

function slugify(children: any): string {
  const text = extractText(children)
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

function extractText(node: any): string {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (node?.props?.children) return extractText(node.props.children)
  return ''
}
