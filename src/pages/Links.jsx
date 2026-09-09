import { Github, Linkedin, Mail, FileText, Rss, Instagram, Twitter } from 'lucide-react';
import SEO from '../components/SEO';
import '../styles/NowUses.css';

const LINKS = [
  { label: 'Portfolio & Blog', url: 'https://shaguntyagi.tech', icon: FileText },
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
        desc="Every place to find Shagun Tyagi online — portfolio, GitHub, LinkedIn, and social profiles."
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
        </div>
      </section>
    </>
  );
}
