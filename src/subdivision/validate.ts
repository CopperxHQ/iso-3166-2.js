import { normalize, parseSubdivisionCode } from '../utils';
import { resolveAlpha2 } from '../country/lookup';
import { getSubdivisions, hasSubdivisions as registryHas } from './registry';

/**
 * Check if string is a valid full subdivision code
 *
 * @param code - Code to validate (e.g., "US-CA")
 * @returns true if valid subdivision code
 *
 * @example
 * isValidCode('US-CA') // true
 * isValidCode('XX-YY') // false
 */
export function isValidCode(code: string): boolean {
  const parsed = parseSubdivisionCode(code);
  if (!parsed) return false;

  const alpha2 = resolveAlpha2(parsed.country);
  if (!alpha2) return false;

  const subdivisions = getSubdivisions(alpha2);
  if (!subdivisions) return false;

  const fullCode = `${alpha2}-${parsed.region}`;
  return fullCode in subdivisions;
}

/**
 * Check if region code is valid for a specific country
 *
 * @param countryCode - Country code (alpha-2 or alpha-3)
 * @param regionCode - Region code to validate
 * @returns true if valid region for the country
 *
 * @example
 * isValidRegion('US', 'CA') // true
 * isValidRegion('US', 'XX') // false
 */
export function isValidRegion(
  countryCode: string,
  regionCode: string
): boolean {
  const alpha2 = resolveAlpha2(countryCode);
  if (!alpha2) return false;

  const subdivisions = getSubdivisions(alpha2);
  if (!subdivisions) return false;

  const normalizedRegion = normalize(regionCode);
  const fullCode = `${alpha2}-${normalizedRegion}`;

  return fullCode in subdivisions;
}

/**
 * Check if subdivision name exists in a country
 *
 * @param countryCode - Country code (alpha-2 or alpha-3)
 * @param name - Subdivision name to validate (case-insensitive)
 * @returns true if name exists for the country
 *
 * @example
 * isValidName('US', 'California') // true
 * isValidName('US', 'Narnia')     // false
 */
export function isValidName(countryCode: string, name: string): boolean {
  const alpha2 = resolveAlpha2(countryCode);
  if (!alpha2) return false;

  const subdivisions = getSubdivisions(alpha2);
  if (!subdivisions) return false;

  const searchName = normalize(name);

  for (const info of Object.values(subdivisions)) {
    if (info.name.toUpperCase() === searchName) {
      return true;
    }
  }

  return false;
}

/**
 * Check if a country has any subdivisions registered
 *
 * @param countryCode - Country code (alpha-2 or alpha-3)
 * @returns true if country has subdivisions
 *
 * @example
 * hasSubdivisions('US') // true (if US data imported)
 * hasSubdivisions('XX') // false
 */
export function hasSubdivisions(countryCode: string): boolean {
  const alpha2 = resolveAlpha2(countryCode);
  if (!alpha2) return false;
  return registryHas(alpha2);
}
