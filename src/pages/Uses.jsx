import { useTranslation } from 'react-i18next';
import '../styles/NowUses.css';

export default function Uses() {
  const { t } = useTranslation();

  const blocks = [
    {
      title: t('uses.devTitle', 'Editor & Dev'),
      items: [
        ['VS Code', t('uses.vscodeDesc', 'with the GitHub theme + Inter font')],
        ['Terminal', t('uses.terminalDesc', 'with a custom shell setup')],
        ['Git + GitHub', t('uses.gitDesc', 'for version control')],
      ],
    },
    {
      title: t('uses.langTitle', 'Languages & Frameworks'),
      items: [
        ['Python', t('uses.pythonDesc', 'for AI/ML and backends')],
        ['React + Vite', t('uses.reactDesc', 'for fast front-ends')],
        ['Node.js / FastAPI', t('uses.nodeDesc', 'for APIs')],
      ],
    },
    {
      title: t('uses.cloudTitle', 'Cloud & Tools'),
      items: [
        ['AWS + Firebase', t('uses.awsDesc', 'hosting & infra')],
        ['Docker', t('uses.dockerDesc', 'containers')],
        ['OpenAI API', t('uses.openaiDesc', 'powering the AI features on this site')],
      ],
    },
    {
      title: t('uses.hardwareTitle', 'Hardware'),
      items: [
        ['Laptop', t('uses.laptopDesc', 'daily work machine')],
        ['Monitor / peripherals', t('uses.monitorDesc', 'external screen & inputs')],
      ],
    },
  ];

  return (
    <section className="nowuses-page section section-lg">
      <div className="container nowuses-inner">
        <div className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
          <h2>{t("uses.title", "Uses")}</h2>
          <p style={{ margin: 0 }}>{t("uses.subtitle", "The tools, gear, and software I use day to day.")}</p>
        </div>

        {blocks.map((b) => (
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
          {t("uses.inspiredBy", "Inspired by")} <a href="https://uses.tech" target="_blank" rel="noopener noreferrer">uses.tech</a>.
        </p>
      </div>
    </section>
  );
}
