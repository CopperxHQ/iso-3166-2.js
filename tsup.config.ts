import { defineConfig } from 'tsup';
import { readdirSync } from 'fs';
import { join } from 'path';

// Get all subdivision data files
const subdivisionDataDir = './src/subdivision/data';
let subdivisionEntries: Record<string, string> = {};

try {
  const files = readdirSync(subdivisionDataDir);
  subdivisionEntries = files
    .filter((f) => f.endsWith('.ts') && f !== 'all.ts')
    .reduce(
      (acc, f) => {
        const name = f.replace('.ts', '');
        acc[`subdivision/data/${name}`] = `${subdivisionDataDir}/${f}`;
        return acc;
      },
      {} as Record<string, string>
    );
} catch {
  // Directory doesn't exist yet during initial setup
}

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'country/index': 'src/country/index.ts',
    'subdivision/index': 'src/subdivision/index.ts',
    'subdivision/data/all': 'src/subdivision/data/all.ts',
    ...subdivisionEntries,
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  minify: true,
  splitting: false,
  treeshake: true,
  outDir: 'dist',
});
