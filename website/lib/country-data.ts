import { countries } from '@pkg/country/data';
import { currencies } from '@pkg/currency/data';
import { geography } from '@pkg/geography/data';
import {
  EU_MEMBERS,
  SEPA_MEMBERS,
  EEA_MEMBERS,
  EUROZONE_MEMBERS,
  SCHENGEN_MEMBERS,
} from '@pkg/membership/data';
import type { SubdivisionInfo } from '@pkg/types';

import { TOP_COUNTRIES } from './top-countries';

// Static imports for all 79 subdivision files
import { subdivisions as sub_US } from '@pkg/subdivision/data/US';
import { subdivisions as sub_GB } from '@pkg/subdivision/data/GB';
import { subdivisions as sub_DE } from '@pkg/subdivision/data/DE';
import { subdivisions as sub_CA } from '@pkg/subdivision/data/CA';
import { subdivisions as sub_JP } from '@pkg/subdivision/data/JP';
import { subdivisions as sub_IN } from '@pkg/subdivision/data/IN';
import { subdivisions as sub_AU } from '@pkg/subdivision/data/AU';
import { subdivisions as sub_FR } from '@pkg/subdivision/data/FR';
import { subdivisions as sub_BR } from '@pkg/subdivision/data/BR';
import { subdivisions as sub_CN } from '@pkg/subdivision/data/CN';
import { subdivisions as sub_KR } from '@pkg/subdivision/data/KR';
import { subdivisions as sub_MX } from '@pkg/subdivision/data/MX';
import { subdivisions as sub_IT } from '@pkg/subdivision/data/IT';
import { subdivisions as sub_ES } from '@pkg/subdivision/data/ES';
import { subdivisions as sub_NL } from '@pkg/subdivision/data/NL';
import { subdivisions as sub_SE } from '@pkg/subdivision/data/SE';
import { subdivisions as sub_CH } from '@pkg/subdivision/data/CH';
import { subdivisions as sub_RU } from '@pkg/subdivision/data/RU';
import { subdivisions as sub_PL } from '@pkg/subdivision/data/PL';
import { subdivisions as sub_TR } from '@pkg/subdivision/data/TR';
import { subdivisions as sub_ZA } from '@pkg/subdivision/data/ZA';
import { subdivisions as sub_SG } from '@pkg/subdivision/data/SG';
import { subdivisions as sub_AE } from '@pkg/subdivision/data/AE';
import { subdivisions as sub_SA } from '@pkg/subdivision/data/SA';
import { subdivisions as sub_IL } from '@pkg/subdivision/data/IL';
import { subdivisions as sub_TH } from '@pkg/subdivision/data/TH';
import { subdivisions as sub_ID } from '@pkg/subdivision/data/ID';
import { subdivisions as sub_MY } from '@pkg/subdivision/data/MY';
import { subdivisions as sub_PH } from '@pkg/subdivision/data/PH';
import { subdivisions as sub_VN } from '@pkg/subdivision/data/VN';
import { subdivisions as sub_NG } from '@pkg/subdivision/data/NG';
import { subdivisions as sub_EG } from '@pkg/subdivision/data/EG';
import { subdivisions as sub_KE } from '@pkg/subdivision/data/KE';
import { subdivisions as sub_AR } from '@pkg/subdivision/data/AR';
import { subdivisions as sub_CO } from '@pkg/subdivision/data/CO';
import { subdivisions as sub_CL } from '@pkg/subdivision/data/CL';
import { subdivisions as sub_PE } from '@pkg/subdivision/data/PE';
import { subdivisions as sub_NZ } from '@pkg/subdivision/data/NZ';
import { subdivisions as sub_IE } from '@pkg/subdivision/data/IE';
import { subdivisions as sub_AT } from '@pkg/subdivision/data/AT';
import { subdivisions as sub_BE } from '@pkg/subdivision/data/BE';
import { subdivisions as sub_DK } from '@pkg/subdivision/data/DK';
import { subdivisions as sub_FI } from '@pkg/subdivision/data/FI';
import { subdivisions as sub_NO } from '@pkg/subdivision/data/NO';
import { subdivisions as sub_PT } from '@pkg/subdivision/data/PT';
import { subdivisions as sub_CZ } from '@pkg/subdivision/data/CZ';
import { subdivisions as sub_GR } from '@pkg/subdivision/data/GR';
import { subdivisions as sub_HU } from '@pkg/subdivision/data/HU';
import { subdivisions as sub_RO } from '@pkg/subdivision/data/RO';
import { subdivisions as sub_UA } from '@pkg/subdivision/data/UA';
import { subdivisions as sub_PK } from '@pkg/subdivision/data/PK';
import { subdivisions as sub_BD } from '@pkg/subdivision/data/BD';
import { subdivisions as sub_LK } from '@pkg/subdivision/data/LK';
import { subdivisions as sub_MM } from '@pkg/subdivision/data/MM';
import { subdivisions as sub_NP } from '@pkg/subdivision/data/NP';
import { subdivisions as sub_TW } from '@pkg/subdivision/data/TW';
import { subdivisions as sub_HK } from '@pkg/subdivision/data/HK';
import { subdivisions as sub_MO } from '@pkg/subdivision/data/MO';
import { subdivisions as sub_QA } from '@pkg/subdivision/data/QA';
import { subdivisions as sub_KW } from '@pkg/subdivision/data/KW';
import { subdivisions as sub_BH } from '@pkg/subdivision/data/BH';
import { subdivisions as sub_OM } from '@pkg/subdivision/data/OM';
import { subdivisions as sub_JO } from '@pkg/subdivision/data/JO';
import { subdivisions as sub_LB } from '@pkg/subdivision/data/LB';
import { subdivisions as sub_GH } from '@pkg/subdivision/data/GH';
import { subdivisions as sub_TZ } from '@pkg/subdivision/data/TZ';
import { subdivisions as sub_ET } from '@pkg/subdivision/data/ET';
import { subdivisions as sub_MA } from '@pkg/subdivision/data/MA';
import { subdivisions as sub_TN } from '@pkg/subdivision/data/TN';
import { subdivisions as sub_DZ } from '@pkg/subdivision/data/DZ';
import { subdivisions as sub_LY } from '@pkg/subdivision/data/LY';
import { subdivisions as sub_IQ } from '@pkg/subdivision/data/IQ';
import { subdivisions as sub_IR } from '@pkg/subdivision/data/IR';
import { subdivisions as sub_AF } from '@pkg/subdivision/data/AF';
import { subdivisions as sub_UZ } from '@pkg/subdivision/data/UZ';
import { subdivisions as sub_KZ } from '@pkg/subdivision/data/KZ';
import { subdivisions as sub_GE } from '@pkg/subdivision/data/GE';
import { subdivisions as sub_AM } from '@pkg/subdivision/data/AM';
import { subdivisions as sub_AZ } from '@pkg/subdivision/data/AZ';

const subdivisionMap: Record<string, Record<string, SubdivisionInfo>> = {
  US: sub_US, GB: sub_GB, DE: sub_DE, CA: sub_CA, JP: sub_JP,
  IN: sub_IN, AU: sub_AU, FR: sub_FR, BR: sub_BR, CN: sub_CN,
  KR: sub_KR, MX: sub_MX, IT: sub_IT, ES: sub_ES, NL: sub_NL,
  SE: sub_SE, CH: sub_CH, RU: sub_RU, PL: sub_PL, TR: sub_TR,
  ZA: sub_ZA, SG: sub_SG, AE: sub_AE, SA: sub_SA, IL: sub_IL,
  TH: sub_TH, ID: sub_ID, MY: sub_MY, PH: sub_PH, VN: sub_VN,
  NG: sub_NG, EG: sub_EG, KE: sub_KE, AR: sub_AR, CO: sub_CO,
  CL: sub_CL, PE: sub_PE, NZ: sub_NZ, IE: sub_IE, AT: sub_AT,
  BE: sub_BE, DK: sub_DK, FI: sub_FI, NO: sub_NO, PT: sub_PT,
  CZ: sub_CZ, GR: sub_GR, HU: sub_HU, RO: sub_RO, UA: sub_UA,
  PK: sub_PK, BD: sub_BD, LK: sub_LK, MM: sub_MM, NP: sub_NP,
  TW: sub_TW, HK: sub_HK, MO: sub_MO, QA: sub_QA, KW: sub_KW,
  BH: sub_BH, OM: sub_OM, JO: sub_JO, LB: sub_LB, GH: sub_GH,
  TZ: sub_TZ, ET: sub_ET, MA: sub_MA, TN: sub_TN, DZ: sub_DZ,
  LY: sub_LY, IQ: sub_IQ, IR: sub_IR, AF: sub_AF, UZ: sub_UZ,
  KZ: sub_KZ, GE: sub_GE, AM: sub_AM, AZ: sub_AZ,
};

export interface CountryPageData {
  alpha2: string;
  alpha3: string;
  numeric: string;
  name: string;
  flag: string;
  currency: { code: string; symbol: string; name: string } | null;
  continent: string | null;
  region: string | null;
  subdivisionCount: number;
  subdivisionPreview: { code: string; name: string; type: string }[];
  memberships: string[];
  relatedCountries: { alpha2: string; name: string; flag: string }[];
}

export function getFlagEmoji(alpha2: string): string {
  return [...alpha2.toUpperCase()]
    .map((c) => String.fromCodePoint(0x1f1e6 - 65 + c.charCodeAt(0)))
    .join('');
}

function getRelatedCountries(
  alpha2: string,
): { alpha2: string; name: string; flag: string }[] {
  const geo = geography[alpha2];
  if (!geo) return [];

  const sameRegion = TOP_COUNTRIES.filter(
    (code) =>
      code !== alpha2 &&
      geography[code]?.region === geo.region,
  );

  const sameContinent =
    sameRegion.length < 4
      ? TOP_COUNTRIES.filter(
          (code) =>
            code !== alpha2 &&
            !sameRegion.includes(code) &&
            geography[code]?.continent === geo.continent,
        )
      : [];

  const related = [...sameRegion, ...sameContinent].slice(0, 6);

  return related.map((code) => ({
    alpha2: code,
    name: countries[code]?.name ?? code,
    flag: getFlagEmoji(code),
  }));
}

function buildCountryData(alpha2: string): CountryPageData | null {
  const country = countries[alpha2];
  if (!country) return null;

  const subs = subdivisionMap[alpha2] ?? {};
  const subEntries = Object.entries(subs);
  const currency = currencies[alpha2] ?? null;
  const geo = geography[alpha2] ?? null;

  const memberships: string[] = [];
  if (EU_MEMBERS.has(alpha2)) memberships.push('EU');
  if (SEPA_MEMBERS.has(alpha2)) memberships.push('SEPA');
  if (EEA_MEMBERS.has(alpha2)) memberships.push('EEA');
  if (EUROZONE_MEMBERS.has(alpha2)) memberships.push('Eurozone');
  if (SCHENGEN_MEMBERS.has(alpha2)) memberships.push('Schengen');

  return {
    alpha2,
    alpha3: country.alpha3,
    numeric: country.numeric,
    name: country.name,
    flag: getFlagEmoji(alpha2),
    currency,
    continent: geo?.continent ?? null,
    region: geo?.region ?? null,
    subdivisionCount: subEntries.length,
    subdivisionPreview: subEntries.map(([code, info]) => ({
      code,
      name: info.name,
      type: info.type,
    })),
    memberships,
    relatedCountries: getRelatedCountries(alpha2),
  };
}

const countryDataCache = new Map<string, CountryPageData>();

for (const code of TOP_COUNTRIES) {
  const data = buildCountryData(code);
  if (data) countryDataCache.set(code, data);
}

export function getCountryPageData(alpha2: string): CountryPageData | null {
  return countryDataCache.get(alpha2.toUpperCase()) ?? null;
}

export function getAllCountryPageData(): CountryPageData[] {
  return [...countryDataCache.values()];
}
