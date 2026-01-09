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
