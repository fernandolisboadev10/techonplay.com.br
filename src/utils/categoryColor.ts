// Cor do chip por categoria (texto branco por cima: todas passam de 4.5:1).
const COLORS: Record<string, string> = {
  "Inteligência Artificial": '#6d28d9',
  "Jogos": '#be123c',
  "Reviews": '#b45309',
  "Apps": '#2563eb',
  "Tutoriais": '#0f766e',
  "Dicas": '#15803d',
  "Curiosidades": '#a21caf',
};

export const categoryColor = (category: string): string => COLORS[category] ?? '#6d28d9';
