import { normalize } from '../utils';
import { geography, continentIndex, regionIndex } from './data';
import type { Continent, Region, GeographicInfo } from '../types';

/**
 * Get continent for a country
 * @param alpha2 - Country alpha-2 code
 * @returns Continent name or null
 * @example
 * getContinent('US') // 'North America'
 * getContinent('FR') // 'Europe'
 * getContinent('JP') // 'Asia'
 */
export function getContinent(alpha2: string): Continent | null {
  const code = normalize(alpha2);
  return geography[code]?.continent ?? null;
}

/**
 * Get UN M49 region for a country
 * @param alpha2 - Country alpha-2 code
 * @returns Region name or null
 * @example
 * getRegion('US') // 'Northern America'
 * getRegion('FR') // 'Western Europe'
 * getRegion('JP') // 'Eastern Asia'
 */
export function getRegion(alpha2: string): Region | null {
  const code = normalize(alpha2);
  return geography[code]?.region ?? null;
}

/**
 * Get full geographic info for a country
 * @param alpha2 - Country alpha-2 code
 * @returns GeographicInfo or null
 * @example
 * getGeography('US') // { continent: 'North America', region: 'Northern America' }
 */
export function getGeography(alpha2: string): GeographicInfo | null {
  const code = normalize(alpha2);
  return geography[code] ?? null;
}

/**
 * Get all countries in a continent
 * @param continent - Continent name
 * @returns Array of alpha-2 codes
 * @example
 * countriesInContinent('Europe') // ['AD', 'AL', 'AT', ...]
 */
export function countriesInContinent(continent: Continent): string[] {
  return continentIndex[continent] ?? [];
}

/**
 * Get all countries in a region
 * @param region - UN M49 region name
 * @returns Array of alpha-2 codes
 * @example
 * countriesInRegion('Western Europe') // ['AT', 'BE', 'CH', 'DE', 'FR', 'LI', 'LU', 'MC', 'NL']
 */
export function countriesInRegion(region: Region): string[] {
  return regionIndex[region] ?? [];
}
