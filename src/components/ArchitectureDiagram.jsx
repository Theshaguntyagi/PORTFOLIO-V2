import React from 'react';
import { motion as Motion } from 'framer-motion';
import '../styles/ArchitectureDiagram.css';

/**
 * Renders a simple left-to-right (wrapping) flow diagram for a project's
 * architecture. Nodes are derived from real project data — either an
 * explicit arrow-pipeline already written in the project's `solution` text
 * (e.g. "crawl → AI audit → GPT synthesis → email delivery"), or, when no
 * such pipeline exists, the project's own `technologies` list in the order
 * it's already given. Nothing here is invented: every label is text the
 * project data already states.
 */
export default function ArchitectureDiagram({ nodes }) {
  if (!nodes || nodes.length < 2) return null;

  return (
    <div className="arch-diagram">
      {nodes.map((label, i) => (
        <React.Fragment key={i}>
          <Motion.div
            className="arch-node"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            whileHover={{ scale: 1.05 }}
          >
            {label}
          </Motion.div>
          {i < nodes.length - 1 && <span className="arch-arrow">→</span>}
        </React.Fragment>
      ))}
    </div>
  );
}
