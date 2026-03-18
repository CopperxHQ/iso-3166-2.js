import type { ReactNode } from 'react'

export function Steps({ children }: { children: ReactNode }) {
  return (
    <div className="steps-container my-8 border-l-2 border-slate-700 pl-8 [counter-reset:step]">
      {children}
    </div>
  )
}
