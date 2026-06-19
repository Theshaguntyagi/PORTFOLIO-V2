import { copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');

try {
  copyFileSync(join(distDir, 'index.html'), join(distDir, '404.html'));
  console.log('✓ Successfully copied dist/index.html to dist/404.html for SPA routing fallback.');
} catch (err) {
  console.error('Failed to copy 404.html:', err);
  process.exit(1);
}
