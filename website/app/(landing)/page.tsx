'use client'

import { useState } from 'react'
import { Globe } from '../_components/globe'
import { InstallCommand } from '../_components/install-command'
import { CodeShowcase } from '../_components/code-showcase'
import {
  Globe as GlobeIcon,
  MapPin,
  Mail,
  Shield,
  TreePine,
  FileCode,
  Check,
  X,
  ArrowRight,
  Menu,
  XIcon,
  Package,
  Zap,
  Hash,
  Landmark,
} from 'lucide-react'

/* ─── Data ────────────────────────────────────────────────────────────── */

const FEATURES = [
  { icon: GlobeIcon, title: '249 Countries', desc: 'Full ISO 3166-1 with alpha-2, alpha-3, and numeric codes.' },
  { icon: MapPin, title: '5,000+ Subdivisions', desc: 'ISO 3166-2 states, provinces, regions, and territories.' },
  { icon: Mail, title: 'Postal Codes', desc: 'Validate ZIP codes, postcodes, PIN codes for 150+ countries.' },
  { icon: Shield, title: 'Memberships', desc: 'EU, SEPA, EEA, Eurozone, and Schengen membership checks.' },
  { icon: TreePine, title: 'Tree-Shakeable', desc: 'Import only what you need — from 60KB down to 8KB.' },
  { icon: FileCode, title: 'TypeScript First', desc: 'Full type definitions. Zero runtime dependencies for core.' },
]

const COMPARISON = [
  { feature: 'Countries', ours: '249', a: '249', b: '249', c: '249' },
  { feature: 'Subdivisions', ours: '5,000+', a: '\u2014', b: '\u2014', c: '5,000+' },
  { feature: 'Postal Codes', ours: '150+', a: '\u2014', b: '\u2014', c: '\u2014' },
  { feature: 'Currencies', ours: true, a: false, b: 'Partial', c: false },
  { feature: 'TypeScript', ours: 'Built-in', a: '@types', b: 'Built-in', c: 'Partial' },
  { feature: 'Tree-Shaking', ours: 'Per-country', a: false, b: false, c: false },
  { feature: 'Zero Deps', ours: 'Core', a: false, b: true, c: true },
]

const CODE_TABS = [
  {
    label: 'Country Lookup',
    code: `import { country } from '@koshmoney/countries';

const us = country.getCountry('US');
// { alpha2: 'US', alpha3: 'USA', numeric: '840',
//   name: 'United States of America', ... }

const all = country.getAllCountries();
// 249 countries`,
  },
  {
    label: 'Subdivisions',
    code: `import { subdivision } from '@koshmoney/countries';

const ca = subdivision.get('US-CA');
// { code: 'US-CA', name: 'California',
//   type: 'state', parent: 'US' }

const states = subdivision.getByCountry('US');
// All US states and territories`,
  },
  {
    label: 'Postal Codes',
    code: `import { postalCode } from '@koshmoney/countries';

postalCode.validate('90210', 'US');  // true
postalCode.validate('SW1A 1AA', 'GB'); // true
postalCode.validate('123', 'US');    // false

postalCode.hasPostalCode('HK');      // false`,
  },
  {
    label: 'Memberships',
    code: `import { membership } from '@koshmoney/countries/membership';

membership.isEU('FR');       // true
membership.isEU('GB');       // false
membership.isSEPA('CH');     // true
membership.isSchengen('IE'); // false

const euCountries = membership.getEUCountries();`,
  },
]

const SPECIALIZED_MODULES = [
  {
    icon: Hash,
    label: 'Currency',
    path: '@koshmoney/countries/currency',
    code: `import { currency } from '@koshmoney/countries/currency';
currency.getCurrency('US');
// { code: 'USD', name: 'US Dollar', symbol: '$' }`,
  },
  {
    icon: Zap,
    label: 'Dial Codes',
    path: '@koshmoney/countries/dialCode',
    code: `import { dialCode } from '@koshmoney/countries/dialCode';
dialCode.getDialCodes('US');
// ['+1']`,
  },
  {
    icon: GlobeIcon,
    label: 'Geography',
    path: '@koshmoney/countries/geography',
    code: `import { geography } from '@koshmoney/countries/geography';
geography.getContinent('JP');
// 'Asia'`,
  },
  {
    icon: Landmark,
    label: 'Membership',
    path: '@koshmoney/countries/membership',
    code: `import { membership } from '@koshmoney/countries/membership';
membership.isEU('DE');
// true`,
  },
]

const USE_CASES = [
  { icon: Landmark, color: 'sky', title: 'Fintech & Banking', desc: 'KYC, compliance, SEPA routing, currency conversion', href: '/use-cases/fintech' },
  { icon: Package, color: 'emerald', title: 'E-Commerce', desc: 'Address validation, shipping zones, tax regions', href: '/use-cases/ecommerce' },
  { icon: Shield, color: 'violet', title: 'Crypto & Web3', desc: 'Sanctions screening, geo-fencing, compliance', href: '/use-cases/crypto' },
  { icon: GlobeIcon, color: 'amber', title: 'SaaS Platforms', desc: 'Country pickers, localization, user onboarding', href: '/use-cases/saas' },
]

const ACCENT_COLORS: Record<string, string> = {
  sky: 'border-l-sky-400 bg-sky-50',
  emerald: 'border-l-emerald-400 bg-emerald-50',
  violet: 'border-l-violet-400 bg-violet-50',
  amber: 'border-l-amber-400 bg-amber-50',
}

const ACCENT_ICON_COLORS: Record<string, string> = {
  sky: 'text-sky-500',
  emerald: 'text-emerald-500',
  violet: 'text-violet-500',
  amber: 'text-amber-500',
}

/* ─── Page ────────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Nav />

      {/* Hero — Dark */}
      <section className="relative overflow-hidden bg-slate-900 pb-20 pt-32 sm:pb-28 sm:pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="flex flex-wrap gap-2">
              {['TypeScript', 'Zero Dependencies', 'Tree-Shakeable', 'ISO 3166'].map((b) => (
                <span key={b} className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs font-medium text-slate-300">{b}</span>
              ))}
            </div>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Countries <span className="text-sky-400">(ISO 3166)</span><br />
              <span className="text-sky-400">for JavaScript</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-400">
              249 countries. 5,000+ subdivisions. Postal codes, currencies, dial codes, geography, and EU/SEPA membership — in one tree-shakeable package.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
              <span><strong className="text-white">249</strong> Countries</span>
              <span><strong className="text-white">5,000+</strong> Subdivisions</span>
              <span><strong className="text-white">150+</strong> Postal Codes</span>
              <span><strong className="text-white">8KB</strong> Min Bundle</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/docs/getting-started" className="inline-flex items-center gap-2 rounded-lg bg-sky-400 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-sky-300">
                Get Started <ArrowRight className="h-4 w-4" />
              </a>
              <a href="https://github.com/CopperxHQ/countries" className="inline-flex items-center rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-slate-400 hover:text-white">
                View on GitHub
              </a>
            </div>
          </div>
          <div className="hidden lg:block">
            <Globe />
          </div>
        </div>
      </section>

      {/* Features — Light (no stat banner — hero stats are sufficient) */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold tracking-tight">Everything You Need</h2>
          <p className="mt-2 text-slate-500">One package replaces half a dozen country data libraries.</p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="group rounded-xl border border-slate-200 p-6 transition hover:border-sky-200 hover:shadow-sm">
                <div className="mb-3 inline-flex rounded-lg bg-sky-50 p-2.5 text-sky-500">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start — Dark */}
      <section className="bg-slate-900 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold tracking-tight text-white">Quick Start</h2>
          <p className="mt-2 text-slate-400">Install and start querying country data in seconds.</p>
          <div className="mt-8">
            <InstallCommand dark />
          </div>
          <div className="mt-8">
            <CodeShowcase tabs={CODE_TABS} />
          </div>
        </div>
      </section>

      {/* Specialized Modules — Light */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold tracking-tight">Import Only What You Need</h2>
          <p className="mt-2 text-slate-500">
            Specialized modules are separate subpath exports — they never bloat your main bundle.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {SPECIALIZED_MODULES.map((m) => (
              <div key={m.label} className="overflow-hidden rounded-xl border border-slate-200">
                <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-5 py-3">
                  <m.icon className="h-4 w-4 text-sky-500" />
                  <span className="text-sm font-semibold text-slate-700">{m.label}</span>
                  <code className="ml-auto text-xs text-slate-400">{m.path}</code>
                </div>
                <pre className="overflow-x-auto bg-slate-900 p-5 text-[13px] leading-relaxed text-slate-300">
                  <code>{m.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After — Light */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold tracking-tight">Before and After</h2>
          <p className="mt-2 text-slate-500">Replace multiple packages with one unified API.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-widest text-red-500">Before — Multiple packages</div>
              <div className="overflow-hidden rounded-xl border-l-4 border-l-red-400 border border-slate-800 bg-slate-900">
                <pre className="p-5 text-[13px] leading-relaxed text-slate-300"><code>{`// 3 packages, different APIs
import * as iso3166_1 from 'iso-3166-1';
import * as iso3166_2 from 'iso-3166-2';
import currencies from 'currency-codes';

// No TypeScript, no validation
const c = iso3166_1.whereAlpha2('US');
const s = iso3166_2.subdivision('US-CA');`}</code></pre>
              </div>
            </div>
            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-500">After — One package</div>
              <div className="overflow-hidden rounded-xl border-l-4 border-l-emerald-400 border border-slate-800 bg-slate-900">
                <pre className="p-5 text-[13px] leading-relaxed text-slate-300"><code>{`// One package, unified API
import { country, subdivision }
  from '@koshmoney/countries';
import { currency }
  from '@koshmoney/countries/currency';

const c = country.getCountry('US');
const s = subdivision.get('US-CA');
const usd = currency.getCurrency('US');`}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison — Light gray */}
      <section className="border-t border-slate-200 bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold tracking-tight">How It Compares</h2>
          <p className="mt-2 text-slate-500">Feature comparison with popular alternatives.</p>
          <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 font-semibold text-slate-600">Feature</th>
                  <th className="px-4 py-3 font-semibold text-sky-600">@koshmoney/countries</th>
                  <th className="px-4 py-3 font-semibold text-slate-400">i18n-iso-countries</th>
                  <th className="px-4 py-3 font-semibold text-slate-400">countries-list</th>
                  <th className="px-4 py-3 font-semibold text-slate-400">country-state-city</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-2.5 font-medium text-slate-700">{row.feature}</td>
                    <td className="bg-sky-50/40 px-4 py-2.5 font-medium text-sky-700">{renderCell(row.ours)}</td>
                    <td className="px-4 py-2.5 text-slate-500">{renderCell(row.a)}</td>
                    <td className="px-4 py-2.5 text-slate-500">{renderCell(row.b)}</td>
                    <td className="px-4 py-2.5 text-slate-500">{renderCell(row.c)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Use Cases — Light */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold tracking-tight">Built for Every Use Case</h2>
          <p className="mt-2 text-slate-500">From fintech compliance to SaaS country pickers.</p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {USE_CASES.map((uc) => (
              <a
                key={uc.title}
                href={uc.href}
                className={`group rounded-xl border-l-4 p-6 transition hover:shadow-sm ${ACCENT_COLORS[uc.color]}`}
              >
                <uc.icon className={`h-6 w-6 ${ACCENT_ICON_COLORS[uc.color]}`} />
                <h3 className="mt-3 font-semibold text-slate-900 group-hover:text-sky-600">{uc.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{uc.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Dark */}
      <section className="bg-slate-900 py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">Start Building</h2>
          <p className="mt-3 text-slate-400">Get ISO codes, subdivisions, currencies, and more — in one package.</p>
          <div className="mx-auto mt-6 max-w-md">
            <InstallCommand dark />
          </div>
          <a href="/docs/getting-started" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-sky-400 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-sky-300">
            Read the Docs <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Footer — 3-column */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-sky-400 text-xs font-black text-slate-900">K</span>
              Countries by Kosh Money
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              The complete ISO 3166 library for JavaScript and TypeScript.
            </p>
            <p className="mt-4 text-xs text-slate-400">MIT {new Date().getFullYear()} Kosh Money</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400">Product</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="/docs/getting-started" className="text-slate-600 transition hover:text-slate-900">Documentation</a></li>
              <li><a href="/docs/api" className="text-slate-600 transition hover:text-slate-900">API Reference</a></li>
              <li><a href="/blog" className="text-slate-600 transition hover:text-slate-900">Blog</a></li>
              <li><a href="/tools/country-code-converter" className="text-slate-600 transition hover:text-slate-900">Converter Tool</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400">Community</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="https://github.com/CopperxHQ/countries" className="text-slate-600 transition hover:text-slate-900">GitHub</a></li>
              <li><a href="https://www.npmjs.com/package/@koshmoney/countries" className="text-slate-600 transition hover:text-slate-900">npm</a></li>
              <li><a href="https://github.com/CopperxHQ/countries/issues" className="text-slate-600 transition hover:text-slate-900">Issues</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ─── Components ──────────────────────────────────────────────────────── */

function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2 text-sm font-bold text-white">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-sky-400 text-xs font-black text-slate-900">K</span>
          Countries by Kosh Money
        </a>
        <div className="hidden items-center gap-6 text-sm sm:flex">
          <a href="/docs/getting-started" className="text-slate-300 transition hover:text-white">Docs</a>
          <a href="/blog" className="text-slate-300 transition hover:text-white">Blog</a>
          <a href="/tools/country-code-converter" className="text-slate-300 transition hover:text-white">Converter</a>
          <a href="https://github.com/CopperxHQ/countries" className="text-slate-400 transition hover:text-white">GitHub</a>
        </div>
        <button onClick={() => setOpen(!open)} className="sm:hidden text-slate-300 hover:text-white">
          {open ? <XIcon className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-800 bg-slate-900 px-6 py-4 sm:hidden">
          <div className="flex flex-col gap-3 text-sm">
            <a href="/docs/getting-started" className="text-slate-300 hover:text-white">Docs</a>
            <a href="/blog" className="text-slate-300 hover:text-white">Blog</a>
            <a href="/tools/country-code-converter" className="text-slate-300 hover:text-white">Converter</a>
            <a href="https://github.com/CopperxHQ/countries" className="text-slate-400 hover:text-white">GitHub</a>
          </div>
        </div>
      )}
    </nav>
  )
}

function renderCell(v: string | boolean) {
  if (v === true) return <Check className="h-4 w-4 text-emerald-500" />
  if (v === false) return <X className="h-4 w-4 text-slate-300" />
  return v
}
