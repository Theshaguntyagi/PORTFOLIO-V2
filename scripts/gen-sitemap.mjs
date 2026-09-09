// Auto-generates public/sitemap.xml + public/robots.txt with correct
// URLs, including dynamic blog posts fetched from Firestore.
// Runs automatically before each build (prebuild).
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
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
];

const __dirname = dirname(fileURLToPath(import.meta.url));

// Resolves the Firebase project ID from .env. Previously fell back to a
// hardcoded, WRONG project id ('portfolio-v2-5c9c3' — a typo/stale value
// that doesn't match the real project, 'portfolio-v2-ab683') if .env was
// missing or unreadable. That meant a build run without .env (e.g. a fresh
// CI checkout) would silently query a nonexistent Firestore project, get a
// non-OK response, and fall back to static routes only — dropping every
// blog post from the sitemap with just a soft console.warn buried in build
// logs. There is no safe fallback project id (every Firebase project is
// unique), so we now fail loudly instead of guessing.
function resolveProjectId() {
  try {
    const envText = readFileSync(join(__dirname, '..', '.env'), 'utf-8');
    const match = /VITE_FIREBASE_PROJECT_ID\s*=\s*(.+)/.exec(envText);
    if (match) return match[1].trim().replace(/['"]/g, '');
  } catch (e) {
    // .env not found or unreadable — handled by the caller.
  }
  return null;
}

// Fetch dynamic blog posts from Firestore REST API
async function addBlogRoutes() {
  const projectId = resolveProjectId();
  if (!projectId) {
    console.error(
      '✗ VITE_FIREBASE_PROJECT_ID not found (.env missing or unreadable). ' +
      'Sitemap will contain static routes ONLY — blog posts will be missing. ' +
      'Set up .env (see .env.example) before building for production.'
    );
    return;
  }

  try {
    // pageSize=300 ensures we fetch all blog posts in a single request
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/blogs?pageSize=300`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const docs = data.documents || [];
      let count = 0;
      docs.forEach(doc => {
        const fields = doc.fields;
        const status = fields?.publishing?.mapValue?.fields?.status?.stringValue;
        const slug = fields?.slug?.stringValue;
        if (status === 'published' && slug) {
          ROUTES.push({ path: `/blog/${slug}`, priority: '0.8', changefreq: 'monthly' });
          count++;
        }
      });
      console.log(`✓ Dynamically added ${count} published blog routes from Firestore to sitemap.`);
    } else {
      console.error(`✗ Firestore REST API returned status ${res.status} for project "${projectId}". Sitemap will be missing blog posts.`);
    }
  } catch (err) {
    console.error('✗ Failed to fetch dynamic blog routes for sitemap:', err.message);
  }
}

async function main() {
  await addBlogRoutes();

  const lastmod = new Date().toISOString().slice(0, 10);

  const urls = ROUTES.map(({ path, priority, changefreq }) => {
    const loc = `${ORIGIN}${BASE}${path === '/' ? '/' : path}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq || 'monthly'}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  }).join('\n\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  const robots = `User-agent: *\nAllow: /\nDisallow: ${BASE}/admin\n\nSitemap: ${ORIGIN}${BASE}/sitemap.xml\n`;

  const pub = join(__dirname, '..', 'public');
  mkdirSync(pub, { recursive: true });
  writeFileSync(join(pub, 'sitemap.xml'), sitemap);
  writeFileSync(join(pub, 'robots.txt'), robots);

  console.log(`✓ Generated sitemap.xml (${ROUTES.length} routes) + robots.txt in public/`);
}

main();
