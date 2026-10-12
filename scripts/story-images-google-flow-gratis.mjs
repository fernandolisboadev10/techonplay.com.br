// Gera as imagens da Web Story "Google Flow é grátis?".
// As fotos vêm do Gemini (o dono gera e devolve), a capa e o fundo do fechamento são recortes locais
// da capa do post. Nada aqui usa API paga.
// Uso: node scripts/story-images-google-flow-gratis.mjs <pasta-com-as-imagens-do-gemini>
import sharp from 'sharp';

const srcDir = process.argv[2];
if (!srcDir) {
  console.error('Informe a pasta com as imagens do Gemini.');
  process.exit(1);
}

const out = 'public/web-stories/google-flow-gratis';
const cover = 'src/content/blog/images/Google-Flow.webp';

// arquivo recebido -> slide
const slides = { '4.webp': 2, '1.webp': 3, '2.webp': 4, '7.jpg': 5, '8.webp': 6, '3.webp': 7, '6.jpg': 8 };
for (const [file, n] of Object.entries(slides)) {
  await sharp(`${srcDir}/${file}`)
    .resize({ width: 720, height: 1280, fit: 'cover', position: 'attention' })
    .jpeg({ quality: 88 })
    .toFile(`${out}/slide-${n}.jpg`);
}

const bg = (w, h) => `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#2a1363"/><stop offset="0.55" stop-color="#180f2e"/><stop offset="1" stop-color="#3a0d24"/>
  </linearGradient></defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/></svg>`;

// Capa da story: foto do post no meio do slide, título em HTML por cima e embaixo
const photo = await sharp(cover).resize({ width: 720 }).toBuffer();
await sharp(Buffer.from(bg(720, 1280)))
  .composite([{ input: photo, top: 640, left: 0 }])
  .jpeg({ quality: 88 })
  .toFile(`${out}/cover-bg.jpg`);

// Fundo do fechamento: recorte vertical do notebook na capa do post
await sharp(cover)
  .extract({ left: 330, top: 0, width: 450, height: 800 })
  .resize({ width: 720, height: 1280 })
  .jpeg({ quality: 88 })
  .toFile(`${out}/closing-bg.jpg`);

// Poster 3:4 (640x853): recorte da imagem do Gemini com o título gravado por código
const meta = await sharp(`${srcDir}/5.jpg`).metadata();
const h34 = Math.round((meta.width * 4) / 3);
const posterBase = await sharp(`${srcDir}/5.jpg`)
  .extract({ left: 0, top: meta.height - h34, width: meta.width, height: h34 })
  .resize({ width: 640, height: 853 })
  .toBuffer();
const title = `<svg width="640" height="853" xmlns="http://www.w3.org/2000/svg">
  <rect width="640" height="330" fill="#ffffff" fill-opacity="0.55"/>
  <text x="320" y="130" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="76" fill="#180f2e">Google Flow</text>
  <text x="320" y="225" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="76" fill="#e11d48">é grátis?</text>
  <text x="320" y="290" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#2a1363">50 créditos por dia, com limites</text>
  <text x="320" y="820" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="28" fill="#ffffff">techonplay.com.br</text></svg>`;
await sharp(posterBase)
  .composite([{ input: Buffer.from(title), top: 0, left: 0 }])
  .jpeg({ quality: 88 })
  .toFile(`${out}/poster-portrait.jpg`);
console.log('ok');
