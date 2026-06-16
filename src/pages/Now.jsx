import '../styles/NowUses.css';

// ⚠️ Edit this with what you're actually up to. Update the date when you change it.
const UPDATED = 'June 2026';

const BLOCKS = [
  {
    title: 'Currently focused on',
    items: [
      'Building production generative-AI features and data pipelines.',
      'Deepening my skills in LLM apps, RAG, and cloud-native architecture.',
    ],
  },
  {
    title: 'Learning',
    items: [
      'Advanced system design and ML deployment patterns.',
      'Fine-tuning and evaluation for LLM applications.',
    ],
  },
  {
    title: 'Open to',
    items: [
      'AI/ML and full-stack roles, collaborations, and freelance projects.',
    ],
  },
];

export default function Now() {
  return (
    <section className="nowuses-page section section-lg">
      <div className="container nowuses-inner">
        <div className="section-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>
          <h2>What I’m doing now</h2>
        </div>
        <span className="nowuses-updated">Last updated: {UPDATED}</span>

        {BLOCKS.map((b) => (
          <div className="nowuses-block" key={b.title}>
            <h3><span className="dot" /> {b.title}</h3>
            <ul className="nowuses-list">
              {b.items.map((it, i) => <li key={i}>{it}</li>)}
            </ul>
          </div>
        ))}

        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem' }}>
          Inspired by <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer">the /now page movement</a>.
        </p>
      </div>
    </section>
  );
}
