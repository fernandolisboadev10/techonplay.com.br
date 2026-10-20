---
title: "Ângulos de câmera em prompts de IA: guia com exemplos"
description: "Aprenda a pedir ângulo baixo, alto, aéreo, POV e mais em prompts de IA para imagem. Veja quando usar cada um, o mesmo prompt em 3 ângulos e os erros."
category: "Inteligência Artificial"
date: 2026-10-20T07:15:00-03:00
readingTime: "6 min"
image: "./images/angulos-de-camera-prompt-ia.webp"
imageAlt: "Fotógrafo agachado na rua aponta a câmera para cima, na direção de um arranha-céu de vidro, em ângulo baixo"
tags: ["Prompts", "Ângulos de câmera", "Imagens com IA", "IA"]
related: ["46-comandos-do-chatgpt", "comandos-camera-google-flow", "comandos-chatgpt-editar-fotos", "google-flow-gratis"]
---

Quem pede uma imagem à IA sem dizer de onde a câmera olha costuma receber a mesma foto de frente, na altura dos olhos, com cara de banco de imagens. O **ângulo de câmera no prompt** é a forma mais barata de mudar isso: uma ou duas palavras decidem se o assunto parece heroico, frágil ou apenas comum. Este guia vale para qualquer ferramenta. Para a lista de atalhos prontos, veja os [46 comandos do ChatGPT para imagens](/46-comandos-do-chatgpt/); para a versão em vídeo e foto do Google, os [40 comandos de câmera do Flow](/comandos-camera-google-flow/).

Um aviso: os atalhos com barra (como `/lowangle`) são uma convenção informal da internet, não um recurso oficial de nenhuma ferramenta. Aqui o foco é o que funciona em texto comum, que é o que todo modelo entende. Os prompts abaixo são sugestões minhas, escritas a partir da documentação e de guias publicados. Eu não rodei esses exemplos, e o resultado varia conforme o modelo e a versão. Pesquisa feita em 20/10/2026.

## Ângulo, distância e lente são coisas diferentes

Três ajustes costumam ser misturados num prompt só:

- **Ângulo**: onde a câmera está em relação ao assunto (abaixo, acima, na altura dos olhos).
- **Enquadramento**: quanto do assunto aparece (close, plano médio, plano aberto).
- **Lente**: o quanto a imagem esticar ou comprimir (grande angular, 50 mm).

O guia de ângulos da Runway recomenda combinar o ângulo, que diz onde a câmera fica, com o tipo de plano, que diz quanto do assunto preenche a imagem. Separar os dois no prompt deixa o pedido mais claro para o modelo.

## Os ângulos principais e o efeito de cada um

O quadro resume os ângulos descritos no guia da Runway, com o efeito que a empresa atribui a cada um. Trata-se de convenção do cinema e da fotografia, não de regra técnica da IA.

| Ângulo | Como pedir | Efeito costumeiro | Quando usar |
|---|---|---|---|
| Altura dos olhos | *eye-level shot* | Neutro, natural | Retrato, perfil, cena do dia a dia |
| Baixo | *low angle* | Poder, autoridade | Retrato "de líder", prédio, produto de destaque |
| Alto | *high angle* | Fragilidade, isolamento | Cena de solidão, visão geral de ambiente |
| Aéreo/zenital | *bird's eye view, top-down* | Distanciamento, padrões | Mesa, comida, mapa, composição simétrica |
| Rente ao chão | *worm's eye view* | Imponência, estranheza | Uso raro, para cenas monumentais |
| Ponto de vista | *POV* | Imersão | Cena vista pelos olhos de alguém |
| Inclinado | *Dutch angle* | Tensão, desconforto | Suspense, cena fora de eixo |

Esses termos estão em inglês porque a maior parte dos modelos foi treinada com legendas em inglês. Misturar o resto do prompt em português costuma funcionar, mas ao menos o termo da câmera vale a pena manter em inglês. Isso é uma observação prática, não uma garantia.

## O mesmo prompt em três ângulos

Para comparar, mantenha tudo igual e troque só o ângulo. Comece com este prompt-base, que serve de teste em qualquer gerador.

```prompt
Eye-level shot de uma barista de avental verde servindo um café numa cafeteria pequena, luz natural da janela, fundo levemente desfocado, foto realista.
```

Agora troque só o começo:

```prompt
Low angle shot de uma barista de avental verde servindo um café numa cafeteria pequena, luz natural da janela, fundo levemente desfocado, foto realista.
```

```prompt
Top-down shot, câmera diretamente acima, de uma barista de avental verde servindo um café numa cafeteria pequena, luz natural da janela, foto realista.
```

O esperado, segundo a lógica descrita acima: o primeiro dá uma cena neutra, o segundo deixa a barista mais imponente, e o terceiro transforma o balcão num desenho de formas vistas de cima. Teste nas suas ferramentas e compare, porque cada plataforma interpreta ângulos de forma diferente. A própria Runway recomenda testar os prompts em mais de uma ferramenta.

## Como escrever o ângulo no prompt

A documentação oficial da OpenAI para os modelos de imagem aconselha especificar o enquadramento e o ponto de vista (close, plano aberto, visão de cima) e o ângulo (altura dos olhos, ângulo baixo). Ela dá este exemplo de fotografia: "shot like a 35mm film photograph, medium close-up at eye level, using a 50mm lens". O mesmo guia avisa que especificações detalhadas de câmera podem ser interpretadas de forma solta, então use-as para o clima geral e a composição, não como medida exata.

A Runway sugere colocar o termo de câmera no começo do prompt, porque, segundo a empresa, as primeiras palavras pesam mais. Nos testes de outras pessoas isso aparece com frequência, mas não é garantido em todo modelo.

Um modelo de frase que ajuda:

```prompt
[ângulo] + [enquadramento] de [assunto fazendo uma ação], [lugar], [luz], foto realista
```

Exemplo preenchido:

```prompt
Low angle, plano médio de um chef de jaqueta branca empratando um risoto, cozinha profissional, luz quente de cima, foto realista.
```

## Quando usar cada ângulo

- **Retrato para LinkedIn ou currículo**: altura dos olhos, ou apenas um pouco abaixo, para passar confiança. Se o rosto distorcer, diminua a inclinação.
- **Foto de produto**: ângulo levemente alto para mostrar a embalagem inteira; ângulo baixo quando o produto precisa parecer grande, como um tênis ou uma garrafa.
- **Comida**: zenital para pratos e mesas; 45 graus para sanduíches e bolos, em que a altura conta.
- **Paisagem e prédio**: ângulo baixo com grande angular para dar altura; aéreo para mostrar a cidade ou o terreno.
- **Cena de tensão**: ângulo inclinado, em pequena dose.

Para editar uma foto que você já tem, em vez de criar do zero, os comandos de [edição de fotos no ChatGPT](/comandos-chatgpt-editar-fotos/) incluem atalhos como `/closeup` e `/droneview`, que trocam o enquadramento da imagem enviada.

## Erros comuns

1. **Pedir dois ângulos que se contradizem.** "Bird's eye e eye-level" confunde o modelo. Escolha uma perspectiva só, como recomenda a Runway.
2. **Usar o ângulo sem descrever a cena.** Com só "low angle", o modelo escolhe um assunto qualquer. O ângulo complementa o prompt, não o substitui.
3. **Empilhar termos.** Ângulo, lente, plano, estilo e cinco adjetivos de uma vez diluem o que importa. Fique com um ângulo, um enquadramento e, no máximo, uma lente.
4. **Esperar precisão geométrica.** "Câmera a 30 graus" é interpretado de forma aproximada. Use as palavras do cinema, que o modelo conhece melhor.
5. **Abusar do ângulo rente ao chão.** Segundo a Runway, vale usar com moderação, pelo efeito forte.
6. **Não iterar.** Comece com um ângulo, teste em vários assuntos e só depois combine com plano e lente. Se o resultado não vier como esperado, ajuste só uma coisa por vez, para saber o que mudou.

## Resumo para guardar

Escolha o ângulo pelo sentimento que a cena precisa: neutro (altura dos olhos), forte (baixo), frágil (alto), organizado (zenital). Escreva-o no começo do prompt, em inglês, e complete com assunto, lugar e luz. Teste a mesma frase em mais de um ângulo antes de decidir. Se você está começando no Google Flow, vale conferir antes [como funcionam créditos e limites](/google-flow-gratis/).

Fontes: [Runway: ângulos de câmera e tipos de plano](https://runway.com/resources/ai-camera-angle-shot-type-tips) | [OpenAI Cookbook: guia de prompts para modelos de imagem](https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide)
