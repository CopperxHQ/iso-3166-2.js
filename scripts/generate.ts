/**
 * Data Generator for iso-3166
 *
 * Generates:
 * - src/country/data.ts (country data with alpha2, alpha3, numeric, name)
 * - src/subdivision/data/XX.ts (per-country subdivision files)
 * - src/subdivision/data/all.ts (aggregates all subdivisions)
 *
 * Usage: npx tsx scripts/generate.ts
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ISO 3166-1 numeric codes (embedded for completeness)
const NUMERIC_CODES: Record<string, string> = {
  AD: '020', AE: '784', AF: '004', AG: '028', AI: '660', AL: '008', AM: '051',
  AO: '024', AQ: '010', AR: '032', AS: '016', AT: '040', AU: '036', AW: '533',
  AX: '248', AZ: '031', BA: '070', BB: '052', BD: '050', BE: '056', BF: '854',
  BG: '100', BH: '048', BI: '108', BJ: '204', BL: '652', BM: '060', BN: '096',
  BO: '068', BQ: '535', BR: '076', BS: '044', BT: '064', BV: '074', BW: '072',
  BY: '112', BZ: '084', CA: '124', CC: '166', CD: '180', CF: '140', CG: '178',
  CH: '756', CI: '384', CK: '184', CL: '152', CM: '120', CN: '156', CO: '170',
  CR: '188', CU: '192', CV: '132', CW: '531', CX: '162', CY: '196', CZ: '203',
  DE: '276', DJ: '262', DK: '208', DM: '212', DO: '214', DZ: '012', EC: '218',
  EE: '233', EG: '818', EH: '732', ER: '232', ES: '724', ET: '231', FI: '246',
  FJ: '242', FK: '238', FM: '583', FO: '234', FR: '250', GA: '266', GB: '826',
  GD: '308', GE: '268', GF: '254', GG: '831', GH: '288', GI: '292', GL: '304',
  GM: '270', GN: '324', GP: '312', GQ: '226', GR: '300', GS: '239', GT: '320',
  GU: '316', GW: '624', GY: '328', HK: '344', HM: '334', HN: '340', HR: '191',
  HT: '332', HU: '348', ID: '360', IE: '372', IL: '376', IM: '833', IN: '356',
  IO: '086', IQ: '368', IR: '364', IS: '352', IT: '380', JE: '832', JM: '388',
  JO: '400', JP: '392', KE: '404', KG: '417', KH: '116', KI: '296', KM: '174',
  KN: '659', KP: '408', KR: '410', KW: '414', KY: '136', KZ: '398', LA: '418',
  LB: '422', LC: '662', LI: '438', LK: '144', LR: '430', LS: '426', LT: '440',
  LU: '442', LV: '428', LY: '434', MA: '504', MC: '492', MD: '498', ME: '499',
  MF: '663', MG: '450', MH: '584', MK: '807', ML: '466', MM: '104', MN: '496',
  MO: '446', MP: '580', MQ: '474', MR: '478', MS: '500', MT: '470', MU: '480',
  MV: '462', MW: '454', MX: '484', MY: '458', MZ: '508', NA: '516', NC: '540',
  NE: '562', NF: '574', NG: '566', NI: '558', NL: '528', NO: '578', NP: '524',
  NR: '520', NU: '570', NZ: '554', OM: '512', PA: '591', PE: '604', PF: '258',
  PG: '598', PH: '608', PK: '586', PL: '616', PM: '666', PN: '612', PR: '630',
  PS: '275', PT: '620', PW: '585', PY: '600', QA: '634', RE: '638', RO: '642',
  RS: '688', RU: '643', RW: '646', SA: '682', SB: '090', SC: '690', SD: '729',
  SE: '752', SG: '702', SH: '654', SI: '705', SJ: '744', SK: '703', SL: '694',
  SM: '674', SN: '686', SO: '706', SR: '740', SS: '728', ST: '678', SV: '222',
  SX: '534', SY: '760', SZ: '748', TC: '796', TD: '148', TF: '260', TG: '768',
  TH: '764', TJ: '762', TK: '772', TL: '626', TM: '795', TN: '788', TO: '776',
  TR: '792', TT: '780', TV: '798', TW: '158', TZ: '834', UA: '804', UG: '800',
  UM: '581', US: '840', UY: '858', UZ: '860', VA: '336', VC: '670', VE: '862',
  VG: '092', VI: '850', VN: '704', VU: '548', WF: '876', WS: '882', YE: '887',
  YT: '175', ZA: '710', ZM: '894', ZW: '716',
};

interface SubdivisionInfo {
  name: string;
  type: string;
}

interface CountryInfo {
  name: string;
  alpha3: string;
  numeric: string;
  subdivisions: Record<string, SubdivisionInfo>;
}

function parseCSV(content: string): string[][] {
  const lines = content.trim().split('\n');
  return lines.map((line) => {
    // Handle CSV with potential commas in values (basic handling)
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  });
}

function main() {
  console.log('Generating iso-3166 data files...\n');

  // Read source files
  const codesContent = readFileSync(join(ROOT, 'codes.csv'), 'utf-8');
  const dataContent = readFileSync(join(ROOT, 'data.csv'), 'utf-8');

  // Parse alpha2 -> alpha3 mapping
  const alpha2ToAlpha3: Record<string, string> = {};
  for (const [alpha2, alpha3] of parseCSV(codesContent)) {
    if (alpha2 && alpha3) {
      alpha2ToAlpha3[alpha2] = alpha3;
    }
  }

  // Parse subdivision data and build country info
  const countries: Record<string, CountryInfo> = {};

  for (const row of parseCSV(dataContent)) {
    const [countryName, fullCode, subdivisionName, type, alpha2] = row;

    if (!alpha2 || !fullCode) continue;

    // Initialize country if not exists
    if (!countries[alpha2]) {
      countries[alpha2] = {
        name: countryName,
        alpha3: alpha2ToAlpha3[alpha2] || '',
        numeric: NUMERIC_CODES[alpha2] || '',
        subdivisions: {},
      };
    }

    // Add subdivision
    countries[alpha2].subdivisions[fullCode] = {
      name: subdivisionName,
      type: type,
    };
  }

  // Ensure output directories exist
  const countryDir = join(ROOT, 'src/country');
  const subdivisionDataDir = join(ROOT, 'src/subdivision/data');

  if (!existsSync(countryDir)) mkdirSync(countryDir, { recursive: true });
  if (!existsSync(subdivisionDataDir)) mkdirSync(subdivisionDataDir, { recursive: true });

  // Generate src/country/data.ts
  generateCountryData(countries, countryDir);

  // Generate per-country subdivision files
  generateSubdivisionFiles(countries, subdivisionDataDir);

  // Generate src/subdivision/data/all.ts
  generateSubdivisionAllFile(countries, subdivisionDataDir);

  console.log('\nData generation complete!');
}

function generateCountryData(
  countries: Record<string, CountryInfo>,
  outDir: string
) {
  const alpha2Codes = Object.keys(countries).sort();

  // Build country data (without subdivisions)
  let countryEntries = '';
  for (const alpha2 of alpha2Codes) {
    const c = countries[alpha2];
    countryEntries += `  ${alpha2}: { name: ${JSON.stringify(c.name)}, alpha3: '${c.alpha3}', numeric: '${c.numeric}' },\n`;
  }

  // Build alpha3 index
  let alpha3Entries = '';
  for (const alpha2 of alpha2Codes) {
    const alpha3 = countries[alpha2].alpha3;
    if (alpha3) {
      alpha3Entries += `  ${alpha3}: '${alpha2}',\n`;
    }
  }

  // Build numeric index
  let numericEntries = '';
  for (const alpha2 of alpha2Codes) {
    const numeric = countries[alpha2].numeric;
    if (numeric) {
      numericEntries += `  '${numeric}': '${alpha2}',\n`;
    }
  }

  // Build name index (uppercase name -> alpha2)
  // Skip duplicates (first occurrence wins)
  const seenNames = new Set<string>();
  let nameEntries = '';
  for (const alpha2 of alpha2Codes) {
    const name = countries[alpha2].name.toUpperCase();
    if (!seenNames.has(name)) {
      seenNames.add(name);
      nameEntries += `  ${JSON.stringify(name)}: '${alpha2}',\n`;
    }
  }

  const content = `// Auto-generated by scripts/generate.ts - DO NOT EDIT
import type { CountryRecord } from '../types';

/**
 * Country data indexed by alpha-2 code
 */
export const countries: Record<string, CountryRecord> = {
${countryEntries}};

/**
 * Alpha-3 to alpha-2 lookup index
 */
export const alpha3Index: Record<string, string> = {
${alpha3Entries}};

/**
 * Numeric to alpha-2 lookup index
 */
export const numericIndex: Record<string, string> = {
${numericEntries}};

/**
 * Country name (uppercase) to alpha-2 lookup index
 */
export const nameIndex: Record<string, string> = {
${nameEntries}};
`;

  writeFileSync(join(outDir, 'data.ts'), content);
  console.log(`Generated: src/country/data.ts (${alpha2Codes.length} countries)`);
}

function generateSubdivisionFiles(
  countries: Record<string, CountryInfo>,
  outDir: string
) {
  const alpha2Codes = Object.keys(countries).sort();
  let totalSubdivisions = 0;

  for (const alpha2 of alpha2Codes) {
    const country = countries[alpha2];
    const subdivisions = country.subdivisions;
    const codes = Object.keys(subdivisions).sort();

    if (codes.length === 0) continue;

    totalSubdivisions += codes.length;

    let entries = '';
    for (const code of codes) {
      const sub = subdivisions[code];
      entries += `  '${code}': { name: ${JSON.stringify(sub.name)}, type: ${JSON.stringify(sub.type)} },\n`;
    }

    const content = `// Auto-generated by scripts/generate.ts - DO NOT EDIT
import type { SubdivisionInfo } from '../../types';
import { register } from '../registry';

export const countryCode = '${alpha2}';
export const countryName = ${JSON.stringify(country.name)};

export const subdivisions: Record<string, SubdivisionInfo> = {
${entries}};

// Auto-register on import
register(countryCode, countryName, subdivisions);
`;

    writeFileSync(join(outDir, `${alpha2}.ts`), content);
  }

  console.log(`Generated: src/subdivision/data/*.ts (${alpha2Codes.length} files, ${totalSubdivisions} subdivisions)`);
}

function generateSubdivisionAllFile(
  countries: Record<string, CountryInfo>,
  outDir: string
) {
  const alpha2Codes = Object.keys(countries)
    .filter((code) => Object.keys(countries[code].subdivisions).length > 0)
    .sort();

  let imports = '';
  for (const alpha2 of alpha2Codes) {
    imports += `import './${alpha2}';\n`;
  }

  const content = `// Auto-generated by scripts/generate.ts - DO NOT EDIT
// This file imports all subdivision data files to register them
${imports}
export {};
`;

  writeFileSync(join(outDir, 'all.ts'), content);
  console.log(`Generated: src/subdivision/data/all.ts`);
}

main();
