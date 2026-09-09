import { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import '../styles/NowUses.css';

export default function Changelog() {
  const [entries, setEntries] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}changelog.json`)
      .then((r) => r.json())
      .then(setEntries)
      .catch(() => setEntries([]));
  }, []);

  return (
    <>
      <SEO
        title="Changelog | Shagun Tyagi — Build Log for This Site"
        desc="A real, git-generated log of changes to shaguntyagi.tech — not hand-written marketing copy."
        path="/changelog"
        breadcrumb={[{ name: 'Changelog', path: '/changelog' }]}
      />
      <section className="nowuses-page section section-lg">
        <div className="container nowuses-inner">
          <div className="section-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>
            <h2>Changelog</h2>
          </div>
          <span className="nowuses-updated">
            Generated from real commit history — not a curated highlight reel
          </span>

          <div className="nowuses-block">
            <ul className="nowuses-list">
              {entries === null && <li>Loading…</li>}
              {entries?.length === 0 && <li>No entries yet.</li>}
              {entries?.map((e, i) => (
                <li key={i}>
                  <span style={{ color: 'var(--muted-foreground)', marginRight: '0.6rem' }}>
                    {e.date}
                  </span>
                  {e.summary}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
