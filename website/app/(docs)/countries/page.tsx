import type { Metadata } from 'next';
import { TOP_COUNTRIES } from '../../../lib/top-countries';
import { getCountryPageData } from '../../../lib/country-data';

export const metadata: Metadata = {
  title: 'All Country Codes - ISO 3166 Directory',
  description: 'Browse all 249 ISO 3166 country codes with alpha-2, alpha-3, and numeric codes. Find subdivisions, currencies, and membership data for each country.',
};

export default function CountriesIndexPage() {
  const countries = TOP_COUNTRIES
    .map((code) => getCountryPageData(code))
    .filter(Boolean)
    .sort((a, b) => a!.name.localeCompare(b!.name));

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold text-white">All Country Codes</h1>
      <p className="mt-2 text-slate-400">
        Browse ISO 3166 country codes. Each country page includes alpha-2, alpha-3, numeric codes, subdivisions, currency, and membership data.
      </p>
      <div className="mt-8 overflow-x-auto rounded-xl ring-1 ring-white/10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-800/50">
              <th className="px-4 py-3 font-medium text-slate-400">Country</th>
              <th className="px-4 py-3 font-medium text-slate-400">Alpha-2</th>
              <th className="px-4 py-3 font-medium text-slate-400">Alpha-3</th>
              <th className="px-4 py-3 font-medium text-slate-400">Subdivisions</th>
              <th className="px-4 py-3 font-medium text-slate-400">Currency</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((c) => (
              <tr key={c!.alpha2} className="border-b border-slate-800">
                <td className="px-4 py-2.5">
                  <a href={`/countries/${c!.alpha2.toLowerCase()}`} className="flex items-center gap-2 text-slate-200 hover:text-sky-400">
                    <span>{c!.flag}</span>
                    <span>{c!.name}</span>
                  </a>
                </td>
                <td className="px-4 py-2.5 font-mono text-slate-300">{c!.alpha2}</td>
                <td className="px-4 py-2.5 font-mono text-slate-300">{c!.alpha3}</td>
                <td className="px-4 py-2.5 text-slate-400">{c!.subdivisionCount}</td>
                <td className="px-4 py-2.5 text-slate-400">{c!.currency?.code ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
