import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Copyright, ExternalLink, Heart } from "lucide-react";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      {/* subtle glow */}
      <div className="footer-glow" />

      <div className="footer-container">

        {/* GRID */}
        <motion.div
          className="footer-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >

          {/* ABOUT */}
          <div className="footer-col">
            <h3>Shagun Tyagi</h3>
            <p>
              AI/ML Engineer building scalable systems, full-stack apps, and ML pipelines.
            </p>
          </div>

          {/* LINKS */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  Resume <ExternalLink size={12}/>
                </a>
              </li>
            </ul>
          </div>

          {/* CONNECT */}
          <div className="footer-col">
            <h4>Connect</h4>
            <ul className="footer-links">
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:your@email.com">
                  Email
                </a>
              </li>
            </ul>
          </div>

          {/* SHORTCUTS */}
          <div className="footer-col">
            <h4>Shortcuts</h4>
            <div className="footer-shortcuts">
              <span><kbd>⌘</kbd> + <kbd>K</kbd> Search</span>
              <span><kbd>T</kbd> Toggle Theme</span>
            </div>
          </div>

        </motion.div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          <p>
            <Copyright size={14}/> {new Date().getFullYear()}{""}
            <a href="https://theshaguntyagi.github.io/PORTFOLIO/CARD%20STYLE/card.html" target="_blank"
            rel="noopener noreferrer"
            className="footer-name-link"
            >   Shagun Tyagi. 
            </a>  All rights reserved.
          </p>

          <p>
            Built with <Heart size={14} className="heart"/> React
          </p>
        </div>

      </div>
    </footer>
  );
}