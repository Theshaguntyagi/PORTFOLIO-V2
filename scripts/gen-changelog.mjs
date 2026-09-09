// Generates public/changelog.json from actual git commit history — real
// entries, not hand-written/fabricated ones. Filters out noisy commit
// prefixes (merge commits, pure chore/ci commits) to keep it readable for an
// outside audience. Runs at prebuild; silently produces an empty list if git
// history isn't available (e.g. a shallow clone with depth=1 in some CI
// setups) rather than failing the build.
import { execSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MAX_ENTRIES = 40;

function main() {
  let entries = [];
  try {
    const raw = execSync('git log --no-merges --pretty=format:"%ad|%s" --date=short -n 200', {
      cwd: join(__dirname, '..'),
      encoding: 'utf-8',
    });
    entries = raw
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const idx = line.indexOf('|');
        return { date: line.slice(0, idx), summary: line.slice(idx + 1) };
      })
      // Skip pure dependency/CI plumbing commits — not meaningful to a reader
      // of a public changelog.
      .filter((e) => !/^(chore|ci|deps):/i.test(e.summary))
      .slice(0, MAX_ENTRIES);
  } catch (err) {
    console.warn('⚠️ Could not read git history for changelog (shallow clone?):', err.message);
  }

  const pub = join(__dirname, '..', 'public');
  mkdirSync(pub, { recursive: true });
  writeFileSync(join(pub, 'changelog.json'), JSON.stringify(entries, null, 2));
  console.log(`✓ Generated changelog.json (${entries.length} entries from git history)`);
}

main();
