# @koshmoney/countries

[![npm version](https://img.shields.io/npm/v/@koshmoney/countries.svg)](https://www.npmjs.com/package/@koshmoney/countries)
[![npm downloads](https://img.shields.io/npm/dm/@koshmoney/countries.svg)](https://www.npmjs.com/package/@koshmoney/countries)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Complete ISO 3166-1 (countries) and ISO 3166-2 (subdivisions) lookup library with full TypeScript support.

## Features

- **Full ISO 3166-1 support**: alpha-2, alpha-3, numeric codes, and country names
- **Full ISO 3166-2 support**: 5000+ subdivisions (states, provinces, regions, etc.)
- **Code conversion utilities**: Convert between alpha-2, alpha-3, and numeric formats
- **Validation functions**: Validate any country or subdivision code
- **True tree-shaking**: Import only the countries you need
- **Zero dependencies**: Lightweight and self-contained
- **Full TypeScript support**: Complete type definitions included
- **Dual module format**: ESM and CommonJS exports

## Installation

```bash
npm install @koshmoney/countries
```

```bash
yarn add @koshmoney/countries
```

```bash
pnpm add @koshmoney/countries
```

## Quick Start

```typescript
import { country, subdivision } from '@koshmoney/countries';

// Country lookups
country.whereAlpha2('US');
// { name: 'United States', alpha2: 'US', alpha3: 'USA', numeric: '840' }

country.whereAlpha3('GBR');
// { name: 'United Kingdom', alpha2: 'GB', alpha3: 'GBR', numeric: '826' }

country.whereNumeric(276);
// { name: 'Germany', alpha2: 'DE', alpha3: 'DEU', numeric: '276' }

// Subdivision lookups
subdivision.whereCode('US-CA');
// { code: 'US-CA', name: 'California', type: 'State', countryCode: 'US', countryName: 'United States', regionCode: 'CA' }

subdivision.where('GB', 'ENG');
// { code: 'GB-ENG', name: 'England', type: 'Country', ... }

subdivision.whereName('DE', 'Berlin');
// { code: 'DE-BE', name: 'Berlin', ... }
```

## Usage

### Country Functions

```typescript
import { country } from '@koshmoney/countries';

// Lookups
country.whereAlpha2('US');           // By alpha-2 code
country.whereAlpha3('USA');          // By alpha-3 code
country.whereNumeric(840);           // By numeric code
country.whereName('United States');  // By name
country.all();                       // Get all countries
country.withSubdivisions('US');      // Country with all subdivisions

// Conversions
country.alpha2ToAlpha3('US');        // 'USA'
country.alpha3ToAlpha2('USA');       // 'US'
country.alpha2ToNumeric('US');       // '840'
country.numericToAlpha2(840);        // 'US'
country.toName('USA');               // 'United States'

// Validation
country.isAlpha2('US');              // true
country.isAlpha3('USA');             // true
country.isNumeric(840);              // true
country.isValid('US');               // true (any format)
country.detectFormat('USA');         // 'alpha3'
```

### Subdivision Functions

```typescript
import { subdivision } from '@koshmoney/countries';

// Lookups
subdivision.whereCode('US-CA');              // By full code
subdivision.where('US', 'CA');               // By country + region code
subdivision.whereName('US', 'California');   // By country + name
subdivision.forCountry('US');                // All subdivisions for a country
subdivision.all();                           // All subdivisions

// Conversions
subdivision.toRegionCode('US-CA');           // 'CA'
subdivision.toFullCode('US', 'CA');          // 'US-CA'
subdivision.toName('US-CA');                 // 'California'
subdivision.toCountryCode('US-CA');          // 'US'

// Validation
subdivision.isValidCode('US-CA');            // true
subdivision.isValidRegion('US', 'CA');       // true
subdivision.isValidName('US', 'California'); // true
subdivision.hasSubdivisions('US');           // true
```

### Direct Imports (Tree-Shakeable)

```typescript
// Country functions
import {
  whereAlpha2,
  whereAlpha3,
  whereNumeric,
  alpha2ToAlpha3,
  alpha3ToAlpha2,
  isAlpha2,
  isAlpha3,
  isValid,
} from '@koshmoney/countries/country';

// Subdivision functions
import {
  whereCode,
  where,
  whereName,
  forCountry,
  isValidCode,
  hasSubdivisions,
} from '@koshmoney/countries/subdivision';
```

## Tree-Shaking

This library supports true tree-shaking via subpath exports:

### Full Library

```typescript
import { country, subdivision } from '@koshmoney/countries';
```

### Country Only

```typescript
import { whereAlpha2, alpha2ToAlpha3 } from '@koshmoney/countries/country';
```

### Specific Countries Only

```typescript
import { whereAlpha2 } from '@koshmoney/countries/country';
import '@koshmoney/countries/subdivision/US';  // Only US subdivisions
import '@koshmoney/countries/subdivision/CA';  // Only Canada subdivisions
import { whereCode } from '@koshmoney/countries/subdivision';

whereCode('US-CA');  // Works
whereCode('GB-ENG'); // Returns null (GB not imported)
```

See [Tree-Shaking Guide](./docs/TREE_SHAKING.md) for more details.

## Handling Invalid Inputs

All lookup functions return `null` for invalid inputs:

```typescript
import { country, subdivision } from '@koshmoney/countries';

// Invalid country codes
country.whereAlpha2('XX');        // null
country.whereAlpha3('ZZZ');       // null
country.whereNumeric(999);        // null
country.whereName('Narnia');      // null

// Invalid subdivisions
subdivision.whereCode('XX-YY');   // null
subdivision.whereCode('US-XX');   // null
subdivision.where('XX', 'CA');    // null

// Check if country has subdivisions
subdivision.hasSubdivisions('US');  // true
subdivision.hasSubdivisions('XX');  // false

// Validation
country.isValid('XX');              // false
subdivision.isValidCode('XX-YY');   // false
```

## Supported Countries

Examples of supported countries and their subdivisions:

| Country | Code | Subdivisions |
|---------|------|--------------|
| United States | US | 50 states + territories (US-CA, US-NY, US-TX, ...) |
| United Kingdom | GB | 4 countries + regions (GB-ENG, GB-SCT, GB-WLS, GB-NIR, ...) |
| Germany | DE | 16 federal states (DE-BY, DE-BE, DE-HH, ...) |
| Japan | JP | 47 prefectures (JP-13, JP-27, JP-01, ...) |
| India | IN | 28 states + 8 territories (IN-MH, IN-DL, IN-KA, ...) |
| Canada | CA | 13 provinces/territories (CA-ON, CA-BC, CA-QC, ...) |
| Australia | AU | 8 states/territories (AU-NSW, AU-VIC, AU-QLD, ...) |
| France | FR | 18 regions (FR-IDF, FR-PAC, FR-ARA, ...) |
| ... | ... | 5000+ total subdivisions |

## Types

```typescript
interface Country {
  name: string;      // "United States"
  alpha2: string;    // "US"
  alpha3: string;    // "USA"
  numeric: string;   // "840"
}

interface Subdivision {
  code: string;        // "US-CA"
  name: string;        // "California"
  type: string;        // "State"
  countryCode: string; // "US"
  countryName: string; // "United States"
  regionCode: string;  // "CA"
}

interface CountryWithSubdivisions extends Country {
  subdivisions: Subdivision[];
}
```

## API Reference

See [API Documentation](./docs/API.md) for complete API reference.

## Migration

Migrating from `iso-3166-1` or `iso-3166-2`? See [Migration Guide](./docs/MIGRATION.md).

## Data Sources

- [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1): Country codes (alpha-2, alpha-3, numeric)
- [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2): Subdivision codes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
