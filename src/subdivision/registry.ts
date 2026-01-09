import type { SubdivisionInfo } from '../types';

/**
 * Runtime registry for subdivision data
 * Populated when subdivision data files are imported
 */
const subdivisionRegistry: Record<string, Record<string, SubdivisionInfo>> = {};
const countryNameRegistry: Record<string, string> = {};

/**
 * Register a country's subdivisions
 * Called automatically when importing subdivision data files
 */
export function register(
  countryCode: string,
  countryName: string,
  data: Record<string, SubdivisionInfo>
): void {
  subdivisionRegistry[countryCode] = data;
  countryNameRegistry[countryCode] = countryName;
}

/**
 * Get subdivisions for a country
 */
export function getSubdivisions(
  countryCode: string
): Record<string, SubdivisionInfo> | undefined {
  return subdivisionRegistry[countryCode];
}

/**
 * Get country name from registry
 */
export function getCountryName(countryCode: string): string | undefined {
  return countryNameRegistry[countryCode];
}

/**
 * Get all registered subdivisions
 */
export function getAllSubdivisions(): Record<
  string,
  Record<string, SubdivisionInfo>
> {
  return subdivisionRegistry;
}

/**
 * Get all registered country names
 */
export function getAllCountryNames(): Record<string, string> {
  return countryNameRegistry;
}

/**
 * Check if a country's subdivisions are registered
 */
export function hasSubdivisions(countryCode: string): boolean {
  return countryCode in subdivisionRegistry;
}

/**
 * Get list of registered country codes
 */
export function getRegisteredCountries(): string[] {
  return Object.keys(subdivisionRegistry);
}
