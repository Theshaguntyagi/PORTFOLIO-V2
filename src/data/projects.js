import leadgenAi from '../assets/projects/LEADGEN.png';
import codebook from '../assets/projects/CODEBOOK.png';
import icd10 from '../assets/projects/ICD-10.png';
import catchmaster from '../assets/projects/CATCHMASTER.png';
import chatbot from '../assets/projects/CHATBOT.png';
import faceguard from '../assets/projects/FACEGUARD.png';
import health from '../assets/projects/HEALTH.png';
import mario from '../assets/projects/MARIO.png';
import PITCHIQ from '../assets/projects/PITCHIQ.png';
import Snake from '../assets/projects/SNAKE.png';
import Portfolio from '../assets/projects/PORTFOLIO.png';

export const projectsData = [
  {
    id: "pitchiq",
    title: "PitchIQ — AI Website Auditing & Lead Intelligence",
    description:
      "Full-stack AI platform that crawls any website, runs automated SEO, Core Web Vitals, accessibility, and content audits, then emails personalized reports — a self-running lead generation engine.",
    category: "ai",
    technologies: ["Python", "OpenAI", "Playwright", "MongoDB", "Email Automation"],
    image: PITCHIQ,
    liveUrl: null,
    githubUrl: "",
    problem: "Manual website audits take hours and can't scale for cold outreach to hundreds of prospects.",
    solution: "Automated the full pipeline: crawl → AI audit → GPT synthesis → personalized email delivery with zero manual steps.",
    overview: "PitchIQ ingests any URL, runs structured audits, uses GPT to generate plain-English action items, stores results in MongoDB for trend tracking, and auto-sends reports to business owners.",
    results: [
      "Audit turnaround reduced from hours to minutes",
      "Personalized outreach at scale — zero manual effort per lead",
      "MongoDB persistence enables multi-run trend comparison per client"
    ]
  },
  {
    id: "leadgen-ai",
    title: "LeadGen AI — Google Maps Lead Generation Engine ",
    description:
      "End-to-end system that scrapes Google Maps for targeted businesses, enriches each lead with AI-generated personalized outreach emails, scores prospects by quality, and sends campaigns autonomously.",
    category: "ai",
    technologies: ["Python", "OpenAI", "Playwright", "MongoDB", "SMTP Automation"],
    image: leadgenAi,
    liveUrl: null,
    githubUrl: "",
    problem: "Cold email campaigns use generic templates that get ignored. Manual lead research doesn't scale.",
    solution: "GPT analyzes each lead's website and writes contextual outreach referencing their specific pain points; a scoring module prioritizes high-value targets.",
    overview: "Playwright scrapes Google Maps by niche + location, extracts contact details, GPT writes personalized emails per lead, leads are scored and stored in MongoDB with CSV export.",
    results: [
      "Replaced generic blasts with context-specific messaging per lead",
      "Lead scoring layer prioritizes highest-value prospects",
      "Full search-to-sent pipeline with zero manual steps"
    ]
  },
  {
    id: "enterprise-rag",
    title: "Enterprise RAG Chatbot — Multi-Document AI Knowledge System ",
    description:
      "Production-grade RAG system that ingests PDFs, Word docs, and SOPs into a FAISS/ChromaDB vector store for millisecond semantic retrieval with citation-backed, hallucination-free answers.",
    category: "ai",
    technologies: ["Python", "OpenAI", "LangChain", "FAISS", "ChromaDB", "MongoDB"],
    image: chatbot,
    liveUrl: null,
    githubUrl: "",
    problem: "Enterprise teams waste hours searching internal docs. Generic chatbots hallucinate and can't cite sources.",
    solution: "LangChain QA pipeline with FAISS/ChromaDB retrieval returns answers with exact source + page references. ConversationBufferWindowMemory preserves multi-turn context.",
    overview: "Upload PDFs, Word docs, SOPs — the system chunks, embeds, and indexes them. Non-technical users get a queryable AI assistant operational in under 60 seconds.",
    results: [
      "Millisecond semantic retrieval across large internal document libraries",
      "Citation-backed answers eliminate hallucinations",
      "Knowledge base queryable in under 60 seconds after upload"
    ]
  },
  {
    id: "faceguard",
    title: "FaceGuard — Real-Time Facial Recognition Attendance",
    description:
      "Real-time facial recognition attendance system using ArcFace embeddings with sub-second identification, multi-threaded OpenCV video, auto Present/Late/Absent classification, and an admin desktop dashboard.",
    category: "ai",
    technologies: ["Python", "OpenCV", "DeepFace", "ArcFace", "SQLite", "Tkinter"],
    image: faceguard,
    liveUrl: null,
    githubUrl: "https://github.com/Theshaguntyagi/FaceGuard-Attendance",
    problem: "Manual attendance is slow, error-prone, and gameable. Most OSS solutions fail under real-world lighting and occlusions.",
    solution: "ArcFace embeddings + multi-threaded OpenCV ensure smooth real-time performance. Configurable thresholds auto-classify attendance status.",
    overview: "Live camera feed → ArcFace recognition → auto classification → SQLite persistence → exportable reports. Admin dashboard for face registration and log management.",
    results: [
      "Sub-second identification across varied lighting and partial occlusions",
      "Recognition and UI on separate threads — no frame drops",
      "No command-line knowledge required for administrators"
    ]
  },
  {
    id: "mario-in-python",
    title: "Mario in Python — WebAssembly Pygame Port",
    description:
      "Pygame platformer ported to WebAssembly via Pygbag and deployed on GitHub Pages, with mobile touch D-pad, SharedArrayBuffer COOP/COEP fix, async game loop rewrite, and a Windows EXE build.",
    category: "web",
    technologies: ["Python", "Pygame", "Pygbag", "WebAssembly", "GitHub Pages"],
    image: mario,
    liveUrl: "",
    githubUrl: "https://github.com/Theshaguntyagi/Mario-in-Python",
    problem: "Pygame games run locally only — no way to share a playable demo without asking people to install Python.",
    solution: "Rewrote the blocking game loop to async/await for Pygbag WASM, fixed COOP/COEP headers with coi-serviceworker.js, added mobile touch D-pad overlay with keyboard event bridge.",
    overview: "Full Mario-style platformer playable in browser via WebAssembly. Also ships as a Windows EXE via PyInstaller. Mobile touch controls overlay runs on any device.",
    results: [
      "Zero-install play in browser — shareable via URL",
      "Mobile touch D-pad with keyboard event bridge",
      "Windows EXE packaged for offline distribution"
    ]
  },
  {
    id: "catch-master",
    title: "CATCH-MASTER — Adaptive AI Arcade Game",
    description:
      "Adaptive AI arcade game where difficulty scales in real time based on player performance — an opponent that learns your reflexes and gets harder as you improve.",
    category: "web",
    technologies: ["Python", "Pygame", "AI", "Adaptive Difficulty"],
    image: catchmaster,
    liveUrl: "https://theshaguntyagi.github.io/CATCH-MASTER/",
    githubUrl: "https://github.com/Theshaguntyagi/CATCH-MASTER",
    overview: "Arcade-style catch game with an AI system that tracks player reaction time and accuracy to dynamically scale speed, spawn rate, and pattern complexity.",
    results: [
      "Adaptive difficulty keeps experienced players engaged",
      "AI tracks player reaction time and accuracy in real time",
      "Scales from beginner to expert without manual level selection"
    ]
  },
  {
    id: "icd10-ai-coder",
    title: "ICD-10 AI Coder — Medical Coding Automation",
    description:
      "AI-powered medical coding assistant using Claude and GPT-4o to automate ICD-10 code assignment from clinical notes, reducing manual coding time for HCC risk adjustment workflows.",
    category: "ai",
    technologies: ["Python", "Claude API", "GPT-4o", "ICD-10", "NLP"],
    image: icd10,
    liveUrl: "https://theshaguntyagi.github.io/ICD-10/",
    githubUrl: "https://github.com/Theshaguntyagi/ICD-10",
    overview: "Parses clinical notes and maps diagnoses to accurate ICD-10 codes using LLM reasoning, designed for HCC risk adjustment and medical billing workflows.",
    results: [
      "Automates high-effort manual coding from unstructured clinical text",
      "Dual-model validation using Claude + GPT-4o for accuracy",
      "Designed for HCC risk adjustment and revenue cycle workflows"
    ]
  },
  {
    id: "iot-health-monitor",
    title: "IoT Health Monitoring System — Published Research",
    description:
      "Wearable-grade Raspberry Pi health monitor capturing real-time heart rate and SpO2 via PPG sensors, with ML anomaly detection, Firebase alerts, and a React Native mobile app. Published IJSRA 2024.",
    category: "iot",
    technologies: ["Python", "Raspberry Pi", "Scikit-Learn", "Firebase", "React Native"],
    image: health,
    liveUrl: null,
    githubUrl: "https://github.com/Theshaguntyagi/HEALTH-MONITORING-SYSTEM",
    problem: "Continuous cardiac and SpO2 monitoring at home is expensive and lacks proactive alerting.",
    solution: "Raspberry Pi processes PPG signals in real time; Scikit-Learn models detect early cardiac stress and desaturation; Firebase pushes emergency alerts to caregivers instantly.",
    overview: "IoT device → real-time PPG signal processing → ML anomaly classification → Firebase alert → React Native caregiver app. Research published IJSRA Vol. 12, No. 1, 2024.",
    results: [
      "Proactive alerts before conditions become critical",
      "Real-time SpO2 and heart rate with ML classification",
      "Emergency notifications to caregivers via React Native"
    ],
    achievements: [
      "Peer-reviewed: IJSRA 2024 (DOI: 10.30574/ijsra.2024.12.1.0781)",
      "End-to-end from raw physiological signal to mobile alert"
    ]
  },
  {
    id: "portfolio-v2",
    title: "Portfolio V2 — Full-Stack Personal Brand Platform",
    description:
      "Production portfolio with a Three.js 3D environment, Gemini AI conversational assistant trained on a custom context prompt, per-route SEO, and Firebase Cloud Functions — deployed on GitHub Pages via CI/CD.",
    category: "web",
    technologies: ["React 19", "Three.js", "Vite", "Firebase", "Gemini AI", "Framer Motion"],
    image: Portfolio,
    liveUrl: "https://shaguntyagi.tech/",
    githubUrl: "https://github.com/theshaguntyagi/PORTFOLIO-V2",
    problem: "Most developer portfolios look identical. Recruiters skim and bounce — no way to explore deeper without navigating away.",
    solution: "Interactive Three.js 3D hero differentiates on first load; Gemini AI assistant lets visitors ask about experience and projects and get real answers.",
    overview: "React 19 + Vite SPA with custom WebGL shaders, Framer Motion animations, AI chat on SHAGUN_CONTEXT, JSON-LD SEO, and Firebase Functions + Firestore backend.",
    results: [
      "AI assistant handles recruiter questions about projects in real time",
      "Structured JSON-LD + Open Graph for search and social indexing",
      "CI/CD on every push to main via GitHub Actions"
    ],
    futureWork: "Add prerendering for richer link previews, newsletter, and analytics-driven A/B tests on hero CTAs."
  },
  {
    id: "resumebook",
    title: "RESUMEBOOK — CSS 3D Page-Flip Portfolio Book",
    description:
      "Interactive portfolio presented as a CSS 3D page-flip book with dark/light mode, skills radar chart, project thumbnails, live demo links, and smooth page transitions — deployed on GitHub Pages.",
    category: "web",
    technologies: ["HTML", "CSS3", "JavaScript", "GitHub Pages"],
    image: codebook,
    liveUrl: "https://theshaguntyagi.github.io/RESUMEBOOK/",
    githubUrl: "https://github.com/theshaguntyagi/RESUMEBOOK",
    overview: "A resume presented as a realistic 3D flip-book in the browser. Features dark/light mode toggle, animated page turns, skills radar chart, and project cards with live demo and GitHub links.",
    results: [
      "Distinctive recruiter experience — resume as interactive 3D book",
      "Dark/light mode toggle with smooth theme transitions",
      "Skills radar chart and project thumbnails with live links"
    ]
  },
  {
    id: "snakegame",
    title: "Snake Game",
    description:
      "Classic Snake game built with vanilla HTML, CSS, and JavaScript — playable in browser with arrow key controls, score tracking, and responsive design.",
    category: "web",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: Snake,
    liveUrl: "https://theshaguntyagi.github.io/Snakegame",
    githubUrl: "https://github.com/Theshaguntyagi/Snakegame",
    overview: "A browser-based Snake game with arrow key controls, real-time score tracking, and responsive layout. Built entirely with vanilla JS — no frameworks, no dependencies beyond Font Awesome.",
    results: [
      "Zero-dependency implementation in vanilla HTML/CSS/JS",
      "Responsive design works across screen sizes",
      "Live playable demo on GitHub Pages"
    ]
  }
];