import { describe, it, expect } from 'vitest';

// Import full library to register all subdivisions
import '../src/index';

import {
  whereCode,
  where,
  whereName,
  forCountry,
  all,
  hasSubdivisions,
  toRegionCode,
  toFullCode,
  toName,
  toNameFrom,
  toCountryCode,
  isValidCode,
  isValidRegion,
  isValidName,
} from '../src/subdivision';

describe('Subdivision Lookups', () => {
  describe('whereCode', () => {
    it('should find subdivision by full code', () => {
      const sub = whereCode('US-CA');
      expect(sub).toEqual({
        code: 'US-CA',
        name: 'California',
        type: 'State',
        countryCode: 'US',
        countryName: 'United States',
        regionCode: 'CA',
      });
    });

    it('should be case-insensitive', () => {
      expect(whereCode('us-ca')?.name).toBe('California');
      expect(whereCode('Us-Ca')?.name).toBe('California');
    });

    it('should handle alpha-3 country codes', () => {
      expect(whereCode('USA-CA')?.name).toBe('California');
    });

    it('should find by name in code position', () => {
      expect(whereCode('US-California')?.code).toBe('US-CA');
    });

    it('should return null for invalid code', () => {
      expect(whereCode('XX-YY')).toBeNull();
      expect(whereCode('invalid')).toBeNull();
    });

    it('should handle Swedish counties', () => {
      const sub = whereCode('SE-O');
      expect(sub?.name).toBe('Västra Götalands län');
      expect(sub?.type).toBe('County');
    });
  });

  describe('where', () => {
    it('should find subdivision by country and region code', () => {
      const sub = where('US', 'CA');
      expect(sub?.name).toBe('California');
      expect(sub?.code).toBe('US-CA');
    });

    it('should work with alpha-3 country code', () => {
      const sub = where('USA', 'CA');
      expect(sub?.name).toBe('California');
    });

    it('should return null for invalid combination', () => {
      expect(where('US', 'XX')).toBeNull();
      expect(where('XX', 'CA')).toBeNull();
    });
  });

  describe('whereName', () => {
    it('should find subdivision by name', () => {
      const sub = whereName('US', 'California');
      expect(sub?.code).toBe('US-CA');
    });

    it('should be case-insensitive', () => {
      expect(whereName('US', 'california')?.code).toBe('US-CA');
      expect(whereName('US', 'CALIFORNIA')?.code).toBe('US-CA');
    });

    it('should work with alpha-3 country code', () => {
      const sub = whereName('USA', 'California');
      expect(sub?.code).toBe('US-CA');
    });

    it('should return null for non-existent name', () => {
      expect(whereName('US', 'Narnia')).toBeNull();
    });
  });

  describe('forCountry', () => {
    it('should return all subdivisions for a country', () => {
      const subs = forCountry('US');
      expect(subs.length).toBeGreaterThan(50);
      expect(subs.some((s) => s.code === 'US-CA')).toBe(true);
    });

    it('should work with alpha-3', () => {
      const subs = forCountry('USA');
      expect(subs.length).toBeGreaterThan(50);
    });

    it('should return empty array for invalid country', () => {
      expect(forCountry('XX')).toEqual([]);
    });

    it('should return sorted results', () => {
      const subs = forCountry('US');
      const codes = subs.map((s) => s.code);
      expect(codes).toEqual([...codes].sort());
    });
  });

  describe('all', () => {
    it('should return all subdivisions', () => {
      const subs = all();
      expect(subs.length).toBeGreaterThan(5000);
    });

    it('should be sorted by code', () => {
      const subs = all();
      const codes = subs.map((s) => s.code);
      expect(codes).toEqual([...codes].sort());
    });
  });

  describe('hasSubdivisions', () => {
    it('should return true for countries with subdivisions', () => {
      expect(hasSubdivisions('US')).toBe(true);
      expect(hasSubdivisions('USA')).toBe(true);
    });

    it('should return false for invalid countries', () => {
      expect(hasSubdivisions('XX')).toBe(false);
    });
  });
});

describe('Subdivision Conversions', () => {
  describe('toRegionCode', () => {
    it('should extract region code', () => {
      expect(toRegionCode('US-CA')).toBe('CA');
      expect(toRegionCode('GB-EAW')).toBe('EAW');
    });

    it('should return null for invalid code', () => {
      expect(toRegionCode('invalid')).toBeNull();
    });
  });

  describe('toFullCode', () => {
    it('should build full code', () => {
      expect(toFullCode('US', 'CA')).toBe('US-CA');
    });

    it('should normalize alpha-3', () => {
      expect(toFullCode('USA', 'CA')).toBe('US-CA');
    });

    it('should return null for invalid inputs', () => {
      expect(toFullCode('XX', 'YY')).toBeNull();
      expect(toFullCode('US', 'XX')).toBeNull();
    });
  });

  describe('toName', () => {
    it('should get name from code', () => {
      expect(toName('US-CA')).toBe('California');
    });

    it('should return null for invalid code', () => {
      expect(toName('XX-YY')).toBeNull();
    });
  });

  describe('toNameFrom', () => {
    it('should get name from country and region', () => {
      expect(toNameFrom('US', 'CA')).toBe('California');
      expect(toNameFrom('USA', 'CA')).toBe('California');
    });
  });

  describe('toCountryCode', () => {
    it('should extract country code', () => {
      expect(toCountryCode('US-CA')).toBe('US');
    });

    it('should normalize alpha-3', () => {
      expect(toCountryCode('USA-CA')).toBe('US');
    });

    it('should return null for invalid code', () => {
      expect(toCountryCode('invalid')).toBeNull();
    });
  });
});

describe('Subdivision Validation', () => {
  describe('isValidCode', () => {
    it('should validate full codes', () => {
      expect(isValidCode('US-CA')).toBe(true);
      expect(isValidCode('XX-YY')).toBe(false);
    });
  });

  describe('isValidRegion', () => {
    it('should validate region codes for countries', () => {
      expect(isValidRegion('US', 'CA')).toBe(true);
      expect(isValidRegion('US', 'XX')).toBe(false);
    });
  });

  describe('isValidName', () => {
    it('should validate subdivision names', () => {
      expect(isValidName('US', 'California')).toBe(true);
      expect(isValidName('US', 'Narnia')).toBe(false);
    });
  });
});
