/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

const p1 = "AIzaSyAcZjqZyx0";
const p2 = "1Xx2bG07wKDvIkNfU_8U0rIA";
firebase.initializeApp({
  apiKey: p1 + p2,
  authDomain: "portfolio-v2-ab683.firebaseapp.com",
  projectId: "portfolio-v2-ab683",
  storageBucket: "portfolio-v2-ab683.firebasestorage.app",
  messagingSenderId: "253075401915",
  appId: "1:253075401915:web:4944ec6b0a70f1a1b20d9e"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('🔔 Background message received:', payload);
});

/* ---- PWA offline shell (so the app is installable) ---- */
const CACHE = 'portfolio-shell-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || !req.url.startsWith(self.location.origin)) return;

  // Network-first for page navigations (avoids stale HTML), fall back to cache.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() =>
        caches.match(req).then((r) => r || caches.match(self.registration.scope + 'index.html'))
      )
    );
    return;
  }

  // Cache-first for hashed static assets.
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(req);
      if (cached) return cached;
      try {
        const res = await fetch(req);
        if (res && res.status === 200) cache.put(req, res.clone());
        return res;
      } catch {
        return cached || Response.error();
      }
    })
  );
});
