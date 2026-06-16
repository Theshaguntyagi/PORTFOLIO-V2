import { useRef } from 'react';

/**
 * 3D tilt-on-hover wrapper. Pass through className/style so it can BE the card
 * (keeps grid layout intact). Inline transform overrides only `transform`.
 */
export default function Tilt({ children, className, style, max = 7 }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ transition: 'transform 0.25s ease', transformStyle: 'preserve-3d', ...style }}
    >
      {children}
    </div>
  );
}
