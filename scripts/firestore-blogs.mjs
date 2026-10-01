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

/**
 * @returns {Promise<Array<{slug:string,title:string,desc:string,image:string|null,lastmod:string|null}>>}
 */
export async function getPublishedPosts() {
  if (cache) return cache;
  const projectId = resolveProjectId();
  if (!projectId) {
    console.error('✗ VITE_FIREBASE_PROJECT_ID not found (.env or env var) — blog posts will be skipped.');
    return (cache = []);
  }

  const posts = [];
  let pageToken = '';
  try {
    do {
      const url =
        `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/blogs?pageSize=300` +
        (pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : '');
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`✗ Firestore REST returned ${res.status} for "${projectId}" — blog posts will be skipped.`);
        break;
      }
      const data = await res.json();
      for (const doc of data.documents || []) {
        const f = unwrap({ mapValue: { fields: doc.fields || {} } });
        if (f.publishing?.status !== 'published' || !f.slug) continue;
        const image = typeof f.imageUrl === 'string' && /^https?:\/\//.test(f.imageUrl) ? f.imageUrl : null;
        const ts = f.updatedAt || f.createdAt || doc.updateTime || null;
        posts.push({
          slug: f.slug,
          title: f.seo?.metaTitle || f.title || 'Article | Shagun Tyagi',
          desc: f.seo?.metaDescription || f.excerpt || '',
          image,
          lastmod: ts ? String(ts).slice(0, 10) : null,
        });
      }
      pageToken = data.nextPageToken || '';
    } while (pageToken);
  } catch (err) {
    console.error('✗ Failed to fetch blog posts:', err.message);
  }
  return (cache = posts);
}
