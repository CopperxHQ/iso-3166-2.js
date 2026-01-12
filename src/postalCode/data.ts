/**
 * Postal code data for 200+ countries
 *
 * Data sources:
 * - postcode-validator (MIT license): https://github.com/melwynfurtado/postcode-validator
 * - Google libaddressinput: https://github.com/google/libaddressinput
 * - Universal Postal Union (UPU): https://www.upu.int
 */

import type { PostalCodeInfo } from '../types';

/**
 * Postal code patterns, formats, and local names by country (alpha-2 code)
 */
export const postalCodes: Record<string, PostalCodeInfo> = {
  // A
  AD: { regex: /^AD\d{3}$/i, format: 'AD999', name: 'Codi postal' },
  AF: { regex: /^\d{4}$/, format: 'NNNN', name: 'Postal code' },
  AI: { regex: /^AI-2640$/i, format: 'AI-2640', name: 'Postcode' },
  AL: { regex: /^\d{4}$/, format: 'NNNN', name: 'Kodi postar' },
  AM: { regex: /^\d{4}$/, format: 'NNNN', name: 'Postal code' },
  AR: { regex: /^([A-Z]\d{4}[A-Z]{3}|\d{4})$/i, format: 'ANNNNAAA or NNNN', name: 'CPA' },
  AS: { regex: /^\d{5}(-\d{4})?$/, format: 'NNNNN or NNNNN-NNNN', name: 'ZIP Code' },
  AT: { regex: /^\d{4}$/, format: 'NNNN', name: 'PLZ' },
  AU: { regex: /^\d{4}$/, format: 'NNNN', name: 'Postcode' },
  AX: { regex: /^22\d{3}$/, format: '22NNN', name: 'Postnummer' },
  AZ: { regex: /^AZ\s?\d{4}$/i, format: 'AZ NNNN', name: 'Postal code' },

  // B
  BA: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Poštanski broj' },
  BB: { regex: /^BB\d{5}$/i, format: 'BBNNNNN', name: 'Postcode' },
  BD: { regex: /^\d{4}$/, format: 'NNNN', name: 'Postal code' },
  BE: { regex: /^\d{4}$/, format: 'NNNN', name: 'Postcode' },
  BG: { regex: /^\d{4}$/, format: 'NNNN', name: 'Пощенски код' },
  BH: { regex: /^\d{3,4}$/, format: 'NNN or NNNN', name: 'Postal code' },
  BL: { regex: /^97133$/, format: '97133', name: 'Code postal' },
  BM: { regex: /^[A-Z]{2}\s?\d{2}$/i, format: 'AA NN', name: 'Postcode' },
  BN: { regex: /^[A-Z]{2}\d{4}$/i, format: 'AANNNN', name: 'Postcode' },
  BO: { regex: /^\d{4}$/, format: 'NNNN', name: 'Código postal' },
  BR: { regex: /^\d{5}-?\d{3}$/, format: 'NNNNN-NNN', name: 'CEP' },
  BT: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Postal code' },
  BY: { regex: /^\d{6}$/, format: 'NNNNNN', name: 'Паштовы індэкс' },

  // C
  CA: { regex: /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i, format: 'A1A 1A1', name: 'Postal Code' },
  CC: { regex: /^\d{4}$/, format: 'NNNN', name: 'Postcode' },
  CH: { regex: /^\d{4}$/, format: 'NNNN', name: 'PLZ / NPA' },
  CL: { regex: /^\d{7}$/, format: 'NNNNNNN', name: 'Código postal' },
  CN: { regex: /^\d{6}$/, format: 'NNNNNN', name: '邮编' },
  CO: { regex: /^\d{6}$/, format: 'NNNNNN', name: 'Código postal' },
  CR: { regex: /^\d{4,5}$/, format: 'NNNNN', name: 'Código postal' },
  CU: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Código postal' },
  CV: { regex: /^\d{4}$/, format: 'NNNN', name: 'Código postal' },
  CX: { regex: /^\d{4}$/, format: 'NNNN', name: 'Postcode' },
  CY: { regex: /^\d{4}$/, format: 'NNNN', name: 'Postal code' },
  CZ: { regex: /^\d{3}\s?\d{2}$/, format: 'NNN NN', name: 'PSČ' },

  // D
  DE: { regex: /^\d{5}$/, format: 'NNNNN', name: 'PLZ' },
  DK: { regex: /^\d{4}$/, format: 'NNNN', name: 'Postnummer' },
  DO: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Código postal' },
  DZ: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Code postal' },

  // E
  EC: { regex: /^\d{6}$/, format: 'NNNNNN', name: 'Código postal' },
  EE: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Postiindeks' },
  EG: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Postal code' },
  ES: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Código postal' },
  ET: { regex: /^\d{4}$/, format: 'NNNN', name: 'Postal code' },

  // F
  FI: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Postinumero' },
  FK: { regex: /^FIQQ\s?1ZZ$/i, format: 'FIQQ 1ZZ', name: 'Postcode' },
  FM: { regex: /^\d{5}(-\d{4})?$/, format: 'NNNNN or NNNNN-NNNN', name: 'ZIP Code' },
  FO: { regex: /^\d{3}$/, format: 'NNN', name: 'Postnummer' },
  FR: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Code postal' },

  // G
  GB: { regex: /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i, format: 'AA9A 9AA', name: 'Postcode' },
  GE: { regex: /^\d{4}$/, format: 'NNNN', name: 'Postal code' },
  GF: { regex: /^973\d{2}$/, format: '973NN', name: 'Code postal' },
  GG: { regex: /^GY\d{1,2}\s?\d[A-Z]{2}$/i, format: 'GY9 9AA', name: 'Postcode' },
  GI: { regex: /^GX11\s?1AA$/i, format: 'GX11 1AA', name: 'Postcode' },
  GL: { regex: /^\d{4}$/, format: 'NNNN', name: 'Postnummer' },
  GP: { regex: /^971\d{2}$/, format: '971NN', name: 'Code postal' },
  GR: { regex: /^\d{3}\s?\d{2}$/, format: 'NNN NN', name: 'Postal code' },
  GS: { regex: /^SIQQ\s?1ZZ$/i, format: 'SIQQ 1ZZ', name: 'Postcode' },
  GT: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Código postal' },
  GU: { regex: /^\d{5}(-\d{4})?$/, format: 'NNNNN or NNNNN-NNNN', name: 'ZIP Code' },
  GW: { regex: /^\d{4}$/, format: 'NNNN', name: 'Código postal' },

  // H
  HN: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Código postal' },
  HR: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Poštanski broj' },
  HT: { regex: /^\d{4}$/, format: 'NNNN', name: 'Code postal' },
  HU: { regex: /^\d{4}$/, format: 'NNNN', name: 'Irányítószám' },

  // I
  ID: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Kode pos' },
  IE: { regex: /^[A-Z\d]{3}\s?[A-Z\d]{4}$/i, format: 'A99 XXXX', name: 'Eircode' },
  IL: { regex: /^\d{5,7}$/, format: 'NNNNNNN', name: 'Postal code' },
  IM: { regex: /^IM\d{1,2}\s?\d[A-Z]{2}$/i, format: 'IM9 9AA', name: 'Postcode' },
  IN: { regex: /^\d{6}$/, format: 'NNNNNN', name: 'PIN Code' },
  IO: { regex: /^BBND\s?1ZZ$/i, format: 'BBND 1ZZ', name: 'Postcode' },
  IQ: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Postal code' },
  IR: { regex: /^\d{5}-?\d{5}$/, format: 'NNNNN-NNNNN', name: 'Postal code' },
  IS: { regex: /^\d{3}$/, format: 'NNN', name: 'Póstnúmer' },
  IT: { regex: /^\d{5}$/, format: 'NNNNN', name: 'CAP' },

  // J
  JE: { regex: /^JE\d{1,2}\s?\d[A-Z]{2}$/i, format: 'JE9 9AA', name: 'Postcode' },
  JM: { regex: /^\d{2}$/, format: 'NN', name: 'Postal code' },
  JO: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Postal code' },
  JP: { regex: /^\d{3}-?\d{4}$/, format: 'NNN-NNNN', name: '郵便番号' },

  // K
  KE: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Postal code' },
  KG: { regex: /^\d{6}$/, format: 'NNNNNN', name: 'Postal code' },
  KH: { regex: /^\d{5,6}$/, format: 'NNNNN', name: 'Postal code' },
  KR: { regex: /^\d{5}$/, format: 'NNNNN', name: '우편번호' },
  KW: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Postal code' },
  KY: { regex: /^KY\d{1}-\d{4}$/i, format: 'KYN-NNNN', name: 'Postcode' },
  KZ: { regex: /^\d{6}$/, format: 'NNNNNN', name: 'Postal code' },

  // L
  LA: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Postal code' },
  LB: { regex: /^\d{4}\s?\d{4}$/, format: 'NNNN NNNN', name: 'Postal code' },
  LC: { regex: /^LC\d{2}\s?\d{3}$/i, format: 'LCNN NNN', name: 'Postal code' },
  LI: { regex: /^\d{4}$/, format: 'NNNN', name: 'PLZ' },
  LK: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Postal code' },
  LR: { regex: /^\d{4}$/, format: 'NNNN', name: 'Postal code' },
  LS: { regex: /^\d{3}$/, format: 'NNN', name: 'Postal code' },
  LT: { regex: /^LT-?\d{5}$/i, format: 'LT-NNNNN', name: 'Pašto kodas' },
  LU: { regex: /^\d{4}$/, format: 'NNNN', name: 'Code postal' },
  LV: { regex: /^LV-?\d{4}$/i, format: 'LV-NNNN', name: 'Pasta indekss' },

  // M
  MA: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Code postal' },
  MC: { regex: /^980\d{2}$/, format: '980NN', name: 'Code postal' },
  MD: { regex: /^MD-?\d{4}$/i, format: 'MD-NNNN', name: 'Cod poștal' },
  ME: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Poštanski broj' },
  MF: { regex: /^97150$/, format: '97150', name: 'Code postal' },
  MG: { regex: /^\d{3}$/, format: 'NNN', name: 'Code postal' },
  MH: { regex: /^\d{5}(-\d{4})?$/, format: 'NNNNN or NNNNN-NNNN', name: 'ZIP Code' },
  MK: { regex: /^\d{4}$/, format: 'NNNN', name: 'Поштенски број' },
  MM: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Postal code' },
  MN: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Postal code' },
  MP: { regex: /^\d{5}(-\d{4})?$/, format: 'NNNNN or NNNNN-NNNN', name: 'ZIP Code' },
  MQ: { regex: /^972\d{2}$/, format: '972NN', name: 'Code postal' },
  MS: { regex: /^MSR\s?\d{4}$/i, format: 'MSR NNNN', name: 'Postcode' },
  MT: { regex: /^[A-Z]{3}\s?\d{2,4}$/i, format: 'AAA NNNN', name: 'Kodiċi Postali' },
  MU: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Postal code' },
  MV: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Postal code' },
  MX: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Código postal' },
  MY: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Poskod' },
  MZ: { regex: /^\d{4}$/, format: 'NNNN', name: 'Código postal' },

  // N
  NC: { regex: /^988\d{2}$/, format: '988NN', name: 'Code postal' },
  NE: { regex: /^\d{4}$/, format: 'NNNN', name: 'Code postal' },
  NF: { regex: /^\d{4}$/, format: 'NNNN', name: 'Postcode' },
  NG: { regex: /^\d{6}$/, format: 'NNNNNN', name: 'Postal code' },
  NI: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Código postal' },
  NL: { regex: /^\d{4}\s?[A-Z]{2}$/i, format: 'NNNN AA', name: 'Postcode' },
  NO: { regex: /^\d{4}$/, format: 'NNNN', name: 'Postnummer' },
  NP: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Postal code' },
  NZ: { regex: /^\d{4}$/, format: 'NNNN', name: 'Postcode' },

  // O
  OM: { regex: /^\d{3}$/, format: 'NNN', name: 'Postal code' },

  // P
  PE: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Código postal' },
  PF: { regex: /^987\d{2}$/, format: '987NN', name: 'Code postal' },
  PG: { regex: /^\d{3}$/, format: 'NNN', name: 'Postal code' },
  PH: { regex: /^\d{4}$/, format: 'NNNN', name: 'ZIP Code' },
  PK: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Postal code' },
  PL: { regex: /^\d{2}-?\d{3}$/, format: 'NN-NNN', name: 'Kod pocztowy' },
  PM: { regex: /^97500$/, format: '97500', name: 'Code postal' },
  PN: { regex: /^PCRN\s?1ZZ$/i, format: 'PCRN 1ZZ', name: 'Postcode' },
  PR: { regex: /^\d{5}(-\d{4})?$/, format: 'NNNNN or NNNNN-NNNN', name: 'ZIP Code' },
  PS: { regex: /^\d{3}$/, format: 'NNN', name: 'Postal code' },
  PT: { regex: /^\d{4}-?\d{3}$/, format: 'NNNN-NNN', name: 'Código postal' },
  PW: { regex: /^\d{5}(-\d{4})?$/, format: 'NNNNN or NNNNN-NNNN', name: 'ZIP Code' },
  PY: { regex: /^\d{4}$/, format: 'NNNN', name: 'Código postal' },

  // Q
  // QA has no postal codes (in countriesWithoutPostalCodes)

  // R
  RE: { regex: /^974\d{2}$/, format: '974NN', name: 'Code postal' },
  RO: { regex: /^\d{6}$/, format: 'NNNNNN', name: 'Cod poștal' },
  RS: { regex: /^\d{5,6}$/, format: 'NNNNN', name: 'Поштански број' },
  RU: { regex: /^\d{6}$/, format: 'NNNNNN', name: 'Почтовый индекс' },

  // S
  SA: { regex: /^\d{5}(-\d{4})?$/, format: 'NNNNN or NNNNN-NNNN', name: 'Postal code' },
  SD: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Postal code' },
  SE: { regex: /^\d{3}\s?\d{2}$/, format: 'NNN NN', name: 'Postnummer' },
  SG: { regex: /^\d{6}$/, format: 'NNNNNN', name: 'Postal code' },
  SH: { regex: /^(STHL|ASCN|TDCU)\s?1ZZ$/i, format: 'STHL 1ZZ', name: 'Postcode' },
  SI: { regex: /^\d{4}$/, format: 'NNNN', name: 'Poštna številka' },
  SJ: { regex: /^\d{4}$/, format: 'NNNN', name: 'Postnummer' },
  SK: { regex: /^\d{3}\s?\d{2}$/, format: 'NNN NN', name: 'PSČ' },
  SM: { regex: /^4789\d$/, format: '4789N', name: 'Codice postale' },
  SN: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Code postal' },
  SV: { regex: /^\d{4}$/, format: 'NNNN', name: 'Código postal' },
  SZ: { regex: /^[A-Z]\d{3}$/i, format: 'ANNN', name: 'Postal code' },

  // T
  TC: { regex: /^TKCA\s?1ZZ$/i, format: 'TKCA 1ZZ', name: 'Postcode' },
  TH: { regex: /^\d{5}$/, format: 'NNNNN', name: 'รหัสไปรษณีย์' },
  TJ: { regex: /^\d{6}$/, format: 'NNNNNN', name: 'Postal code' },
  TM: { regex: /^\d{6}$/, format: 'NNNNNN', name: 'Postal code' },
  TN: { regex: /^\d{4}$/, format: 'NNNN', name: 'Code postal' },
  TR: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Posta kodu' },
  TT: { regex: /^\d{6}$/, format: 'NNNNNN', name: 'Postal code' },
  TW: { regex: /^\d{3,6}$/, format: 'NNN or NNNNNN', name: '郵遞區號' },

  // U
  UA: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Поштовий індекс' },
  US: { regex: /^\d{5}(-\d{4})?$/, format: 'NNNNN or NNNNN-NNNN', name: 'ZIP Code' },
  UY: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Código postal' },
  UZ: { regex: /^\d{6}$/, format: 'NNNNNN', name: 'Postal code' },

  // V
  VA: { regex: /^00120$/, format: '00120', name: 'CAP' },
  VC: { regex: /^VC\d{4}$/i, format: 'VCNNNN', name: 'Postal code' },
  VE: { regex: /^\d{4}(-?[A-Z])?$/i, format: 'NNNN or NNNN-A', name: 'Código postal' },
  VG: { regex: /^VG\d{4}$/i, format: 'VGNNNN', name: 'Postcode' },
  VI: { regex: /^\d{5}(-\d{4})?$/, format: 'NNNNN or NNNNN-NNNN', name: 'ZIP Code' },
  VN: { regex: /^\d{6}$/, format: 'NNNNNN', name: 'Mã bưu chính' },

  // W
  WF: { regex: /^986\d{2}$/, format: '986NN', name: 'Code postal' },
  WS: { regex: /^WS\d{4}$/i, format: 'WSNNNN', name: 'Postal code' },

  // X
  XK: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Kodi postar' },

  // Y
  YT: { regex: /^976\d{2}$/, format: '976NN', name: 'Code postal' },

  // Z
  ZA: { regex: /^\d{4}$/, format: 'NNNN', name: 'Postal code' },
  ZM: { regex: /^\d{5}$/, format: 'NNNNN', name: 'Postal code' },
};

/**
 * Countries that do not use postal codes
 * Source: Universal Postal Union (UPU)
 */
export const countriesWithoutPostalCodes = new Set([
  'AO', // Angola
  'AG', // Antigua and Barbuda
  'AW', // Aruba
  'BS', // Bahamas
  'BZ', // Belize
  'BJ', // Benin
  'BW', // Botswana
  'BF', // Burkina Faso
  'BI', // Burundi
  'CM', // Cameroon
  'CF', // Central African Republic
  'TD', // Chad
  'KM', // Comoros
  'CG', // Congo
  'CD', // Congo (DRC)
  'CK', // Cook Islands
  'CI', // Ivory Coast
  'DJ', // Djibouti
  'DM', // Dominica
  'GQ', // Equatorial Guinea
  'ER', // Eritrea
  'FJ', // Fiji
  'GA', // Gabon
  'GM', // Gambia
  'GH', // Ghana
  'GD', // Grenada
  'GN', // Guinea
  'GY', // Guyana
  'HK', // Hong Kong
  'KI', // Kiribati
  'LY', // Libya
  'MO', // Macau
  'MW', // Malawi
  'ML', // Mali
  'MR', // Mauritania
  'NA', // Namibia
  'NR', // Nauru
  'NU', // Niue
  'PA', // Panama
  'QA', // Qatar
  'RW', // Rwanda
  'KN', // Saint Kitts and Nevis
  'ST', // Sao Tome and Principe
  'SC', // Seychelles
  'SL', // Sierra Leone
  'SB', // Solomon Islands
  'SO', // Somalia
  'SS', // South Sudan
  'SR', // Suriname
  'SY', // Syria
  'TZ', // Tanzania
  'TL', // Timor-Leste
  'TG', // Togo
  'TO', // Tonga
  'TV', // Tuvalu
  'UG', // Uganda
  'AE', // United Arab Emirates
  'VU', // Vanuatu
  'YE', // Yemen
  'ZW', // Zimbabwe
]);
