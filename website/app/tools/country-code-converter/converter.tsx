'use client';

import { useState, useMemo, useCallback } from 'react';
import type { ConverterCountry } from './page';

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
      title={`Copy "${text}"`}
    >
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function detectFormat(query: string): string {
  const trimmed = query.trim();
  if (/^\d{1,3}$/.test(trimmed)) return 'numeric';
  if (/^[A-Za-z]{2}$/.test(trimmed)) return 'alpha-2';
  if (/^[A-Za-z]{3}$/.test(trimmed)) return 'alpha-3';
  return 'name';
}

function CodeCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-gray-200 p-4 dark:border-gray-700">
      <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
        {label}
      </span>
      <span className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">
        {value}
      </span>
      <CopyBtn text={value} />
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-2 last:border-0 dark:border-gray-800">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{value}</span>
        <CopyBtn text={value} />
      </div>
    </div>
  );
}

function MembershipBadge({ name, active }: { name: string; active: boolean }) {
  if (!active) return null;
  return (
    <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
      {name}
    </span>
  );
}

function CountryResult({ country }: { country: ConverterCountry }) {
  return (
    <div className="mt-6 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          <span className="mr-2 text-2xl">{country.flag}</span>
          {country.name}
        </h2>
        {country.continent && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {country.continent}{country.region ? ` / ${country.region}` : ''}
          </p>
        )}
      </div>

      <div className="p-6">
        <div className="grid grid-cols-3 gap-3">
          <CodeCard label="Alpha-2" value={country.alpha2} />
          <CodeCard label="Alpha-3" value={country.alpha3} />
          <CodeCard label="Numeric" value={country.numeric} />
        </div>

        <div className="mt-6 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Details
          </h3>
          <InfoRow label="Country Name" value={country.name} />
          {country.currency && (
            <>
              <InfoRow label="Currency" value={`${country.currency.code} (${country.currency.symbol})`} />
              <InfoRow label="Currency Name" value={country.currency.name} />
            </>
          )}
          {country.continent && <InfoRow label="Continent" value={country.continent} />}
          {country.region && <InfoRow label="Region" value={country.region} />}
        </div>

        {country.memberships.length > 0 && (
          <div className="mt-4">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Memberships
            </h3>
            <div className="flex flex-wrap gap-2">
              <MembershipBadge name="EU" active={country.memberships.includes('EU')} />
              <MembershipBadge name="SEPA" active={country.memberships.includes('SEPA')} />
              <MembershipBadge name="EEA" active={country.memberships.includes('EEA')} />
              <MembershipBadge name="Eurozone" active={country.memberships.includes('Eurozone')} />
              <MembershipBadge name="Schengen" active={country.memberships.includes('Schengen')} />
            </div>
          </div>
        )}

        <div className="mt-4">
          <a
            href={`/countries/${country.alpha2.toLowerCase()}`}
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View full {country.name} country page &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

export function CountryCodeConverter({ countries }: { countries: ConverterCountry[] }) {
  const [query, setQuery] = useState('');

  const { match, suggestions, format } = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return { match: null, suggestions: [], format: null };

    const fmt = detectFormat(trimmed);
    const upper = trimmed.toUpperCase();
    const lower = trimmed.toLowerCase();

    // Try exact match first
    let exactMatch: ConverterCountry | null = null;

    if (fmt === 'alpha-2') {
      exactMatch = countries.find((c) => c.alpha2 === upper) ?? null;
    } else if (fmt === 'alpha-3') {
      exactMatch = countries.find((c) => c.alpha3 === upper) ?? null;
    } else if (fmt === 'numeric') {
      const padded = trimmed.padStart(3, '0');
      exactMatch = countries.find((c) => c.numeric === padded) ?? null;
    }

    if (exactMatch) {
      return { match: exactMatch, suggestions: [], format: fmt };
    }

    // Fuzzy search by name
    const nameMatches = countries.filter((c) => c.name.toLowerCase().includes(lower));

    if (nameMatches.length === 1) {
      return { match: nameMatches[0], suggestions: [], format: 'name' };
    }

    // Also search by code prefix for partial matches
    const codeMatches = countries.filter(
      (c) =>
        c.alpha2.startsWith(upper) ||
        c.alpha3.startsWith(upper) ||
        c.numeric.startsWith(trimmed)
    );

    const combined = [...new Map([...nameMatches, ...codeMatches].map((c) => [c.alpha2, c])).values()];

    return {
      match: null,
      suggestions: combined.slice(0, 10),
      format: fmt,
    };
  }, [query, countries]);

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Country Code Converter
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Look up any country by name, ISO 3166 alpha-2, alpha-3, or numeric code.
          Get all code formats, currency, continent, and EU/SEPA membership.
        </p>
      </header>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter country name or code (e.g. US, USA, 840, Germany)"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-lg text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-800"
          autoFocus
          autoComplete="off"
          spellCheck={false}
        />
        {format && query.trim() && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            {format}
          </span>
        )}
      </div>

      {match && <CountryResult country={match} />}

      {!match && suggestions.length > 0 && (
        <div className="mt-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-900">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {suggestions.length} match{suggestions.length !== 1 ? 'es' : ''} found
            </span>
          </div>
          <ul>
            {suggestions.map((c) => (
              <li key={c.alpha2}>
                <button
                  onClick={() => setQuery(c.alpha2)}
                  className="flex w-full items-center gap-3 border-b border-gray-100 px-4 py-3 text-left hover:bg-gray-50 last:border-0 dark:border-gray-800 dark:hover:bg-gray-800"
                >
                  <span className="text-xl">{c.flag}</span>
                  <span className="flex-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {c.name}
                  </span>
                  <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
                    {c.alpha2} / {c.alpha3} / {c.numeric}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!match && suggestions.length === 0 && query.trim() && (
        <div className="mt-6 rounded-lg border border-gray-200 p-8 text-center dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">
            No country found for &ldquo;{query.trim()}&rdquo;. Try a different name or code.
          </p>
        </div>
      )}

      {!query.trim() && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            How It Works
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Auto-Detect Format</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Type any format and it will be detected automatically: 2-letter alpha-2 (US), 3-letter alpha-3 (USA), numeric (840), or country name (United States).
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">All 249 Countries</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Includes all ISO 3166-1 entries: sovereign states, dependent territories, and special areas.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Copy Any Value</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Click the copy button next to any value to copy it to your clipboard instantly.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Rich Data</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                See currency, continent, region, and EU/SEPA/EEA/Eurozone/Schengen membership for each country.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-blue-50 p-6 dark:bg-blue-950">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
              Use this data in your code
            </h3>
            <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
              All the data in this tool comes from <code className="rounded bg-blue-100 px-1 py-0.5 text-xs dark:bg-blue-900">@koshmoney/countries</code>.
              Install it to use the same lookups programmatically.
            </p>
            <pre className="mt-3 overflow-x-auto rounded bg-blue-100 p-3 text-sm dark:bg-blue-900">
              <code>npm install @koshmoney/countries</code>
            </pre>
          </div>

          <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Try These Examples
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {['US', 'GBR', '276', 'Japan', 'BR', 'Switzerland', '356'].map((example) => (
              <button
                key={example}
                onClick={() => setQuery(example)}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
