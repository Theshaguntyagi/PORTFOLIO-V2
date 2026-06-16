import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import '../styles/NotFound.css';

export default function NotFound() {
  return (
    <section className="notfound-page section section-lg">
      <div className="container notfound-inner">
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Page not found</h2>
        <p className="notfound-text">
          The page you’re looking for doesn’t exist or has moved.
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
  );
}
