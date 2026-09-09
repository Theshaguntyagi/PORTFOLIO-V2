import { Helmet } from "react-helmet-async";

// Production URL (custom domain).
const BASE = "https://shaguntyagi.tech";

const DEFAULT_TITLE = "Shagun Tyagi | AI/ML Engineer — Production AI Systems & Agent Orchestration";
const DEFAULT_DESC =
  "AI/ML Engineer building production AI systems (Envigo), autonomous agent architectures, and full-stack AI products. B.Tech CSE, published IoT/health-tech researcher. Based in Gurugram, India.";

/**
 * @param {boolean} noindex - Set true for private/utility routes (admin, previews)
 *   that should never appear in search results. Renders `noindex, nofollow`.
 * @param {Array<{name:string, path:string}>} breadcrumb - Ordered list of
 *   {name, path} pairs for BreadcrumbList JSON-LD. Omit on the homepage.
 * @param {string} speakableSelector - Comma-separated CSS selectors for the
 *   Speakable schema (voice-assistant readable region), e.g.
 *   ".blog-title, .blog-excerpt".
 *
 * NOTE: Person/ProfilePage JSON-LD lives in index.html only (static, so it's
 * present even for non-JS crawlers/social scrapers on first paint). It is
 * intentionally NOT duplicated here — Helmet previously injected a second
 * Person block on "/", producing two conflicting Person schemas on the same
 * page, which is invalid per Schema.org and confuses rich-result parsing.
 */
export default function SEO({
  title = DEFAULT_TITLE,
  desc = DEFAULT_DESC,
  path = "/",
  image = "/og-image.jpg",
  type = "website",
  noindex = false,
  breadcrumb = null,
  speakableSelector = null,
}) {
  const url = BASE + path;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"} />

      <link rel="canonical" href={url} />

      {/* OG */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={BASE + image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={BASE + image} />

      {/* BreadcrumbList JSON-LD — pass e.g. [{name:"Blog", path:"/blog"}, {name:"Post Title", path:"/blog/slug"}] */}
      {breadcrumb && breadcrumb.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: BASE + "/" },
              ...breadcrumb.map((b, i) => ({
                "@type": "ListItem",
                position: i + 2,
                name: b.name,
                item: BASE + b.path,
              })),
            ],
          })}
        </script>
      )}

      {/* Speakable JSON-LD — for voice assistants reading article summaries */}
      {speakableSelector && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            url,
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: speakableSelector.split(",").map((s) => s.trim()),
            },
          })}
        </script>
      )}
    </Helmet>
  );
}
