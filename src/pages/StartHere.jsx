import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import '../styles/NowUses.css';

export default function StartHere() {
  const blocks = [
    {
      title: 'New here? Start with these',
      items: [
        { to: '/about', label: 'About — who I am, background, and how I got into AI/ML' },
        { to: '/projects', label: 'Projects — production systems I\'ve built, with problem/solution/results' },
        { to: '/experience', label: 'Experience — my career timeline from intern to AI/ML Engineer' },
      ],
    },
    {
      title: 'Want to read what I write',
      items: [
        { to: '/blog', label: 'Blog — AI/ML engineering, RAG, and production system notes' },
        { to: '/changelog', label: 'Changelog — a real, git-generated log of changes to this site' },
      ],
    },
    {
      title: 'Want to work together',
      items: [
        { to: '/contact', label: 'Contact — reach out for consulting, freelance, or full-time roles' },
        { to: '/testimonials', label: 'Testimonials — what past collaborators say' },
      ],
    },
    {
      title: 'Curious about the details',
      items: [
        { to: '/uses', label: 'Uses — the tools and setup I use daily' },
        { to: '/colophon', label: 'Colophon — how this site itself is built' },
        { to: '/now', label: 'Now — what I\'m currently focused on' },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="Start Here | Shagun Tyagi"
        desc="New to this site? Here's where to go first, depending on what you're looking for."
        path="/start-here"
        breadcrumb={[{ name: 'Start Here', path: '/start-here' }]}
      />
      <section className="nowuses-page section section-lg">
        <div className="container nowuses-inner">
          <div className="section-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>
            <h2>Start Here</h2>
          </div>
          <span className="nowuses-updated">A map, if this is your first visit</span>

          {blocks.map((b) => (
            <div className="nowuses-block" key={b.title}>
              <h3><span className="dot" /> {b.title}</h3>
              <ul className="nowuses-list">
                {b.items.map((it) => (
                  <li key={it.to}>
                    <Link to={it.to} style={{ color: 'inherit' }}>{it.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
