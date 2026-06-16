// Single source of truth for what the AI assistant is allowed to talk about.
// Assembled from the site's own data so the bot only answers about Shagun,
// his work, skills, and contact details — and refuses everything else.

import { projectsData } from "./projects";
import { skills } from "./skills";
import { experienceData } from "./experience";
import { education } from "./education";
import { certifications } from "./certifications";
import { achievements } from "./achievements";

const BIO = `Shagun Tyagi is an AI/ML Engineer and Full Stack Developer.
He builds production-ready intelligent systems — generative-AI apps, data
pipelines, and scalable cloud-native web platforms (Python, React, Cloud, IoT).`;

const CONTACT = `Email: theshaguntyagi@gmail.com
Phone: +91 8445692029
Location: Delhi, India
GitHub: https://github.com/theshaguntyagi
LinkedIn: https://linkedin.com/in/theshaguntyagi
Twitter: https://twitter.com/shaguntyagi`;

function fmtSkills() {
  return Object.entries(skills)
    .map(([group, list]) => `- ${group}: ${list.join(", ")}`)
    .join("\n");
}

function fmtExperience() {
  return experienceData
    .map((e) => {
      const ach = e.achievements?.length ? ` Achievements: ${e.achievements.join("; ")}.` : "";
      return `- ${e.role} at ${e.company} (${e.duration}${e.location ? `, ${e.location}` : ""}). ${e.description || ""}${ach}`;
    })
    .join("\n");
}

function fmtEducation() {
  return education
    .map((ed) => `- ${ed.title}, ${ed.institute} (${ed.duration})${ed.extra ? ` — ${ed.extra}` : ""}`)
    .join("\n");
}

function fmtCerts() {
  return certifications
    .map((c) => `- ${c.title} by ${c.issuedBy || c.subtitle || ""} (${c.date || ""})`)
    .join("\n");
}

function fmtAchievements() {
  return achievements.map((a) => `- ${a.title} — ${a.subtitle}`).join("\n");
}

function fmtProjects() {
  return projectsData
    .map((p) => {
      const lines = [`- ${p.title}: ${p.description}`];
      if (p.technologies?.length) lines.push(`  Tech: ${p.technologies.join(", ")}`);
      if (p.problem) lines.push(`  Problem: ${p.problem}`);
      if (p.solution) lines.push(`  Solution: ${p.solution}`);
      if (p.results?.length) lines.push(`  Results: ${p.results.join("; ")}`);
      if (p.liveUrl && !p.liveUrl.includes("example.com")) lines.push(`  Live: ${p.liveUrl}`);
      if (p.githubUrl && !p.githubUrl.includes("yourusername")) lines.push(`  GitHub: ${p.githubUrl}`);
      return lines.join("\n");
    })
    .join("\n");
}

export function getPortfolioContext() {
  return `# ABOUT SHAGUN
${BIO}

# CONTACT
${CONTACT}

# SKILLS
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
