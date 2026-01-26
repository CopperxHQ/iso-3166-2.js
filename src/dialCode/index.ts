/**
 * Dial Code module
 *
 * Provides international dialing code lookup functions.
 * Powered by libphonenumber-js.
 */

import * as lookup from './lookup';

// ============ Namespace Export ============

/**
 * Dial code functions
 * Get international dialing codes for countries
 */
export const dialCode = {
  getDialCode: lookup.getDialCode,
  getDialCodes: lookup.getDialCodes,
  getDialCodeInfo: lookup.getDialCodeInfo,
  isValidPhoneCountry: lookup.isValidPhoneCountry,
  getSupportedCountries: lookup.getSupportedCountries,
};

// ============ Named Exports ============

export {
  getDialCode,
  getDialCodes,
  getDialCodeInfo,
  isValidPhoneCountry,
  getSupportedCountries,
} from './lookup';
