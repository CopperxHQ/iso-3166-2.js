# Migration Guide

This guide helps you migrate from `iso-3166-1` or `iso-3166-2` to the unified `iso-3166` library.

## From iso-3166-1

### Installation

```bash
# Remove old package
npm uninstall iso-3166-1

# Install new package
npm install iso-3166
```

### Code Changes

#### Before (iso-3166-1)

```typescript
import * as iso from 'iso-3166-1';

iso.whereAlpha2('US');
iso.whereAlpha3('USA');
iso.whereNumeric('840');
iso.whereCountry('UNITED STATES');
iso.all();
```

#### After (iso-3166)

```typescript
import { country } from 'iso-3166';

country.whereAlpha2('US');
country.whereAlpha3('USA');
country.whereNumeric('840');
country.whereName('United States');  // Changed from whereCountry
country.all();
```

### Key Differences

| iso-3166-1 | iso-3166 | Notes |
|------------|----------|-------|
| `whereCountry()` | `whereName()` | Renamed for clarity |
| Returns `undefined` | Returns `null` | For not found |
| `country` property | `name` property | In Country object |
| Direct import | `country.*` namespace | Namespaced API |

### Return Type Changes

**iso-3166-1:**
```typescript
interface Country {
  country: string;  // "Norway"
  alpha2: string;
  alpha3: string;
  numeric: string;
}
```

**iso-3166:**
```typescript
interface Country {
  name: string;     // "Norway" (renamed from country)
  alpha2: string;
  alpha3: string;
  numeric: string;
}
```

### Direct Import (Tree-Shakeable)

If you want to minimize bundle size:

```typescript
// Before
import * as iso from 'iso-3166-1';
iso.whereAlpha2('US');

// After (tree-shakeable)
import { whereAlpha2 } from 'iso-3166/country';
whereAlpha2('US');
```

---

## From iso-3166-2

### Installation

```bash
# Remove old package
npm uninstall iso-3166-2

# Install new package
npm install iso-3166
```

### Code Changes

#### Before (iso-3166-2)

```typescript
import * as iso3166 from 'iso-3166-2';

// Subdivision lookups
iso3166.subdivision('US-CA');
iso3166.subdivision('US', 'CA');
iso3166.subdivision('US', 'California');

// Country lookup
iso3166.country('US');

// Raw data
iso3166.data;
iso3166.codes;
```

#### After (iso-3166)

```typescript
import { country, subdivision } from 'iso-3166';

// Subdivision lookups
subdivision.whereCode('US-CA');
subdivision.where('US', 'CA');
subdivision.whereName('US', 'California');

// Country with subdivisions
country.withSubdivisions('US');

// Raw data
import { countries, alpha3Index } from 'iso-3166';
```

### Key Differences

| iso-3166-2 | iso-3166 | Notes |
|------------|----------|-------|
| `subdivision(code)` | `subdivision.whereCode(code)` | More explicit |
| `subdivision(a, b)` | `subdivision.where(a, b)` or `subdivision.whereName(a, b)` | Separate functions |
| `country(code)` | `country.withSubdivisions(code)` | Returns subdivisions too |
| Returns `{}` | Returns `null` | For not found |
| `data` | `countries` | Renamed export |
| `codes` | `alpha3Index` | Use conversion functions instead |

### Return Type Changes

**iso-3166-2 Subdivision:**
```typescript
{
  type: 'State',
  name: 'California',
  countryName: 'United States',
  countryCode: 'US',
  regionCode: 'CA',
  code: 'US-CA'
}
```

**iso-3166 Subdivision:**
```typescript
{
  code: 'US-CA',        // Moved to top
  name: 'California',
  type: 'State',
  countryCode: 'US',
  countryName: 'United States',
  regionCode: 'CA'
}
```

The properties are the same, just reordered for consistency.

### Handling Overloaded Functions

The old `subdivision()` function was overloaded. In iso-3166, these are separate functions:

```typescript
// Before: One function, multiple signatures
iso3166.subdivision('US-CA');           // by code
iso3166.subdivision('US', 'CA');        // by country + region
iso3166.subdivision('US', 'California'); // by country + name

// After: Explicit functions
subdivision.whereCode('US-CA');
subdivision.where('US', 'CA');
subdivision.whereName('US', 'California');
```

### Alpha-3 to Alpha-2 Conversion

**Before:**
```typescript
const alpha2 = iso3166.codes['USA']; // 'US'
```

**After:**
```typescript
import { country } from 'iso-3166';
const alpha2 = country.alpha3ToAlpha2('USA'); // 'US'
```

---

## New Features

The new library includes features not available in the previous libraries:

### Code Conversions

```typescript
import { country } from 'iso-3166';

country.alpha2ToAlpha3('US');     // 'USA'
country.alpha3ToAlpha2('USA');    // 'US'
country.alpha2ToNumeric('US');    // '840'
country.numericToAlpha2(840);     // 'US'
country.toName('USA');            // 'United States'
```

### Validation

```typescript
import { country, subdivision } from 'iso-3166';

// Country validation
country.isAlpha2('US');           // true
country.isAlpha3('USA');          // true
country.isNumeric(840);           // true
country.isValid('US');            // true (any format)
country.detectFormat('USA');      // 'alpha3'

// Subdivision validation
subdivision.isValidCode('US-CA');            // true
subdivision.isValidRegion('US', 'CA');       // true
subdivision.isValidName('US', 'California'); // true
```

### Tree-Shakeable Imports

```typescript
// Import only country data (~8KB instead of ~60KB)
import { whereAlpha2 } from 'iso-3166/country';

// Import specific country subdivisions
import 'iso-3166/subdivision/US';
import { whereCode } from 'iso-3166/subdivision';
```

### TypeScript Support

Full TypeScript support with exported types:

```typescript
import type { Country, Subdivision, CountryWithSubdivisions } from 'iso-3166';
```

---

## Compatibility Wrapper

If you need to maintain backward compatibility during migration, you can create a wrapper:

```typescript
// compat.ts - Wrapper for iso-3166-2 compatibility
import { country, subdivision } from 'iso-3166';

export const iso3166 = {
  subdivision: (codeOrCountry: string, regionOrName?: string) => {
    if (regionOrName === undefined) {
      return subdivision.whereCode(codeOrCountry);
    }
    // Try region code first, then name
    return subdivision.where(codeOrCountry, regionOrName) ||
           subdivision.whereName(codeOrCountry, regionOrName);
  },

  country: (code: string) => {
    return country.withSubdivisions(code);
  },

  get data() {
    // Return data in legacy format
    const result: Record<string, any> = {};
    for (const c of country.all()) {
      const withSubs = country.withSubdivisions(c.alpha2);
      if (withSubs) {
        result[c.alpha2] = {
          name: c.name,
          sub: withSubs.subdivisions,
        };
      }
    }
    return result;
  },

  get codes() {
    // Return alpha3 -> alpha2 mapping
    const result: Record<string, string> = {};
    for (const c of country.all()) {
      if (c.alpha3) {
        result[c.alpha3] = c.alpha2;
      }
    }
    return result;
  },
};
```

Then gradually migrate your code from `iso3166.*` to the new API.
