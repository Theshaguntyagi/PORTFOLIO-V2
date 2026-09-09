import SEO from '../components/SEO';
import '../styles/NowUses.css';

export default function Colophon() {
  const blocks = [
    {
      title: 'Stack',
      items: [
        'React 19 + Vite (rolldown-vite) for the frontend.',
        'Firebase (Firestore, Auth, Cloud Messaging) for data, auth, and push notifications.',
        'Framer Motion for animation, react-syntax-highlighter (async-light build) for code blocks.',
        'react-i18next for English / Hindi / Spanish translations.',
      ],
    },
    {
      title: 'Hosting & Deployment',
      items: [
        'Static build deployed to GitHub Pages via gh-pages, on a custom domain (shaguntyagi.tech).',
        'Build-time scripts generate the sitemap, RSS feed, and JSON Resume from the same data that drives the pages — so they can\'t drift out of sync.',
        'Physical per-route HTML is pre-generated at build time (not just a client-side router) so crawlers get a real 200 response on every URL.',
      ],
    },
    {
      title: 'Type & Design',
      items: [
        'Inter, DM Sans, and Syne — self-hosted, subset to Latin/Latin-Extended only (the site is English/Hindi/Spanish; unused Cyrillic/Greek/Vietnamese glyphs were cut).',
        'Dark and light themes via CSS custom properties, toggleable from the navbar.',
      ],
    },
    {
      title: 'Why a Colophon',
      items: [
        'Because the build choices are half the story of a portfolio, and most sites never say what they\'re actually made of.',
      ],
    },
  ];

  return (
    <>
      <SEO
        title="Colophon | Shagun Tyagi — How This Site Is Built"
        desc="The stack, hosting setup, and type choices behind shaguntyagi.tech."
        path="/colophon"
        breadcrumb={[{ name: 'Colophon', path: '/colophon' }]}
      />
      <section className="nowuses-page section section-lg">
        <div className="container nowuses-inner">
          <div className="section-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>
            <h2>Colophon</h2>
          </div>
          <span className="nowuses-updated">How this site is built</span>

          {blocks.map((b) => (
            <div className="nowuses-block" key={b.title}>
              <h3><span className="dot" /> {b.title}</h3>
              <ul className="nowuses-list">
                {b.items.map((it, i) => <li key={i}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
