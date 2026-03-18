'use client'

import { useEffect, useState } from 'react'
import type { Heading } from '@/lib/content'

export function TOC({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '0px 0px -80% 0px', threshold: 0 }
    )

    for (const heading of headings) {
      const el = document.getElementById(heading.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <aside className="hidden w-[240px] shrink-0 xl:block">
      <div className="sticky top-[76px] max-h-[calc(100vh-76px)] overflow-y-auto py-8 pl-4">
        <h4 className="text-sm font-semibold text-white">
          On this page
        </h4>
        <ul className="mt-3 space-y-2">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block text-sm transition ${
                  h.depth === 3 ? 'pl-3' : ''
                } ${
                  activeId === h.id
                    ? 'text-sky-500'
                    : 'text-[#90a1b9] hover:text-slate-300'
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
