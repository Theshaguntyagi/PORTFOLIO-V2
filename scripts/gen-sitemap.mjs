// Auto-generates public/sitemap.xml + public/robots.txt with correct
// GitHub Pages subpath URLs. Runs automatically before each build (prebuild).
// Add new routes here when you add pages.
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ORIGIN = 'https://theshaguntyagi.github.io';
const BASE = '/PORTFOLIO-V2';

const ROUTES = [
  { path: '/', priority: '1.0' },
  { path: '/about', priority: '0.8' },
  { path: '/experience', priority: '0.8' },
  { path: '/projects', priority: '0.9' },
  { path: '/blog', priority: '0.9' },
  { path: '/contact', priority: '0.7' },
  { path: '/testimonials', priority: '0.6' },
  { path: '/now', priority: '0.5' },
  { path: '/uses', priority: '0.5' },
];

const lastmod = new Date().toISOString().slice(0, 10);

const urls = ROUTES.map(({ path, priority }) => {
  const loc = `${ORIGIN}${BASE}${path === '/' ? '/' : path}`;
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
}).join('\n\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

const robots = `User-agent: *\nAllow: /\nDisallow: ${BASE}/admin\n\nSitemap: ${ORIGIN}${BASE}/sitemap.xml\n`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const pub = join(__dirname, '..', 'public');
mkdirSync(pub, { recursive: true });
writeFileSync(join(pub, 'sitemap.xml'), sitemap);
writeFileSync(join(pub, 'robots.txt'), robots);

console.log(`✓ Generated sitemap.xml (${ROUTES.length} routes) + robots.txt in public/`);
