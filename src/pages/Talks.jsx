import { Mail } from 'lucide-react';
import SEO from '../components/SEO';
import '../styles/NowUses.css';

export default function Talks() {
  return (
    <>
      <SEO
        title="Speaking | Shagun Tyagi"
        desc="Workshops led and speaking availability for Shagun Tyagi, AI/ML Engineer."
        path="/speaking"
        breadcrumb={[{ name: 'Speaking', path: '/speaking' }]}
      />
      <section className="nowuses-page section section-lg">
        <div className="container nowuses-inner">
          <div className="section-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>
            <h2>Speaking</h2>
          </div>
          <span className="nowuses-updated">Workshops & availability</span>

          <div className="nowuses-block">
            <h3><span className="dot" /> Workshops Led</h3>
            <ul className="nowuses-list">
              <li>5+ technical workshops on ML, AI, and cloud — run for the CXI Community.</li>
            </ul>
          </div>

          <div className="nowuses-block">
            <h3><span className="dot" /> Conference Talks</h3>
            <ul className="nowuses-list">
              <li>None yet — this section will list talks as they happen.</li>
            </ul>
          </div>

          <div className="nowuses-block">
            <h3><span className="dot" /> Open to</h3>
            <ul className="nowuses-list">
              <li>
                Speaking on AI/ML engineering, LLM agents, and RAG systems in production. Reach out at{' '}
                <a href="mailto:theshaguntyagi@gmail.com" style={{ color: 'inherit' }}>
                  <Mail size={14} style={{ verticalAlign: 'text-bottom' }} /> theshaguntyagi@gmail.com
                </a>.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
