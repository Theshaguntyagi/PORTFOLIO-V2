import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
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
    getDoc(doc(db, 'settings', 'site'))
      .then((s) => s.exists() && setData(s.data()))
      .catch(() => {});
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
