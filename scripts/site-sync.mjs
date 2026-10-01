// Runs in GitHub Actions every 15 min (see .github/workflows/deploy.yml).
//
//   1. Publish due scheduled posts: flips publishing.status 'scheduled' →
//      'published' once publishing.publishAt has passed. Needs the
//      FIREBASE_SERVICE_ACCOUNT secret (service-account JSON); skipped without it.
//   2. Print the content fingerprint of all published posts so the workflow
//      can compare it with the live https://shaguntyagi.tech/content-hash.txt
//      and rebuild only when something visitors see has changed.
//
// No dependencies: plain fetch + node:crypto (runs before `npm ci`).
import { createSign } from 'node:crypto';
import { appendFileSync } from 'node:fs';
import { getContentHash, resolveProjectId } from './firestore-blogs.mjs';

const TZ = 'Asia/Kolkata';
const todayIST = () => new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(new Date());
const b64url = (buf) => Buffer.from(buf).toString('base64url');

async function accessToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(JSON.stringify({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/datastore',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 600,
  }));
  const signer = createSign('RSA-SHA256');
  signer.update(`${header}.${claims}`);
  const jwt = `${header}.${claims}.${b64url(signer.sign(sa.private_key))}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  });
  if (!res.ok) throw new Error(`OAuth token exchange failed: ${res.status} ${await res.text()}`);
  return (await res.json()).access_token;
}

/** UTC ms a scheduled post should go live, or null if it has no valid time. */
export function publishAtMs(publishing = {}) {
  const at = publishing.publishAt?.stringValue;
  if (at) {
    const t = Date.parse(at);
    return Number.isNaN(t) ? null : t;
  }
  // Legacy zone-less datetime-local ("2026-10-05T09:00") — admin runs in IST.
  const raw = publishing.schedulePublish?.stringValue;
  if (raw) {
    const t = Date.parse(/[zZ]|[+-]\d\d:?\d\d$/.test(raw) ? raw : `${raw}+05:30`);
    return Number.isNaN(t) ? null : t;
  }
  return null;
}

async function publishDuePosts(projectId) {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!json) {
    console.log('• FIREBASE_SERVICE_ACCOUNT not set — scheduled posts will not auto-publish.');
    return 0;
  }
  const token = await accessToken(JSON.parse(json));
  const base = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;
  const auth = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const res = await fetch(`${base}:runQuery`, {
    method: 'POST',
    headers: auth,
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: 'blogs' }],
        where: { fieldFilter: { field: { fieldPath: 'publishing.status' }, op: 'EQUAL', value: { stringValue: 'scheduled' } } },
      },
    }),
  });
  if (!res.ok) throw new Error(`Scheduled-post query failed: ${res.status} ${await res.text()}`);

  const now = Date.now();
  const due = (await res.json())
    .map((r) => r.document)
    .filter((d) => d && (publishAtMs(d.fields?.publishing?.mapValue?.fields) ?? Infinity) <= now);

  const today = todayIST();
  for (const doc of due) {
    const mask = ['publishing.status', 'publishing.publishedDate', 'publishing.updatedDate', 'updatedAt']
      .map((p) => `updateMask.fieldPaths=${encodeURIComponent(p)}`).join('&');
    const patch = await fetch(
      // currentDocument.updateTime: don't clobber an edit made since we read it.
      `https://firestore.googleapis.com/v1/${doc.name}?${mask}&currentDocument.updateTime=${encodeURIComponent(doc.updateTime)}`,
      {
        method: 'PATCH',
        headers: auth,
        body: JSON.stringify({
          fields: {
            publishing: { mapValue: { fields: {
              status: { stringValue: 'published' },
              publishedDate: { stringValue: today },
              updatedDate: { stringValue: today },
            } } },
            updatedAt: { timestampValue: new Date().toISOString() },
          },
        }),
      },
    );
    if (!patch.ok) {
      console.error(`✗ Could not publish ${doc.name}: ${patch.status} ${await patch.text()}`);
      continue;
    }
    console.log(`✓ Published scheduled post ${doc.name.split('/').pop()}`);
  }
  return due.length;
}

async function main() {
  const projectId = resolveProjectId();
  if (!projectId) throw new Error('VITE_FIREBASE_PROJECT_ID missing');

  const published = await publishDuePosts(projectId);
  const hash = await getContentHash(); // read AFTER publishing, so new posts count
  if (!hash) throw new Error('Could not read published posts from Firestore');

  console.log(`content hash: ${hash} (${published} scheduled post(s) published this run)`);
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `hash=${hash}\n`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
