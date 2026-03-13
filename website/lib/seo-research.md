# SEO Research Report

Date: 2026-03-13

## 1. Competitor Package Analysis (npm)

| Package | Weekly Downloads | GitHub Stars | Last Published | License |
|---------|-----------------|--------------|----------------|---------|
| **i18n-iso-countries** | ~1,549,000 | 888 | 1 year ago | MIT |
| **countries-list** | ~455,000 | 1,306 | 8 days ago | MIT |
| **iso-3166-2** | ~302,000 | 115 | 9 years ago | MIT |
| **iso-3166-1** | ~260,000 | 59 | 4 years ago | MIT |
| **country-state-city** | ~228,000 | 308 | 2 years ago | ODbL |

### Key Takeaways

- **i18n-iso-countries** is the dominant player at 1.5M weekly downloads. Its main strength is i18n support (country names in many languages). It does NOT include subdivisions, postal codes, currencies, geography, or memberships.
- **countries-list** is the most actively maintained (updated 8 days ago) and has the most stars. Includes currencies and phone codes but NOT subdivisions or postal codes.
- **iso-3166-2** gets 302K downloads despite being 9 years old and unmaintained -- shows strong organic search demand for subdivision data.
- **country-state-city** includes subdivisions + cities but uses ODbL license (not MIT), unmaintained for 2 years, and ships a large bundle.
- **None** of these packages offer postal code validation, EU/SEPA membership checks, or geography data. This is our unique differentiator.

### Gaps in Competitors

| Feature | i18n-iso-countries | countries-list | country-state-city | @koshmoney/countries |
|---------|-------------------|----------------|-------------------|---------------------|
| i18n country names | Yes (50+ languages) | Yes (native names) | No | No |
| Subdivisions | No | No | Yes | Yes |
| Postal code validation | No | No | No | Yes |
| EU/SEPA/EEA checks | No | No | No | Yes |
| Tree-shaking | No | No | No | Yes |
| Cities | No | No | Yes | No |

**Our main weakness**: No i18n support for country names in other languages. This is the #1 reason i18n-iso-countries dominates.

---

## 2. Search Intent Analysis

### "iso 3166 country codes" (High Volume)

Top-ranking pages are:
1. **ISO.org** official page (authoritative, not competing)
2. **Wikipedia** list of ISO 3166 country codes (informational, massive traffic)
3. **IBAN.com** country code table (simple reference table)
4. **Datahub.io** CSV/JSON datasets

**What they cover that we don't:**
- Downloadable CSV/JSON datasets
- Simple, searchable reference tables on the web
- Historical/formerly-used codes (ISO 3166-3)

**Opportunity:** Our /countries/[code] pages should rank for individual country queries. An interactive lookup tool on the homepage or a dedicated page would capture "country code lookup" searches.

### "react country dropdown" (Medium Volume)

Top results:
1. **react-country-region-selector** docs (dedicated library)
2. **FreeCodeCamp tutorial** on dependent dropdowns (Jan 2025)
3. **shadcn/ui country dropdown** (modern UI component)
4. **react-country-state-dropdown** and **react-country-state-city** (npm packages)

**What they cover:**
- Pre-built React components with flags, search, cascading selects
- Integration with popular UI libraries (Material UI, shadcn, Ant Design)
- Phone number input with country code prefix

**Our angle:** We're not competing on pre-built components. Our guide shows how to build dropdowns using our data library (data layer, not UI layer). This is a complementary positioning. Our guides should link to these UI libraries and show how @koshmoney/countries provides the underlying data.

### "country code converter online" (Medium Volume)

Top tools:
- **countryconverter.com** -- batch alpha-2/alpha-3 converter
- **tracemyip.org** -- batch converter with dedup/sorting
- **planetcalc.com** -- multi-format lookup
- **iban.com** -- reference table
- **countrycode.org** -- phone codes + ISO codes

**Opportunity:** Build an interactive converter tool on our site at `/tools/converter` or similar. These tools rank well and drive organic traffic. A "Country Code Lookup" page with search would capture this intent.

---

## 3. US State / Subdivision-Specific Search Traffic

There are dedicated npm packages just for US states:
- **states-us**: ~52K weekly downloads
- **us-state-codes**: ~25K weekly downloads
- **us-state-converter**: ~20K weekly downloads
- **typed-usa-states**: ~9K weekly downloads

This shows significant demand for country-specific subdivision data. Developers search for "list of US states javascript", "US state codes npm", "Canadian province codes", etc.

**Opportunity:** Our /countries/[code] pages already serve this. We should ensure they rank for queries like:
- "list of US states and codes"
- "Canadian provinces list javascript"
- "German federal states codes"
- "UK regions ISO codes"
- "Indian states list with codes"

Blog posts targeting "[Country] [Subdivision] codes" would capture long-tail traffic.

---

## 4. Developer Questions (Reddit / Stack Overflow)

Common developer questions found through research:

1. **"How do I convert alpha-2 to alpha-3 country codes in JavaScript?"** -- Multiple single-purpose npm packages exist for this (country-iso-2-to-3, country-iso-3-to-2). We solve this with `country.alpha2ToAlpha3()`.

2. **"How to validate ZIP codes by country?"** -- Popular topic with dedicated libraries (postal-codes-js, postcode-validator, validate-zipcodes). We solve this with `postalCode.isValid()`.

3. **"How do I check if a country is in the EU/SEPA zone?"** -- Fintech developers frequently need this. No good npm package existed before ours. The alternatives are hardcoded arrays or manual lists from EPC/ECB websites.

4. **"Country + state cascading dropdown"** -- Very common React question. Our subdivision API directly powers this pattern.

5. **"How to get country dial code from country code?"** -- Common phone input question. Our `dialCode` module covers this.

6. **"jQuery validation for zip or postal code by country"** -- Old question but still relevant. Server-side validation patterns are needed.

---

## 5. Content Gap Analysis

### What We Have

- Homepage with comparison table
- 7 complete API reference pages
- 4 guides (dropdown, validation, tree-shaking, migration)
- 2 framework examples (React, Node.js)
- 80 country pages with subdivision data
- Blog posts (in progress)

### What's Missing (Ranked by SEO Impact)

#### High Impact (should build)

1. **Interactive Country Code Lookup Tool** -- `/tools/lookup`
   - Search by name, alpha-2, alpha-3, numeric
   - Shows all data at once (currency, dial code, geography, memberships, subdivisions)
   - Would rank for "country code lookup", "iso 3166 search", "country code converter"
   - Estimated search volume: 5K-10K/month combined

2. **Interactive Country Code Converter** -- `/tools/converter`
   - Batch convert alpha-2 <-> alpha-3 <-> numeric
   - Paste a list, get results
   - Would rank for "country code converter", "alpha-2 to alpha-3"
   - Estimated search volume: 2K-5K/month

3. **"List of EU Countries" / "List of SEPA Countries" landing pages**
   - Dedicated pages with tables showing all EU/SEPA/EEA/Eurozone/Schengen members
   - SEPA country lists are heavily searched by fintech developers
   - Would rank for "SEPA countries list", "EU country codes"
   - Estimated search volume: 3K-8K/month

4. **"List of Countries by Continent" pages**
   - /countries/continent/europe, /countries/continent/asia, etc.
   - Tables with all countries in each continent/region
   - Would rank for "list of European countries", "Asian country codes"

5. **Country-specific subdivision blog posts**
   - "Complete List of US States and Codes" (huge search volume)
   - "Canadian Province Codes" (already being written)
   - "German Federal States (Bundeslander) Codes"
   - "UK Regions and Country Codes"
   - "Indian States and Union Territories Codes"
   - "Japanese Prefecture Codes"

#### Medium Impact (nice to have)

6. **Postal Code Formats by Country** -- reference page
   - Table showing format, local name, regex pattern for each country
   - Would rank for "postal code format [country]"

7. **"Country Codes Cheatsheet"** -- downloadable PDF/image
   - Quick reference with all 249 countries
   - Link bait for developer blogs

8. **Vue.js and Next.js example pages**
   - Expand framework coverage beyond React
   - "Vue country dropdown", "Next.js country data" have search volume

9. **Phone/Dial Code Reference Page**
   - All countries with their dial codes in a searchable table
   - Would rank for "international dialing codes list"

10. **Currency by Country Reference Page**
    - Searchable table of all countries and their currencies
    - Would rank for "country currency list", "ISO 4217 codes"

#### Lower Impact (future content)

11. i18n guide (how to use with i18n-iso-countries for translated names)
12. "ISO 3166 vs ISO 4217 vs UN M49" explainer
13. Address format guide per country
14. Integration with popular form libraries (React Hook Form, Formik, Zod)

---

## 6. Recommendations Summary

### Immediate Actions (Highest ROI)

1. **Build an interactive lookup/converter tool** -- This is the single highest-impact content piece. Online converter tools rank extremely well and generate consistent organic traffic. Could be a simple client-side React component.

2. **Create EU/SEPA/EEA membership landing pages** -- Fintech developers search for these lists constantly. Dedicated pages with `@koshmoney/countries` code examples would rank well and convert to installs.

3. **Expand country pages** -- The 80 country pages are great. Consider adding currency, dial code, continent/region, and membership data to each page to make them more comprehensive than any competitor page.

### Content Strategy

- **Blog cadence**: Target 2-4 posts/month covering long-tail keywords
- **Focus on intent**: Prioritize "how to" and "list of" content (these convert best)
- **Internal linking**: Every blog post and guide should link to relevant API docs and country pages
- **Schema markup**: Add JSON-LD structured data to country pages (Country schema, Place schema)

### Technical SEO

- Sitemap already includes all pages -- good
- Consider adding `<link rel="canonical">` to prevent duplicate content
- Add Open Graph and Twitter card meta tags for social sharing
- Consider adding JSON-LD structured data for SoftwareApplication (the npm package itself)

---

## Sources

- [NPM Trends Comparison](https://npmtrends.com/countries-list-vs-country-state-city-vs-i18n-iso-countries-vs-iso-3166-1-vs-iso-3166-2)
- [ISO 3166 Official](https://www.iso.org/iso-3166-country-codes.html)
- [IBAN.com Country Codes](https://www.iban.com/country-codes)
- [CountryConverter.com](https://countryconverter.com/)
- [utils.com Country Reference](https://country-details.utils.com/)
- [FreeCodeCamp Dependent Dropdowns](https://www.freecodecamp.org/news/how-to-build-dependent-dropdowns-in-react/)
- [shadcn Country Dropdown](https://shadcn-country-dropdown.vercel.app/)
- [react-country-region-selector](https://country-regions.github.io/react-country-region-selector/)
- [Stripe SEPA Countries](https://stripe.com/resources/more/sepa-country-list)
- [EPC SEPA Countries](https://www.europeanpaymentscouncil.eu/document-library/other/epc-list-sepa-scheme-countries)
- [FormValidation.io ZIP Code](https://formvalidation.io/guide/validators/zip-code/)
- [react-phone-number-input](https://www.npmjs.com/package/react-phone-number-input)
