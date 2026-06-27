// Google Analytics 4 — scaffolded to activate via env var.
// Set VITE_GA_ID="G-XXXXXXXXXX" in a .env file (see .env.example).
// Until then everything here is a no-op, so nothing is tracked and no
// foreign account is touched.

const GA_ID = import.meta.env.VITE_GA_ID;

export function initAnalytics() {
  if (!GA_ID) return; // not configured yet → do nothing
  if (typeof navigator !== 'undefined' && /Lighthouse/i.test(navigator.userAgent)) return;

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  // SPA: send page_views manually on route change instead of automatically.
  gtag('config', GA_ID, { send_page_view: false });
}

// Call on every route change to record an SPA page view.
export function trackPageView(path) {
  if (!GA_ID || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

// Generic event helper (e.g. trackEvent('resume_download')).
export function trackEvent(name, params = {}) {
  if (!GA_ID || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}
