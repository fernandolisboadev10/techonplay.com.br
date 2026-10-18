// Audit blog posts against the Discover checklist (see PLANO-DISCOVER.md).
// Usage: node scripts/audit-discover.mjs   (exit code 1 when any post fails)
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { MAX_BODY_EXTERNAL, EARLY_ZONE, splitBody, bodyLinks, isExternal } from './link-rules.mjs';

const DIR = 'src/content/blog';
const MIN_INTERNAL = 2; // inline links; RelatedPosts adds 3 more cards per post

function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const data = {};
  for (const line of (m?.[1] ?? '').split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].replace(/^"(.*)"$/, '$1');
  }
  return { data, body: m?.[2] ?? text };
}

const slugs = (await readdir(DIR)).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
let failing = 0;
const totals = {};

for (const slug of slugs) {
  const { data, body } = frontmatter(await readFile(path.join(DIR, `${slug}.md`), 'utf8'));
  const issues = [];
  const len = (s) => [...(s ?? '')].length;

  if (len(data.title) > 65) issues.push(`title ${len(data.title)} chars (max 65)`);
  if (len(data.description) < 120 || len(data.description) > 155)
    issues.push(`description ${len(data.description)} chars (120-155)`);
  if (!data.image) issues.push('no cover image');
  if (data.image && !data.imageAlt) issues.push('no imageAlt');
  if (!data.tags) issues.push('no tags');

  const { main } = splitBody(body);
  const all = bodyLinks(body);
  const mainLinks = bodyLinks(main);
  const links = all.map((l) => l.url);
  const internal = mainLinks.filter((l) => l.url.startsWith('/')).map((l) => l.url);
  const externalLinks = mainLinks.filter((l) => isExternal(l.url));
  const external = [...new Set(externalLinks.map((l) => l.url))];

  if (internal.length < MIN_INTERNAL) issues.push(`${internal.length} internal links (min ${MIN_INTERNAL})`);
  if (external.length > MAX_BODY_EXTERNAL) issues.push(`${external.length} external links in body (max ${MAX_BODY_EXTERNAL}; extras go to Fontes at the end)`);
  if (externalLinks.some((l) => l.pos < EARLY_ZONE)) issues.push('external link in the first third (internal links first)');
  if (links.some((u) => /^https?:\/\/(www\.)?techonplay\.com\.br/.test(u)))
    issues.push('absolute internal link (use relative /slug/)');
  for (const u of all.map((l) => l.url).filter((x) => x.startsWith('/'))) {
    const target = u.replace(/^\/|\/?(#.*)?$/g, '');
    const isSitePage = /^(blog|categoria\/[a-z-]+|sobre-nos|contate-nos|anuncie)$/.test(target);
    if (target && !isSitePage && !slugs.includes(target)) issues.push(`broken internal link ${u}`);
  }

  if (issues.length) {
    failing++;
    console.log(`\n${slug}`);
    for (const i of issues) {
      console.log(`  - ${i}`);
      const key = i.replace(/[\d]+/g, 'N').split(' (')[0];
      totals[key] = (totals[key] ?? 0) + 1;
    }
  }
}

console.log(`\n${failing}/${slugs.length} posts with issues`);
for (const [k, v] of Object.entries(totals).sort((a, b) => b[1] - a[1])) console.log(`  ${v}x ${k}`);
process.exit(failing ? 1 : 0);
