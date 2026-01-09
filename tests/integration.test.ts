import { describe, it, expect } from 'vitest';
import { country, subdivision } from '../src/index';

describe('Integration Tests', () => {
  describe('Namespaced API', () => {
    it('should work with country namespace', () => {
      expect(country.whereAlpha2('US')?.name).toBe('United States');
      expect(country.alpha2ToAlpha3('US')).toBe('USA');
      expect(country.isAlpha2('US')).toBe(true);
    });

    it('should work with subdivision namespace', () => {
      expect(subdivision.whereCode('US-CA')?.name).toBe('California');
      expect(subdivision.toRegionCode('US-CA')).toBe('CA');
      expect(subdivision.isValidCode('US-CA')).toBe(true);
    });
  });

  describe('Legacy Compatibility (iso-3166-2.js)', () => {
    it('should support subdivision lookup by full code', () => {
      const sub = subdivision.whereCode('SE-O');
      expect(sub?.name).toBe('Västra Götalands län');
      expect(sub?.countryCode).toBe('SE');
      expect(sub?.countryName).toBe('Sweden');
      expect(sub?.regionCode).toBe('O');
      expect(sub?.code).toBe('SE-O');
    });

    it('should support subdivision lookup by country and code', () => {
      const sub = subdivision.where('SE', 'O');
      expect(sub?.name).toBe('Västra Götalands län');
    });

    it('should support subdivision lookup by country and name', () => {
      const sub = subdivision.whereName('US', 'Indiana');
      expect(sub?.code).toBe('US-IN');
      expect(sub?.regionCode).toBe('IN');
    });

    it('should support alpha-3 country codes', () => {
      const sub = subdivision.whereName('USA', 'Indiana');
      expect(sub?.countryCode).toBe('US');
      expect(sub?.code).toBe('US-IN');
    });

    it('should return null for non-existent data', () => {
      expect(subdivision.whereCode('UN-1')).toBeNull();
      expect(subdivision.where('UN', '1')).toBeNull();
    });
  });

  describe('Legacy Compatibility (iso-3166-1)', () => {
    it('should support whereAlpha2', () => {
      const result = country.whereAlpha2('no');
      expect(result?.name).toBe('Norway');
      expect(result?.alpha2).toBe('NO');
      expect(result?.alpha3).toBe('NOR');
      expect(result?.numeric).toBe('578');
    });

    it('should support whereAlpha3', () => {
      const result = country.whereAlpha3('nor');
      expect(result?.name).toBe('Norway');
    });

    it('should support whereNumeric', () => {
      const result = country.whereNumeric(578);
      expect(result?.name).toBe('Norway');
    });

    it('should support whereName', () => {
      const result = country.whereName('NORWAY');
      expect(result?.alpha2).toBe('NO');
    });

    it('should support all()', () => {
      const countries = country.all();
      expect(countries.length).toBeGreaterThan(200);
    });
  });

  describe('CountryCodeUtil Compatibility', () => {
    it('should convert alpha2 to alpha3', () => {
      expect(country.alpha2ToAlpha3('US')).toBe('USA');
      expect(country.alpha2ToAlpha3('XX')).toBeNull();
    });

    it('should convert alpha3 to alpha2', () => {
      expect(country.alpha3ToAlpha2('USA')).toBe('US');
      expect(country.alpha3ToAlpha2('XXX')).toBeNull();
    });

    it('should get country name from alpha2', () => {
      expect(country.toName('US')).toBe('United States');
    });

    it('should get country name from alpha3', () => {
      expect(country.toName('USA')).toBe('United States');
    });

    it('should validate alpha2 codes', () => {
      expect(country.isAlpha2('US')).toBe(true);
      expect(country.isAlpha2('USA')).toBe(false);
    });

    it('should validate alpha3 codes', () => {
      expect(country.isAlpha3('USA')).toBe(true);
      expect(country.isAlpha3('US')).toBe(false);
    });

    it('should return all countries', () => {
      const all = country.all();
      expect(Array.isArray(all)).toBe(true);
      expect(all.length).toBeGreaterThan(200);
    });
  });

  describe('Country with Subdivisions', () => {
    it('should get country with all subdivisions', () => {
      const us = country.withSubdivisions('US');
      expect(us?.name).toBe('United States');
      expect(us?.subdivisions['US-CA']).toEqual({
        name: 'California',
        type: 'State',
      });
    });

    it('should work with alpha-3', () => {
      const se = country.withSubdivisions('SWE');
      expect(se?.alpha2).toBe('SE');
      expect(se?.subdivisions['SE-O']?.name).toBe('Västra Götalands län');
    });
  });
});

describe('Data Integrity', () => {
  it('should have consistent data between country and subdivision', () => {
    const us = country.withSubdivisions('US');
    const usCA = subdivision.whereCode('US-CA');

    expect(us?.name).toBe(usCA?.countryName);
  });

  it('should have all alpha3 codes mapping correctly', () => {
    const allCountries = country.all();

    for (const c of allCountries) {
      if (c.alpha3) {
        const byAlpha3 = country.whereAlpha3(c.alpha3);
        expect(byAlpha3?.alpha2).toBe(c.alpha2);
      }
    }
  });

  it('should have all numeric codes mapping correctly', () => {
    const allCountries = country.all();

    for (const c of allCountries) {
      if (c.numeric) {
        const byNumeric = country.whereNumeric(c.numeric);
        expect(byNumeric?.alpha2).toBe(c.alpha2);
      }
    }
  });
});
