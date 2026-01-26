import { normalize } from '../utils';
import { currencies, currencyIndex } from './data';
import type { CurrencyInfo } from '../types';

/**
 * Get currency for a country
 * @param alpha2 - Country alpha-2 code
 * @returns CurrencyInfo or null
 * @example
 * getCurrency('US') // { code: 'USD', symbol: '$', name: 'US Dollar' }
 * getCurrency('FR') // { code: 'EUR', symbol: '€', name: 'Euro' }
 */
export function getCurrency(alpha2: string): CurrencyInfo | null {
  const code = normalize(alpha2);
  return currencies[code] ?? null;
}

/**
 * Get just the currency code
 * @param alpha2 - Country alpha-2 code
 * @returns ISO 4217 currency code or null
 * @example
 * getCurrencyCode('US') // 'USD'
 * getCurrencyCode('JP') // 'JPY'
 */
export function getCurrencyCode(alpha2: string): string | null {
  const code = normalize(alpha2);
  return currencies[code]?.code ?? null;
}

/**
 * Get just the currency symbol
 * @param alpha2 - Country alpha-2 code
 * @returns Currency symbol or null
 * @example
 * getCurrencySymbol('US') // '$'
 * getCurrencySymbol('GB') // '£'
 * getCurrencySymbol('JP') // '¥'
 */
export function getCurrencySymbol(alpha2: string): string | null {
  const code = normalize(alpha2);
  return currencies[code]?.symbol ?? null;
}

/**
 * Get just the currency name
 * @param alpha2 - Country alpha-2 code
 * @returns Currency name or null
 * @example
 * getCurrencyName('US') // 'US Dollar'
 * getCurrencyName('JP') // 'Japanese Yen'
 */
export function getCurrencyName(alpha2: string): string | null {
  const code = normalize(alpha2);
  return currencies[code]?.name ?? null;
}

/**
 * Get all countries using a specific currency
 * @param currencyCode - ISO 4217 currency code
 * @returns Array of alpha-2 country codes
 * @example
 * countriesUsingCurrency('EUR') // ['AD', 'AT', 'BE', 'CY', 'DE', 'EE', 'ES', 'FI', 'FR', ...]
 * countriesUsingCurrency('USD') // ['AS', 'BQ', 'EC', 'FM', 'GU', 'IO', 'MH', 'MP', 'PA', 'PR', 'PW', 'SV', 'TC', 'TL', 'UM', 'US', 'VG', 'VI']
 */
export function countriesUsingCurrency(currencyCode: string): string[] {
  const code = normalize(currencyCode);
  return currencyIndex[code] ?? [];
}

/**
 * Check if a country uses a specific currency
 * @param alpha2 - Country alpha-2 code
 * @param currencyCode - ISO 4217 currency code
 * @returns true if country uses the currency
 * @example
 * usesCurrency('FR', 'EUR') // true
 * usesCurrency('GB', 'EUR') // false
 */
export function usesCurrency(alpha2: string, currencyCode: string): boolean {
  const country = normalize(alpha2);
  const currency = normalize(currencyCode);
  return currencies[country]?.code === currency;
}

/**
 * Alias for countriesUsingCurrency
 */
export const getCountriesByCurrency = countriesUsingCurrency;
