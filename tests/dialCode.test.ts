import { describe, it, expect } from 'vitest';
import {
  getDialCode,
  getDialCodes,
  getDialCodeInfo,
  isValidPhoneCountry,
  getSupportedCountries,
} from '../src/dialCode';

describe('Dial Code Module', () => {
  describe('getDialCode', () => {
    it('should return dial code for US', () => {
      expect(getDialCode('US')).toBe('+1');
    });

    it('should return dial codes for major countries', () => {
      expect(getDialCode('GB')).toBe('+44');
      expect(getDialCode('FR')).toBe('+33');
      expect(getDialCode('DE')).toBe('+49');
      expect(getDialCode('JP')).toBe('+81');
      expect(getDialCode('CN')).toBe('+86');
      expect(getDialCode('IN')).toBe('+91');
      expect(getDialCode('AU')).toBe('+61');
      expect(getDialCode('BR')).toBe('+55');
      expect(getDialCode('RU')).toBe('+7');
    });

    it('should return same code for countries sharing dial codes', () => {
      // US and Canada share +1
      expect(getDialCode('US')).toBe('+1');
      expect(getDialCode('CA')).toBe('+1');

      // Russia and Kazakhstan share +7
      expect(getDialCode('RU')).toBe('+7');
      expect(getDialCode('KZ')).toBe('+7');
    });

    it('should be case-insensitive', () => {
      expect(getDialCode('us')).toBe('+1');
      expect(getDialCode('Us')).toBe('+1');
      expect(getDialCode('gb')).toBe('+44');
    });

    it('should return null for invalid country', () => {
      expect(getDialCode('XX')).toBeNull();
      expect(getDialCode('')).toBeNull();
    });
  });

  describe('getDialCodes', () => {
    it('should return array of dial codes', () => {
      expect(getDialCodes('US')).toEqual(['+1']);
      expect(getDialCodes('GB')).toEqual(['+44']);
      expect(getDialCodes('FR')).toEqual(['+33']);
    });

    it('should return null for invalid country', () => {
      expect(getDialCodes('XX')).toBeNull();
    });
  });

  describe('getDialCodeInfo', () => {
    it('should return full dial code info', () => {
      const usInfo = getDialCodeInfo('US');
      expect(usInfo).toEqual({
        dialCode: '+1',
        countryCode: 'US',
      });

      const gbInfo = getDialCodeInfo('GB');
      expect(gbInfo).toEqual({
        dialCode: '+44',
        countryCode: 'GB',
      });
    });

    it('should return null for invalid country', () => {
      expect(getDialCodeInfo('XX')).toBeNull();
    });
  });

  describe('isValidPhoneCountry', () => {
    it('should return true for valid countries', () => {
      expect(isValidPhoneCountry('US')).toBe(true);
      expect(isValidPhoneCountry('GB')).toBe(true);
      expect(isValidPhoneCountry('FR')).toBe(true);
      expect(isValidPhoneCountry('DE')).toBe(true);
      expect(isValidPhoneCountry('JP')).toBe(true);
    });

    it('should be case-insensitive', () => {
      expect(isValidPhoneCountry('us')).toBe(true);
      expect(isValidPhoneCountry('gb')).toBe(true);
    });

    it('should return false for invalid countries', () => {
      expect(isValidPhoneCountry('XX')).toBe(false);
      expect(isValidPhoneCountry('')).toBe(false);
    });
  });

  describe('getSupportedCountries', () => {
    it('should return array of country codes', () => {
      const countries = getSupportedCountries();
      expect(Array.isArray(countries)).toBe(true);
      expect(countries.length).toBeGreaterThan(200);
    });

    it('should include major countries', () => {
      const countries = getSupportedCountries();
      expect(countries).toContain('US');
      expect(countries).toContain('GB');
      expect(countries).toContain('FR');
      expect(countries).toContain('DE');
      expect(countries).toContain('JP');
      expect(countries).toContain('CN');
      expect(countries).toContain('IN');
    });
  });

  describe('Common dial codes', () => {
    it('should handle NANP countries (+1)', () => {
      const nanpCountries = ['US', 'CA', 'JM', 'PR', 'VI', 'GU'];
      for (const country of nanpCountries) {
        expect(getDialCode(country)).toBe('+1');
      }
    });

    it('should handle European countries', () => {
      expect(getDialCode('GB')).toBe('+44');
      expect(getDialCode('FR')).toBe('+33');
      expect(getDialCode('DE')).toBe('+49');
      expect(getDialCode('IT')).toBe('+39');
      expect(getDialCode('ES')).toBe('+34');
      expect(getDialCode('NL')).toBe('+31');
      expect(getDialCode('BE')).toBe('+32');
      expect(getDialCode('CH')).toBe('+41');
      expect(getDialCode('AT')).toBe('+43');
      expect(getDialCode('PL')).toBe('+48');
    });

    it('should handle Asian countries', () => {
      expect(getDialCode('JP')).toBe('+81');
      expect(getDialCode('CN')).toBe('+86');
      expect(getDialCode('KR')).toBe('+82');
      expect(getDialCode('IN')).toBe('+91');
      expect(getDialCode('TH')).toBe('+66');
      expect(getDialCode('SG')).toBe('+65');
      expect(getDialCode('MY')).toBe('+60');
      expect(getDialCode('ID')).toBe('+62');
      expect(getDialCode('PH')).toBe('+63');
      expect(getDialCode('VN')).toBe('+84');
    });

    it('should handle Middle Eastern countries', () => {
      expect(getDialCode('AE')).toBe('+971');
      expect(getDialCode('SA')).toBe('+966');
      expect(getDialCode('IL')).toBe('+972');
      expect(getDialCode('TR')).toBe('+90');
    });

    it('should handle African countries', () => {
      expect(getDialCode('ZA')).toBe('+27');
      expect(getDialCode('EG')).toBe('+20');
      expect(getDialCode('NG')).toBe('+234');
      expect(getDialCode('KE')).toBe('+254');
    });

    it('should handle South American countries', () => {
      expect(getDialCode('BR')).toBe('+55');
      expect(getDialCode('AR')).toBe('+54');
      expect(getDialCode('CL')).toBe('+56');
      expect(getDialCode('CO')).toBe('+57');
      expect(getDialCode('PE')).toBe('+51');
    });

    it('should handle Oceania countries', () => {
      expect(getDialCode('AU')).toBe('+61');
      expect(getDialCode('NZ')).toBe('+64');
    });
  });
});
