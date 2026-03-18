import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Countries by Kosh Money - ISO 3166 Countries & Subdivisions for JavaScript',
  description:
    'The complete ISO 3166-1 and ISO 3166-2 library. 249 countries, 5,000+ subdivisions, postal codes, currencies, dial codes, geography, and EU/SEPA membership. TypeScript, tree-shakeable, zero dependencies.',
}

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
