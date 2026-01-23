import { normalize } from '../utils';
import {
  EU_MEMBERS,
  SEPA_MEMBERS,
  EEA_MEMBERS,
  EUROZONE_MEMBERS,
  SCHENGEN_MEMBERS,
  MEMBERSHIP_SETS,
} from './data';
import type { MembershipType, MembershipInfo } from '../types';

/**
 * Check if country is an EU member
 * @param alpha2 - Country alpha-2 code
 * @returns true if EU member
 * @example
 * isEU('FR') // true
 * isEU('GB') // false (Brexit)
 * isEU('CH') // false
 */
export function isEU(alpha2: string): boolean {
  return EU_MEMBERS.has(normalize(alpha2));
}

/**
 * Check if country is a SEPA member
 * @param alpha2 - Country alpha-2 code
 * @returns true if SEPA member
 * @example
 * isSEPA('FR') // true
 * isSEPA('CH') // true (non-EU SEPA member)
 * isSEPA('GB') // true (still in SEPA)
 * isSEPA('US') // false
 */
export function isSEPA(alpha2: string): boolean {
  return SEPA_MEMBERS.has(normalize(alpha2));
}

/**
 * Check if country is an EEA member
 * @param alpha2 - Country alpha-2 code
 * @returns true if EEA member
 * @example
 * isEEA('FR') // true
 * isEEA('NO') // true (non-EU EEA member)
 * isEEA('CH') // false (EFTA but not EEA)
 */
export function isEEA(alpha2: string): boolean {
  return EEA_MEMBERS.has(normalize(alpha2));
}

/**
 * Check if country uses the Euro
 * @param alpha2 - Country alpha-2 code
 * @returns true if Eurozone member
 * @example
 * isEurozone('FR') // true
 * isEurozone('SE') // false (Sweden uses SEK)
 * isEurozone('DK') // false (Denmark uses DKK)
 */
export function isEurozone(alpha2: string): boolean {
  return EUROZONE_MEMBERS.has(normalize(alpha2));
}

/**
 * Check if country is in the Schengen Area
 * @param alpha2 - Country alpha-2 code
 * @returns true if Schengen member
 * @example
 * isSchengen('FR') // true
 * isSchengen('CH') // true (non-EU Schengen)
 * isSchengen('IE') // false (Ireland opted out)
 * isSchengen('GB') // false
 */
export function isSchengen(alpha2: string): boolean {
  return SCHENGEN_MEMBERS.has(normalize(alpha2));
}

/**
 * Check membership in any group
 * @param alpha2 - Country alpha-2 code
 * @param membershipType - Type of membership to check
 * @returns true if member
 * @example
 * isMember('FR', 'EU') // true
 * isMember('CH', 'SEPA') // true
 */
export function isMember(alpha2: string, membershipType: MembershipType): boolean {
  const set = MEMBERSHIP_SETS[membershipType];
  return set.has(normalize(alpha2));
}

/**
 * Get all memberships for a country
 * @param alpha2 - Country alpha-2 code
 * @returns MembershipInfo object or null if invalid country
 * @example
 * getMemberships('FR')
 * // { EU: true, SEPA: true, EEA: true, Eurozone: true, Schengen: true }
 * getMemberships('CH')
 * // { EU: false, SEPA: true, EEA: false, Eurozone: false, Schengen: true }
 */
export function getMemberships(alpha2: string): MembershipInfo {
  const code = normalize(alpha2);
  return {
    EU: EU_MEMBERS.has(code),
    SEPA: SEPA_MEMBERS.has(code),
    EEA: EEA_MEMBERS.has(code),
    Eurozone: EUROZONE_MEMBERS.has(code),
    Schengen: SCHENGEN_MEMBERS.has(code),
  };
}

/**
 * Get all members of a specific group
 * @param membershipType - Type of membership
 * @returns Array of alpha-2 codes
 * @example
 * getMembers('EU') // ['AT', 'BE', 'BG', ...]
 * getMembers('Eurozone') // ['AT', 'BE', 'CY', ...]
 */
export function getMembers(membershipType: MembershipType): string[] {
  return Array.from(MEMBERSHIP_SETS[membershipType]).sort();
}
