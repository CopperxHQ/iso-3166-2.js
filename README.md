# iso-3166

Complete ISO 3166-1 (countries) and ISO 3166-2 (subdivisions) lookup library with full TypeScript support.

## Features

- **Full ISO 3166-1 support**: alpha-2, alpha-3, numeric codes, and country names
- **Full ISO 3166-2 support**: 5000+ subdivisions (states, provinces, counties, etc.)
- **Code conversion utilities**: Convert between alpha-2, alpha-3, and numeric formats
- **Validation functions**: Validate any country or subdivision code
- **True tree-shaking**: Import only the countries you need
- **Zero dependencies**: Lightweight and self-contained
- **Full TypeScript support**: Complete type definitions included
- **Dual module format**: ESM and CommonJS exports

## Installation

```bash
npm install iso-3166
```

## Quick Start

```typescript
import { country, subdivision } from 'iso-3166';

// Country lookups
country.whereAlpha2('US');
// { name: 'United States', alpha2: 'US', alpha3: 'USA', numeric: '840' }

country.whereAlpha3('SWE');
// { name: 'Sweden', alpha2: 'SE', alpha3: 'SWE', numeric: '752' }

country.whereNumeric(840);
// { name: 'United States', alpha2: 'US', alpha3: 'USA', numeric: '840' }

// Subdivision lookups
subdivision.whereCode('US-CA');
// { code: 'US-CA', name: 'California', type: 'State', countryCode: 'US', countryName: 'United States', regionCode: 'CA' }

subdivision.where('SE', 'O');
// { code: 'SE-O', name: 'Västra Götalands län', type: 'County', ... }

subdivision.whereName('US', 'California');
// { code: 'US-CA', name: 'California', ... }
```

## Usage

### Country Functions

```typescript
import { country } from 'iso-3166';

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
import { subdivision } from 'iso-3166';

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

## Tree-Shaking

This library supports true tree-shaking via subpath exports:

### Full Library (~60KB gzipped)

```typescript
import { country, subdivision } from 'iso-3166';
```

### Country Only (~8KB gzipped)

```typescript
import { whereAlpha2, alpha2ToAlpha3 } from 'iso-3166/country';
```

### Specific Countries Only

```typescript
import { whereAlpha2 } from 'iso-3166/country';
import 'iso-3166/subdivision/US';  // Only US subdivisions
import 'iso-3166/subdivision/CA';  // Only Canada subdivisions
import { whereCode } from 'iso-3166/subdivision';

whereCode('US-CA');  // Works
whereCode('GB-ENG'); // Returns null (GB not imported)
```

See [Tree-Shaking Guide](./docs/TREE_SHAKING.md) for more details.

## API Reference

See [API Documentation](./docs/API.md) for complete API reference.

## Migration

Migrating from `iso-3166-1` or `iso-3166-2`? See [Migration Guide](./docs/MIGRATION.md).

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
```

## Data Sources

- ISO 3166-1: Country codes and names
- ISO 3166-2: Subdivision codes and names

## License

MIT
