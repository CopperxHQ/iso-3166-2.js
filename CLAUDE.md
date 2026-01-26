# CLAUDE.md

Project context and guidelines for AI assistants working on @koshmoney/countries.

## Project Overview

A tree-shakeable TypeScript library for country data including ISO 3166 codes, subdivisions, postal codes, currencies, dial codes, geography, and EU/SEPA membership.

## Architecture Principles

### Tree-Shaking Strategy

**CRITICAL**: All modules are designed for tree-shaking. Follow these rules:

1. **Subpath Exports Only**: New modules MUST be exported via subpath exports in `package.json`, NOT added to the main `src/index.ts`
2. **Alpha2-Only Input**: New modules should accept alpha-2 codes only to avoid pulling in the full country data
3. **Self-Contained Modules**: Each module should have its own data file - don't reference other modules' data
4. **No Cross-Module Data Pulling**: Using `resolveAlpha2` or similar helpers pulls in all country data

### Module Structure

Each module follows this pattern:

```
src/{module}/
├── data.ts      # Static data (Records, Sets, Maps)
├── lookup.ts    # Lookup/query functions
├── index.ts     # Re-exports (namespace object + named exports)
```

Example module structure:
```typescript
// src/{module}/data.ts
export const DATA: Record<string, DataType> = { ... };

// src/{module}/lookup.ts
import { DATA } from './data';
import { normalize } from '../utils';
export function getData(alpha2: string): DataType | null { ... }

// src/{module}/index.ts
import * as lookup from './lookup';
export * from './lookup';
export { lookup as moduleName };  // namespace export
```

### Build Configuration

When adding a new module:

1. **tsup.config.ts**: Add entry point
   ```typescript
   entry: {
     '{module}/index': 'src/{module}/index.ts',
   }
   ```

2. **package.json**: Add exports
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

## Current Modules

| Module | Path | Description |
|--------|------|-------------|
| country | `src/country/` | ISO 3166-1 country codes |
| subdivision | `src/subdivision/` | ISO 3166-2 subdivisions |
| postalCode | `src/postalCode/` | Postal code validation |
| currency | `src/currency/` | Currency data (ISO 4217) |
| dialCode | `src/dialCode/` | Phone dial codes (via libphonenumber-js) |
| geography | `src/geography/` | Continent/region (UN M49) |
| membership | `src/membership/` | EU/SEPA/EEA/Eurozone/Schengen |

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

### Return Types

- Single lookups return `T | null`
- Multiple lookups return `T[]` (empty array if none)
- Boolean checks return `boolean`

### Function Naming

| Pattern | Purpose | Example |
|---------|---------|---------|
| `get{X}` | Get single value | `getCurrency('US')` |
| `get{X}s` | Get array | `getDialCodes('US')` |
| `get{Plural}By{X}` | Reverse lookup | `getCountriesByCurrency('EUR')` |
| `is{X}` | Boolean check | `isEU('FR')` |

### Data Sources

- **Countries**: ISO 3166-1
- **Subdivisions**: ISO 3166-2
- **Currencies**: ISO 4217
- **Dial Codes**: libphonenumber-js (external dependency)
- **Geography**: UN M49 standard
- **Memberships**: European Commission official lists

## Testing

Tests are in `tests/{module}.test.ts`. Run with:
```bash
npm test          # Run all tests
npm run test:watch # Watch mode
```

Each module should have tests covering:
- Valid inputs returning correct data
- Invalid inputs returning null/empty/false
- Case insensitivity
- Edge cases

## File Locations

```
├── src/
│   ├── index.ts           # Main exports (country, subdivision, postalCode only)
│   ├── types.ts           # Shared type definitions
│   ├── utils.ts           # Shared utilities (normalize)
│   ├── country/           # Core country module
│   ├── subdivision/       # Subdivisions with per-country data files
│   ├── postalCode/        # Postal code validation
│   ├── currency/          # Currency data
│   ├── dialCode/          # Dial codes (libphonenumber-js wrapper)
│   ├── geography/         # Continent/region data
│   └── membership/        # EU/SEPA/EEA membership
├── tests/                 # Test files
├── docs/                  # Documentation
│   ├── API.md            # Full API reference
│   ├── TREE_SHAKING.md   # Tree-shaking guide
│   └── MIGRATION.md      # Migration guide
├── tsup.config.ts        # Build configuration
└── package.json          # Package config with exports
```

## Common Tasks

### Adding a New Module

1. Create module folder: `src/{module}/`
2. Add `data.ts`, `lookup.ts`, `index.ts`
3. Add types to `src/types.ts`
4. Add entry in `tsup.config.ts`
5. Add exports in `package.json`
6. Create tests in `tests/{module}.test.ts`
7. Update `docs/API.md` with new functions
8. Update `README.md` with usage examples

### DO NOT

- Add new modules to `src/index.ts` (breaks tree-shaking)
- Use `resolveAlpha2` or pull country data into new modules
- Create plan/spec documents in root (use `docs/` only)
- Skip adding package.json exports (breaks imports)

## Dependencies

- **Runtime**: `libphonenumber-js` (only used by dialCode module)
- **Dev**: `tsup`, `tsx`, `typescript`, `vitest`
