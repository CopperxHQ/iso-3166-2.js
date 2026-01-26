import { describe, it, expect } from 'vitest';
import {
  getCurrency,
  getCurrencyCode,
  getCurrencySymbol,
  getCurrencyName,
  countriesUsingCurrency,
  usesCurrency,
  currencies,
  currencyIndex,
} from '../src/currency';

describe('Currency Module', () => {
  describe('getCurrency', () => {
    it('should return currency for US', () => {
      const currency = getCurrency('US');
      expect(currency).toEqual({
        code: 'USD',
        symbol: '$',
        name: 'US Dollar',
      });
    });

    it('should return currency for major countries', () => {
      expect(getCurrency('GB')).toEqual({
        code: 'GBP',
        symbol: '£',
        name: 'British Pound',
      });

      expect(getCurrency('JP')).toEqual({
        code: 'JPY',
        symbol: '¥',
        name: 'Japanese Yen',
      });

      expect(getCurrency('CH')).toEqual({
        code: 'CHF',
        symbol: 'CHF',
        name: 'Swiss Franc',
      });

      expect(getCurrency('CN')).toEqual({
        code: 'CNY',
        symbol: '¥',
        name: 'Chinese Yuan',
      });

      expect(getCurrency('IN')).toEqual({
        code: 'INR',
        symbol: '₹',
        name: 'Indian Rupee',
      });
    });

    it('should return Euro for Eurozone countries', () => {
      const eurozoneCurrencies = ['FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'AT', 'PT', 'IE'];
      for (const code of eurozoneCurrencies) {
        const currency = getCurrency(code);
        expect(currency?.code).toBe('EUR');
        expect(currency?.symbol).toBe('€');
        expect(currency?.name).toBe('Euro');
      }
    });

    it('should be case-insensitive', () => {
      expect(getCurrency('us')).toEqual(getCurrency('US'));
      expect(getCurrency('Gb')).toEqual(getCurrency('GB'));
    });

    it('should return null for invalid country', () => {
      expect(getCurrency('XX')).toBeNull();
      expect(getCurrency('')).toBeNull();
    });
  });

  describe('getCurrencyCode', () => {
    it('should return just the currency code', () => {
      expect(getCurrencyCode('US')).toBe('USD');
      expect(getCurrencyCode('GB')).toBe('GBP');
      expect(getCurrencyCode('JP')).toBe('JPY');
      expect(getCurrencyCode('FR')).toBe('EUR');
    });

    it('should return null for invalid country', () => {
      expect(getCurrencyCode('XX')).toBeNull();
    });
  });

  describe('getCurrencySymbol', () => {
    it('should return just the currency symbol', () => {
      expect(getCurrencySymbol('US')).toBe('$');
      expect(getCurrencySymbol('GB')).toBe('£');
      expect(getCurrencySymbol('JP')).toBe('¥');
      expect(getCurrencySymbol('FR')).toBe('€');
      expect(getCurrencySymbol('IN')).toBe('₹');
    });

    it('should return null for invalid country', () => {
      expect(getCurrencySymbol('XX')).toBeNull();
    });
  });

  describe('getCurrencyName', () => {
    it('should return just the currency name', () => {
      expect(getCurrencyName('US')).toBe('US Dollar');
      expect(getCurrencyName('GB')).toBe('British Pound');
      expect(getCurrencyName('JP')).toBe('Japanese Yen');
      expect(getCurrencyName('FR')).toBe('Euro');
    });

    it('should return null for invalid country', () => {
      expect(getCurrencyName('XX')).toBeNull();
    });
  });

  describe('countriesUsingCurrency', () => {
    it('should return countries using EUR', () => {
      const countries = countriesUsingCurrency('EUR');
      expect(countries).toContain('FR');
      expect(countries).toContain('DE');
      expect(countries).toContain('IT');
      expect(countries).toContain('ES');
      expect(countries).not.toContain('GB');
      expect(countries).not.toContain('US');
    });

    it('should return countries using USD', () => {
      const countries = countriesUsingCurrency('USD');
      expect(countries).toContain('US');
      expect(countries).toContain('EC'); // Ecuador uses USD
      expect(countries).toContain('SV'); // El Salvador uses USD
      expect(countries).toContain('PR'); // Puerto Rico uses USD
    });

    it('should return countries using XCD (East Caribbean Dollar)', () => {
      const countries = countriesUsingCurrency('XCD');
      expect(countries).toContain('AG'); // Antigua and Barbuda
      expect(countries).toContain('DM'); // Dominica
      expect(countries).toContain('GD'); // Grenada
      expect(countries).toContain('LC'); // Saint Lucia
    });

    it('should be case-insensitive', () => {
      expect(countriesUsingCurrency('eur')).toEqual(countriesUsingCurrency('EUR'));
    });

    it('should return empty array for invalid currency', () => {
      expect(countriesUsingCurrency('XXX')).toEqual([]);
    });

    it('should return sorted array', () => {
      const countries = countriesUsingCurrency('EUR');
      const sorted = [...countries].sort();
      expect(countries).toEqual(sorted);
    });
  });

  describe('usesCurrency', () => {
    it('should return true when country uses currency', () => {
      expect(usesCurrency('FR', 'EUR')).toBe(true);
      expect(usesCurrency('US', 'USD')).toBe(true);
      expect(usesCurrency('GB', 'GBP')).toBe(true);
      expect(usesCurrency('JP', 'JPY')).toBe(true);
    });

    it('should return false when country does not use currency', () => {
      expect(usesCurrency('GB', 'EUR')).toBe(false);
      expect(usesCurrency('US', 'EUR')).toBe(false);
      expect(usesCurrency('FR', 'USD')).toBe(false);
    });

    it('should be case-insensitive', () => {
      expect(usesCurrency('fr', 'eur')).toBe(true);
      expect(usesCurrency('US', 'usd')).toBe(true);
    });

    it('should return false for invalid country', () => {
      expect(usesCurrency('XX', 'EUR')).toBe(false);
    });
  });

  describe('Data Integrity', () => {
    it('should have currency data for major countries', () => {
      const majorCountries = ['US', 'CA', 'GB', 'FR', 'DE', 'JP', 'CN', 'IN', 'AU', 'BR', 'ZA'];
      for (const code of majorCountries) {
        expect(currencies[code]).toBeDefined();
        expect(currencies[code].code).toBeDefined();
        expect(currencies[code].symbol).toBeDefined();
        expect(currencies[code].name).toBeDefined();
      }
    });

    it('should have ISO 4217 3-letter codes', () => {
      for (const [country, currency] of Object.entries(currencies)) {
        expect(currency.code).toMatch(/^[A-Z]{3}$/);
      }
    });

    it('should have currency index for major currencies', () => {
      const majorCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'CHF', 'AUD', 'CAD'];
      for (const code of majorCurrencies) {
        expect(currencyIndex[code]).toBeDefined();
        expect(currencyIndex[code].length).toBeGreaterThan(0);
      }
    });
  });
});
