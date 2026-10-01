// Blog auto-publish pipeline.
//
//   Admin saves a post ──► rebuildOnBlogChange ──► GitHub repository_dispatch
//                                                   └► .github/workflows/deploy.yml
//                                                      (build + prerender + deploy)
//   Every 15 min: publishScheduledPosts flips due 'scheduled' posts to
//   'published' — that write fires rebuildOnBlogChange like any other edit.
//
// Secrets (set once):
//   firebase functions:secrets:set GITHUB_DEPLOY_TOKEN
//     → fine-grained PAT, repo Theshaguntyagi/PORTFOLIO-V2, "Contents: Read and write"
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { onDocumentWritten } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

const GITHUB_DEPLOY_TOKEN = defineSecret("GITHUB_DEPLOY_TOKEN");
const GITHUB_REPO = "Theshaguntyagi/PORTFOLIO-V2";
const TZ = "Asia/Kolkata";

// Fields visitors bump on every view/like. Changes to these alone must NOT
// trigger a rebuild, or every page view would kick off a deploy.
const VOLATILE_KEYS = new Set(["likes", "views", "updatedAt"]);

const isPublished = (d) => d?.publishing?.status === "published";

// Stable stringify (sorted keys) so key order never fakes a "change".
function stable(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (typeof value.toMillis === "function") return String(value.toMillis()); // Timestamp
  if (Array.isArray(value)) return `[${value.map(stable).join(",")}]`;
  return `{${Object.keys(value).sort().map((k) => `${JSON.stringify(k)}:${stable(value[k])}`).join(",")}}`;
}

function contentFingerprint(d) {
  if (!d) return null;
  const copy = {};
  for (const [k, v] of Object.entries(d)) if (!VOLATILE_KEYS.has(k)) copy[k] = v;
  return stable(copy);
}

/**
 * Pure decision: does this write change what the public site shows?
 * Exported for tests.
 */
function needsRebuild(before, after) {
  // Drafts/scheduled posts that stay unpublished never touch the public site.
  if (!isPublished(before) && !isPublished(after)) return false;
  return contentFingerprint(before) !== contentFingerprint(after);
}

/** Resolve a scheduled post's publish instant (UTC ms) or null. */
function publishAtMs(publishing = {}) {
  if (publishing.publishAt) {
    const t = Date.parse(publishing.publishAt);
    return Number.isNaN(t) ? null : t;
  }
  // Legacy: datetime-local string with no zone ("2026-10-05T09:00") — the
  // admin always runs in IST, so read it as IST rather than server UTC.
  if (publishing.schedulePublish) {
    const raw = publishing.schedulePublish;
    const t = Date.parse(/[zZ]|[+-]\d\d:?\d\d$/.test(raw) ? raw : `${raw}+05:30`);
    return Number.isNaN(t) ? null : t;
  }
  return null;
}

const todayIST = () => new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date()); // YYYY-MM-DD

exports.rebuildOnBlogChange = onDocumentWritten(
  { document: "blogs/{postId}", secrets: [GITHUB_DEPLOY_TOKEN], retry: false },
  async (event) => {
    const before = event.data?.before?.exists ? event.data.before.data() : null;
    const after = event.data?.after?.exists ? event.data.after.data() : null;
    if (!needsRebuild(before, after)) return;

    const postId = event.params.postId;
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/dispatches`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_DEPLOY_TOKEN.value()}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "shaguntyagi-portfolio-functions",
      },
      body: JSON.stringify({
        event_type: "blog-changed",
        client_payload: { postId, slug: after?.slug || before?.slug || null },
      }),
    });
    if (res.status !== 204) {
      // Not retried: the daily scheduled build in deploy.yml is the backstop.
      logger.error("GitHub dispatch failed", { status: res.status, body: await res.text(), postId });
      return;
    }
    logger.info("Site rebuild dispatched", { postId, slug: after?.slug });
  },
);

exports.publishScheduledPosts = onSchedule(
  { schedule: "every 15 minutes", timeZone: TZ, retryCount: 0 },
  async () => {
    const db = admin.firestore();
    // Single-field equality query → no composite index needed; the time
    // comparison happens here (a handful of docs at most).
    const snap = await db.collection("blogs").where("publishing.status", "==", "scheduled").get();
    const now = Date.now();
    const due = snap.docs.filter((d) => {
      const t = publishAtMs(d.get("publishing"));
      return t !== null && t <= now;
    });
    if (!due.length) return;

    const batch = db.batch();
    for (const d of due) {
      batch.update(d.ref, {
        "publishing.status": "published",
        "publishing.publishedDate": todayIST(),
        "publishing.updatedDate": todayIST(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
    await batch.commit();
    // Each update fires rebuildOnBlogChange; the workflow's concurrency group
    // collapses simultaneous dispatches into one deploy.
    logger.info("Published scheduled posts", { ids: due.map((d) => d.id) });
  },
);

exports._test = { needsRebuild, publishAtMs };
