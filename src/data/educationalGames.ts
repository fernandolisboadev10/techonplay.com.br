export const educationalGamesHref = '/categoria/jogos/jogos-educativos/';

export const gameSubjects = {
  matematica: { label: 'Matemática', color: '#ba9eff' },
  ciencias: { label: 'Ciências', color: '#7ce7fc' },
  linguagem: { label: 'Linguagem', color: '#ff9fc2' },
  logica: { label: 'Lógica', color: '#f8c887' },
  quiz: { label: 'Quizzes', color: '#d6fb80' },
};

interface EducationalGame {
  slug: string;
  title: string;
  subject: keyof typeof gameSubjects;
  description: string;
}

export const educationalGames: EducationalGame[] = [
  { slug: 'neon-rails', title: 'Neon Rails', subject: 'matematica', description: 'Desvie dos obstáculos e resolva contas para avançar pelos trilhos.' },
  { slug: 'laboratorio-sandbox', title: 'Laboratório Sandbox', subject: 'ciencias', description: 'Explore os elementos químicos e observe o que acontece quando você os combina.' },
  { slug: 'quizmania', title: 'Quizmania', subject: 'quiz', description: 'Escolha uma matéria e teste o que você sabe em rodadas de perguntas.' },
  { slug: 'labirinto-epico', title: 'Labirinto Épico', subject: 'matematica', description: 'Colete moedas, encontre a saída e resolva as contas que abrem os portais.' },
  { slug: 'sofia-na-escola', title: 'Sofia na Escola', subject: 'quiz', description: 'Acompanhe Sofia pelo dia de aula e responda às perguntas da jornada.' },
  { slug: 'desafio-geometrico-3d', title: 'Desafio Geométrico 3D', subject: 'matematica', description: 'Dispute em dupla e pratique formas, áreas e volumes do 6º ao 9º ano.' },
  { slug: 'memoria-e-caca-palavras', title: 'Memória e Caça-Palavras', subject: 'linguagem', description: 'Encontre os pares escondidos e descubra as palavras no tabuleiro.' },
  { slug: 'corrida-matematica', title: 'Corrida Matemática', subject: 'matematica', description: 'Acerte as multiplicações para acelerar em seis fases de corrida.' },
  { slug: 'matematica-em-aventura', title: 'Matemática em Aventura', subject: 'matematica', description: 'Role os dados, avance no tabuleiro e abra baús resolvendo desafios.' },
  { slug: 'ping-pong-acert', title: 'Ping Pong Acert 3D', subject: 'logica', description: 'Rebata a bola e encare desafios de raciocínio do 4º ano.' },
  { slug: 'math-fall', title: 'Math Fall', subject: 'matematica', description: 'Corra pela pista e escolha o caminho com a resposta certa.' },
  { slug: 'missoes-de-voo', title: 'Missões de Voo', subject: 'matematica', description: 'Resolva a operação para descobrir quantos portões atravessar.' },
  { slug: 'quiz-de-materias', title: 'Quiz de Matérias', subject: 'quiz', description: 'Escolha um assunto e responda a perguntas de múltipla escolha.' },
];

export const gameHref = (slug: string) => `${educationalGamesHref}${slug}/`;
export const gameFile = (slug: string) => `/jogos/${slug}/`;
export const gameCover = (slug: string) => `/images/jogos/${slug}.webp`;
export const gameVoteEvent = (slug: string) => `arcade_vote_${slug.replaceAll('-', '_')}`;
