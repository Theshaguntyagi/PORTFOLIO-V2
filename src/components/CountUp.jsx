import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/**
 * Animates a number from 0 to its target when scrolled into view.
 * Accepts values like "6+", "1+", "500", "$1,500" — keeps prefix/suffix.
 */
export default function CountUp({ value, duration = 1400, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  const match = String(value).match(/^([^\d]*)([\d,]+)(.*)$/);
  const prefix = match ? match[1] : '';
  const target = match ? parseInt(match[2].replace(/,/g, ''), 10) : NaN;
  const suffix = match ? match[3] : '';

  useEffect(() => {
    if (!inView || Number.isNaN(target) || reduce) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, reduce]);

  // Non-numeric values render as-is.
  if (Number.isNaN(target)) return <span className={className}>{value}</span>;

  // Reduced motion (or before animation) shows the final number directly.
  const shown = reduce ? target : display;

  return (
    <span ref={ref} className={className}>
      {prefix}{shown.toLocaleString()}{suffix}
    </span>
  );
}
