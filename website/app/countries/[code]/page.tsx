import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { TOP_COUNTRIES } from '../../../lib/top-countries';
import { getCountryPageData } from '../../../lib/country-data';
import { CountryPageLayout } from '../../_components/country-page-layout';

type Params = { code: string };

export function generateStaticParams() {
  return TOP_COUNTRIES.map((code) => ({
    code: code.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { code } = await params;
  const data = getCountryPageData(code.toUpperCase());
  if (!data) return {};

  const title = `${data.name} (${data.alpha2}) - ISO 3166 Country Code | @koshmoney/countries`;
  const description = `Get ${data.name} ISO codes: Alpha-2 (${data.alpha2}), Alpha-3 (${data.alpha3}), Numeric (${data.numeric}). ${data.subdivisionCount} subdivisions. TypeScript npm package.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
    },
  };
}

export default async function CountryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { code } = await params;
  const data = getCountryPageData(code.toUpperCase());
  if (!data) notFound();

  return <CountryPageLayout data={data} />;
}
