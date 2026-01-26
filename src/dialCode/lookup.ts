import {
  getCountryCallingCode,
  isSupportedCountry,
  getCountries,
  type CountryCode,
} from 'libphonenumber-js';
import { normalize } from '../utils';
import type { DialCodeInfo } from '../types';

/**
 * Get dial code for a country
 * @param alpha2 - Country alpha-2 code
 * @returns Dial code string with + prefix or null
 * @example
 * getDialCode('US') // '+1'
 * getDialCode('GB') // '+44'
 * getDialCode('FR') // '+33'
 */
export function getDialCode(alpha2: string): string | null {
  const code = normalize(alpha2) as CountryCode;
  if (!isSupportedCountry(code)) return null;
  try {
    return '+' + getCountryCallingCode(code);
  } catch {
    return null;
  }
}

/**
 * Get all dial codes for a country
 * Most countries have only one, but this returns an array for consistency
 * @param alpha2 - Country alpha-2 code
 * @returns Array of dial codes or null
 * @example
 * getDialCodes('US') // ['+1']
 * getDialCodes('GB') // ['+44']
 */
export function getDialCodes(alpha2: string): string[] | null {
  const dialCode = getDialCode(alpha2);
  return dialCode ? [dialCode] : null;
}

/**
 * Get full dial code info for a country
 * @param alpha2 - Country alpha-2 code
 * @returns DialCodeInfo or null
 * @example
 * getDialCodeInfo('US') // { dialCode: '+1', countryCode: 'US' }
 */
export function getDialCodeInfo(alpha2: string): DialCodeInfo | null {
  const code = normalize(alpha2) as CountryCode;
  if (!isSupportedCountry(code)) return null;
  try {
    return {
      dialCode: '+' + getCountryCallingCode(code),
      countryCode: code,
    };
  } catch {
    return null;
  }
}

/**
 * Check if a country code is supported for phone operations
 * @param alpha2 - Country alpha-2 code
 * @returns true if supported
 * @example
 * isValidPhoneCountry('US') // true
 * isValidPhoneCountry('XX') // false
 */
export function isValidPhoneCountry(alpha2: string): boolean {
  return isSupportedCountry(normalize(alpha2) as CountryCode);
}

/**
 * Get all supported country codes
 * @returns Array of alpha-2 country codes
 * @example
 * getSupportedCountries() // ['AC', 'AD', 'AE', 'AF', ...]
 */
export function getSupportedCountries(): string[] {
  return getCountries();
}
