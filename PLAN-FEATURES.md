# Feature Implementation Plan: @koshmoney/countries

## Overview

This document outlines the implementation plan for 4 new features requested for the `@koshmoney/countries` package.

## Requested Features

| # | Feature | API Example | Purpose |
|---|---------|-------------|---------|
| 1 | Currency Data | `country.getCurrency('US')` → `{ code: 'USD', symbol: '$', name: 'US Dollar' }` | Replace `income-backend/src/database/constants/all-countries.ts` |
| 2 | Phone Dial Codes | `country.getDialCode('US')` → `'+1'`<br>`country.getDialCodes('US')` → `['+1']` | Support countries with multiple dial codes |
| 3 | Continent/Region | `country.getContinent('US')` → `'North America'`<br>`country.getRegion('FR')` → `'Western Europe'` | Geographic categorization |
| 4 | EU/SEPA Membership | `country.isEU('FR')` → `true`<br>`country.isSEPA('CH')` → `true` | European payment/union checks |

---

## Implementation Order

```
Phase 1: Quick Wins (No data generation changes)
├── Feature 4: EU/SEPA Membership  [Simple Sets, immediate value]
└── Feature 2: Phone Dial Codes    [Static data module]

Phase 2: Data Extensions
├── Feature 1: Currency Data       [Static data module]
└── Feature 3: Continent/Region    [Extend country data via generate.ts]

Phase 3: Integration & Polish
├── Update main exports
├── Documentation
└── Final test coverage
```

---

## Feature 1: Currency Data

### API Design

```typescript
// Primary usage
country.getCurrency('US')     // => { code: 'USD', symbol: '$', name: 'US Dollar' }
country.getCurrencyCode('US') // => 'USD'
country.getCurrencySymbol('US') // => '$'

// Advanced
country.getCurrencies('CU')   // => [{ code: 'CUP', ... }, { code: 'CUC', ... }]
currency.countriesUsingCurrency('EUR') // => ['AT', 'BE', 'DE', 'ES', 'FR', ...]
```

### Type Definitions

```typescript
interface CurrencyInfo {
  code: string;    // ISO 4217 code (e.g., "USD")
  symbol: string;  // Currency symbol (e.g., "$")
  name: string;    // Full name (e.g., "US Dollar")
}
```

### File Structure

```
src/currency/
├── index.ts      # Module exports
├── data.ts       # Currency data keyed by alpha-2
└── lookup.ts     # getCurrency, getCurrencies, countriesUsingCurrency
```

### Data Source

- ISO 4217 official currency codes
- Manual curation for symbols (some currencies have multiple representations)
- ~200 entries covering all 255 countries

### Functions

| Function | Signature | Returns |
|----------|-----------|---------|
| `getCurrency` | `(code: string \| number) => CurrencyInfo \| null` | Primary currency |
| `getCurrencies` | `(code: string \| number) => CurrencyInfo[] \| null` | All currencies |
| `getCurrencyCode` | `(code: string \| number) => string \| null` | Just the code |
| `getCurrencySymbol` | `(code: string \| number) => string \| null` | Just the symbol |
| `getCurrencyName` | `(code: string \| number) => string \| null` | Just the name |
| `usesCurrency` | `(code: string \| number, currencyCode: string) => boolean` | Check specific currency |
| `countriesUsingCurrency` | `(currencyCode: string) => string[]` | All countries using currency |

### Test Cases

- Basic lookup: `getCurrency('US')` returns USD info
- Alpha-3 support: `getCurrency('USA')` works
- Numeric support: `getCurrency(840)` works
- Multi-currency countries: `getCurrencies('CU')` returns multiple
- Eurozone: `countriesUsingCurrency('EUR')` returns 20 countries
- Invalid input: Returns `null`

---

## Feature 2: Phone Dial Codes

### API Design

```typescript
// Primary usage
country.getDialCode('US')   // => '+1'
country.getDialCodes('US')  // => ['+1']

// Advanced
dialCode.countriesByDialCode('+1')  // => ['US', 'CA', 'PR', ...]
dialCode.parseDialCode('+14155551234') // => { dialCode: '+1', countryCodes: ['US', 'CA', ...], nationalNumber: '4155551234' }
```

### Type Definitions

```typescript
interface DialCodeInfo {
  dialCode: string;           // Primary dial code (e.g., "+1")
  dialCodes: string[];        // All dial codes
  countryCode: string;        // Alpha-2 code
  internationalPrefix?: string; // Exit code (e.g., "011" for US)
}
```

### File Structure

```
src/dialCode/
├── index.ts      # Module exports
├── data.ts       # Dial code data + reverse index
└── lookup.ts     # getDialCode, getDialCodes, countriesByDialCode
```

### Data Considerations

- NANP countries share `+1` (US, CA, and 20+ Caribbean/Pacific territories)
- Russia and Kazakhstan share `+7`
- Some territories have different codes than parent countries

### Functions

| Function | Signature | Returns |
|----------|-----------|---------|
| `getDialCode` | `(code: string \| number) => string \| null` | Primary dial code |
| `getDialCodes` | `(code: string \| number) => string[] \| null` | All dial codes |
| `getDialCodeInfo` | `(code: string \| number) => DialCodeInfo \| null` | Full info |
| `countriesByDialCode` | `(dialCode: string) => string[]` | All countries with code |
| `parseDialCode` | `(phoneNumber: string) => {...} \| null` | Parse dial code from number |

### Dependencies

**Recommended: No dependencies** - Static data only for simplicity and tree-shaking.

**Optional enhancement**: Consider `libphonenumber-js` as peer dependency for full phone validation in future.

---

## Feature 3: Continent/Region Data

### API Design

```typescript
// Primary usage
country.getContinent('US')  // => 'North America'
country.getRegion('FR')     // => 'Western Europe'
country.getGeography('DE')  // => { continent: 'Europe', region: 'Western Europe' }

// Advanced
geography.countriesInContinent('Europe') // => ['AL', 'AD', 'AT', ...]
geography.countriesInRegion('Western Europe') // => ['AT', 'BE', 'FR', 'DE', ...]
```

### Type Definitions

```typescript
type Continent =
  | 'Africa' | 'Antarctica' | 'Asia' | 'Europe'
  | 'North America' | 'Oceania' | 'South America';

type Region =
  | 'Northern Africa' | 'Sub-Saharan Africa' | 'Eastern Africa' | 'Middle Africa'
  | 'Southern Africa' | 'Western Africa' | 'Caribbean' | 'Central America'
  | 'Northern America' | 'South America' | 'Central Asia' | 'Eastern Asia'
  | 'South-eastern Asia' | 'Southern Asia' | 'Western Asia' | 'Eastern Europe'
  | 'Northern Europe' | 'Southern Europe' | 'Western Europe'
  | 'Australia and New Zealand' | 'Melanesia' | 'Micronesia' | 'Polynesia';

interface GeographicInfo {
  continent: Continent;
  region: Region;
}
```

### Implementation Approach

**Recommended**: Extend the country data via `scripts/generate.ts`

- Add `continent` and `region` fields to `CountryRecord`
- Generate `continentIndex` and `regionIndex` for reverse lookups
- Integrate into existing country module

### Data Source

- UN M49 standard geographic regions
- 7 continents, 22 subregions

### Functions

| Function | Signature | Returns |
|----------|-----------|---------|
| `getContinent` | `(code: string \| number) => Continent \| null` | Continent name |
| `getRegion` | `(code: string \| number) => Region \| null` | UN M49 region |
| `getGeography` | `(code: string \| number) => GeographicInfo \| null` | Both |
| `countriesInContinent` | `(continent: Continent) => string[]` | All countries |
| `countriesInRegion` | `(region: Region) => string[]` | All countries |

---

## Feature 4: EU/SEPA Membership

### API Design

```typescript
// Primary usage
country.isEU('FR')       // => true
country.isEU('CH')       // => false (Switzerland not in EU)
country.isSEPA('CH')     // => true (Switzerland IS in SEPA)

// Extended checks
country.isEurozone('FR') // => true (uses EUR)
country.isEurozone('SE') // => false (Sweden uses SEK)
country.isSchengen('CH') // => true
country.isEEA('NO')      // => true (Norway in EEA but not EU)

// Advanced
membership.getMembers('EU')      // => ['AT', 'BE', 'BG', ...] (27 countries)
membership.getMembers('SEPA')    // => [...] (36 countries)
membership.getMemberships('FR')  // => { EU: true, SEPA: true, Eurozone: true, Schengen: true, EEA: true }
```

### Type Definitions

```typescript
type MembershipType = 'EU' | 'SEPA' | 'EEA' | 'Eurozone' | 'Schengen';

interface MembershipInfo {
  EU: boolean;
  SEPA: boolean;
  EEA: boolean;
  Eurozone: boolean;
  Schengen: boolean;
}
```

### File Structure

```
src/membership/
├── index.ts      # Module exports
├── data.ts       # Membership Sets (EU_MEMBERS, SEPA_MEMBERS, etc.)
└── lookup.ts     # isEU, isSEPA, getMembers, getMemberships
```

### Data (Current as of 2024)

| Group | Count | Notes |
|-------|-------|-------|
| EU | 27 | Post-Brexit |
| SEPA | 36 | EU + EEA + CH, MC, SM, AD, VA, GB, GI |
| EEA | 30 | EU + IS, LI, NO |
| Eurozone | 20 | EU countries using EUR |
| Schengen | 27 | Mostly EU + IS, NO, CH, LI (minus IE, CY, etc.) |

### Functions

| Function | Signature | Returns |
|----------|-----------|---------|
| `isEU` | `(code: string \| number) => boolean` | EU membership |
| `isSEPA` | `(code: string \| number) => boolean` | SEPA membership |
| `isEEA` | `(code: string \| number) => boolean` | EEA membership |
| `isEurozone` | `(code: string \| number) => boolean` | Uses EUR |
| `isSchengen` | `(code: string \| number) => boolean` | Schengen area |
| `isMember` | `(code: string \| number, type: MembershipType) => boolean` | Generic check |
| `getMembers` | `(type: MembershipType) => string[]` | All members |
| `getMemberships` | `(code: string \| number) => MembershipInfo \| null` | All memberships |

---

## Package.json Export Updates

```json
{
  "exports": {
    ".": { ... },
    "./country": { ... },
    "./subdivision": { ... },
    "./subdivision/*": { ... },
    "./postalCode": { ... },
    "./currency": {
      "import": { "types": "./dist/currency/index.d.ts", "default": "./dist/currency/index.js" },
      "require": { "types": "./dist/currency/index.d.cts", "default": "./dist/currency/index.cjs" }
    },
    "./dialCode": {
      "import": { "types": "./dist/dialCode/index.d.ts", "default": "./dist/dialCode/index.js" },
      "require": { "types": "./dist/dialCode/index.d.cts", "default": "./dist/dialCode/index.cjs" }
    },
    "./membership": {
      "import": { "types": "./dist/membership/index.d.ts", "default": "./dist/membership/index.js" },
      "require": { "types": "./dist/membership/index.d.cts", "default": "./dist/membership/index.cjs" }
    }
  }
}
```

---

## Main Export Integration

```typescript
// src/index.ts additions

import * as currencyModule from './currency';
import * as dialCodeModule from './dialCode';
import * as membershipModule from './membership';

export const country = {
  // ... existing functions

  // Currency (Feature 1)
  getCurrency: currencyModule.getCurrency,
  getCurrencyCode: currencyModule.getCurrencyCode,
  getCurrencySymbol: currencyModule.getCurrencySymbol,

  // Dial codes (Feature 2)
  getDialCode: dialCodeModule.getDialCode,
  getDialCodes: dialCodeModule.getDialCodes,

  // Geography (Feature 3)
  getContinent: countryModule.getContinent,
  getRegion: countryModule.getRegion,

  // Membership (Feature 4)
  isEU: membershipModule.isEU,
  isSEPA: membershipModule.isSEPA,
  isEurozone: membershipModule.isEurozone,
  isSchengen: membershipModule.isSchengen,
  isEEA: membershipModule.isEEA,
};

// New namespaced exports for tree-shaking
export const currency = { ...currencyModule };
export const dialCode = { ...dialCodeModule };
export const membership = { ...membershipModule };
```

---

## Test Files to Create

| File | Coverage |
|------|----------|
| `tests/currency.test.ts` | getCurrency, getCurrencies, countriesUsingCurrency |
| `tests/dialCode.test.ts` | getDialCode, getDialCodes, countriesByDialCode, parseDialCode |
| `tests/geography.test.ts` | getContinent, getRegion, countriesInContinent, countriesInRegion |
| `tests/membership.test.ts` | isEU, isSEPA, isEurozone, isSchengen, getMembers, getMemberships |

---

## Summary

| Feature | New Module | Dependencies | Complexity |
|---------|------------|--------------|------------|
| Currency | `src/currency/` | None | Medium |
| Dial Codes | `src/dialCode/` | None (optional libphonenumber-js) | Medium |
| Continent/Region | Extend `src/country/` | None | Medium |
| EU/SEPA | `src/membership/` | None | Low |

**Total estimated files**: 12 new files + modifications to 5 existing files
