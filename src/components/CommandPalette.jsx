import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home, User, Briefcase, FolderGit2, FileText, Mail, Search, FileDown,
} from 'lucide-react';
import '../styles/CommandPalette.css';

const ITEMS = [
  { label: 'Home', to: '/', icon: Home, keywords: 'start landing' },
  { label: 'About', to: '/about', icon: User, keywords: 'bio skills education' },
  { label: 'Experience', to: '/experience', icon: Briefcase, keywords: 'work jobs career' },
  { label: 'Projects', to: '/projects', icon: FolderGit2, keywords: 'work portfolio case study' },
  { label: 'Blog', to: '/blog', icon: FileText, keywords: 'articles writing' },
  { label: 'Contact', to: '/contact', icon: Mail, keywords: 'hire email reach' },
];

export default function CommandPalette() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  // Open with Cmd/Ctrl+K (reset happens here, in the event handler — not an effect)
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setQuery('');
        setActive(0);
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Focus the input when the palette opens (DOM side-effect only).
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? ITEMS.filter((i) => (i.label + ' ' + i.keywords).toLowerCase().includes(q))
      : ITEMS;
    const extra = [];
    // Always offer resume download as an action
    if (!q || 'resume download cv'.includes(q)) {
      extra.push({ label: 'Download Resume', icon: FileDown, action: 'resume' });
    }
    return [...base, ...extra];
  }, [query]);

  const go = (item) => {
    setOpen(false);
    if (item.action === 'resume') {
      window.open(`${import.meta.env.BASE_URL}resume.pdf`, '_blank');
    } else if (item.to) {
      navigate(item.to);
    }
  };

  const onInputKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => (a + 1) % results.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => (a - 1 + results.length) % results.length); }
    else if (e.key === 'Enter') { e.preventDefault(); if (results[active]) go(results[active]); }
  };

  if (!open) return null;

  return (
    <div className="cmdk-overlay" onClick={() => setOpen(false)}>
      <div className="cmdk-panel" role="dialog" aria-modal="true" aria-label="Command menu" onClick={(e) => e.stopPropagation()}>
        <div className="cmdk-search">
          <Search size={18} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0); }}
            onKeyDown={onInputKey}
            placeholder="Jump to… (try 'projects' or 'resume')"
            aria-label="Search commands"
          />
          <kbd className="cmdk-esc">esc</kbd>
        </div>
        <ul className="cmdk-list">
          {results.map((item, i) => {
            const Icon = item.icon;
            return (
              <li
                key={item.label}
                className={`cmdk-item ${i === active ? 'active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(item)}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </li>
            );
          })}
          {results.length === 0 && <li className="cmdk-empty">No results</li>}
        </ul>
      </div>
    </div>
  );
}
