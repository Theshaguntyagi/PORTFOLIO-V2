import { Helmet } from "react-helmet-async";

// Production URL (GitHub Pages project site). If you later move to a
// custom domain, change this AND vite.config.js `base` to "/".
const BASE = "https://theshaguntyagi.github.io/PORTFOLIO-V2";

const DEFAULT_TITLE = "Shagun Tyagi | AI/ML Engineer & Full Stack Developer";
const DEFAULT_DESC =
  "Portfolio of Shagun Tyagi — AI/ML Engineer and Full Stack Developer.";

export default function SEO({
  title = DEFAULT_TITLE,
  desc = DEFAULT_DESC,
  path = "/",
  image = "/profile.png", // existing asset (was /images/og-image.jpg → 404)
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
    </Helmet>
  );
}