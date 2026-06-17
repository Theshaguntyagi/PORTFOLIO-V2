// Single source of truth for what the AI assistant is allowed to talk about.
// Assembled from the site's own data so the bot only answers about Shagun,
// his work, skills, and contact details — and refuses everything else.

import { projectsData } from "./projects";
import { skills } from "./skills";
import { experienceData } from "./experience";
import { education } from "./education";
import { certifications } from "./certifications";
import { achievements } from "./achievements";

const BIO = `Shagun Tyagi is an AI/ML Engineer based in Noida, India.
He builds production-ready intelligent systems — LLM agents, RAG pipelines,
ML-powered APIs, and full-stack cloud-native platforms.
Stack: Python · LangChain · FastAPI · React 19 · AWS · Azure · Docker · TensorFlow · OpenCV.
Currently at Envigo (Gurugram) architecting AI-driven SEO intelligence systems.
Previously at Airtel, shipping FastAPI microservices and Python automation at scale.
Published researcher in ECG/PPG-based health monitoring (IJSRA 2024).
Pursuing an MBA at Chandigarh University alongside his engineering career.`;

const CONTACT = `Email: theshaguntyagi@gmail.com
Phone: +91 8445692029
Location: Noida, Uttar Pradesh, India
GitHub: https://github.com/theshaguntyagi
LinkedIn: https://linkedin.com/in/theshaguntyagi
Instagram: https://instagram.com/theshaguntyagi
Twitter: https://twitter.com/theshaguntyagi`;

const AVAILABILITY = `Open to: senior ML engineering roles, AI product builds, and consulting engagements.
For collaborations or consulting, reach out at theshaguntyagi@gmail.com.`;

function fmtSkills() {
  return Object.entries(skills)
    .map(([group, list]) => `- ${group}: ${Array.isArray(list) ? list.join(", ") : list}`)
    .join("\n");
}

function fmtExperience() {
  return experienceData
    .map((e) => {
      const parts = [`- ${e.role} at ${e.company} (${e.duration}${e.location ? `, ${e.location}` : ""})`];
      if (e.description) parts.push(`  ${e.description}`);
      if (e.achievements?.length) parts.push(`  Key wins: ${e.achievements.join("; ")}`);
      if (e.stack) parts.push(`  Stack: ${e.stack}`);
      return parts.join("\n");
    })
    .join("\n");
}

function fmtEducation() {
  return education
    .map((ed) => {
      const extra = ed.extra ? ` — ${ed.extra}` : "";
      return `- ${ed.title}, ${ed.institute} (${ed.duration})${extra}`;
    })
    .join("\n");
}

function fmtCerts() {
  return certifications
    .map((c) => {
      const issuer = c.issuedBy || c.subtitle || "";
      const date = c.date ? ` (${c.date})` : "";
      return `- ${c.title}${issuer ? ` by ${issuer}` : ""}${date}`;
    })
    .join("\n");
}

function fmtAchievements() {
  return achievements
    .map((a) => `- ${a.title}${a.subtitle ? ` — ${a.subtitle}` : ""}`)
    .join("\n");
}

function fmtProjects() {
  return projectsData
    .map((p) => {
      const lines = [`### ${p.title}`];
      lines.push(p.description);
      if (p.technologies?.length) lines.push(`Tech: ${p.technologies.join(", ")}`);
      if (p.problem) lines.push(`Problem: ${p.problem}`);
      if (p.solution) lines.push(`Solution: ${p.solution}`);
      if (p.overview) lines.push(`Overview: ${p.overview}`);
      if (p.results?.length) lines.push(`Results: ${p.results.join("; ")}`);
      if (p.achievements?.length) lines.push(`Highlights: ${p.achievements.join("; ")}`);
      if (p.liveUrl) lines.push(`Live demo: ${p.liveUrl}`);
      if (p.githubUrl) lines.push(`GitHub: ${p.githubUrl}`);
      return lines.join("\n");
    })
    .join("\n\n");
}

export function getPortfolioContext() {
  return `You are Shagun's AI portfolio assistant. You answer questions about Shagun Tyagi — his work, projects, skills, experience, education, and how to contact him. If someone asks about anything unrelated to Shagun or his professional profile, politely decline and redirect them.

# ABOUT SHAGUN
${BIO}

# CONTACT & AVAILABILITY
${CONTACT}

${AVAILABILITY}

# TECHNICAL SKILLS
${fmtSkills()}

# EXPERIENCE
${fmtExperience()}

# EDUCATION
${fmtEducation()}

# CERTIFICATIONS
${fmtCerts()}

# ACHIEVEMENTS
${fmtAchievements()}

# PROJECTS
${fmtProjects()}`;
}