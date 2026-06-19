import React from "react";
import { GraduationCap, Calendar, MapPin, Trophy, Award } from "lucide-react";
import { useTranslation } from "react-i18next";

import { education } from "../data/education";
import { skills } from "../data/skills";
import { achievements } from "../data/achievements";
import { certifications } from "../data/certifications";
import { Link } from "react-router-dom";
import { getLocal } from "../utils/translate";

import "../styles/About.css";

export default function About() {
  const { t, i18n } = useTranslation();

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  const getLocalizedSkillCategory = (key) => {
    const mappings = {
      "Languages & Core": t("about.languagesAndCore", "Languages & Core"),
      "AI / GenAI": t("about.aiGenAi", "AI / GenAI"),
      "Machine Learning & Computer Vision": t("about.mlCv", "Machine Learning & Computer Vision"),
      "Backend Development": t("about.backend", "Backend Development"),
      "Automation & Data Extraction": t("about.automation", "Automation & Data Extraction"),
      "Databases": t("about.databases", "Databases"),
      "Cloud & DevOps": t("about.devops", "Cloud & DevOps"),
      "IoT & Embedded Systems": t("about.iot", "IoT & Embedded Systems"),
    };
    return mappings[key] || key;
  };

  return (
    <section className="about">

      {/* HEADER */}
      <div className="about-header"><br></br>
        <h1>{t("about.title")}</h1>
        <p>{t("about.subtitle")}</p>
      </div>

      {/* GRID */}
      <div className="about-grid">

        {/* LEFT */}
        <div className="left">

          <h2>{t("about.whoIAm")}</h2>
          <div className="card">
            <p>{t("about.bio_p1")}</p>
            <p>{t("about.bio_p2")}</p>
            <p>{t("about.bio_p3")}</p>
            <p>{t("about.bio_p4")}</p>
            <p>{t("about.bio_p5")}</p>
            <p>{t("about.bio_p6")}</p>
          </div>

          <h2>{t("about.education")}</h2>

          {education.map((edu, i) => (
            <div key={i} className="card edu-card" onMouseMove={handleMouseMove}>
              <div className="edu-row">

                <div className="edu-icon">
                  <GraduationCap size={18}/>
                </div>

                <div>
                  <h3>{getLocal(edu, 'title', i18n.language)}</h3>
                  <p>{getLocal(edu, 'institute', i18n.language)}</p>

                  <div className="edu-meta">
                    <span><Calendar size={12}/> {edu.duration}</span>
                    {edu.location && (
                      <span><MapPin size={12}/> {getLocal(edu, 'location', i18n.language)}</span>
                    )}
                    {edu.extra && <span>{getLocal(edu, 'extra', i18n.language)}</span>}
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* RIGHT */}
        <div className="right">

          <h2>{t("about.skills")}</h2>

          {Object.entries(skills).map(([key, items], i) => (
            <div key={i} className="card skill-box" onMouseMove={handleMouseMove}>
              <h4>{getLocalizedSkillCategory(key)}</h4>
              <div className="tags">
                {items.map((item, idx) => (
                  <span key={idx}>{item}</span>
                ))}
              </div>
            </div>
          ))}

        </div>

      </div>
      <br></br>

      {/* ACHIEVEMENTS */}
      <div className="achievements">
        <h2><Trophy size={18}/> {t("about.achievements")}</h2>

        <div className="ach-grid">
          {achievements.map((a, i) => (
            <div key={i} className="card ach-card">
              <Trophy size={16}/>
              <h3>{a.title}</h3>
              <p>{getLocal(a, 'subtitle', i18n.language)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CERTIFICATIONS */}
      <div className="certifications">
        <h2><Award size={18}/> {t("about.certifications")}</h2>

        <div className="cert-grid">
          {certifications.map((c, i) => (
            <div key={i} className="card cert-card">
              <Award size={16}/>
              <h3>{c.title}</h3>
              <p>{getLocal(c, 'description', i18n.language)}</p>
              <Link to={`/certificate/${c.id}`} className="btn">
                {t("about.viewDetails")}
              </Link>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}