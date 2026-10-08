// Gera as imagens da Web Story "Comandos de câmera do Google Flow" a partir da capa do post (grade 3x3).
// Uso: node scripts/story-images-google-flow.mjs
import sharp from 'sharp';

const src = 'src/content/blog/images/Comandos-de-Camera-do-Google-Flow.webp';
const out = 'public/web-stories/comandos-camera-google-flow';
const xs = [8, 408, 808];
const ys = [6, 271, 523];
const cell = { width: 384, height: 254 };

// slide -> [linha, coluna] do quadro na capa
const tiles = { 3: [0, 0], 4: [0, 1], 5: [1, 1], 6: [1, 0], 7: [2, 1], 8: [2, 0], 9: [2, 2] };

for (const [n, [r, c]] of Object.entries(tiles)) {
  await sharp(src)
    .extract({ left: xs[c], top: ys[r], ...cell })
    .resize({ width: 720, kernel: 'lanczos3' })
    .jpeg({ quality: 88 })
    .toFile(`${out}/tile-${n}.jpg`);
}

const bg = (w, h) => `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#2a1363"/><stop offset="0.55" stop-color="#180f2e"/><stop offset="1" stop-color="#3a0d24"/>
  </linearGradient></defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/></svg>`;

// Fundo da capa: grade completa no meio do slide
const grid = await sharp(src).resize({ width: 720 }).toBuffer();
await sharp(Buffer.from(bg(720, 1280)))
  .composite([{ input: grid, top: 560, left: 0 }])
  .jpeg({ quality: 88 })
  .toFile(`${out}/cover-bg.jpg`);

// Poster retrato 3:4 (640x853) para o Google, com o título gravado na imagem
const posterGrid = await sharp(src).resize({ width: 640 }).toBuffer();
const title = `<svg width="640" height="853" xmlns="http://www.w3.org/2000/svg">
  <text x="320" y="130" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="92" fill="#fb7185">40</text>
  <text x="320" y="196" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="44" fill="#ffffff">comandos de câmera</text>
  <text x="320" y="248" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="44" fill="#ffffff">do Google Flow</text>
  <text x="320" y="770" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#c4b5fd">techonplay.com.br</text></svg>`;
await sharp(Buffer.from(bg(640, 853)))
  .composite([{ input: posterGrid, top: 300, left: 0 }, { input: Buffer.from(title), top: 0, left: 0 }])
  .jpeg({ quality: 88 })
  .toFile(`${out}/poster-portrait.jpg`);
console.log('ok');
