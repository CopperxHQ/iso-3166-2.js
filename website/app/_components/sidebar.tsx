'use client'

import { useState } from 'react'
import type { NavItem } from '@/lib/navigation'

function SidebarLink({ href, title, isActive }: { href: string; title: string; isActive: boolean }) {
  return (
    <li className="relative">
      <a
        href={href}
        className={`block border-l-2 py-1 pl-4 text-sm transition ${
          isActive
            ? 'border-transparent font-semibold text-sky-500'
            : 'border-[#1d293d] text-slate-400 hover:text-slate-200'
        }`}
      >
        {isActive && (
          <span className="absolute left-[-3px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-sky-500" />
        )}
        {title}
      </a>
    </li>
  )
}

function SidebarSection({
  item,
  currentPath,
}: {
  item: NavItem
  currentPath: string
}) {
  if (item.hidden) return null

  const hasChildren = item.children && item.children.length > 0

  if (!hasChildren) {
    const isActive = currentPath === item.href
    return <SidebarLink href={item.href!} title={item.title} isActive={isActive} />
  }

  return (
    <li>
      <h3 className="mb-2 text-sm font-medium text-white">{item.title}</h3>
      <ul className="space-y-0">
        {item.children!.filter((c) => !c.hidden).map((child) => {
          if (child.children && child.children.length > 0) {
            return <SidebarSection key={child.href} item={child} currentPath={currentPath} />
          }
          const isActive = currentPath === child.href
          return <SidebarLink key={child.href} href={child.href!} title={child.title} isActive={isActive} />
        })}
      </ul>
    </li>
  )
}

export function Sidebar({
  items,
  currentPath,
}: {
  items: NavItem[]
  currentPath: string
}) {
  if (items.length === 0) return null

  return (
    <aside className="hidden w-[280px] shrink-0 lg:block">
      <div className="sticky top-[76px] max-h-[calc(100vh-76px)] overflow-y-auto py-8 pr-4">
        <nav>
          <ul className="space-y-6">
            {items.map((item) => (
              <SidebarSection key={item.href} item={item} currentPath={currentPath} />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
