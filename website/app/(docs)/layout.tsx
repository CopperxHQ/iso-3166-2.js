import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Nav } from '../_components/nav'
import { SiteFooter } from '../_components/site-footer'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Countries by Kosh Money - ISO 3166 Countries & Subdivisions for JavaScript',
    template: '%s | Countries by Kosh Money',
  },
  description:
    'The complete ISO 3166-1 and ISO 3166-2 library. 249 countries, 5,000+ subdivisions, postal codes, currencies, dial codes, geography, and EU/SEPA membership. TypeScript, tree-shakeable, zero dependencies.',
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
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
