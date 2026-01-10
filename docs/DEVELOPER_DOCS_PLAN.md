# Developer Documentation Plan: @koshmoney/countries

## Documentation Philosophy

Following the **Stripe/Twilio documentation model**, our docs should be:
1. **Scannable** - Developers can find what they need in seconds
2. **Copyable** - Every code example works out of the box
3. **Complete** - Every function is documented with examples
4. **Progressive** - From beginner to advanced use cases

---

## Documentation Structure

```
/docs
├── Getting Started
│   ├── Quick Start (5-minute guide)
│   ├── Installation
│   └── Why This Package?
│
├── Core Concepts
│   ├── ISO 3166-1 (Countries)
│   ├── ISO 3166-2 (Subdivisions)
│   ├── Code Formats
│   └── TypeScript Types
│
├── API Reference
│   ├── Country
│   │   ├── Lookup Functions
│   │   ├── Conversion Functions
│   │   └── Validation Functions
│   └── Subdivision
│       ├── Lookup Functions
│       ├── Conversion Functions
│       └── Validation Functions
│
├── Guides
│   ├── Building Country Dropdowns
│   ├── Address Validation
│   ├── Tree-Shaking & Bundle Size
│   ├── Server-Side Rendering
│   └── Migration from Other Packages
│
├── Examples
│   ├── React
│   ├── Next.js
│   ├── Vue
│   ├── Angular
│   └── Node.js
│
└── Reference
    ├── All Countries
    ├── All Subdivisions
    ├── TypeScript Definitions
    └── Changelog
```

---

## 1. Getting Started Section

### 1.1 Quick Start (Most Important Page)

**URL:** `/docs/getting-started`

**Target:** Developers evaluating the package (< 5 minutes to value)

```markdown
# Quick Start

Get up and running with @koshmoney/countries in under 5 minutes.

## Installation

```bash
npm install @koshmoney/countries
```

## Basic Usage

```typescript
import { country, subdivision } from '@koshmoney/countries'

// Lookup a country
const usa = country.whereAlpha2('US')
// → { name: 'United States', alpha2: 'US', alpha3: 'USA', numeric: '840' }

// Get all subdivisions for a country
const states = subdivision.forCountry('US')
// → [{ code: 'US-CA', name: 'California', type: 'State' }, ...]

// Lookup a specific subdivision
const california = subdivision.where('US', 'CA')
// → { code: 'US-CA', name: 'California', type: 'State' }
```

## Common Operations

### Convert Between Formats

```typescript
country.alpha2ToAlpha3('US')     // → 'USA'
country.alpha3ToNumeric('USA')   // → '840'
country.toName('US')             // → 'United States'
```

### Validate Codes

```typescript
country.isAlpha2('US')           // → true
country.isAlpha3('USA')          // → true
country.isValid('US')            // → true (any format)

subdivision.isValidCode('US-CA') // → true
subdivision.isValidRegion('US', 'CA') // → true
```

### Detect Format

```typescript
country.detectFormat('US')       // → 'alpha2'
country.detectFormat('USA')      // → 'alpha3'
country.detectFormat('840')      // → 'numeric'
country.detectFormat('United States') // → 'name'
```

## Next Steps

- [API Reference](/docs/api) - Complete function documentation
- [Tree-Shaking Guide](/docs/guides/tree-shaking) - Optimize bundle size
- [Examples](/docs/examples) - Framework-specific examples
```

**SEO Elements:**
- Title: `Quick Start - @koshmoney/countries Documentation`
- Keywords: `iso 3166 npm tutorial`, `country code javascript getting started`

### 1.2 Installation

**URL:** `/docs/installation`

```markdown
# Installation

## npm

```bash
npm install @koshmoney/countries
```

## yarn

```bash
yarn add @koshmoney/countries
```

## pnpm

```bash
pnpm add @koshmoney/countries
```

## Requirements

- Node.js >= 16.0.0
- TypeScript >= 4.5 (if using TypeScript)

## Module Formats

This package supports both ESM and CommonJS:

```typescript
// ESM (recommended)
import { country, subdivision } from '@koshmoney/countries'

// CommonJS
const { country, subdivision } = require('@koshmoney/countries')
```

## Selective Imports

For smaller bundle sizes, import only what you need:

```typescript
// Countries only (~8KB gzipped)
import { country } from '@koshmoney/countries/country'

// Subdivisions only
import { subdivision } from '@koshmoney/countries/subdivision'

// Specific country subdivisions (~1.5KB each)
import '@koshmoney/countries/subdivision/US'
import '@koshmoney/countries/subdivision/GB'
```

## TypeScript

Full TypeScript support is included. No additional @types package needed.

```typescript
import type { Country, Subdivision } from '@koshmoney/countries'

const usa: Country = country.whereAlpha2('US')!
const california: Subdivision = subdivision.where('US', 'CA')!
```
```

---

## 2. Core Concepts Section

### 2.1 ISO 3166-1 (Countries)

**URL:** `/docs/concepts/iso-3166-1`

```markdown
# ISO 3166-1: Country Codes

ISO 3166-1 is the international standard for country codes. This package supports all three code types.

## Code Types

| Type | Length | Example | Description |
|------|--------|---------|-------------|
| Alpha-2 | 2 letters | `US` | Most commonly used |
| Alpha-3 | 3 letters | `USA` | More readable |
| Numeric | 3 digits | `840` | Language-independent |

## Example: United States

```typescript
import { country } from '@koshmoney/countries'

country.whereAlpha2('US')
// → {
//   name: 'United States',
//   alpha2: 'US',
//   alpha3: 'USA',
//   numeric: '840'
// }
```

## All 249 Countries

This package includes all 249 countries and territories defined in ISO 3166-1:
- 193 UN member states
- 2 UN observer states
- 54 dependent territories and special areas

[View Complete Country List →](/reference/countries)
```

### 2.2 ISO 3166-2 (Subdivisions)

**URL:** `/docs/concepts/iso-3166-2`

```markdown
# ISO 3166-2: Subdivision Codes

ISO 3166-2 defines codes for principal subdivisions (states, provinces, regions) of countries.

## Code Format

Subdivision codes follow the pattern: `{country}-{region}`

| Example | Country | Region |
|---------|---------|--------|
| `US-CA` | US (United States) | CA (California) |
| `GB-ENG` | GB (United Kingdom) | ENG (England) |
| `DE-BY` | DE (Germany) | BY (Bavaria) |
| `JP-13` | JP (Japan) | 13 (Tokyo) |

## Subdivision Types

Different countries have different subdivision types:

| Country | Type | Count |
|---------|------|-------|
| United States | States | 50 (+6 territories) |
| United Kingdom | Countries/Regions | 4 (+regions) |
| Germany | Federal States | 16 |
| Canada | Provinces/Territories | 13 |
| Japan | Prefectures | 47 |
| India | States/Territories | 36 |

## Example Usage

```typescript
import { subdivision } from '@koshmoney/countries'

// Get all subdivisions for a country
subdivision.forCountry('US')
// → [{ code: 'US-AL', name: 'Alabama', type: 'State' }, ...]

// Lookup specific subdivision
subdivision.where('US', 'CA')
// → { code: 'US-CA', name: 'California', type: 'State' }

// By full code
subdivision.whereCode('US-CA')
// → { code: 'US-CA', name: 'California', type: 'State' }
```

## Coverage

This package includes 5,000+ subdivisions across all ISO 3166-2 supported countries.

[View All Subdivisions →](/reference/subdivisions)
```

### 2.3 TypeScript Types

**URL:** `/docs/concepts/typescript`

```markdown
# TypeScript Types

This package is written in TypeScript and exports all types for use in your projects.

## Core Types

### Country

```typescript
import type { Country } from '@koshmoney/countries'

interface Country {
  name: string      // 'United States'
  alpha2: string    // 'US'
  alpha3: string    // 'USA'
  numeric: string   // '840'
}
```

### Subdivision

```typescript
import type { Subdivision } from '@koshmoney/countries'

interface Subdivision {
  code: string      // 'US-CA'
  name: string      // 'California'
  type: string      // 'State'
}
```

### CountryWithSubdivisions

```typescript
import type { CountryWithSubdivisions } from '@koshmoney/countries'

interface CountryWithSubdivisions extends Country {
  subdivisions: Subdivision[]
}
```

### CountryCodeFormat

```typescript
import type { CountryCodeFormat } from '@koshmoney/countries'

type CountryCodeFormat = 'alpha2' | 'alpha3' | 'numeric' | 'name'
```

## Usage Examples

```typescript
import { country, subdivision } from '@koshmoney/countries'
import type { Country, Subdivision } from '@koshmoney/countries'

function getCountryInfo(code: string): Country | null {
  return country.whereAlpha2(code)
}

function getStateList(countryCode: string): Subdivision[] {
  return subdivision.forCountry(countryCode) ?? []
}
```
```

---

## 3. API Reference Section

### Structure

Each API page should include:
1. **Function signature** with types
2. **Parameters** table
3. **Return value** description
4. **Example(s)** - multiple if complex
5. **Edge cases** / error handling
6. **Related functions** links

### 3.1 Country Lookup Functions

**URL:** `/docs/api/country/lookup`

```markdown
# Country Lookup Functions

Functions for finding country information.

## whereAlpha2

Find a country by its ISO 3166-1 Alpha-2 code.

```typescript
function whereAlpha2(code: string): Country | null
```

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| code | string | 2-letter country code (case-insensitive) |

**Returns:** `Country | null`

**Example:**
```typescript
country.whereAlpha2('US')
// → { name: 'United States', alpha2: 'US', alpha3: 'USA', numeric: '840' }

country.whereAlpha2('us') // Case-insensitive
// → { name: 'United States', ... }

country.whereAlpha2('XX') // Invalid code
// → null
```

---

## whereAlpha3

Find a country by its ISO 3166-1 Alpha-3 code.

```typescript
function whereAlpha3(code: string): Country | null
```

**Example:**
```typescript
country.whereAlpha3('USA')
// → { name: 'United States', alpha2: 'US', alpha3: 'USA', numeric: '840' }
```

---

## whereNumeric

Find a country by its ISO 3166-1 Numeric code.

```typescript
function whereNumeric(code: string | number): Country | null
```

**Example:**
```typescript
country.whereNumeric('840')  // String
// → { name: 'United States', ... }

country.whereNumeric(840)    // Number
// → { name: 'United States', ... }
```

---

## whereName

Find a country by its name.

```typescript
function whereName(name: string): Country | null
```

**Example:**
```typescript
country.whereName('United States')
// → { name: 'United States', alpha2: 'US', alpha3: 'USA', numeric: '840' }
```

---

## all

Get all 249 countries.

```typescript
function all(): Country[]
```

**Example:**
```typescript
const countries = country.all()
// → [{ name: 'Afghanistan', ... }, { name: 'Albania', ... }, ...]
console.log(countries.length) // 249
```

---

## withSubdivisions

Get a country with all its subdivisions.

```typescript
function withSubdivisions(code: string): CountryWithSubdivisions | null
```

**Example:**
```typescript
country.withSubdivisions('US')
// → {
//   name: 'United States',
//   alpha2: 'US',
//   alpha3: 'USA',
//   numeric: '840',
//   subdivisions: [
//     { code: 'US-AL', name: 'Alabama', type: 'State' },
//     ...
//   ]
// }
```
```

### 3.2 Country Conversion Functions

**URL:** `/docs/api/country/convert`

```markdown
# Country Conversion Functions

Convert between different country code formats.

## alpha2ToAlpha3

Convert Alpha-2 code to Alpha-3.

```typescript
function alpha2ToAlpha3(code: string): string | null
```

**Example:**
```typescript
country.alpha2ToAlpha3('US')  // → 'USA'
country.alpha2ToAlpha3('GB')  // → 'GBR'
country.alpha2ToAlpha3('XX')  // → null
```

---

## alpha3ToAlpha2

Convert Alpha-3 code to Alpha-2.

```typescript
function alpha3ToAlpha2(code: string): string | null
```

**Example:**
```typescript
country.alpha3ToAlpha2('USA')  // → 'US'
country.alpha3ToAlpha2('GBR')  // → 'GB'
```

---

## alpha2ToNumeric / alpha3ToNumeric

Convert to numeric code.

```typescript
function alpha2ToNumeric(code: string): string | null
function alpha3ToNumeric(code: string): string | null
```

**Example:**
```typescript
country.alpha2ToNumeric('US')   // → '840'
country.alpha3ToNumeric('USA')  // → '840'
```

---

## numericToAlpha2 / numericToAlpha3

Convert from numeric code.

```typescript
function numericToAlpha2(code: string | number): string | null
function numericToAlpha3(code: string | number): string | null
```

**Example:**
```typescript
country.numericToAlpha2(840)    // → 'US'
country.numericToAlpha2('840')  // → 'US'
country.numericToAlpha3(840)    // → 'USA'
```

---

## toName

Get country name from any code format.

```typescript
function toName(code: string | number): string | null
```

**Example:**
```typescript
country.toName('US')   // → 'United States'
country.toName('USA')  // → 'United States'
country.toName(840)    // → 'United States'
```

---

## convert

Generic converter between any formats.

```typescript
function convert(
  code: string | number,
  from: CountryCodeFormat,
  to: CountryCodeFormat
): string | null
```

**Example:**
```typescript
country.convert('US', 'alpha2', 'alpha3')    // → 'USA'
country.convert('USA', 'alpha3', 'numeric')  // → '840'
country.convert(840, 'numeric', 'name')      // → 'United States'
```

---

## detectFormat

Detect the format of a country code.

```typescript
function detectFormat(code: string | number): CountryCodeFormat | null
```

**Example:**
```typescript
country.detectFormat('US')             // → 'alpha2'
country.detectFormat('USA')            // → 'alpha3'
country.detectFormat('840')            // → 'numeric'
country.detectFormat('United States')  // → 'name'
country.detectFormat('invalid')        // → null
```
```

### 3.3 Country Validation Functions

**URL:** `/docs/api/country/validate`

### 3.4 Subdivision Lookup Functions

**URL:** `/docs/api/subdivision/lookup`

### 3.5 Subdivision Conversion Functions

**URL:** `/docs/api/subdivision/convert`

### 3.6 Subdivision Validation Functions

**URL:** `/docs/api/subdivision/validate`

---

## 4. Guides Section

### 4.1 Building Country Dropdowns

**URL:** `/docs/guides/country-dropdown`

**Target Keywords:** `react country dropdown`, `country select component`

```markdown
# Building Country Dropdowns

Learn how to build accessible country and state dropdowns using @koshmoney/countries.

## Basic HTML Select

```typescript
import { country, subdivision } from '@koshmoney/countries'

// Get all countries for dropdown
const countries = country.all()

// Render options
countries.map(c => `<option value="${c.alpha2}">${c.name}</option>`)
```

## React Component

```tsx
import { useState } from 'react'
import { country, subdivision } from '@koshmoney/countries'

function AddressForm() {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedState, setSelectedState] = useState('')

  const countries = country.all()
  const states = selectedCountry
    ? subdivision.forCountry(selectedCountry) ?? []
    : []

  return (
    <form>
      <label>
        Country
        <select
          value={selectedCountry}
          onChange={(e) => {
            setSelectedCountry(e.target.value)
            setSelectedState('') // Reset state when country changes
          }}
        >
          <option value="">Select country</option>
          {countries.map((c) => (
            <option key={c.alpha2} value={c.alpha2}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      {states.length > 0 && (
        <label>
          State/Province
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">Select state</option>
            {states.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
      )}
    </form>
  )
}
```

## Vue Component

```vue
<template>
  <form>
    <select v-model="selectedCountry" @change="selectedState = ''">
      <option value="">Select country</option>
      <option v-for="c in countries" :key="c.alpha2" :value="c.alpha2">
        {{ c.name }}
      </option>
    </select>

    <select v-if="states.length" v-model="selectedState">
      <option value="">Select state</option>
      <option v-for="s in states" :key="s.code" :value="s.code">
        {{ s.name }}
      </option>
    </select>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { country, subdivision } from '@koshmoney/countries'

const selectedCountry = ref('')
const selectedState = ref('')

const countries = country.all()
const states = computed(() =>
  selectedCountry.value
    ? subdivision.forCountry(selectedCountry.value) ?? []
    : []
)
</script>
```

## Accessibility Tips

1. Always include a label for each select
2. Use `aria-required` for required fields
3. Provide clear placeholder text
4. Handle keyboard navigation
```

### 4.2 Address Validation

**URL:** `/docs/guides/address-validation`

**Target Keywords:** `address validation country code`, `validate state code`

### 4.3 Tree-Shaking Guide

**URL:** `/docs/guides/tree-shaking`

**Target Keywords:** `tree shake country data`, `reduce bundle size npm`

```markdown
# Tree-Shaking & Bundle Size Optimization

Minimize your bundle size by importing only what you need.

## Bundle Size Comparison

| Import | Size (gzipped) |
|--------|----------------|
| Full library | ~60KB |
| Countries only | ~8KB |
| Single country subdivisions | ~1.5KB |
| 5 countries' subdivisions | ~10KB |

## Import Strategies

### Strategy 1: Full Library

Best for applications that need all countries and subdivisions.

```typescript
import { country, subdivision } from '@koshmoney/countries'
// ~60KB gzipped
```

### Strategy 2: Countries Only

Best for simple country dropdowns without state selection.

```typescript
import { country } from '@koshmoney/countries/country'
// ~8KB gzipped
```

### Strategy 3: Specific Countries

Best for region-specific applications.

```typescript
import { subdivision } from '@koshmoney/countries/subdivision'

// Register only needed countries
import '@koshmoney/countries/subdivision/US'
import '@koshmoney/countries/subdivision/CA'
import '@koshmoney/countries/subdivision/GB'
// ~4.5KB total
```

### Strategy 4: Dynamic Loading

Best for global applications that lazy-load regions.

```typescript
async function loadCountrySubdivisions(countryCode: string) {
  await import(`@koshmoney/countries/subdivision/${countryCode}`)
  return subdivision.forCountry(countryCode)
}
```

## Measuring Bundle Impact

Use bundlephobia to check package size:
https://bundlephobia.com/package/@koshmoney/countries
```

### 4.4 Migration from Other Packages

**URL:** `/docs/guides/migration`

**Target Keywords:** `migrate from iso-3166-1`, `i18n-iso-countries alternative`

```markdown
# Migration Guide

Migrate to @koshmoney/countries from other packages.

## From iso-3166-1

### Before

```typescript
import * as iso from 'iso-3166-1'

iso.whereAlpha2('US')
// → { country: 'United States', alpha2: 'US', alpha3: 'USA', numeric: '840' }
```

### After

```typescript
import { country } from '@koshmoney/countries'

country.whereAlpha2('US')
// → { name: 'United States', alpha2: 'US', alpha3: 'USA', numeric: '840' }
```

### Key Differences

| Feature | iso-3166-1 | @koshmoney/countries |
|---------|------------|---------------------|
| Property name | `country` | `name` |
| Subdivisions | ❌ | ✅ |
| Tree-shaking | ❌ | ✅ |
| TypeScript | Separate @types | Built-in |

---

## From iso-3166-2

### Before

```typescript
import * as iso from 'iso-3166-2'

iso.subdivision('US-CA')
// → { name: 'California', ... }
```

### After

```typescript
import { subdivision } from '@koshmoney/countries'

subdivision.whereCode('US-CA')
// → { code: 'US-CA', name: 'California', type: 'State' }
```

---

## From i18n-iso-countries

### Before

```typescript
import countries from 'i18n-iso-countries'

countries.getName('US', 'en')        // → 'United States'
countries.getAlpha3Code('US', 'en')  // → 'USA'
countries.isValid('US')              // → true
```

### After

```typescript
import { country } from '@koshmoney/countries'

country.toName('US')                 // → 'United States'
country.alpha2ToAlpha3('US')         // → 'USA'
country.isValid('US')                // → true
```

### Migration Benefits

- **Add subdivisions**: i18n-iso-countries doesn't support subdivisions
- **Smaller bundle**: No locale data you don't need
- **Better TypeScript**: Full type definitions included
```

---

## 5. Examples Section

### 5.1 React Examples

**URL:** `/docs/examples/react`

### 5.2 Next.js Examples

**URL:** `/docs/examples/nextjs`

### 5.3 Vue Examples

**URL:** `/docs/examples/vue`

### 5.4 Node.js Examples

**URL:** `/docs/examples/nodejs`

```markdown
# Node.js Examples

Server-side usage examples for @koshmoney/countries.

## Express.js API Endpoint

```typescript
import express from 'express'
import { country, subdivision } from '@koshmoney/countries'

const app = express()

// Get all countries
app.get('/api/countries', (req, res) => {
  res.json(country.all())
})

// Get subdivisions for a country
app.get('/api/countries/:code/subdivisions', (req, res) => {
  const { code } = req.params
  const subs = subdivision.forCountry(code.toUpperCase())

  if (!subs) {
    return res.status(404).json({ error: 'Country not found' })
  }

  res.json(subs)
})

// Validate address
app.post('/api/validate-address', (req, res) => {
  const { countryCode, stateCode } = req.body

  const errors = []

  if (!country.isValid(countryCode)) {
    errors.push('Invalid country code')
  }

  if (stateCode && !subdivision.isValidRegion(countryCode, stateCode)) {
    errors.push('Invalid state/province code')
  }

  res.json({
    valid: errors.length === 0,
    errors
  })
})
```

## Fastify Example

```typescript
import Fastify from 'fastify'
import { country, subdivision } from '@koshmoney/countries'

const fastify = Fastify()

fastify.get('/countries', async () => {
  return country.all()
})

fastify.get('/countries/:code/subdivisions', async (request, reply) => {
  const { code } = request.params as { code: string }
  const subs = subdivision.forCountry(code.toUpperCase())

  if (!subs) {
    reply.code(404)
    return { error: 'Country not found' }
  }

  return subs
})
```
```

---

## 6. Reference Section

### 6.1 All Countries

**URL:** `/docs/reference/countries`

Searchable, filterable table of all 249 countries.

### 6.2 All Subdivisions

**URL:** `/docs/reference/subdivisions`

Searchable table grouped by country.

### 6.3 TypeScript Definitions

**URL:** `/docs/reference/types`

Complete type definitions with examples.

---

## Documentation SEO Summary

### High-Traffic Target Pages

| Page | Target Keyword | Est. Volume |
|------|---------------|-------------|
| /docs/getting-started | iso 3166 npm | 320 |
| /docs/guides/country-dropdown | react country dropdown | 1,900 |
| /docs/guides/tree-shaking | tree shake npm package | 210 |
| /docs/guides/migration | iso-3166-1 alternative | 140 |
| /docs/api/country/lookup | country code lookup javascript | 260 |
| /docs/api/subdivision/lookup | state code lookup npm | 90 |

### Internal Linking Strategy

Every documentation page should link to:
- **Related API pages** (from concepts → API)
- **Practical guides** (from API → guides)
- **Examples** (from guides → examples)
- **Country/subdivision reference pages** (contextual)

### Documentation Quality Checklist

- [ ] Every function has at least one copy-paste example
- [ ] Every example has been tested and works
- [ ] TypeScript types are shown with explanations
- [ ] Edge cases and error handling documented
- [ ] Related functions cross-linked
- [ ] Search-friendly headings (H2, H3)
- [ ] Code blocks have syntax highlighting
- [ ] Mobile-responsive tables
