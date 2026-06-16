# 🔥 Firebase Setup — Complete Guide

This portfolio uses Firebase for **5 things**:

| Feature | Firebase service | Used by |
|---|---|---|
| Contact form, newsletter, blog posts/likes/views | **Firestore** | Contact, Newsletter, Blog, Admin |
| Blog admin login | **Authentication** (Google) | `/admin` |
| Push notifications | **Cloud Messaging (FCM)** | Layout (asks permission) |
| AI chatbot | **Cloud Functions** + OpenAI | ChatWidget |
| (web SDK config) | Firebase web app | `src/firebase.js`, `public/firebase-messaging-sw.js` |

Right now everything points at a **foreign project** (`web-app-5da25`) you can't
manage. These steps move it all to **your own** project.

> ⏱️ ~20–30 min. Steps 1–4 are free. Step 6 (chatbot) needs the Blaze plan.

---

## Prerequisites
```bash
npm install -g firebase-tools
firebase login
```

---

## Step 1 — Create your Firebase project
1. Go to <https://console.firebase.google.com> → **Add project**.
2. Name it (e.g. `shagun-portfolio`), accept defaults, create.

## Step 2 — Register a Web App & get the config
1. In the project, click the **`</>` (Web)** icon → register an app
   (nickname e.g. `portfolio-web`). **Don't** enable Hosting (you're on GitHub Pages).
2. Copy the `firebaseConfig` values it shows. You'll need:
   `apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId`.

### 2a. Put them in `.env` (frontend reads these)
Open `.env` (already in the repo, gitignored) and fill:
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

### 2b. ⚠️ Also edit the service worker (it CAN'T read `.env`)
`public/firebase-messaging-sw.js` has a **hardcoded** copy of the config at the
top. Replace the `firebase.initializeApp({...})` values there with the SAME
config from step 2. (This file is served as-is, so env vars don't apply.)

### 2c. Point the CLI at your project
```bash
firebase use --add        # pick your project, alias it "default"
```
This rewrites `.firebaserc` (replaces the `YOUR_FIREBASE_PROJECT_ID` placeholder).

---

## Step 3 — Firestore (database)
1. Console → **Build → Firestore Database → Create database**.
2. Start in **production mode**, pick a region close to you (e.g. `asia-south1`
   for India). Create.
3. Deploy the security rules included in this repo (`firestore.rules`):
   ```bash
   firebase deploy --only firestore:rules
   ```
   (Or paste the contents of `firestore.rules` into Console → Firestore → **Rules** → Publish.)

These rules: blogs are public-read/owner-write (visitors can only bump
likes/views); contact + newsletter are write-only for the public, owner-read;
notification tokens are create+read. **Owner = the email in `firestore.rules`
and `src/firebase.js` (`OWNER_EMAIL`)** — change both if you use a different
Google account.

> The required collections (`blogs`, `contacts`, `newsletter`,
> `notificationSubscribers`) are created automatically on first write — you
> don't need to make them by hand.

---

## Step 4 — Authentication (for the `/admin` blog editor)
1. Console → **Build → Authentication → Get started**.
2. **Sign-in method** tab → enable **Google** → set a support email → Save.
3. **Settings → Authorized domains** → add:
   - `theshaguntyagi.github.io`
   - `localhost` (usually already there)
4. Make sure `OWNER_EMAIL` in `src/firebase.js` (and the email in
   `firestore.rules`) is the Google account you'll sign in with. Only that
   account can create/delete blog posts.

---

## Step 5 — Cloud Messaging (push notifications) *(optional)*
1. Console → **Project settings (gear) → Cloud Messaging** tab.
2. Under **Web Push certificates**, click **Generate key pair**.
3. Copy the **key pair** value → put it in `.env`:
   ```
   VITE_FIREBASE_VAPID_KEY=BPxxx...
   ```
4. To actually broadcast a notification, deploy functions (Step 6) and call the
   `sendNotificationToAll` function (it reads tokens from `notificationSubscribers`).
   You can skip this whole step if you don't want push notifications.

---

## Step 6 — Cloud Functions (the AI chatbot)
Needs the **Blaze (pay-as-you-go)** plan — functions can't make outbound calls
to OpenAI on the free Spark plan. Blaze keeps a generous free tier; you pay only
for OpenAI usage.

1. Console → upgrade the project to **Blaze** (gear → Usage and billing).
2. Get an [OpenAI API key](https://platform.openai.com/api-keys).
3. Install + set the secret + deploy:
   ```bash
   cd functions && npm install && cd ..
   firebase functions:secrets:set OPENAI_API_KEY    # paste your sk-... key
   firebase deploy --only functions
   ```
4. Copy the **`chat` URL** the deploy prints (v2 form:
   `https://chat-abc123-uc.a.run.app`) into `.env`:
   ```
   VITE_CHAT_API_URL=https://chat-abc123-uc.a.run.app
   ```

> Full chatbot details + hardening (spend cap, App Check) are in
> **`CHATBOT_SETUP.md`**.

---

## Step 7 — Build & deploy the site
```bash
npm run build       # picks up the new .env values
npm run deploy      # publishes dist/ to GitHub Pages (gh-pages)
```
> `.env` is baked into the build, so **rebuild** after any change to it.

---

## Step 8 — Verify
- **Contact form**: submit a test message → it should appear in Console →
  Firestore → `contacts`.
- **Newsletter**: enter an email in the footer → appears in `newsletter`.
- **Admin**: visit `/admin`, sign in with the owner Google account → you can
  add/delete a blog post (appears in `blogs`).
- **Chatbot**: click the chat bubble, ask "What are Shagun's skills?" → a
  grounded answer (if it says *"isn't connected yet"*, `VITE_CHAT_API_URL` is
  empty; *"trouble connecting"* → check `firebase functions:log`).
- **Push** (if set up): allow notifications → a token row appears in
  `notificationSubscribers`.

---

## What you must NOT commit
`.env` is gitignored (good — it holds your config). The web `firebaseConfig`
values (apiKey etc.) are **not secret** — they're meant to be public and are
protected by your Firestore rules + Authorized domains. The **OpenAI key is the
only true secret**, and it lives server-side as a Firebase secret (never in the
repo or the browser).

## Quick reference — where each value goes
| Value | `.env` (`VITE_*`) | `public/firebase-messaging-sw.js` | `.firebaserc` |
|---|:--:|:--:|:--:|
| Web config (apiKey, projectId, …) | ✅ | ✅ (hardcoded) | — |
| VAPID key | ✅ | — | — |
| `chat` function URL | ✅ | — | — |
| Project id (for CLI) | — | — | ✅ (`firebase use --add`) |
| OpenAI key | ❌ secret → `firebase functions:secrets:set` | — | — |
