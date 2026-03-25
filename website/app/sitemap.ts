import type { MetadataRoute } from 'next'

const BASE_URL = 'https://os.koshmoney.com'

const TOP_COUNTRIES = [
  'US', 'GB', 'DE', 'FR', 'CA', 'AU', 'JP', 'IN', 'BR', 'MX',
  'IT', 'ES', 'NL', 'SE', 'NO', 'DK', 'FI', 'CH', 'AT', 'BE',
  'PT', 'PL', 'CZ', 'GR', 'IE', 'NZ', 'SG', 'HK', 'KR', 'TW',
  'TH', 'MY', 'ID', 'PH', 'VN', 'ZA', 'NG', 'KE', 'EG', 'AE',
  'SA', 'IL', 'TR', 'RU', 'UA', 'RO', 'HU', 'BG', 'HR', 'SK',
  'SI', 'LT', 'LV', 'EE', 'IS', 'LU', 'MT', 'CY', 'AR', 'CL',
  'CO', 'PE', 'EC', 'UY', 'PK', 'BD', 'LK', 'NP', 'CN', 'MN',
  'GH', 'TZ', 'UG', 'MA', 'TN', 'JO', 'QA', 'KW', 'BH', 'OM',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/docs/getting-started`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/docs/installation`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    // API Reference
    { url: `${BASE_URL}/docs/api/country`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/docs/api/subdivision`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/docs/api/postal-code`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/docs/api/currency`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/docs/api/dial-code`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/docs/api/geography`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/docs/api/membership`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    // Guides
    { url: `${BASE_URL}/docs/guides/country-dropdown`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/docs/guides/address-validation`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/docs/guides/tree-shaking`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/docs/guides/migration`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    // Examples
    { url: `${BASE_URL}/docs/examples/react`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/docs/examples/nodejs`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    // Tools
    { url: `${BASE_URL}/tools/country-code-converter`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/countries`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    // Guides (missing)
    { url: `${BASE_URL}/docs/guides/postal-code-formats`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    // Use Cases
    { url: `${BASE_URL}/use-cases/fintech`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/use-cases/ecommerce`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/use-cases/crypto`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/use-cases/saas`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    // Compare
    { url: `${BASE_URL}/compare/i18n-iso-countries`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/compare/countries-list`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/compare/country-state-city`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/compare/iso-3166-packages`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]

  // Blog posts
  const blogSlugs = [
    'introducing-koshmoney-countries',
    'iso-3166-country-codes-guide',
    'react-country-dropdown-typescript',
    'us-state-codes-list',
    'canadian-province-codes',
    'eu-country-codes-list',
    'gdpr-eu-countries-developers',
    'tree-shaking-country-data',
    'international-shipping-zones-country-state',
    'best-country-npm-packages-2026',
    'iso-country-codes-kyc-compliance',
    'nodejs-country-code-validation',
    'african-countries-list-codes',
    'asian-countries-list-codes',
    'european-countries-list-codes',
    'south-american-countries-list-codes',
    'sepa-countries-list',
    'north-american-countries-list-codes',
    'oceania-countries-list-codes',
    'eurozone-countries-list',
    'schengen-countries-list',
    'countries-using-us-dollar',
    'countries-using-euro',
    'international-dialing-codes-list',
    'countries-sharing-dial-code',
    'country-code-faq',
    'australian-state-codes-list',
    'indian-state-codes-list',
    'german-state-codes-list',
    'uk-region-codes-list',
    'japanese-prefecture-codes-list',
    'brazilian-state-codes-list',
    'mexican-state-codes-list',
    'french-region-codes-list',
    'italian-region-codes-list',
    'spanish-community-codes-list',
    'uk-country-codes-subdivisions',
    'chinese-province-codes-list',
    'country-code-formats-alpha2-alpha3-numeric',
    'all-249-country-codes-list',
    'south-korean-province-codes-list',
    'phone-country-codes-dial-codes',
    'eu-vs-eurozone-countries',
    'dollar-currencies-worldwide',
    'ofac-sanctioned-countries-developers',
    'stablecoin-supported-countries',
  ]

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const countryPages: MetadataRoute.Sitemap = TOP_COUNTRIES.map((code) => ({
    url: `${BASE_URL}/countries/${code.toLowerCase()}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const subdivisionPages: MetadataRoute.Sitemap = TOP_COUNTRIES.map((code) => ({
    url: `${BASE_URL}/subdivisions/${code.toLowerCase()}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages, ...countryPages, ...subdivisionPages]
}
