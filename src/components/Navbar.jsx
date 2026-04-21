import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/experience', label: 'Experience' },
    { path: '/projects', label: 'Projects' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

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
              onClick={() => setIsMobileMenuOpen(false)}
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