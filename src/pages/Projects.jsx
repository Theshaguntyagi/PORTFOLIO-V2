import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { getLocal } from "../utils/translate";
import { Link } from "react-router-dom";
import { projectsData } from "../data/projects";
import { ExternalLink, Github, ArrowRight, Search } from "lucide-react";
import Tilt from "../components/Tilt";
import Reveal from "../components/Reveal";
import { trackProjectClick } from "../services/telemetry";
import "../styles/Projects.css";

const Projects = () => {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const categories = ["all", ...new Set(projectsData.map(p => p.category))];

  const q = search.trim().toLowerCase();
  const filteredProjects = projectsData.filter((p) => {
    const matchesCategory = filter === "all" || p.category === filter;
    if (!matchesCategory) return false;
    if (!q) return true;
    const haystack = [
      getLocal(p, 'title', i18n.language),
      getLocal(p, 'description', i18n.language),
      ...(p.technologies || []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });

  const getLocalizedCategory = (cat) => {
    const mappings = {
      all: t("projects.all", "All"),
      ai: t("projects.ai", "AI/ML"),
      web: t("projects.web", "Web"),
      iot: t("projects.iot", "IoT")
    };
    return mappings[cat] || cat;
  };

  return (
    <section className="projects-page section section-lg bg-muted">
      <div className="container">

        {/* TITLE */}
        <Reveal className="section-title">
          <h2>{t("sections.featuredTitle")}</h2>
          <p>{t("sections.featuredSub")}</p>
        </Reveal>

        {/* SEARCH */}
        <div className="project-search">
          <Search size={18} className="project-search-icon" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("projects.searchPlaceholder", "Search projects by name, description, or tech…")}
            aria-label="Search projects"
          />
        </div>

        {/* FILTERS */}
        <div className="project-filters">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`filter-btn ${filter === category ? "active" : ""}`}
            >
              {getLocalizedCategory(category)}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="projects-grid">
          {filteredProjects.map((project, index) => {
            const projAchievements = getLocal(project, 'achievements', i18n.language) || [];

            return (
              <Tilt
                key={project.id || index}
                className={`project-card card ${index === 0 ? 'project-card-featured' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >

                {/* IMAGE */}
                {project.image && (
                  <div className="project-image-wrapper">
                    <img
                      src={project.image}
                      alt={getLocal(project, 'title', i18n.language)}
                      className="project-image"
                      loading="lazy"
                      decoding="async"
                    />

                    <div className="project-overlay">
                      <div className="project-links">

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link-btn"
                            aria-label={`View live site for ${getLocal(project, 'title', i18n.language)}`}
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
                            aria-label={`View GitHub repository for ${getLocal(project, 'title', i18n.language)}`}
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
                    {getLocalizedCategory(project.category)}
                  </span>

                  <h3 className="card-title">{getLocal(project, 'title', i18n.language)}</h3>

                  <p className="card-description">
                    {getLocal(project, 'description', i18n.language)}
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
                  {projAchievements.length > 0 && (
                    <ul className="project-achievements">
                      {projAchievements.slice(0, 2).map((a, i) => (
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
                    onClick={() => trackProjectClick(project.id)}
                  >
                    {t("projects.viewDetails")}
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
                      aria-label={`GitHub repository for ${getLocal(project, 'title', i18n.language)}`}
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
                      aria-label={`Live site for ${getLocal(project, 'title', i18n.language)}`}
                    >
                      <ExternalLink className="icon-svg" />
                    </a>
                  )}

                </div>
              </Tilt>
            );
          })}
        </div>

        {/* EMPTY STATE */}
        {filteredProjects.length === 0 && (
          <div className="no-projects">
            <p>{t("projects.noProjects")}</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;