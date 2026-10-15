// Topic radar: finds subjects trending across tech feeds and suggests article ideas.
// Usage: node scripts/radar.mjs [--hours=72] [--top=25]   (writes radar/radar-YYYY-MM-DD.md)
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')));
const HOURS = Number(args.hours ?? 72);
const TOP = Number(args.top ?? 25);
const BLOG_DIR = 'src/content/blog';
const UA = { 'user-agent': 'Mozilla/5.0 (techonplay-radar)' };

const FEEDS = [
  { name: 'Tecnoblog', url: 'https://tecnoblog.net/feed/' },
  { name: 'Canaltech', url: 'https://canaltech.com.br/rss/' },
  { name: 'Olhar Digital', url: 'https://olhardigital.com.br/feed/' },
  { name: 'TechTudo', url: 'https://www.techtudo.com.br/rss/techtudo/' },
  { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml' },
];

const CATEGORIES = {
  IA: ['chatgpt', 'openai', 'gemini', 'claude', 'anthropic', 'copilot', 'inteligencia artificial', 'ia', 'grok', 'deepseek', 'llm', 'gpt', 'agente', 'nvidia', 'sora', 'midjourney', 'meta ai', 'ai'],
  Jogos: ['jogo', 'jogos', 'game', 'games', 'steam', 'playstation', 'ps5', 'ps6', 'xbox', 'nintendo', 'switch', 'gta', 'fortnite', 'valve', 'epic', 'minecraft', 'roblox'],
  Reviews: ['review', 'analise', 'testamos', 'hands-on', 'galaxy', 'iphone', 'pixel', 'xiaomi', 'motorola', 'smartphone', 'celular', 'notebook', 'lancamento', 'melhor', 'comparativo'],
  Apps: ['app', 'aplicativo', 'whatsapp', 'instagram', 'telegram', 'tiktok', 'spotify', 'netflix', 'youtube', 'chrome', 'navegador', 'extensao', 'x', 'threads', 'pix'],
  Tutoriais: ['como', 'tutorial', 'passo', 'configurar', 'instalar', 'windows', 'linux', 'android', 'ios', 'atualizacao', 'recurso'],
  Dicas: ['dica', 'dicas', 'truque', 'economizar', 'gratis', 'desconto', 'oferta', 'cupom', 'seguranca', 'golpe'],
  Curiosidades: ['curiosidade', 'descoberta', 'cientistas', 'pesquisa', 'estudo', 'nasa', 'espaco', 'historia', 'raro'],
  Tendências: ['tendencia', 'viral', 'viraliza', 'viralizou', 'trend', 'desafio', 'filtro', 'meme', 'febre'],
};

const STOP = new Set(
  `a o as os um uma uns umas de da do das dos em na no nas nos por para com sem sob sobre ate ao aos que se ou e mas como mais menos muito pouco ja nao sim ser foi sao era tem ter tinha vai vao pode podem ficar fica apos antes entre quando onde qual quais seu sua seus suas este esta estes estas esse essa esses essas isso isto novo nova novos novas agora hoje ontem tudo todo toda todos todas outro outra cada ainda tambem so apenas veja saiba entenda confira the and for with from that this your you are was has have will not new how what why can its into after over more than about their been but all out one two get gets just says say via vs com sera seria deve devem chega chegar passa passam faz fazer fez vira virar ganha ganhar traz trazer revela mostra anuncia lanca lancou lanca ficou ficam ate ano anos dia dias mes meses semana`
    .split(/\s+/),
);

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const decode = (s) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .trim();
const tag = (block, name) => decode(block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))?.[1] ?? '');

async function get(url, tries = 3) {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url, { headers: UA, signal: AbortSignal.timeout(25000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (err) {
      if (i >= tries) throw err;
    }
  }
}

async function readFeed({ name, url }) {
  const xml = await get(url);
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => ({
    source: name,
    title: tag(m[1], 'title'),
    link: tag(m[1], 'link'),
    date: new Date(tag(m[1], 'pubDate')),
  }));
}

async function readHackerNews() {
  const json = JSON.parse(await get('https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=40'));
  return json.hits.map((h) => ({
    source: 'Hacker News',
    title: h.title,
    link: `https://news.ycombinator.com/item?id=${h.objectID}`,
    date: new Date(h.created_at),
  }));
}

async function readTrends() {
  const xml = await get('https://trends.google.com/trending/rss?geo=BR');
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => ({
    term: norm(tag(m[1], 'title')),
    traffic: tag(m[1], 'ht:approx_traffic'),
  }));
}

function tokens(title) {
  return norm(title)
    .replace(/[^a-z0-9$+\-\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

// Topics are named entities (products, companies, people): runs of capitalized words or
// alphanumerics such as "Windows 11", "Galaxy S25", "GTA 6", plus their 1-2 word parts.
const BROAD = new Set(['google', 'apple', 'samsung', 'amazon', 'microsoft', 'meta', 'android', 'iphone', 'brasil', 'mercado', 'livre', 'black', 'friday', 'dia', 'veja', 'como', 'por', 'quando', 'quem', 'quanto', 'qual', 'sao', 'paulo', 'novo', 'nova', 'melhor', 'top', 'pix', 'governo', 'stf', 'tse', 'eua', 'usa']);

function grams(title) {
  const words = title.replace(/[“”"':?!,;()\[\]]/g, ' | ').split(/\s+/).filter(Boolean);
  const out = new Set();
  let run = [];
  const flush = () => {
    for (let i = 0; i < run.length; i++) {
      for (let n = 1; n <= 3 && i + n <= run.length; n++) {
        const parts = run.slice(i, i + n).map(norm);
        const first = parts[0];
        if (n === 1 && (first.length < 3 || BROAD.has(first) || STOP.has(first) || /^\d+$/.test(first))) continue;
        if (n > 1 && (STOP.has(parts[0]) || parts.every((p) => BROAD.has(p) || STOP.has(p)))) continue;
        out.add(parts.join(' '));
      }
    }
    run = [];
  };
  words.forEach((w, idx) => {
    if (w === '|') return flush();
    const clean = w.replace(/[^\p{L}\p{N}$+-]/gu, '');
    const isEntity = clean && (/^\p{Lu}/u.test(clean) || /\d/.test(clean)) && !(idx === 0 && !/\d/.test(clean) && STOP.has(norm(clean)));
    if (isEntity) run.push(clean);
    else flush();
  });
  flush();
  return out;
}

function categorize(text) {
  const words = new Set(tokens(text));
  const flat = norm(text);
  let best = ['Curiosidades', 0];
  for (const [cat, keys] of Object.entries(CATEGORIES)) {
    const score = keys.filter((k) => (k.includes(' ') ? flat.includes(k) : words.has(k))).length;
    if (score > best[1]) best = [cat, score];
  }
  return best[0];
}

async function loadPosts() {
  const files = (await readdir(BLOG_DIR)).filter((f) => f.endsWith('.md'));
  return Promise.all(
    files.map(async (f) => {
      const text = await readFile(path.join(BLOG_DIR, f), 'utf8');
      const title = text.match(/^title:\s*"?(.*?)"?\s*$/m)?.[1] ?? f;
      const tags = text.match(/^tags:\s*\[(.*)\]/m)?.[1] ?? '';
      return { slug: f.replace(/\.md$/, ''), hay: norm(`${title} ${tags} ${f}`) };
    }),
  );
}

// ---- collect
const results = await Promise.allSettled([...FEEDS.map(readFeed), readHackerNews(), readTrends()]);
const labels = [...FEEDS.map((f) => f.name), 'Hacker News', 'Google Trends'];
const failed = [];
let items = [];
let trends = [];
results.forEach((r, i) => {
  if (r.status === 'rejected') return failed.push(`${labels[i]} (${r.reason?.message ?? r.reason})`);
  if (labels[i] === 'Google Trends') trends = r.value;
  else items.push(...r.value);
});

const cutoff = Date.now() - HOURS * 3600 * 1000;
items = items.filter((i) => i.title && !Number.isNaN(i.date.getTime()) && i.date.getTime() >= cutoff);

// ---- score topics
const topics = new Map();
for (const item of items) {
  for (const g of grams(item.title)) {
    if (!topics.has(g)) topics.set(g, { term: g, items: [], sources: new Set() });
    const t = topics.get(g);
    if (!t.sources.has(item.source) || !t.items.some((x) => x.source === item.source && x.title === item.title)) {
      t.items.push(item);
      t.sources.add(item.source);
    }
  }
}

const trendTerms = trends.map((t) => t.term);
let ranked = [...topics.values()]
  .filter((t) => t.sources.size >= (t.term.includes(' ') ? 2 : 3))
  .map((t) => {
    const words = t.term.split(' ').length;
    const trendHit = trendTerms.some((x) => x.includes(t.term) || t.term.includes(x));
    return { ...t, score: t.sources.size * 3 + t.items.length + (words === 2 ? 2 : 0) + (trendHit ? 4 : 0), trendHit };
  })
  .sort((a, b) => b.score - a.score);

// drop terms swallowed by a higher ranked topic that covers the same headlines
const picked = [];
for (const t of ranked) {
  const key = new Set(t.items.map((i) => i.link));
  const dup = picked.some((p) => {
    const pk = new Set(p.items.map((i) => i.link));
    const inter = [...key].filter((l) => pk.has(l)).length;
    return inter / key.size >= 0.6 || p.term.includes(t.term) || t.term.includes(p.term);
  });
  if (!dup) picked.push(t);
  if (picked.length >= TOP) break;
}

// ---- compare with the blog
const posts = await loadPosts();
const covered = (term) => posts.filter((p) => term.split(' ').every((w) => p.hay.includes(w))).map((p) => p.slug);

// ---- report
const today = new Date().toISOString().slice(0, 10);
const lines = [`# Radar de pautas ${today}`, '', `Janela: últimas ${HOURS}h · ${items.length} manchetes de ${new Set(items.map((i) => i.source)).size} fontes.`];
if (failed.length) lines.push('', `Fontes com falha: ${failed.join('; ')}`);
if (trends.length) lines.push('', `Google Trends BR agora: ${trends.slice(0, 10).map((t) => `${t.term} (${t.traffic})`).join(', ')}`);

const byCat = {};
for (const t of picked) {
  const cat = categorize(t.items.map((i) => i.title).join(' '));
  (byCat[cat] ??= []).push(t);
}

const titleCase = (s) => s.split(' ').map((w) => (w.length <= 2 && !/\d/.test(w) ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1))).join(' ');

// Suggests post type, working title, search term and publishing slot for a topic.
function suggest(t, cat, isCovered) {
  const heads = norm(t.items.map((i) => i.title).join(' '));
  const name = titleCase(t.term);
  const howTo = /\bcomo\b|passo a passo|tutorial|configurar|instalar|ativar|desativar/.test(heads);
  const price = /preco|quanto custa|valor|lancamento|data de lancamento/.test(heads);
  const review = /review|analise|testamos|hands-on|comparativo/.test(heads);
  const fresh = t.sources.size >= 3 || t.trendHit;

  if (isCovered) {
    return { type: 'Atualização', title: `Atualize o post existente sobre ${name}`, search: `${t.term} atualização`, slot: '11h', note: 'edite o post e ponha horário em `updated`' };
  }
  if (howTo || cat === 'Tutoriais' || cat === 'Dicas') {
    return { type: 'Tutorial', title: `Como usar ${name}: passo a passo`, search: `como ${t.term}`, slot: '11h', note: '800-1.200 palavras, com passos numerados' };
  }
  if (review || cat === 'Reviews') {
    return { type: 'Evergreen', title: `${name} vale a pena? O que muda e para quem serve`, search: `${t.term} vale a pena`, slot: '18h', note: '1.000-1.800 palavras, veredito no início' };
  }
  if (price) {
    return { type: 'Artigo com ângulo de busca', title: `${name}: preço e data no Brasil`, search: `${t.term} preço brasil`, slot: '7h', note: '500-800 palavras, preço no primeiro parágrafo' };
  }
  if (fresh) {
    return { type: 'Artigo quente', title: `${name}: o que se sabe até agora`, search: t.term, slot: '7h', note: '800-1.200 palavras, escolha a categoria pelo tema' };
  }
  return { type: 'Evergreen', title: `${name}: guia completo`, search: `o que é ${t.term}`, slot: '18h', note: '1.000-1.800 palavras' };
}

for (const cat of Object.keys(CATEGORIES)) {
  if (!byCat[cat]) continue;
  lines.push('', `## ${cat}`);
  for (const t of byCat[cat]) {
    const own = covered(t.term);
    const status = own.length ? `já coberto: ${own.map((s) => `/${s}/`).join(', ')} (considere atualizar)` : 'sem post no site';
    const s = suggest(t, cat, own.length > 0);
    lines.push('', `### ${t.term}${t.trendHit ? ' 🔥' : ''}`, `${t.sources.size} fontes · ${t.items.length} manchetes · ${status}`);
    lines.push(`**Sugestão:** ${s.type} · slot ${s.slot} · título: "${s.title}" · busca: \`${s.search}\` · ${s.note}`);
    for (const i of t.items.slice(0, 4)) lines.push(`- ${i.source}: [${i.title}](${i.link})`);
  }
}

await mkdir('radar', { recursive: true });
const out = path.join('radar', `radar-${today}.md`);
await writeFile(out, lines.join('\n') + '\n');
console.log(lines.join('\n'));
console.log(`\nSalvo em ${out}`);
