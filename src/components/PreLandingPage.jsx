import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Download, ArrowRight } from "lucide-react";
import BoxLoader from "../components/BoxLoader";
import "../styles/PreLanding.css";

const TAGS = ["React", "Node.js", "AWS", "IoT", "TypeScript"];

const SOCIAL_LINKS = [
  { icon: Github,   href: "https://github.com/yourusername",   label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
  { icon: Twitter,  href: "https://twitter.com/yourusername",  label: "Twitter" },
];

const PreLandingPage = ({ onEnter }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase]         = useState(0);
  const [count, setCount]         = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [mousePos, setMousePos]   = useState({ x: 0, y: 0 });

  const canvasRef    = useRef(null);
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const triggeredRef = useRef(false);
  const particlesRef = useRef([]);
  const mousePosRef  = useRef({ x: 0, y: 0 });

  // Loading gate
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  // Staggered reveal
  useEffect(() => {
    if (isLoading) return;
    const delays = [100, 600, 1000, 1400, 1800, 2400];
    const timers = delays.map((d, i) =>
      setTimeout(() => setPhase(i + 1), d)
    );
    return () => timers.forEach(clearTimeout);
  }, [isLoading]);

  // Counter animation
  useEffect(() => {
    if (phase < 6) return;
    let n = 0;
    const target = 24;
    const iv = setInterval(() => {
      n = Math.min(n + 1, target);
      setCount(n);
      if (n >= target) clearInterval(iv);
    }, 80);
    return () => clearInterval(iv);
  }, [phase]);

  // Trigger exit animation then notify parent
  const triggerEnter = useCallback(() => {
    if (triggeredRef.current) return;
    triggeredRef.current = true;
    setIsExiting(true);
    // Give exit animation time to complete before parent unmounts
    setTimeout(() => onEnter(), 1000);
  }, [onEnter]);

  // Scroll / touch / key triggers
  useEffect(() => {
    if (isLoading) return;
    const onWheel = (e) => { if (Math.abs(e.deltaY) > 25) triggerEnter(); };
    const onKey   = (e) => { if (["ArrowDown", "Space", "Enter"].includes(e.code)) triggerEnter(); };
    let startY = 0;
    const onTouchStart = (e) => { startY = e.touches[0].clientY; };
    const onTouchEnd   = (e) => { if (startY - e.changedTouches[0].clientY > 40) triggerEnter(); };

    window.addEventListener("wheel",      onWheel,       { passive: true });
    window.addEventListener("keydown",    onKey);
    window.addEventListener("touchstart", onTouchStart,  { passive: true });
    window.addEventListener("touchend",   onTouchEnd,    { passive: true });
    return () => {
      window.removeEventListener("wheel",      onWheel);
      window.removeEventListener("keydown",    onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend",   onTouchEnd);
    };
  }, [isLoading, triggerEnter]);

  // Particle canvas
  useEffect(() => {
    if (isLoading) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let W, H;

    const resize = () => {
      W = canvas.width  = containerRef.current.offsetWidth;
      H = canvas.height = containerRef.current.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.r = Math.random() * 1.4 + 0.4;
        this.alpha = Math.random() * 0.55 + 0.1;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.life = 0;
        this.maxLife = Math.random() * 300 + 200;
      }
      update() {
        this.x += this.vx; this.y += this.vy; this.life++;
        if (this.life > this.maxLife || this.x < 0 || this.x > W || this.y < 0 || this.y > H)
          this.reset();
      }
      draw() {
        const t = this.life / this.maxLife;
        const a = this.alpha * (t < 0.1 ? t / 0.1 : t > 0.9 ? (1 - t) / 0.1 : 1);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,180,255,${a})`;
        ctx.fill();
      }
    }

    particlesRef.current = Array.from({ length: 90 }, () => new Particle());

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my } = mousePosRef.current;

      particlesRef.current.forEach((p) => { p.update(); p.draw(); });

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i], b = particlesRef.current[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 80) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(100,180,255,${0.07 * (1 - d / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        const p = particlesRef.current[i];
        const dm = Math.hypot(p.x - mx, p.y - my);
        if (dm < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(100,180,255,${0.18 * (1 - dm / 130)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [isLoading]);

  const handleMouseMove = (e) => {
    const r = containerRef.current.getBoundingClientRect();
    const pos = { x: e.clientX - r.left, y: e.clientY - r.top };
    mousePosRef.current = pos;
    setMousePos(pos);
  };

  if (isLoading) return <BoxLoader onComplete={() => setIsLoading(false)} />;

  return (
    <motion.div
      className="pl-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      // Entry animation
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }}
      // Exit animation — slides up, fades, blurs
      exit={{
        opacity: 0,
        y: -80,
        scale: 0.96,
        filter: "blur(12px)",
        transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      <canvas ref={canvasRef} className="pl-canvas" />
      <div className="pl-grid" />
      <div className="pl-orb pl-orb-1" />
      <div className="pl-orb pl-orb-2" />

      {/* Social sidebar */}
      <aside className={`pl-socials ${phase >= 6 ? "pl-fade-in" : ""}`}>
        {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer"
            className="pl-social-link" aria-label={label}>
            <Icon size={15} />
          </a>
        ))}
        <div className="pl-social-line" />
      </aside>

      {/* Counter */}
      <div className={`pl-counter ${phase >= 6 ? "pl-fade-in" : ""}`}>
        <span className="pl-counter-num">{count}+</span>
        <span className="pl-counter-label">projects</span>
      </div>

      {/* Main content */}
      <main className="pl-center">
        <div className={`pl-pill ${phase >= 1 ? "pl-reveal" : ""}`}>
          <span className="pl-dot" />
          Available for opportunities
        </div>

        <h1 className={`pl-name ${phase >= 2 ? "pl-reveal" : ""}`}>
          Shagun <span className="pl-name-outline">Tyagi</span>
        </h1>

        <p className={`pl-role ${phase >= 3 ? "pl-reveal" : ""}`}>
          Full Stack &nbsp;·&nbsp; Cloud &nbsp;·&nbsp; IoT
        </p>

        <div className={`pl-tags ${phase >= 4 ? "pl-reveal" : ""}`}>
          {TAGS.map((tag) => (
            <span key={tag} className="pl-tag">{tag}</span>
          ))}
        </div>

        <div className={`pl-cta ${phase >= 5 ? "pl-reveal" : ""}`}>
          <button className="pl-btn-primary" onClick={triggerEnter}>
            View my work <ArrowRight size={15} />
          </button>
          <a href="/resume.pdf" download className="pl-btn-ghost">
            <Download size={15} /> Resume
          </a>
        </div>
      </main>

      {/* Scroll indicator */}
      <button
        className={`pl-scroll ${phase >= 6 ? "pl-fade-in" : ""}`}
        onClick={triggerEnter}
        aria-label="Enter portfolio"
      >
        <span className="pl-scroll-text">scroll to explore</span>
        <div className="pl-scroll-line" />
      </button>
    </motion.div>
  );
};

export default PreLandingPage;