// Shared build-time reader for published blog posts (Firestore REST API).
// Used by gen-sitemap.mjs and postbuild.mjs so both agree on the exact same
// set of posts and fields. No SDK: plain fetch against the public REST API,
// which is what the security rules already allow for published posts.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function resolveProjectId() {
  if (process.env.VITE_FIREBASE_PROJECT_ID) return process.env.VITE_FIREBASE_PROJECT_ID.trim();
  try {
    const envText = readFileSync(join(__dirname, '..', '.env'), 'utf-8');
    const match = /VITE_FIREBASE_PROJECT_ID\s*=\s*(.+)/.exec(envText);
    if (match) return match[1].trim().replace(/['"]/g, '');
  } catch {
    // .env missing — caller logs.
  }
  return null;
}

// Firestore REST values are typed wrappers ({stringValue}, {mapValue:{fields}}…).
function unwrap(v) {
  if (!v) return undefined;
  if ('stringValue' in v) return v.stringValue;
  if ('timestampValue' in v) return v.timestampValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('booleanValue' in v) return v.booleanValue;
  if ('mapValue' in v) {
    const out = {};
    for (const [k, inner] of Object.entries(v.mapValue.fields || {})) out[k] = unwrap(inner);
    return out;
  }
  return undefined;
}

let cache = null;

// In CI (STRICT_BLOGS=1) a failed fetch must fail the build — otherwise an
// outage would silently deploy a site with every blog page and sitemap entry
// missing. Locally we only warn.
function fail(msg) {
  if (process.env.STRICT_BLOGS === '1') throw new Error(msg);
  console.error(`✗ ${msg} — blog posts will be skipped.`);
}

/**
 * Published posts via Firestore runQuery. Must filter server-side: the
 * security rules only let anonymous clients read published posts, so an
 * unfiltered list request is rejected outright.
 * @returns {Promise<Array<{slug,title,desc,excerpt,image,lastmod,publishedDate,author}>>}
 */
export async function getPublishedPosts() {
  if (cache) return cache;
  const projectId = resolveProjectId();
  if (!projectId) {
    fail('VITE_FIREBASE_PROJECT_ID not found (.env or env var)');
    return (cache = []);
  }

  const posts = [];
  try {
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          structuredQuery: {
            from: [{ collectionId: 'blogs' }],
            where: {
              fieldFilter: {
                field: { fieldPath: 'publishing.status' },
                op: 'EQUAL',
                value: { stringValue: 'published' },
              },
            },
          },
        }),
      },
    );
    if (!res.ok) {
      fail(`Firestore runQuery returned ${res.status} for "${projectId}"`);
      return (cache = []);
    }
    const rows = await res.json();
    for (const row of rows) {
      if (!row.document) continue; // runQuery emits a bare {readTime} row when empty
      const doc = row.document;
      const f = unwrap({ mapValue: { fields: doc.fields || {} } });
      if (!f.slug) continue;
      const image = typeof f.imageUrl === 'string' && /^https?:\/\//.test(f.imageUrl) ? f.imageUrl : null;
      const ts = f.updatedAt || f.createdAt || doc.updateTime || null;
      posts.push({
        slug: f.slug,
        title: f.seo?.metaTitle || f.title || 'Article | Shagun Tyagi',
        rawTitle: f.title || 'Untitled',
        desc: f.seo?.metaDescription || f.excerpt || '',
        excerpt: f.excerpt || '',
        image,
        lastmod: ts ? String(ts).slice(0, 10) : null,
        publishedDate: f.publishing?.publishedDate || (ts ? String(ts).slice(0, 10) : null),
        author: f.publishing?.author || 'Shagun Tyagi',
      });
    }
  } catch (err) {
    fail(`Failed to fetch blog posts: ${err.message}`);
  }
  return (cache = posts);
}
