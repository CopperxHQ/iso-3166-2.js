import { describe, it, expect } from 'vitest';
import { country, subdivision } from '../src/index';

/**
 * Comprehensive tests for 5 countries and their subdivisions
 * Countries: United States (US), United Kingdom (GB), Germany (DE), Japan (JP), India (IN)
 */

describe('Country Tests', () => {
  describe('United States (US)', () => {
    it('should find by alpha-2', () => {
      const result = country.whereAlpha2('US');
      expect(result).toEqual({
        name: 'United States',
        alpha2: 'US',
        alpha3: 'USA',
        numeric: '840',
      });
    });

    it('should find by alpha-3', () => {
      const result = country.whereAlpha3('USA');
      expect(result?.name).toBe('United States');
    });

    it('should find by numeric', () => {
      const result = country.whereNumeric(840);
      expect(result?.alpha2).toBe('US');
    });

    it('should convert between formats', () => {
      expect(country.alpha2ToAlpha3('US')).toBe('USA');
      expect(country.alpha3ToAlpha2('USA')).toBe('US');
      expect(country.toName('US')).toBe('United States');
    });

    it('should validate codes', () => {
      expect(country.isAlpha2('US')).toBe(true);
      expect(country.isAlpha3('USA')).toBe(true);
      expect(country.isNumeric(840)).toBe(true);
    });
  });

  describe('United Kingdom (GB)', () => {
    it('should find by alpha-2', () => {
      const result = country.whereAlpha2('GB');
      expect(result).toEqual({
        name: 'United Kingdom',
        alpha2: 'GB',
        alpha3: 'GBR',
        numeric: '826',
      });
    });

    it('should find by alpha-3', () => {
      const result = country.whereAlpha3('GBR');
      expect(result?.name).toBe('United Kingdom');
    });

    it('should find by numeric', () => {
      const result = country.whereNumeric(826);
      expect(result?.alpha2).toBe('GB');
    });

    it('should convert between formats', () => {
      expect(country.alpha2ToAlpha3('GB')).toBe('GBR');
      expect(country.alpha3ToAlpha2('GBR')).toBe('GB');
      expect(country.toName('GB')).toBe('United Kingdom');
    });

    it('should validate codes', () => {
      expect(country.isAlpha2('GB')).toBe(true);
      expect(country.isAlpha3('GBR')).toBe(true);
      expect(country.isNumeric(826)).toBe(true);
    });
  });

  describe('Germany (DE)', () => {
    it('should find by alpha-2', () => {
      const result = country.whereAlpha2('DE');
      expect(result).toEqual({
        name: 'Germany',
        alpha2: 'DE',
        alpha3: 'DEU',
        numeric: '276',
      });
    });

    it('should find by alpha-3', () => {
      const result = country.whereAlpha3('DEU');
      expect(result?.name).toBe('Germany');
    });

    it('should find by numeric', () => {
      const result = country.whereNumeric(276);
      expect(result?.alpha2).toBe('DE');
    });

    it('should convert between formats', () => {
      expect(country.alpha2ToAlpha3('DE')).toBe('DEU');
      expect(country.alpha3ToAlpha2('DEU')).toBe('DE');
      expect(country.toName('DE')).toBe('Germany');
    });

    it('should validate codes', () => {
      expect(country.isAlpha2('DE')).toBe(true);
      expect(country.isAlpha3('DEU')).toBe(true);
      expect(country.isNumeric(276)).toBe(true);
    });
  });

  describe('Japan (JP)', () => {
    it('should find by alpha-2', () => {
      const result = country.whereAlpha2('JP');
      expect(result).toEqual({
        name: 'Japan',
        alpha2: 'JP',
        alpha3: 'JPN',
        numeric: '392',
      });
    });

    it('should find by alpha-3', () => {
      const result = country.whereAlpha3('JPN');
      expect(result?.name).toBe('Japan');
    });

    it('should find by numeric', () => {
      const result = country.whereNumeric(392);
      expect(result?.alpha2).toBe('JP');
    });

    it('should convert between formats', () => {
      expect(country.alpha2ToAlpha3('JP')).toBe('JPN');
      expect(country.alpha3ToAlpha2('JPN')).toBe('JP');
      expect(country.toName('JP')).toBe('Japan');
    });

    it('should validate codes', () => {
      expect(country.isAlpha2('JP')).toBe(true);
      expect(country.isAlpha3('JPN')).toBe(true);
      expect(country.isNumeric(392)).toBe(true);
    });
  });

  describe('India (IN)', () => {
    it('should find by alpha-2', () => {
      const result = country.whereAlpha2('IN');
      expect(result).toEqual({
        name: 'India',
        alpha2: 'IN',
        alpha3: 'IND',
        numeric: '356',
      });
    });

    it('should find by alpha-3', () => {
      const result = country.whereAlpha3('IND');
      expect(result?.name).toBe('India');
    });

    it('should find by numeric', () => {
      const result = country.whereNumeric(356);
      expect(result?.alpha2).toBe('IN');
    });

    it('should convert between formats', () => {
      expect(country.alpha2ToAlpha3('IN')).toBe('IND');
      expect(country.alpha3ToAlpha2('IND')).toBe('IN');
      expect(country.toName('IN')).toBe('India');
    });

    it('should validate codes', () => {
      expect(country.isAlpha2('IN')).toBe(true);
      expect(country.isAlpha3('IND')).toBe(true);
      expect(country.isNumeric(356)).toBe(true);
    });
  });
});

describe('Subdivision Tests', () => {
  describe('United States Subdivisions', () => {
    it('should find California (US-CA)', () => {
      const result = subdivision.whereCode('US-CA');
      expect(result).toEqual({
        code: 'US-CA',
        name: 'California',
        type: 'State',
        countryCode: 'US',
        countryName: 'United States',
        regionCode: 'CA',
      });
    });

    it('should find New York (US-NY)', () => {
      const result = subdivision.whereCode('US-NY');
      expect(result?.name).toBe('New York');
      expect(result?.type).toBe('State');
    });

    it('should find Texas (US-TX)', () => {
      const result = subdivision.whereCode('US-TX');
      expect(result?.name).toBe('Texas');
      expect(result?.type).toBe('State');
    });

    it('should find Florida (US-FL)', () => {
      const result = subdivision.whereCode('US-FL');
      expect(result?.name).toBe('Florida');
      expect(result?.type).toBe('State');
    });

    it('should find Washington (US-WA)', () => {
      const result = subdivision.whereCode('US-WA');
      expect(result?.name).toBe('Washington');
      expect(result?.type).toBe('State');
    });

    it('should find by name', () => {
      expect(subdivision.whereName('US', 'California')?.code).toBe('US-CA');
      expect(subdivision.whereName('US', 'New York')?.code).toBe('US-NY');
    });

    it('should list all US subdivisions', () => {
      const subs = subdivision.forCountry('US');
      expect(subs.length).toBeGreaterThan(50);
    });
  });

  describe('United Kingdom Subdivisions', () => {
    it('should find England (GB-ENG)', () => {
      const result = subdivision.whereCode('GB-ENG');
      expect(result?.name).toBe('England');
      expect(result?.countryCode).toBe('GB');
    });

    it('should find Scotland (GB-SCT)', () => {
      const result = subdivision.whereCode('GB-SCT');
      expect(result?.name).toBe('Scotland');
    });

    it('should find Wales (GB-WLS)', () => {
      const result = subdivision.whereCode('GB-WLS');
      expect(result?.name).toBe('Wales');
    });

    it('should find Northern Ireland (GB-NIR)', () => {
      const result = subdivision.whereCode('GB-NIR');
      expect(result?.name).toBe('Northern Ireland');
    });

    it('should find London (GB-LND)', () => {
      const result = subdivision.whereCode('GB-LND');
      expect(result?.name).toBe('London, City of');
    });

    it('should find by name', () => {
      expect(subdivision.whereName('GB', 'England')?.code).toBe('GB-ENG');
      expect(subdivision.whereName('GB', 'Scotland')?.code).toBe('GB-SCT');
    });

    it('should list all GB subdivisions', () => {
      const subs = subdivision.forCountry('GB');
      expect(subs.length).toBeGreaterThan(10);
    });
  });

  describe('Germany Subdivisions', () => {
    it('should find Bavaria (DE-BY)', () => {
      const result = subdivision.whereCode('DE-BY');
      expect(result?.name).toBe('Bayern');
      expect(result?.countryCode).toBe('DE');
    });

    it('should find Berlin (DE-BE)', () => {
      const result = subdivision.whereCode('DE-BE');
      expect(result?.name).toBe('Berlin');
    });

    it('should find Hamburg (DE-HH)', () => {
      const result = subdivision.whereCode('DE-HH');
      expect(result?.name).toBe('Hamburg');
    });

    it('should find Hesse (DE-HE)', () => {
      const result = subdivision.whereCode('DE-HE');
      expect(result?.name).toBe('Hessen');
    });

    it('should find North Rhine-Westphalia (DE-NW)', () => {
      const result = subdivision.whereCode('DE-NW');
      expect(result?.name).toBe('Nordrhein-Westfalen');
    });

    it('should find by name', () => {
      expect(subdivision.whereName('DE', 'Berlin')?.code).toBe('DE-BE');
      expect(subdivision.whereName('DE', 'Bayern')?.code).toBe('DE-BY');
    });

    it('should list all DE subdivisions', () => {
      const subs = subdivision.forCountry('DE');
      expect(subs.length).toBe(16); // Germany has 16 federal states
    });
  });

  describe('Japan Subdivisions', () => {
    it('should find Tokyo (JP-13)', () => {
      const result = subdivision.whereCode('JP-13');
      expect(result?.name).toBe('Tôkyô');
      expect(result?.countryCode).toBe('JP');
    });

    it('should find Osaka (JP-27)', () => {
      const result = subdivision.whereCode('JP-27');
      expect(result?.name).toBe('Osaka');
    });

    it('should find Kyoto (JP-26)', () => {
      const result = subdivision.whereCode('JP-26');
      expect(result?.name).toBe('Kyoto');
    });

    it('should find Hokkaido (JP-01)', () => {
      const result = subdivision.whereCode('JP-01');
      expect(result?.name).toBe('Hokkaido');
    });

    it('should find Okinawa (JP-47)', () => {
      const result = subdivision.whereCode('JP-47');
      expect(result?.name).toBe('Okinawa');
    });

    it('should find by name', () => {
      expect(subdivision.whereName('JP', 'Tôkyô')?.code).toBe('JP-13');
      expect(subdivision.whereName('JP', 'Okinawa')?.code).toBe('JP-47');
    });

    it('should list all JP subdivisions', () => {
      const subs = subdivision.forCountry('JP');
      expect(subs.length).toBe(47); // Japan has 47 prefectures
    });
  });

  describe('India Subdivisions', () => {
    it('should find Maharashtra (IN-MH)', () => {
      const result = subdivision.whereCode('IN-MH');
      expect(result?.name).toBe('Maharashtra');
      expect(result?.countryCode).toBe('IN');
    });

    it('should find Delhi (IN-DL)', () => {
      const result = subdivision.whereCode('IN-DL');
      expect(result?.name).toBe('Delhi');
    });

    it('should find Karnataka (IN-KA)', () => {
      const result = subdivision.whereCode('IN-KA');
      expect(result?.name).toBe('Karnataka');
    });

    it('should find Tamil Nadu (IN-TN)', () => {
      const result = subdivision.whereCode('IN-TN');
      expect(result?.name).toBe('Tamil Nadu');
    });

    it('should find West Bengal (IN-WB)', () => {
      const result = subdivision.whereCode('IN-WB');
      expect(result?.name).toBe('West Bengal');
    });

    it('should find by name', () => {
      expect(subdivision.whereName('IN', 'Delhi')?.code).toBe('IN-DL');
      expect(subdivision.whereName('IN', 'West Bengal')?.code).toBe('IN-WB');
    });

    it('should list all IN subdivisions', () => {
      const subs = subdivision.forCountry('IN');
      expect(subs.length).toBeGreaterThan(30);
    });
  });
});

describe('Invalid Country Checks', () => {
  describe('Non-existent country codes', () => {
    it('should return null for invalid alpha-2 codes', () => {
      expect(country.whereAlpha2('XX')).toBeNull();
      expect(country.whereAlpha2('ZZ')).toBeNull();
      expect(country.whereAlpha2('AA')).toBeNull();
      expect(country.whereAlpha2('99')).toBeNull();
    });

    it('should return null for invalid alpha-3 codes', () => {
      expect(country.whereAlpha3('XXX')).toBeNull();
      expect(country.whereAlpha3('ZZZ')).toBeNull();
      expect(country.whereAlpha3('AAA')).toBeNull();
    });

    it('should return null for invalid numeric codes', () => {
      expect(country.whereNumeric(999)).toBeNull();
      expect(country.whereNumeric(0)).toBeNull();
      expect(country.whereNumeric(1000)).toBeNull();
    });

    it('should return null for invalid country names', () => {
      expect(country.whereName('Narnia')).toBeNull();
      expect(country.whereName('Wakanda')).toBeNull();
      expect(country.whereName('Mordor')).toBeNull();
    });
  });

  describe('Invalid format validation', () => {
    it('should return false for isAlpha2 with invalid codes', () => {
      expect(country.isAlpha2('XX')).toBe(false);
      expect(country.isAlpha2('USA')).toBe(false);
      expect(country.isAlpha2('')).toBe(false);
      expect(country.isAlpha2('1')).toBe(false);
    });

    it('should return false for isAlpha3 with invalid codes', () => {
      expect(country.isAlpha3('XXX')).toBe(false);
      expect(country.isAlpha3('US')).toBe(false);
      expect(country.isAlpha3('')).toBe(false);
    });

    it('should return false for isNumeric with invalid codes', () => {
      expect(country.isNumeric(999)).toBe(false);
      expect(country.isNumeric('abc')).toBe(false);
      expect(country.isNumeric(-1)).toBe(false);
    });

    it('should return false for isValid with any invalid input', () => {
      expect(country.isValid('XX')).toBe(false);
      expect(country.isValid('XXX')).toBe(false);
      expect(country.isValid(999)).toBe(false);
      expect(country.isValid('Narnia')).toBe(false);
    });
  });

  describe('Conversion failures for invalid countries', () => {
    it('should return null for alpha2ToAlpha3 with invalid code', () => {
      expect(country.alpha2ToAlpha3('XX')).toBeNull();
    });

    it('should return null for alpha3ToAlpha2 with invalid code', () => {
      expect(country.alpha3ToAlpha2('XXX')).toBeNull();
    });

    it('should return null for toName with invalid code', () => {
      expect(country.toName('XX')).toBeNull();
      expect(country.toName('XXX')).toBeNull();
    });

    it('should return null for detectFormat with invalid input', () => {
      expect(country.detectFormat('XX')).toBeNull();
      expect(country.detectFormat('XXX')).toBeNull();
      expect(country.detectFormat('Narnia')).toBeNull();
    });
  });
});

describe('Subdivision Not Supported Checks', () => {
  describe('Invalid subdivision codes', () => {
    it('should return null for non-existent subdivision codes', () => {
      expect(subdivision.whereCode('US-XX')).toBeNull();
      expect(subdivision.whereCode('GB-XX')).toBeNull();
      expect(subdivision.whereCode('DE-XX')).toBeNull();
    });

    it('should return null for invalid country in subdivision code', () => {
      expect(subdivision.whereCode('XX-CA')).toBeNull();
      expect(subdivision.whereCode('ZZ-NY')).toBeNull();
    });

    it('should return null for malformed subdivision codes', () => {
      expect(subdivision.whereCode('invalid')).toBeNull();
      expect(subdivision.whereCode('')).toBeNull();
      expect(subdivision.whereCode('US')).toBeNull();
      expect(subdivision.whereCode('USCA')).toBeNull();
    });
  });

  describe('Subdivision lookup failures', () => {
    it('should return null for where() with invalid country', () => {
      expect(subdivision.where('XX', 'CA')).toBeNull();
      expect(subdivision.where('ZZ', 'NY')).toBeNull();
    });

    it('should return null for where() with invalid region', () => {
      expect(subdivision.where('US', 'XX')).toBeNull();
      expect(subdivision.where('GB', 'ZZ')).toBeNull();
      expect(subdivision.where('DE', '99')).toBeNull();
    });

    it('should return null for whereName() with invalid country', () => {
      expect(subdivision.whereName('XX', 'California')).toBeNull();
    });

    it('should return null for whereName() with invalid name', () => {
      expect(subdivision.whereName('US', 'Narnia')).toBeNull();
      expect(subdivision.whereName('GB', 'Mordor')).toBeNull();
      expect(subdivision.whereName('DE', 'Wakanda')).toBeNull();
    });
  });

  describe('forCountry with invalid countries', () => {
    it('should return empty array for non-existent country', () => {
      expect(subdivision.forCountry('XX')).toEqual([]);
      expect(subdivision.forCountry('ZZ')).toEqual([]);
    });

    it('should return empty array for invalid country format', () => {
      expect(subdivision.forCountry('')).toEqual([]);
      expect(subdivision.forCountry('INVALID')).toEqual([]);
    });
  });

  describe('hasSubdivisions checks', () => {
    it('should return true for countries with subdivisions', () => {
      expect(subdivision.hasSubdivisions('US')).toBe(true);
      expect(subdivision.hasSubdivisions('GB')).toBe(true);
      expect(subdivision.hasSubdivisions('DE')).toBe(true);
      expect(subdivision.hasSubdivisions('JP')).toBe(true);
      expect(subdivision.hasSubdivisions('IN')).toBe(true);
    });

    it('should return false for invalid country codes', () => {
      expect(subdivision.hasSubdivisions('XX')).toBe(false);
      expect(subdivision.hasSubdivisions('ZZ')).toBe(false);
      expect(subdivision.hasSubdivisions('')).toBe(false);
    });
  });

  describe('Subdivision validation failures', () => {
    it('should return false for isValidCode with invalid codes', () => {
      expect(subdivision.isValidCode('XX-YY')).toBe(false);
      expect(subdivision.isValidCode('US-XX')).toBe(false);
      expect(subdivision.isValidCode('invalid')).toBe(false);
    });

    it('should return false for isValidRegion with invalid inputs', () => {
      expect(subdivision.isValidRegion('XX', 'CA')).toBe(false);
      expect(subdivision.isValidRegion('US', 'XX')).toBe(false);
      expect(subdivision.isValidRegion('', '')).toBe(false);
    });

    it('should return false for isValidName with invalid inputs', () => {
      expect(subdivision.isValidName('XX', 'California')).toBe(false);
      expect(subdivision.isValidName('US', 'Narnia')).toBe(false);
    });
  });

  describe('Conversion failures for invalid subdivisions', () => {
    it('should return null for toRegionCode with invalid code', () => {
      expect(subdivision.toRegionCode('invalid')).toBeNull();
      expect(subdivision.toRegionCode('')).toBeNull();
    });

    it('should return null for toFullCode with invalid inputs', () => {
      expect(subdivision.toFullCode('XX', 'YY')).toBeNull();
      expect(subdivision.toFullCode('US', 'XX')).toBeNull();
    });

    it('should return null for toName with invalid code', () => {
      expect(subdivision.toName('XX-YY')).toBeNull();
      expect(subdivision.toName('US-XX')).toBeNull();
    });

    it('should return null for toCountryCode with invalid code', () => {
      expect(subdivision.toCountryCode('invalid')).toBeNull();
    });
  });
});

describe('Cross-country subdivision checks', () => {
  it('should not find US subdivision code in other countries', () => {
    // CA is a valid US state but not a valid region for other countries
    expect(subdivision.where('GB', 'CA')).toBeNull();
    expect(subdivision.where('DE', 'CA')).toBeNull();
  });

  it('should not find GB subdivision code in other countries', () => {
    expect(subdivision.where('US', 'ENG')).toBeNull();
    expect(subdivision.where('DE', 'SCT')).toBeNull();
  });

  it('should correctly identify country from subdivision code', () => {
    expect(subdivision.toCountryCode('US-CA')).toBe('US');
    expect(subdivision.toCountryCode('GB-ENG')).toBe('GB');
    expect(subdivision.toCountryCode('DE-BY')).toBe('DE');
    expect(subdivision.toCountryCode('JP-13')).toBe('JP');
    expect(subdivision.toCountryCode('IN-MH')).toBe('IN');
  });
});
