export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-sky-500 text-xs font-black text-white">
              K
            </span>
            Countries by Kosh Money
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            The complete ISO 3166 library for JavaScript and TypeScript.
          </p>
          <p className="mt-4 text-xs text-slate-600">MIT {new Date().getFullYear()} Kosh Money</p>
        </div>
        <div>
          <h4 className="text-xs font-medium uppercase tracking-widest text-slate-500">Product</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="/docs/getting-started" className="text-slate-400 transition hover:text-white">
                Documentation
              </a>
            </li>
            <li>
              <a href="/docs/api" className="text-slate-400 transition hover:text-white">
                API Reference
              </a>
            </li>
            <li>
              <a href="/blog" className="text-slate-400 transition hover:text-white">
                Blog
              </a>
            </li>
            <li>
              <a
                href="/tools/country-code-converter"
                className="text-slate-400 transition hover:text-white"
              >
                Converter Tool
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-medium uppercase tracking-widest text-slate-500">Community</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href="https://github.com/CopperxHQ/countries"
                className="text-slate-400 transition hover:text-white"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.npmjs.com/package/@koshmoney/countries"
                className="text-slate-400 transition hover:text-white"
              >
                npm
              </a>
            </li>
            <li>
              <a
                href="https://github.com/CopperxHQ/countries/issues"
                className="text-slate-400 transition hover:text-white"
              >
                Issues
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
