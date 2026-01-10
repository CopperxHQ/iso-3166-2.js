import type { Country, CountryWithSubdivisions } from '../types';
import { countries, alpha3Index, numericIndex, nameIndex } from './data';
import { normalize } from '../utils';
import { getSubdivisions } from '../subdivision/registry';

/**
 * Build a Country object from alpha-2 code
 */
function buildCountry(alpha2: string): Country | null {
  const record = countries[alpha2];
  if (!record) return null;

  return {
    name: record.name,
    alpha2,
    alpha3: record.alpha3,
    numeric: record.numeric,
  };
}

/**
 * Lookup country by ISO 3166-1 alpha-2 code
 *
 * @param code - 2-letter country code (case-insensitive)
 * @returns Country object or null if not found
 *
 * @example
 * whereAlpha2('US') // { name: 'United States', alpha2: 'US', alpha3: 'USA', numeric: '840' }
 * whereAlpha2('us') // { name: 'United States', ... } (case-insensitive)
 * whereAlpha2('XX') // null
 */
export function whereAlpha2(code: string): Country | null {
  const normalized = normalize(code);
  return buildCountry(normalized);
}

/**
 * Lookup country by ISO 3166-1 alpha-3 code
 *
 * @param code - 3-letter country code (case-insensitive)
 * @returns Country object or null if not found
 *
 * @example
 * whereAlpha3('USA') // { name: 'United States', alpha2: 'US', alpha3: 'USA', numeric: '840' }
 * whereAlpha3('XXX') // null
 */
export function whereAlpha3(code: string): Country | null {
  const normalized = normalize(code);
  const alpha2 = alpha3Index[normalized];
  if (!alpha2) return null;
  return buildCountry(alpha2);
}

/**
 * Lookup country by ISO 3166-1 numeric code
 *
 * @param code - Numeric country code (string or number)
 * @returns Country object or null if not found
 *
 * @example
 * whereNumeric('840') // { name: 'United States', ... }
 * whereNumeric(840)   // { name: 'United States', ... }
 * whereNumeric('999') // null
 */
export function whereNumeric(code: string | number): Country | null {
  const normalized = normalize(code);
  // Pad with leading zeros if necessary (e.g., "4" -> "004")
  const padded = normalized.padStart(3, '0');
  const alpha2 = numericIndex[padded];
  if (!alpha2) return null;
  return buildCountry(alpha2);
}

/**
 * Lookup country by name (case-insensitive)
 *
 * @param name - Country name
 * @returns Country object or null if not found
 *
 * @example
 * whereName('United States') // { name: 'United States', ... }
 * whereName('united states') // { name: 'United States', ... } (case-insensitive)
 * whereName('Narnia')        // null
 */
export function whereName(name: string): Country | null {
  const normalized = normalize(name);
  const alpha2 = nameIndex[normalized];
  if (!alpha2) return null;
  return buildCountry(alpha2);
}

/**
 * Get all countries
 *
 * @returns Array of all Country objects
 *
 * @example
 * all() // [{ name: 'Afghanistan', alpha2: 'AF', ... }, ...]
 */
export function all(): Country[] {
  return Object.keys(countries)
    .sort()
    .map((alpha2) => buildCountry(alpha2)!);
}

/**
 * Get country with all its subdivisions
 * Note: Requires subdivision data to be imported/registered
 *
 * @param code - Country code (alpha-2 or alpha-3)
 * @returns Country with subdivisions or null if not found
 *
 * @example
 * withSubdivisions('US') // { name: 'United States', ..., subdivisions: { 'US-CA': {...}, ... } }
 */
export function withSubdivisions(code: string): CountryWithSubdivisions | null {
  const normalized = normalize(code);

  // Try alpha-2 first
  let alpha2 = normalized;
  if (!(alpha2 in countries)) {
    // Try alpha-3
    alpha2 = alpha3Index[normalized];
  }

  if (!alpha2 || !(alpha2 in countries)) return null;

  const country = buildCountry(alpha2);
  if (!country) return null;

  const subdivisions = getSubdivisions(alpha2) || {};

  return {
    ...country,
    subdivisions,
  };
}

/**
 * Resolve any country code format to alpha-2
 * Internal helper used by other modules
 *
 * @param code - Country code in any format (alpha-2, alpha-3, or numeric)
 * @returns Alpha-2 code or null if not found
 */
export function resolveAlpha2(code: string | number): string | null {
  const normalized = normalize(code);
  if (!normalized) return null;

  // Direct alpha-2 match
  if (normalized in countries) return normalized;

  // Alpha-3 lookup
  if (normalized in alpha3Index) return alpha3Index[normalized];

  // Numeric lookup
  const padded = normalized.padStart(3, '0');
  if (padded in numericIndex) return numericIndex[padded];

  return null;
}
