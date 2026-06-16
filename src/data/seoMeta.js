// Per-route SEO metadata (title + description).
// Drives the single global <SEO> in App.jsx so every page gets a
// unique title/description instead of a blank one.

const NAME = "Shagun Tyagi";

// Static routes -> metadata
const ROUTE_META = {
  "/": {
    title: `${NAME} | AI/ML Engineer & Full Stack Developer`,
    desc: "AI/ML Engineer and Full Stack Developer specializing in Python, IoT, and Cloud. Building scalable data-driven systems and intelligent applications.",
  },
  "/about": {
    title: `About | ${NAME}`,
    desc: "Background, education, skills, and certifications of Shagun Tyagi — AI/ML Engineer and Full Stack Developer.",
  },
  "/experience": {
    title: `Experience | ${NAME}`,
    desc: "Professional experience and career timeline of Shagun Tyagi across QA, AI internships, and engineering roles.",
  },
  "/projects": {
    title: `Projects | ${NAME}`,
    desc: "Selected projects by Shagun Tyagi — AI/ML systems, full-stack web apps, IoT, and cloud-native applications.",
  },
  "/testimonials": {
    title: `Testimonials | ${NAME}`,
    desc: "What colleagues and collaborators say about working with Shagun Tyagi.",
  },
  "/blog": {
    title: `Blog | ${NAME}`,
    desc: "Articles and tutorials on development, AI/ML, IoT, and technology by Shagun Tyagi.",
  },
  "/contact": {
    title: `Contact | ${NAME}`,
    desc: "Get in touch with Shagun Tyagi for collaboration, opportunities, or project work.",
  },
  "/now": {
    title: `Now | ${NAME}`,
    desc: "What Shagun Tyagi is focused on right now — current work, learning, and availability.",
  },
  "/uses": {
    title: `Uses | ${NAME}`,
    desc: "The tools, gear, and software Shagun Tyagi uses day to day.",
  },
};

// Prefix-based fallbacks for dynamic routes (e.g. /blog/:id)
const DYNAMIC_META = [
  { prefix: "/blog/", title: `Article | ${NAME}`, desc: "Read this article by Shagun Tyagi on development, AI/ML, and technology." },
  { prefix: "/project/", title: `Project | ${NAME}`, desc: "Project case study by Shagun Tyagi — problem, solution, stack, and results." },
  { prefix: "/certificate/", title: `Certificate | ${NAME}`, desc: "Verified certification earned by Shagun Tyagi." },
];

const DEFAULT_META = {
  title: `${NAME} | AI/ML Engineer & Full Stack Developer`,
  desc: "Portfolio of Shagun Tyagi — AI/ML Engineer and Full Stack Developer.",
};

export function getSeoMeta(pathname = "/") {
  if (ROUTE_META[pathname]) return ROUTE_META[pathname];
  const dyn = DYNAMIC_META.find((d) => pathname.startsWith(d.prefix));
  if (dyn) return { title: dyn.title, desc: dyn.desc };
  return DEFAULT_META;
}
