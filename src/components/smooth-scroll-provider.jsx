import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import "../styles/global.css";

export function SmoothScrollProvider({ children }) {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      className="page-transition"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}