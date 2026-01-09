// Country module - ISO 3166-1 functionality

// Lookup functions
export {
  whereAlpha2,
  whereAlpha3,
  whereNumeric,
  whereName,
  all,
  withSubdivisions,
  resolveAlpha2,
} from './lookup';

// Conversion functions
export {
  alpha2ToAlpha3,
  alpha3ToAlpha2,
  alpha2ToNumeric,
  alpha3ToNumeric,
  numericToAlpha2,
  numericToAlpha3,
  toName,
  convert,
} from './convert';

// Validation functions
export {
  isAlpha2,
  isAlpha3,
  isNumeric,
  isCountryName,
  isValid,
  detectFormat,
} from './validate';

// Re-export data for direct access
export { countries, alpha3Index, numericIndex, nameIndex } from './data';
