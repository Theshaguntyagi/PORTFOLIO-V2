import { useTranslation } from 'react-i18next';
import '../styles/NowUses.css';

export default function Now() {
  const { t } = useTranslation();

  const blocks = [
    {
      title: t('now.focusTitle', 'Currently focused on'),
      items: [
        t('now.focusItem1', 'Building production generative-AI features and data pipelines.'),
        t('now.focusItem2', 'Deepening my skills in LLM apps, RAG, and cloud-native architecture.'),
      ],
    },
    {
      title: t('now.learningTitle', 'Learning'),
      items: [
        t('now.learningItem1', 'Advanced system design and ML deployment patterns.'),
        t('now.learningItem2', 'Fine-tuning and evaluation for LLM applications.'),
      ],
    },
    {
      title: t('now.openTitle', 'Open to'),
      items: [
        t('now.openItem1', 'AI/ML and full-stack roles, collaborations, and freelance projects.'),
      ],
    },
  ];

  return (
    <section className="nowuses-page section section-lg">
      <div className="container nowuses-inner">
        <div className="section-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>
          <h2>{t("now.title", "What I’m doing now")}</h2>
        </div>
        <span className="nowuses-updated">{t("now.lastUpdated", "Last updated")}: {t("now.updatedDate", "June 2026")}</span>

        {blocks.map((b) => (
          <div className="nowuses-block" key={b.title}>
            <h3><span className="dot" /> {b.title}</h3>
            <ul className="nowuses-list">
              {b.items.map((it, i) => <li key={i}>{it}</li>)}
            </ul>
          </div>
        ))}

        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem' }}>
          {t("now.inspiredBy", "Inspired by")} <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer">{t("now.movement", "the /now page movement")}</a>.
        </p>
      </div>
    </section>
  );
}
