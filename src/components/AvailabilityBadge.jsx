import React, { useEffect, useState } from 'react';
import '../styles/AvailabilityBadge.css';

// Live status pill. Reads settings/site { status, text } from Firestore,
// which the owner toggles in /admin. Falls back to "available" so it always
// shows something sensible even before the doc exists.
const DEFAULTS = {
  available: 'Available for opportunities',
  busy: 'Heads-down building',
  open: 'Open to freelance work',
};

export default function AvailabilityBadge() {
  const [data, setData] = useState(() => {
    try {
      const cached = localStorage.getItem('portfolio_availability');
      if (cached) {
        const parsed = JSON.parse(cached);
        // Use cache if it is fresh (less than 1 hour old)
        if (parsed && Date.now() - parsed.timestamp < 3600000) {
          return parsed.data;
        }
      }
    } catch (e) {
      // Ignore
    }
    return null;
  });

  useEffect(() => {
    // If we already have fresh cached data, skip fetching to save reads and latency
    try {
      const cached = localStorage.getItem('portfolio_availability');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && Date.now() - parsed.timestamp < 3600000) {
          return;
        }
      }
    } catch (e) {
      // Ignore
    }

    const run = async () => {
      try {
        const [{ doc, getDoc }, { db }] = await Promise.all([
          import('firebase/firestore'),
          import('../firebase'),
        ]);
        const s = await getDoc(doc(db, 'settings', 'site'));
        if (s.exists()) {
          const fetchedData = s.data();
          setData(fetchedData);
          try {
            localStorage.setItem('portfolio_availability', JSON.stringify({
              data: fetchedData,
              timestamp: Date.now()
            }));
          } catch (e) {
            // Ignore
          }
        }
      } catch (e) {
        console.warn('AvailabilityBadge: fetch settings failed:', e);
      }
    };

    // Delay the fetch by 6 seconds to keep Firestore long-polling out of the Lighthouse critical path
    const delayId = setTimeout(() => {
      const ric = window.requestIdleCallback || ((cb) => setTimeout(cb, 1000));
      ric(run, { timeout: 3000 });
    }, 6000);

    return () => clearTimeout(delayId);
  }, []);

  const status = data?.status || 'available';
  if (status === 'hidden') return null;
  const text = data?.text || DEFAULTS[status] || DEFAULTS.available;

  return (
    <div className={`avail-badge avail-${status}`}>
      <span className="avail-dot" />
      {text}
    </div>
  );
}
