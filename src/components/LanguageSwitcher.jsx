import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { trackLanguageChange } from '../services/telemetry';

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'hi', label: 'हि' },
  { code: 'es', label: 'ES' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = (i18n.resolvedLanguage || 'en').slice(0, 2);

  const cycle = () => {
    const idx = LANGS.findIndex((l) => l.code === current);
    const next = LANGS[(idx + 1) % LANGS.length];
    i18n.changeLanguage(next.code);
    trackLanguageChange(next.code);
  };

  return (
    <button
      onClick={cycle}
      className="lang-switch"
      title="Change language"
      aria-label="Change language"
    >
      <Globe size={16} />
      <span>{LANGS.find((l) => l.code === current)?.label || 'EN'}</span>
    </button>
  );
}
