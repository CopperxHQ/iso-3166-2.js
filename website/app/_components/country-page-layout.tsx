import type { CountryPageData } from '../../lib/country-data';
import { CopyButton } from './copy-button';
import { BreadcrumbSchema } from './breadcrumb-schema';

const COUNTRY_BLOG_MAP: Record<string, { slug: string; title: string }[]> = {
  DE: [
    { slug: 'eurozone-countries-list', title: 'Eurozone Countries List 2026' },
    { slug: 'german-state-codes-list', title: 'German State Codes' },
    { slug: 'eu-country-codes-list', title: 'EU Country Codes' },
    { slug: 'sepa-countries-list', title: 'SEPA Countries List' },
  ],
  FR: [
    { slug: 'eurozone-countries-list', title: 'Eurozone Countries List 2026' },
    { slug: 'french-region-codes-list', title: 'French Region Codes' },
    { slug: 'eu-country-codes-list', title: 'EU Country Codes' },
  ],
  US: [
    { slug: 'us-state-codes-list', title: 'US State Codes' },
    { slug: 'countries-using-us-dollar', title: 'Countries Using the US Dollar' },
    { slug: 'country-code-faq', title: 'Country Code FAQ' },
  ],
  GB: [
    { slug: 'uk-country-codes-subdivisions', title: 'UK Country Codes & Subdivisions' },
    { slug: 'uk-region-codes-list', title: 'UK Region Codes' },
    { slug: 'sepa-countries-list', title: 'SEPA Countries List' },
  ],
  ES: [
    { slug: 'spanish-community-codes-list', title: 'Spanish Community Codes' },
    { slug: 'eurozone-countries-list', title: 'Eurozone Countries List 2026' },
    { slug: 'eu-country-codes-list', title: 'EU Country Codes' },
  ],
  CN: [
    { slug: 'chinese-province-codes-list', title: 'Chinese Province Codes' },
    { slug: 'asian-countries-list-codes', title: 'Asian Countries List' },
    { slug: 'country-code-faq', title: 'Country Code FAQ' },
  ],
  PT: [
    { slug: 'eurozone-countries-list', title: 'Eurozone Countries List 2026' },
    { slug: 'european-countries-list-codes', title: 'European Countries List' },
    { slug: 'sepa-countries-list', title: 'SEPA Countries List' },
  ],
  IN: [
    { slug: 'indian-state-codes-list', title: 'Indian State Codes' },
    { slug: 'asian-countries-list-codes', title: 'Asian Countries List' },
  ],
  JP: [
    { slug: 'japanese-prefecture-codes-list', title: 'Japanese Prefecture Codes' },
    { slug: 'asian-countries-list-codes', title: 'Asian Countries List' },
  ],
  BR: [
    { slug: 'brazilian-state-codes-list', title: 'Brazilian State Codes' },
    { slug: 'south-american-countries-list-codes', title: 'South American Countries' },
  ],
  IT: [
    { slug: 'italian-region-codes-list', title: 'Italian Region Codes' },
    { slug: 'eurozone-countries-list', title: 'Eurozone Countries List 2026' },
    { slug: 'eu-country-codes-list', title: 'EU Country Codes' },
  ],
  AU: [
    { slug: 'australian-state-codes-list', title: 'Australian State Codes' },
    { slug: 'oceania-countries-list-codes', title: 'Oceania Countries List' },
  ],
  MX: [
    { slug: 'mexican-state-codes-list', title: 'Mexican State Codes' },
    { slug: 'north-american-countries-list-codes', title: 'North American Countries' },
  ],
  KR: [
    { slug: 'south-korean-province-codes-list', title: 'South Korean Province Codes' },
    { slug: 'asian-countries-list-codes', title: 'Asian Countries List' },
  ],
  CA: [
    { slug: 'canadian-province-codes', title: 'Canadian Province Codes' },
    { slug: 'north-american-countries-list-codes', title: 'North American Countries' },
  ],
};

function CodeCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-slate-800 bg-slate-800/50 p-4">
      <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <span className="mt-1 text-2xl font-bold text-white">
        {value}
      </span>
      <CopyButton text={value} />
    </div>
  );
}

function CodeExample({ data }: { data: CountryPageData }) {
  const code = `import { country } from '@koshmoney/countries';

// Look up ${data.name} by alpha-2 code
const ${data.alpha2.toLowerCase()} = country.getCountry('${data.alpha2}');
// => { name: '${data.name}', alpha2: '${data.alpha2}', alpha3: '${data.alpha3}', numeric: '${data.numeric}' }

// Look up by alpha-3 code
country.getCountryByAlpha3('${data.alpha3}');

// Look up by numeric code
country.getCountryByNumeric('${data.numeric}');`;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-normal text-white">
        Code Example
      </h2>
      <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-slate-300 ring-1 ring-white/10">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function SubdivisionPreview({ data }: { data: CountryPageData }) {
  if (data.subdivisionCount === 0) return null;

  const INITIAL_SHOW = 15;
  const showAll = data.subdivisionPreview.length <= INITIAL_SHOW;
  const visibleSubs = showAll
    ? data.subdivisionPreview
    : data.subdivisionPreview.slice(0, INITIAL_SHOW);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-normal text-white">
        Subdivisions ({data.subdivisionCount})
      </h2>
      <div className="mt-3 overflow-x-auto rounded-xl ring-1 ring-white/10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-800/50">
              <th className="px-4 py-2 font-medium text-slate-400">Code</th>
              <th className="px-4 py-2 font-medium text-slate-400">Name</th>
              <th className="px-4 py-2 font-medium text-slate-400">Type</th>
            </tr>
          </thead>
          <tbody>
            {visibleSubs.map((sub) => (
              <tr key={sub.code} className="border-b border-slate-800">
                <td className="px-4 py-2 font-mono text-slate-200">{sub.code}</td>
                <td className="px-4 py-2 text-slate-300">{sub.name}</td>
                <td className="px-4 py-2 text-slate-500">{sub.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!showAll && (
        <p className="mt-2 text-sm text-slate-500">
          Showing {INITIAL_SHOW} of {data.subdivisionCount}.{' '}
          <a
            href={`/subdivisions/${data.alpha2.toLowerCase()}`}
            className="text-sky-500 hover:text-sky-400"
          >
            View all {data.subdivisionCount} subdivisions &rarr;
          </a>
        </p>
      )}
    </div>
  );
}

function FAQ({ data }: { data: CountryPageData }) {
  const faqs = [
    {
      question: `What is the ISO code for ${data.name}?`,
      answer: `${data.name} has three ISO 3166-1 codes: Alpha-2 "${data.alpha2}", Alpha-3 "${data.alpha3}", and Numeric "${data.numeric}".`,
    },
    {
      question: `How many subdivisions does ${data.name} have?`,
      answer:
        data.subdivisionCount > 0
          ? `${data.name} has ${data.subdivisionCount} subdivisions defined in ISO 3166-2, including ${data.subdivisionPreview
              .slice(0, 3)
              .map((s) => s.name)
              .join(', ')}${data.subdivisionCount > 3 ? ', and more' : ''}.`
          : `${data.name} does not have subdivisions defined in ISO 3166-2.`,
    },
    {
      question: `How to look up ${data.name} in JavaScript?`,
      answer: `Install @koshmoney/countries via npm, then use country.getCountry('${data.alpha2}') to get all ISO codes, or subdivision.getByCountry('${data.alpha2}') for subdivisions.`,
    },
  ];

  return (
    <div className="mt-6">
      <h2 className="text-xl font-normal text-white">
        FAQ
      </h2>
      <dl className="mt-3 space-y-4">
        {faqs.map((faq) => (
          <div key={faq.question}>
            <dt className="font-medium text-slate-200">
              {faq.question}
            </dt>
            <dd className="mt-1 text-sm text-slate-400">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function RelatedCountries({ data }: { data: CountryPageData }) {
  if (data.relatedCountries.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-normal text-white">
        Related Countries
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {data.relatedCountries.map((rc) => (
          <a
            key={rc.alpha2}
            href={`/countries/${rc.alpha2.toLowerCase()}`}
            className="flex items-center gap-2 rounded-lg border border-slate-800 p-3 text-sm transition hover:border-slate-700 hover:bg-slate-800/50"
          >
            <span className="text-lg">{rc.flag}</span>
            <span className="text-slate-300">{rc.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function RelatedArticles({ data }: { data: CountryPageData }) {
  const articles = COUNTRY_BLOG_MAP[data.alpha2];
  if (!articles?.length) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-normal text-white">Related Articles</h2>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {articles.map((a) => (
          <a
            key={a.slug}
            href={`/blog/${a.slug}`}
            className="rounded-lg border border-slate-800 px-4 py-3 text-sm text-slate-300 transition hover:border-sky-500/30 hover:bg-slate-800/50"
          >
            {a.title}
          </a>
        ))}
      </div>
    </div>
  );
}

export function CountryPageLayout({ data }: { data: CountryPageData }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the ISO code for ${data.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${data.name} has three ISO 3166-1 codes: Alpha-2 "${data.alpha2}", Alpha-3 "${data.alpha3}", and Numeric "${data.numeric}".`,
        },
      },
      {
        '@type': 'Question',
        name: `How many subdivisions does ${data.name} have?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            data.subdivisionCount > 0
              ? `${data.name} has ${data.subdivisionCount} subdivisions defined in ISO 3166-2.`
              : `${data.name} does not have subdivisions defined in ISO 3166-2.`,
        },
      },
      {
        '@type': 'Question',
        name: `How to look up ${data.name} in JavaScript?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Install @koshmoney/countries via npm, then use country.getCountry('${data.alpha2}') to get all ISO codes.`,
        },
      },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Countries', href: '/docs/api/country' },
          { name: data.name },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="mb-6">
        <h1 className="text-3xl font-normal text-white">
          <span className="mr-2 text-4xl">{data.flag}</span>
          {data.name} ({data.alpha2})
        </h1>
        <p className="mt-2 text-slate-400">
          ISO 3166 country code{data.continent ? ` - ${data.continent}` : ''}
          {data.region ? ` / ${data.region}` : ''}
        </p>
      </header>

      {/* About section */}
      <div className="mt-6">
        <h2 className="text-xl font-normal text-white">About {data.name}</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {data.name} ({data.alpha2}) is located in {data.continent}{data.region ? `, ${data.region}` : ''}.
          {data.currency ? ` The official currency is the ${data.currency.name} (${data.currency.code}).` : ''}
          {data.subdivisionCount > 0 ? ` It has ${data.subdivisionCount} administrative subdivisions defined in ISO 3166-2.` : ''}
          {data.memberships.length > 0 ? ` ${data.name} is a member of ${data.memberships.join(', ')}.` : ''}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <CodeCard label="Alpha-2" value={data.alpha2} />
        <CodeCard label="Alpha-3" value={data.alpha3} />
        <CodeCard label="Numeric" value={data.numeric} />
      </div>

      {(data.currency || data.memberships.length > 0) && (
        <div className="mt-4 flex flex-wrap gap-3">
          {data.currency && (
            <div className="rounded-lg border border-slate-800 px-4 py-2">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Currency
              </span>
              <p className="text-sm font-medium text-slate-200">
                {data.currency.symbol} {data.currency.code} - {data.currency.name}
              </p>
            </div>
          )}
          {data.memberships.length > 0 && (
            <div className="rounded-lg border border-slate-800 px-4 py-2">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Memberships
              </span>
              <p className="text-sm font-medium text-slate-200">
                {data.memberships.join(', ')}
              </p>
            </div>
          )}
        </div>
      )}

      <CodeExample data={data} />
      <SubdivisionPreview data={data} />
      <FAQ data={data} />
      <RelatedArticles data={data} />
      <RelatedCountries data={data} />

      <div className="mt-8 rounded-xl bg-sky-500/10 p-6 ring-1 ring-sky-500/20">
        <h2 className="text-lg font-medium text-sky-300">
          Use {data.name} data in your project
        </h2>
        <p className="mt-1 text-sm text-sky-400/80">
          Get ISO codes, subdivisions, currency, and more with a single npm package.
        </p>
        <pre className="mt-3 rounded-lg bg-slate-950 p-3 text-sm text-slate-300 ring-1 ring-white/10">
          <code>npm install @koshmoney/countries</code>
        </pre>
      </div>
    </article>
  );
}
