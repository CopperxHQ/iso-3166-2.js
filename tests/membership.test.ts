import { describe, it, expect } from 'vitest';
import {
  isEU,
  isSEPA,
  isEEA,
  isEurozone,
  isSchengen,
  isMember,
  getMemberships,
  getMembers,
  EU_MEMBERS,
  SEPA_MEMBERS,
  EEA_MEMBERS,
  EUROZONE_MEMBERS,
  SCHENGEN_MEMBERS,
} from '../src/membership';

describe('Membership Module', () => {
  describe('isEU', () => {
    it('should return true for EU members', () => {
      expect(isEU('FR')).toBe(true);
      expect(isEU('DE')).toBe(true);
      expect(isEU('IT')).toBe(true);
      expect(isEU('ES')).toBe(true);
      expect(isEU('PL')).toBe(true);
    });

    it('should return false for non-EU members', () => {
      expect(isEU('US')).toBe(false);
      expect(isEU('GB')).toBe(false); // Brexit
      expect(isEU('CH')).toBe(false);
      expect(isEU('NO')).toBe(false);
    });

    it('should be case-insensitive', () => {
      expect(isEU('fr')).toBe(true);
      expect(isEU('Fr')).toBe(true);
    });

    it('should return false for invalid country', () => {
      expect(isEU('XX')).toBe(false);
      expect(isEU('')).toBe(false);
    });
  });

  describe('isSEPA', () => {
    it('should return true for EU members', () => {
      expect(isSEPA('FR')).toBe(true);
      expect(isSEPA('DE')).toBe(true);
    });

    it('should return true for non-EU SEPA members', () => {
      expect(isSEPA('CH')).toBe(true); // Switzerland
      expect(isSEPA('NO')).toBe(true); // Norway
      expect(isSEPA('IS')).toBe(true); // Iceland
      expect(isSEPA('LI')).toBe(true); // Liechtenstein
      expect(isSEPA('GB')).toBe(true); // UK still in SEPA
      expect(isSEPA('MC')).toBe(true); // Monaco
      expect(isSEPA('SM')).toBe(true); // San Marino
      expect(isSEPA('AD')).toBe(true); // Andorra
      expect(isSEPA('VA')).toBe(true); // Vatican
      expect(isSEPA('GI')).toBe(true); // Gibraltar
    });

    it('should return false for non-SEPA countries', () => {
      expect(isSEPA('US')).toBe(false);
      expect(isSEPA('JP')).toBe(false);
      expect(isSEPA('CN')).toBe(false);
    });
  });

  describe('isEEA', () => {
    it('should return true for EU members', () => {
      expect(isEEA('FR')).toBe(true);
      expect(isEEA('DE')).toBe(true);
    });

    it('should return true for EFTA EEA members', () => {
      expect(isEEA('NO')).toBe(true);
      expect(isEEA('IS')).toBe(true);
      expect(isEEA('LI')).toBe(true);
    });

    it('should return false for Switzerland (EFTA but not EEA)', () => {
      expect(isEEA('CH')).toBe(false);
    });

    it('should return false for non-EEA', () => {
      expect(isEEA('US')).toBe(false);
      expect(isEEA('GB')).toBe(false);
    });
  });

  describe('isEurozone', () => {
    it('should return true for Eurozone members', () => {
      expect(isEurozone('FR')).toBe(true);
      expect(isEurozone('DE')).toBe(true);
      expect(isEurozone('IT')).toBe(true);
      expect(isEurozone('ES')).toBe(true);
      expect(isEurozone('HR')).toBe(true); // Croatia joined 2023
    });

    it('should return false for EU non-Eurozone members', () => {
      expect(isEurozone('SE')).toBe(false); // Sweden uses SEK
      expect(isEurozone('DK')).toBe(false); // Denmark uses DKK
      expect(isEurozone('PL')).toBe(false); // Poland uses PLN
      expect(isEurozone('CZ')).toBe(false); // Czech uses CZK
      expect(isEurozone('HU')).toBe(false); // Hungary uses HUF
      expect(isEurozone('RO')).toBe(false); // Romania uses RON
      expect(isEurozone('BG')).toBe(false); // Bulgaria uses BGN
    });

    it('should return false for non-EU', () => {
      expect(isEurozone('US')).toBe(false);
      expect(isEurozone('GB')).toBe(false);
    });
  });

  describe('isSchengen', () => {
    it('should return true for Schengen members', () => {
      expect(isSchengen('FR')).toBe(true);
      expect(isSchengen('DE')).toBe(true);
      expect(isSchengen('HR')).toBe(true); // Croatia joined 2023
    });

    it('should return true for non-EU Schengen members', () => {
      expect(isSchengen('CH')).toBe(true);
      expect(isSchengen('NO')).toBe(true);
      expect(isSchengen('IS')).toBe(true);
      expect(isSchengen('LI')).toBe(true);
    });

    it('should return false for EU non-Schengen members', () => {
      expect(isSchengen('IE')).toBe(false); // Ireland opted out
      expect(isSchengen('CY')).toBe(false); // Cyprus not yet in
    });

    it('should return false for non-Schengen', () => {
      expect(isSchengen('US')).toBe(false);
      expect(isSchengen('GB')).toBe(false);
    });
  });

  describe('isMember', () => {
    it('should check EU membership', () => {
      expect(isMember('FR', 'EU')).toBe(true);
      expect(isMember('GB', 'EU')).toBe(false);
    });

    it('should check SEPA membership', () => {
      expect(isMember('CH', 'SEPA')).toBe(true);
      expect(isMember('US', 'SEPA')).toBe(false);
    });
  });

  describe('getMemberships', () => {
    it('should return all memberships for France', () => {
      const memberships = getMemberships('FR');
      expect(memberships.EU).toBe(true);
      expect(memberships.SEPA).toBe(true);
      expect(memberships.EEA).toBe(true);
      expect(memberships.Eurozone).toBe(true);
      expect(memberships.Schengen).toBe(true);
    });

    it('should return all memberships for Switzerland', () => {
      const memberships = getMemberships('CH');
      expect(memberships.EU).toBe(false);
      expect(memberships.SEPA).toBe(true);
      expect(memberships.EEA).toBe(false);
      expect(memberships.Eurozone).toBe(false);
      expect(memberships.Schengen).toBe(true);
    });

    it('should return all memberships for UK', () => {
      const memberships = getMemberships('GB');
      expect(memberships.EU).toBe(false);
      expect(memberships.SEPA).toBe(true);
      expect(memberships.EEA).toBe(false);
      expect(memberships.Eurozone).toBe(false);
      expect(memberships.Schengen).toBe(false);
    });

    it('should return all false for US', () => {
      const memberships = getMemberships('US');
      expect(memberships.EU).toBe(false);
      expect(memberships.SEPA).toBe(false);
      expect(memberships.EEA).toBe(false);
      expect(memberships.Eurozone).toBe(false);
      expect(memberships.Schengen).toBe(false);
    });
  });

  describe('getMembers', () => {
    it('should return all EU members', () => {
      const members = getMembers('EU');
      expect(members).toHaveLength(27);
      expect(members).toContain('FR');
      expect(members).toContain('DE');
      expect(members).not.toContain('GB');
    });

    it('should return all SEPA members', () => {
      const members = getMembers('SEPA');
      expect(members.length).toBeGreaterThan(27);
      expect(members).toContain('CH');
      expect(members).toContain('GB');
    });

    it('should return all Eurozone members', () => {
      const members = getMembers('Eurozone');
      expect(members).toHaveLength(20);
      expect(members).toContain('FR');
      expect(members).not.toContain('SE');
    });

    it('should return sorted array', () => {
      const members = getMembers('EU');
      const sorted = [...members].sort();
      expect(members).toEqual(sorted);
    });
  });

  describe('Membership Sets', () => {
    it('should have correct EU member count', () => {
      expect(EU_MEMBERS.size).toBe(27);
    });

    it('should have correct EEA member count', () => {
      expect(EEA_MEMBERS.size).toBe(30); // EU 27 + IS, LI, NO
    });

    it('should have correct Eurozone member count', () => {
      expect(EUROZONE_MEMBERS.size).toBe(20);
    });

    it('should have correct Schengen member count', () => {
      expect(SCHENGEN_MEMBERS.size).toBe(27);
    });

    it('should have SEPA include all EEA members', () => {
      for (const country of EEA_MEMBERS) {
        expect(SEPA_MEMBERS.has(country)).toBe(true);
      }
    });
  });
});
