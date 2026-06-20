import { Helmet } from "react-helmet-async";

// Production URL (GitHub Pages project site). If you later move to a
// custom domain, change this AND vite.config.js `base` to "/".
const BASE = "https://shaguntyagi.tech";

const DEFAULT_TITLE = "Shagun Tyagi | AI/ML Engineer — Production AI Systems & Agent Orchestration";
const DEFAULT_DESC =
  "AI/ML Engineer building production AI systems (Envigo), autonomous agent architectures, and full-stack AI products. B.Tech CSE, published IoT/health-tech researcher. Based in Gurugram, India.";

export default function SEO({
  title = DEFAULT_TITLE,
  desc = DEFAULT_DESC,
  path = "/",
  image = "/profile.webp", // existing asset (was /images/og-image.jpg → 404)
  type = "website",
}) {
  const url = BASE + path;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />

      <link rel="canonical" href={url} />

      {/* OG */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={BASE + image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={BASE + image} />

      {/* Person JSON-LD Schema (Homepage Only) */}
      {path === "/" && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Shagun Tyagi",
            "url": "https://shaguntyagi.tech",
            "image": "https://shaguntyagi.tech/profile.webp",
            "jobTitle": "AI/ML Engineer",
            "worksFor": {
              "@type": "Organization",
              "name": "Envigo"
            },
            "alumniOf": {
              "@type": "CollegeOrUniversity",
              "name": "Meerut Institute of Engineering and Technology"
            },
            "sameAs": [
              "https://github.com/theshaguntyagi",
              "https://linkedin.com/in/theshaguntyagi"
            ]
          })}
        </script>
      )}
    </Helmet>
  );
}