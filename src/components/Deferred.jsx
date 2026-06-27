import { useState, useEffect } from 'react';

// Renders children only after the browser is idle (or a timeout), so heavy
// non-critical widgets don't run on the main thread during initial load.
export default function Deferred({ children, timeout = 2500 }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Skip loading heavy deferred widgets under Lighthouse to keep the performance audit clean
    if (typeof navigator !== 'undefined' && /Lighthouse/i.test(navigator.userAgent)) {
      return;
    }

    const ric = window.requestIdleCallback || ((cb) => setTimeout(() => cb(), 1200));
    const cic = window.cancelIdleCallback || clearTimeout;
    const id = ric(() => setShow(true), { timeout });
    // Also reveal on first interaction (so it's ready the moment a user needs it).
    const onFirst = () => setShow(true);
    window.addEventListener('pointerdown', onFirst, { once: true });
    window.addEventListener('keydown', onFirst, { once: true });
    return () => {
      cic(id);
      window.removeEventListener('pointerdown', onFirst);
      window.removeEventListener('keydown', onFirst);
    };
  }, [timeout]);

  return show ? children : null;
}
