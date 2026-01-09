# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024

### Added

- Complete ISO 3166-1 support with alpha-2, alpha-3, and numeric code lookups
- Complete ISO 3166-2 support with 5000+ subdivisions across 249 countries
- Code conversion utilities (alpha2ToAlpha3, alpha3ToAlpha2, etc.)
- Validation functions for all code formats
- True tree-shaking support via subpath exports
- Per-country subdivision imports (`iso-3166/subdivision/US`)
- Full TypeScript support with complete type definitions
- Dual module format (ESM and CommonJS)
- Comprehensive documentation and API reference

### Features

- **Country lookups**: `whereAlpha2`, `whereAlpha3`, `whereNumeric`, `whereName`
- **Subdivision lookups**: `whereCode`, `where`, `whereName`, `forCountry`
- **Code conversions**: Convert between any ISO 3166-1 code format
- **Validation**: Validate any country or subdivision identifier
- **Format detection**: Automatically detect code format
- **Namespaced API**: Clean `country.*` and `subdivision.*` namespaces
- **Direct exports**: Tree-shakeable function exports

### Migration

This is a complete rewrite combining the functionality of `iso-3166-1` and `iso-3166-2` packages. See the [Migration Guide](./docs/MIGRATION.md) for upgrade instructions.
