import { Github, Linkedin, Mail, Instagram, Twitter,} from "lucide-react";
import "../styles/global.css";

const socials = [
  { icon: <Github size={18} />, url: "https://github.com/theshaguntyagi", label: "GitHub Profile" },
  { icon: <Linkedin size={18} />, url: "https://linkedin.com/in/theshaguntyagi", label: "LinkedIn Profile" },
  { icon: <Instagram size={18} />, url: "https://instagram.com/theshaguntyagi", label: "Instagram Profile" },
  { icon: <Twitter size={18} />, url: "https://twitter.com/theshaguntyagi", label: "Twitter Profile" },
  { icon: <Mail size={18} />, url: "mailto:theshaguntyagi@gmail.com", label: "Send Email" },
];

export function FloatingSocials() {
  return (
    <div className="floating-socials">
      {socials.map((s, i) => (
        <a
          key={i}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-social-btn"
          aria-label={s.label}
        >
          {s.icon}
        </a>
      ))}

      <div className="floating-social-line" />
    </div>
  );
}