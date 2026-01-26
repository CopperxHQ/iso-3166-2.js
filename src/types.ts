// ============ ISO 3166-1 Types ============

/**
 * Represents a country with all ISO 3166-1 code formats
 */
export interface Country {
  /** Full country name (e.g., "United States") */
  name: string;
  /** ISO 3166-1 alpha-2 code (e.g., "US") */
  alpha2: string;
  /** ISO 3166-1 alpha-3 code (e.g., "USA") */
  alpha3: string;
  /** ISO 3166-1 numeric code (e.g., "840") */
  numeric: string;
}

// ============ ISO 3166-2 Types ============

/**
 * Basic subdivision information (stored in data)
 */
export interface SubdivisionInfo {
  /** Subdivision name (e.g., "California") */
  name: string;
  /** Subdivision type (e.g., "State", "Province", "County") */
  type: string;
}

/**
 * Full subdivision with all computed fields
 */
export interface Subdivision extends SubdivisionInfo {
  /** Full ISO 3166-2 code (e.g., "US-CA") */
  code: string;
  /** Country alpha-2 code (e.g., "US") */
  countryCode: string;
  /** Country name (e.g., "United States") */
  countryName: string;
  /** Region code without country prefix (e.g., "CA") */
  regionCode: string;
}

// ============ Extended Types ============

/**
 * Country with all its subdivisions included
 */
export interface CountryWithSubdivisions extends Country {
  /** All subdivisions indexed by full code */
  subdivisions: Record<string, SubdivisionInfo>;
}

/**
 * Supported country code formats
 */
export type CountryCodeFormat = 'alpha2' | 'alpha3' | 'numeric';

// ============ Internal Data Types ============

/**
 * Country record as stored in data (without alpha2 which is the key)
 */
export interface CountryRecord {
  name: string;
  alpha3: string;
  numeric: string;
}

/**
 * Main country data structure
 */
export type CountryData = Record<string, CountryRecord>;

/**
 * Subdivision data for a single country
 */
export type SubdivisionData = Record<string, SubdivisionInfo>;

// ============ Postal Code Types ============

/**
 * Postal code information for a country
 */
export interface PostalCodeInfo {
  /** Regex pattern for validation */
  regex: RegExp;
  /** Human-readable format (e.g., "NNNNN" or "A1A 1A1") */
  format: string;
  /** Local terminology (e.g., "ZIP Code", "PIN Code", "Postcode") */
  name: string;
}

// ============ Currency Types ============

/**
 * Currency information for a country
 */
export interface CurrencyInfo {
  /** ISO 4217 currency code (e.g., "USD") */
  code: string;
  /** Currency symbol (e.g., "$", "€", "£") */
  symbol: string;
  /** Full currency name (e.g., "US Dollar") */
  name: string;
}

// ============ Dial Code Types ============

/**
 * Phone dial code information for a country
 */
export interface DialCodeInfo {
  /** International dial code (e.g., "+1") */
  dialCode: string;
  /** Country alpha-2 code (e.g., "US") */
  countryCode: string;
}

// ============ Geography Types ============

/**
 * Continent names (7 continents)
 */
export type Continent =
  | 'Africa'
  | 'Antarctica'
  | 'Asia'
  | 'Europe'
  | 'North America'
  | 'Oceania'
  | 'South America';

/**
 * UN M49 geographic regions
 */
export type Region =
  | 'Northern Africa'
  | 'Sub-Saharan Africa'
  | 'Eastern Africa'
  | 'Middle Africa'
  | 'Southern Africa'
  | 'Western Africa'
  | 'Caribbean'
  | 'Central America'
  | 'Northern America'
  | 'South America'
  | 'Central Asia'
  | 'Eastern Asia'
  | 'South-eastern Asia'
  | 'Southern Asia'
  | 'Western Asia'
  | 'Eastern Europe'
  | 'Northern Europe'
  | 'Southern Europe'
  | 'Western Europe'
  | 'Australia and New Zealand'
  | 'Melanesia'
  | 'Micronesia'
  | 'Polynesia'
  | 'Antarctica';

/**
 * Geographic information for a country
 */
export interface GeographicInfo {
  /** Continent name */
  continent: Continent;
  /** UN M49 region */
  region: Region;
}

// ============ Membership Types ============

/**
 * Political/economic union membership types
 */
export type MembershipType = 'EU' | 'SEPA' | 'EEA' | 'Eurozone' | 'Schengen';

/**
 * Membership status for a country
 */
export interface MembershipInfo {
  /** European Union member */
  EU: boolean;
  /** Single Euro Payments Area member */
  SEPA: boolean;
  /** European Economic Area member */
  EEA: boolean;
  /** Uses Euro as currency */
  Eurozone: boolean;
  /** Schengen Area member */
  Schengen: boolean;
}
