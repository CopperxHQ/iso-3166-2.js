/**
 * Normalize input to uppercase trimmed string
 */
export function normalize(input: string | number | null | undefined): string {
  if (input == null) return '';
  return String(input).trim().toUpperCase();
}

/**
 * Parse subdivision code into country and region parts
 * Handles both alpha-2 (US-CA) and alpha-3 (USA-CA) country codes
 *
 * @example
 * parseSubdivisionCode('US-CA') // { country: 'US', region: 'CA' }
 * parseSubdivisionCode('USA-CA') // { country: 'USA', region: 'CA' }
 * parseSubdivisionCode('GB-EAW') // { country: 'GB', region: 'EAW' }
 */
export function parseSubdivisionCode(
  code: string
): { country: string; region: string } | null {
  const normalized = normalize(code);
  const idx = normalized.indexOf('-');

  if (idx === -1) return null;

  return {
    country: normalized.slice(0, idx),
    region: normalized.slice(idx + 1),
  };
}
