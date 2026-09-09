import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import '../styles/NotFound.css';

export default function NotFound() {
  return (
    <>
    <SEO title="404 — Page Not Found | Shagun Tyagi" path="/404" noindex />
    <section className="notfound-page section section-lg">
      <div className="container notfound-inner">
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Well, this route doesn't exist</h2>
        <p className="notfound-text">
          Either the page moved, the link is stale, or you free-typed a URL and lost the bet.
          Let's get you back to somewhere real.
        </p>
        <div className="notfound-actions">
          <Link to="/" className="btn btn-primary btn-lg">
            <Home className="btn-icon-left" /> Back Home
          </Link>
          <Link to="/projects" className="btn btn-outline btn-lg">
            <ArrowLeft className="btn-icon-left" /> View Projects
          </Link>
        </div>
      </div>
    </section>
    </>
  );
}
