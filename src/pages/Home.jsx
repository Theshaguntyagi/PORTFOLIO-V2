import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion as Motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Mail,
  Phone,
  ExternalLink,
  Trophy,
  Star
} from 'lucide-react';

import Testimonials from './Testimonials';       // ← your existing stacked-card component
import { projectsData } from '../data/projects';
import { trackEvent } from '../analytics';
import CountUp from '../components/CountUp';
import MagneticButton from '../components/MagneticButton';
import '../styles/Home.css';
// The Home page reuses .project-card and .filter-btn, whose styles live in
// Projects.css. Without this import that CSS only loads on the /projects route,
// so on Home those elements render UNSTYLED until the Projects chunk loads
// ("loads then fixes itself"). Importing it here loads the styles with Home.
import '../styles/Projects.css';
import AvailabilityBadge from '../components/AvailabilityBadge';


/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const SKILLS = {
  'Languages & DBs': [
    { name: 'Python',     icon: '🐍' },
    { name: 'JavaScript', icon: '⚡' },
    { name: 'C',          icon: '⚙️' },
    { name: 'SQL',        icon: '🗄️' },
    { name: 'MySQL',      icon: '🐬' },
    { name: 'MongoDB',    icon: '🍃' },
    { name: 'SQLite',     icon: '💾' },
  ],
  'AI / ML / GenAI': [
    { name: 'LangChain',  icon: '🔗' },
    { name: 'TensorFlow', icon: '🧠' },
    { name: 'OpenCV',     icon: '👁️' },
    { name: 'OpenAI API', icon: '🤖' },
    { name: 'FAISS',      icon: '🔍' },
    { name: 'DeepFace',   icon: '🫂' },
    { name: 'Scikit-Learn', icon: '📐' },
  ],
  'Frameworks & Tools': [
    { name: 'FastAPI',        icon: '🚀' },
    { name: 'Flask',          icon: '🧪' },
    { name: 'Vite',           icon: '⚡' },
    { name: 'Playwright',     icon: '🎭' },
    { name: 'Pandas',         icon: '🐼' },
  ],
  'Cloud & DevOps': [
    { name: 'AWS',      icon: '☁️' },
    { name: 'Azure',    icon: '🌐' },
    { name: 'Docker',   icon: '🐳' },
    { name: 'Firebase', icon: '🔥' },
    { name: 'CI/CD',    icon: '♾️' },
    { name: 'Linux',    icon: '🐧' },
  ],
  'IoT & Data Viz': [
    { name: 'Raspberry Pi', icon: '🫐' },
    { name: 'Power BI',     icon: '📊' },
    { name: 'Three.js',     icon: '🎲' },
    { name: 'Twilio',       icon: '📞' },
  ],
};

const ACHIEVEMENTS = [
  { icon: <Trophy size={14} />, text: 'Winner — National Level Hackathon: Waste Management Portal (Django + MySQL)' },
  { icon: <Star   size={14} />, text: 'Runner-up — Health-A-Thon: AI-powered health solution built in 48 hours' },
  { icon: <Trophy size={14} />, text: 'Runner-up — CSS Battleground (MIET): Ranked 2nd among 250 candidates' },
  { icon: <Star   size={14} />, text: 'ML Team Lead — CXI Community: Organized 5+ workshops on ML, AI & Cloud' },
  { icon: <Trophy size={14} />, text: 'Published Researcher — IJSRA 2024: ECG/PPG Health Monitoring System' },
  { icon: <Star   size={14} />, text: 'Reduced API latency 30% — FastAPI microservices at Airtel' },
  { icon: <Trophy size={14} />, text: 'Cut manual data processing 40% — LangChain agents at Envigo' },
  { icon: <Star   size={14} />, text: 'Built diabetic retinopathy classifier — 92% accuracy with TensorFlow + OpenCV' },
  { icon: <Trophy size={14} />, text: 'Certifications — AWS, Azure AZ-900 & PL-900, Cisco CyberOps, CCNA' },
];

const GITHUB_URL = 'https://github.com/theshaguntyagi?tab=repositories';

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: 'easeOut' },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─────────────────────────────────────────────────────────────
   SCROLL-TRIGGERED SECTION WRAPPER
───────────────────────────────────────────────────────────── */
const Section = ({ id, className = '', children }) => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <Motion.section
      id={id}
      ref={ref}
      className={`home-section ${className}`}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </Motion.section>
  );
};

/* ─────────────────────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────────────────────── */
const SectionHeader = ({ title, subtitle }) => (
  <Motion.div className="section-header" variants={fadeUp}>
    <h2 className="section-title-text">{title}</h2>
    {subtitle && <p className="section-subtitle">{subtitle}</p>}
    <div className="section-title-line" />
  </Motion.div>
);

/* ─────────────────────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────────────────────── */
const Home = () => {
  const { t } = useTranslation();
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [activeSkillTab,    setActiveSkillTab]    = useState('Languages & DBs');

  const displayedSkills = [
    'AI / ML Engineer',
    'Generative AI Developer',
    'Cloud & Data Engineer',
  ];

  useEffect(() => {
    const id = setInterval(
      () => setCurrentSkillIndex((i) => (i + 1) % displayedSkills.length),
      3000
    );
    return () => clearInterval(id);
  }, []);

  const socialLinks = [
    { icon: <Github   className="social-icon-svg" />, url: 'https://github.com/theshaguntyagi',   label: 'GitHub'   },
    { icon: <Linkedin className="social-icon-svg" />, url: 'https://linkedin.com/in/theshaguntyagi', label: 'LinkedIn' },
    { icon: <Twitter  className="social-icon-svg" />, url: 'https://twitter.com/theshaguntyagi',  label: 'Twitter'  },
    { icon: <Instagram className="social-icon-svg" />, url: 'https://instagram.com/theshaguntyagi', label: 'Instagram' },
    { icon: <Mail     className="social-icon-svg" />, url: 'mailto:theshaguntyagi@gmail.com',       label: 'Email'    },
  ];

  const featuredProjects = projectsData.slice(0, 3);

  return (
    <div className="home-page-wrapper">

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className="home-page section section-lg" id="hero">
        <div className="hero-background">
          <div className="gradient-blob blob-1" />
          <div className="gradient-blob blob-2" />
        </div>

        <div className="container">
          <div className="hero-grid">

            {/* Profile Image */}
            <Motion.div
              className="hero-image-section"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="profile-image-wrapper">
                <img
                  src={`${import.meta.env.BASE_URL}profile.png`}
                  alt="Portrait of Shagun Tyagi, AI/ML Engineer"
                  className="profile-image"
                  loading="eager"
                />
              </div>
            </Motion.div>

            {/* Text Content */}
            <Motion.div className="hero-content" variants={stagger} initial="hidden" animate="visible">
              <Motion.div className="hero-text" variants={fadeUp}>
                <AvailabilityBadge />
                <h1 className="hero-title">{t('hero.greeting')}</h1>

                <div className="hero-skills-container">
                  <div className="hero-skills-wrapper">
                    {displayedSkills.map((skill, index) => (
                      <h2
                        key={skill}
                        className={`hero-skill ${index === currentSkillIndex ? 'active' : ''}`}
                      >
                        {skill}
                      </h2>
                    ))}
                  </div>
                </div>

                <p className="hero-description" style={{ whiteSpace: "pre-line" }}>{t('hero.description')}</p>
              </Motion.div>

              <Motion.div className="hero-actions" variants={fadeUp} custom={1}>
                <MagneticButton>
                  <Link
                    to="/contact"
                    className="btn btn-primary btn-lg hero-btn-animate"
                    onClick={() => trackEvent('hire_me_click', { from: 'hero' })}
                  >
                    <span>{t('hero.hire')}</span>
                    <ArrowRight className="btn-icon-right" />
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link to="/projects" className="btn btn-outline btn-lg">
                    <span>{t('hero.work')}</span>
                  </Link>
                </MagneticButton>
                <a
                  href={`${import.meta.env.BASE_URL}resume.pdf`}
                  download="Shagun Tyagi-Resume.pdf"
                  className="btn btn-ghost btn-lg"
                  onClick={() => trackEvent('resume_download', { from: 'hero' })}
                >
                  <Download className="btn-icon-left" />
                  <span>{t('hero.resume')}</span>
                </a>
              </Motion.div>

              <Motion.div className="hero-social" variants={fadeUp} custom={2}>
                {socialLinks.map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </Motion.div>
            </Motion.div>
          </div>

          {/* Stats */}
          <Motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="stat-card"><h3 className="stat-value"><CountUp value="10+" /></h3><p className="stat-label">{t('hero.statProjects')}</p></div>
            <div className="stat-divider" />
            <div className="stat-card"><h3 className="stat-value"><CountUp value="1.5+" /></h3><p className="stat-label">{t('hero.statExperience')}</p></div>
            <div className="stat-divider" />
            <div className="stat-card"><h3 className="stat-value"><CountUp value="9+" /></h3><p className="stat-label">{t('hero.statCerts')}</p></div>
          </Motion.div>
        </div>
      </section>

{/* ══════════════════════════════════════════
          2. FEATURED PROJECTS
      ══════════════════════════════════════════ */}
      <Section id="featured-projects" className="section-projects">
        <div className="container">
          <SectionHeader title={t('sections.featuredTitle')} subtitle={t('sections.featuredSub')} />

          <div className="projects-grid home-projects-grid">
            {featuredProjects.map((project, index) => (
              <Motion.div
                key={project.id}
                className="project-card card"
                variants={fadeUp}
                custom={index}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                {project.image && (
                  <div className="project-image-wrapper">
                    <img src={project.image} alt={project.title} className="project-image" loading="lazy" decoding="async" />
                    <div className="project-overlay">
                      <div className="project-links">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                            <ExternalLink className="link-icon" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                            <Github className="link-icon" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="card-header">
                  <span className="project-category badge badge-secondary">{project.category}</span>
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-description">{project.description}</p>
                </div>

                <div className="card-content">
                  <div className="project-technologies">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} className="badge badge-outline">{tech}</span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="badge badge-outline">+{project.technologies.length - 4}</span>
                    )}
                  </div>
                  {project.results?.length > 0 && (
                    <ul className="project-achievements">
                      {project.results.slice(0, 2).map((r, i) => (
                        <li key={i} className="achievement-item">
                          <ArrowRight className="achievement-icon" /><span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="card-footer">
                  <Link
                    to={`/project/${project.id}`}
                    className="btn btn-primary btn-sm"
                    onClick={() => trackEvent('view_project_details', { project: project.id })}
                  >
                    View Details <ArrowRight className="btn-icon-right" />
                  </Link>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-icon">
                      <Github className="icon-svg" />
                    </a>
                  )}
                </div>
              </Motion.div>
            ))}
          </div>

          <Motion.div className="view-all-section" variants={fadeUp} custom={4}>
            <Link to="/projects" className="btn btn-outline btn-lg view-all-btn-animated">
              {t('common.viewAll')} <ArrowRight className="btn-icon-right arrow-animate" />
            </Link>
          </Motion.div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════
          3. TECHNICAL SKILLS
      ══════════════════════════════════════════ */}
      <Section id="skills" className="section-skills">
        <div className="container">
          <SectionHeader title={t('sections.skillsTitle')} subtitle={t('sections.skillsSub')} />

          <Motion.div className="skills-tabs" variants={fadeUp}>
            {Object.keys(SKILLS).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSkillTab(tab)}
                className={`filter-btn ${activeSkillTab === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </Motion.div>

          <Motion.div className="skills-grid" key={activeSkillTab} variants={stagger} initial="hidden" animate="visible">
            {SKILLS[activeSkillTab].map((skill, i) => (
              <Motion.div
                key={skill.name}
                className="skill-pill"
                variants={fadeUp}
                custom={i}
                whileHover={{ scale: 1.06, transition: { duration: 0.15 } }}
              >
                <span className="skill-icon">{skill.icon}</span>
                <span className="skill-name">{skill.name}</span>
              </Motion.div>
            ))}
          </Motion.div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════
          4. ACHIEVEMENTS
      ══════════════════════════════════════════ */}
      <Section id="achievements" className="section-achievements">
        <div className="container">
          <SectionHeader title={t('sections.achievementsTitle')} subtitle={t('sections.achievementsSub')} />

          <div className="achievements-grid">
            {ACHIEVEMENTS.map((item, i) => (
              <Motion.div
                key={i}
                className="achievement-badge"
                variants={fadeUp}
                custom={i}
                whileHover={{ scale: 1.03, transition: { duration: 0.15 } }}
              >
                <span className="achievement-badge-icon">{item.icon}</span>
                <span className="achievement-badge-text">{item.text}</span>
              </Motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════
          5. RECOMMENDATIONS
          — Reuses your existing Testimonials.jsx
            stacked-card carousel exactly as-is.
            Only the section title lives here.
      ══════════════════════════════════════════ */}
      <section id="recommendations" className="section-testimonials">
        <div className="container testimonials-section-header">
          <div className="section-header">
            <h2 className="section-title-text">Recommendations</h2>
            <p className="section-subtitle">What mentors and colleagues say about my work</p>
            <div className="section-title-line" />
          </div>
        </div>

        {/* Your existing stacked-card carousel drops in here untouched */}
        <Testimonials />
      </section>
    </div>
  );
};

export default Home;