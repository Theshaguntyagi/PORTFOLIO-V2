import SEO from '../components/SEO';
import '../styles/NowUses.css';

export default function Press() {
  const bios = [
    {
      title: 'One-liner',
      items: ['Shagun Tyagi is an AI/ML Engineer at Envigo building production LLM agent and RAG systems.'],
    },
    {
      title: 'Short bio (2–3 sentences)',
      items: [
        'Shagun Tyagi is an AI/ML Engineer at Envigo, where he builds production AI systems including LLM agent orchestration, RAG pipelines, and LLM gateway infrastructure. He holds a B.Tech in Computer Science Engineering (IoT) from MIET and is a published researcher (IJSRA, 2024) on IoT-based health monitoring. He is based in Gurugram, India.',
      ],
    },
    {
      title: 'Facts',
      items: [
        'Current role: AI/ML Engineer, Envigo (Gurugram)',
        'Education: B.Tech CSE (IoT), Meerut Institute of Engineering and Technology',
        'Publication: IJSRA Vol. 12, No. 1, 2024 — DOI: 10.30574/ijsra.2024.12.1.0781',
        'Previously: Quality Analyst, Airtel',
      ],
    },
    {
      title: 'Assets',
      items: [
        'Headshot: use the profile image at shaguntyagi.tech/profile.webp',
        'Full resume: shaguntyagi.tech/resume.json (JSON Resume format)',
      ],
    },
    {
      title: 'Contact',
      items: ['For interviews, features, or collaboration inquiries: theshaguntyagi@gmail.com'],
    },
  ];

  return (
    <>
      <SEO
        title="Press & Media Kit | Shagun Tyagi"
        desc="Bio, facts, and media assets for press and collaboration inquiries about Shagun Tyagi, AI/ML Engineer."
        path="/press"
        breadcrumb={[{ name: 'Press', path: '/press' }]}
      />
      <section className="nowuses-page section section-lg">
        <div className="container nowuses-inner">
          <div className="section-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>
            <h2>Press & Media Kit</h2>
          </div>
          <span className="nowuses-updated">For journalists, podcast hosts, and collaborators</span>

          {bios.map((b) => (
            <div className="nowuses-block" key={b.title}>
              <h3><span className="dot" /> {b.title}</h3>
              <ul className="nowuses-list">
                {b.items.map((it, i) => <li key={i}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
