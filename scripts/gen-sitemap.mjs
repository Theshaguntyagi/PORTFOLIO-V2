// Auto-generates public/sitemap.xml + public/robots.txt with correct
// URLs, including dynamic blog posts fetched from Firestore.
// Runs automatically before each build (prebuild).
import { writeFileSync, mkdirSync } from 'node:fs';
import { getPublishedPosts } from './firestore-blogs.mjs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ORIGIN = 'https://shaguntyagi.tech';
const BASE = '';

const ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/experience', priority: '0.8', changefreq: 'monthly' },
  { path: '/projects', priority: '0.9', changefreq: 'monthly' },
  { path: '/blog', priority: '0.9', changefreq: 'daily' },
  { path: '/contact', priority: '0.7', changefreq: 'yearly' },
  { path: '/testimonials', priority: '0.6', changefreq: 'monthly' },
  { path: '/now', priority: '0.5', changefreq: 'monthly' },
  { path: '/uses', priority: '0.5', changefreq: 'yearly' },
  { path: '/colophon', priority: '0.4', changefreq: 'yearly' },
  { path: '/links', priority: '0.5', changefreq: 'monthly' },
  { path: '/press', priority: '0.4', changefreq: 'yearly' },
  { path: '/speaking', priority: '0.4', changefreq: 'monthly' },
  { path: '/changelog', priority: '0.5', changefreq: 'weekly' },
  { path: '/start-here', priority: '0.6', changefreq: 'monthly' },
];

const __dirname = dirname(fileURLToPath(import.meta.url));

// /analytics is intentionally excluded (dashboard page, noindex in postbuild).
async function addBlogRoutes() {
  const posts = await getPublishedPosts();
  for (const p of posts) {
    ROUTES.push({ path: `/blog/${p.slug}`, priority: '0.8', changefreq: 'monthly', lastmod: p.lastmod });
  }
  console.log(`✓ Added ${posts.length} published blog routes to sitemap.`);
}

async function main() {
  await addBlogRoutes();

  const lastmod = new Date().toISOString().slice(0, 10);

  const urls = ROUTES.map(({ path, priority, changefreq, lastmod: own }) => {
    const loc = `${ORIGIN}${BASE}${path === '/' ? '/' : path}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${own || lastmod}</lastmod>\n    <changefreq>${changefreq || 'monthly'}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  }).join('\n\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  const robots = `User-agent: *\nAllow: /\nDisallow: ${BASE}/admin\n\nSitemap: ${ORIGIN}${BASE}/sitemap.xml\n`;

  const pub = join(__dirname, '..', 'public');
  mkdirSync(pub, { recursive: true });
  writeFileSync(join(pub, 'sitemap.xml'), sitemap);
  writeFileSync(join(pub, 'robots.txt'), robots);

  console.log(`✓ Generated sitemap.xml (${ROUTES.length} routes) + robots.txt in public/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
