import { motion as Motion } from 'framer-motion';

/**
 * Uniform scroll-reveal wrapper — fades/rises content in when it enters the
 * viewport. Works with lazy-loaded routes (self-contained, no global observer).
 */
export default function Reveal({ children, className, delay = 0, y = 24 }) {
  return (
    <Motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Motion.div>
  );
}
