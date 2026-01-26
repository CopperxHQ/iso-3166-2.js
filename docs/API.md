# API Reference

Complete API documentation for the iso-3166 library.

## Table of Contents

- [Country Functions](#country-functions)
  - [Lookups](#country-lookups)
  - [Conversions](#country-conversions)
  - [Validation](#country-validation)
- [Subdivision Functions](#subdivision-functions)
  - [Lookups](#subdivision-lookups)
  - [Conversions](#subdivision-conversions)
  - [Validation](#subdivision-validation)
- [Currency Functions](#currency-functions)
- [Dial Code Functions](#dial-code-functions)
- [Geography Functions](#geography-functions)
- [Membership Functions](#membership-functions)
- [Types](#types)

---

## Country Functions

### Country Lookups

#### `whereAlpha2(code: string): Country | null`

Lookup country by ISO 3166-1 alpha-2 code.

**Parameters:**
- `code` - 2-letter country code (case-insensitive)

**Returns:** Country object or `null` if not found

**Example:**
```typescript
import { country } from 'iso-3166';

country.whereAlpha2('US');
// { name: 'United States', alpha2: 'US', alpha3: 'USA', numeric: '840' }

country.whereAlpha2('us'); // case-insensitive
// { name: 'United States', ... }

country.whereAlpha2('XX');
// null
```

---

#### `whereAlpha3(code: string): Country | null`

Lookup country by ISO 3166-1 alpha-3 code.

**Parameters:**
- `code` - 3-letter country code (case-insensitive)

**Returns:** Country object or `null` if not found

**Example:**
```typescript
country.whereAlpha3('USA');
// { name: 'United States', alpha2: 'US', alpha3: 'USA', numeric: '840' }

country.whereAlpha3('XXX');
// null
```

---

#### `whereNumeric(code: string | number): Country | null`

Lookup country by ISO 3166-1 numeric code.

**Parameters:**
- `code` - Numeric country code (string or number)

**Returns:** Country object or `null` if not found

**Example:**
```typescript
country.whereNumeric('840');
// { name: 'United States', ... }

country.whereNumeric(840);
// { name: 'United States', ... }

country.whereNumeric(4); // Handles missing leading zeros
// { name: 'Afghanistan', alpha2: 'AF', ... }
```

---

#### `whereName(name: string): Country | null`

Lookup country by name (case-insensitive).

**Parameters:**
- `name` - Country name

**Returns:** Country object or `null` if not found

**Example:**
```typescript
country.whereName('United States');
// { name: 'United States', alpha2: 'US', ... }

country.whereName('SWEDEN'); // case-insensitive
// { name: 'Sweden', alpha2: 'SE', ... }
```

---

#### `all(): Country[]`

Get all countries.

**Returns:** Array of all Country objects, sorted by alpha-2 code

**Example:**
```typescript
const countries = country.all();
// [{ name: 'Afghanistan', alpha2: 'AF', ... }, ...]
```

---

#### `withSubdivisions(code: string): CountryWithSubdivisions | null`

Get country with all its subdivisions.

**Parameters:**
- `code` - Country code (alpha-2 or alpha-3)

**Returns:** Country with subdivisions or `null` if not found

**Example:**
```typescript
country.withSubdivisions('US');
// {
//   name: 'United States',
//   alpha2: 'US',
//   alpha3: 'USA',
//   numeric: '840',
//   subdivisions: {
//     'US-CA': { name: 'California', type: 'State' },
//     'US-TX': { name: 'Texas', type: 'State' },
//     ...
//   }
// }
```

---

### Country Conversions

#### `alpha2ToAlpha3(code: string): string | null`

Convert alpha-2 code to alpha-3.

```typescript
country.alpha2ToAlpha3('US'); // 'USA'
country.alpha2ToAlpha3('SE'); // 'SWE'
country.alpha2ToAlpha3('XX'); // null
```

---

#### `alpha3ToAlpha2(code: string): string | null`

Convert alpha-3 code to alpha-2.

```typescript
country.alpha3ToAlpha2('USA'); // 'US'
country.alpha3ToAlpha2('XXX'); // null
```

---

#### `alpha2ToNumeric(code: string): string | null`

Convert alpha-2 code to numeric.

```typescript
country.alpha2ToNumeric('US'); // '840'
```

---

#### `alpha3ToNumeric(code: string): string | null`

Convert alpha-3 code to numeric.

```typescript
country.alpha3ToNumeric('USA'); // '840'
```

---

#### `numericToAlpha2(code: string | number): string | null`

Convert numeric code to alpha-2.

```typescript
country.numericToAlpha2('840'); // 'US'
country.numericToAlpha2(840);   // 'US'
```

---

#### `numericToAlpha3(code: string | number): string | null`

Convert numeric code to alpha-3.

```typescript
country.numericToAlpha3('840'); // 'USA'
country.numericToAlpha3(840);   // 'USA'
```

---

#### `toName(code: string | number): string | null`

Get country name from any code format.

```typescript
country.toName('US');  // 'United States'
country.toName('USA'); // 'United States'
country.toName(840);   // 'United States'
country.toName('XX');  // null
```

---

#### `convert(code: string | number, from: CountryCodeFormat, to: CountryCodeFormat): string | null`

Convert between any two country code formats.

```typescript
country.convert('US', 'alpha2', 'alpha3');   // 'USA'
country.convert('USA', 'alpha3', 'numeric'); // '840'
country.convert('840', 'numeric', 'alpha2'); // 'US'
```

---

### Country Validation

#### `isAlpha2(code: string): boolean`

Check if string is a valid alpha-2 code.

```typescript
country.isAlpha2('US');  // true
country.isAlpha2('USA'); // false
country.isAlpha2('XX');  // false
```

---

#### `isAlpha3(code: string): boolean`

Check if string is a valid alpha-3 code.

```typescript
country.isAlpha3('USA'); // true
country.isAlpha3('US');  // false
country.isAlpha3('XXX'); // false
```

---

#### `isNumeric(code: string | number): boolean`

Check if value is a valid numeric code.

```typescript
country.isNumeric('840'); // true
country.isNumeric(840);   // true
country.isNumeric('999'); // false
```

---

#### `isCountryName(name: string): boolean`

Check if string is a valid country name.

```typescript
country.isCountryName('United States'); // true
country.isCountryName('Narnia');        // false
```

---

#### `isValid(value: string | number): boolean`

Check if value is any valid country identifier.

```typescript
country.isValid('US');            // true
country.isValid('USA');           // true
country.isValid(840);             // true
country.isValid('United States'); // true
country.isValid('XX');            // false
```

---

#### `detectFormat(code: string | number): CountryCodeFormat | 'name' | null`

Detect the format of a country code.

```typescript
country.detectFormat('US');            // 'alpha2'
country.detectFormat('USA');           // 'alpha3'
country.detectFormat('840');           // 'numeric'
country.detectFormat('United States'); // 'name'
country.detectFormat('XX');            // null
```

---

## Subdivision Functions

### Subdivision Lookups

#### `whereCode(code: string): Subdivision | null`

Lookup subdivision by full ISO 3166-2 code.

**Parameters:**
- `code` - Full subdivision code (e.g., "US-CA")

**Returns:** Subdivision object or `null` if not found

**Example:**
```typescript
import { subdivision } from 'iso-3166';

subdivision.whereCode('US-CA');
// {
//   code: 'US-CA',
//   name: 'California',
//   type: 'State',
//   countryCode: 'US',
//   countryName: 'United States',
//   regionCode: 'CA'
// }

subdivision.whereCode('USA-CA'); // Works with alpha-3 country codes
// { code: 'US-CA', name: 'California', ... }

subdivision.whereCode('US-California'); // Works with subdivision names
// { code: 'US-CA', name: 'California', ... }
```

---

#### `where(countryCode: string, regionCode: string): Subdivision | null`

Lookup subdivision by country code and region code.

```typescript
subdivision.where('US', 'CA');
// { code: 'US-CA', name: 'California', ... }

subdivision.where('USA', 'CA'); // Works with alpha-3
// { code: 'US-CA', name: 'California', ... }
```

---

#### `whereName(countryCode: string, name: string): Subdivision | null`

Lookup subdivision by country code and subdivision name.

```typescript
subdivision.whereName('US', 'California');
// { code: 'US-CA', name: 'California', ... }

subdivision.whereName('US', 'california'); // case-insensitive
// { code: 'US-CA', name: 'California', ... }
```

---

#### `forCountry(countryCode: string): Subdivision[]`

Get all subdivisions for a country.

```typescript
const states = subdivision.forCountry('US');
// [{ code: 'US-AL', name: 'Alabama', ... }, { code: 'US-AK', name: 'Alaska', ... }, ...]

subdivision.forCountry('XX'); // []
```

---

#### `all(): Subdivision[]`

Get all subdivisions from all countries.

```typescript
const allSubs = subdivision.all();
// Returns 5000+ subdivisions sorted by code
```

---

#### `hasSubdivisions(countryCode: string): boolean`

Check if a country has subdivisions registered.

```typescript
subdivision.hasSubdivisions('US');  // true
subdivision.hasSubdivisions('USA'); // true
subdivision.hasSubdivisions('XX');  // false
```

---

### Subdivision Conversions

#### `toRegionCode(code: string): string | null`

Extract region code from full subdivision code.

```typescript
subdivision.toRegionCode('US-CA');  // 'CA'
subdivision.toRegionCode('GB-EAW'); // 'EAW'
subdivision.toRegionCode('invalid'); // null
```

---

#### `toFullCode(countryCode: string, regionCode: string): string | null`

Build full subdivision code from country and region.

```typescript
subdivision.toFullCode('US', 'CA');  // 'US-CA'
subdivision.toFullCode('USA', 'CA'); // 'US-CA' (normalizes alpha-3)
subdivision.toFullCode('US', 'XX');  // null (invalid region)
```

---

#### `toName(code: string): string | null`

Get subdivision name from full code.

```typescript
subdivision.toName('US-CA'); // 'California'
subdivision.toName('XX-YY'); // null
```

---

#### `toNameFrom(countryCode: string, regionCode: string): string | null`

Get subdivision name from country and region code.

```typescript
subdivision.toNameFrom('US', 'CA');  // 'California'
subdivision.toNameFrom('USA', 'CA'); // 'California'
```

---

#### `toCountryCode(code: string): string | null`

Extract country code from full subdivision code.

```typescript
subdivision.toCountryCode('US-CA');  // 'US'
subdivision.toCountryCode('USA-CA'); // 'US' (normalizes)
subdivision.toCountryCode('invalid'); // null
```

---

### Subdivision Validation

#### `isValidCode(code: string): boolean`

Check if string is a valid full subdivision code.

```typescript
subdivision.isValidCode('US-CA'); // true
subdivision.isValidCode('XX-YY'); // false
```

---

#### `isValidRegion(countryCode: string, regionCode: string): boolean`

Check if region code is valid for a country.

```typescript
subdivision.isValidRegion('US', 'CA'); // true
subdivision.isValidRegion('US', 'XX'); // false
```

---

#### `isValidName(countryCode: string, name: string): boolean`

Check if subdivision name exists in a country.

```typescript
subdivision.isValidName('US', 'California'); // true
subdivision.isValidName('US', 'Narnia');     // false
```

---

## Currency Functions

Import: `import { currency } from '@koshmoney/countries/currency';`

#### `getCurrency(alpha2: string): CurrencyInfo | null`

Get full currency information for a country.

```typescript
currency.getCurrency('US');
// { code: 'USD', symbol: '$', name: 'US Dollar' }

currency.getCurrency('JP');
// { code: 'JPY', symbol: '¥', name: 'Japanese Yen' }

currency.getCurrency('XX');
// null
```

---

#### `getCurrencyCode(alpha2: string): string | null`

Get currency code for a country.

```typescript
currency.getCurrencyCode('US'); // 'USD'
currency.getCurrencyCode('DE'); // 'EUR'
currency.getCurrencyCode('XX'); // null
```

---

#### `getCurrencySymbol(alpha2: string): string | null`

Get currency symbol for a country.

```typescript
currency.getCurrencySymbol('US'); // '$'
currency.getCurrencySymbol('GB'); // '£'
currency.getCurrencySymbol('IN'); // '₹'
```

---

#### `getCurrencyName(alpha2: string): string | null`

Get currency name for a country.

```typescript
currency.getCurrencyName('US'); // 'US Dollar'
currency.getCurrencyName('JP'); // 'Japanese Yen'
```

---

#### `getCountriesByCurrency(currencyCode: string): string[]`

Get all countries using a specific currency.

```typescript
currency.getCountriesByCurrency('EUR');
// ['AD', 'AT', 'BE', 'CY', 'DE', 'EE', 'ES', 'FI', 'FR', ...]

currency.getCountriesByCurrency('USD');
// ['AS', 'EC', 'FM', 'GU', 'IO', 'MH', 'MP', 'PR', 'PW', 'TC', 'UM', 'US', 'VG', 'VI']
```

---

## Dial Code Functions

Import: `import { dialCode } from '@koshmoney/countries/dialCode';`

> Powered by [libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js)

#### `getDialCode(alpha2: string): string | null`

Get international dialing code for a country.

```typescript
dialCode.getDialCode('US'); // '+1'
dialCode.getDialCode('GB'); // '+44'
dialCode.getDialCode('FR'); // '+33'
dialCode.getDialCode('XX'); // null
```

---

#### `getDialCodes(alpha2: string): string[] | null`

Get all dial codes for a country (array for consistency).

```typescript
dialCode.getDialCodes('US'); // ['+1']
dialCode.getDialCodes('GB'); // ['+44']
```

---

#### `getDialCodeInfo(alpha2: string): DialCodeInfo | null`

Get full dial code information.

```typescript
dialCode.getDialCodeInfo('US');
// { dialCode: '+1', countryCode: 'US' }

dialCode.getDialCodeInfo('XX');
// null
```

---

#### `isValidPhoneCountry(alpha2: string): boolean`

Check if country code is supported for phone operations.

```typescript
dialCode.isValidPhoneCountry('US'); // true
dialCode.isValidPhoneCountry('XX'); // false
```

---

#### `getSupportedCountries(): string[]`

Get all supported country codes.

```typescript
dialCode.getSupportedCountries();
// ['AC', 'AD', 'AE', 'AF', ...]
```

---

## Geography Functions

Import: `import { geography } from '@koshmoney/countries/geography';`

> Based on [UN M49](https://unstats.un.org/unsd/methodology/m49/) geographic regions classification.

#### `getContinent(alpha2: string): Continent | null`

Get continent for a country.

```typescript
geography.getContinent('US'); // 'North America'
geography.getContinent('JP'); // 'Asia'
geography.getContinent('DE'); // 'Europe'
geography.getContinent('AU'); // 'Oceania'
geography.getContinent('XX'); // null
```

---

#### `getRegion(alpha2: string): Region | null`

Get UN M49 subregion for a country.

```typescript
geography.getRegion('US'); // 'Northern America'
geography.getRegion('JP'); // 'Eastern Asia'
geography.getRegion('DE'); // 'Western Europe'
geography.getRegion('BR'); // 'South America'
```

---

#### `getGeography(alpha2: string): GeographyInfo | null`

Get full geography information.

```typescript
geography.getGeography('FR');
// { continent: 'Europe', region: 'Western Europe' }

geography.getGeography('XX');
// null
```

---

#### `getCountriesByContinent(continent: Continent): string[]`

Get all countries in a continent.

```typescript
geography.getCountriesByContinent('Europe');
// ['AD', 'AL', 'AT', 'AX', 'BA', 'BE', ...]

geography.getCountriesByContinent('Antarctica');
// ['AQ', 'BV', 'GS', 'HM', 'TF']
```

---

#### `getCountriesByRegion(region: Region): string[]`

Get all countries in a region.

```typescript
geography.getCountriesByRegion('Eastern Asia');
// ['CN', 'HK', 'JP', 'KP', 'KR', 'MO', 'MN', 'TW']

geography.getCountriesByRegion('Northern America');
// ['BM', 'CA', 'GL', 'PM', 'US']
```

---

#### `getContinents(): Continent[]`

Get all continents.

```typescript
geography.getContinents();
// ['Africa', 'Antarctica', 'Asia', 'Europe', 'North America', 'Oceania', 'South America']
```

---

#### `getRegions(): Region[]`

Get all regions.

```typescript
geography.getRegions();
// ['Northern Africa', 'Sub-Saharan Africa', 'Antarctica', 'Central Asia', ...]
```

---

## Membership Functions

Import: `import { membership } from '@koshmoney/countries/membership';`

#### `isEU(alpha2: string): boolean`

Check if country is an EU member (27 countries).

```typescript
membership.isEU('FR'); // true
membership.isEU('CH'); // false (Switzerland)
membership.isEU('GB'); // false (post-Brexit)
```

---

#### `isSEPA(alpha2: string): boolean`

Check if country is in SEPA zone (36 countries).

```typescript
membership.isSEPA('FR'); // true
membership.isSEPA('CH'); // true (Switzerland is SEPA)
membership.isSEPA('GB'); // true (UK remains in SEPA)
```

---

#### `isEEA(alpha2: string): boolean`

Check if country is in EEA (30 countries).

```typescript
membership.isEEA('NO'); // true (Norway)
membership.isEEA('CH'); // false (Switzerland not in EEA)
```

---

#### `isEurozone(alpha2: string): boolean`

Check if country uses the Euro (20 countries).

```typescript
membership.isEurozone('DE'); // true
membership.isEurozone('SE'); // false (Sweden uses SEK)
```

---

#### `isSchengen(alpha2: string): boolean`

Check if country is in Schengen Area (27 countries).

```typescript
membership.isSchengen('FR'); // true
membership.isSchengen('IE'); // false (Ireland not in Schengen)
```

---

#### `getMemberships(alpha2: string): MembershipInfo`

Get all membership statuses for a country.

```typescript
membership.getMemberships('FR');
// { EU: true, SEPA: true, EEA: true, Eurozone: true, Schengen: true }

membership.getMemberships('CH');
// { EU: false, SEPA: true, EEA: false, Eurozone: false, Schengen: true }

membership.getMemberships('GB');
// { EU: false, SEPA: true, EEA: false, Eurozone: false, Schengen: false }
```

---

#### `getMembers(membershipType: MembershipType): string[]`

Get all member countries of a specific group.

```typescript
membership.getMembers('EU');
// ['AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'HU', 'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK']

membership.getMembers('Eurozone');
// ['AT', 'BE', 'CY', 'DE', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PT', 'SI', 'SK']
```

---

## Types

### Country

```typescript
interface Country {
  /** Full country name (e.g., "United States") */
  name: string;
  /** ISO 3166-1 alpha-2 code (e.g., "US") */
  alpha2: string;
  /** ISO 3166-1 alpha-3 code (e.g., "USA") */
  alpha3: string;
  /** ISO 3166-1 numeric code (e.g., "840") */
  numeric: string;
}
```

### Subdivision

```typescript
interface Subdivision {
  /** Full ISO 3166-2 code (e.g., "US-CA") */
  code: string;
  /** Subdivision name (e.g., "California") */
  name: string;
  /** Subdivision type (e.g., "State", "Province", "County") */
  type: string;
  /** Country alpha-2 code (e.g., "US") */
  countryCode: string;
  /** Country name (e.g., "United States") */
  countryName: string;
  /** Region code without country prefix (e.g., "CA") */
  regionCode: string;
}
```

### SubdivisionInfo

```typescript
interface SubdivisionInfo {
  /** Subdivision name */
  name: string;
  /** Subdivision type */
  type: string;
}
```

### CountryWithSubdivisions

```typescript
interface CountryWithSubdivisions extends Country {
  /** All subdivisions indexed by full code */
  subdivisions: Record<string, SubdivisionInfo>;
}
```

### CountryCodeFormat

```typescript
type CountryCodeFormat = 'alpha2' | 'alpha3' | 'numeric';
```

### CurrencyInfo

```typescript
interface CurrencyInfo {
  /** Currency code (e.g., "USD") */
  code: string;
  /** Currency symbol (e.g., "$") */
  symbol: string;
  /** Currency name (e.g., "US Dollar") */
  name: string;
}
```

### DialCodeInfo

```typescript
interface DialCodeInfo {
  /** Dial code with + prefix (e.g., "+1") */
  dialCode: string;
  /** Country alpha-2 code (e.g., "US") */
  countryCode: string;
}
```

### GeographyInfo

```typescript
interface GeographyInfo {
  /** Continent name */
  continent: Continent;
  /** UN M49 region name */
  region: Region;
}
```

### Continent

```typescript
type Continent =
  | 'Africa'
  | 'Antarctica'
  | 'Asia'
  | 'Europe'
  | 'North America'
  | 'Oceania'
  | 'South America';
```

### Region

```typescript
type Region =
  | 'Northern Africa'
  | 'Sub-Saharan Africa'
  | 'Antarctica'
  | 'Central Asia'
  | 'Eastern Asia'
  | 'South-eastern Asia'
  | 'Southern Asia'
  | 'Western Asia'
  | 'Eastern Europe'
  | 'Northern Europe'
  | 'Southern Europe'
  | 'Western Europe'
  | 'Caribbean'
  | 'Central America'
  | 'Northern America'
  | 'South America'
  | 'Australia and New Zealand'
  | 'Melanesia'
  | 'Micronesia'
  | 'Polynesia';
```

### MembershipInfo

```typescript
interface MembershipInfo {
  /** EU member state */
  EU: boolean;
  /** SEPA zone member */
  SEPA: boolean;
  /** EEA member */
  EEA: boolean;
  /** Eurozone member (uses Euro) */
  Eurozone: boolean;
  /** Schengen Area member */
  Schengen: boolean;
}
```

### MembershipType

```typescript
type MembershipType = 'EU' | 'SEPA' | 'EEA' | 'Eurozone' | 'Schengen';
```
