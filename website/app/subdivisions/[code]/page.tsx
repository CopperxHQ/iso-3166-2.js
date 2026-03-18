import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getAllSubdivisionCodes, getSubdivisionPageData } from '../../../lib/subdivision-data';
import { SubdivisionPageLayout } from '../../_components/subdivision-page-layout';

type Params = { code: string };

export function generateStaticParams() {
  return getAllSubdivisionCodes().map((code) => ({
    code: code.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { code } = await params;
  const data = getSubdivisionPageData(code.toUpperCase());
  if (!data) return {};

  const primaryType = data.subdivisionTypes[0] ?? 'Subdivision';
  const typeLabel = data.subdivisionTypes.length === 1
    ? `${primaryType}s`
    : 'Subdivisions';

  const title = `${data.name} ${typeLabel} - ISO 3166-2:${data.alpha2} Codes | @koshmoney/countries`;
  const description = `Complete list of all ${data.totalCount} ${data.name} ${typeLabel.toLowerCase()} with ISO 3166-2:${data.alpha2} codes. ${data.subdivisionTypes.map((t) => `${data.subdivisions.filter((s) => s.type === t).length} ${t.toLowerCase()}s`).join(', ')}. TypeScript npm package.`;

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

export default async function SubdivisionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { code } = await params;
  const data = getSubdivisionPageData(code.toUpperCase());
  if (!data) notFound();

  return <SubdivisionPageLayout data={data} />;
}
