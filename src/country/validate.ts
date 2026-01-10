import type { CountryCodeFormat } from '../types';
import { countries, alpha3Index, numericIndex, nameIndex } from './data';
import { normalize } from '../utils';

/**
 * Check if string is a valid ISO 3166-1 alpha-2 code
 *
 * @param code - Code to validate
 * @returns true if valid alpha-2 code
 *
 * @example
 * isAlpha2('US')  // true
 * isAlpha2('USA') // false (this is alpha-3)
 * isAlpha2('XX')  // false
 */
export function isAlpha2(code: string): boolean {
  if (!code || code.length !== 2) return false;
  const normalized = normalize(code);
  return normalized in countries;
}

/**
 * Check if string is a valid ISO 3166-1 alpha-3 code
 *
 * @param code - Code to validate
 * @returns true if valid alpha-3 code
 *
 * @example
 * isAlpha3('USA') // true
 * isAlpha3('US')  // false (this is alpha-2)
 * isAlpha3('XXX') // false
 */
export function isAlpha3(code: string): boolean {
  if (!code || code.length !== 3) return false;
  const normalized = normalize(code);
  return normalized in alpha3Index;
}

/**
 * Check if value is a valid ISO 3166-1 numeric code
 *
 * @param code - Code to validate (string or number)
 * @returns true if valid numeric code
 *
 * @example
 * isNumeric('840') // true
 * isNumeric(840)   // true
 * isNumeric('999') // false
 */
export function isNumeric(code: string | number): boolean {
  const normalized = normalize(code);
  if (!normalized) return false;
  // Check if it's a valid number
  if (!/^\d+$/.test(normalized)) return false;
  const padded = normalized.padStart(3, '0');
  return padded in numericIndex;
}

/**
 * Check if string is a valid country name
 *
 * @param name - Name to validate
 * @returns true if valid country name
 *
 * @example
 * isCountryName('United States') // true
 * isCountryName('united states') // true (case-insensitive)
 * isCountryName('Narnia')        // false
 */
export function isCountryName(name: string): boolean {
  if (!name) return false;
  const normalized = normalize(name);
  return normalized in nameIndex;
}

/**
 * Check if value is any valid country identifier
 * (alpha-2, alpha-3, numeric, or name)
 *
 * @param value - Value to validate
 * @returns true if valid country identifier
 *
 * @example
 * isValid('US')            // true
 * isValid('USA')           // true
 * isValid(840)             // true
 * isValid('United States') // true
 * isValid('XX')            // false
 */
export function isValid(value: string | number): boolean {
  const normalized = normalize(value);
  if (!normalized) return false;

  // Check alpha-2
  if (normalized in countries) return true;

  // Check alpha-3
  if (normalized in alpha3Index) return true;

  // Check numeric
  if (/^\d+$/.test(normalized)) {
    const padded = normalized.padStart(3, '0');
    if (padded in numericIndex) return true;
  }

  // Check name
  if (normalized in nameIndex) return true;

  return false;
}

/**
 * Detect the format of a country code
 *
 * @param code - Code to detect format of
 * @returns Detected format or null if invalid
 *
 * @example
 * detectFormat('US')            // 'alpha2'
 * detectFormat('USA')           // 'alpha3'
 * detectFormat('840')           // 'numeric'
 * detectFormat('United States') // 'name'
 * detectFormat('XX')            // null
 */
export function detectFormat(
  code: string | number
): CountryCodeFormat | 'name' | null {
  const normalized = normalize(code);
  if (!normalized) return null;

  // Check alpha-2 (2 letters)
  if (normalized.length === 2 && /^[A-Z]+$/.test(normalized)) {
    if (normalized in countries) return 'alpha2';
  }

  // Check alpha-3 (3 letters)
  if (normalized.length === 3 && /^[A-Z]+$/.test(normalized)) {
    if (normalized in alpha3Index) return 'alpha3';
  }

  // Check numeric (digits only)
  if (/^\d+$/.test(normalized)) {
    const padded = normalized.padStart(3, '0');
    if (padded in numericIndex) return 'numeric';
  }

  // Check name
  if (normalized in nameIndex) return 'name';

  return null;
}
