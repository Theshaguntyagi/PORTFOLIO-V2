import { useEffect, useState } from 'react';
import { Star, GitFork, Users, FolderGit2 } from 'lucide-react';
import '../styles/GitHubStats.css';

const USER = 'theshaguntyagi';

export default function GitHubStats() {
  const [stats, setStats] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [uRes, rRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USER}`),
          fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`),
        ]);
        if (!uRes.ok || !rRes.ok) throw new Error('gh');
        const user = await uRes.json();
        const repos = await rRes.json();
        const stars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
        const forks = repos.reduce((s, r) => s + (r.forks_count || 0), 0);
        const top = [...repos]
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 3);
        if (!cancelled) {
          setStats({
            repos: user.public_repos,
            followers: user.followers,
            stars,
            forks,
            top,
          });
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (failed) return null;

  const cards = stats
    ? [
        { icon: FolderGit2, label: 'Repositories', value: stats.repos },
        { icon: Star, label: 'Total Stars', value: stats.stars },
        { icon: GitFork, label: 'Forks', value: stats.forks },
        { icon: Users, label: 'Followers', value: stats.followers },
      ]
    : [];

  return (
    <div className="gh-stats">
      <div className="gh-grid">
        {(stats ? cards : Array.from({ length: 4 })).map((c, i) =>
          stats ? (
            <div className="gh-stat-card" key={i}>
              <c.icon className="gh-icon" size={22} />
              <span className="gh-value">{c.value}</span>
              <span className="gh-label">{c.label}</span>
            </div>
          ) : (
            <div className="gh-stat-card skeleton" key={i} style={{ height: 120 }} />
          )
        )}
      </div>

      {stats?.top?.length > 0 && (
        <div className="gh-repos">
          {stats.top.map((r) => (
            <a key={r.id} href={r.html_url} target="_blank" rel="noopener noreferrer" className="gh-repo">
              <span className="gh-repo-name">{r.name}</span>
              {r.description && <span className="gh-repo-desc">{r.description}</span>}
              <span className="gh-repo-meta">
                {r.language && <span>{r.language}</span>}
                <span><Star size={12} /> {r.stargazers_count}</span>
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
