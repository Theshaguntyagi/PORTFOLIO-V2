import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import './i18n';
import { initAnalytics } from './analytics';

// GA4 (no-op until VITE_GA_ID is set) — see #12.
initAnalytics();

// Service worker (PWA offline shell + push) — PRODUCTION ONLY.
// In dev it would cache Vite's assets cache-first and serve a stale build,
// so here we actively unregister any leftover SW and wipe its caches instead.
if ('serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register(`${import.meta.env.BASE_URL}firebase-messaging-sw.js`)
        .catch((err) => console.warn('SW registration failed:', err));
    });
  } else {
    navigator.serviceWorker.getRegistrations().then((regs) =>
      regs.forEach((r) => r.unregister())
    );
    if (window.caches) {
      caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
    }
  }
}

// basename = Vite base ("/PORTFOLIO-V2/") so clean URLs work on the
// GitHub Pages project subpath. Deep links are restored by the
// 404.html redirect (see public/404.html + the script in index.html).
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);