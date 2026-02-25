import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Phone
} from 'lucide-react';

import ChatWidget from '../components/ChatWidget';
import '../styles/Home.css';

const Home = () => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);

  const displayedSkills = [
    'Full Stack Python Developer',
    'IoT Specialist',
    'Cloud Computing Expert',
    'Data-Driven Engineer'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkillIndex(
        (prevIndex) => (prevIndex + 1) % displayedSkills.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [displayedSkills.length]); 

  const socialLinks = [
    {
      icon: <Github className="social-icon-svg" />,
      url: 'https://github.com/theshaguntyagi',
      label: 'GitHub'
    },
    {
      icon: <Linkedin className="social-icon-svg" />,
      url: 'https://linkedin.com/in/shaguntyagi',
      label: 'LinkedIn'
    },
    {
      icon: <Mail className="social-icon-svg" />,
      url: 'mailto:shaguntyagi@example.com',
      label: 'Email'
    },
    {
      icon: <Phone className="social-icon-svg" />,
      url: 'tel:+918445692029',
      label: 'Phone'
    }
  ];

  return (
    <section className="home-page section section-lg">
      {/* Background gradient blobs */}
      <div className="hero-background">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
      </div>

      <div className="container">
        <div className="hero-grid">

          {/* PROFILE IMAGE SECTION */}
          <div className="hero-image-section">
            <div className="profile-image-wrapper" data-mobile-safe="true">
              <img
                src="/images/profile.jpg"
                alt="Profile"
                className="profile-image"
                loading="lazy"
              />
            </div>
          </div>

          {/* HERO CONTENT */}
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Hi, I&apos;m Shagun Tyagi</h1>

              {/* Rotating Skills */}
              <div className="hero-skills-container">
                <div className="hero-skills-wrapper">
                  {displayedSkills.map((skill, index) => (
                    <h2
                      key={skill}
                      className={`hero-skill ${
                        index === currentSkillIndex ? 'active' : ''
                      }`}
                    >
                      {skill}
                    </h2>
                  ))}
                </div>
              </div>

              <p className="hero-description">
                B.Tech graduate specializing in Computer Science with IoT focus.
                Passionate about creating innovative cloud-based and data-driven
                applications.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="hero-actions">
              <Link
                to="/projects"
                className="btn btn-primary btn-lg hero-btn-animate"
              >
                <span>View My Work</span>
                <ArrowRight className="btn-icon-right" />
              </Link>

              <a
                href="/resume.pdf"
                download="Shagun_Tyagi_Resume.pdf"
                className="btn btn-outline btn-lg"
              >
                <Download className="btn-icon-left" />
                <span>Resume</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="hero-social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* STATS SECTION */}
        <div className="hero-stats">
          <div className="stat-card">
            <h3 className="stat-value">6+</h3>
            <p className="stat-label">Projects</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-card">
            <h3 className="stat-value">1+</h3>
            <p className="stat-label">Year Experience</p>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </section>
  );
};

export default Home;
