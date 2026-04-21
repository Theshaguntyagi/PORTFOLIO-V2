import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, Trophy, Award } from "lucide-react";

import { education } from "../data/education";
import { skills } from "../data/skills";
import { achievements } from "../data/achievements";
import { certifications } from "../data/certifications";
import { Link } from "react-router-dom";

import "../styles/About.css";

export default function About() {

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <section className="about">

      {/* HEADER */}
      <div className="about-header"><br></br>
        <h1>About Me</h1>
        <p>Get to know more about my background and skills</p>
      </div>

      {/* GRID */}
      <div className="about-grid">

        {/* LEFT */}
        <div className="left">

          <h2>Who I Am</h2>
          <div className="card">
            <p>
              I build scalable systems, full-stack apps, and ML pipelines.
            </p>
          </div>

          <h2>Education</h2>

          {education.map((edu, i) => (
            <div key={i} className="card edu-card" onMouseMove={handleMouseMove}>
              <div className="edu-row">

                <div className="edu-icon">
                  <GraduationCap size={18}/>
                </div>

                <div>
                  <h3>{edu.title}</h3>
                  <p>{edu.institute}</p>

                  <div className="edu-meta">
                    <span><Calendar size={12}/> {edu.duration}</span>
                    {edu.location && (
                      <span><MapPin size={12}/> {edu.location}</span>
                    )}
                    {edu.extra && <span>{edu.extra}</span>}
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* RIGHT */}
        <div className="right">

          <h2>Skills</h2>

          {Object.entries(skills).map(([key, items], i) => (
            <div key={i} className="card skill-box" onMouseMove={handleMouseMove}>
              <h4>{key}</h4>
              <div className="tags">
                {items.map((item, idx) => (
                  <span key={idx}>{item}</span>
                ))}
              </div>
            </div>
          ))}

        </div>

      </div>

      {/* ACHIEVEMENTS */}
      <div className="achievements">
        <h2><Trophy size={18}/> Achievements</h2>

        <div className="ach-grid">
          {achievements.map((a, i) => (
            <div key={i} className="card ach-card">
              <Trophy size={16}/>
              <h3>{a.title}</h3>
              <p>{a.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CERTIFICATIONS */}
      <div className="certifications">
        <h2><Award size={18}/> Certifications</h2>

        <div className="cert-grid">
          {certifications.map((c, i) => (
            <div key={i} className="card cert-card">
              <Award size={16}/>
              <h3>{c.title}</h3>
              <p>{c.subtitle}</p>
              <Link to={`/certificate/${c.id}`} className="btn">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}