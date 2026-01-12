import { describe, it, expect } from 'vitest';
import {
  postalCode,
  zipCode,
  pinCode,
  postcode,
  country,
  isValidPostalCode,
  hasPostalCode,
  getPostalCodePattern,
  getPostalCodeFormat,
  getPostalCodeName,
  getPostalCodeInfo,
  postalCodes,
  countriesWithoutPostalCodes,
} from '../src';
import type { PostalCodeInfo } from '../src';

describe('Postal Code Validation', () => {
  describe('isValid', () => {
    describe('United States (ZIP Code)', () => {
      it('should validate 5-digit ZIP codes', () => {
        expect(postalCode.isValid('US', '90210')).toBe(true);
        expect(postalCode.isValid('US', '10001')).toBe(true);
        expect(postalCode.isValid('US', '00501')).toBe(true); // IRS
      });

      it('should validate ZIP+4 codes', () => {
        expect(postalCode.isValid('US', '90210-1234')).toBe(true);
        expect(postalCode.isValid('US', '10001-5678')).toBe(true);
      });

      it('should reject invalid ZIP codes', () => {
        expect(postalCode.isValid('US', '9021')).toBe(false); // too short
        expect(postalCode.isValid('US', '902101')).toBe(false); // too long
        expect(postalCode.isValid('US', '90210-12')).toBe(false); // incomplete ZIP+4
        expect(postalCode.isValid('US', 'ABCDE')).toBe(false); // letters
      });
    });

    describe('United Kingdom (Postcode)', () => {
      it('should validate UK postcodes', () => {
        expect(postalCode.isValid('GB', 'SW1A 1AA')).toBe(true); // Buckingham Palace
        expect(postalCode.isValid('GB', 'EC1A 1BB')).toBe(true);
        expect(postalCode.isValid('GB', 'W1A 0AX')).toBe(true); // BBC
        expect(postalCode.isValid('GB', 'M1 1AE')).toBe(true);
        expect(postalCode.isValid('GB', 'B33 8TH')).toBe(true);
        expect(postalCode.isValid('GB', 'CR2 6XH')).toBe(true);
        expect(postalCode.isValid('GB', 'DN55 1PT')).toBe(true);
      });

      it('should be case-insensitive (lenient)', () => {
        expect(postalCode.isValid('GB', 'sw1a 1aa')).toBe(true);
        expect(postalCode.isValid('GB', 'SW1A 1AA')).toBe(true);
        expect(postalCode.isValid('GB', 'Sw1a 1Aa')).toBe(true);
      });

      it('should accept without space (lenient)', () => {
        expect(postalCode.isValid('GB', 'SW1A1AA')).toBe(true);
        expect(postalCode.isValid('GB', 'EC1A1BB')).toBe(true);
      });

      it('should reject invalid UK postcodes', () => {
        expect(postalCode.isValid('GB', 'INVALID')).toBe(false);
        expect(postalCode.isValid('GB', '12345')).toBe(false);
      });
    });

    describe('India (PIN Code)', () => {
      it('should validate 6-digit PIN codes', () => {
        expect(postalCode.isValid('IN', '110001')).toBe(true); // New Delhi
        expect(postalCode.isValid('IN', '400001')).toBe(true); // Mumbai
        expect(postalCode.isValid('IN', '560001')).toBe(true); // Bangalore
        expect(postalCode.isValid('IN', '700001')).toBe(true); // Kolkata
      });

      it('should reject invalid PIN codes', () => {
        expect(postalCode.isValid('IN', '11000')).toBe(false); // too short
        expect(postalCode.isValid('IN', '1100011')).toBe(false); // too long
        expect(postalCode.isValid('IN', 'ABCDEF')).toBe(false); // letters
      });
    });

    describe('Canada (Postal Code)', () => {
      it('should validate Canadian postal codes', () => {
        expect(postalCode.isValid('CA', 'K1A 0B1')).toBe(true); // Ottawa
        expect(postalCode.isValid('CA', 'H3Z 2Y7')).toBe(true); // Montreal
        expect(postalCode.isValid('CA', 'V6B 4Y8')).toBe(true); // Vancouver
        expect(postalCode.isValid('CA', 'M5V 2T6')).toBe(true); // Toronto
      });

      it('should be case-insensitive', () => {
        expect(postalCode.isValid('CA', 'k1a 0b1')).toBe(true);
        expect(postalCode.isValid('CA', 'K1A 0B1')).toBe(true);
      });

      it('should accept without space', () => {
        expect(postalCode.isValid('CA', 'K1A0B1')).toBe(true);
      });

      it('should reject invalid Canadian postal codes', () => {
        expect(postalCode.isValid('CA', '12345')).toBe(false);
        expect(postalCode.isValid('CA', 'K1A 0B')).toBe(false); // too short
      });
    });

    describe('Germany (PLZ)', () => {
      it('should validate 5-digit PLZ', () => {
        expect(postalCode.isValid('DE', '10115')).toBe(true); // Berlin
        expect(postalCode.isValid('DE', '80331')).toBe(true); // Munich
        expect(postalCode.isValid('DE', '20095')).toBe(true); // Hamburg
      });

      it('should reject invalid PLZ', () => {
        expect(postalCode.isValid('DE', '1011')).toBe(false); // too short
        expect(postalCode.isValid('DE', '101151')).toBe(false); // too long
      });
    });

    describe('Japan (Postal Number)', () => {
      it('should validate Japanese postal codes', () => {
        expect(postalCode.isValid('JP', '100-0001')).toBe(true); // Tokyo
        expect(postalCode.isValid('JP', '530-0001')).toBe(true); // Osaka
        expect(postalCode.isValid('JP', '1000001')).toBe(true); // without hyphen
      });

      it('should reject invalid Japanese postal codes', () => {
        expect(postalCode.isValid('JP', '100-001')).toBe(false); // too short
        expect(postalCode.isValid('JP', '12345678')).toBe(false); // too long
      });
    });

    describe('Brazil (CEP)', () => {
      it('should validate Brazilian CEP', () => {
        expect(postalCode.isValid('BR', '01310-100')).toBe(true); // Sao Paulo
        expect(postalCode.isValid('BR', '22041-080')).toBe(true); // Rio
        expect(postalCode.isValid('BR', '01310100')).toBe(true); // without hyphen
      });

      it('should reject invalid CEP', () => {
        expect(postalCode.isValid('BR', '0131010')).toBe(false); // too short
        expect(postalCode.isValid('BR', '013101001')).toBe(false); // too long
      });
    });

    describe('Other countries', () => {
      it('should validate French postal codes', () => {
        expect(postalCode.isValid('FR', '75001')).toBe(true); // Paris
        expect(postalCode.isValid('FR', '13001')).toBe(true); // Marseille
      });

      it('should validate Italian CAP', () => {
        expect(postalCode.isValid('IT', '00100')).toBe(true); // Rome
        expect(postalCode.isValid('IT', '20100')).toBe(true); // Milan
      });

      it('should validate Dutch postcodes', () => {
        expect(postalCode.isValid('NL', '1012 AB')).toBe(true); // Amsterdam
        expect(postalCode.isValid('NL', '1012AB')).toBe(true); // without space
      });

      it('should validate Australian postcodes', () => {
        expect(postalCode.isValid('AU', '2000')).toBe(true); // Sydney
        expect(postalCode.isValid('AU', '3000')).toBe(true); // Melbourne
      });

      it('should validate Chinese postal codes', () => {
        expect(postalCode.isValid('CN', '100000')).toBe(true); // Beijing
        expect(postalCode.isValid('CN', '200000')).toBe(true); // Shanghai
      });

      it('should validate South Korean postal codes', () => {
        expect(postalCode.isValid('KR', '03051')).toBe(true); // Seoul
        expect(postalCode.isValid('KR', '48058')).toBe(true); // Busan
      });

      it('should validate Russian postal codes', () => {
        expect(postalCode.isValid('RU', '101000')).toBe(true); // Moscow
        expect(postalCode.isValid('RU', '190000')).toBe(true); // St Petersburg
      });
    });

    describe('Edge cases', () => {
      it('should handle empty/null values', () => {
        expect(postalCode.isValid('US', '')).toBe(false);
        expect(postalCode.isValid('US', null as any)).toBe(false);
        expect(postalCode.isValid('US', undefined as any)).toBe(false);
      });

      it('should handle invalid country codes', () => {
        expect(postalCode.isValid('XX', '12345')).toBe(false);
        expect(postalCode.isValid('', '12345')).toBe(false);
      });

      it('should handle whitespace', () => {
        expect(postalCode.isValid('US', '  90210  ')).toBe(true);
        expect(postalCode.isValid('GB', '  SW1A 1AA  ')).toBe(true);
      });

      it('should accept alpha-3 country codes', () => {
        expect(postalCode.isValid('USA', '90210')).toBe(true);
        expect(postalCode.isValid('GBR', 'SW1A 1AA')).toBe(true);
        expect(postalCode.isValid('IND', '110001')).toBe(true);
      });

      it('should accept numeric country codes', () => {
        expect(postalCode.isValid(840, '90210')).toBe(true); // USA
        expect(postalCode.isValid('826', 'SW1A 1AA')).toBe(true); // UK
        expect(postalCode.isValid(356, '110001')).toBe(true); // India
      });
    });

    describe('Countries without postal codes', () => {
      it('should return false for Hong Kong', () => {
        expect(postalCode.isValid('HK', '999077')).toBe(false);
        expect(postalCode.isValid('HK', '')).toBe(false);
      });

      it('should return false for UAE', () => {
        expect(postalCode.isValid('AE', '12345')).toBe(false);
      });

      it('should return false for Qatar', () => {
        expect(postalCode.isValid('QA', '12345')).toBe(false);
      });
    });
  });

  describe('getName', () => {
    it('should return correct local terminology', () => {
      expect(postalCode.getName('US')).toBe('ZIP Code');
      expect(postalCode.getName('IN')).toBe('PIN Code');
      expect(postalCode.getName('GB')).toBe('Postcode');
      expect(postalCode.getName('AU')).toBe('Postcode');
      expect(postalCode.getName('CA')).toBe('Postal Code');
      expect(postalCode.getName('DE')).toBe('PLZ');
      expect(postalCode.getName('FR')).toBe('Code postal');
      expect(postalCode.getName('IT')).toBe('CAP');
      expect(postalCode.getName('BR')).toBe('CEP');
      expect(postalCode.getName('JP')).toBe('郵便番号');
      expect(postalCode.getName('CN')).toBe('邮编');
      expect(postalCode.getName('KR')).toBe('우편번호');
      expect(postalCode.getName('RU')).toBe('Почтовый индекс');
      expect(postalCode.getName('IE')).toBe('Eircode');
    });

    it('should return null for invalid country', () => {
      expect(postalCode.getName('XX')).toBeNull();
    });

    it('should return null for countries without postal codes', () => {
      expect(postalCode.getName('HK')).toBeNull();
      expect(postalCode.getName('AE')).toBeNull();
    });
  });

  describe('getFormat', () => {
    it('should return human-readable format', () => {
      expect(postalCode.getFormat('US')).toBe('NNNNN or NNNNN-NNNN');
      expect(postalCode.getFormat('GB')).toBe('AA9A 9AA');
      expect(postalCode.getFormat('CA')).toBe('A1A 1A1');
      expect(postalCode.getFormat('IN')).toBe('NNNNNN');
      expect(postalCode.getFormat('DE')).toBe('NNNNN');
      expect(postalCode.getFormat('JP')).toBe('NNN-NNNN');
    });

    it('should return null for invalid country', () => {
      expect(postalCode.getFormat('XX')).toBeNull();
    });
  });

  describe('getPattern', () => {
    it('should return regex pattern', () => {
      const usPattern = postalCode.getPattern('US');
      expect(usPattern).toBeInstanceOf(RegExp);
      expect(usPattern?.test('90210')).toBe(true);
      expect(usPattern?.test('90210-1234')).toBe(true);
    });

    it('should return null for invalid country', () => {
      expect(postalCode.getPattern('XX')).toBeNull();
    });
  });

  describe('getInfo', () => {
    it('should return full postal code info', () => {
      const info = postalCode.getInfo('US');
      expect(info).not.toBeNull();
      expect(info?.regex).toBeInstanceOf(RegExp);
      expect(info?.format).toBe('NNNNN or NNNNN-NNNN');
      expect(info?.name).toBe('ZIP Code');
    });

    it('should return null for invalid country', () => {
      expect(postalCode.getInfo('XX')).toBeNull();
    });
  });

  describe('hasPostalCode', () => {
    it('should return true for countries with postal codes', () => {
      expect(postalCode.hasPostalCode('US')).toBe(true);
      expect(postalCode.hasPostalCode('GB')).toBe(true);
      expect(postalCode.hasPostalCode('IN')).toBe(true);
      expect(postalCode.hasPostalCode('JP')).toBe(true);
      expect(postalCode.hasPostalCode('DE')).toBe(true);
    });

    it('should return false for countries without postal codes', () => {
      expect(postalCode.hasPostalCode('HK')).toBe(false);
      expect(postalCode.hasPostalCode('AE')).toBe(false);
      expect(postalCode.hasPostalCode('QA')).toBe(false);
      expect(postalCode.hasPostalCode('IE')).toBe(true); // Ireland has Eircode since 2015
    });

    it('should return false for invalid country', () => {
      expect(postalCode.hasPostalCode('XX')).toBe(false);
    });
  });
});

describe('Aliases', () => {
  describe('zipCode', () => {
    it('should be the same object as postalCode', () => {
      expect(zipCode).toBe(postalCode);
    });

    it('should work for US ZIP codes', () => {
      expect(zipCode.isValid('US', '90210')).toBe(true);
      expect(zipCode.getName('US')).toBe('ZIP Code');
    });
  });

  describe('pinCode', () => {
    it('should be the same object as postalCode', () => {
      expect(pinCode).toBe(postalCode);
    });

    it('should work for Indian PIN codes', () => {
      expect(pinCode.isValid('IN', '110001')).toBe(true);
      expect(pinCode.getName('IN')).toBe('PIN Code');
    });
  });

  describe('postcode', () => {
    it('should be the same object as postalCode', () => {
      expect(postcode).toBe(postalCode);
    });

    it('should work for UK postcodes', () => {
      expect(postcode.isValid('GB', 'SW1A 1AA')).toBe(true);
      expect(postcode.getName('GB')).toBe('Postcode');
    });
  });
});

describe('Country proxy functions', () => {
  it('should expose isValidPostalCode', () => {
    expect(country.isValidPostalCode('US', '90210')).toBe(true);
    expect(country.isValidPostalCode('GB', 'SW1A 1AA')).toBe(true);
  });

  it('should expose hasPostalCode', () => {
    expect(country.hasPostalCode('US')).toBe(true);
    expect(country.hasPostalCode('HK')).toBe(false);
  });

  it('should expose getPostalCodeName', () => {
    expect(country.getPostalCodeName('US')).toBe('ZIP Code');
    expect(country.getPostalCodeName('IN')).toBe('PIN Code');
  });

  it('should expose getPostalCodeFormat', () => {
    expect(country.getPostalCodeFormat('US')).toBe('NNNNN or NNNNN-NNNN');
  });

  it('should expose getPostalCodePattern', () => {
    expect(country.getPostalCodePattern('US')).toBeInstanceOf(RegExp);
  });

  it('should expose getPostalCodeInfo', () => {
    const info = country.getPostalCodeInfo('US');
    expect(info?.name).toBe('ZIP Code');
  });
});

describe('Direct exports', () => {
  it('should export isValidPostalCode', () => {
    expect(isValidPostalCode('US', '90210')).toBe(true);
  });

  it('should export hasPostalCode', () => {
    expect(hasPostalCode('US')).toBe(true);
  });

  it('should export getPostalCodePattern', () => {
    expect(getPostalCodePattern('US')).toBeInstanceOf(RegExp);
  });

  it('should export getPostalCodeFormat', () => {
    expect(getPostalCodeFormat('US')).toBe('NNNNN or NNNNN-NNNN');
  });

  it('should export getPostalCodeName', () => {
    expect(getPostalCodeName('US')).toBe('ZIP Code');
  });

  it('should export getPostalCodeInfo', () => {
    expect(getPostalCodeInfo('US')?.name).toBe('ZIP Code');
  });

  it('should export postalCodes data', () => {
    expect(postalCodes).toBeDefined();
    expect(postalCodes['US']).toBeDefined();
    expect(postalCodes['US'].name).toBe('ZIP Code');
  });

  it('should export countriesWithoutPostalCodes', () => {
    expect(countriesWithoutPostalCodes).toBeInstanceOf(Set);
    expect(countriesWithoutPostalCodes.has('HK')).toBe(true);
    expect(countriesWithoutPostalCodes.has('US')).toBe(false);
  });
});

describe('Type exports', () => {
  it('should allow PostalCodeInfo type usage', () => {
    const info: PostalCodeInfo = {
      regex: /^\d{5}$/,
      format: 'NNNNN',
      name: 'Test Code',
    };
    expect(info.name).toBe('Test Code');
  });
});
