# 🤖 Chatbot Setup — OpenAI deploy

The chat widget talks to a Firebase **Cloud Function** (`chat`) that proxies to
OpenAI. Your OpenAI key stays **server-side** as a Firebase secret — it is never
shipped to the browser. The widget shows *"isn't connected yet"* until the
function is deployed and `VITE_CHAT_API_URL` is set.

The code is ready. You only need to do the steps below (they require **your**
billing + login, which I can't do for you).

---

## Prerequisites
- A [Firebase](https://console.firebase.google.com) project on the **Blaze**
  (pay-as-you-go) plan — Functions need billing to make outbound calls to OpenAI.
  (Blaze still has a generous free tier; the chatbot's cost is your OpenAI usage.)
- An [OpenAI API key](https://platform.openai.com/api-keys).
- Firebase CLI: `npm install -g firebase-tools` then `firebase login`.

---

## Steps

### 1. Point the repo at YOUR Firebase project
`.firebaserc` currently has a placeholder. Set your real project id:

```bash
firebase use --add
# pick your project, give it the alias "default"
```
(This rewrites `.firebaserc` → replaces `YOUR_FIREBASE_PROJECT_ID`.)

### 2. Install function dependencies
```bash
cd functions
npm install
cd ..
```

### 3. Store your OpenAI key as a secret (never in code)
```bash
firebase functions:secrets:set OPENAI_API_KEY
# paste your sk-... key when prompted
```

### 4. Deploy the function
```bash
firebase deploy --only functions
```
Copy the **exact URL** it prints for `chat` — v2 looks like
`https://chat-abc123-uc.a.run.app` (NOT the old `…cloudfunctions.net/chat`).

### 5. Wire the frontend to it
Open `.env` (already created for you) and paste the URL:
```
VITE_CHAT_API_URL=https://chat-abc123-uc.a.run.app
```
Then rebuild / restart:
```bash
npm run dev      # local test
# or
npm run build && npm run deploy   # publish to GitHub Pages
```

Open the site, click the chat bubble, and ask *"What are Shagun's skills?"* —
you should get a grounded answer.

---

## Hardening (do at least #1 before going public)
The `chat` function is a public, unauthenticated OpenAI proxy. Anyone with the
URL can spend your OpenAI credits. Already built in: a CORS allowlist
(`theshaguntyagi.github.io` + localhost) and a light 15-req/min/IP rate limit.
**Still add:**
1. A **hard monthly spend limit** in your OpenAI dashboard (Billing → Limits).
2. (Recommended) **Firebase App Check** to block calls not coming from your site.

If you move to a custom domain, add it to `ALLOWED_ORIGINS` in
`functions/index.js` and to `VITE_CHAT_API_URL`'s CORS.

---

## Troubleshooting
| Symptom | Cause / fix |
|---|---|
| *"isn't connected yet"* | `VITE_CHAT_API_URL` is empty — set it (step 5) and restart. |
| *"trouble connecting"* | Function deployed but erroring — check `firebase functions:log`. Usually a missing `OPENAI_API_KEY` secret (step 3) or no Blaze billing. |
| CORS error in console | Your site's origin isn't in `ALLOWED_ORIGINS` (`functions/index.js`). Add it and redeploy. |
| 429 responses | Rate limit hit (15/min/IP) — expected under spam; raise `RATE.max` if needed. |

> Note: I removed the unused `analyzeResume` ("AI Match") endpoint since its
> page was removed earlier. The same file also has `sendNotificationToAll`
> (push notifications) which deploys alongside `chat` — harmless if unused.
