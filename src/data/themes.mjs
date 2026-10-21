// Temas: páginas que juntam posts de qualquer categoria pelas tags (/tema/<slug>/).
// Fica em .mjs porque o astro.config.mjs também lê esta lista para filtrar o sitemap.
// Tema com menos de MIN_THEME_POSTS posts fica noindex, fora do sitemap e fora da nuvem.

/**
 * @typedef {Object} Theme
 * @property {string} slug
 * @property {string} name
 * @property {string} title
 * @property {string} description
 * @property {string} intro
 * @property {string[]} tags   tags do frontmatter que entram no tema (sem diferenciar maiúsculas)
 * @property {string[]} [slugs] posts que entram no tema mesmo sem a tag
 */

export const MIN_THEME_POSTS = 3;

/** @type {Theme[]} */
export const themes = [
  {
    slug: 'chatgpt',
    name: 'ChatGPT',
    title: 'ChatGPT: login, planos, comandos e prompts',
    description:
      'Guias de ChatGPT em português: como entrar, quanto custam os planos em reais, comandos para criar e editar imagens e prompts prontos para copiar.',
    intro:
      'Tudo o que o TechOnPlay publicou sobre o ChatGPT: como entrar na conta, qual plano escolher, comandos para imagens e prompts prontos para o dia a dia.',
    tags: ['ChatGPT'],
  },
  {
    slug: 'google-e-gemini',
    name: 'Google e Gemini',
    title: 'Google e Gemini: ferramentas de IA, planos e guias',
    description:
      'Gemini, NotebookLM, Google Flow e os planos de IA do Google explicados em português, com preço no Brasil e passo a passo.',
    intro:
      'As ferramentas de IA do Google em um lugar só: Gemini, NotebookLM, Google Flow e os planos, com o que é grátis, o que é pago e como começar.',
    tags: ['Google', 'Gemini'],
  },
  {
    slug: 'openai',
    name: 'OpenAI',
    title: 'OpenAI: ChatGPT, novidades e segurança de IA',
    description:
      'Notícias e explicações sobre a OpenAI: ChatGPT, marca-d\'água em textos de IA, agentes e o que isso muda para quem usa no Brasil.',
    intro:
      'O que a OpenAI anunciou e o que isso significa para quem usa o ChatGPT, explicado sem jargão.',
    tags: ['OpenAI'],
  },
  {
    slug: 'ia-de-video',
    name: 'IA de vídeo',
    title: 'IA de vídeo: Google Flow, Higgsfield e prompts',
    description:
      'Ferramentas de IA para criar vídeos, como Google Flow e Higgsfield, com limites, preços no Brasil e prompts de câmera para testar.',
    intro:
      'Guias de ferramentas que criam vídeo com IA: o que cada uma faz, quanto custa e os comandos de câmera para ter mais controle sobre o resultado.',
    tags: ['IA de vídeo'],
  },
  {
    slug: 'comandos-e-prompts',
    name: 'Comandos e Prompts',
    title: 'Comandos e prompts de IA prontos para copiar',
    description:
      'Comandos e prompts prontos para ChatGPT, Gemini e Google Flow: editar fotos, mudar ângulos de câmera, foto de produto e mais, com passo a passo.',
    intro:
      'Comandos curtos e prompts completos para copiar e colar, com o passo a passo de onde usar cada um e o que esperar do resultado.',
    tags: ['Comandos', 'Prompts', 'Prompts de câmera'],
    slugs: ['trend-anos-80-ia-foto-prompt', 'plugin-higgsfield-chatgpt'],
  },
  {
    slug: 'bncc',
    name: 'BNCC',
    title: 'BNCC e IA na escola: guias para professores',
    description:
      'O que é a BNCC, o que muda com a Computação nas escolas e como professores podem usar IA e robótica educacional em sala de aula.',
    intro:
      'Conteúdo para professores e escolas sobre a BNCC e a Computação: o que a norma pede, como a robótica entra e como a IA ajuda no planejamento.',
    tags: ['BNCC'],
  },
  {
    slug: 'celulares',
    name: 'Celulares',
    title: 'Celulares: reviews, preços e se vale a pena',
    description:
      'Reviews de celulares com ficha técnica e preço no Brasil: Galaxy S25, Galaxy A57, iPhone 18 Pro e iPhone Duo.',
    intro:
      'Análises de celulares com ficha técnica, preço atualizado no Brasil e a resposta direta para a pergunta "vale a pena?".',
    tags: ['Celulares'],
  },
  {
    slug: 'seguranca-e-golpes',
    name: 'Segurança e golpes',
    title: 'Segurança e golpes: como se proteger online',
    description:
      'Como identificar site falso em promoção, deepfakes e riscos de conteúdo criado com IA, com sinais de alerta e o que fazer.',
    intro:
      'Golpes, deepfakes e riscos da IA explicados com sinais de alerta práticos, para você não cair em armadilhas online.',
    tags: ['Segurança', 'Golpes', 'Deepfake'],
  },
];

export const themeHref = (slug) => `/tema/${slug}/`;

const norm = (s) => s.trim().toLowerCase();

/** O post (id + tags do frontmatter) pertence ao tema? */
export const matchesTheme = (theme, id, tags = []) =>
  (theme.slugs ?? []).includes(id) ||
  tags.some((t) => theme.tags.some((x) => norm(x) === norm(t)));
