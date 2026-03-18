import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Nav } from '../_components/nav'
import { SiteFooter } from '../_components/site-footer'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Blog | Countries by Kosh Money',
    template: '%s | Countries by Kosh Money',
  },
  description:
    'Guides, references, and tutorials for working with ISO country codes, subdivisions, currencies, and more.',
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-900 text-slate-400 antialiased`}>
        <Nav position="sticky" />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
