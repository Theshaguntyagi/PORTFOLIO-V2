import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  Trophy,
  Star
} from 'lucide-react';

import ChatWidget from '../components/ChatWidget';
import Testimonials from './Testimonials';       // ← your existing stacked-card component
import { projectsData } from '../data/projects';
import '../styles/Home.css';
import SEO from "../components/SEO";


/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const SKILLS = {
  Languages: [
    { name: 'Python',     icon: '🐍' },
    { name: 'JavaScript', icon: '⚡' },
    { name: 'TypeScript', icon: '🔷' },
    { name: 'Java',       icon: '☕' },
    { name: 'C++',        icon: '⚙️' },
    { name: 'SQL',        icon: '🗄️' },
  ],
  Frameworks: [
    { name: 'React',   icon: '⚛️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'FastAPI', icon: '🚀' },
    { name: 'Django',  icon: '🎸' },
    { name: 'Flask',   icon: '🧪' },
  ],
  Cloud: [
    { name: 'AWS',        icon: '☁️' },
    { name: 'Docker',     icon: '🐳' },
    { name: 'Kubernetes', icon: '⚓' },
    { name: 'Firebase',   icon: '🔥' },
  ],
  'IoT / Data': [
    { name: 'Raspberry Pi', icon: '🫐' },
    { name: 'Arduino',      icon: '🔌' },
    { name: 'PowerBI',      icon: '📊' },
    { name: 'TensorFlow',   icon: '🧠' },
  ],
};

const ACHIEVEMENTS = [
  { icon: <Trophy size={14} />, text: 'Best Innovation Award – College Techfest 2024' },
  { icon: <Star   size={14} />, text: 'Top 10 – National IoT Hackathon' },
  { icon: <Trophy size={14} />, text: '1st Place – Cloud Computing Challenge' },
  { icon: <Star   size={14} />, text: 'Open Source Contributor – 500+ GitHub stars' },
  { icon: <Trophy size={14} />, text: 'Certified AWS Solutions Architect' },
  { icon: <Star   size={14} />, text: 'Data Engineering Intern – Fortune 500 firm' },
  { icon: <Trophy size={14} />, text: 'Winner – University Coding Olympiad' },
  { icon: <Star   size={14} />, text: 'Technical Lead – University Developer Club' },
  { icon: <Trophy size={14} />, text: 'Published research on Edge Computing' },
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
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [activeSkillTab,    setActiveSkillTab]    = useState('Languages');

  const displayedSkills = [
    'Full Stack Python Developer',
    'IoT Specialist',
    'Cloud Computing Expert',
    'Data-Driven Engineer',
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
    { icon: <Linkedin className="social-icon-svg" />, url: 'https://linkedin.com/in/shaguntyagi', label: 'LinkedIn' },
    { icon: <Mail     className="social-icon-svg" />, url: 'mailto:shaguntyagi@example.com',       label: 'Email'    },
    { icon: <Phone    className="social-icon-svg" />, url: 'tel:+918445692029',                    label: 'Phone'    },
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
                  src="/images/profile.jpg"
                  alt="Shagun Tyagi"
                  className="profile-image"
                  loading="eager"
                />
              </div>
            </Motion.div>

            {/* Text Content */}
            <Motion.div className="hero-content" variants={stagger} initial="hidden" animate="visible">
              <Motion.div className="hero-text" variants={fadeUp}>
                <h1 className="hero-title">Hi, I&apos;m Shagun Tyagi</h1>

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

                <p className="hero-description">
                  B.Tech graduate specializing in Computer Science with IoT focus.
                  Passionate about creating innovative cloud-based and data-driven applications.
                </p>
              </Motion.div>

              <Motion.div className="hero-actions" variants={fadeUp} custom={1}>
                <Link to="/projects" className="btn btn-primary btn-lg hero-btn-animate">
                  <span>View My Work</span>
                  <ArrowRight className="btn-icon-right" />
                </Link>
                <a href="/resume.pdf" download="Shagun_Tyagi_Resume.pdf" className="btn btn-outline btn-lg">
                  <Download className="btn-icon-left" />
                  <span>Resume</span>
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
            <div className="stat-card"><h3 className="stat-value">6+</h3><p className="stat-label">Projects</p></div>
            <div className="stat-divider" />
            <div className="stat-card"><h3 className="stat-value">1+</h3><p className="stat-label">Year Experience</p></div>
            <div className="stat-divider" />
            <div className="stat-card"><h3 className="stat-value">5+</h3><p className="stat-label">Certifications</p></div>
          </Motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. FEATURED PROJECTS
      ══════════════════════════════════════════ */}
      <Section id="featured-projects" className="section-projects">
        <div className="container">
          <SectionHeader title="Featured Projects" subtitle="Check out some of my recent work" />

          <div className="projects-grid home-projects-grid">
            {featuredProjects.map((project, index) => (
              <Motion.div
                key={index}
                className="project-card card"
                variants={fadeUp}
                custom={index}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                {project.image && (
                  <div className="project-image-wrapper">
                    <img src={project.image} alt={project.title} className="project-image" />
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
                  {project.achievements?.length > 0 && (
                    <ul className="project-achievements">
                      {project.achievements.slice(0, 2).map((a, i) => (
                        <li key={i} className="achievement-item">
                          <ArrowRight className="achievement-icon" /><span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="card-footer">
                  <button type="button" className="btn btn-primary btn-sm"
                    onClick={() => window.open(GITHUB_URL, '_blank', 'noopener,noreferrer')}>
                    View Details <ArrowRight className="btn-icon-right" />
                  </button>
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
              View All Projects <ArrowRight className="btn-icon-right arrow-animate" />
            </Link>
          </Motion.div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════
          3. TECHNICAL SKILLS
      ══════════════════════════════════════════ */}
      <Section id="skills" className="section-skills">
        <div className="container">
          <SectionHeader title="Technical Skills" subtitle="My expertise across various technologies and tools" />

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
          <SectionHeader title="Achievements" subtitle="Recognition and milestones from my technical journey" />

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

      <ChatWidget />
    </div>
  );
};

export default Home;