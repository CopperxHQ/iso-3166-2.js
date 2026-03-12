# SEO Strategy: @koshmoney/countries
## Building the #1 ISO 3166 Countries & Subdivisions npm Package Website

---

## Executive Summary

This document outlines a comprehensive SEO strategy to position `@koshmoney/countries` as **THE** definitive npm package for country and subdivision data. The strategy leverages programmatic SEO, developer-focused content marketing, and technical excellence inspired by Stripe/Twilio documentation standards.

**Target Outcome:** Rank #1 for 500+ keywords related to country codes, ISO 3166, address validation, and geographic data within 6-12 months.

---

## Part 1: Competitive Analysis

### Current Market Landscape

| Package | Weekly Downloads | Key Weakness |
|---------|-----------------|--------------|
| i18n-iso-countries | 1.28M | Countries only, no subdivisions |
| countries-list | ~200K | No unified API, limited TypeScript |
| country-list | 364K | Minimal features, no subdivisions |
| iso-3166-1 | 270K | Countries only, no conversions |
| country-state-city | ~100K | Poor TypeScript, browser limitations |
| iso-3166-2 | ~50K | Subdivisions only, no country data |

### Our Unique Value Proposition (USP)

```
"The only npm package that unifies ISO 3166-1 (countries) and ISO 3166-2
(subdivisions) with full TypeScript support, tree-shaking, and zero dependencies."
```

**Key Differentiators:**
1. **Unified Solution** - One package replaces two+ fragmented libraries
2. **Tree-Shakeable** - Load only what you need (~8KB for countries only)
3. **Per-Country Imports** - `import '@koshmoney/countries/subdivision/US'`
4. **Full TypeScript** - Complete type definitions, zero `any` types
5. **Zero Dependencies** - Completely self-contained
6. **5,000+ Subdivisions** - Most comprehensive subdivision data
7. **Smart Parsing** - Auto-detect code formats (alpha-2, alpha-3, numeric)

---

## Part 2: Website Architecture

### Recommended Tech Stack

- **Framework:** Next.js 14+ (App Router) - SSR for SEO
- **Styling:** Tailwind CSS + shadcn/ui components
- **Hosting:** Vercel (edge functions, analytics)
- **CMS:** MDX for docs, database for programmatic pages
- **Analytics:** Plausible or Fathom (privacy-focused)
- **Search:** Algolia DocSearch or Pagefind

### Site Structure

```
countries.koshmoney.com/
│
├── / (Homepage)
│   └── Hero, features, quick start, social proof
│
├── /docs/ (Documentation Hub)
│   ├── /getting-started
│   ├── /installation
│   ├── /api/
│   │   ├── /country/
│   │   │   ├── /lookup
│   │   │   ├── /convert
│   │   │   └── /validate
│   │   └── /subdivision/
│   │       ├── /lookup
│   │       ├── /convert
│   │       └── /validate
│   ├── /guides/
│   │   ├── /address-validation
│   │   ├── /country-dropdown-react
│   │   ├── /compliance-kyc
│   │   ├── /tree-shaking
│   │   └── /migration
│   └── /examples/
│       ├── /nextjs
│       ├── /react
│       ├── /vue
│       ├── /angular
│       └── /nodejs
│
├── /countries/ (Programmatic SEO - 249 pages)
│   ├── /us (United States)
│   ├── /gb (United Kingdom)
│   ├── /de (Germany)
│   └── ... (all 249 countries)
│
├── /subdivisions/ (Programmatic SEO - 249 country pages)
│   ├── /us (US States)
│   │   ├── Dropdown to specific states
│   │   └── Full list with codes
│   ├── /gb (UK Regions)
│   └── ...
│
├── /tools/ (Interactive Tools)
│   ├── /country-code-converter
│   ├── /subdivision-lookup
│   ├── /code-validator
│   └── /format-detector
│
├── /use-cases/ (Industry Pages)
│   ├── /fintech-banking
│   ├── /ecommerce-shipping
│   ├── /compliance-kyc
│   ├── /stablecoin-crypto
│   └── /saas-localization
│
├── /compare/ (Comparison Pages)
│   ├── /vs-i18n-iso-countries
│   ├── /vs-countries-list
│   ├── /vs-country-state-city
│   └── /vs-iso-3166-1-iso-3166-2
│
├── /blog/ (Content Marketing)
│   └── Technical articles
│
└── /playground (Interactive Demo)
    └── Live code editor with package
```

---

## Part 3: Programmatic SEO Strategy

### 3.1 Country Pages (249 pages)

**URL Pattern:** `/countries/{alpha-2-code}`

**Example:** `/countries/us` - United States

**Page Template:**
```markdown
# United States (US) Country Code

## ISO 3166-1 Codes
- **Alpha-2:** US
- **Alpha-3:** USA
- **Numeric:** 840

## Quick Code Examples
```typescript
import { country } from '@koshmoney/countries'

// Lookup
country.whereAlpha2('US')
// → { name: 'United States', alpha2: 'US', alpha3: 'USA', numeric: '840' }

// Convert
country.alpha2ToAlpha3('US') // → 'USA'
country.toName('US')         // → 'United States'

// Validate
country.isAlpha2('US')       // → true
```

## United States Subdivisions
- 50 States + DC + Territories
- [View all US subdivisions →](/subdivisions/us)

## Common Use Cases
- Address validation for US addresses
- State dropdown for checkout forms
- Tax calculation by state
- Shipping zone identification

## Related Countries
- [Canada (CA)](/countries/ca)
- [Mexico (MX)](/countries/mx)
- [United Kingdom (GB)](/countries/gb)
```

**Target Keywords per page:**
- `{country name} country code`
- `{country name} ISO code`
- `{country name} alpha-2 code`
- `{country name} alpha-3 code`
- `ISO 3166 {country name}`

### 3.2 Subdivision Pages (249+ pages)

**URL Pattern:** `/subdivisions/{country-alpha-2}`

**Example:** `/subdivisions/us` - US States

**Page Template:**
```markdown
# United States Subdivisions (US States)

All 50 US states plus territories with ISO 3166-2 codes.

## Quick Lookup
```typescript
import { subdivision } from '@koshmoney/countries'

subdivision.forCountry('US')
// Returns all 56 US subdivisions

subdivision.where('US', 'CA')
// → { code: 'US-CA', name: 'California', type: 'State' }
```

## All US Subdivisions

| Code | Name | Type |
|------|------|------|
| US-AL | Alabama | State |
| US-AK | Alaska | State |
| US-AZ | Arizona | State |
| US-CA | California | State |
... (full table)

## Bundle Size Optimization
```typescript
// Load only US subdivisions (1.5KB gzipped)
import '@koshmoney/countries/subdivision/US'
```
```

**Target Keywords:**
- `US state codes`
- `ISO 3166-2 US`
- `United States subdivision codes`
- `US state abbreviations ISO`
- `{State name} state code`

### 3.3 Conversion Tool Pages

**URL Pattern:** `/tools/{tool-name}`

**Interactive Tools to Build:**

1. **Country Code Converter** (`/tools/country-code-converter`)
   - Input: Any format (alpha-2, alpha-3, numeric, name)
   - Output: All other formats
   - Keywords: "convert country code", "alpha-2 to alpha-3"

2. **Subdivision Lookup** (`/tools/subdivision-lookup`)
   - Select country → See all subdivisions
   - Keywords: "find state code", "ISO 3166-2 lookup"

3. **Code Validator** (`/tools/code-validator`)
   - Validate any country/subdivision code
   - Keywords: "validate country code", "check ISO code"

4. **Format Detector** (`/tools/format-detector`)
   - Input any code → Detect format
   - Keywords: "identify country code format"

---

## Part 4: Content Strategy

### 4.1 Documentation (High Intent)

**Priority Pages:**

1. **Getting Started** - 5-minute quickstart
2. **API Reference** - Every function documented
3. **TypeScript Guide** - Types and interfaces
4. **Tree-Shaking Guide** - Bundle optimization
5. **Migration Guide** - From iso-3166-1/iso-3166-2

### 4.2 Tutorial Content (Mid Intent)

| Title | Target Keyword | Search Volume Est. |
|-------|---------------|-------------------|
| How to Build a Country Dropdown in React | react country dropdown | 1,900/mo |
| Address Validation with ISO Country Codes | address validation country code | 880/mo |
| Country/State Selector in Next.js | nextjs country select | 720/mo |
| Vue.js Country and Region Dropdown | vue country dropdown | 590/mo |
| Angular Country Picker Component | angular country picker | 480/mo |
| Node.js Country Code Validation | nodejs validate country code | 320/mo |

### 4.3 Use Case Content (Industry-Specific)

**Fintech & Banking:**
- "ISO 3166 Country Codes for KYC Compliance"
- "Building Address Verification for Payment Processing"
- "Country Restrictions in Banking Applications"

**E-commerce & Shipping:**
- "International Shipping Zone Configuration"
- "Tax Calculation by Country and State"
- "Checkout Address Validation Best Practices"

**Crypto & Stablecoin:**
- "Geofencing for Crypto Compliance"
- "OFAC Sanctions Country List Integration"
- "MiCA Compliance: EU Country Identification"

**SaaS & Localization:**
- "Multi-Region SaaS Pricing by Country"
- "User Locale Detection with Country Codes"
- "GDPR: Identifying EU Countries Programmatically"

### 4.4 Comparison Content (Bottom Funnel)

| Article | Target Keyword |
|---------|---------------|
| @koshmoney/countries vs i18n-iso-countries | i18n-iso-countries alternative |
| @koshmoney/countries vs countries-list | countries-list npm |
| @koshmoney/countries vs country-state-city | country-state-city alternative |
| Best Country Code npm Packages in 2025 | best country npm package |
| iso-3166-1 vs iso-3166-2 (Combined Solution) | iso 3166 npm |

### 4.5 Blog Content Calendar

**Month 1: Foundation**
- "Introducing @koshmoney/countries: The Unified ISO 3166 Solution"
- "Why We Built Another Country Code Library"
- "Tree-Shaking Country Data: From 60KB to 8KB"

**Month 2: Tutorials**
- "Building Type-Safe Country Dropdowns in React"
- "Address Validation Patterns in TypeScript"
- "Server-Side Country Detection in Next.js"

**Month 3: Industry Focus**
- "ISO Standards in Fintech: A Developer's Guide"
- "Compliance-Ready Address Forms"
- "Country Codes in Payment Processing"

**Month 4: Advanced**
- "Optimizing Bundle Size with Per-Country Imports"
- "Building a Global Address Validator"
- "Country Code API Design Patterns"

---

## Part 5: Technical SEO Implementation

### 5.1 Core Web Vitals

```
Target Metrics:
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
```

**Implementation:**
- Next.js Static Generation for docs
- Edge caching via Vercel
- Optimized images with next/image
- Code syntax highlighting with lazy loading

### 5.2 Structured Data (Schema.org)

**Homepage:**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "@koshmoney/countries",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Node.js",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "ratingCount": "100"
  }
}
```

**Documentation Pages:**
```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Country Code Conversion API",
  "author": {
    "@type": "Organization",
    "name": "Koshmoney"
  }
}
```

**FAQ Pages:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [...]
}
```

### 5.3 Meta Tags Template

```html
<!-- Country Page Example -->
<title>United States (US) Country Code - ISO 3166-1 | @koshmoney/countries</title>
<meta name="description" content="Get United States ISO country codes: Alpha-2 (US), Alpha-3 (USA), Numeric (840). Includes all 50+ US state codes. TypeScript npm package." />
<meta name="keywords" content="United States country code, US ISO code, USA alpha-3, 840 numeric code" />

<!-- Open Graph -->
<meta property="og:title" content="United States (US) Country Code" />
<meta property="og:description" content="ISO 3166-1 codes for United States: US, USA, 840" />
<meta property="og:image" content="/og/countries/us.png" />
<meta property="og:type" content="website" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="United States (US) Country Code" />
```

### 5.4 Sitemap Strategy

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- High Priority: Core Pages -->
  <url>
    <loc>https://countries.koshmoney.com/</loc>
    <priority>1.0</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://countries.koshmoney.com/docs/getting-started</loc>
    <priority>0.9</priority>
  </url>

  <!-- Medium Priority: Country Pages (249) -->
  <url>
    <loc>https://countries.koshmoney.com/countries/us</loc>
    <priority>0.8</priority>
  </url>

  <!-- Medium Priority: Subdivision Pages (249) -->
  <url>
    <loc>https://countries.koshmoney.com/subdivisions/us</loc>
    <priority>0.7</priority>
  </url>
</urlset>
```

### 5.5 Internal Linking Strategy

```
Homepage
├── → /docs/getting-started (CTA)
├── → /playground (Try it)
├── → /countries/us (Featured country)
└── → /use-cases/fintech-banking (Use case)

Country Page (/countries/us)
├── → /subdivisions/us (Related)
├── → /countries/ca (Nearby countries)
├── → /docs/api/country/lookup (API)
└── → /tools/country-code-converter (Tool)

Documentation Page
├── → Related API pages
├── → Examples using the feature
├── → Relevant country pages
└── → Tools that implement feature
```

---

## Part 6: Keyword Strategy

### 6.1 Primary Keywords (High Priority)

| Keyword | Search Volume | Difficulty | Intent |
|---------|--------------|------------|--------|
| country code npm | 590 | Medium | Transactional |
| iso 3166 npm | 320 | Low | Transactional |
| country list javascript | 480 | Medium | Informational |
| iso country codes | 6,600 | High | Informational |
| country dropdown react | 1,900 | Medium | Transactional |

### 6.2 Long-Tail Keywords (Quick Wins)

| Keyword | Est. Volume | Page to Target |
|---------|-------------|----------------|
| convert alpha-2 to alpha-3 | 90 | /tools/country-code-converter |
| us state codes list | 720 | /subdivisions/us |
| iso 3166-2 us | 140 | /subdivisions/us |
| validate country code javascript | 110 | /docs/api/country/validate |
| typescript country types | 70 | /docs/guides/typescript |
| tree shake country data | 50 | /docs/guides/tree-shaking |

### 6.3 Industry Keywords

| Keyword | Industry | Page |
|---------|----------|------|
| kyc country validation | Fintech | /use-cases/compliance-kyc |
| shipping country codes | E-commerce | /use-cases/ecommerce-shipping |
| ofac country list api | Crypto | /use-cases/stablecoin-crypto |
| gdpr eu countries | SaaS | /use-cases/saas-localization |

---

## Part 7: Link Building Strategy

### 7.1 Developer Community Presence

**Platforms to Target:**
- Dev.to - Publish tutorials
- Hashnode - Technical deep-dives
- Medium - Industry use cases
- Reddit (r/javascript, r/typescript, r/reactjs) - Help threads
- Stack Overflow - Answer country code questions
- Discord (Reactiflux, TypeScript) - Community support

### 7.2 Package Ecosystem

- Add to awesome-nodejs lists
- Submit to JavaScript Weekly
- Get featured on npm package comparison sites
- Contribute to related packages' docs (link back)

### 7.3 GitHub Strategy

- Clear README with badges
- Comprehensive CONTRIBUTING.md
- Issue templates
- Sponsor button
- Star history tracking

### 7.4 Backlink Targets

| Site | Strategy |
|------|----------|
| npmjs.com | Optimized package page |
| bundlephobia.com | Showcase bundle size |
| snyk.io | Security analysis |
| npmtrends.com | Comparison inclusion |
| stackshare.io | Tool listing |

---

## Part 8: Conversion Optimization

### 8.1 Homepage Structure

```
[Hero Section]
- Headline: "The Complete ISO 3166 Library for JavaScript"
- Subheadline: "Countries + Subdivisions. TypeScript. Tree-Shakeable. Zero Dependencies."
- CTA: "npm install @koshmoney/countries"
- Copy button + star count

[Social Proof]
- npm weekly downloads badge
- GitHub stars
- "Used by X companies"

[Code Demo]
- Interactive playground snippet
- Show key features in action

[Features Grid]
- 249 Countries
- 5,000+ Subdivisions
- Full TypeScript
- Tree-Shakeable
- Zero Dependencies
- ESM + CommonJS

[Use Cases]
- Cards for Fintech, E-commerce, Crypto, SaaS

[Comparison Table]
- vs competitors with checkmarks

[Quick Start]
- 3-step installation guide

[Footer CTA]
- "Get Started" button
- GitHub link
```

### 8.2 Documentation CTA Patterns

```markdown
<!-- End of tutorial -->
## Next Steps

- [API Reference →](/docs/api)
- [View Examples →](/docs/examples)
- [Star on GitHub →](https://github.com/CopperxHQ/countries)

<!-- Sidebar -->
📦 npm install @koshmoney/countries
⭐ Star on GitHub
```

---

## Part 9: Analytics & KPIs

### 9.1 Key Metrics to Track

**Traffic:**
- Organic search traffic (by page type)
- Keyword rankings (top 100)
- Impressions in Search Console

**Engagement:**
- Time on documentation pages
- Playground usage
- Tool interactions
- Pages per session

**Conversion:**
- npm install clicks
- GitHub stars from site
- Documentation completion rate

### 9.2 Tools Setup

- Google Search Console (required)
- Plausible Analytics (privacy-focused)
- npm download stats tracking
- GitHub traffic insights

---

## Part 10: Implementation Roadmap

### Phase 1: Foundation (Weeks 1-4)
- [ ] Set up Next.js site with basic structure
- [ ] Create homepage with key messaging
- [ ] Build documentation system (MDX)
- [ ] Implement core technical SEO (meta, sitemap, robots)

### Phase 2: Programmatic Pages (Weeks 5-8)
- [ ] Generate 249 country pages
- [ ] Generate 249 subdivision pages
- [ ] Build interactive tools (converter, validator)
- [ ] Implement structured data

### Phase 3: Content (Weeks 9-12)
- [ ] Write 5 core tutorials
- [ ] Create comparison pages
- [ ] Publish use case pages
- [ ] Launch blog with 4 posts

### Phase 4: Growth (Ongoing)
- [ ] Weekly content publication
- [ ] Community engagement
- [ ] Link building outreach
- [ ] Performance optimization

---

## Part 11: Quick Wins Checklist

### Immediate Actions
- [ ] Optimize npm package page (keywords, README)
- [ ] Add package to bundlephobia
- [ ] Submit to awesome-nodejs lists
- [ ] Create Dev.to announcement post
- [ ] Answer Stack Overflow country code questions
- [ ] Set up Google Search Console

### Week 1 Content
- [ ] Homepage live
- [ ] /docs/getting-started
- [ ] /docs/installation
- [ ] /countries/us (template)
- [ ] /subdivisions/us (template)

---

## Appendix A: Target Keyword List (100+ Keywords)

### Country Code Keywords
- country code npm
- iso 3166 javascript
- country list typescript
- alpha-2 country code
- alpha-3 country code
- numeric country code
- iso country code api
- country code validation
- convert country code

### Subdivision Keywords
- state code npm
- iso 3166-2 javascript
- us state codes
- province codes canada
- region codes europe
- subdivision lookup api

### Framework Keywords
- react country dropdown
- vue country select
- angular country picker
- nextjs country list
- nodejs country validation

### Industry Keywords
- kyc country validation
- fintech iso codes
- ecommerce country dropdown
- shipping zone country codes
- compliance country list
- ofac country codes

### Comparison Keywords
- i18n-iso-countries alternative
- countries-list vs
- best country npm package
- iso-3166-1 vs iso-3166-2
- country-state-city alternative

---

## Appendix B: Competitor Weakness Analysis

| Competitor | Weakness | Our Advantage |
|------------|----------|---------------|
| i18n-iso-countries | No subdivisions | Full ISO 3166-1 + 3166-2 |
| countries-list | Limited API | Rich lookup/convert/validate |
| country-state-city | Poor TypeScript | Full type definitions |
| iso-3166-1 | Countries only | Unified solution |
| iso-3166-2 | Subdivisions only | One package does both |

---

## Appendix C: Programmatic Page Templates

### Country Page Data Structure
```typescript
interface CountryPageData {
  alpha2: string
  alpha3: string
  numeric: string
  name: string
  subdivisionCount: number
  subdivisionType: string // "State", "Province", etc.
  relatedCountries: string[] // alpha2 codes
  useCases: string[]
  codeExamples: CodeExample[]
}
```

### Subdivision Page Data Structure
```typescript
interface SubdivisionPageData {
  countryAlpha2: string
  countryName: string
  subdivisions: Subdivision[]
  subdivisionTypes: string[]
  codeExamples: CodeExample[]
}
```

---

## Sources & References

Research conducted from:
- [npm-compare.com - Package Comparison](https://npm-compare.com/i18n-iso-countries,countries-and-timezones,countries-list,country-list,iso-3166-1,country-data)
- [npmtrends.com - Download Trends](https://npmtrends.com/country-data-vs-country-list-vs-country-state-city-vs-i18n-iso-countries-vs-iso-3166-1-vs-iso-3166-2-vs-react-country-region-selector-vs-us-state-codes-vs-us-states-vs-world-countries)
- [Google Search Central - SEO Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Stripe & Twilio Documentation Strategy](https://devdocs.work/post/stripe-twilio-achieving-growth-through-cutting-edge-documentation)
- [Programmatic SEO Examples - Semrush](https://www.semrush.com/blog/programmatic-seo/)
- [TODO Group - Marketing Open Source](https://todogroup.org/resources/guides/marketing-open-source-projects/)
- [Read the Docs - Technical Docs SEO](https://docs.readthedocs.com/platform/latest/guides/technical-docs-seo-guide.html)

---

*Document Version: 1.0*
*Last Updated: January 2026*
*Package: @koshmoney/countries*
