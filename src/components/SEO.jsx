import { Helmet } from "react-helmet-async";

const BASE = "https://shaguntyagi.com";

export default function SEO({
  title,
  desc,
  path,
  image = "/images/og-image.jpg",
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