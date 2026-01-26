/**
 * Geography module
 *
 * Provides continent and region lookup functions (UN M49 classification).
 */

import * as lookup from './lookup';

// ============ Namespace Export ============

/**
 * Geography functions
 * Get continent and region data for any country
 */
export const geography = {
  getContinent: lookup.getContinent,
  getRegion: lookup.getRegion,
  getGeography: lookup.getGeography,
  getCountriesByContinent: lookup.getCountriesByContinent,
  getCountriesByRegion: lookup.getCountriesByRegion,
  countriesInContinent: lookup.countriesInContinent,
  countriesInRegion: lookup.countriesInRegion,
  getContinents: lookup.getContinents,
  getRegions: lookup.getRegions,
};

// ============ Named Exports ============

export {
  getContinent,
  getRegion,
  getGeography,
  countriesInContinent,
  countriesInRegion,
  getCountriesByContinent,
  getCountriesByRegion,
  getContinents,
  getRegions,
} from './lookup';

// Data exports (for advanced usage)
export { geography as geographyData, continentIndex, regionIndex } from './data';
