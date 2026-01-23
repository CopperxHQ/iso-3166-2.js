/**
 * EU Member States (27 as of 2024, post-Brexit)
 */
export const EU_MEMBERS = new Set([
  'AT', // Austria
  'BE', // Belgium
  'BG', // Bulgaria
  'HR', // Croatia
  'CY', // Cyprus
  'CZ', // Czech Republic
  'DK', // Denmark
  'EE', // Estonia
  'FI', // Finland
  'FR', // France
  'DE', // Germany
  'GR', // Greece
  'HU', // Hungary
  'IE', // Ireland
  'IT', // Italy
  'LV', // Latvia
  'LT', // Lithuania
  'LU', // Luxembourg
  'MT', // Malta
  'NL', // Netherlands
  'PL', // Poland
  'PT', // Portugal
  'RO', // Romania
  'SK', // Slovakia
  'SI', // Slovenia
  'ES', // Spain
  'SE', // Sweden
]);

/**
 * EEA Members (30) - EU + EFTA members except Switzerland
 */
export const EEA_MEMBERS = new Set([
  ...EU_MEMBERS,
  'IS', // Iceland
  'LI', // Liechtenstein
  'NO', // Norway
]);

/**
 * SEPA Members (36 countries/territories)
 * Single Euro Payments Area
 */
export const SEPA_MEMBERS = new Set([
  ...EEA_MEMBERS,
  'CH', // Switzerland
  'MC', // Monaco
  'SM', // San Marino
  'AD', // Andorra
  'VA', // Vatican City
  'GB', // United Kingdom (still in SEPA post-Brexit)
  'GI', // Gibraltar
]);

/**
 * Eurozone Members (20) - EU countries using EUR
 */
export const EUROZONE_MEMBERS = new Set([
  'AT', // Austria
  'BE', // Belgium
  'CY', // Cyprus
  'EE', // Estonia
  'FI', // Finland
  'FR', // France
  'DE', // Germany
  'GR', // Greece
  'IE', // Ireland
  'IT', // Italy
  'LV', // Latvia
  'LT', // Lithuania
  'LU', // Luxembourg
  'MT', // Malta
  'NL', // Netherlands
  'PT', // Portugal
  'SK', // Slovakia
  'SI', // Slovenia
  'ES', // Spain
  'HR', // Croatia (joined 2023)
]);

/**
 * Schengen Area Members (27)
 */
export const SCHENGEN_MEMBERS = new Set([
  'AT', // Austria
  'BE', // Belgium
  'HR', // Croatia (joined 2023)
  'CZ', // Czech Republic
  'DK', // Denmark
  'EE', // Estonia
  'FI', // Finland
  'FR', // France
  'DE', // Germany
  'GR', // Greece
  'HU', // Hungary
  'IS', // Iceland (non-EU)
  'IT', // Italy
  'LV', // Latvia
  'LI', // Liechtenstein (non-EU)
  'LT', // Lithuania
  'LU', // Luxembourg
  'MT', // Malta
  'NL', // Netherlands
  'NO', // Norway (non-EU)
  'PL', // Poland
  'PT', // Portugal
  'SK', // Slovakia
  'SI', // Slovenia
  'ES', // Spain
  'SE', // Sweden
  'CH', // Switzerland (non-EU)
]);

/**
 * All membership sets for generic lookup
 */
export const MEMBERSHIP_SETS = {
  EU: EU_MEMBERS,
  SEPA: SEPA_MEMBERS,
  EEA: EEA_MEMBERS,
  Eurozone: EUROZONE_MEMBERS,
  Schengen: SCHENGEN_MEMBERS,
} as const;
