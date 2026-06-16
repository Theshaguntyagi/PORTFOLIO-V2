import { motion as Motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import "../styles/global.css";

const socials = [
  { icon: <Github size={18} />, url: "https://github.com" },
  { icon: <Linkedin size={18} />, url: "https://linkedin.com" },
  { icon: <Mail size={18} />, url: "mailto:your@email.com" },
];

export function FloatingSocials() {
  return (
    <div className="floating-socials">
      {socials.map((s, i) => (
        <Motion.a
          key={i}
          href={s.url}
          target="_blank"
          whileHover={{ scale: 1.1 }}
          className="floating-social-btn"
        >
          {s.icon}
        </Motion.a>
      ))}

      <div className="floating-social-line" />
    </div>
  );
}