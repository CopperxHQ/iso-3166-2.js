// Subdivision module - ISO 3166-2 functionality

// Lookup functions
export {
  whereCode,
  where,
  whereName,
  forCountry,
  all,
  hasSubdivisions,
} from './lookup';

// Conversion functions
export {
  toRegionCode,
  toFullCode,
  toName,
  toNameFrom,
  toCountryCode,
} from './convert';

// Validation functions
export {
  isValidCode,
  isValidRegion,
  isValidName,
  hasSubdivisions as isRegistered,
} from './validate';

// Registry functions for advanced use
export {
  register,
  getSubdivisions,
  getCountryName,
  getAllSubdivisions,
  getAllCountryNames,
  getRegisteredCountries,
} from './registry';
