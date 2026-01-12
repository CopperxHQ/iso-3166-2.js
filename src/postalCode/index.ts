/**
 * Postal code module
 *
 * Provides validation and lookup functions for postal codes,
 * ZIP codes, PIN codes, and similar address codes worldwide.
 */

// Validation
export { isValid } from './validate';

// Lookups
export { hasPostalCode, getPattern, getFormat, getName, getInfo } from './lookup';

// Data exports (for advanced usage)
export { postalCodes, countriesWithoutPostalCodes } from './data';
