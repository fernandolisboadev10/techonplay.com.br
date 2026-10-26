// Cor do chip por categoria (texto branco por cima: todas passam de 4.5:1).
const COLORS: Record<string, string> = {
  "Inteligência Artificial": '#6d28d9',
  "Jogos": '#be123c',
  "Reviews": '#b45309',
  "Sistemas": '#4d7c0f',
  "Apps": '#2563eb',
  "Curiosidades": '#a21caf',
  "Tendências": '#c2410c',
};

export const categoryColor = (category: string): string => COLORS[category] ?? '#6d28d9';
