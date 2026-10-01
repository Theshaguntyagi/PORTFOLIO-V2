import { Github, Linkedin, Mail, FileText, Rss, Instagram, Twitter, BookOpen, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Newsletter from '../components/Newsletter';
import '../styles/NowUses.css';

// Link-in-bio targets (Instagram bio points here). Internal routes use the
// router so the first-touch UTM captured on /links survives the click.
const PRIMARY = [
  { label: 'Read the blog — RAG, agents, LLM infra', to: '/blog', icon: BookOpen },
  { label: 'Start here', to: '/start-here', icon: Compass },
  { label: 'Projects', to: '/projects', icon: FileText },
];

const LINKS = [
  { label: 'GitHub', url: 'https://github.com/theshaguntyagi', icon: Github },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/theshaguntyagi', icon: Linkedin },
  { label: 'Instagram', url: 'https://instagram.com/theshaguntyagi', icon: Instagram },
  { label: 'X / Twitter', url: 'https://twitter.com/theshaguntyagi', icon: Twitter },
  { label: 'RSS Feed', url: 'https://shaguntyagi.tech/rss.xml', icon: Rss },
  { label: 'Email', url: 'mailto:theshaguntyagi@gmail.com', icon: Mail },
];

export default function Links() {
  return (
    <>
      <SEO
        title="Links | Shagun Tyagi — All Profiles in One Place"
        desc="Every place to find Shagun Tyagi online — blog, projects, GitHub, LinkedIn, and Instagram."
        path="/links"
        breadcrumb={[{ name: 'Links', path: '/links' }]}
      />
      <section className="nowuses-page section section-lg">
        <div className="container nowuses-inner">
          <div className="section-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>
            <h2>Links</h2>
          </div>
          <span className="nowuses-updated">Everywhere to find me</span>

          <div className="nowuses-block">
            <ul className="nowuses-list">
              {PRIMARY.map(({ label, to, icon: Icon }) => (
                <li key={to}>
                  <Link
                    to={to}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'inherit', textDecoration: 'none' }}
                  >
                    <Icon size={16} /> <b>{label}</b>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="nowuses-block">
            <ul className="nowuses-list">
              {LINKS.map(({ label, url, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={url}
                    target={url.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'inherit', textDecoration: 'none' }}
                  >
                    <Icon size={16} /> <b>{label}</b>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Newsletter />
        </div>
      </section>
    </>
  );
}
