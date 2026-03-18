import type { ReactNode } from 'react'
import { Info, AlertTriangle, AlertCircle } from 'lucide-react'

const STYLES: Record<string, { border: string; bg: string; icon: ReactNode }> = {
  info: {
    border: 'border-l-sky-500',
    bg: 'bg-sky-500/10',
    icon: <Info className="h-5 w-5 text-sky-500 shrink-0" />,
  },
  warning: {
    border: 'border-l-amber-500',
    bg: 'bg-amber-500/10',
    icon: <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />,
  },
  error: {
    border: 'border-l-red-500',
    bg: 'bg-red-500/10',
    icon: <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />,
  },
  default: {
    border: 'border-l-slate-500',
    bg: 'bg-slate-800/50',
    icon: <Info className="h-5 w-5 text-slate-400 shrink-0" />,
  },
}

export function Callout({
  type = 'default',
  children,
}: {
  type?: string
  children: ReactNode
}) {
  const style = STYLES[type] || STYLES.default

  return (
    <div
      className={`my-6 flex gap-3 rounded-xl border-l-4 ${style.border} ${style.bg} p-4 text-sm leading-relaxed text-slate-300`}
    >
      {style.icon}
      <div>{children}</div>
    </div>
  )
}
