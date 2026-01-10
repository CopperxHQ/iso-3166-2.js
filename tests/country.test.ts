import { describe, it, expect } from 'vitest';
// Import all subdivision data to register them for withSubdivisions test
import '../src/subdivision/data/all';
import {
  whereAlpha2,
  whereAlpha3,
  whereNumeric,
  whereName,
  all,
  withSubdivisions,
  alpha2ToAlpha3,
  alpha3ToAlpha2,
  alpha2ToNumeric,
  alpha3ToNumeric,
  numericToAlpha2,
  numericToAlpha3,
  toName,
  convert,
  isAlpha2,
  isAlpha3,
  isNumeric,
  isCountryName,
  isValid,
  detectFormat,
} from '../src/country';

describe('Country Lookups', () => {
  describe('whereAlpha2', () => {
    it('should find country by alpha-2 code', () => {
      const country = whereAlpha2('US');
      expect(country).toEqual({
        name: 'United States',
        alpha2: 'US',
        alpha3: 'USA',
        numeric: '840',
      });
    });

    it('should be case-insensitive', () => {
      expect(whereAlpha2('us')).toEqual(whereAlpha2('US'));
      expect(whereAlpha2('Us')).toEqual(whereAlpha2('US'));
    });

    it('should return null for invalid code', () => {
      expect(whereAlpha2('XX')).toBeNull();
      expect(whereAlpha2('')).toBeNull();
    });

    it('should handle whitespace', () => {
      expect(whereAlpha2(' US ')).toEqual(whereAlpha2('US'));
    });
  });

  describe('whereAlpha3', () => {
    it('should find country by alpha-3 code', () => {
      const country = whereAlpha3('USA');
      expect(country?.alpha2).toBe('US');
      expect(country?.name).toBe('United States');
    });

    it('should be case-insensitive', () => {
      expect(whereAlpha3('usa')).toEqual(whereAlpha3('USA'));
    });

    it('should return null for invalid code', () => {
      expect(whereAlpha3('XXX')).toBeNull();
    });
  });

  describe('whereNumeric', () => {
    it('should find country by numeric code (string)', () => {
      const country = whereNumeric('840');
      expect(country?.alpha2).toBe('US');
    });

    it('should find country by numeric code (number)', () => {
      const country = whereNumeric(840);
      expect(country?.alpha2).toBe('US');
    });

    it('should handle leading zeros', () => {
      expect(whereNumeric('004')?.alpha2).toBe('AF'); // Afghanistan
      expect(whereNumeric(4)?.alpha2).toBe('AF');
    });

    it('should return null for invalid code', () => {
      expect(whereNumeric('999')).toBeNull();
    });
  });

  describe('whereName', () => {
    it('should find country by name', () => {
      const country = whereName('United States');
      expect(country?.alpha2).toBe('US');
    });

    it('should be case-insensitive', () => {
      expect(whereName('united states')).toEqual(whereName('United States'));
      expect(whereName('SWEDEN')).toEqual(whereName('Sweden'));
    });

    it('should return null for invalid name', () => {
      expect(whereName('Narnia')).toBeNull();
    });
  });

  describe('all', () => {
    it('should return all countries', () => {
      const countries = all();
      expect(countries.length).toBeGreaterThan(200);
      expect(countries.some((c) => c.alpha2 === 'US')).toBe(true);
    });

    it('should return sorted by alpha-2', () => {
      const countries = all();
      const codes = countries.map((c) => c.alpha2);
      expect(codes).toEqual([...codes].sort());
    });
  });

  describe('withSubdivisions', () => {
    it('should return country with subdivisions', () => {
      const country = withSubdivisions('US');
      expect(country?.name).toBe('United States');
      expect(country?.subdivisions).toBeDefined();
      expect(country?.subdivisions['US-CA']).toBeDefined();
    });

    it('should work with alpha-3', () => {
      const country = withSubdivisions('USA');
      expect(country?.alpha2).toBe('US');
    });

    it('should return null for invalid code', () => {
      expect(withSubdivisions('XX')).toBeNull();
    });
  });
});

describe('Country Conversions', () => {
  describe('alpha2ToAlpha3', () => {
    it('should convert alpha-2 to alpha-3', () => {
      expect(alpha2ToAlpha3('US')).toBe('USA');
      expect(alpha2ToAlpha3('SE')).toBe('SWE');
    });

    it('should return null for invalid code', () => {
      expect(alpha2ToAlpha3('XX')).toBeNull();
    });
  });

  describe('alpha3ToAlpha2', () => {
    it('should convert alpha-3 to alpha-2', () => {
      expect(alpha3ToAlpha2('USA')).toBe('US');
      expect(alpha3ToAlpha2('SWE')).toBe('SE');
    });

    it('should return null for invalid code', () => {
      expect(alpha3ToAlpha2('XXX')).toBeNull();
    });
  });

  describe('alpha2ToNumeric', () => {
    it('should convert alpha-2 to numeric', () => {
      expect(alpha2ToNumeric('US')).toBe('840');
    });
  });

  describe('alpha3ToNumeric', () => {
    it('should convert alpha-3 to numeric', () => {
      expect(alpha3ToNumeric('USA')).toBe('840');
    });
  });

  describe('numericToAlpha2', () => {
    it('should convert numeric to alpha-2', () => {
      expect(numericToAlpha2('840')).toBe('US');
      expect(numericToAlpha2(840)).toBe('US');
    });
  });

  describe('numericToAlpha3', () => {
    it('should convert numeric to alpha-3', () => {
      expect(numericToAlpha3('840')).toBe('USA');
      expect(numericToAlpha3(840)).toBe('USA');
    });
  });

  describe('toName', () => {
    it('should get name from any code format', () => {
      expect(toName('US')).toBe('United States');
      expect(toName('USA')).toBe('United States');
      expect(toName(840)).toBe('United States');
    });

    it('should return null for invalid code', () => {
      expect(toName('XX')).toBeNull();
    });
  });

  describe('convert', () => {
    it('should convert between formats', () => {
      expect(convert('US', 'alpha2', 'alpha3')).toBe('USA');
      expect(convert('USA', 'alpha3', 'numeric')).toBe('840');
      expect(convert('840', 'numeric', 'alpha2')).toBe('US');
    });

    it('should return same format', () => {
      expect(convert('US', 'alpha2', 'alpha2')).toBe('US');
    });
  });
});

describe('Country Validation', () => {
  describe('isAlpha2', () => {
    it('should validate alpha-2 codes', () => {
      expect(isAlpha2('US')).toBe(true);
      expect(isAlpha2('USA')).toBe(false);
      expect(isAlpha2('XX')).toBe(false);
      expect(isAlpha2('')).toBe(false);
    });
  });

  describe('isAlpha3', () => {
    it('should validate alpha-3 codes', () => {
      expect(isAlpha3('USA')).toBe(true);
      expect(isAlpha3('US')).toBe(false);
      expect(isAlpha3('XXX')).toBe(false);
    });
  });

  describe('isNumeric', () => {
    it('should validate numeric codes', () => {
      expect(isNumeric('840')).toBe(true);
      expect(isNumeric(840)).toBe(true);
      expect(isNumeric('999')).toBe(false);
      expect(isNumeric('abc')).toBe(false);
    });
  });

  describe('isCountryName', () => {
    it('should validate country names', () => {
      expect(isCountryName('United States')).toBe(true);
      expect(isCountryName('Narnia')).toBe(false);
    });
  });

  describe('isValid', () => {
    it('should validate any format', () => {
      expect(isValid('US')).toBe(true);
      expect(isValid('USA')).toBe(true);
      expect(isValid(840)).toBe(true);
      expect(isValid('United States')).toBe(true);
      expect(isValid('XX')).toBe(false);
    });
  });

  describe('detectFormat', () => {
    it('should detect code format', () => {
      expect(detectFormat('US')).toBe('alpha2');
      expect(detectFormat('USA')).toBe('alpha3');
      expect(detectFormat('840')).toBe('numeric');
      expect(detectFormat('United States')).toBe('name');
      expect(detectFormat('XX')).toBeNull();
    });
  });
});
