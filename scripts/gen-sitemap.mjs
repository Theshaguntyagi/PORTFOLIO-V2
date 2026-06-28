// Auto-generates public/sitemap.xml + public/robots.txt with correct
// URLs, including dynamic blog posts fetched from Firestore.
// Runs automatically before each build (prebuild).
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ORIGIN = 'https://shaguntyagi.tech';
const BASE = '';

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

const __dirname = dirname(fileURLToPath(import.meta.url));

// Fetch dynamic blog posts from Firestore REST API
async function addBlogRoutes() {
  let projectId = 'portfolio-v2-5c9c3'; // default fallback
  try {
    const envText = readFileSync(join(__dirname, '..', '.env'), 'utf-8');
    const match = /VITE_FIREBASE_PROJECT_ID\s*=\s*(.+)/.exec(envText);
    if (match) {
      projectId = match[1].trim().replace(/['"]/g, '');
    }
  } catch (e) {
    // .env not found or unreadable, use fallback
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
          ROUTES.push({ path: `/blog/${slug}`, priority: '0.8' });
          count++;
        }
      });
      console.log(`✓ Dynamically added ${count} published blog routes from Firestore to sitemap.`);
    } else {
      console.warn(`⚠️ Firestore REST API returned status ${res.status}. Using static routes only.`);
    }
  } catch (err) {
    console.warn('⚠️ Failed to fetch dynamic blog routes for sitemap:', err.message);
  }
}

async function main() {
  await addBlogRoutes();

  const lastmod = new Date().toISOString().slice(0, 10);

  const urls = ROUTES.map(({ path, priority }) => {
    const loc = `${ORIGIN}${BASE}${path === '/' ? '/' : path}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
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
