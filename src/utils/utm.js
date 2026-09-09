// First-touch UTM capture. Reads utm_* params from the URL on first load of
// a session and stores them in sessionStorage so they survive client-side
// route changes (a SPA router doesn't preserve query strings across
// navigations, so without this, any UTM context from an ad/social link is
// lost the moment the visitor clicks to a second page).
const STORAGE_KEY = 'utm_attribution';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

export function captureUtmParams() {
  try {
    const params = new URLSearchParams(window.location.search);
    const found = {};
    UTM_KEYS.forEach((key) => {
      const val = params.get(key);
      if (val) found[key] = val;
    });
    if (Object.keys(found).length > 0) {
      // First-touch: don't overwrite an existing attribution from earlier
      // in the same session with a later, possibly-organic page load.
      if (!sessionStorage.getItem(STORAGE_KEY)) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
      }
    }
  } catch (e) {
    // sessionStorage unavailable (privacy mode, etc.) — fail silently.
  }
}

export function getUtmAttribution() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}
