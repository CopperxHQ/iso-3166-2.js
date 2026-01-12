/**
 * iso-3166
 *
 * Complete ISO 3166-1 (countries) and ISO 3166-2 (subdivisions) lookup library.
 *
 * @example
 * // Namespaced usage (recommended)
 * import { country, subdivision } from 'iso-3166';
 *
 * country.whereAlpha2('US');
 * subdivision.whereCode('US-CA');
 *
 * @example
 * // Direct imports (tree-shakeable)
 * import { whereAlpha2 } from 'iso-3166/country';
 * import { whereCode } from 'iso-3166/subdivision';
 *
 * @example
 * // Selective subdivision loading
 * import { whereAlpha2 } from 'iso-3166/country';
 * import 'iso-3166/subdivision/US';
 * import { whereCode } from 'iso-3166/subdivision';
 */

// Import all subdivision data to register them
import './subdivision/data/all';

// Import modules
import * as countryModule from './country';
import * as subdivisionModule from './subdivision';
import * as postalCodeModule from './postalCode';

// ============ Namespaced Exports ============

/**
 * Country functions (ISO 3166-1)
 */
export const country = {
  // Lookups
  whereAlpha2: countryModule.whereAlpha2,
  whereAlpha3: countryModule.whereAlpha3,
  whereNumeric: countryModule.whereNumeric,
  whereName: countryModule.whereName,
  all: countryModule.all,
  withSubdivisions: countryModule.withSubdivisions,

  // Conversions
  alpha2ToAlpha3: countryModule.alpha2ToAlpha3,
  alpha3ToAlpha2: countryModule.alpha3ToAlpha2,
  alpha2ToNumeric: countryModule.alpha2ToNumeric,
  alpha3ToNumeric: countryModule.alpha3ToNumeric,
  numericToAlpha2: countryModule.numericToAlpha2,
  numericToAlpha3: countryModule.numericToAlpha3,
  toName: countryModule.toName,
  convert: countryModule.convert,

  // Validation
  isAlpha2: countryModule.isAlpha2,
  isAlpha3: countryModule.isAlpha3,
  isNumeric: countryModule.isNumeric,
  isCountryName: countryModule.isCountryName,
  isValid: countryModule.isValid,
  detectFormat: countryModule.detectFormat,

  // Postal code proxies
  isValidPostalCode: postalCodeModule.isValid,
  hasPostalCode: postalCodeModule.hasPostalCode,
  getPostalCodePattern: postalCodeModule.getPattern,
  getPostalCodeFormat: postalCodeModule.getFormat,
  getPostalCodeName: postalCodeModule.getName,
  getPostalCodeInfo: postalCodeModule.getInfo,
};

/**
 * Subdivision functions (ISO 3166-2)
 */
export const subdivision = {
  // Lookups
  whereCode: subdivisionModule.whereCode,
  where: subdivisionModule.where,
  whereName: subdivisionModule.whereName,
  forCountry: subdivisionModule.forCountry,
  all: subdivisionModule.all,
  hasSubdivisions: subdivisionModule.hasSubdivisions,

  // Conversions
  toRegionCode: subdivisionModule.toRegionCode,
  toFullCode: subdivisionModule.toFullCode,
  toName: subdivisionModule.toName,
  toNameFrom: subdivisionModule.toNameFrom,
  toCountryCode: subdivisionModule.toCountryCode,

  // Validation
  isValidCode: subdivisionModule.isValidCode,
  isValidRegion: subdivisionModule.isValidRegion,
  isValidName: subdivisionModule.isValidName,
};

/**
 * Postal code functions
 * Validates and looks up postal codes, ZIP codes, PIN codes worldwide
 */
export const postalCode = {
  isValid: postalCodeModule.isValid,
  hasPostalCode: postalCodeModule.hasPostalCode,
  getPattern: postalCodeModule.getPattern,
  getFormat: postalCodeModule.getFormat,
  getName: postalCodeModule.getName,
  getInfo: postalCodeModule.getInfo,
};

/**
 * Alias for postalCode (US terminology)
 * @example zipCode.isValid('US', '90210')
 */
export const zipCode = postalCode;

/**
 * Alias for postalCode (India terminology)
 * @example pinCode.isValid('IN', '110001')
 */
export const pinCode = postalCode;

/**
 * Alias for postalCode (UK/AU/NZ terminology)
 * @example postcode.isValid('GB', 'SW1A 1AA')
 */
export const postcode = postalCode;

// ============ Direct Exports (for tree-shaking) ============

// Country lookups
export {
  whereAlpha2,
  whereAlpha3,
  whereNumeric,
  whereName as whereCountry,
  all as allCountries,
  withSubdivisions,
  resolveAlpha2,
} from './country';

// Country conversions
export {
  alpha2ToAlpha3,
  alpha3ToAlpha2,
  alpha2ToNumeric,
  alpha3ToNumeric,
  numericToAlpha2,
  numericToAlpha3,
  toName as countryToName,
  convert as convertCountryCode,
} from './country';

// Country validation
export {
  isAlpha2,
  isAlpha3,
  isNumeric,
  isCountryName,
  isValid as isValidCountry,
  detectFormat as detectCountryFormat,
} from './country';

// Subdivision lookups
export {
  whereCode as whereSubdivision,
  where as whereSubdivisionByRegion,
  whereName as whereSubdivisionByName,
  forCountry as subdivisionsForCountry,
  all as allSubdivisions,
} from './subdivision';

// Subdivision conversions
export {
  toRegionCode,
  toFullCode,
  toName as subdivisionToName,
  toNameFrom as subdivisionToNameFrom,
  toCountryCode as subdivisionToCountryCode,
} from './subdivision';

// Subdivision validation
export {
  isValidCode as isValidSubdivisionCode,
  isValidRegion,
  isValidName as isValidSubdivisionName,
  hasSubdivisions,
} from './subdivision';

// Postal code functions
export {
  isValid as isValidPostalCode,
  hasPostalCode,
  getPattern as getPostalCodePattern,
  getFormat as getPostalCodeFormat,
  getName as getPostalCodeName,
  getInfo as getPostalCodeInfo,
} from './postalCode';

// ============ Data Exports ============

export { countries, alpha3Index, numericIndex, nameIndex } from './country';
export {
  getSubdivisions,
  getAllSubdivisions,
  getRegisteredCountries,
} from './subdivision';
export { postalCodes, countriesWithoutPostalCodes } from './postalCode';

// ============ Type Exports ============

export type {
  Country,
  Subdivision,
  SubdivisionInfo,
  CountryWithSubdivisions,
  CountryCodeFormat,
  CountryRecord,
  CountryData,
  SubdivisionData,
  PostalCodeInfo,
} from './types';

// ============ Default Export ============

/**
 * Default export for compatibility
 * Provides country, subdivision, and postal code namespaces
 */
export default {
  country,
  subdivision,
  postalCode,
  zipCode,
  pinCode,
  postcode,
};
