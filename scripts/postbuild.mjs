import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');

// 1. Define static routes to generate
const STATIC_ROUTES = [
  'about',
  'experience',
  'projects',
  'blog',
  'contact',
  'testimonials',
  'now',
  'uses',
  'guestbook',
];

// 2. Fetch dynamic blog posts from Firestore to generate their routes
async function getBlogSlugs() {
  let projectId = 'portfolio-v2-5c9c3'; // default fallback
  try {
    const envText = readFileSync(join(__dirname, '..', '.env'), 'utf-8');
    const match = /VITE_FIREBASE_PROJECT_ID\s*=\s*(.+)/.exec(envText);
    if (match) {
      projectId = match[1].trim().replace(/['"]/g, '');
    }
  } catch (e) {
    // ignore
  }

  const slugs = [];
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/blogs?pageSize=300`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const docs = data.documents || [];
      docs.forEach(doc => {
        const fields = doc.fields;
        const status = fields?.publishing?.mapValue?.fields?.status?.stringValue;
        const slug = fields?.slug?.stringValue;
        if (status === 'published' && slug) {
          slugs.push(slug);
        }
      });
    }
  } catch (err) {
    console.warn('⚠️ Failed to fetch blog slugs for pre-routing:', err.message);
  }
  return slugs;
}

async function main() {
  const blogSlugs = await getBlogSlugs();

  // Create physical directories and copy index.html
  const routesToGenerate = [
    ...STATIC_ROUTES.map(r => r),
    ...blogSlugs.map(slug => `blog/${slug}`)
  ];

  let count = 0;
  routesToGenerate.forEach(route => {
    const targetDir = join(distDir, ...route.split('/'));
    try {
      mkdirSync(targetDir, { recursive: true });
      copyFileSync(join(distDir, 'index.html'), join(targetDir, 'index.html'));
      count++;
    } catch (err) {
      console.error(`Failed to generate route for ${route}:`, err.message);
    }
  });

  // Also copy index.html to 404.html as a catch-all fallback
  try {
    copyFileSync(join(distDir, 'index.html'), join(distDir, '404.html'));
  } catch (err) {
    console.error('Failed to copy 404.html:', err.message);
  }

  console.log(`✓ Generated ${count} physical routes in dist/ for 200 OK SEO indexation.`);
}

main();
