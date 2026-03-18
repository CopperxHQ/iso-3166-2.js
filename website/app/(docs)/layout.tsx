import type { Metadata } from 'next'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata: Metadata = {
  title: {
    default: 'Countries by Kosh Money - ISO 3166 Countries & Subdivisions for JavaScript',
    template: '%s | Countries by Kosh Money',
  },
  description:
    'The complete ISO 3166-1 and ISO 3166-2 library. 249 countries, 5,000+ subdivisions, postal codes, currencies, dial codes, geography, and EU/SEPA membership. TypeScript, tree-shakeable, zero dependencies.',
}

const navbar = (
  <Navbar
    logo={<strong>Countries by Kosh Money</strong>}
    projectLink="https://github.com/CopperxHQ/countries"
  />
)

const footer = (
  <Footer>
    <p>MIT {new Date().getFullYear()} Copperx.</p>
  </Footer>
)

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          footer={footer}
          docsRepositoryBase="https://github.com/CopperxHQ/countries/tree/main/website"
          pageMap={await getPageMap()}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
