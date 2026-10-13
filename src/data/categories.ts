export interface Category {
  slug: string;
  name: string;
  title: string;
  description: string;
  intro: string;
}

// Category pages are real, indexable URLs (/categoria/<slug>/). `name` must match the `category` field in the posts' frontmatter.
export const categories: Category[] = [
  {
    slug: 'inteligencia-artificial',
    name: 'Inteligência Artificial',
    title: 'Inteligência Artificial: notícias, guias e comandos',
    description:
      'Notícias, tutoriais e guias sobre ChatGPT, Gemini, Claude e ferramentas de IA de vídeo e imagem, em português e com passo a passo simples.',
    intro:
      'Tudo sobre IA em linguagem simples: como entrar e usar o ChatGPT, comandos prontos para gerar imagens e vídeos, novidades do Google e da Anthropic e explicações sobre como essas ferramentas funcionam.',
  },
  {
    slug: 'jogos',
    name: 'Jogos',
    title: 'Jogos: lançamentos, requisitos de PC e hardware',
    description:
      'Lançamentos, requisitos de PC, hardware e novidades do mundo dos games, como Steam Machine, GTA 6 e Subway Surfers, com preço e data no Brasil.',
    intro:
      'Notícias e guias para quem joga no PC, no console e no celular: requisitos, preços em reais, ficha técnica de hardware e o que muda em cada atualização.',
  },
  {
    slug: 'tutoriais',
    name: 'Tutoriais',
    title: 'Tutoriais: passo a passo para Windows e tecnologia',
    description:
      'Passo a passo para Windows e tecnologia do dia a dia: comandos do CMD, limpeza do PC e dicas práticas para resolver problemas sem complicação.',
    intro:
      'Guias práticos, com etapas numeradas, para resolver problemas comuns no computador sem instalar programas nem depender de terceiros.',
  },
  {
    slug: 'dicas',
    name: 'Dicas',
    title: 'Dicas de tecnologia para o dia a dia',
    description:
      'Dicas para escolher e usar melhor a tecnologia: navegadores, planos de IA para estudantes, educação e ferramentas úteis do dia a dia.',
    intro:
      'Comparativos e recomendações para decidir melhor: qual navegador usar, como aproveitar ofertas para estudantes e como a tecnologia entra na escola.',
  },
  {
    slug: 'curiosidades',
    name: 'Curiosidades',
    title: 'Curiosidades sobre tecnologia, IA e cultura digital',
    description:
      'Curiosidades sobre tecnologia, IA, cinema e cultura digital: do significado do GPT ao filme sobre Sam Altman, em textos rápidos e diretos.',
    intro:
      'Histórias e explicações curtas sobre o que está por trás da tecnologia que usamos, de siglas famosas a filmes, sistemas e equipamentos.',
  },
  {
    slug: 'reviews',
    name: 'Reviews',
    title: 'Reviews de celulares e gadgets: preço e ficha técnica',
    description:
      'Reviews e análises de celulares e gadgets, com ficha técnica, preço no Brasil e se vale a pena: Galaxy A57, iPhone Duo e mais.',
    intro:
      'Análises com ficha técnica, comparativos com a geração anterior e preço atualizado no Brasil, para você decidir se o aparelho vale o investimento.',
  },
  {
    slug: 'apps',
    name: 'Apps',
    title: 'Apps e plugins: guias de instalação e uso',
    description:
      'Aplicativos, plugins e ferramentas para usar no dia a dia, com guias de instalação e uso, como o plugin Higgsfield no ChatGPT.',
    intro:
      'Guias de aplicativos e plugins úteis, com instalação, custos e os erros mais comuns explicados.',
  },
];

export const categoryHref = (name: string): string => {
  const c = categories.find((x) => x.name === name);
  return c ? `/categoria/${c.slug}/` : '/blog/';
};
