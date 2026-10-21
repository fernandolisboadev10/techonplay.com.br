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
    title: 'Tutoriais: passo a passo de IA, contas e serviços',
    description:
      'Passo a passo para entrar e configurar serviços do dia a dia: login do ChatGPT, NotebookLM, Skills do Gemini e justificativa eleitoral, sem complicação.',
    intro:
      'Guias práticos, com etapas numeradas, para resolver tarefas do dia a dia. Para Windows e Linux, veja a categoria Sistemas.',
  },
  {
    slug: 'dicas',
    name: 'Dicas',
    title: 'Dicas de tecnologia para o dia a dia',
    description:
      'Dicas para escolher e usar melhor a tecnologia: navegadores, assinaturas, golpes online e ferramentas úteis do dia a dia.',
    intro:
      'Comparativos e recomendações para decidir melhor: qual navegador usar, como economizar em assinaturas e como se proteger de golpes online.',
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
      'Guias de aplicativos e plugins úteis, com instalação, custos e os erros mais comuns explicados.',
  },
  {
    slug: 'educacao',
    name: 'Educação',
    title: 'Educação: IA na escola, BNCC, ENEM e ferramentas para estudar',
    description:
      'IA na escola, BNCC Computação, redação do ENEM e ferramentas gratuitas para professores e estudantes, explicadas em português e com passo a passo.',
    intro:
      'Conteúdo para quem ensina e para quem estuda: o que muda com a BNCC Computação, como usar IA em sala de aula, como se preparar para a redação do ENEM e quais planos e ferramentas estudantes podem resgatar de graça.',
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
