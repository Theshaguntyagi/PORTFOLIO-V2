// Generates public/rss.xml from published Firestore blog posts.
// Runs automatically before each build (prebuild), alongside gen-sitemap.mjs.
import { getPublishedPosts } from './firestore-blogs.mjs';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ORIGIN = 'https://shaguntyagi.tech';
const __dirname = dirname(fileURLToPath(import.meta.url));

function escapeXml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function main() {
  const items = [];

  for (const p of await getPublishedPosts()) {
    items.push({
      title: p.rawTitle,
      excerpt: p.excerpt,
      slug: p.slug,
      publishedDate: p.publishedDate || new Date().toISOString().slice(0, 10),
      author: p.author,
    });
  }
  console.log(`✓ Added ${items.length} published posts to rss.xml`);

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

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
