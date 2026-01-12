/**
 * Postal code lookup functions
 */

import type { PostalCodeInfo } from '../types';
import { postalCodes, countriesWithoutPostalCodes } from './data';
import { resolveAlpha2 } from '../country';

/**
 * Check if a country uses a postal code system
 *
 * @param countryCode - Country code (alpha-2, alpha-3, or numeric)
 * @returns true if the country uses postal codes, false otherwise
 *
 * @example
 * hasPostalCode('US');  // true
 * hasPostalCode('GB');  // true
 * hasPostalCode('HK');  // false (Hong Kong has no postal codes)
 * hasPostalCode('AE');  // false (UAE has no postal codes)
 */
export function hasPostalCode(countryCode: string | number): boolean {
  const alpha2 = resolveAlpha2(countryCode);
  if (!alpha2) {
    return false;
  }
  return !countriesWithoutPostalCodes.has(alpha2) && alpha2 in postalCodes;
}

/**
 * Get the regex pattern for a country's postal code
 *
 * @param countryCode - Country code (alpha-2, alpha-3, or numeric)
 * @returns RegExp pattern or null if country has no postal code system
 *
 * @example
 * getPattern('US');  // /^\d{5}(-\d{4})?$/
 * getPattern('GB');  // /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i
 * getPattern('HK');  // null
 */
export function getPattern(countryCode: string | number): RegExp | null {
  const alpha2 = resolveAlpha2(countryCode);
  if (!alpha2) {
    return null;
  }
  return postalCodes[alpha2]?.regex ?? null;
}

/**
 * Get human-readable format string for a country's postal code
 *
 * @param countryCode - Country code (alpha-2, alpha-3, or numeric)
 * @returns Format string or null if country has no postal code system
 *
 * @example
 * getFormat('US');  // 'NNNNN or NNNNN-NNNN'
 * getFormat('GB');  // 'AA9A 9AA'
 * getFormat('CA');  // 'A1A 1A1'
 * getFormat('HK');  // null
 */
export function getFormat(countryCode: string | number): string | null {
  const alpha2 = resolveAlpha2(countryCode);
  if (!alpha2) {
    return null;
  }
  return postalCodes[alpha2]?.format ?? null;
}

/**
 * Get local terminology for a country's postal code
 *
 * @param countryCode - Country code (alpha-2, alpha-3, or numeric)
 * @returns Local name or null if country has no postal code system
 *
 * @example
 * getName('US');  // 'ZIP Code'
 * getName('IN');  // 'PIN Code'
 * getName('GB');  // 'Postcode'
 * getName('DE');  // 'PLZ'
 * getName('BR');  // 'CEP'
 * getName('JP');  // '郵便番号'
 * getName('HK');  // null
 */
export function getName(countryCode: string | number): string | null {
  const alpha2 = resolveAlpha2(countryCode);
  if (!alpha2) {
    return null;
  }
  return postalCodes[alpha2]?.name ?? null;
}

/**
 * Get full postal code info for a country
 *
 * @param countryCode - Country code (alpha-2, alpha-3, or numeric)
 * @returns PostalCodeInfo object or null if country has no postal code system
 *
 * @example
 * getInfo('US');
 * // { regex: /^\d{5}(-\d{4})?$/, format: 'NNNNN or NNNNN-NNNN', name: 'ZIP Code' }
 */
export function getInfo(countryCode: string | number): PostalCodeInfo | null {
  const alpha2 = resolveAlpha2(countryCode);
  if (!alpha2) {
    return null;
  }
  return postalCodes[alpha2] ?? null;
}
