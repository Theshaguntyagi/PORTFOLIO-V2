import React, { useState } from "react";
import { Link } from "react-router-dom";
import { projectsData } from "../data/projects";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import "../styles/Projects.css";

const Projects = () => {
  const [filter, setFilter] = useState("all");

  const categories = ["all", ...new Set(projectsData.map(p => p.category))];

  const filteredProjects =
    filter === "all"
      ? projectsData
      : projectsData.filter(p => p.category === filter);

  return (
    <section className="projects-page section section-lg bg-muted">
      <div className="container">

        {/* TITLE */}
        <div className="section-title">
          <h2>Featured Projects</h2>
          <p>Check out some of my recent work</p>
        </div>

        {/* FILTERS */}
        <div className="project-filters">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`filter-btn ${filter === category ? "active" : ""}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id || index}
              className="project-card card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >

              {/* IMAGE */}
              {project.image && (
                <div className="project-image-wrapper">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                  />

                  <div className="project-overlay">
                    <div className="project-links">

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link-btn"
                        >
                          <ExternalLink className="link-icon" />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link-btn"
                        >
                          <Github className="link-icon" />
                        </a>
                      )}

                    </div>
                  </div>
                </div>
              )}

              {/* HEADER */}
              <div className="card-header">
                <span className="project-category badge badge-secondary">
                  {project.category}
                </span>

                <h3 className="card-title">{project.title}</h3>

                <p className="card-description">
                  {project.description}
                </p>
              </div>

              {/* CONTENT */}
              <div className="card-content">

                {/* TECH */}
                <div className="project-technologies">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span key={i} className="badge badge-outline">
                      {tech}
                    </span>
                  ))}

                  {project.technologies.length > 4 && (
                    <span className="badge badge-outline">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* ACHIEVEMENTS */}
                {project.achievements?.length > 0 && (
                  <ul className="project-achievements">
                    {project.achievements.slice(0, 2).map((a, i) => (
                      <li key={i} className="achievement-item">
                        <ArrowRight className="achievement-icon" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* FOOTER */}
              <div className="card-footer">

                {/* 🔥 FIXED: ROUTING */}
                <Link
                  to={`/project/${project.id}`}
                  className="btn btn-primary btn-sm"
                >
                  View Details
                  <ArrowRight className="btn-icon-right" />
                </Link>

                <div className="footer-spacer" />

                {/* ICON BUTTONS */}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-icon"
                  >
                    <Github className="icon-svg" />
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-icon"
                  >
                    <ExternalLink className="icon-svg" />
                  </a>
                )}

              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredProjects.length === 0 && (
          <div className="no-projects">
            <p>No projects found in this category.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;