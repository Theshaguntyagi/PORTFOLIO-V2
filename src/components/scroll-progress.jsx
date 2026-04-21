import { motion, useScroll, useTransform } from "framer-motion";
import "../styles/global.css";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.02, 0.03], [0, 0, 1]);

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX: scrollYProgress, opacity }}
    />
  );
}