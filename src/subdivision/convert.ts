import { normalize, parseSubdivisionCode } from '../utils';
import { resolveAlpha2 } from '../country/lookup';
import { getSubdivisions } from './registry';

/**
 * Extract region code from full subdivision code
 *
 * @param code - Full subdivision code (e.g., "US-CA")
 * @returns Region code (e.g., "CA") or null if invalid
 *
 * @example
 * toRegionCode('US-CA')  // 'CA'
 * toRegionCode('GB-EAW') // 'EAW'
 * toRegionCode('invalid') // null
 */
export function toRegionCode(code: string): string | null {
  const parsed = parseSubdivisionCode(code);
  if (!parsed) return null;
  return parsed.region;
}

/**
 * Build full subdivision code from country and region
 *
 * @param countryCode - Country code (alpha-2 or alpha-3)
 * @param regionCode - Region code
 * @returns Full code (e.g., "US-CA") or null if country invalid
 *
 * @example
 * toFullCode('US', 'CA')  // 'US-CA'
 * toFullCode('USA', 'CA') // 'US-CA' (normalizes alpha-3)
 * toFullCode('XX', 'YY')  // null
 */
export function toFullCode(
  countryCode: string,
  regionCode: string
): string | null {
  const alpha2 = resolveAlpha2(countryCode);
  if (!alpha2) return null;

  const normalizedRegion = normalize(regionCode);
  const fullCode = `${alpha2}-${normalizedRegion}`;

  // Verify the subdivision exists
  const subdivisions = getSubdivisions(alpha2);
  if (!subdivisions || !(fullCode in subdivisions)) return null;

  return fullCode;
}

/**
 * Get subdivision name from full code
 *
 * @param code - Full subdivision code (e.g., "US-CA")
 * @returns Subdivision name or null if not found
 *
 * @example
 * toName('US-CA') // 'California'
 * toName('XX-YY') // null
 */
export function toName(code: string): string | null {
  const parsed = parseSubdivisionCode(code);
  if (!parsed) return null;

  const alpha2 = resolveAlpha2(parsed.country);
  if (!alpha2) return null;

  const subdivisions = getSubdivisions(alpha2);
  if (!subdivisions) return null;

  const fullCode = `${alpha2}-${parsed.region}`;
  const info = subdivisions[fullCode];

  return info?.name || null;
}

/**
 * Get subdivision name from country and region code
 *
 * @param countryCode - Country code (alpha-2 or alpha-3)
 * @param regionCode - Region code
 * @returns Subdivision name or null if not found
 *
 * @example
 * toNameFrom('US', 'CA')  // 'California'
 * toNameFrom('USA', 'CA') // 'California'
 * toNameFrom('US', 'XX')  // null
 */
export function toNameFrom(
  countryCode: string,
  regionCode: string
): string | null {
  const alpha2 = resolveAlpha2(countryCode);
  if (!alpha2) return null;

  const subdivisions = getSubdivisions(alpha2);
  if (!subdivisions) return null;

  const normalizedRegion = normalize(regionCode);
  const fullCode = `${alpha2}-${normalizedRegion}`;
  const info = subdivisions[fullCode];

  return info?.name || null;
}

/**
 * Extract country code from full subdivision code
 *
 * @param code - Full subdivision code (e.g., "US-CA")
 * @returns Alpha-2 country code or null if invalid
 *
 * @example
 * toCountryCode('US-CA')  // 'US'
 * toCountryCode('USA-CA') // 'US' (normalizes alpha-3)
 * toCountryCode('XX-YY')  // null
 */
export function toCountryCode(code: string): string | null {
  const parsed = parseSubdivisionCode(code);
  if (!parsed) return null;

  return resolveAlpha2(parsed.country);
}
