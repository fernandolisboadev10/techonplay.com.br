export const operacoesDoLabirinto = ['Adição', 'Subtração', 'Multiplicação', 'Divisão', 'Revisão'];

const niveis = {
  4: { parcelas: [12, 120], fatores: [3, 12], tabuada: [2, 9], quocientes: [3, 15], escala: 1 },
  5: { parcelas: [120, 1200], fatores: [12, 35], tabuada: [4, 15], quocientes: [12, 45], escala: 1 },
  6: { parcelas: [23, 349], fatores: [13, 94], tabuada: [2, 9], quocientes: [11, 99], escala: 10 },
  7: { parcelas: [12, 130], fatores: [4, 22], tabuada: [3, 12], quocientes: [4, 30], escala: 1, negativos: true },
};

const formato = new Intl.NumberFormat('pt-BR', { useGrouping: false, maximumFractionDigits: 1 });

function sortear([inicio, fim]) {
  return inicio + Math.floor(Math.random() * (fim - inicio + 1));
}

function formatar(valor) {
  return formato.format(valor).replace('-', '−');
}

function operando(valor) {
  return valor < 0 ? `(${formatar(valor)})` : formatar(valor);
}

function criarAdicao(nivel) {
  const a = sortear(nivel.parcelas);
  const b = sortear(nivel.parcelas) * (nivel.negativos ? -1 : 1);
  const v = (n) => formatar(n / nivel.escala);

  return {
    conta: `${v(a)} + ${operando(b / nivel.escala)}`,
    resultado: a + b,
    alternativas: [a - b, a + b + 2, a + b - 3],
    dica: nivel.negativos
      ? 'Somar um número negativo equivale a subtrair seu valor sem o sinal.'
      : 'Some os números alinhando as ordens. Se houver vírgula, alinhe as vírgulas também.',
    explicacao: nivel.negativos
      ? `${v(a)} − ${v(-b)} = ${v(a + b)}.`
      : `${v(a)} mais ${v(b)} totaliza ${v(a + b)}.`,
  };
}

function criarSubtracao(nivel) {
  const mag1 = sortear(nivel.parcelas);
  const mag2 = sortear(nivel.parcelas);
  const a = nivel.negativos ? -mag1 : Math.max(mag1, mag2);
  const b = nivel.negativos ? -mag2 : Math.min(mag1, mag2);
  const v = (n) => formatar(n / nivel.escala);

  return {
    conta: `${operando(a / nivel.escala)} − ${operando(b / nivel.escala)}`,
    resultado: a - b,
    alternativas: [a + b, b - a, a - b + 2],
    dica: nivel.negativos
      ? 'Subtrair um número negativo é o mesmo que somar seu oposto.'
      : 'Procure o número que, somado ao segundo termo, dá o primeiro termo.',
    explicacao: nivel.negativos
      ? `${v(a)} + ${v(-b)} = ${v(a - b)}.`
      : `${v(a - b)} + ${v(b)} = ${v(a)}, então a diferença é ${v(a - b)}.`,
  };
}

function criarMultiplicacao(nivel) {
  const a = sortear(nivel.fatores) * (nivel.negativos ? -1 : 1);
  const b = sortear(nivel.tabuada);
  const valor = a / nivel.escala;

  return {
    conta: `${operando(valor)} × ${b}`,
    resultado: a * b,
    alternativas: [-a * b, a * (b + 1), a * (b - 1)],
    dica: nivel.negativos
      ? 'Multiplique os valores sem sinal. Quando os sinais são diferentes, o produto é negativo.'
      : `Calcule ${b} vezes ${formatar(valor)}. Você pode somar parcelas iguais.`,
    explicacao: nivel.negativos
      ? `${formatar(-valor)} × ${b} = ${formatar(-valor * b)}. Como os sinais são diferentes, o produto é ${formatar(valor * b)}.`
      : `${b} parcelas de ${formatar(valor)} somam ${formatar(valor * b)}.`,
  };
}

function criarDivisao(nivel) {
  const divisor = sortear(nivel.tabuada) * (nivel.negativos ? -1 : 1);
  const quociente = sortear(nivel.quocientes) * (nivel.negativos && Math.random() < 0.5 ? -1 : 1);
  const dividendo = quociente * divisor;
  const valor = quociente / nivel.escala;

  return {
    conta: `${operando(dividendo / nivel.escala)} ÷ ${operando(divisor)}`,
    resultado: quociente,
    alternativas: [-quociente, quociente + 2, quociente - 3],
    dica: 'Qual número multiplicado pelo divisor dá o dividendo? Confira também o sinal do resultado.',
    explicacao: `${operando(valor)} × ${operando(divisor)} = ${formatar(dividendo / nivel.escala)}. O quociente é ${formatar(valor)}.`,
  };
}

function criarRevisao(nivel) {
  const a = sortear(nivel.fatores);
  const b = sortear(nivel.fatores) * (nivel.negativos ? -1 : 1);
  const c = sortear(nivel.tabuada);
  const soma = a + b;

  return {
    conta: `(${formatar(a / nivel.escala)} ${b < 0 ? '−' : '+'} ${formatar(Math.abs(b) / nivel.escala)}) × ${c}`,
    resultado: soma * c,
    alternativas: [a + b * c, soma, soma * c + 2],
    dica: 'Resolva primeiro a conta entre parênteses. Depois, multiplique.',
    explicacao: `A conta entre parênteses dá ${formatar(soma / nivel.escala)}. Depois, ${operando(soma / nivel.escala)} × ${c} = ${formatar(soma * c / nivel.escala)}.`,
  };
}

const criarContas = [criarAdicao, criarSubtracao, criarMultiplicacao, criarDivisao, criarRevisao];

export function criarDesafioDoLabirinto(ano, fase) {
  const nivel = niveis[ano];
  const { conta, resultado, alternativas, dica, explicacao } = criarContas[fase](nivel);
  const opcoes = new Set([resultado]);
  for (const alternativa of alternativas) {
    if (nivel.negativos || alternativa >= 0) opcoes.add(alternativa);
  }
  for (let passo = 1; opcoes.size < 4; passo++) opcoes.add(resultado + passo);

  const valores = [...opcoes];
  for (let i = valores.length - 1; i > 0; i--) {
    const outro = sortear([0, i]);
    [valores[i], valores[outro]] = [valores[outro], valores[i]];
  }

  return {
    title: `${operacoesDoLabirinto[fase]} · ${ano}º ano`,
    prompt: `Quanto é ${conta}?`,
    options: valores.map((valor) => formatar(valor / nivel.escala)),
    answer: valores.indexOf(resultado),
    hint: dica,
    explanation: explicacao,
  };
}
