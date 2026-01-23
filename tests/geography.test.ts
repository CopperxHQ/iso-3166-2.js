import { describe, it, expect } from 'vitest';
import {
  getContinent,
  getRegion,
  getGeography,
  countriesInContinent,
  countriesInRegion,
  geography,
  continentIndex,
  regionIndex,
} from '../src/geography';
import type { Continent, Region } from '../src/types';

describe('Geography Module', () => {
  describe('getContinent', () => {
    it('should return correct continent for various countries', () => {
      expect(getContinent('US')).toBe('North America');
      expect(getContinent('CA')).toBe('North America');
      expect(getContinent('MX')).toBe('North America');
      expect(getContinent('FR')).toBe('Europe');
      expect(getContinent('DE')).toBe('Europe');
      expect(getContinent('GB')).toBe('Europe');
      expect(getContinent('JP')).toBe('Asia');
      expect(getContinent('CN')).toBe('Asia');
      expect(getContinent('IN')).toBe('Asia');
      expect(getContinent('AU')).toBe('Oceania');
      expect(getContinent('NZ')).toBe('Oceania');
      expect(getContinent('BR')).toBe('South America');
      expect(getContinent('AR')).toBe('South America');
      expect(getContinent('ZA')).toBe('Africa');
      expect(getContinent('EG')).toBe('Africa');
      expect(getContinent('NG')).toBe('Africa');
    });

    it('should be case-insensitive', () => {
      expect(getContinent('us')).toBe('North America');
      expect(getContinent('Us')).toBe('North America');
    });

    it('should return null for invalid country', () => {
      expect(getContinent('XX')).toBeNull();
      expect(getContinent('')).toBeNull();
    });
  });

  describe('getRegion', () => {
    it('should return correct region for various countries', () => {
      expect(getRegion('US')).toBe('Northern America');
      expect(getRegion('CA')).toBe('Northern America');
      expect(getRegion('MX')).toBe('Central America');
      expect(getRegion('FR')).toBe('Western Europe');
      expect(getRegion('DE')).toBe('Western Europe');
      expect(getRegion('GB')).toBe('Northern Europe');
      expect(getRegion('IT')).toBe('Southern Europe');
      expect(getRegion('ES')).toBe('Southern Europe');
      expect(getRegion('PL')).toBe('Eastern Europe');
      expect(getRegion('RU')).toBe('Eastern Europe');
      expect(getRegion('JP')).toBe('Eastern Asia');
      expect(getRegion('CN')).toBe('Eastern Asia');
      expect(getRegion('KR')).toBe('Eastern Asia');
      expect(getRegion('IN')).toBe('Southern Asia');
      expect(getRegion('TH')).toBe('South-eastern Asia');
      expect(getRegion('AU')).toBe('Australia and New Zealand');
      expect(getRegion('EG')).toBe('Northern Africa');
      expect(getRegion('ZA')).toBe('Southern Africa');
      expect(getRegion('NG')).toBe('Western Africa');
    });

    it('should be case-insensitive', () => {
      expect(getRegion('fr')).toBe('Western Europe');
    });

    it('should return null for invalid country', () => {
      expect(getRegion('XX')).toBeNull();
    });
  });

  describe('getGeography', () => {
    it('should return full geographic info', () => {
      const usGeo = getGeography('US');
      expect(usGeo).toEqual({
        continent: 'North America',
        region: 'Northern America',
      });

      const frGeo = getGeography('FR');
      expect(frGeo).toEqual({
        continent: 'Europe',
        region: 'Western Europe',
      });

      const jpGeo = getGeography('JP');
      expect(jpGeo).toEqual({
        continent: 'Asia',
        region: 'Eastern Asia',
      });
    });

    it('should return null for invalid country', () => {
      expect(getGeography('XX')).toBeNull();
    });
  });

  describe('countriesInContinent', () => {
    it('should return countries in Europe', () => {
      const countries = countriesInContinent('Europe');
      expect(countries).toContain('FR');
      expect(countries).toContain('DE');
      expect(countries).toContain('GB');
      expect(countries).toContain('IT');
      expect(countries).not.toContain('US');
      expect(countries).not.toContain('JP');
    });

    it('should return countries in Asia', () => {
      const countries = countriesInContinent('Asia');
      expect(countries).toContain('JP');
      expect(countries).toContain('CN');
      expect(countries).toContain('IN');
      expect(countries).not.toContain('US');
    });

    it('should return countries in North America', () => {
      const countries = countriesInContinent('North America');
      expect(countries).toContain('US');
      expect(countries).toContain('CA');
      expect(countries).toContain('MX');
    });

    it('should return sorted array', () => {
      const countries = countriesInContinent('Europe');
      const sorted = [...countries].sort();
      expect(countries).toEqual(sorted);
    });
  });

  describe('countriesInRegion', () => {
    it('should return countries in Western Europe', () => {
      const countries = countriesInRegion('Western Europe');
      expect(countries).toContain('FR');
      expect(countries).toContain('DE');
      expect(countries).toContain('BE');
      expect(countries).toContain('NL');
      expect(countries).toContain('CH');
      expect(countries).not.toContain('GB'); // Northern Europe
      expect(countries).not.toContain('IT'); // Southern Europe
    });

    it('should return countries in Northern Europe', () => {
      const countries = countriesInRegion('Northern Europe');
      expect(countries).toContain('GB');
      expect(countries).toContain('SE');
      expect(countries).toContain('NO');
      expect(countries).toContain('DK');
      expect(countries).toContain('FI');
    });

    it('should return countries in Eastern Asia', () => {
      const countries = countriesInRegion('Eastern Asia');
      expect(countries).toContain('JP');
      expect(countries).toContain('CN');
      expect(countries).toContain('KR');
      expect(countries).toContain('TW');
    });

    it('should return sorted array', () => {
      const countries = countriesInRegion('Western Europe');
      const sorted = [...countries].sort();
      expect(countries).toEqual(sorted);
    });
  });

  describe('Data Integrity', () => {
    it('should have geography data for major countries', () => {
      const majorCountries = ['US', 'CA', 'GB', 'FR', 'DE', 'JP', 'CN', 'IN', 'AU', 'BR', 'ZA'];
      for (const code of majorCountries) {
        expect(geography[code]).toBeDefined();
        expect(geography[code].continent).toBeDefined();
        expect(geography[code].region).toBeDefined();
      }
    });

    it('should have all 7 continents in index', () => {
      const continents: Continent[] = [
        'Africa',
        'Antarctica',
        'Asia',
        'Europe',
        'North America',
        'Oceania',
        'South America',
      ];
      for (const continent of continents) {
        expect(continentIndex[continent]).toBeDefined();
        expect(continentIndex[continent].length).toBeGreaterThan(0);
      }
    });

    it('should have all UN M49 regions in index', () => {
      const regions: Region[] = [
        'Northern Africa',
        'Eastern Africa',
        'Middle Africa',
        'Southern Africa',
        'Western Africa',
        'Caribbean',
        'Central America',
        'Northern America',
        'South America',
        'Central Asia',
        'Eastern Asia',
        'South-eastern Asia',
        'Southern Asia',
        'Western Asia',
        'Eastern Europe',
        'Northern Europe',
        'Southern Europe',
        'Western Europe',
        'Australia and New Zealand',
        'Melanesia',
        'Micronesia',
        'Polynesia',
      ];
      for (const region of regions) {
        expect(regionIndex[region]).toBeDefined();
      }
    });
  });
});
