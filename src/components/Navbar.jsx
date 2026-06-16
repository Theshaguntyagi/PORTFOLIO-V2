import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import '../styles/Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/experience', label: t('nav.experience') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/guestbook', label: 'Guestbook' },
    { path: '/contact', label: t('nav.contact') },
  ];

  useEffect(() => {
    let requestRunning = false;
    const tolerance = 5;
    const handleScroll = () => {
      if (requestRunning) return;
      requestRunning = true;
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const diff = currentScrollY - lastScrollYRef.current;
        if (Math.abs(diff) > tolerance) {
          setIsVisible(currentScrollY <= lastScrollYRef.current || currentScrollY <= 100);
        }
        setIsScrolled(currentScrollY > 20);
        lastScrollYRef.current = currentScrollY;
        requestRunning = false;
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu whenever the route changes (e.g. back/forward),
  // and lock body scroll while it's open. Guarded so we don't call setState
  // every render — only when the menu is actually open.
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const getIsActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`navbar-header
        ${isVisible ? 'navbar-visible' : 'navbar-hidden'}
        ${isScrolled ? 'navbar-scrolled' : 'navbar-top'}
        ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'}`}
    >
      <div className="navbar-3d-card">

        {/* ── TOP ROW ── */}
        <div className="navbar-container">

          {/* Brand */}
          <div className="navbar-brand-wrapper">
            <Link to="/" className="navbar-brand">
              <span className="navbar-logo-text">Shagun Tyagi</span>
            </Link>
          </div>

          {/* Desktop links — hidden on mobile via CSS */}
          <nav className="navbar-menu-desktop" aria-label="Desktop navigation">
            {navLinks.map((link, i) => (
              <div
                key={link.path}
                className="navbar-item-wrapper"
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                <Link
                  to={link.path}
                  className={`navbar-link variable-font ${getIsActive(link.path) ? 'navbar-link-active' : ''}`}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right controls — always visible */}
          <div className="navbar-right-controls">
            <LanguageSwitcher />
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Hamburger — shown on mobile via CSS */}
            <button
              className={`mobile-menu-toggle ${isMobileMenuOpen ? 'is-open' : ''}`}
              onClick={() => setIsMobileMenuOpen(v => !v)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>

        {/* ── MOBILE DROPDOWN ── */}
        <nav
          className={`navbar-menu-mobile ${isMobileMenuOpen ? 'is-open' : ''}`}
          aria-label="Mobile navigation"
          aria-hidden={!isMobileMenuOpen}
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar-link-mobile ${getIsActive(link.path) ? 'navbar-link-active' : ''}`}
              onClick={closeMenu}
              style={{ animationDelay: `${0.04 * i}s` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

      </div>
    </header>
  );
};

export default Navbar;