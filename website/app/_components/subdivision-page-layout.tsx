import type { SubdivisionPageData } from '../../lib/subdivision-data';

function SubdivisionTable({ data }: { data: SubdivisionPageData }) {
  const grouped = data.subdivisionTypes.length > 1;

  if (!grouped) {
    return (
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-2 pr-4 font-medium text-gray-500 dark:text-gray-400">Code</th>
              <th className="py-2 pr-4 font-medium text-gray-500 dark:text-gray-400">Name</th>
              <th className="py-2 font-medium text-gray-500 dark:text-gray-400">Type</th>
            </tr>
          </thead>
          <tbody>
            {data.subdivisions.map((sub) => (
              <tr key={sub.code} className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-2 pr-4 font-mono text-sm text-gray-900 dark:text-gray-100">{sub.code}</td>
                <td className="py-2 pr-4 text-gray-700 dark:text-gray-300">{sub.name}</td>
                <td className="py-2 text-gray-500 dark:text-gray-400">{sub.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-8">
      {data.subdivisionTypes.map((type) => {
        const subs = data.subdivisions.filter((s) => s.type === type);
        return (
          <div key={type}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {type}s ({subs.length})
            </h3>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="py-2 pr-4 font-medium text-gray-500 dark:text-gray-400">Code</th>
                    <th className="py-2 font-medium text-gray-500 dark:text-gray-400">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {subs.map((sub) => (
                    <tr key={sub.code} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2 pr-4 font-mono text-sm text-gray-900 dark:text-gray-100">{sub.code}</td>
                      <td className="py-2 text-gray-700 dark:text-gray-300">{sub.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CodeExample({ data }: { data: SubdivisionPageData }) {
  const firstSub = data.subdivisions[0];
  const regionCode = firstSub?.code.split('-')[1] ?? 'XX';

  const code = `import { subdivision } from '@koshmoney/countries';

// Get all ${data.name} subdivisions
const subs = subdivision.getByCountry('${data.alpha2}');
// => ${data.totalCount} subdivisions

// Look up a specific subdivision
subdivision.get('${firstSub?.code ?? `${data.alpha2}-XX`}');
// => { code: '${firstSub?.code}', name: '${firstSub?.name}', type: '${firstSub?.type}' }

// Validate a subdivision code
subdivision.isValidCode('${firstSub?.code}');  // true
subdivision.isValidRegion('${data.alpha2}', '${regionCode}');  // true`;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Code Example
      </h2>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-900">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function TreeShakingTip({ data }: { data: SubdivisionPageData }) {
  const code = `// Import only ${data.name} subdivisions for smaller bundles
import { subdivisions } from '@koshmoney/countries/subdivision/${data.alpha2}';

Object.entries(subdivisions);
// => ${data.totalCount} entries`;

  return (
    <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
      <h3 className="font-semibold text-green-900 dark:text-green-100">
        Tree-Shaking Tip
      </h3>
      <p className="mt-1 text-sm text-green-700 dark:text-green-300">
        Import only {data.name} subdivisions to minimize bundle size:
      </p>
      <pre className="mt-2 overflow-x-auto rounded bg-green-100 p-3 text-sm dark:bg-green-900">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function SubdivisionPageLayout({ data }: { data: SubdivisionPageData }) {
  const primaryType = data.subdivisionTypes[0] ?? 'Subdivision';
  const typeLabel = data.subdivisionTypes.length === 1
    ? `${primaryType}s`
    : 'Subdivisions';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How many subdivisions does ${data.name} have?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${data.name} has ${data.totalCount} subdivisions defined in ISO 3166-2:${data.alpha2}, including ${data.subdivisionTypes.map((t) => `${data.subdivisions.filter((s) => s.type === t).length} ${t.toLowerCase()}s`).join(', ')}.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the ISO 3166-2 code format for ${data.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${data.name} subdivision codes follow the format ${data.alpha2}-XX, where ${data.alpha2} is the country's alpha-2 code and XX is the subdivision identifier. For example, ${data.subdivisions[0]?.code} represents ${data.subdivisions[0]?.name}.`,
        },
      },
      {
        '@type': 'Question',
        name: `How to get ${data.name} subdivisions in JavaScript?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Install @koshmoney/countries via npm, then use subdivision.getByCountry('${data.alpha2}') to get all ${data.totalCount} subdivisions, or import directly from '@koshmoney/countries/subdivision/${data.alpha2}' for tree-shaking.`,
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          <span className="mr-2 text-4xl">{data.flag}</span>
          {data.name} {typeLabel}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          All {data.totalCount} {data.name} subdivisions with ISO 3166-2:{data.alpha2} codes
          {data.continent ? ` - ${data.continent}` : ''}
          {data.region ? ` / ${data.region}` : ''}
        </p>
      </header>

      <div className="flex flex-wrap gap-3">
        <div className="rounded-lg border border-gray-200 px-4 py-2 dark:border-gray-700">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Total
          </span>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {data.totalCount} subdivisions
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 px-4 py-2 dark:border-gray-700">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Types
          </span>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {data.subdivisionTypes.join(', ')}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 px-4 py-2 dark:border-gray-700">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            ISO Standard
          </span>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            ISO 3166-2:{data.alpha2}
          </p>
        </div>
      </div>

      <CodeExample data={data} />
      <TreeShakingTip data={data} />

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          All {data.name} {typeLabel}
        </h2>
        <SubdivisionTable data={data} />
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          FAQ
        </h2>
        <dl className="mt-3 space-y-4">
          <div>
            <dt className="font-medium text-gray-900 dark:text-gray-100">
              How many subdivisions does {data.name} have?
            </dt>
            <dd className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {data.name} has {data.totalCount} subdivisions defined in ISO 3166-2:{data.alpha2},
              including {data.subdivisionTypes.map((t) =>
                `${data.subdivisions.filter((s) => s.type === t).length} ${t.toLowerCase()}s`
              ).join(', ')}.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-gray-100">
              What is the ISO 3166-2 code format for {data.name}?
            </dt>
            <dd className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {data.name} subdivision codes follow the format {data.alpha2}-XX, where {data.alpha2} is
              the country&apos;s alpha-2 code and XX is the subdivision identifier. For
              example, {data.subdivisions[0]?.code} represents {data.subdivisions[0]?.name}.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-gray-100">
              How to get {data.name} subdivisions in JavaScript?
            </dt>
            <dd className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Install <code className="rounded bg-gray-100 px-1 py-0.5 text-xs dark:bg-gray-800">@koshmoney/countries</code> via
              npm, then use <code className="rounded bg-gray-100 px-1 py-0.5 text-xs dark:bg-gray-800">subdivision.getByCountry(&apos;{data.alpha2}&apos;)</code> to
              get all {data.totalCount} subdivisions.
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-6 flex gap-3">
        <a
          href={`/countries/${data.alpha2.toLowerCase()}`}
          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View {data.name} country page &rarr;
        </a>
        <a
          href="/tools/country-code-converter"
          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Country code converter &rarr;
        </a>
      </div>

      <div className="mt-8 rounded-lg bg-blue-50 p-6 dark:bg-blue-950">
        <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
          Use {data.name} subdivision data in your project
        </h2>
        <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
          Get all {data.totalCount} {data.name} subdivisions with ISO 3166-2 codes, plus countries,
          currencies, postal codes, and more.
        </p>
        <pre className="mt-3 rounded bg-blue-100 p-3 text-sm dark:bg-blue-900">
          <code>npm install @koshmoney/countries</code>
        </pre>
      </div>
    </article>
  );
}
