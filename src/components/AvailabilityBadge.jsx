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
  const [data, setData] = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
        const [{ doc, getDoc }, { db }] = await Promise.all([
          import('firebase/firestore'),
          import('../firebase'),
        ]);
        const s = await getDoc(doc(db, 'settings', 'site'));
        if (s.exists()) setData(s.data());
      } catch (e) {
        console.warn('AvailabilityBadge: fetch settings failed:', e);
      }
    };

    const ric = window.requestIdleCallback || ((cb) => setTimeout(cb, 2000));
    const id = ric(run, { timeout: 4000 });
    return () => (window.cancelIdleCallback || clearTimeout)(id);
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
