/**
 * Postal code validation functions
 */

import { postalCodes, countriesWithoutPostalCodes } from './data';
import { resolveAlpha2 } from '../country';

/**
 * Normalize postal code for lenient matching
 * - Trims whitespace
 * - Converts to uppercase
 * - Preserves internal spaces/hyphens (some countries require them)
 */
function normalizePostalCode(postalCode: string): string {
  return postalCode.trim().toUpperCase();
}

/**
 * Validate postal code for a country (lenient mode)
 *
 * Lenient validation:
 * - Case-insensitive for alpha codes
 * - Trims leading/trailing whitespace
 *
 * @param countryCode - Country code (alpha-2, alpha-3, or numeric)
 * @param postalCode - Postal code to validate
 * @returns true if valid, false otherwise
 *
 * @example
 * isValid('US', '90210');           // true
 * isValid('US', '90210-1234');      // true
 * isValid('GB', 'SW1A 1AA');        // true
 * isValid('GB', 'sw1a 1aa');        // true (case-insensitive)
 * isValid('IN', '110001');          // true
 * isValid('HK', '999077');          // false (HK has no postal codes)
 */
export function isValid(
  countryCode: string | number,
  postalCode: string
): boolean {
  if (!postalCode || typeof postalCode !== 'string') {
    return false;
  }

  const alpha2 = resolveAlpha2(countryCode);
  if (!alpha2) {
    return false;
  }

  // Countries without postal codes
  if (countriesWithoutPostalCodes.has(alpha2)) {
    return false;
  }

  const info = postalCodes[alpha2];
  if (!info) {
    return false;
  }

  const normalized = normalizePostalCode(postalCode);
  return info.regex.test(normalized);
}
