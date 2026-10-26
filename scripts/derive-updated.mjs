// Roda no deploy (antes do build): preenche `updated:` de cada artigo com a data do último commit que
// mudou de verdade o texto dele ou uma imagem que ele usa. O arquivo só muda no checkout do CI, nada é commitado.
// Ignora: criação do artigo, mudança só no frontmatter (exceto `image`), só nos links e diferenças de espaço/quebra de linha.
// Se o artigo já tem `updated`, vale o mais recente entre o escrito à mão e o derivado do Git.
// Precisa do histórico completo (actions/checkout com fetch-depth: 0). Uso: node scripts/derive-updated.mjs [--dry]
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { basename } from 'node:path';

const DRY = process.argv.includes('--dry');
// Só edições a partir daqui contam: o histórico anterior teve ajustes em massa (links, categorias) que não são atualização de conteúdo.
const SINCE = Date.parse(process.env.DERIVE_SINCE ?? '2026-10-26T09:30:00-03:00');
const POSTS = 'src/content/blog/';
const IMG = /[\w.-]+\.(?:webp|png|jpe?g|avif|gif|svg)/gi;

const git = (...args) => {
  try {
    return execFileSync('git', args, { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
  } catch {
    return null;
  }
};

if (git('rev-parse', '--is-shallow-repository')?.trim() === 'true') {
  console.warn('derive-updated: checkout raso (sem histórico); nada foi carimbado. Use fetch-depth: 0.');
  process.exit(0);
}

const split = (text) => {
  const t = text.replace(/\r\n/g, '\n');
  const m = t.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  return m ? { fm: m[1], body: m[2] } : { fm: '', body: t };
};
const fmLine = (fm, key) => (fm.match(new RegExp(`^${key}:.*$`, 'm')) ?? [''])[0].trim();
// Compara o texto sem os links ([texto](url) vira texto): ajuste só de links não conta como atualização.
const squash = (s) => s.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/\s+/g, ' ').trim();

const files = (git('ls-files') ?? '').split('\n').filter(Boolean);
const byName = new Map();
for (const f of files) {
  if (!/\.(webp|png|jpe?g|avif|gif|svg)$/i.test(f)) continue;
  const k = basename(f);
  byName.set(k, [...(byName.get(k) ?? []), f]);
}

const exists = (rev, path) => git('cat-file', '-e', `${rev}:${path}`) !== null;
const show = (rev, path) => git('show', `${rev}:${path}`);

let stamped = 0;
for (const name of readdirSync(POSTS).filter((n) => n.endsWith('.md'))) {
  const path = POSTS + name;
  const raw = readFileSync(path, 'utf8');
  const { fm } = split(raw);
  if (/^draft:\s*true/m.test(fm)) continue;

  const imgs = [...new Set(raw.match(IMG) ?? [])].flatMap((n) => byName.get(n) ?? []);
  const log = git('log', '--format=%H%x09%cI', '--', path, ...imgs);
  if (!log) continue;

  let found = null;
  for (const row of log.split('\n').filter(Boolean)) {
    const [sha, when] = row.split('\t');
    if (Date.parse(when) < SINCE) break; // o log vem do mais novo para o mais antigo
    const parent = `${sha}^`;
    if (git('rev-parse', '--verify', '-q', parent) === null) continue; // commit raiz
    if (!exists(parent, path)) continue; // criação do artigo

    // imagem que já existia e foi alterada neste commit
    const changed = (git('diff-tree', '--no-commit-id', '--name-only', '-r', sha) ?? '').split('\n');
    if (imgs.some((i) => changed.includes(i) && exists(parent, i))) { found = when; break; }

    if (changed.includes(path)) {
      const a = split(show(parent, path) ?? '');
      const b = split(show(sha, path) ?? '');
      if (squash(a.body) !== squash(b.body) || fmLine(a.fm, 'image') !== fmLine(b.fm, 'image')) { found = when; break; }
    }
  }
  if (!found) continue;

  const manual = fmLine(fm, 'updated').replace(/^updated:\s*/, '').replace(/^["']|["']$/g, '');
  const manualTime = manual ? Date.parse(manual) : NaN;
  if (!Number.isNaN(manualTime) && manualTime >= Date.parse(found)) continue;

  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  let text = raw.replace(/\r\n/g, '\n');
  if (/^updated:.*$/m.test(text)) text = text.replace(/^updated:.*$/m, `updated: ${found}`);
  else if (/^date:.*$/m.test(text)) text = text.replace(/^(date:.*)$/m, `$1\nupdated: ${found}`);
  else continue;
  stamped++;
  console.log(`${DRY ? '[dry] ' : ''}${name} -> ${found}`);
  if (!DRY) writeFileSync(path, text.replace(/\n/g, eol));
}
console.log(`derive-updated: ${stamped} artigo(s) com data de atualização.`);
