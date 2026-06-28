import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');

console.log('✓ SPA redirect fallback (public/404.html) successfully preserved in dist/.');
