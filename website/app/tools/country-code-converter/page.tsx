import type { Metadata } from 'next';
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
import { getFlagEmoji } from '../../../lib/country-data';
import { CountryCodeConverter } from './converter';

export interface ConverterCountry {
  alpha2: string;
  alpha3: string;
  numeric: string;
  name: string;
  flag: string;
  currency: { code: string; symbol: string; name: string } | null;
  continent: string | null;
  region: string | null;
  memberships: string[];
}

function buildAllCountries(): ConverterCountry[] {
  return Object.entries(countries).map(([code, c]) => {
    const geo = geography[code];
    const curr = currencies[code] ?? null;

    const memberships: string[] = [];
    if (EU_MEMBERS.has(code)) memberships.push('EU');
    if (EEA_MEMBERS.has(code)) memberships.push('EEA');
    if (SEPA_MEMBERS.has(code)) memberships.push('SEPA');
    if (EUROZONE_MEMBERS.has(code)) memberships.push('Eurozone');
    if (SCHENGEN_MEMBERS.has(code)) memberships.push('Schengen');

    return {
      alpha2: code,
      alpha3: c.alpha3,
      numeric: c.numeric,
      name: c.name,
      flag: getFlagEmoji(code),
      currency: curr,
      continent: geo?.continent ?? null,
      region: geo?.region ?? null,
      memberships,
    };
  });
}

export const metadata: Metadata = {
  title: 'Country Code Converter & Lookup Tool | @koshmoney/countries',
  description:
    'Free online country code converter. Look up any country by ISO 3166 alpha-2, alpha-3, numeric code, or name. Get all codes, currency, continent, and EU/SEPA membership instantly.',
  openGraph: {
    title: 'Country Code Converter & Lookup Tool',
    description:
      'Free online country code converter. Look up any country by ISO 3166 alpha-2, alpha-3, numeric code, or name.',
    type: 'website',
  },
};

export default function CountryCodeConverterPage() {
  const allCountries = buildAllCountries();

  return <CountryCodeConverter countries={allCountries} />;
}
