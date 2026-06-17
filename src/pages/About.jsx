import React from "react";
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
               I'm Shagun Tyagi, an AI/ML Engineer based in Noida, India, specializing in
               LLM agents, Retrieval-Augmented Generation (RAG) systems, and production-grade
               ML pipelines. I don't build demos — I build systems that scale.
            </p>
            <p>Currently at <strong>Envigo (Gurugram)</strong>, I architect end-to-end ML
            pipelines on AWS and Azure powering an AI-driven SEO intelligence platform —
            ingesting client data, running LangChain-based LLM agent workflows, and
            surfacing actionable recommendations at scale. I own the full ML lifecycle:
            from model training and Docker containerization to cloud deployment and
            continuous monitoring.
            </p>
            <p>
              Before Envigo, I was a <strong>Software Engineer at Airtel</strong>, where I
              designed and deployed FastAPI microservices that cut API response latency by
              ~30%, built Python automation pipelines that eliminated 10+ hours/week of
              manual ops, and engineered real-time data pipelines feeding dashboards used
              daily by analytics and ML teams.
            </p>
            <p>
              Beyond my day job, I've shipped projects across computer vision (facial
              recognition with ArcFace), browser automation and lead generation (Playwright
              + OpenAI), enterprise RAG chatbots (LangChain + FAISS + ChromaDB), and
              full-stack AI products (React 19 + Firebase + Gemini AI). My work spans the
              full stack — from WebGL in the browser to ML models in Docker on AWS.
            </p>
            <p>
              I'm also a <strong>published researcher</strong> — my work on ECG/PPG-based
              IoT health monitoring was published in the International Journal of Science
              and Research Archive (IJSRA), Vol. 12, No. 1, 2024
              (DOI: 10.30574/ijsra.2024.12.1.0781).
            </p>
            <p>
              Academically, I hold a <strong>B.Tech in Computer Science Engineering
              (IoT)</strong> from MIET with a CGPA of 8.4/10, and I'm currently pursuing
              an <strong>MBA at Chandigarh University</strong> (expected Dec 2027) — because
              I believe the best engineers understand business outcomes, not just accuracy
              benchmarks.
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
      <br></br>

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