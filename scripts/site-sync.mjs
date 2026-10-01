// Runs in GitHub Actions every 15 min (see .github/workflows/deploy.yml).
//
// Prints the content fingerprint of all published blog posts so the workflow
// can compare it with the live https://shaguntyagi.tech/content-hash.txt and
// rebuild only when something visitors see has changed (a post published,
// edited or unpublished in /admin).
//
// No dependencies: plain fetch + node:crypto (runs before `npm ci`).
import { appendFileSync } from 'node:fs';
import { getContentHash, resolveProjectId } from './firestore-blogs.mjs';

async function main() {
  if (!resolveProjectId()) throw new Error('VITE_FIREBASE_PROJECT_ID missing');
  const hash = await getContentHash();
  if (!hash) throw new Error('Could not read published posts from Firestore');

  console.log(`content hash: ${hash}`);
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `hash=${hash}\n`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
