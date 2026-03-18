import type { CountryPageData } from '../../lib/country-data';
import { CopyButton } from './copy-button';

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
            {data.subdivisionPreview.map((sub) => (
              <tr key={sub.code} className="border-b border-slate-800">
                <td className="px-4 py-2 font-mono text-slate-200">{sub.code}</td>
                <td className="px-4 py-2 text-slate-300">{sub.name}</td>
                <td className="px-4 py-2 text-slate-500">{sub.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.subdivisionCount > 5 && (
        <p className="mt-2 text-sm text-slate-500">
          ...and {data.subdivisionCount - 5} more.{' '}
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
