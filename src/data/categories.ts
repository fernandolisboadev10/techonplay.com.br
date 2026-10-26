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
      'Tudo sobre IA em linguagem simples: prompts e comandos prontos, planos e preços das ferramentas em reais, IA para estudar e ensinar e as novidades de ChatGPT, Gemini e Claude.',
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
      'Reviews e análises de celulares, gadgets e lançamentos, com ficha técnica, preço no Brasil e se vale a pena: Galaxy A57, iPhone Duo, Tesla Roadster e mais.',
    intro:
      'Análises com ficha técnica, comparativos com a geração anterior e preço atualizado no Brasil, para você decidir se o aparelho vale o investimento.',
  },
  {
    slug: 'sistemas',
    name: 'Sistemas',
    title: 'Sistemas: Windows, Linux, comandos e configuração',
    description:
      'Windows e Linux explicados do básico ao avançado: comandos do CMD e do terminal, atalhos, limpeza do PC, distribuições e configuração, com passo a passo.',
    intro:
      'Tecnologia pura e raiz: guias de Windows e Linux com comandos, atalhos e configurações explicados passo a passo, para você entender o que o sistema está fazendo e ter controle da máquina.',
  },
  {
    slug: 'apps',
    name: 'Apps',
    title: 'Apps e plugins: guias de instalação e uso',
    description:
      'Aplicativos, plugins e ferramentas para usar no dia a dia, com guias de instalação e uso, como o plugin Higgsfield no ChatGPT.',
    intro:
      'Guias de aplicativos, navegadores e assinaturas: instalação, custos, como pagar menos e os erros mais comuns explicados.',
  },
  {
    slug: 'tendencias',
    name: 'Tendências',
    title: 'Tendências: o que viralizou e como fazer o seu',
    description:
      'Tendências virais da internet e da IA, como fotos, filtros e desafios, com o passo a passo e os prompts exatos para você fazer o seu.',
    intro:
      'O que está em alta nas redes e nas ferramentas de IA, explicado com o passo a passo, o prompt pronto e o que evitar para o resultado sair certo.',
  },
];

export const categoryHref = (name: string): string => {
  const c = categories.find((x) => x.name === name);
  return c ? `/categoria/${c.slug}/` : '/blog/';
};
