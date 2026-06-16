import { useRef } from 'react';

/**
 * Wraps a CTA so it gently pulls toward the cursor on hover (magnetic effect).
 * Renders an inline-block span; place a button/link inside.
 */
export default function MagneticButton({ children, strength = 0.35, className }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <span
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ display: 'inline-block', transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)' }}
    >
      {children}
    </span>
  );
}
