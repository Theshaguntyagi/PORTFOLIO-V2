// Programmatic internal linking for blog post body text: when a paragraph
// mentions one of Shagun's own project names by name, the FIRST such mention
// in the whole post is turned into a link to that project's case study page.
// Deliberately scoped to internal routes only (project pages) — not social
// profiles or other external URLs, which don't belong under "internal
// linking" and would just be noise if auto-linked.
import { projectsData } from '../data/projects';

// Short, linkable name extracted from the full title (e.g.
// "PitchIQ — AI Website Auditing & Lead Intelligence" -> "PitchIQ").
function shortName(title) {
  return title.split('—')[0].trim();
}

export const PROJECT_LINK_TERMS = projectsData
  .map((p) => ({ term: shortName(p.title), path: `/project/${p.id}` }))
  .filter((t) => t.term.length > 2) // skip anything too short to link safely
  // Longest term first, so "IoT Health Monitoring System" is tried before
  // any shorter substring it might otherwise partially match.
  .sort((a, b) => b.term.length - a.term.length);

/**
 * Turns a plain string into an array of strings and {type:'link', term, path}
 * markers, linking each term's first occurrence in the whole post only.
 * `linkedTerms` is a Set the caller owns and mutates across the whole
 * render pass, so a term already linked in an earlier paragraph is skipped
 * here even though this function only sees one paragraph at a time.
 */
export function autoLinkText(text, linkedTerms) {
  if (typeof text !== 'string' || !text) return [text];

  let remaining = [text];

  for (const { term, path } of PROJECT_LINK_TERMS) {
    if (linkedTerms.has(term)) continue;
    const re = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');

    const next = [];
    let matched = false;
    for (const chunk of remaining) {
      if (matched || typeof chunk !== 'string') {
        next.push(chunk);
        continue;
      }
      const m = re.exec(chunk);
      if (!m) {
        next.push(chunk);
        continue;
      }
      matched = true;
      linkedTerms.add(term);
      const before = chunk.slice(0, m.index);
      const matchText = chunk.slice(m.index, m.index + m[0].length);
      const after = chunk.slice(m.index + m[0].length);
      if (before) next.push(before);
      next.push({ type: 'link', term: matchText, path });
      if (after) next.push(after);
    }
    remaining = next;
  }

  return remaining;
}
