import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (!glowRef.current) return;

      glowRef.current.style.background = `radial-gradient(
        600px at ${e.clientX}px ${e.clientY}px,
        rgba(100,180,255,0.15),
        transparent 80%
      )`;
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 5,
      }}
    />
  );
}