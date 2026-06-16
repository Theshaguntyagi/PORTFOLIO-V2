import { useEffect, useState } from 'react';

const SCRIPT_SRC = 'https://platform.linkedin.com/badges/js/profile.js';

/**
 * Official LinkedIn profile badge. Switches between the dark/light variants
 * with the site theme and re-renders the LinkedIn iframe on change.
 */
export default function LinkedInBadge() {
  const [isDark, setIsDark] = useState(
    typeof document !== 'undefined' && document.body.classList.contains('dark-theme')
  );

  // Track theme (body .dark-theme / .light-theme).
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsDark(document.body.classList.contains('dark-theme'))
    );
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  // Load the LinkedIn badge script once, then (re)render on theme change.
  useEffect(() => {
    if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      const s = document.createElement('script');
      s.src = SCRIPT_SRC;
      s.async = true;
      s.defer = true;
      document.body.appendChild(s);
    } else if (typeof window.LIRenderAll === 'function') {
      window.LIRenderAll();
    }
  }, [isDark]);

  return (
    <div
      key={isDark ? 'dark' : 'light'}
      className="badge-base LI-profile-badge"
      data-locale="en_US"
      data-size="large"
      data-theme={isDark ? 'dark' : 'light'}
      data-type="HORIZONTAL"
      data-vanity="theshaguntyagi"
      data-version="v1"
    >
      <a
        className="badge-base__link LI-simple-link"
        href="https://in.linkedin.com/in/theshaguntyagi?trk=profile-badge"
      >
        Shagun Tyagi
      </a>
    </div>
  );
}
