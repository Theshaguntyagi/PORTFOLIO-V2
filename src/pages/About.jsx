import React from 'react';
import { motion as Motion } from 'framer-motion';
import { educationData } from '../data/education';
import { skillsData } from '../data/skills';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page section section-lg">
      <div className="container">

        {/* About Section */}
        <Motion.div
          className="section-title about-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>About Me</h2>
          <p className="about-subtitle">
            Get to know more about my journey, mindset, and passion.
          </p>
        </Motion.div>

        <Motion.div
          className="about-intro-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="card about-card">
            <div className="card-content">
              <p className="about-text">
                Welcome to my portfolio! I'm Shagun Tyagi, a passionate B.Tech graduate
                specializing in Computer Science Engineering with a focus on IoT.
              </p>

              <p className="about-text">
                From developing full-stack applications to exploring cloud platforms,
                I love building products that solve real problems.
              </p>
            </div>
          </div>
        </Motion.div>

        {/* Skills Section */}
        <Motion.div
          className="skills-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-title">
            <h2>Technical Skills</h2>
            <p>My expertise across various technologies</p>
          </div>

          <div className="skills-grid">
            {skillsData.map((skill, index) => (
              <Motion.div
                key={index}
                className="skill-card card"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="card-content">
                  <div className="skill-header">
                    <h4 className="skill-name">{skill.name}</h4>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>

                  <div className="skill-bar">
                    <Motion.div
                      className="skill-progress"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                    />
                  </div>

                  <p className="skill-description">{skill.description}</p>
                </div>
              </Motion.div>
            ))}
          </div>
        </Motion.div>

        {/* Education Section */}
        <Motion.div
          className="education-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-title">
            <h2>Education</h2>
            <p>My academic background and achievements</p>
          </div>

          <div className="education-grid">
            {educationData.map((edu, index) => (
              <Motion.div
                key={index}
                className="education-card card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="card-content">
                  <div className="education-header">
                    <div>
                      <h4 className="education-degree">{edu.degree}</h4>
                      <p className="education-institution">{edu.institution}</p>
                    </div>
                    <div className="education-meta">
                      <p className="education-year">{edu.year}</p>
                      <p className="education-grade">{edu.grade}</p>
                    </div>
                  </div>
                  <p className="education-description">{edu.description}</p>
                </div>
              </Motion.div>
            ))}
          </div>
        </Motion.div>

      </div>
    </div>
  );
};

export default About;
