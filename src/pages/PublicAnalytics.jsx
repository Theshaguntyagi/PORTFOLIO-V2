import { useEffect, useState } from 'react';
import { Eye, Users, Globe2, MousePointerClick } from 'lucide-react';
import SEO from '../components/SEO';
import { projectsData } from '../data/projects';
import '../styles/Analytics.css';

// Public, no-auth transparency dashboard — a deliberately smaller subset of
// what the owner-only /admin analytics view shows. Deliberately excludes
// contactsCount (contact form submissions) and guestbookCount/chatbotQueries
// (internal usage detail) — this page shows only aggregate traffic numbers
// that are safe to publish, in the "build in public" spirit.
export default function PublicAnalytics() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { doc, getDoc } = await import('firebase/firestore');
        const { db } = await import('../firebase');
        const snap = await getDoc(doc(db, 'stats', 'global'));
        setData(snap.exists() ? snap.data() : {});
      } catch (e) {
        console.error('Public analytics fetch failed:', e);
        setError(true);
      }
    })();
  }, []);

  const topProjects = data?.projectClicks
    ? Object.entries(data.projectClicks)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([id, clicks]) => ({
          id,
          clicks,
          title: projectsData.find((p) => p.id === id)?.title || id,
        }))
    : [];

  const topLanguages = data?.languages
    ? Object.entries(data.languages).sort((a, b) => b[1] - a[1])
    : [];

  return (
    <>
      <SEO
        title="Public Analytics | Shagun Tyagi — Portfolio Traffic, Transparently"
        desc="Live, public traffic numbers for shaguntyagi.tech — visitors, page views, and the most-clicked projects. No sign-in required."
        path="/analytics"
        breadcrumb={[{ name: "Analytics", path: "/analytics" }]}
      />
      <div className="analytics-page container">
        <div className="analytics-header">
          <div className="analytics-top-meta">
            <div className="glow-badge">
              <span className="live-dot animate-pulse"></span>
              <span>Public — updates live</span>
            </div>
          </div>
          <h1 className="analytics-title">Portfolio Traffic, in the Open</h1>
          <p className="analytics-subtitle">
            No sign-in, no tracking dashboard behind a login — the same numbers this
            site's owner sees, minus a couple of internal-only counters.
          </p>
        </div>

        {error && <p className="auth-subtitle">Couldn't load live numbers right now — try again shortly.</p>}

        <div className="metrics-grid">
          <div className="metric-card glass-panel">
            <div className="metric-icon-wrapper blue"><Users size={20} /></div>
            <div className="metric-content">
              <span className="metric-label">Unique Visitors</span>
              {data ? (
                <h2 className="metric-value">{data.visitorCount ?? 0}</h2>
              ) : (
                <div className="skeleton" style={{ width: 60, height: 32, borderRadius: 6 }} />
              )}
            </div>
          </div>

          <div className="metric-card glass-panel">
            <div className="metric-icon-wrapper green"><Eye size={20} /></div>
            <div className="metric-content">
              <span className="metric-label">Page Views</span>
              {data ? (
                <h2 className="metric-value">{data.pageViews ?? 0}</h2>
              ) : (
                <div className="skeleton" style={{ width: 60, height: 32, borderRadius: 6 }} />
              )}
            </div>
          </div>

          <div className="metric-card glass-panel">
            <div className="metric-icon-wrapper purple"><MousePointerClick size={20} /></div>
            <div className="metric-content">
              <span className="metric-label">Project Clicks Tracked</span>
              {data ? (
                <h2 className="metric-value">{topProjects.reduce((sum, p) => sum + p.clicks, 0)}</h2>
              ) : (
                <div className="skeleton" style={{ width: 60, height: 32, borderRadius: 6 }} />
              )}
            </div>
          </div>

          <div className="metric-card glass-panel">
            <div className="metric-icon-wrapper orange"><Globe2 size={20} /></div>
            <div className="metric-content">
              <span className="metric-label">Languages Used</span>
              {data ? (
                <h2 className="metric-value">{topLanguages.length}</h2>
              ) : (
                <div className="skeleton" style={{ width: 60, height: 32, borderRadius: 6 }} />
              )}
            </div>
          </div>
        </div>

        {topProjects.length > 0 && (
          <div className="analytics-header" style={{ marginTop: '2rem' }}>
            <h2 className="analytics-title" style={{ fontSize: '1.25rem' }}>Most-Clicked Projects</h2>
            <div className="metrics-grid">
              {topProjects.map((p) => (
                <div className="metric-card glass-panel" key={p.id}>
                  <div className="metric-content">
                    <span className="metric-label">{p.title}</span>
                    <h2 className="metric-value">{p.clicks}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
