// Generates public/rss.xml from published Firestore blog posts.
// Runs automatically before each build (prebuild), alongside gen-sitemap.mjs.
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ORIGIN = 'https://shaguntyagi.tech';
const __dirname = dirname(fileURLToPath(import.meta.url));

function resolveProjectId() {
  try {
    const envText = readFileSync(join(__dirname, '..', '.env'), 'utf-8');
    const match = /VITE_FIREBASE_PROJECT_ID\s*=\s*(.+)/.exec(envText);
    if (match) return match[1].trim().replace(/['"]/g, '');
  } catch (e) {
    // ignore
  }
  return null;
}

function escapeXml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function main() {
  const projectId = resolveProjectId();
  const items = [];

  if (!projectId) {
    console.error('✗ VITE_FIREBASE_PROJECT_ID not found — rss.xml will have zero items.');
  } else {
    try {
      const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/blogs?pageSize=300`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const docs = data.documents || [];
        docs.forEach((doc) => {
          const f = doc.fields || {};
          const status = f?.publishing?.mapValue?.fields?.status?.stringValue;
          const slug = f?.slug?.stringValue;
          if (status !== 'published' || !slug) return;

          const title = f?.title?.stringValue || 'Untitled';
          const excerpt = f?.excerpt?.stringValue || '';
          const publishedDate =
            f?.publishing?.mapValue?.fields?.publishedDate?.stringValue ||
            new Date().toISOString().slice(0, 10);
          const author =
            f?.publishing?.mapValue?.fields?.author?.stringValue || 'Shagun Tyagi';

          items.push({ title, excerpt, slug, publishedDate, author });
        });
        console.log(`✓ Added ${items.length} published posts to rss.xml`);
      } else {
        console.error(`✗ Firestore REST API returned status ${res.status}. rss.xml will have zero items.`);
      }
    } catch (err) {
      console.error('✗ Failed to fetch blog posts for RSS feed:', err.message);
    }
  }

  items.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));

  const rssItems = items.map((post) => {
    const pubDate = new Date(post.publishedDate).toUTCString();
    const link = `${ORIGIN}/blog/${post.slug}`;
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(post.author)}</author>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`;
  }).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Shagun Tyagi — Blog</title>
    <link>${ORIGIN}/blog</link>
    <atom:link href="${ORIGIN}/rss.xml" rel="self" type="application/rss+xml" />
    <description>AI/ML engineering, production systems, and full-stack development notes from Shagun Tyagi.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${rssItems}
  </channel>
</rss>
`;

  const pub = join(__dirname, '..', 'public');
  mkdirSync(pub, { recursive: true });
  writeFileSync(join(pub, 'rss.xml'), rss);
  console.log(`✓ Generated rss.xml (${items.length} items) in public/`);
}

main();
