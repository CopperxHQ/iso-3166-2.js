'use client'

import { useState, useCallback } from 'react'

const MANAGERS = [
  { label: 'npm', command: 'npm install @koshmoney/countries' },
  { label: 'yarn', command: 'yarn add @koshmoney/countries' },
  { label: 'pnpm', command: 'pnpm add @koshmoney/countries' },
  { label: 'bun', command: 'bun add @koshmoney/countries' },
] as const

export function InstallCommand({ dark }: { dark?: boolean }) {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(MANAGERS[active].command).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [active])

  const bg = dark ? 'bg-slate-800 border-slate-700' : 'bg-slate-900 border-slate-800'
  const tabBg = dark ? 'bg-slate-900/60' : 'bg-slate-950/60'

  return (
    <div className={`overflow-hidden rounded-xl border ${bg}`}>
      <div className={`flex items-center justify-between ${tabBg} px-1 py-1`}>
        <div className="flex">
          {MANAGERS.map((m, i) => (
            <button
              key={m.label}
              onClick={() => setActive(i)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                i === active
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="mr-2 rounded px-2 py-1 text-xs text-slate-400 transition hover:bg-slate-700 hover:text-white"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="px-5 py-4">
        <code className="text-sm text-slate-300">
          <span className="select-none text-slate-500">$ </span>
          {MANAGERS[active].command}
        </code>
      </div>
    </div>
  )
}
