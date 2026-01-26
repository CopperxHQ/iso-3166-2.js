# @koshmoney/countries

[![npm version](https://img.shields.io/npm/v/@koshmoney/countries.svg)](https://www.npmjs.com/package/@koshmoney/countries)
[![npm downloads](https://img.shields.io/npm/dm/@koshmoney/countries.svg)](https://www.npmjs.com/package/@koshmoney/countries)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Complete ISO 3166-1 (countries) and ISO 3166-2 (subdivisions) lookup library with full TypeScript support.

## Features

- **Full ISO 3166-1 support**: alpha-2, alpha-3, numeric codes, and country names
- **Full ISO 3166-2 support**: 5000+ subdivisions (states, provinces, regions, etc.)
- **Postal code validation**: Validate ZIP codes, PIN codes, postcodes for 150+ countries
- **Currency data**: Get currency code, symbol, and name for any country
- **Phone dial codes**: Get international dialing codes (powered by libphonenumber-js)
- **Geography data**: Continent and region classification (UN M49 standard)
- **Membership checks**: EU, SEPA, EEA, Eurozone, and Schengen membership
- **Code conversion utilities**: Convert between alpha-2, alpha-3, and numeric formats
- **Validation functions**: Validate any country or subdivision code
- **True tree-shaking**: Import only the modules you need
- **Minimal dependencies**: Core modules are dependency-free; dial codes use libphonenumber-js
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
import { country, subdivision, postalCode } from '@koshmoney/countries';

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

// Postal code validation
postalCode.isValid('US', '90210');     // true
postalCode.isValid('GB', 'SW1A 1AA');  // true
postalCode.getName('US');              // 'ZIP Code'
postalCode.getName('IN');              // 'PIN Code'

// Currency data
import { currency } from '@koshmoney/countries/currency';
currency.getCurrency('US');
// { code: 'USD', symbol: '$', name: 'US Dollar' }

// Phone dial codes
import { dialCode } from '@koshmoney/countries/dialCode';
dialCode.getDialCode('US');            // '+1'
dialCode.getDialCode('GB');            // '+44'

// Geography (continent/region)
import { geography } from '@koshmoney/countries/geography';
geography.getContinent('US');          // 'North America'
geography.getRegion('JP');             // 'Eastern Asia'

// EU/SEPA membership
import { membership } from '@koshmoney/countries/membership';
membership.isEU('FR');                 // true
membership.isSEPA('CH');               // true
membership.isEurozone('DE');           // true
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

### Postal Code Validation

Validate postal codes, ZIP codes, PIN codes, and similar address codes worldwide.

```typescript
import { postalCode } from '@koshmoney/countries';

// Or use regional aliases (all equivalent)
import { zipCode } from '@koshmoney/countries';   // US terminology
import { pinCode } from '@koshmoney/countries';   // India terminology
import { postcode } from '@koshmoney/countries';  // UK/AU terminology

// Validation (lenient - accepts common variations)
postalCode.isValid('US', '90210');           // true
postalCode.isValid('US', '90210-1234');      // true (ZIP+4)
postalCode.isValid('GB', 'SW1A 1AA');        // true
postalCode.isValid('GB', 'sw1a1aa');         // true (case-insensitive, no space)
postalCode.isValid('IN', '110001');          // true
postalCode.isValid('CA', 'K1A 0B1');         // true
postalCode.isValid('DE', '10115');           // true
postalCode.isValid('JP', '100-0001');        // true

// Get local terminology
postalCode.getName('US');  // 'ZIP Code'
postalCode.getName('IN');  // 'PIN Code'
postalCode.getName('GB');  // 'Postcode'
postalCode.getName('DE');  // 'PLZ'
postalCode.getName('BR');  // 'CEP'
postalCode.getName('JP');  // '郵便番号'
postalCode.getName('KR');  // '우편번호'

// Check if country uses postal codes
postalCode.hasPostalCode('US');    // true
postalCode.hasPostalCode('HK');    // false (Hong Kong has no postal codes)
postalCode.hasPostalCode('AE');    // false (UAE has no postal codes)

// Get format information
postalCode.getFormat('US');        // 'NNNNN or NNNNN-NNNN'
postalCode.getFormat('GB');        // 'AA9A 9AA'
postalCode.getFormat('CA');        // 'A1A 1A1'
postalCode.getPattern('US');       // /^\d{5}(-\d{4})?$/

// Also available via country namespace
country.isValidPostalCode('US', '90210');
country.hasPostalCode('US');
country.getPostalCodeName('US');
```

### Currency Functions

Get currency information for any country.

```typescript
import { currency } from '@koshmoney/countries/currency';

// Get full currency info
currency.getCurrency('US');
// { code: 'USD', symbol: '$', name: 'US Dollar' }

currency.getCurrency('JP');
// { code: 'JPY', symbol: '¥', name: 'Japanese Yen' }

currency.getCurrency('GB');
// { code: 'GBP', symbol: '£', name: 'British Pound' }

// Individual lookups
currency.getCurrencyCode('DE');        // 'EUR'
currency.getCurrencySymbol('IN');      // '₹'
currency.getCurrencyName('BR');        // 'Brazilian Real'

// Check if country uses a specific currency
currency.usesCurrency('FR', 'EUR');    // true
currency.usesCurrency('GB', 'EUR');    // false

// Reverse lookup - get all countries using a currency
currency.countriesUsingCurrency('EUR');
// ['AD', 'AT', 'BE', 'CY', 'DE', 'EE', 'ES', 'FI', 'FR', ...]
currency.getCountriesByCurrency('EUR'); // alias for countriesUsingCurrency
```

### Dial Code Functions

Get international dialing codes (powered by libphonenumber-js).

```typescript
import { dialCode } from '@koshmoney/countries/dialCode';

// Get dial code
dialCode.getDialCode('US');            // '+1'
dialCode.getDialCode('GB');            // '+44'
dialCode.getDialCode('FR');            // '+33'
dialCode.getDialCode('JP');            // '+81'

// Get full dial code info
dialCode.getDialCodeInfo('US');
// { dialCode: '+1', countryCode: 'US' }

// Validation
dialCode.isValidPhoneCountry('US');    // true
dialCode.isValidPhoneCountry('XX');    // false

// Get all supported countries
dialCode.getSupportedCountries();      // ['AC', 'AD', 'AE', ...]
```

### Geography Functions

Get continent and region data (UN M49 classification).

```typescript
import { geography } from '@koshmoney/countries/geography';

// Get continent
geography.getContinent('US');          // 'North America'
geography.getContinent('JP');          // 'Asia'
geography.getContinent('DE');          // 'Europe'
geography.getContinent('AU');          // 'Oceania'

// Get region (UN M49 subregion)
geography.getRegion('US');             // 'Northern America'
geography.getRegion('JP');             // 'Eastern Asia'
geography.getRegion('DE');             // 'Western Europe'
geography.getRegion('BR');             // 'South America'

// Get full geography info
geography.getGeography('FR');
// { continent: 'Europe', region: 'Western Europe' }

// Reverse lookups - get all countries in a continent/region
geography.countriesInContinent('Europe');
// ['AD', 'AL', 'AT', 'AX', 'BA', 'BE', ...]
geography.getCountriesByContinent('Europe'); // alias for countriesInContinent

geography.countriesInRegion('Eastern Asia');
// ['CN', 'HK', 'JP', 'KP', 'KR', 'MO', 'MN', 'TW']
geography.getCountriesByRegion('Eastern Asia'); // alias for countriesInRegion

// Get all continents/regions
geography.getContinents();
// ['Africa', 'Antarctica', 'Asia', 'Europe', 'North America', 'Oceania', 'South America']

geography.getRegions();
// ['Northern Africa', 'Sub-Saharan Africa', 'Northern America', ...]
```

### Membership Functions

Check EU, SEPA, EEA, Eurozone, and Schengen membership.

```typescript
import { membership } from '@koshmoney/countries/membership';

// EU membership (27 countries)
membership.isEU('FR');                 // true
membership.isEU('CH');                 // false (Switzerland)
membership.isEU('GB');                 // false (post-Brexit)

// SEPA membership (36 countries)
membership.isSEPA('FR');               // true
membership.isSEPA('CH');               // true (Switzerland is SEPA)
membership.isSEPA('GB');               // true (UK remains in SEPA)

// EEA membership (30 countries)
membership.isEEA('NO');                // true (Norway)
membership.isEEA('CH');                // false (Switzerland not in EEA)

// Eurozone membership (20 countries)
membership.isEurozone('DE');           // true
membership.isEurozone('SE');           // false (Sweden uses SEK)

// Schengen membership (27 countries)
membership.isSchengen('FR');           // true
membership.isSchengen('IE');           // false (Ireland not in Schengen)

// Generic membership check
membership.isMember('FR', 'EU');       // true
membership.isMember('CH', 'SEPA');     // true

// Get all memberships at once
membership.getMemberships('FR');
// { EU: true, SEPA: true, EEA: true, Eurozone: true, Schengen: true }

membership.getMemberships('CH');
// { EU: false, SEPA: true, EEA: false, Eurozone: false, Schengen: true }

// Get all members of a group
membership.getMembers('EU');           // ['AT', 'BE', 'BG', ...] (27 countries)
membership.getMembers('Eurozone');     // ['AT', 'BE', 'CY', ...] (20 countries)
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

// Postal code functions
import {
  isValid,
  hasPostalCode,
  getName,
  getFormat,
  getPattern,
  getInfo,
} from '@koshmoney/countries/postalCode';

// Currency functions
import {
  getCurrency,
  getCurrencyCode,
  getCurrencySymbol,
  getCurrencyName,
  usesCurrency,
  countriesUsingCurrency,
  getCountriesByCurrency, // alias for countriesUsingCurrency
} from '@koshmoney/countries/currency';

// Dial code functions
import {
  getDialCode,
  getDialCodes,
  getDialCodeInfo,
  isValidPhoneCountry,
  getSupportedCountries,
} from '@koshmoney/countries/dialCode';

// Geography functions
import {
  getContinent,
  getRegion,
  getGeography,
  countriesInContinent,
  countriesInRegion,
  getCountriesByContinent, // alias for countriesInContinent
  getCountriesByRegion,    // alias for countriesInRegion
  getContinents,
  getRegions,
} from '@koshmoney/countries/geography';

// Membership functions
import {
  isEU,
  isSEPA,
  isEEA,
  isEurozone,
  isSchengen,
  isMember,
  getMemberships,
  getMembers,
} from '@koshmoney/countries/membership';
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

interface PostalCodeInfo {
  regex: RegExp;     // Validation pattern
  format: string;    // "NNNNN" or "A1A 1A1"
  name: string;      // "ZIP Code", "PIN Code", "Postcode", etc.
}

interface CurrencyInfo {
  code: string;      // "USD"
  symbol: string;    // "$"
  name: string;      // "US Dollar"
}

interface DialCodeInfo {
  dialCode: string;    // "+1"
  countryCode: string; // "US"
}

interface GeographyInfo {
  continent: Continent; // "North America"
  region: Region;       // "Northern America"
}

type Continent =
  | 'Africa' | 'Antarctica' | 'Asia'
  | 'Europe' | 'North America' | 'Oceania' | 'South America';

type Region =
  | 'Northern Africa' | 'Sub-Saharan Africa' | 'Antarctica'
  | 'Central Asia' | 'Eastern Asia' | 'South-eastern Asia'
  | 'Southern Asia' | 'Western Asia' | 'Eastern Europe'
  | 'Northern Europe' | 'Southern Europe' | 'Western Europe'
  | 'Caribbean' | 'Central America' | 'Northern America' | 'South America'
  | 'Australia and New Zealand' | 'Melanesia' | 'Micronesia' | 'Polynesia';

interface MembershipInfo {
  EU: boolean;
  SEPA: boolean;
  EEA: boolean;
  Eurozone: boolean;
  Schengen: boolean;
}

type MembershipType = 'EU' | 'SEPA' | 'EEA' | 'Eurozone' | 'Schengen';
```

## API Reference

See [API Documentation](./docs/API.md) for complete API reference.

## Migration

Migrating from `iso-3166-1` or `iso-3166-2`? See [Migration Guide](./docs/MIGRATION.md).

## Data Sources

- [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1): Country codes (alpha-2, alpha-3, numeric)
- [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2): Subdivision codes
- [postcode-validator](https://github.com/melwynfurtado/postcode-validator): Postal code validation patterns
- [Universal Postal Union (UPU)](https://www.upu.int): Postal code standards
- [libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js): Phone dial codes
- [UN M49](https://unstats.un.org/unsd/methodology/m49/): Geographic regions classification
- [European Commission](https://european-union.europa.eu/): EU/EEA/Eurozone/Schengen membership data

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
