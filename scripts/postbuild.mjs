// Post-build static prerender of <head> metadata.
//
// Why: the app is a SPA, so before this every route (/about, /blog/x, …) got a
// byte-identical copy of index.html — same <title>, same description and a
// canonical pointing at "/". Crawlers that don't run JS (and every social
// preview scraper: LinkedIn, WhatsApp, X, Slack, Instagram DMs) saw 16+
// duplicates of the homepage, and Google was told each page IS the homepage.
//
// Now each route gets its own physical index.html with its own title,
// description, canonical, OG/Twitter tags and noscript fallback. React +
// Helmet still take over at runtime exactly as before.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { getSeoMeta } from '../src/data/seoMeta.js';
import { getContentHash, getPublishedPosts } from './firestore-blogs.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const ORIGIN = 'https://shaguntyagi.tech';
const DEFAULT_IMAGE = `${ORIGIN}/og-image.jpg`;

const STATIC_ROUTES = [
  'about', 'experience', 'projects', 'blog', 'contact', 'testimonials', 'now',
  'uses', 'guestbook', 'analytics', 'colophon', 'links', 'press', 'speaking',
  'changelog', 'start-here',
];

// Utility/dashboard pages that shouldn't compete in search results.
const NOINDEX = new Set(['analytics']);

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Replace one tag's attribute value; throw if the template drifted so a broken
// prerender fails the build instead of silently shipping duplicates again.
function setAttr(html, tagPattern, attr, value) {
  const re = new RegExp(`(${tagPattern}[^>]*?\\s${attr}=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`postbuild: tag not found in index.html: ${tagPattern}`);
  return html.replace(re, `$1${esc(value)}$2`);
}

function render(template, { path, title, desc, image = DEFAULT_IMAGE, type = 'website', noindex = false }) {
  const url = ORIGIN + (path === '/' ? '/' : path);
  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  html = setAttr(html, '<meta name="description"', 'content', desc);
  html = setAttr(html, '<meta name="robots"', 'content', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
  html = setAttr(html, '<link rel="canonical"', 'href', url);
  html = setAttr(html, '<meta property="og:type"', 'content', type);
  html = setAttr(html, '<meta property="og:title"', 'content', title);
  html = setAttr(html, '<meta property="og:description"', 'content', desc);
  html = setAttr(html, '<meta property="og:url"', 'content', url);
  html = setAttr(html, '<meta property="og:image"', 'content', image);
  html = setAttr(html, '<meta name="twitter:title"', 'content', title);
  html = setAttr(html, '<meta name="twitter:description"', 'content', desc);
  html = setAttr(html, '<meta name="twitter:image"', 'content', image);
  // A custom post image has unknown dimensions — drop the 1200x630 hints
  // rather than lie about them.
  if (image !== DEFAULT_IMAGE) {
    html = html.replace(/\s*<meta property="og:image:(width|height)"[^>]*>/g, '');
  }
  // Route-specific noscript fallback (marked in index.html).
  html = html.replace(
    /<!--route-fallback-->[\s\S]*?<!--\/route-fallback-->/,
    `<!--route-fallback--><h1>${esc(title)}</h1>\n    <p>${esc(desc)}</p><!--/route-fallback-->`,
  );
  return html;
}

function write(route, html) {
  const dir = route ? join(distDir, ...route.split('/')) : distDir;
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
}

async function main() {
  const template = readFileSync(join(distDir, 'index.html'), 'utf-8');
  if (!template.includes('<!--route-fallback-->')) {
    throw new Error('postbuild: <!--route-fallback--> marker missing from index.html');
  }

  // Keep the untouched SPA shell as the 404 fallback (paired with public/404.html redirect).
  writeFileSync(join(distDir, '404.html'), template);

  let count = 0;
  const home = getSeoMeta('/');
  write('', render(template, { path: '/', title: home.title, desc: home.desc }));
  count++;

  for (const route of STATIC_ROUTES) {
    const meta = getSeoMeta(`/${route}`);
    write(route, render(template, { path: `/${route}`, title: meta.title, desc: meta.desc, noindex: NOINDEX.has(route) }));
    count++;
  }

  const posts = await getPublishedPosts();
  // Content fingerprint for the scheduled "did anything change?" check in deploy.yml.
  const hash = await getContentHash();
  if (hash) writeFileSync(join(distDir, 'content-hash.txt'), `${hash}\n`);
  for (const p of posts) {
    write(`blog/${p.slug}`, render(template, {
      path: `/blog/${p.slug}`,
      title: p.title,
      desc: p.desc || getSeoMeta('/blog/x').desc,
      image: p.image || DEFAULT_IMAGE,
      type: 'article',
    }));
    count++;
  }

  console.log(`✓ Prerendered unique <head> for ${count} routes (${posts.length} blog posts).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
