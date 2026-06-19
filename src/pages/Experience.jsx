import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { getLocal } from "../utils/translate";
import { experienceData } from "../data/experience";
import { MapPin, ArrowRight } from "lucide-react";
import { motion as Motion } from "framer-motion";
import "../styles/Experience.css";

export default function Experience() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("All");
  const timelineRef = useRef(null);

  const filtered =
    activeTab === "All"
      ? experienceData
      : experienceData.filter((e) => e.type === activeTab);

  /* ================= SCROLL PROGRESS ================= */
  useEffect(() => {
    const timeline = timelineRef.current;
    const progress = timeline?.querySelector(".timeline-progress");
    const cards = timeline?.querySelectorAll(".timeline-card");

    if (!timeline || !progress || !cards) return;

    let current = 0;
    let target = 0;

    const lerp = (a, b, t) => a + (b - a) * t;

    const update = () => {
      current = lerp(current, target, 0.08);
      progress.style.transform = `translateX(-50%) scaleY(${current})`;
      requestAnimationFrame(update);
    };

    const handleScroll = () => {
      const rect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = Math.max(0, windowHeight - rect.top);
      const total = rect.height + windowHeight;

      target = Math.max(0, Math.min(1, start / total));

      let closest = null;
      let minDistance = Infinity;

      cards.forEach((card) => {
        const r = card.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const distance = Math.abs(windowHeight / 2 - center);

        if (distance < minDistance) {
          minDistance = distance;
          closest = card;
        }
      });

      cards.forEach((c) => c.classList.remove("active"));
      if (closest) closest.classList.add("active");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    update();
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= CURSOR GLOW ================= */
  useEffect(() => {
    const cards = document.querySelectorAll(".timeline-card");

    const handleMove = (e, card) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--y", `${e.clientY - rect.top}px`);
    };

    cards.forEach((card) => {
      const move = (e) => handleMove(e, card);
      card.addEventListener("mousemove", move);
      card._cleanup = () => card.removeEventListener("mousemove", move);
    });

    return () => {
      cards.forEach((card) => card._cleanup && card._cleanup());
    };
  }, [filtered]);

  const tabLabels = {
    All: t("projects.all", "All"),
    Work: t("experience.work", "Work"),
    Education: t("experience.education", "Education"),
    Leadership: t("experience.leadership", "Leadership"),
    Research: t("experience.research", "Research")
  };

  return (
    <div className="experience-page">

      {/* HEADER */}
      <div className="section-title">
        <h2>{t("experience.title")}</h2>
        <p><b>{t("experience.subtitle")}</b></p>
      </div>

      {/* TABS */}
      <div className="tabs">
        {["All", "Work", "Education", "Leadership", "Research"].map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tabLabels[tab] || tab}
          </button>
        ))}
      </div>

      {/* TIMELINE */}
      <div className="timeline-wrapper">
        <div className="timeline" ref={timelineRef}>

          <div className="timeline-progress" />

          {filtered.map((exp, index) => {
            const isLeft = index % 2 === 0;
            const loc = getLocal(exp, 'location', i18n.language);
            const displayLoc = loc === "Remote" ? t("experience.remote", "Remote") : loc;

            return (
              <Motion.div
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* DOT */}
                <div className="timeline-dot" />

                {/* CONNECTOR */}
                <svg
                  className={`timeline-connector ${
                    isLeft ? "left" : "right"
                  }`}
                  viewBox="0 0 200 100"
                >
                  <path
                    d={
                      isLeft
                        ? "M200 50 C150 50, 100 0, 0 0"
                        : "M0 50 C50 50, 100 0, 200 0"
                    }
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="2"
                    />
                </svg>

                {/* CARD */}
                <div className={`timeline-card ${isLeft ? "left" : "right"}`}>

                  <div className="card-header">
                    <h3 className="role">{getLocal(exp, 'role', i18n.language)}</h3>
                    <p className="company">{getLocal(exp, 'company', i18n.language)}</p>
                    <span className="duration">{exp.duration}</span>
                  </div>

                  <div className="card-meta">
                    <MapPin size={14} /> {displayLoc || t("experience.remote", "Remote")}
                  </div>

                  <div className="card-body">
                    <p className="desc">{getLocal(exp, 'description', i18n.language)}</p>

                    <div className="divider" />

                    <h4>{t("experience.achievementsHeader", "Key Achievements")}</h4>

                    <ul className="achievements">
                      {(getLocal(exp, 'achievements', i18n.language) || []).map((a, i) => (
                        <li key={i}>
                          <ArrowRight size={14} /> {a}
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </Motion.div>
            );
          })}

        </div>
      </div>
    </div>
  );
}