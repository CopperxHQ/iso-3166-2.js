'use client'

import { useState, useCallback } from 'react'

interface CodeTab {
  label: string
  code: string
  filename?: string
}

interface CodeShowcaseProps {
  tabs: CodeTab[]
  title?: string
}

export function CodeShowcase({ tabs, title }: CodeShowcaseProps) {
  const [activeTab, setActiveTab] = useState(0)
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(tabs[activeTab].code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [tabs, activeTab])

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      {title && (
        <div className="border-b border-slate-200 px-5 py-3 dark:border-slate-800">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
        </div>
      )}

      {/* Tab bar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
        <div className="flex">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2.5 text-xs font-medium transition ${
                i === activeTab
                  ? 'border-b-2 border-sky-400 text-sky-500 dark:text-sky-400'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="mr-3 rounded px-2 py-1 text-xs text-slate-400 transition hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code content */}
      <div className="relative">
        {tabs[activeTab].filename && (
          <div className="px-5 pt-3 text-xs text-slate-400">
            {tabs[activeTab].filename}
          </div>
        )}
        <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-slate-300">
          <code className="text-slate-800 dark:text-slate-200">
            {tabs[activeTab].code}
          </code>
        </pre>
      </div>
    </div>
  )
}
