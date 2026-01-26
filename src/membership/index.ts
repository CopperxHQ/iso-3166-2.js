/**
 * Membership module
 *
 * Provides EU, SEPA, EEA, Eurozone, and Schengen membership checks.
 */

import * as lookup from './lookup';

// ============ Namespace Export ============

/**
 * Membership functions
 * Check EU, SEPA, EEA, Eurozone, and Schengen membership
 */
export const membership = {
  isEU: lookup.isEU,
  isSEPA: lookup.isSEPA,
  isEEA: lookup.isEEA,
  isEurozone: lookup.isEurozone,
  isSchengen: lookup.isSchengen,
  isMember: lookup.isMember,
  getMemberships: lookup.getMemberships,
  getMembers: lookup.getMembers,
};

// ============ Named Exports ============

export {
  isEU,
  isSEPA,
  isEEA,
  isEurozone,
  isSchengen,
  isMember,
  getMemberships,
  getMembers,
} from './lookup';

// Data exports (for advanced usage)
export {
  EU_MEMBERS,
  SEPA_MEMBERS,
  EEA_MEMBERS,
  EUROZONE_MEMBERS,
  SCHENGEN_MEMBERS,
} from './data';
