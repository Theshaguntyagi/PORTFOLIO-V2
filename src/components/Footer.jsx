import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Copyright, ExternalLink, Heart } from "lucide-react";
import Newsletter from "./Newsletter";
import "../styles/Footer.css";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">

      {/* subtle glow */}
      <div className="footer-glow" />

      <div className="footer-container">

        {/* GRID */}
        <Motion.div
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
            <h4>{t('common.quickLinks')}</h4>
            <ul>
              <li><Link to="/about">{t('nav.about')}</Link></li>
              <li><Link to="/projects">{t('nav.projects')}</Link></li>
              <li><Link to="/blog">{t('nav.blog')}</Link></li>
              <li><Link to="/now">{t('nav.now')}</Link></li>
              <li><Link to="/uses">{t('nav.uses')}</Link></li>
              <li>
                <a href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noopener noreferrer">
                  Resume <ExternalLink size={12}/>
                </a>
              </li>
            </ul>
          </div>

          {/* CONNECT */}
          <div className="footer-col">
            <h4>{t('common.connect')}</h4>
            <ul className="footer-links">
              <li>
                <a href="https://github.com/theshaguntyagi" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/theshaguntyagi" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:theshaguntyagi@gmail.com">
                  Email
                </a>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className="footer-col">
            <Newsletter />
          </div>

        </Motion.div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          <p>
            <Copyright size={14} /> {new Date().getFullYear()}&nbsp;
            <a
              href="https://theshaguntyagi.github.io/PORTFOLIO/CARD%20STYLE/card.html"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-name-link"
            >
              Shagun Tyagi
            </a>
            . All rights reserved.
          </p>

          <p>
            Built with <Heart size={14} className="heart" /> React
          </p>
        </div>

      </div>
    </footer>
  );
}