import { useParams, useNavigate } from "react-router-dom";
import { projectsData } from "../data/projects";
import { useState } from "react";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import "../styles/ProjectDetail.css";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projectsData.find(p => p.id === id);
  const [index, setIndex] = useState(0);

  if (!project) return <h2>Project not found</h2>;

  return (
    <section className="project-detail-page">
      <div className="container">

        {/* BACK */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back
        </button>

        {/* MAIN GLASS CARD */}
        <div className="project-detail-card">

          {/* TITLE */}
          <h1 className="title">{project.title}</h1>
          <p className="subtitle">{project.description}</p>

          {/* 🔥 GRID LAYOUT */}
          <div className="project-detail-grid">

            {/* LEFT SIDE — MEDIA */}
            <div className="project-media">

              {project.video ? (
                <div className="video-wrapper">
                  <iframe
                    src={project.video}
                    title="Project Demo"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="carousel">
                  <img
                    src={project.images?.[index] || project.image}
                    alt={project.title}
                  />

                  {project.images?.length > 1 && (
                    <>
                      <button
                        className="nav prev"
                        onClick={() =>
                          setIndex((index - 1 + project.images.length) % project.images.length)
                        }
                      >
                        ‹
                      </button>

                      <button
                        className="nav next"
                        onClick={() =>
                          setIndex((index + 1) % project.images.length)
                        }
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>
              )}

            </div>

            {/* RIGHT SIDE — PANEL */}
            <div className="project-side">

              {/* TECH STACK */}
              <div className="side-card">
                <h4>Tech Stack</h4>

                <div className="tech-stack">
                  {project.technologies.map((t, i) => (
                    <span key={i} className="tech-pill">{t}</span>
                  ))}
                </div>
              </div>

              {/* LINKS */}
              <div className="side-card">
                <h4>Links</h4>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="side-link"
                  >
                    <Github size={16} /> GitHub Repository
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="side-link"
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
              </div>

            </div>
          </div>

          {/* OVERVIEW */}
          {project.overview && (
            <div className="detail-section">
              <h3>Overview</h3>
              <p>{project.overview}</p>
            </div>
          )}

          {/* ACHIEVEMENTS */}
          {project.achievements && (
            <div className="detail-section">
              <h3>Key Achievements</h3>
              <ul>
                {project.achievements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}