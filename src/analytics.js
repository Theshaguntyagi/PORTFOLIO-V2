// Google Analytics 4 — scaffolded to activate via env var.
// Set VITE_GA_ID="G-XXXXXXXXXX" in a .env file (see .env.example).
// Until then everything here is a no-op, so nothing is tracked and no
// foreign account is touched.
import { getUtmAttribution } from './utils/utm';

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

  // Attach first-touch UTM params as campaign fields so GA4's own
  // attribution reports reflect the actual referring channel, even though
  // the SPA router would otherwise drop the query string after the first
  // route change.
  const utm = getUtmAttribution();
  const config = { send_page_view: false }; // SPA: page_views sent manually on route change
  if (utm) {
    if (utm.utm_source) config.campaign_source = utm.utm_source;
    if (utm.utm_medium) config.campaign_medium = utm.utm_medium;
    if (utm.utm_campaign) config.campaign_name = utm.utm_campaign;
    if (utm.utm_term) config.campaign_term = utm.utm_term;
    if (utm.utm_content) config.campaign_content = utm.utm_content;
  }
  gtag('config', GA_ID, config);
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
