/**
 * Currency module
 *
 * Provides currency lookup functions for countries.
 */

import * as lookup from './lookup';

// ============ Namespace Export ============

/**
 * Currency functions
 * Get currency information for any country
 */
export const currency = {
  getCurrency: lookup.getCurrency,
  getCurrencyCode: lookup.getCurrencyCode,
  getCurrencySymbol: lookup.getCurrencySymbol,
  getCurrencyName: lookup.getCurrencyName,
  getCountriesByCurrency: lookup.getCountriesByCurrency,
  countriesUsingCurrency: lookup.countriesUsingCurrency,
  usesCurrency: lookup.usesCurrency,
};

// ============ Named Exports ============

export {
  getCurrency,
  getCurrencyCode,
  getCurrencySymbol,
  getCurrencyName,
  countriesUsingCurrency,
  getCountriesByCurrency,
  usesCurrency,
} from './lookup';

// Data exports (for advanced usage)
export { currencies, currencyIndex } from './data';
