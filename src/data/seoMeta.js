// Per-route SEO metadata (title + description).
// Drives the single global <SEO> in App.jsx so every page gets a
// unique title/description instead of a blank one.

const NAME = "Shagun Tyagi";

// Static routes -> metadata
const ROUTE_META = {
  "/": {
    title: `${NAME} | AI/ML Engineer — LLM Agents & ML Pipelines`,
    desc: "Shagun Tyagi is an AI/ML Engineer building LLM agents, RAG pipelines, and ML microservices in production. Currently at Envigo (Gurugram). Open to freelance AI projects.",
  },
  "/about": {
    title: `About ${NAME} | AI/ML Engineer Based in Noida, India`,
    desc: "Learn about Shagun Tyagi — AI/ML Engineer at Envigo, ex-Airtel Software Engineer, published researcher (IJSRA 2024), B.Tech CSE + MBA. Specialising in LangChain, FastAPI, AWS, and OpenAI.",
  },
  "/experience": {
    title: `Experience | ${NAME}`,
    desc: "Career timeline of Shagun Tyagi — AI/ML Engineer at Envigo, Software Engineer at Airtel, internships at Trainity, Internship Studio, and Robust Results. 3+ years building production AI systems.",
  },
  "/projects": {
    title: `Projects | ${NAME} — LLM Agents, RAG, Computer Vision & More`,
    desc: "Production projects by Shagun Tyagi — PitchIQ (AI website auditor), LeadGen AI, Enterprise RAG Chatbot, FaceGuard attendance system, IoT health monitor, and Portfolio V2 with Gemini AI.",
  },
  "/testimonials": {
    title: `Testimonials | ${NAME}`,
    desc: "What colleagues, collaborators, and clients say about working with Shagun Tyagi — AI/ML Engineer and full-stack builder.",
  },
  "/blog": {
    title: `Blog | ${NAME} — AI, ML, LangChain & FastAPI Tutorials`,
    desc: "Articles and tutorials on LLM agents, RAG pipelines, FastAPI, LangChain, AWS, and production ML engineering by Shagun Tyagi.",
  },
  "/contact": {
    title: `Contact ${NAME} | AI/ML Engineer for Hire`,
    desc: "Get in touch with Shagun Tyagi for AI/ML consulting, freelance projects, or full-time opportunities. Based in Noida, India. Open to remote work.",
  },
  "/analytics": {
    title: `Live Portfolio Analytics | ${NAME}`,
    desc: "Real-time observation and observability metrics dashboard for Shagun Tyagi's portfolio site. Live database counters and SVG telemetry charts.",
  },
  "/now": {
    title: `Now | ${NAME}`,
    desc: "What Shagun Tyagi is focused on right now — current role at Envigo, ongoing MBA, open-source builds, and availability for consulting.",
  },
  "/uses": {
    title: `Uses | ${NAME} — Tools, Stack & Setup`,
    desc: "The tools, libraries, and setup Shagun Tyagi uses daily — Python, LangChain, FastAPI, AWS, Docker, React 19, and more.",
  },
  "/certifications": {
    title: `Certifications | ${NAME}`,
    desc: "Verified certifications earned by Shagun Tyagi — AWS Cloud Practitioner, Microsoft AZ-900, PL-900, Cisco CyberOps, CCNA, HackerRank Python & SQL.",
  },
  "/achievements": {
    title: `Achievements | ${NAME}`,
    desc: "Hackathon wins, research publications, and academic achievements of Shagun Tyagi — National Hackathon Winner, IJSRA published researcher, Health-A-Thon runner-up.",
  },
  "/research": {
    title: `Research | ${NAME} — IJSRA 2024 Published Author`,
    desc: "Peer-reviewed research by Shagun Tyagi on ECG/PPG-based IoT health monitoring published in IJSRA Vol. 12, No. 1, 2024. DOI: 10.30574/ijsra.2024.12.1.0781.",
  },
};

// Prefix-based fallbacks for dynamic routes (e.g. /blog/:id)
const DYNAMIC_META = [
  {
    prefix: "/blog/",
    title: `Article | ${NAME}`,
    desc: "Read this article by Shagun Tyagi on LLM agents, RAG pipelines, FastAPI, LangChain, and production ML engineering.",
  },
  {
    prefix: "/projects/",
    title: `Project | ${NAME}`,
    desc: "Project case study by Shagun Tyagi — problem, solution, tech stack, and measurable results.",
  },
  {
    prefix: "/certifications/",
    title: `Certificate | ${NAME}`,
    desc: "Verified certification earned by Shagun Tyagi — AWS, Microsoft Azure, Cisco, or HackerRank.",
  },
];

const DEFAULT_META = {
  title: `${NAME} | AI/ML Engineer — LLM Agents, RAG & ML Pipelines`,
  desc: "Portfolio of Shagun Tyagi — AI/ML Engineer specialising in LLM agents, RAG systems, FastAPI, LangChain, AWS, and production ML. Based in Noida, India.",
};

export function getSeoMeta(pathname = "/") {
  if (ROUTE_META[pathname]) return ROUTE_META[pathname];
  const dyn = DYNAMIC_META.find((d) => pathname.startsWith(d.prefix));
  if (dyn) return { title: dyn.title, desc: dyn.desc };
  return DEFAULT_META;
}