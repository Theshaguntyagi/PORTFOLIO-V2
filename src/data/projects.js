// ⚠️ Replace placeholder content + URLs (example.com / yourusername) with your real
// project details. Each project supports a case-study layout on /project/:id via these
// optional fields: problem, solution, overview, results[], achievements[], futureWork.
// The "Portfolio Website" entry below is filled in as a template — copy its shape.

export const projectsData = [
  {
    id: "ecommerce",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce application with payment integration, user authentication, and admin panel.",
    category: "web",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&fm=webp&q=72",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/ecommerce",
    overview: "Built scalable commerce system with secure payments...",
    achievements: [
      "Handled 10k+ users",
      "Integrated Stripe payments",
      "Admin dashboard with analytics"
    ]
  },
  {
    id: "smart-home",
    title: "IoT Smart Home System",
    description: "IoT-based smart home automation system with mobile app control and real-time monitoring.",
    category: "iot",
    technologies: ["Arduino", "Python", "MQTT", "React Native", "Firebase"],
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&fm=webp&q=72",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/smart-home"
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    description: "Personal portfolio website showcasing projects, skills, and blog posts with modern UI/UX.",
    category: "web",
    technologies: ["React", "Vite", "CSS3", "React Router", "Firebase"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&fm=webp&q=72",
    liveUrl: "https://theshaguntyagi.github.io/PORTFOLIO-V2/",
    githubUrl: "https://github.com/theshaguntyagi/PORTFOLIO-V2",
    // ----- Case-study template (edit these for your real story) -----
    problem:
      "I needed a fast, recruiter-friendly home on the web that loads quickly, ranks on search, and lets visitors reach me — without paying for a managed CMS or backend.",
    solution:
      "Built a React + Vite single-page app deployed on GitHub Pages, with Firebase for the blog/contact data, an OpenAI-backed chat assistant, per-route SEO, and a unified design system.",
    overview:
      "A modern, animated portfolio with a theme system, blog, project case studies, and an AI assistant — all on a free static host.",
    results: [
      "Cut the largest media payload ~90% by compressing background videos",
      "Per-page SEO + clean URLs for search indexing",
      "Reusable component/design tokens for consistent UI"
    ],
    futureWork:
      "Add prerendering for richer link previews, a newsletter, and analytics-driven A/B tests on the hero CTAs."
  },
  {
    id: "analytics",
    title: "Data Analytics Dashboard",
    description: "Interactive dashboard for visualizing complex datasets with real-time updates.",
    category: "data",
    technologies: ["Python", "Dash", "Plotly", "Pandas", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&fm=webp&q=72",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/analytics"
  }
];
