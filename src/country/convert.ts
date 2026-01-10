import type { CountryCodeFormat } from '../types';
import { countries, alpha3Index, numericIndex } from './data';
import { normalize } from '../utils';
import { resolveAlpha2 } from './lookup';

/**
 * Convert alpha-2 code to alpha-3
 *
 * @param code - Alpha-2 country code
 * @returns Alpha-3 code or null if not found
 *
 * @example
 * alpha2ToAlpha3('US') // 'USA'
 * alpha2ToAlpha3('XX') // null
 */
export function alpha2ToAlpha3(code: string): string | null {
  const normalized = normalize(code);
  const record = countries[normalized];
  return record?.alpha3 || null;
}

/**
 * Convert alpha-3 code to alpha-2
 *
 * @param code - Alpha-3 country code
 * @returns Alpha-2 code or null if not found
 *
 * @example
 * alpha3ToAlpha2('USA') // 'US'
 * alpha3ToAlpha2('XXX') // null
 */
export function alpha3ToAlpha2(code: string): string | null {
  const normalized = normalize(code);
  return alpha3Index[normalized] || null;
}

/**
 * Convert alpha-2 code to numeric
 *
 * @param code - Alpha-2 country code
 * @returns Numeric code or null if not found
 *
 * @example
 * alpha2ToNumeric('US') // '840'
 * alpha2ToNumeric('XX') // null
 */
export function alpha2ToNumeric(code: string): string | null {
  const normalized = normalize(code);
  const record = countries[normalized];
  return record?.numeric || null;
}

/**
 * Convert alpha-3 code to numeric
 *
 * @param code - Alpha-3 country code
 * @returns Numeric code or null if not found
 *
 * @example
 * alpha3ToNumeric('USA') // '840'
 * alpha3ToNumeric('XXX') // null
 */
export function alpha3ToNumeric(code: string): string | null {
  const alpha2 = alpha3ToAlpha2(code);
  if (!alpha2) return null;
  return countries[alpha2]?.numeric || null;
}

/**
 * Convert numeric code to alpha-2
 *
 * @param code - Numeric country code
 * @returns Alpha-2 code or null if not found
 *
 * @example
 * numericToAlpha2('840') // 'US'
 * numericToAlpha2(840)   // 'US'
 * numericToAlpha2('999') // null
 */
export function numericToAlpha2(code: string | number): string | null {
  const normalized = normalize(code);
  const padded = normalized.padStart(3, '0');
  return numericIndex[padded] || null;
}

/**
 * Convert numeric code to alpha-3
 *
 * @param code - Numeric country code
 * @returns Alpha-3 code or null if not found
 *
 * @example
 * numericToAlpha3('840') // 'USA'
 * numericToAlpha3(840)   // 'USA'
 * numericToAlpha3('999') // null
 */
export function numericToAlpha3(code: string | number): string | null {
  const alpha2 = numericToAlpha2(code);
  if (!alpha2) return null;
  return countries[alpha2]?.alpha3 || null;
}

/**
 * Get country name from any code format
 *
 * @param code - Country code (alpha-2, alpha-3, or numeric)
 * @returns Country name or null if not found
 *
 * @example
 * toName('US')  // 'United States'
 * toName('USA') // 'United States'
 * toName(840)   // 'United States'
 * toName('XX')  // null
 */
export function toName(code: string | number): string | null {
  const alpha2 = resolveAlpha2(code);
  if (!alpha2) return null;
  return countries[alpha2]?.name || null;
}

/**
 * Convert between any two country code formats
 *
 * @param code - Source country code
 * @param from - Source format
 * @param to - Target format
 * @returns Converted code or null if not found
 *
 * @example
 * convert('US', 'alpha2', 'alpha3')    // 'USA'
 * convert('USA', 'alpha3', 'numeric')  // '840'
 * convert('840', 'numeric', 'alpha2')  // 'US'
 */
export function convert(
  code: string | number,
  from: CountryCodeFormat,
  to: CountryCodeFormat
): string | null {
  // First, resolve to alpha-2
  let alpha2: string | null = null;

  switch (from) {
    case 'alpha2':
      alpha2 = normalize(code) in countries ? normalize(code) : null;
      break;
    case 'alpha3':
      alpha2 = alpha3ToAlpha2(String(code));
      break;
    case 'numeric':
      alpha2 = numericToAlpha2(code);
      break;
  }

  if (!alpha2) return null;

  // Then convert to target format
  switch (to) {
    case 'alpha2':
      return alpha2;
    case 'alpha3':
      return countries[alpha2]?.alpha3 || null;
    case 'numeric':
      return countries[alpha2]?.numeric || null;
  }
}
