import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { NavItem } from '@/lib/navigation'

export function PrevNext({ prev, next }: { prev: NavItem | null; next: NavItem | null }) {
  if (!prev && !next) return null

  return (
    <dl className="mt-12 flex border-t border-slate-800 pt-6">
      {prev ? (
        <div>
          <dt className="text-sm font-medium text-white">Previous</dt>
          <dd className="mt-1">
            <a
              href={prev.href}
              className="flex items-center gap-1 text-base text-white transition hover:text-sky-500"
            >
              <ArrowLeft className="h-4 w-4" />
              {prev.title}
            </a>
          </dd>
        </div>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <div className="ml-auto text-right">
          <dt className="text-sm font-medium text-white">Next</dt>
          <dd className="mt-1">
            <a
              href={next.href}
              className="flex items-center justify-end gap-1 text-base text-white transition hover:text-sky-500"
            >
              {next.title}
              <ArrowRight className="h-4 w-4" />
            </a>
          </dd>
        </div>
      ) : (
        <div className="flex-1" />
      )}
    </dl>
  )
}
