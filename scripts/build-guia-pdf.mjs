// Gera o PDF gratuito "Apostila dos 100 comandos do ChatGPT para imagens" a partir da tabela do artigo.
// Fonte única: src/content/blog/comandos-do-chatgpt.md (rode de novo quando a lista mudar).
// Usage: node scripts/build-guia-pdf.mjs   (precisa do Chrome ou Edge instalado)
import { readFileSync, writeFileSync, mkdirSync, existsSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const POST = path.join(ROOT, 'src/content/blog/comandos-do-chatgpt.md');
const OUT_DIR = path.join(ROOT, 'public/guias');
const OUT = path.join(OUT_DIR, 'apostila-100-comandos-chatgpt-techonplay.pdf');
const work = mkdtempSync(path.join(tmpdir(), 'guia-pdf-'));
const url = (rel) => pathToFileURL(path.join(ROOT, rel)).href;
// Fotos viram JPEG leve: o Chrome embute WebP sem compressão e o PDF passaria de 6 MB.
const photo = async (rel) => {
  const out = path.join(work, path.basename(rel, '.webp') + '.jpg');
  await sharp(path.join(ROOT, rel)).resize({ width: 1200 }).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  return pathToFileURL(out).href;
};

const BROWSERS = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].filter(Boolean);
const browser = BROWSERS.find((p) => existsSync(p));
if (!browser) throw new Error('Chrome/Edge não encontrado (defina CHROME_PATH).');

// ---- 1. Comandos: lê a tabela "Lista completa" do artigo ----
const md = readFileSync(POST, 'utf8');
const start = md.indexOf('| # | 🏷️ Comando');
const lines = md.slice(start).split(/\r?\n/);
const categories = [];
for (const line of lines.slice(2)) {
  if (!line.startsWith('|')) break;
  const cmd = line.match(/^\|\s*(\d+)\s*\|\s*`([^`]+)`\s*\|\s*([^|]+?)\s*\|/);
  if (cmd) categories.at(-1).items.push({ n: cmd[1].padStart(3, '0'), cmd: cmd[2], desc: cmd[3] });
  else categories.push({ name: line.replace(/^\|\s*|\s*\|\s*$/g, ''), items: [] });
}
const total = categories.reduce((s, c) => s + c.items.length, 0);
if (total !== 100) console.warn(`Atenção: a apostila tem ${total} comandos (esperado 100).`);

const blurb = {
  'Ângulos e posicionamento de câmera': 'Onde a câmera fica: de cima, de baixo, de lado.',
  'Perspectiva e profundidade': 'Escala, distância e sensação de espaço.',
  'Movimento e ação': 'Congela ou borra o movimento da cena.',
  'Reflexos e objetos': 'Vidros, espelhos e água criam camadas na imagem.',
  'Revelação e transições': 'Surpresa e continuidade entre cenas.',
  'Efeitos cinematográficos e surreais': 'Portais, clones e luz de cinema.',
  'Comandos para conteúdo viral': 'Composições feitas para parar o scroll.',
  'Iluminação e atmosfera': 'A luz decide o clima da foto.',
  'Lentes e foco': 'Nitidez, desfoque e tipo de lente.',
  'Enquadramento e composição': 'Quanto do personagem aparece e onde.',
  'Estilo e época': 'Visual de filme, de revista ou de outra década.',
  'Clima e ambiente': 'Neblina, neve, tempestade e horário do dia.',
  'Cenas criativas': 'Efeitos artísticos para capas e posts.',
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const chapters = categories
  .map(
    (c, i) => `
  <section class="chapter">
    <header class="ch-head">
      <span class="ch-num">${String(i + 1).padStart(2, '0')}</span>
      <div><h2>${esc(c.name)}</h2><p>${esc(blurb[c.name] ?? '')}</p></div>
      <span class="ch-count">${c.items.length} comandos</span>
    </header>
    <div class="cards">
      ${c.items
        .map(
          (it) => `<div class="card"><span class="n">${it.n}</span><div class="t"><code>${esc(it.cmd)}</code><span>${esc(it.desc)}</span></div><i class="box"></i></div>`,
        )
        .join('\n      ')}
    </div>
  </section>`,
  )
  .join('\n');

const combos = [
  ['/lowangle + /goldenhour', 'Presença de foto de capa, com luz quente de fim de tarde'],
  ['/groundreflection + /bluehour', 'Reflexo no chão molhado e clima calmo depois do pôr do sol'],
  ['/dutchangle + /rain', 'Horizonte inclinado e chuva, como na foto da página 3'],
  ['/silhouettepov + /sunrise', 'Silhueta contra o amanhecer, ótima para Stories'],
  ['/closeup + /bokeh', 'Retrato com fundo suave e luzes desfocadas'],
  ['/fullbody + /negativespace', 'Visual minimalista, personagem pequeno em cena ampla'],
  ['/film35mm + /streetphoto', 'Foto de rua com cara de filme analógico'],
  ['/nightcity + /neonglow', 'Noite urbana com reflexos coloridos no rosto'],
];

const prompts = [
  ['Foto de perfil com mais presença', 'Use a foto anexada como referência e mantenha meu rosto e meu cabelo. Cena: [em pé num terraço ao entardecer, roupa casual]. /lowangle, luz dourada, textura de pele realista, sem texto na imagem.'],
  ['Foto com efeito de reflexo', 'Use a foto anexada como referência e mantenha meu rosto e meu cabelo. Cena: [caminhando numa praça depois da chuva]. /groundreflection, reflexo nítido no chão molhado, luz do pôr do sol.'],
  ['Foto de bastidores para Reels', 'Use a foto anexada como referência e mantenha meu rosto e meu cabelo. Cena: [sentado num banco de praça, olhando para a câmera]. /behindthescene, câmera num tripé aparecendo em primeiro plano, estilo bastidores.'],
];

const fonts = path.join(ROOT, 'node_modules/.astro/fonts');
const css = `
@font-face{font-family:Inter;src:url("${pathToFileURL(path.join(fonts, 'e868cdf4720e9ea5.woff2')).href}");font-weight:100 900}
@font-face{font-family:Archivo;src:url("${pathToFileURL(path.join(fonts, '58be840ac4e07877.woff2')).href}");font-weight:100 900}
:root{--ink:#180f2e;--ink2:#2a2440;--soft:#6b6383;--line:#e4defa;--bg:#faf8ff;--violet:#7c3aed;--deep:#5b21b6;--pink:#f472b6;--cyan:#22d3ee;--code:#efe9fd;--codeink:#3b1d8f}
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font:9.6pt/1.5 Inter,'Segoe UI',sans-serif;color:var(--ink2);background:var(--bg)}
code,.mono{font-family:'Cascadia Mono',Consolas,'Courier New',monospace}
h1,h2,h3{font-family:Archivo,Inter,sans-serif;color:var(--ink);line-height:1.12}

@page{size:A4;margin:15mm 14mm 20mm;background:var(--bg);
  @bottom-left{content:"TechOnPlay · techonplay.com.br";font:500 7.5pt Inter,sans-serif;color:var(--soft)}
  @bottom-center{content:"Redação: Fernando Lisboa";font:600 7.5pt Inter,sans-serif;color:var(--deep)}
  @bottom-right{content:counter(page);font:700 8pt Inter,sans-serif;color:var(--deep)}}
@page cover{margin:0;background:var(--ink);@bottom-left{content:none}@bottom-center{content:none}@bottom-right{content:none}}
@page closing{margin:0;background:var(--ink);@bottom-left{content:none}@bottom-center{content:none}@bottom-right{content:none}}

/* ---- capa ---- */
.cover{page:cover;height:297mm;width:210mm;break-after:page;position:relative;overflow:hidden;color:#fff;
  background:radial-gradient(120% 70% at 85% 0%,rgba(124,58,237,.55),transparent 60%),radial-gradient(90% 60% at 0% 100%,rgba(244,114,182,.28),transparent 60%),var(--ink);padding:20mm 18mm 16mm;display:flex;flex-direction:column}
.cover .logo{width:62mm;display:block}
.cover .eyebrow{margin-top:20mm;font:700 8.5pt Inter;letter-spacing:.22em;text-transform:uppercase;color:var(--cyan)}
.cover h1{color:#fff;font-weight:800;font-size:40pt;margin-top:5mm;letter-spacing:-.01em}
.cover h1 em{font-style:normal;background:linear-gradient(90deg,var(--cyan),#a78bfa 50%,var(--pink));-webkit-background-clip:text;background-clip:text;color:transparent}
.cover .sub{margin-top:5mm;font-size:13pt;color:#d9d2f3;max-width:150mm;line-height:1.45}
.cover .shot{margin-top:11mm;border-radius:5mm;overflow:hidden;box-shadow:0 0 0 .4mm rgba(255,255,255,.18),0 10mm 24mm rgba(0,0,0,.5)}
.cover .shot img{display:block;width:100%;height:auto}
.cover .foot{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;padding-top:8mm;border-top:.3mm solid rgba(255,255,255,.2)}
.cover .foot b{display:block;font:700 11pt Archivo;color:#fff}
.cover .foot span{font-size:8.5pt;color:#b9afe0}
.cover .tag{font:700 8pt Inter;letter-spacing:.14em;text-transform:uppercase;padding:2mm 4mm;border-radius:99mm;background:linear-gradient(90deg,var(--violet),#c026d3);color:#fff}

/* ---- páginas internas ---- */
.kicker{font:700 8pt Inter;letter-spacing:.2em;text-transform:uppercase;color:var(--violet)}
.page-title{font-weight:800;font-size:23pt;margin:2mm 0 4mm}
.lead{font-size:11pt;color:var(--ink2);max-width:165mm}
.sec{break-after:page}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm;margin:6mm 0 5mm}
.step{background:#fff;border:.3mm solid var(--line);border-radius:3.5mm;padding:5mm}
.step b{display:flex;width:8mm;height:8mm;border-radius:50%;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--violet),#c026d3);color:#fff;font:800 10pt Archivo;margin-bottom:3mm}
.step h3{font-size:11pt;margin-bottom:1.5mm}
.step p{font-size:9pt;color:var(--soft)}
.rules{background:#fff;border:.3mm solid var(--line);border-left:1.2mm solid var(--violet);border-radius:3mm;padding:4mm 6mm;margin-bottom:4mm}
.rules h3{font-size:11pt;margin-bottom:2mm}
.rules li{margin:1mm 0 1mm 4mm}
.note{display:flex;gap:4mm;background:#f3efff;border-radius:3mm;padding:3.5mm 6mm;font-size:9pt;color:var(--codeink)}
.note b{font-weight:700}
.pair{display:grid;gap:5mm;margin-top:6mm}
.pair figure{margin:0 auto;width:130mm;background:#fff;border:.3mm solid var(--line);border-radius:4mm;overflow:hidden}
.pair img{display:block;width:100%;height:auto}
.pair figcaption{padding:3.5mm 5mm;font-size:9pt;color:var(--soft)}
.pair figcaption b{color:var(--ink)}

.chapter{margin-bottom:8mm;break-inside:avoid}
.ch-head{display:flex;align-items:center;gap:4.5mm;padding:4mm 5mm;border-radius:3.5mm;background:linear-gradient(100deg,var(--ink),#3b1d8f);color:#fff;margin-bottom:3.5mm;break-after:avoid}
.ch-num{font:800 17pt Archivo;color:var(--cyan);min-width:10mm}
.ch-head h2{color:#fff;font-size:12.5pt;font-weight:700}
.ch-head p{font-size:8.5pt;color:#cfc6ee;margin-top:.5mm}
.ch-count{margin-left:auto;font:600 7.5pt Inter;letter-spacing:.06em;text-transform:uppercase;color:#e9defd;border:.25mm solid rgba(255,255,255,.35);border-radius:99mm;padding:1.2mm 3mm;white-space:nowrap}
.cards{display:grid;grid-template-columns:1fr 1fr;gap:2.5mm 3.5mm}
.card{display:flex;align-items:flex-start;gap:3mm;background:#fff;border:.3mm solid var(--line);border-radius:2.6mm;padding:2.8mm 3.2mm;break-inside:avoid}
.card .n{font:700 7pt Inter;color:#a99dd0;padding-top:1.2mm;min-width:6mm}
.card .t{flex:1;display:flex;flex-direction:column;gap:1mm}
.card code{align-self:flex-start;font-size:8.8pt;font-weight:700;color:var(--codeink);background:var(--code);padding:.6mm 2mm;border-radius:1.5mm}
.card .t span{font-size:8.4pt;line-height:1.35;color:var(--ink2)}
.box{width:3.4mm;height:3.4mm;border:.3mm solid #b9aee3;border-radius:.9mm;margin-top:1mm;flex:none}
.legend{font-size:8.5pt;color:var(--soft);margin:-2mm 0 7mm}

.pbox{background:#fff;border:.3mm solid var(--line);border-radius:3.5mm;overflow:hidden;margin-bottom:3mm;break-inside:avoid}
.pbox h3{font-size:9.6pt;padding:2.4mm 5mm;background:#f3efff;color:var(--deep)}
.pbox p{padding:3mm 5mm;font-size:8.8pt;font-style:italic;color:var(--ink2)}
table.combo{width:100%;border-collapse:separate;border-spacing:0 2mm;margin-top:3mm}
.combo td{background:#fff;padding:3mm 4mm;font-size:8.8pt;border-top:.3mm solid var(--line);border-bottom:.3mm solid var(--line)}
.combo td:first-child{border-left:.3mm solid var(--line);border-radius:2.6mm 0 0 2.6mm;white-space:nowrap;width:62mm}
.combo td:last-child{border-right:.3mm solid var(--line);border-radius:0 2.6mm 2.6mm 0}
.combo code{font-weight:700;color:var(--codeink);background:var(--code);padding:.6mm 2mm;border-radius:1.5mm;font-size:8.4pt}
.small{font-size:8.5pt;color:var(--soft);margin-top:3mm}

/* ---- fechamento ---- */
.closing{page:closing;height:297mm;width:210mm;position:relative;overflow:hidden;color:#fff;padding:24mm 20mm 16mm;display:flex;flex-direction:column;
  background:radial-gradient(100% 60% at 100% 100%,rgba(124,58,237,.5),transparent 60%),radial-gradient(80% 50% at 0% 0%,rgba(34,211,238,.18),transparent 60%),var(--ink)}
.closing .logo{width:56mm}
.closing h2{color:#fff;font-size:30pt;font-weight:800;margin-top:22mm;letter-spacing:-.01em}
.closing h2 em{font-style:normal;background:linear-gradient(90deg,var(--cyan),var(--pink));-webkit-background-clip:text;background-clip:text;color:transparent}
.closing .lead{color:#d9d2f3;margin-top:5mm}
.links{margin-top:12mm;display:grid;gap:4mm}
.link{display:flex;align-items:center;gap:5mm;padding:5mm 6mm;border-radius:4mm;background:rgba(255,255,255,.07);border:.3mm solid rgba(255,255,255,.18);color:#fff;text-decoration:none}
.link small{display:block;font:700 7.5pt Inter;letter-spacing:.16em;text-transform:uppercase;color:var(--cyan)}
.link b{font:700 13pt Archivo}
.author{margin-top:auto;display:flex;align-items:center;gap:5mm;padding-top:8mm;border-top:.3mm solid rgba(255,255,255,.2)}
.author img{width:17mm;height:17mm;border-radius:50%;object-fit:cover;box-shadow:0 0 0 .6mm var(--violet)}
.author b{display:block;font:700 12pt Archivo}
.author span{font-size:8.5pt;color:#b9afe0;display:block;max-width:120mm}
`;

const imgCover = await photo('src/content/blog/images/comandos-do-chatgpt.webp');
const imgCompare = await photo('src/content/blog/images/comandos-chatgpt-sem-comando-vs-lowangle.webp');
const imgRain = await photo('src/content/blog/images/comandos-chatgpt-dutchangle-rain.webp');

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Apostila dos 100 comandos do ChatGPT para imagens · TechOnPlay</title><style>${css}</style></head><body>

<section class="cover">
  <img class="logo" src="${url('public/images/logo.png')}" alt="TechOnPlay">
  <div class="eyebrow">Apostila gratuita · Edição de outubro de 2026</div>
  <h1><em>100 comandos</em> do ChatGPT para criar imagens</h1>
  <p class="sub">Uma palavra no prompt muda a sua foto: ângulo, luz, lente, clima e efeito, organizados por categoria e prontos para copiar.</p>
  <div class="shot"><img src="${imgCover}" alt=""></div>
  <div class="foot">
    <div><b>Redação: Fernando Lisboa</b><span>techonplay.com.br</span></div>
    <span class="tag">Apostila gratuita</span>
  </div>
</section>

<section class="sec">
  <div class="kicker">Antes de começar</div>
  <h1 class="page-title">Como usar os comandos</h1>
  <p class="lead">Um comando é um atalho de texto que diz ao ChatGPT como fotografar a cena. Você cola o termo no prompt, descreve o cenário e deixa o resto com a IA.</p>
  <div class="steps">
    <div class="step"><b>1</b><h3>Envie uma referência</h3><p>Uma foto sua, nítida e bem iluminada, ajuda a manter o rosto em qualquer ângulo.</p></div>
    <div class="step"><b>2</b><h3>Descreva a cena</h3><p>Uma frase basta: onde você está, a roupa, o horário. Sem cena, o comando perde força.</p></div>
    <div class="step"><b>3</b><h3>Termine com o comando</h3><p>Cole o termo no fim do prompt, como <code class="mono">/lowangle</code>, e gere a imagem.</p></div>
  </div>
  <div class="rules">
    <h3>Regras que evitam resultado estranho</h3>
    <ul>
      <li>Use no máximo <b>dois ou três comandos</b> por prompt. Acima disso o modelo tende a ignorar parte.</li>
      <li>Não misture efeitos opostos, como <code class="mono">/wormview</code> e <code class="mono">/birdsview</code>.</li>
      <li>Se o resultado fugir do esperado, gere de novo: o mesmo prompt pode variar a cada geração.</li>
    </ul>
  </div>
  <div class="note"><span>ⓘ</span><span><b>Transparência:</b> esses comandos não são um recurso oficial do ChatGPT. São convenções populares entre usuários, e o modelo interpreta cada palavra como instrução de estilo. O efeito pode variar entre ferramentas e entre gerações.</span></div>
  <h2 style="font-size:15pt;margin:6mm 0 2mm">Prompts prontos para copiar</h2>
  <p class="small" style="margin:0 0 3.5mm">Troque a cena entre colchetes pela sua e anexe uma foto sua como referência.</p>
  ${prompts.map(([t, p]) => `<div class="pbox"><h3>${esc(t)}</h3><p>${esc(p)}</p></div>`).join('\n  ')}
</section>

<section class="sec">
  <div class="kicker">Veja a diferença</div>
  <h1 class="page-title">O mesmo cenário, com e sem comando</h1>
  <p class="lead">Na primeira imagem, uma foto comum. Na segunda, a mesma pessoa e o mesmo lugar, só com a troca do comando de câmera.</p>
  <div class="pair">
    <figure><img src="${imgCompare}" alt=""><figcaption><b>Sem comando × /lowangle.</b> A câmera desce, o personagem ganha presença e o céu entra mais no quadro.</figcaption></figure>
    <figure><img src="${imgRain}" alt=""><figcaption><b>/dutchangle + /rain.</b> Dois comandos combinados: horizonte inclinado e cena de chuva à noite.</figcaption></figure>
  </div>
</section>

<div class="kicker">Os 100 comandos</div>
<h1 class="page-title">Lista completa por categoria</h1>
<p class="legend">Copie o comando e cole no fim do seu prompt. A caixinha à direita é para você marcar os que já testou.</p>
${chapters}

<section style="break-inside:avoid">
  <h2 style="font-size:15pt">Combinações para testar</h2>
  <p class="small" style="margin-top:1mm">Sugestões de dupla de comandos. Comece por uma e só depois some a segunda.</p>
  <table class="combo">
    ${combos.map(([c, d]) => `<tr><td><code>${esc(c)}</code></td><td>${esc(d)}</td></tr>`).join('\n    ')}
  </table>
</section>

<section class="closing">
  <img class="logo" src="${url('public/images/logo.png')}" alt="TechOnPlay">
  <h2>Gostou da apostila?<br><em>Tem mais no TechOnPlay.</em></h2>
  <p class="lead">Tutoriais de inteligência artificial, prompts e tecnologia em português, direto ao ponto. Compartilhe esta apostila com quem edita foto com IA.</p>
  <div class="links">
    <a class="link" href="https://www.instagram.com/fernandolisboa.ia/"><div><small>Siga no Instagram</small><b>@fernandolisboa.ia</b></div></a>
    <a class="link" href="https://techonplay.com.br/comandos-do-chatgpt/"><div><small>Versão sempre atualizada</small><b>techonplay.com.br/comandos-do-chatgpt</b></div></a>
  </div>
  <div class="author">
    <img src="${url('public/images/fernando-lisboa.png')}" alt="">
    <div><b>Redação: Fernando Lisboa</b><span>Apostila gratuita do TechOnPlay. Edição de outubro de 2026. Os comandos não são recurso oficial do ChatGPT.</span></div>
  </div>
</section>

</body></html>`;

const htmlFile = path.join(work, 'guia.html');
writeFileSync(htmlFile, html);
mkdirSync(OUT_DIR, { recursive: true });
execFileSync(
  browser,
  [
    '--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--user-data-dir=${path.join(work, 'profile')}`,
    '--virtual-time-budget=8000', `--print-to-pdf=${OUT}`, pathToFileURL(htmlFile).href,
  ],
  { stdio: 'ignore' },
);
console.log(`PDF gerado: ${path.relative(ROOT, OUT)} (${total} comandos)`);
