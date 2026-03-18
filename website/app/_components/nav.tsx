'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Nav({ position = 'fixed' }: { position?: 'fixed' | 'sticky' }) {
  const [open, setOpen] = useState(false)

  return (
    <nav
      className={`${position} top-0 z-50 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md`}
    >
      <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2 text-sm font-medium text-white">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-sky-500 text-xs font-black text-white">
            K
          </span>
          Countries by Kosh Money
        </a>
        <div className="hidden items-center gap-6 text-sm sm:flex">
          <a href="/docs/getting-started" className="text-white/80 transition hover:text-white">
            Docs
          </a>
          <a href="/blog" className="text-white/80 transition hover:text-white">
            Blog
          </a>
          <a href="/tools/country-code-converter" className="text-white/80 transition hover:text-white">
            Converter
          </a>
          <a
            href="https://github.com/CopperxHQ/countries"
            className="text-white/80 transition hover:text-white"
          >
            GitHub
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="text-slate-400 hover:text-white sm:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-800 bg-slate-900 px-6 py-4 sm:hidden">
          <div className="flex flex-col gap-3 text-sm">
            <a href="/docs/getting-started" className="text-slate-400 hover:text-white">
              Docs
            </a>
            <a href="/blog" className="text-slate-400 hover:text-white">
              Blog
            </a>
            <a href="/tools/country-code-converter" className="text-slate-400 hover:text-white">
              Converter
            </a>
            <a href="https://github.com/CopperxHQ/countries" className="text-slate-400 hover:text-white">
              GitHub
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
