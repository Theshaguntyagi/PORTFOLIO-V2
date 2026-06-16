import '../styles/NowUses.css';

// ⚠️ Edit with your real gear/tools.
const BLOCKS = [
  {
    title: 'Editor & Dev',
    items: [
      ['VS Code', 'with the GitHub theme + Inter font'],
      ['Terminal', 'with a custom shell setup'],
      ['Git + GitHub', 'for version control'],
    ],
  },
  {
    title: 'Languages & Frameworks',
    items: [
      ['Python', 'for AI/ML and backends'],
      ['React + Vite', 'for fast front-ends'],
      ['Node.js / FastAPI', 'for APIs'],
    ],
  },
  {
    title: 'Cloud & Tools',
    items: [
      ['AWS + Firebase', 'hosting & infra'],
      ['Docker', 'containers'],
      ['OpenAI API', 'powering the AI features on this site'],
    ],
  },
  {
    title: 'Hardware',
    items: [
      ['Laptop', 'your daily driver — edit me'],
      ['Monitor / peripherals', 'edit me'],
    ],
  },
];

export default function Uses() {
  return (
    <section className="nowuses-page section section-lg">
      <div className="container nowuses-inner">
        <div className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
          <h2>Uses</h2>
          <p style={{ margin: 0 }}>The tools, gear, and software I use day to day.</p>
        </div>

        {BLOCKS.map((b) => (
          <div className="nowuses-block" key={b.title}>
            <h3><span className="dot" /> {b.title}</h3>
            <ul className="nowuses-list">
              {b.items.map(([name, desc], i) => (
                <li key={i}><b>{name}</b> — <span>{desc}</span></li>
              ))}
            </ul>
          </div>
        ))}

        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem' }}>
          Inspired by <a href="https://uses.tech" target="_blank" rel="noopener noreferrer">uses.tech</a>.
        </p>
      </div>
    </section>
  );
}
