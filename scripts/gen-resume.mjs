// Generates public/resume.json following the JSON Resume schema
// (https://jsonresume.org/schema/) from the same data files that drive the
// About/Experience pages, so the two never drift out of sync. Runs at
// prebuild alongside gen-sitemap.mjs / gen-rss.mjs.
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { experienceData } from '../src/data/experience.js';
import { education } from '../src/data/education.js';
import { skills } from '../src/data/skills.js';

// NOTE: certifications.js and achievements.js are intentionally NOT imported
// here — they import .webp assets via Vite-style `import X from '...webp'`,
// which plain Node ESM (this script runs outside Vite, at prebuild time)
// can't resolve. Rather than duplicate that data as a hand-maintained copy
// here (which would drift from the About page), those sections are simply
// omitted from resume.json. work/education/skills below are unaffected.

const __dirname = dirname(fileURLToPath(import.meta.url));

const MONTHS = {
  jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
  jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
};

// Best-effort "Mon YYYY" -> "YYYY-MM" conversion. Falls back to leaving the
// raw string in `summary` when the format doesn't match — better to show a
// slightly-off machine date than silently drop the role.
function parseDuration(duration = '') {
  const parts = duration.split(/[–-]/).map((s) => s.trim());
  const toIso = (s) => {
    if (!s || /present/i.test(s)) return undefined;
    const m = /^([A-Za-z]{3})[a-z]*\.?\s+(\d{4})$/.exec(s);
    if (!m) return undefined;
    const mon = MONTHS[m[1].toLowerCase()];
    return mon ? `${m[2]}-${mon}` : undefined;
  };
  return {
    startDate: toIso(parts[0]),
    endDate: parts[1] ? toIso(parts[1]) : undefined,
  };
}

function buildResume() {
  const work = experienceData
    .filter((e) => e.type === 'Work')
    .map((e) => {
      const { startDate, endDate } = parseDuration(e.duration);
      return {
        name: e.company,
        position: e.role,
        location: e.location,
        startDate,
        endDate,
        summary: e.description,
        highlights: e.achievements || [],
      };
    });

  const educationEntries = education.map((ed) => {
    const { startDate, endDate } = parseDuration(ed.duration);
    return {
      institution: ed.institute,
      area: ed.title,
      studyType: ed.title,
      startDate,
      endDate,
      location: ed.location,
    };
  });

  const skillsArr = Object.entries(skills).map(([category, keywords]) => ({
    name: category,
    keywords,
  }));

  const resume = {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/master/schema.json',
    basics: {
      name: 'Shagun Tyagi',
      label: 'AI/ML Engineer',
      email: 'theshaguntyagi@gmail.com',
      url: 'https://shaguntyagi.tech',
      summary:
        'AI/ML Engineer building production AI systems (Envigo), autonomous agent architectures, and full-stack AI products. B.Tech CSE (IoT), published IoT/health-tech researcher (IJSRA 2024).',
      location: {
        city: 'Gurugram',
        countryCode: 'IN',
      },
      profiles: [
        { network: 'GitHub', username: 'theshaguntyagi', url: 'https://github.com/theshaguntyagi' },
        { network: 'LinkedIn', username: 'theshaguntyagi', url: 'https://linkedin.com/in/theshaguntyagi' },
      ],
    },
    work,
    education: educationEntries,
    skills: skillsArr,
    meta: {
      canonical: 'https://shaguntyagi.tech/resume.json',
      version: '1.0.0',
      lastModified: new Date().toISOString(),
    },
  };

  const pub = join(__dirname, '..', 'public');
  mkdirSync(pub, { recursive: true });
  writeFileSync(join(pub, 'resume.json'), JSON.stringify(resume, null, 2));
  console.log(`✓ Generated resume.json (${work.length} roles, ${educationEntries.length} education entries)`);
}

buildResume();
