# Tree-Shaking Guide

This library supports true tree-shaking via subpath exports, allowing you to import only the data you need.

## Import Patterns

### Full Library (~60KB gzipped)

```typescript
import { country, subdivision } from 'iso-3166';
```

Use this when you need access to all countries and all subdivisions.

---

### Country Only (~8KB gzipped)

```typescript
import { whereAlpha2, alpha2ToAlpha3, isAlpha2 } from 'iso-3166/country';

whereAlpha2('US');      // Works
alpha2ToAlpha3('US');   // 'USA'
isAlpha2('US');         // true
```

Use this when you only need country codes and don't need subdivision data.

---

### Specific Subdivisions (~1-2KB each)

```typescript
import { whereAlpha2 } from 'iso-3166/country';
import 'iso-3166/subdivision/US';  // Registers US subdivisions
import 'iso-3166/subdivision/CA';  // Registers Canada subdivisions
import { whereCode, forCountry } from 'iso-3166/subdivision';

whereAlpha2('US');        // Works
whereCode('US-CA');       // Works - US is registered
forCountry('CA');         // Works - CA is registered
whereCode('GB-ENG');      // Returns null - GB not registered
```

Use this when you only need subdivisions for specific countries.

---

### Direct Data Access

```typescript
import { subdivisions as usStates } from 'iso-3166/subdivision/US';
import { subdivisions as seCounties } from 'iso-3166/subdivision/SE';

console.log(usStates['US-CA'].name);  // 'California'
console.log(seCounties['SE-O'].name); // 'Västra Götalands län'
```

Use this when you just need raw data without the lookup functions.

---

## Bundle Size Reference

| Import | Approximate Size (gzipped) |
|--------|---------------------------|
| `iso-3166` (full) | ~60KB |
| `iso-3166/country` | ~8KB |
| `iso-3166/subdivision` (all) | ~55KB |
| `iso-3166/subdivision/US` | ~1.5KB |
| `iso-3166/subdivision/SE` | ~0.5KB |
| `iso-3166/subdivision/GB` | ~2KB |
| Country + US + CA | ~10KB |

---

## How It Works

1. **Separate Files**: Each country's subdivisions are in a separate file
2. **Self-Registering**: Subdivision files register themselves when imported
3. **Runtime Registry**: Lookup functions use a runtime registry
4. **Bundler Elimination**: Unimported files are eliminated by the bundler

### The Registry Pattern

When you import a subdivision file:

```typescript
import 'iso-3166/subdivision/US';
```

It automatically registers its data:

```typescript
// Inside US.ts
import { register } from '../registry';

export const subdivisions = { ... };

// Auto-register on import
register('US', 'United States', subdivisions);
```

The subdivision lookup functions then use this registry:

```typescript
// Inside lookup.ts
import { getSubdivisions } from './registry';

export function whereCode(code: string) {
  const subdivisions = getSubdivisions(countryCode);
  // Returns null if country not registered
}
```

---

## Verifying Tree-Shaking

### Using source-map-explorer

```bash
# Build your app
npm run build

# Analyze bundle
npx source-map-explorer dist/bundle.js
```

### Using bundlephobia

Check the package size at [bundlephobia.com](https://bundlephobia.com/).

---

## Common Patterns

### Application with US and EU Countries

```typescript
import { whereAlpha2 } from 'iso-3166/country';

// Import only the subdivisions you need
import 'iso-3166/subdivision/US';
import 'iso-3166/subdivision/CA';
import 'iso-3166/subdivision/GB';
import 'iso-3166/subdivision/DE';
import 'iso-3166/subdivision/FR';

import { whereCode, forCountry } from 'iso-3166/subdivision';

// Now you can use subdivision functions for these countries
```

### Country Dropdown Only

```typescript
import { all } from 'iso-3166/country';

// Get all countries for a dropdown
const countries = all();
// No subdivision data loaded
```

### Single Country Application

```typescript
import { whereAlpha2, toName } from 'iso-3166/country';
import 'iso-3166/subdivision/US';
import { forCountry, whereName } from 'iso-3166/subdivision';

// US-only application
const states = forCountry('US');
const california = whereName('US', 'California');
```

---

## Caveats

### All Functions Need Registry

Even if you import a specific subdivision file, you still need to import the subdivision functions from `iso-3166/subdivision`:

```typescript
// Wrong - functions won't find the data
import { subdivisions } from 'iso-3166/subdivision/US';
import { whereCode } from 'iso-3166/subdivision';
whereCode('US-CA'); // This works because importing subdivisions registered it

// Right - explicit registration
import 'iso-3166/subdivision/US';  // Registers data
import { whereCode } from 'iso-3166/subdivision';  // Functions
whereCode('US-CA');  // Works!
```

### Graceful Degradation

Unregistered countries return `null` instead of throwing errors:

```typescript
import 'iso-3166/subdivision/US';
import { whereCode } from 'iso-3166/subdivision';

whereCode('US-CA');  // Works
whereCode('GB-ENG'); // Returns null (GB not imported)
```

This allows you to handle missing data gracefully in your application.
