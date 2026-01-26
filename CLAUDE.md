# CLAUDE.md

Project context and guidelines for AI assistants working on @koshmoney/countries.

## Project Overview

A tree-shakeable TypeScript library for country data including ISO 3166 codes, subdivisions, postal codes, currencies, dial codes, geography, and EU/SEPA membership.

## Architecture

### Module Types

The library has two types of modules:

1. **Core modules** (in main bundle via `src/index.ts`):
   - `country` - ISO 3166-1 country codes
   - `subdivision` - ISO 3166-2 subdivisions
   - `postalCode` - Postal code validation

2. **Specialized modules** (subpath exports only, NOT in main bundle):
   - `currency` - Currency data (ISO 4217)
   - `dialCode` - Phone dial codes (via libphonenumber-js)
   - `geography` - Continent/region (UN M49)
   - `membership` - EU/SEPA/EEA/Eurozone/Schengen

This separation allows users to import only what they need for optimal bundle size.

### Module Structure Pattern

Each module follows this structure:

```
src/{module}/
├── data.ts      # Static data (Records, Sets, Maps)
├── lookup.ts    # Lookup/query functions
├── validate.ts  # Validation functions (if needed)
├── index.ts     # Namespace export + named exports + data exports
```

**index.ts pattern** (follow postalCode as reference):

```typescript
/**
 * Module description
 */

import * as lookup from './lookup';

// ============ Namespace Export ============

/**
 * Namespace description
 */
export const moduleName = {
  functionA: lookup.functionA,
  functionB: lookup.functionB,
};

// ============ Named Exports ============

export {
  functionA,
  functionB,
} from './lookup';

// Data exports (for advanced usage)
export { dataObject } from './data';
```

### Build Configuration

When adding a new specialized module:

1. **tsup.config.ts** - Add entry point:
   ```typescript
   entry: {
     '{module}/index': 'src/{module}/index.ts',
   }
   ```

2. **package.json** - Add exports:
   ```json
   "./{module}": {
     "import": {
       "types": "./dist/{module}/index.d.ts",
       "default": "./dist/{module}/index.js"
     },
     "require": {
       "types": "./dist/{module}/index.d.cts",
       "default": "./dist/{module}/index.cjs"
     }
   }
   ```

### Import Patterns

```typescript
// Namespaced usage (recommended)
import { currency } from '@koshmoney/countries/currency';
currency.getCurrency('US');

// Direct imports (tree-shakeable)
import { getCurrency } from '@koshmoney/countries/currency';
getCurrency('US');

// Core modules from main bundle
import { country, subdivision, postalCode } from '@koshmoney/countries';
```

## Code Conventions

### Input Normalization

All functions accepting country codes use `normalize()` from `src/utils.ts`:

```typescript
import { normalize } from '../utils';

export function getData(alpha2: string): DataType | null {
  const code = normalize(alpha2);  // Uppercase, trimmed
  return DATA[code] ?? null;
}
```

### Function Naming

| Pattern | Purpose | Example |
|---------|---------|---------|
| `get{X}` | Get single value | `getCurrency('US')` |
| `get{X}s` | Get array | `getDialCodes('US')` |
| `getCountriesBy{X}` | Reverse lookup | `getCountriesByCurrency('EUR')` |
| `countriesIn{X}` | Reverse lookup (alt) | `countriesInContinent('Europe')` |
| `is{X}` | Boolean check | `isEU('FR')` |
| `has{X}` | Boolean check | `hasPostalCode('US')` |

### Return Types

- Single lookups: `T | null`
- Multiple lookups: `T[]` (empty array if none)
- Boolean checks: `boolean`

### Data Sources

| Module | Source |
|--------|--------|
| country | ISO 3166-1 |
| subdivision | ISO 3166-2 |
| postalCode | postcode-validator, UPU |
| currency | ISO 4217 |
| dialCode | libphonenumber-js |
| geography | UN M49 |
| membership | European Commission |

## File Structure

```
├── src/
│   ├── index.ts           # Main exports (country, subdivision, postalCode)
│   ├── types.ts           # Shared type definitions
│   ├── utils.ts           # Shared utilities (normalize)
│   ├── country/           # Core: ISO 3166-1
│   ├── subdivision/       # Core: ISO 3166-2 with per-country data files
│   ├── postalCode/        # Core: Postal code validation
│   ├── currency/          # Specialized: Currency data
│   ├── dialCode/          # Specialized: Dial codes (libphonenumber-js)
│   ├── geography/         # Specialized: Continent/region
│   └── membership/        # Specialized: EU/SEPA membership
├── tests/                 # Test files ({module}.test.ts)
├── docs/                  # Documentation
│   ├── API.md             # Full API reference
│   ├── TREE_SHAKING.md    # Tree-shaking guide
│   └── MIGRATION.md       # Migration guide
├── tsup.config.ts         # Build configuration
└── package.json           # Package config with exports
```

## Testing

Tests are in `tests/{module}.test.ts`. Run with:

```bash
npm test          # Run all tests
npm run test:watch # Watch mode
```

Each module should test:
- Valid inputs returning correct data
- Invalid inputs returning null/empty/false
- Case insensitivity
- Edge cases

## Common Tasks

### Adding a New Specialized Module

1. Create folder: `src/{module}/`
2. Add `data.ts` with static data
3. Add `lookup.ts` with functions
4. Add `index.ts` with namespace + named exports
5. Add types to `src/types.ts`
6. Add entry in `tsup.config.ts`
7. Add exports in `package.json`
8. Create `tests/{module}.test.ts`
9. Update `docs/API.md`
10. Update `README.md`

### DO NOT

- Add specialized modules to `src/index.ts` (keeps them tree-shakeable)
- Use cross-module data imports (each module self-contained)
- Create plan/spec documents in root (use `docs/` only)
- Skip package.json exports (breaks imports)
- Use inconsistent function naming

## Dependencies

- **Runtime**: `libphonenumber-js` (only pulled when importing dialCode module)
- **Dev**: `tsup`, `tsx`, `typescript`, `vitest`
