// @ts-check
import { readFileSync, readdirSync } from 'node:fs';
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeExternalLinks from 'rehype-external-links';
import remarkPromptBox from './src/plugins/remark-prompt-box.mjs';
import { themes, matchesTheme, MIN_THEME_POSTS } from './src/data/themes.mjs';

const blogDir = new URL('./src/content/blog/', import.meta.url);
const dateBySlug = new Map();
const postsPerCategory = new Map();
const livePosts = [];

for (const file of readdirSync(blogDir)) {
  if (!file.endsWith('.md')) continue;
  const content = readFileSync(new URL(file, blogDir), 'utf-8');
  const match = content.match(/^updated:\s*(\S+)/m) ?? content.match(/^date:\s*(\S+)/m);
  if (new Date(content.match(/^date:\s*(\S+)/m)?.[1] ?? 0) > new Date()) continue; // scheduled, not live yet
  const cat = content.match(/^category:\s*"([^"\r\n]+)"/m);
  const tagLine = content.match(/^tags:\s*\[(.*)\]/m);
  livePosts.push({ id: file.replace(/\.md$/, ''), tags: tagLine ? tagLine[1].split(',').map((t) => t.trim().replace(/^["']|["']$/g, '')) : [] });
  if (cat) postsPerCategory.set(cat[1].trim(), (postsPerCategory.get(cat[1].trim()) ?? 0) + 1);
  if (match) {
    dateBySlug.set(file.replace(/\.md$/, ''), new Date(match[1]));
  }
}

// https://astro.build/config
export default defineConfig({
  site: 'https://techonplay.com.br',
  // URLs herdadas do WordPress (categorias, feed e sitemaps do Yoast)
  redirects: {
    '/category/inteligencia-artificial': '/categoria/inteligencia-artificial/',
    '/category/jogos': '/categoria/jogos/',
    '/category/tutoriais': '/categoria/tutoriais/',
    '/category/dicas': '/categoria/dicas/',
    '/category/curiosidades': '/categoria/curiosidades/',
    '/category/reviews': '/categoria/reviews/',
    '/category/apps': '/categoria/apps/',
    '/category/sem-categoria': '/blog',
    '/feed': '/rss.xml',
    '/sitemap_index.xml': '/sitemap-index.xml',
    '/wp-sitemap.xml': '/sitemap-index.xml',
    '/post-sitemap.xml': '/sitemap-0.xml',
    '/page-sitemap.xml': '/sitemap-0.xml',
    '/category-sitemap.xml': '/sitemap-index.xml',
  },
  // Self-hosted fonts: no Google Fonts round trips, preloaded and with metric-matched fallbacks.
  fonts: [
    { provider: fontProviders.google(), name: 'Inter', cssVariable: '--f-inter', weights: [400, 500, 600, 700], styles: ['normal'], subsets: ['latin'], fallbacks: ['sans-serif'] },
    { provider: fontProviders.google(), name: 'Archivo', cssVariable: '--f-archivo', weights: [600, 700, 800], styles: ['normal'], subsets: ['latin'], fallbacks: ['sans-serif'] },
    { provider: fontProviders.google(), name: 'Lexend', cssVariable: '--f-lexend', weights: [300, 400], styles: ['normal'], subsets: ['latin'], fallbacks: ['sans-serif'] },
    { provider: fontProviders.google(), name: 'IBM Plex Mono', cssVariable: '--f-plex-mono', weights: [400, 500], styles: ['normal'], subsets: ['latin'], fallbacks: ['monospace'] },
  ],
  integrations: [
    sitemap({
      // Category pages with fewer than 2 posts (and theme pages with fewer than MIN_THEME_POSTS) are noindex, so keep them out of the sitemap.
      filter(page) {
        const th = new URL(page).pathname.match(/^\/tema\/([^/]+)\/?$/);
        if (th) {
          const theme = themes.find((x) => x.slug === th[1]);
          return !!theme && livePosts.filter((p) => matchesTheme(theme, p.id, p.tags)).length >= MIN_THEME_POSTS;
        }
        const m = new URL(page).pathname.match(/^\/categoria\/([^/]+)\/?$/);
        if (!m) return true;
        const names = { 'inteligencia-artificial': 'Inteligência Artificial', jogos: 'Jogos', tutoriais: 'Tutoriais', dicas: 'Dicas', curiosidades: 'Curiosidades', reviews: 'Reviews', sistemas: 'Sistemas', apps: 'Apps', tendencias: 'Tendências', educacao: 'Educação' };
        return (postsPerCategory.get(names[m[1]]) ?? 0) >= 2;
      },
      serialize(item) {
        const slug = new URL(item.url).pathname.replace(/^\/|\/$/g, '');
        const date = dateBySlug.get(slug);
        if (date) item.lastmod = date;
        return item;
      },
    }),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkPromptBox],
      rehypePlugins: [
        [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
      ],
    }),
  },
});
