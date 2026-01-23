import type { CurrencyInfo } from '../types';

/**
 * Currency data indexed by alpha-2 country code
 * Based on ISO 4217 standard
 */
export const currencies: Record<string, CurrencyInfo> = {
  // A
  AD: { code: 'EUR', symbol: '€', name: 'Euro' },
  AE: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  AF: { code: 'AFN', symbol: '؋', name: 'Afghan Afghani' },
  AG: { code: 'XCD', symbol: '$', name: 'East Caribbean Dollar' },
  AI: { code: 'XCD', symbol: '$', name: 'East Caribbean Dollar' },
  AL: { code: 'ALL', symbol: 'L', name: 'Albanian Lek' },
  AM: { code: 'AMD', symbol: '֏', name: 'Armenian Dram' },
  AO: { code: 'AOA', symbol: 'Kz', name: 'Angolan Kwanza' },
  AQ: { code: 'USD', symbol: '$', name: 'US Dollar' },
  AR: { code: 'ARS', symbol: '$', name: 'Argentine Peso' },
  AS: { code: 'USD', symbol: '$', name: 'US Dollar' },
  AT: { code: 'EUR', symbol: '€', name: 'Euro' },
  AU: { code: 'AUD', symbol: '$', name: 'Australian Dollar' },
  AW: { code: 'AWG', symbol: 'ƒ', name: 'Aruban Florin' },
  AX: { code: 'EUR', symbol: '€', name: 'Euro' },
  AZ: { code: 'AZN', symbol: '₼', name: 'Azerbaijani Manat' },

  // B
  BA: { code: 'BAM', symbol: 'KM', name: 'Bosnia-Herzegovina Convertible Mark' },
  BB: { code: 'BBD', symbol: '$', name: 'Barbadian Dollar' },
  BD: { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
  BE: { code: 'EUR', symbol: '€', name: 'Euro' },
  BF: { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
  BG: { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev' },
  BH: { code: 'BHD', symbol: '.د.ب', name: 'Bahraini Dinar' },
  BI: { code: 'BIF', symbol: 'FBu', name: 'Burundian Franc' },
  BJ: { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
  BL: { code: 'EUR', symbol: '€', name: 'Euro' },
  BM: { code: 'BMD', symbol: '$', name: 'Bermudian Dollar' },
  BN: { code: 'BND', symbol: '$', name: 'Brunei Dollar' },
  BO: { code: 'BOB', symbol: 'Bs.', name: 'Bolivian Boliviano' },
  BQ: { code: 'USD', symbol: '$', name: 'US Dollar' },
  BR: { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  BS: { code: 'BSD', symbol: '$', name: 'Bahamian Dollar' },
  BT: { code: 'BTN', symbol: 'Nu.', name: 'Bhutanese Ngultrum' },
  BV: { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  BW: { code: 'BWP', symbol: 'P', name: 'Botswanan Pula' },
  BY: { code: 'BYN', symbol: 'Br', name: 'Belarusian Ruble' },
  BZ: { code: 'BZD', symbol: '$', name: 'Belize Dollar' },

  // C
  CA: { code: 'CAD', symbol: '$', name: 'Canadian Dollar' },
  CC: { code: 'AUD', symbol: '$', name: 'Australian Dollar' },
  CD: { code: 'CDF', symbol: 'FC', name: 'Congolese Franc' },
  CF: { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc' },
  CG: { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc' },
  CH: { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  CI: { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
  CK: { code: 'NZD', symbol: '$', name: 'New Zealand Dollar' },
  CL: { code: 'CLP', symbol: '$', name: 'Chilean Peso' },
  CM: { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc' },
  CN: { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  CO: { code: 'COP', symbol: '$', name: 'Colombian Peso' },
  CR: { code: 'CRC', symbol: '₡', name: 'Costa Rican Colón' },
  CU: { code: 'CUP', symbol: '$', name: 'Cuban Peso' },
  CV: { code: 'CVE', symbol: '$', name: 'Cape Verdean Escudo' },
  CW: { code: 'ANG', symbol: 'ƒ', name: 'Netherlands Antillean Guilder' },
  CX: { code: 'AUD', symbol: '$', name: 'Australian Dollar' },
  CY: { code: 'EUR', symbol: '€', name: 'Euro' },
  CZ: { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' },

  // D
  DE: { code: 'EUR', symbol: '€', name: 'Euro' },
  DJ: { code: 'DJF', symbol: 'Fdj', name: 'Djiboutian Franc' },
  DK: { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  DM: { code: 'XCD', symbol: '$', name: 'East Caribbean Dollar' },
  DO: { code: 'DOP', symbol: '$', name: 'Dominican Peso' },
  DZ: { code: 'DZD', symbol: 'د.ج', name: 'Algerian Dinar' },

  // E
  EC: { code: 'USD', symbol: '$', name: 'US Dollar' },
  EE: { code: 'EUR', symbol: '€', name: 'Euro' },
  EG: { code: 'EGP', symbol: '£', name: 'Egyptian Pound' },
  EH: { code: 'MAD', symbol: 'د.م.', name: 'Moroccan Dirham' },
  ER: { code: 'ERN', symbol: 'Nfk', name: 'Eritrean Nakfa' },
  ES: { code: 'EUR', symbol: '€', name: 'Euro' },
  ET: { code: 'ETB', symbol: 'Br', name: 'Ethiopian Birr' },

  // F
  FI: { code: 'EUR', symbol: '€', name: 'Euro' },
  FJ: { code: 'FJD', symbol: '$', name: 'Fijian Dollar' },
  FK: { code: 'FKP', symbol: '£', name: 'Falkland Islands Pound' },
  FM: { code: 'USD', symbol: '$', name: 'US Dollar' },
  FO: { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  FR: { code: 'EUR', symbol: '€', name: 'Euro' },

  // G
  GA: { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc' },
  GB: { code: 'GBP', symbol: '£', name: 'British Pound' },
  GD: { code: 'XCD', symbol: '$', name: 'East Caribbean Dollar' },
  GE: { code: 'GEL', symbol: '₾', name: 'Georgian Lari' },
  GF: { code: 'EUR', symbol: '€', name: 'Euro' },
  GG: { code: 'GBP', symbol: '£', name: 'British Pound' },
  GH: { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi' },
  GI: { code: 'GIP', symbol: '£', name: 'Gibraltar Pound' },
  GL: { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  GM: { code: 'GMD', symbol: 'D', name: 'Gambian Dalasi' },
  GN: { code: 'GNF', symbol: 'FG', name: 'Guinean Franc' },
  GP: { code: 'EUR', symbol: '€', name: 'Euro' },
  GQ: { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc' },
  GR: { code: 'EUR', symbol: '€', name: 'Euro' },
  GS: { code: 'GBP', symbol: '£', name: 'British Pound' },
  GT: { code: 'GTQ', symbol: 'Q', name: 'Guatemalan Quetzal' },
  GU: { code: 'USD', symbol: '$', name: 'US Dollar' },
  GW: { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
  GY: { code: 'GYD', symbol: '$', name: 'Guyanese Dollar' },

  // H
  HK: { code: 'HKD', symbol: '$', name: 'Hong Kong Dollar' },
  HM: { code: 'AUD', symbol: '$', name: 'Australian Dollar' },
  HN: { code: 'HNL', symbol: 'L', name: 'Honduran Lempira' },
  HR: { code: 'EUR', symbol: '€', name: 'Euro' },
  HT: { code: 'HTG', symbol: 'G', name: 'Haitian Gourde' },
  HU: { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },

  // I
  ID: { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
  IE: { code: 'EUR', symbol: '€', name: 'Euro' },
  IL: { code: 'ILS', symbol: '₪', name: 'Israeli New Shekel' },
  IM: { code: 'GBP', symbol: '£', name: 'British Pound' },
  IN: { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  IO: { code: 'USD', symbol: '$', name: 'US Dollar' },
  IQ: { code: 'IQD', symbol: 'ع.د', name: 'Iraqi Dinar' },
  IR: { code: 'IRR', symbol: '﷼', name: 'Iranian Rial' },
  IS: { code: 'ISK', symbol: 'kr', name: 'Icelandic Króna' },
  IT: { code: 'EUR', symbol: '€', name: 'Euro' },

  // J
  JE: { code: 'GBP', symbol: '£', name: 'British Pound' },
  JM: { code: 'JMD', symbol: '$', name: 'Jamaican Dollar' },
  JO: { code: 'JOD', symbol: 'د.ا', name: 'Jordanian Dinar' },
  JP: { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },

  // K
  KE: { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
  KG: { code: 'KGS', symbol: 'с', name: 'Kyrgyzstani Som' },
  KH: { code: 'KHR', symbol: '៛', name: 'Cambodian Riel' },
  KI: { code: 'AUD', symbol: '$', name: 'Australian Dollar' },
  KM: { code: 'KMF', symbol: 'CF', name: 'Comorian Franc' },
  KN: { code: 'XCD', symbol: '$', name: 'East Caribbean Dollar' },
  KP: { code: 'KPW', symbol: '₩', name: 'North Korean Won' },
  KR: { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  KW: { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar' },
  KY: { code: 'KYD', symbol: '$', name: 'Cayman Islands Dollar' },
  KZ: { code: 'KZT', symbol: '₸', name: 'Kazakhstani Tenge' },

  // L
  LA: { code: 'LAK', symbol: '₭', name: 'Laotian Kip' },
  LB: { code: 'LBP', symbol: 'ل.ل', name: 'Lebanese Pound' },
  LC: { code: 'XCD', symbol: '$', name: 'East Caribbean Dollar' },
  LI: { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  LK: { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee' },
  LR: { code: 'LRD', symbol: '$', name: 'Liberian Dollar' },
  LS: { code: 'LSL', symbol: 'L', name: 'Lesotho Loti' },
  LT: { code: 'EUR', symbol: '€', name: 'Euro' },
  LU: { code: 'EUR', symbol: '€', name: 'Euro' },
  LV: { code: 'EUR', symbol: '€', name: 'Euro' },
  LY: { code: 'LYD', symbol: 'ل.د', name: 'Libyan Dinar' },

  // M
  MA: { code: 'MAD', symbol: 'د.م.', name: 'Moroccan Dirham' },
  MC: { code: 'EUR', symbol: '€', name: 'Euro' },
  MD: { code: 'MDL', symbol: 'L', name: 'Moldovan Leu' },
  ME: { code: 'EUR', symbol: '€', name: 'Euro' },
  MF: { code: 'EUR', symbol: '€', name: 'Euro' },
  MG: { code: 'MGA', symbol: 'Ar', name: 'Malagasy Ariary' },
  MH: { code: 'USD', symbol: '$', name: 'US Dollar' },
  MK: { code: 'MKD', symbol: 'ден', name: 'Macedonian Denar' },
  ML: { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
  MM: { code: 'MMK', symbol: 'K', name: 'Myanmar Kyat' },
  MN: { code: 'MNT', symbol: '₮', name: 'Mongolian Tugrik' },
  MO: { code: 'MOP', symbol: 'MOP$', name: 'Macanese Pataca' },
  MP: { code: 'USD', symbol: '$', name: 'US Dollar' },
  MQ: { code: 'EUR', symbol: '€', name: 'Euro' },
  MR: { code: 'MRU', symbol: 'UM', name: 'Mauritanian Ouguiya' },
  MS: { code: 'XCD', symbol: '$', name: 'East Caribbean Dollar' },
  MT: { code: 'EUR', symbol: '€', name: 'Euro' },
  MU: { code: 'MUR', symbol: '₨', name: 'Mauritian Rupee' },
  MV: { code: 'MVR', symbol: 'Rf', name: 'Maldivian Rufiyaa' },
  MW: { code: 'MWK', symbol: 'MK', name: 'Malawian Kwacha' },
  MX: { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
  MY: { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  MZ: { code: 'MZN', symbol: 'MT', name: 'Mozambican Metical' },

  // N
  NA: { code: 'NAD', symbol: '$', name: 'Namibian Dollar' },
  NC: { code: 'XPF', symbol: '₣', name: 'CFP Franc' },
  NE: { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
  NF: { code: 'AUD', symbol: '$', name: 'Australian Dollar' },
  NG: { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  NI: { code: 'NIO', symbol: 'C$', name: 'Nicaraguan Córdoba' },
  NL: { code: 'EUR', symbol: '€', name: 'Euro' },
  NO: { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  NP: { code: 'NPR', symbol: '₨', name: 'Nepalese Rupee' },
  NR: { code: 'AUD', symbol: '$', name: 'Australian Dollar' },
  NU: { code: 'NZD', symbol: '$', name: 'New Zealand Dollar' },
  NZ: { code: 'NZD', symbol: '$', name: 'New Zealand Dollar' },

  // O
  OM: { code: 'OMR', symbol: 'ر.ع.', name: 'Omani Rial' },

  // P
  PA: { code: 'PAB', symbol: 'B/.', name: 'Panamanian Balboa' },
  PE: { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol' },
  PF: { code: 'XPF', symbol: '₣', name: 'CFP Franc' },
  PG: { code: 'PGK', symbol: 'K', name: 'Papua New Guinean Kina' },
  PH: { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
  PK: { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
  PL: { code: 'PLN', symbol: 'zł', name: 'Polish Zloty' },
  PM: { code: 'EUR', symbol: '€', name: 'Euro' },
  PN: { code: 'NZD', symbol: '$', name: 'New Zealand Dollar' },
  PR: { code: 'USD', symbol: '$', name: 'US Dollar' },
  PS: { code: 'ILS', symbol: '₪', name: 'Israeli New Shekel' },
  PT: { code: 'EUR', symbol: '€', name: 'Euro' },
  PW: { code: 'USD', symbol: '$', name: 'US Dollar' },
  PY: { code: 'PYG', symbol: '₲', name: 'Paraguayan Guarani' },

  // Q
  QA: { code: 'QAR', symbol: 'ر.ق', name: 'Qatari Riyal' },

  // R
  RE: { code: 'EUR', symbol: '€', name: 'Euro' },
  RO: { code: 'RON', symbol: 'lei', name: 'Romanian Leu' },
  RS: { code: 'RSD', symbol: 'дин.', name: 'Serbian Dinar' },
  RU: { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  RW: { code: 'RWF', symbol: 'FRw', name: 'Rwandan Franc' },

  // S
  SA: { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
  SB: { code: 'SBD', symbol: '$', name: 'Solomon Islands Dollar' },
  SC: { code: 'SCR', symbol: '₨', name: 'Seychellois Rupee' },
  SD: { code: 'SDG', symbol: 'ج.س.', name: 'Sudanese Pound' },
  SE: { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  SG: { code: 'SGD', symbol: '$', name: 'Singapore Dollar' },
  SH: { code: 'SHP', symbol: '£', name: 'Saint Helena Pound' },
  SI: { code: 'EUR', symbol: '€', name: 'Euro' },
  SJ: { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  SK: { code: 'EUR', symbol: '€', name: 'Euro' },
  SL: { code: 'SLE', symbol: 'Le', name: 'Sierra Leonean Leone' },
  SM: { code: 'EUR', symbol: '€', name: 'Euro' },
  SN: { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
  SO: { code: 'SOS', symbol: 'S', name: 'Somali Shilling' },
  SR: { code: 'SRD', symbol: '$', name: 'Surinamese Dollar' },
  SS: { code: 'SSP', symbol: '£', name: 'South Sudanese Pound' },
  ST: { code: 'STN', symbol: 'Db', name: 'São Tomé and Príncipe Dobra' },
  SV: { code: 'USD', symbol: '$', name: 'US Dollar' },
  SX: { code: 'ANG', symbol: 'ƒ', name: 'Netherlands Antillean Guilder' },
  SY: { code: 'SYP', symbol: '£', name: 'Syrian Pound' },
  SZ: { code: 'SZL', symbol: 'L', name: 'Swazi Lilangeni' },

  // T
  TC: { code: 'USD', symbol: '$', name: 'US Dollar' },
  TD: { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc' },
  TF: { code: 'EUR', symbol: '€', name: 'Euro' },
  TG: { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
  TH: { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  TJ: { code: 'TJS', symbol: 'ЅМ', name: 'Tajikistani Somoni' },
  TK: { code: 'NZD', symbol: '$', name: 'New Zealand Dollar' },
  TL: { code: 'USD', symbol: '$', name: 'US Dollar' },
  TM: { code: 'TMT', symbol: 'm', name: 'Turkmenistani Manat' },
  TN: { code: 'TND', symbol: 'د.ت', name: 'Tunisian Dinar' },
  TO: { code: 'TOP', symbol: 'T$', name: 'Tongan Paʻanga' },
  TR: { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
  TT: { code: 'TTD', symbol: '$', name: 'Trinidad and Tobago Dollar' },
  TV: { code: 'AUD', symbol: '$', name: 'Australian Dollar' },
  TW: { code: 'TWD', symbol: 'NT$', name: 'New Taiwan Dollar' },
  TZ: { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling' },

  // U
  UA: { code: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia' },
  UG: { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling' },
  UM: { code: 'USD', symbol: '$', name: 'US Dollar' },
  US: { code: 'USD', symbol: '$', name: 'US Dollar' },
  UY: { code: 'UYU', symbol: '$', name: 'Uruguayan Peso' },
  UZ: { code: 'UZS', symbol: 'сўм', name: 'Uzbekistani Som' },

  // V
  VA: { code: 'EUR', symbol: '€', name: 'Euro' },
  VC: { code: 'XCD', symbol: '$', name: 'East Caribbean Dollar' },
  VE: { code: 'VES', symbol: 'Bs.', name: 'Venezuelan Bolívar' },
  VG: { code: 'USD', symbol: '$', name: 'US Dollar' },
  VI: { code: 'USD', symbol: '$', name: 'US Dollar' },
  VN: { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
  VU: { code: 'VUV', symbol: 'VT', name: 'Vanuatu Vatu' },

  // W
  WF: { code: 'XPF', symbol: '₣', name: 'CFP Franc' },
  WS: { code: 'WST', symbol: 'WS$', name: 'Samoan Tala' },

  // Y
  YE: { code: 'YER', symbol: '﷼', name: 'Yemeni Rial' },
  YT: { code: 'EUR', symbol: '€', name: 'Euro' },

  // Z
  ZA: { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  ZM: { code: 'ZMW', symbol: 'ZK', name: 'Zambian Kwacha' },
  ZW: { code: 'ZWL', symbol: '$', name: 'Zimbabwean Dollar' },
};

/**
 * Currency code to countries index
 */
export const currencyIndex: Record<string, string[]> = (() => {
  const index: Record<string, string[]> = {};
  for (const [country, info] of Object.entries(currencies)) {
    if (!index[info.code]) {
      index[info.code] = [];
    }
    index[info.code].push(country);
  }
  // Sort each array
  for (const code of Object.keys(index)) {
    index[code].sort();
  }
  return index;
})();
