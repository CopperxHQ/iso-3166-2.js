import type { Subdivision } from '../types';
import { normalize, parseSubdivisionCode } from '../utils';
import { resolveAlpha2 } from '../country/lookup';
import { countries } from '../country/data';
import {
  getSubdivisions,
  getCountryName,
  getAllSubdivisions,
  hasSubdivisions as registryHasSubdivisions,
} from './registry';

/**
 * Build a full Subdivision object
 */
function buildSubdivision(
  alpha2: string,
  code: string,
  info: { name: string; type: string }
): Subdivision {
  const regionCode = code.split('-').slice(1).join('-');
  const countryName = getCountryName(alpha2) || countries[alpha2]?.name || '';

  return {
    code,
    name: info.name,
    type: info.type,
    countryCode: alpha2,
    countryName,
    regionCode,
  };
}

/**
 * Lookup subdivision by full ISO 3166-2 code
 *
 * @param code - Full subdivision code (e.g., "US-CA", "SE-O")
 * @returns Subdivision object or null if not found
 *
 * @example
 * whereCode('US-CA') // { code: 'US-CA', name: 'California', type: 'State', ... }
 * whereCode('XX-YY') // null
 */
export function whereCode(code: string): Subdivision | null {
  const parsed = parseSubdivisionCode(code);
  if (!parsed) return null;

  // Resolve country code (handles alpha-3 like "USA-CA")
  const alpha2 = resolveAlpha2(parsed.country);
  if (!alpha2) return null;

  const subdivisions = getSubdivisions(alpha2);
  if (!subdivisions) return null;

  // Try exact code match first
  const fullCode = `${alpha2}-${parsed.region}`;
  let info = subdivisions[fullCode];

  // If not found, try case-insensitive region code match
  if (!info) {
    const upperRegion = parsed.region.toUpperCase();
    for (const [subCode, subInfo] of Object.entries(subdivisions)) {
      const subRegion = subCode.split('-').slice(1).join('-');
      if (subRegion.toUpperCase() === upperRegion) {
        info = subInfo;
        return buildSubdivision(alpha2, subCode, info);
      }
    }
  }

  // If still not found, try matching by name
  if (!info) {
    const searchName = parsed.region.toUpperCase();
    for (const [subCode, subInfo] of Object.entries(subdivisions)) {
      if (subInfo.name.toUpperCase() === searchName) {
        return buildSubdivision(alpha2, subCode, subInfo);
      }
    }
    return null;
  }

  return buildSubdivision(alpha2, fullCode, info);
}

/**
 * Lookup subdivision by country code and region code
 *
 * @param countryCode - Country code (alpha-2 or alpha-3)
 * @param regionCode - Region/subdivision code (e.g., "CA", "O")
 * @returns Subdivision object or null if not found
 *
 * @example
 * where('US', 'CA')  // { code: 'US-CA', name: 'California', ... }
 * where('USA', 'CA') // { code: 'US-CA', name: 'California', ... }
 * where('US', 'XX')  // null
 */
export function where(
  countryCode: string,
  regionCode: string
): Subdivision | null {
  const alpha2 = resolveAlpha2(countryCode);
  if (!alpha2) return null;

  const subdivisions = getSubdivisions(alpha2);
  if (!subdivisions) return null;

  const normalizedRegion = normalize(regionCode);
  const fullCode = `${alpha2}-${normalizedRegion}`;

  const info = subdivisions[fullCode];
  if (!info) return null;

  return buildSubdivision(alpha2, fullCode, info);
}

/**
 * Lookup subdivision by country code and subdivision name
 *
 * @param countryCode - Country code (alpha-2 or alpha-3)
 * @param name - Subdivision name (case-insensitive)
 * @returns Subdivision object or null if not found
 *
 * @example
 * whereName('US', 'California') // { code: 'US-CA', name: 'California', ... }
 * whereName('US', 'california') // { code: 'US-CA', ... } (case-insensitive)
 * whereName('US', 'Narnia')     // null
 */
export function whereName(
  countryCode: string,
  name: string
): Subdivision | null {
  const alpha2 = resolveAlpha2(countryCode);
  if (!alpha2) return null;

  const subdivisions = getSubdivisions(alpha2);
  if (!subdivisions) return null;

  const searchName = normalize(name);

  for (const [code, info] of Object.entries(subdivisions)) {
    if (info.name.toUpperCase() === searchName) {
      return buildSubdivision(alpha2, code, info);
    }
  }

  return null;
}

/**
 * Get all subdivisions for a country
 *
 * @param countryCode - Country code (alpha-2 or alpha-3)
 * @returns Array of Subdivision objects (empty if country not found or has no subdivisions)
 *
 * @example
 * forCountry('US') // [{ code: 'US-AL', ... }, { code: 'US-AK', ... }, ...]
 * forCountry('XX') // []
 */
export function forCountry(countryCode: string): Subdivision[] {
  const alpha2 = resolveAlpha2(countryCode);
  if (!alpha2) return [];

  const subdivisions = getSubdivisions(alpha2);
  if (!subdivisions) return [];

  return Object.entries(subdivisions)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([code, info]) => buildSubdivision(alpha2, code, info));
}

/**
 * Get all subdivisions (from all registered countries)
 *
 * @returns Array of all Subdivision objects
 *
 * @example
 * all() // [{ code: 'AD-02', ... }, { code: 'AD-03', ... }, ...]
 */
export function all(): Subdivision[] {
  const allData = getAllSubdivisions();
  const result: Subdivision[] = [];

  for (const [alpha2, subdivisions] of Object.entries(allData)) {
    for (const [code, info] of Object.entries(subdivisions)) {
      result.push(buildSubdivision(alpha2, code, info));
    }
  }

  return result.sort((a, b) => a.code.localeCompare(b.code));
}

/**
 * Check if a country has registered subdivisions
 *
 * @param countryCode - Country code (alpha-2 or alpha-3)
 * @returns true if country has subdivisions registered
 *
 * @example
 * hasSubdivisions('US') // true (if US data is imported)
 * hasSubdivisions('XX') // false
 */
export function hasSubdivisions(countryCode: string): boolean {
  const alpha2 = resolveAlpha2(countryCode);
  if (!alpha2) return false;
  return registryHasSubdivisions(alpha2);
}
