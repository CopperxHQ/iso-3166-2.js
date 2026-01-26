import type { Continent, Region, GeographicInfo } from '../types';

/**
 * Geographic information indexed by alpha-2 code
 * Based on UN M49 standard
 */
export const geography: Record<string, GeographicInfo> = {
  // Africa - Northern Africa
  DZ: { continent: 'Africa', region: 'Northern Africa' },
  EG: { continent: 'Africa', region: 'Northern Africa' },
  LY: { continent: 'Africa', region: 'Northern Africa' },
  MA: { continent: 'Africa', region: 'Northern Africa' },
  SD: { continent: 'Africa', region: 'Northern Africa' },
  TN: { continent: 'Africa', region: 'Northern Africa' },
  EH: { continent: 'Africa', region: 'Northern Africa' },

  // Africa - Eastern Africa
  BI: { continent: 'Africa', region: 'Eastern Africa' },
  KM: { continent: 'Africa', region: 'Eastern Africa' },
  DJ: { continent: 'Africa', region: 'Eastern Africa' },
  ER: { continent: 'Africa', region: 'Eastern Africa' },
  ET: { continent: 'Africa', region: 'Eastern Africa' },
  KE: { continent: 'Africa', region: 'Eastern Africa' },
  MG: { continent: 'Africa', region: 'Eastern Africa' },
  MW: { continent: 'Africa', region: 'Eastern Africa' },
  MU: { continent: 'Africa', region: 'Eastern Africa' },
  YT: { continent: 'Africa', region: 'Eastern Africa' },
  MZ: { continent: 'Africa', region: 'Eastern Africa' },
  RE: { continent: 'Africa', region: 'Eastern Africa' },
  RW: { continent: 'Africa', region: 'Eastern Africa' },
  SC: { continent: 'Africa', region: 'Eastern Africa' },
  SO: { continent: 'Africa', region: 'Eastern Africa' },
  SS: { continent: 'Africa', region: 'Eastern Africa' },
  TZ: { continent: 'Africa', region: 'Eastern Africa' },
  UG: { continent: 'Africa', region: 'Eastern Africa' },
  ZM: { continent: 'Africa', region: 'Eastern Africa' },
  ZW: { continent: 'Africa', region: 'Eastern Africa' },

  // Africa - Middle Africa
  AO: { continent: 'Africa', region: 'Middle Africa' },
  CM: { continent: 'Africa', region: 'Middle Africa' },
  CF: { continent: 'Africa', region: 'Middle Africa' },
  TD: { continent: 'Africa', region: 'Middle Africa' },
  CG: { continent: 'Africa', region: 'Middle Africa' },
  CD: { continent: 'Africa', region: 'Middle Africa' },
  GQ: { continent: 'Africa', region: 'Middle Africa' },
  GA: { continent: 'Africa', region: 'Middle Africa' },
  ST: { continent: 'Africa', region: 'Middle Africa' },

  // Africa - Southern Africa
  BW: { continent: 'Africa', region: 'Southern Africa' },
  SZ: { continent: 'Africa', region: 'Southern Africa' },
  LS: { continent: 'Africa', region: 'Southern Africa' },
  NA: { continent: 'Africa', region: 'Southern Africa' },
  ZA: { continent: 'Africa', region: 'Southern Africa' },

  // Africa - Western Africa
  BJ: { continent: 'Africa', region: 'Western Africa' },
  BF: { continent: 'Africa', region: 'Western Africa' },
  CV: { continent: 'Africa', region: 'Western Africa' },
  CI: { continent: 'Africa', region: 'Western Africa' },
  GM: { continent: 'Africa', region: 'Western Africa' },
  GH: { continent: 'Africa', region: 'Western Africa' },
  GN: { continent: 'Africa', region: 'Western Africa' },
  GW: { continent: 'Africa', region: 'Western Africa' },
  LR: { continent: 'Africa', region: 'Western Africa' },
  ML: { continent: 'Africa', region: 'Western Africa' },
  MR: { continent: 'Africa', region: 'Western Africa' },
  NE: { continent: 'Africa', region: 'Western Africa' },
  NG: { continent: 'Africa', region: 'Western Africa' },
  SH: { continent: 'Africa', region: 'Western Africa' },
  SN: { continent: 'Africa', region: 'Western Africa' },
  SL: { continent: 'Africa', region: 'Western Africa' },
  TG: { continent: 'Africa', region: 'Western Africa' },

  // Antarctica
  AQ: { continent: 'Antarctica', region: 'Antarctica' },
  BV: { continent: 'Antarctica', region: 'Antarctica' },
  GS: { continent: 'Antarctica', region: 'Antarctica' },
  HM: { continent: 'Antarctica', region: 'Antarctica' },
  TF: { continent: 'Antarctica', region: 'Antarctica' },

  // Asia - Central Asia
  KZ: { continent: 'Asia', region: 'Central Asia' },
  KG: { continent: 'Asia', region: 'Central Asia' },
  TJ: { continent: 'Asia', region: 'Central Asia' },
  TM: { continent: 'Asia', region: 'Central Asia' },
  UZ: { continent: 'Asia', region: 'Central Asia' },

  // Asia - Eastern Asia
  CN: { continent: 'Asia', region: 'Eastern Asia' },
  HK: { continent: 'Asia', region: 'Eastern Asia' },
  MO: { continent: 'Asia', region: 'Eastern Asia' },
  JP: { continent: 'Asia', region: 'Eastern Asia' },
  KP: { continent: 'Asia', region: 'Eastern Asia' },
  KR: { continent: 'Asia', region: 'Eastern Asia' },
  MN: { continent: 'Asia', region: 'Eastern Asia' },
  TW: { continent: 'Asia', region: 'Eastern Asia' },

  // Asia - South-eastern Asia
  BN: { continent: 'Asia', region: 'South-eastern Asia' },
  KH: { continent: 'Asia', region: 'South-eastern Asia' },
  ID: { continent: 'Asia', region: 'South-eastern Asia' },
  LA: { continent: 'Asia', region: 'South-eastern Asia' },
  MY: { continent: 'Asia', region: 'South-eastern Asia' },
  MM: { continent: 'Asia', region: 'South-eastern Asia' },
  PH: { continent: 'Asia', region: 'South-eastern Asia' },
  SG: { continent: 'Asia', region: 'South-eastern Asia' },
  TH: { continent: 'Asia', region: 'South-eastern Asia' },
  TL: { continent: 'Asia', region: 'South-eastern Asia' },
  VN: { continent: 'Asia', region: 'South-eastern Asia' },

  // Asia - Southern Asia
  AF: { continent: 'Asia', region: 'Southern Asia' },
  BD: { continent: 'Asia', region: 'Southern Asia' },
  BT: { continent: 'Asia', region: 'Southern Asia' },
  IN: { continent: 'Asia', region: 'Southern Asia' },
  IR: { continent: 'Asia', region: 'Southern Asia' },
  MV: { continent: 'Asia', region: 'Southern Asia' },
  NP: { continent: 'Asia', region: 'Southern Asia' },
  PK: { continent: 'Asia', region: 'Southern Asia' },
  LK: { continent: 'Asia', region: 'Southern Asia' },
  IO: { continent: 'Asia', region: 'Southern Asia' },

  // Asia - Western Asia
  AM: { continent: 'Asia', region: 'Western Asia' },
  AZ: { continent: 'Asia', region: 'Western Asia' },
  BH: { continent: 'Asia', region: 'Western Asia' },
  CY: { continent: 'Asia', region: 'Western Asia' },
  GE: { continent: 'Asia', region: 'Western Asia' },
  IQ: { continent: 'Asia', region: 'Western Asia' },
  IL: { continent: 'Asia', region: 'Western Asia' },
  JO: { continent: 'Asia', region: 'Western Asia' },
  KW: { continent: 'Asia', region: 'Western Asia' },
  LB: { continent: 'Asia', region: 'Western Asia' },
  OM: { continent: 'Asia', region: 'Western Asia' },
  PS: { continent: 'Asia', region: 'Western Asia' },
  QA: { continent: 'Asia', region: 'Western Asia' },
  SA: { continent: 'Asia', region: 'Western Asia' },
  SY: { continent: 'Asia', region: 'Western Asia' },
  TR: { continent: 'Asia', region: 'Western Asia' },
  AE: { continent: 'Asia', region: 'Western Asia' },
  YE: { continent: 'Asia', region: 'Western Asia' },

  // Europe - Eastern Europe
  BY: { continent: 'Europe', region: 'Eastern Europe' },
  BG: { continent: 'Europe', region: 'Eastern Europe' },
  CZ: { continent: 'Europe', region: 'Eastern Europe' },
  HU: { continent: 'Europe', region: 'Eastern Europe' },
  MD: { continent: 'Europe', region: 'Eastern Europe' },
  PL: { continent: 'Europe', region: 'Eastern Europe' },
  RO: { continent: 'Europe', region: 'Eastern Europe' },
  RU: { continent: 'Europe', region: 'Eastern Europe' },
  SK: { continent: 'Europe', region: 'Eastern Europe' },
  UA: { continent: 'Europe', region: 'Eastern Europe' },

  // Europe - Northern Europe
  AX: { continent: 'Europe', region: 'Northern Europe' },
  DK: { continent: 'Europe', region: 'Northern Europe' },
  EE: { continent: 'Europe', region: 'Northern Europe' },
  FO: { continent: 'Europe', region: 'Northern Europe' },
  FI: { continent: 'Europe', region: 'Northern Europe' },
  GG: { continent: 'Europe', region: 'Northern Europe' },
  IS: { continent: 'Europe', region: 'Northern Europe' },
  IE: { continent: 'Europe', region: 'Northern Europe' },
  IM: { continent: 'Europe', region: 'Northern Europe' },
  JE: { continent: 'Europe', region: 'Northern Europe' },
  LV: { continent: 'Europe', region: 'Northern Europe' },
  LT: { continent: 'Europe', region: 'Northern Europe' },
  NO: { continent: 'Europe', region: 'Northern Europe' },
  SJ: { continent: 'Europe', region: 'Northern Europe' },
  SE: { continent: 'Europe', region: 'Northern Europe' },
  GB: { continent: 'Europe', region: 'Northern Europe' },

  // Europe - Southern Europe
  AL: { continent: 'Europe', region: 'Southern Europe' },
  AD: { continent: 'Europe', region: 'Southern Europe' },
  BA: { continent: 'Europe', region: 'Southern Europe' },
  HR: { continent: 'Europe', region: 'Southern Europe' },
  GI: { continent: 'Europe', region: 'Southern Europe' },
  GR: { continent: 'Europe', region: 'Southern Europe' },
  IT: { continent: 'Europe', region: 'Southern Europe' },
  MT: { continent: 'Europe', region: 'Southern Europe' },
  ME: { continent: 'Europe', region: 'Southern Europe' },
  MK: { continent: 'Europe', region: 'Southern Europe' },
  PT: { continent: 'Europe', region: 'Southern Europe' },
  SM: { continent: 'Europe', region: 'Southern Europe' },
  RS: { continent: 'Europe', region: 'Southern Europe' },
  SI: { continent: 'Europe', region: 'Southern Europe' },
  ES: { continent: 'Europe', region: 'Southern Europe' },
  VA: { continent: 'Europe', region: 'Southern Europe' },

  // Europe - Western Europe
  AT: { continent: 'Europe', region: 'Western Europe' },
  BE: { continent: 'Europe', region: 'Western Europe' },
  FR: { continent: 'Europe', region: 'Western Europe' },
  DE: { continent: 'Europe', region: 'Western Europe' },
  LI: { continent: 'Europe', region: 'Western Europe' },
  LU: { continent: 'Europe', region: 'Western Europe' },
  MC: { continent: 'Europe', region: 'Western Europe' },
  NL: { continent: 'Europe', region: 'Western Europe' },
  CH: { continent: 'Europe', region: 'Western Europe' },

  // North America - Caribbean
  AI: { continent: 'North America', region: 'Caribbean' },
  AG: { continent: 'North America', region: 'Caribbean' },
  AW: { continent: 'North America', region: 'Caribbean' },
  BS: { continent: 'North America', region: 'Caribbean' },
  BB: { continent: 'North America', region: 'Caribbean' },
  BQ: { continent: 'North America', region: 'Caribbean' },
  VG: { continent: 'North America', region: 'Caribbean' },
  KY: { continent: 'North America', region: 'Caribbean' },
  CU: { continent: 'North America', region: 'Caribbean' },
  CW: { continent: 'North America', region: 'Caribbean' },
  DM: { continent: 'North America', region: 'Caribbean' },
  DO: { continent: 'North America', region: 'Caribbean' },
  GD: { continent: 'North America', region: 'Caribbean' },
  GP: { continent: 'North America', region: 'Caribbean' },
  HT: { continent: 'North America', region: 'Caribbean' },
  JM: { continent: 'North America', region: 'Caribbean' },
  MQ: { continent: 'North America', region: 'Caribbean' },
  MS: { continent: 'North America', region: 'Caribbean' },
  PR: { continent: 'North America', region: 'Caribbean' },
  BL: { continent: 'North America', region: 'Caribbean' },
  KN: { continent: 'North America', region: 'Caribbean' },
  LC: { continent: 'North America', region: 'Caribbean' },
  MF: { continent: 'North America', region: 'Caribbean' },
  VC: { continent: 'North America', region: 'Caribbean' },
  SX: { continent: 'North America', region: 'Caribbean' },
  TT: { continent: 'North America', region: 'Caribbean' },
  TC: { continent: 'North America', region: 'Caribbean' },
  VI: { continent: 'North America', region: 'Caribbean' },

  // North America - Central America
  BZ: { continent: 'North America', region: 'Central America' },
  CR: { continent: 'North America', region: 'Central America' },
  SV: { continent: 'North America', region: 'Central America' },
  GT: { continent: 'North America', region: 'Central America' },
  HN: { continent: 'North America', region: 'Central America' },
  MX: { continent: 'North America', region: 'Central America' },
  NI: { continent: 'North America', region: 'Central America' },
  PA: { continent: 'North America', region: 'Central America' },

  // North America - Northern America
  BM: { continent: 'North America', region: 'Northern America' },
  CA: { continent: 'North America', region: 'Northern America' },
  GL: { continent: 'North America', region: 'Northern America' },
  PM: { continent: 'North America', region: 'Northern America' },
  US: { continent: 'North America', region: 'Northern America' },
  UM: { continent: 'North America', region: 'Northern America' },

  // Oceania - Australia and New Zealand
  AU: { continent: 'Oceania', region: 'Australia and New Zealand' },
  CX: { continent: 'Oceania', region: 'Australia and New Zealand' },
  CC: { continent: 'Oceania', region: 'Australia and New Zealand' },
  NZ: { continent: 'Oceania', region: 'Australia and New Zealand' },
  NF: { continent: 'Oceania', region: 'Australia and New Zealand' },

  // Oceania - Melanesia
  FJ: { continent: 'Oceania', region: 'Melanesia' },
  NC: { continent: 'Oceania', region: 'Melanesia' },
  PG: { continent: 'Oceania', region: 'Melanesia' },
  SB: { continent: 'Oceania', region: 'Melanesia' },
  VU: { continent: 'Oceania', region: 'Melanesia' },

  // Oceania - Micronesia
  GU: { continent: 'Oceania', region: 'Micronesia' },
  KI: { continent: 'Oceania', region: 'Micronesia' },
  MH: { continent: 'Oceania', region: 'Micronesia' },
  FM: { continent: 'Oceania', region: 'Micronesia' },
  NR: { continent: 'Oceania', region: 'Micronesia' },
  MP: { continent: 'Oceania', region: 'Micronesia' },
  PW: { continent: 'Oceania', region: 'Micronesia' },

  // Oceania - Polynesia
  AS: { continent: 'Oceania', region: 'Polynesia' },
  CK: { continent: 'Oceania', region: 'Polynesia' },
  PF: { continent: 'Oceania', region: 'Polynesia' },
  NU: { continent: 'Oceania', region: 'Polynesia' },
  PN: { continent: 'Oceania', region: 'Polynesia' },
  WS: { continent: 'Oceania', region: 'Polynesia' },
  TK: { continent: 'Oceania', region: 'Polynesia' },
  TO: { continent: 'Oceania', region: 'Polynesia' },
  TV: { continent: 'Oceania', region: 'Polynesia' },
  WF: { continent: 'Oceania', region: 'Polynesia' },

  // South America
  AR: { continent: 'South America', region: 'South America' },
  BO: { continent: 'South America', region: 'South America' },
  BR: { continent: 'South America', region: 'South America' },
  CL: { continent: 'South America', region: 'South America' },
  CO: { continent: 'South America', region: 'South America' },
  EC: { continent: 'South America', region: 'South America' },
  FK: { continent: 'South America', region: 'South America' },
  GF: { continent: 'South America', region: 'South America' },
  GY: { continent: 'South America', region: 'South America' },
  PY: { continent: 'South America', region: 'South America' },
  PE: { continent: 'South America', region: 'South America' },
  SR: { continent: 'South America', region: 'South America' },
  UY: { continent: 'South America', region: 'South America' },
  VE: { continent: 'South America', region: 'South America' },
};

// Pre-computed indexes for O(1) lookup (avoids runtime computation)
const buildContinentIndex = (): Record<Continent, string[]> => {
  const index: Record<string, string[]> = {};
  for (const [code, info] of Object.entries(geography)) {
    if (!index[info.continent]) index[info.continent] = [];
    index[info.continent].push(code);
  }
  for (const key of Object.keys(index)) {
    index[key].sort();
  }
  return index as Record<Continent, string[]>;
};

const buildRegionIndex = (): Record<Region, string[]> => {
  const index: Record<string, string[]> = {};
  for (const [code, info] of Object.entries(geography)) {
    if (!index[info.region]) index[info.region] = [];
    index[info.region].push(code);
  }
  for (const key of Object.keys(index)) {
    index[key].sort();
  }
  return index as Record<Region, string[]>;
};

/**
 * Continent to countries index
 */
export const continentIndex: Record<Continent, string[]> = buildContinentIndex();

/**
 * Region to countries index
 */
export const regionIndex: Record<Region, string[]> = buildRegionIndex();
