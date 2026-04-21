import { useParams, useNavigate } from "react-router-dom";
import { certifications } from "../data/certifications";
import { ArrowLeft, ExternalLink } from "lucide-react";
import "../styles/CertificateDetail.css";

export default function CertificateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const cert = certifications.find(c => c.id === id);

  if (!cert) return <h2>Certificate not found</h2>;

  return (
    <section className="cert-page">
      <div className="container">

        {/* BACK */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={16}/> Back
        </button>

        {/* MAIN CARD */}
        <div className="cert-card-main">

          <h1>{cert.title}</h1>
          <p className="subtitle">{cert.subtitle}</p>

          {/* IMAGE */}
          <div className="cert-image">
            <img src={cert.image} alt={cert.title} />
          </div>

          {/* INFO GRID */}
          <div className="cert-grid">

            <div className="cert-info">
              <h3>Details</h3>
              <p>{cert.description}</p>

              <div className="meta">
                <span>Issued By: {cert.issuedBy}</span>
                <span>Date: {cert.date}</span>
              </div>
            </div>

            {/* ACTION */}
            {cert.link && (
              <div className="cert-side">
                <a href={cert.link} target="_blank" className="verify-btn">
                  <ExternalLink size={14}/> Verify Certificate
                </a>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}