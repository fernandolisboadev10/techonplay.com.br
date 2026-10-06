---
title: "Marca-d'água invisível em textos de IA: como funciona o textGrain"
description: "A OpenAI anunciou o textGrain, marca-d'água invisível em textos do ChatGPT. Veja como funciona, quem recebe, o que o detector acerta e onde ele falha."
category: "Inteligência Artificial"
date: 2026-10-06T18:00:00-03:00
readingTime: "6 min"
image: "./images/marca-dagua-invisivel-textos-ia-textgrain.webp"
imageAlt: "Página impressa sobre uma mesa com uma lupa sobre algumas palavras"
tags: ["OpenAI", "ChatGPT", "textGrain", "Marca-d'água"]
related: ["chatgpt-gratis-ou-pago", "deepseek-2026-guia-completo"]
---

A OpenAI anunciou em 5 de outubro de 2026 o **textGrain**, uma marca-d'água invisível para textos gerados pelo ChatGPT. Ela não aparece na tela nem usa caracteres escondidos: é um padrão estatístico na escolha das palavras, que um detector da própria OpenAI pode procurar depois. Este guia explica como funciona, quem recebe, quanto o detector acerta e onde ele falha, com base na reportagem do Canaltech e em outras publicações.

## Resumo rápido

| 🎯 Pergunta | ✅ Resposta |
| --- | --- |
| O que é? | Marca-d'água estatística invisível em textos do ChatGPT |
| Quem recebe primeiro? | Usuários da União Europeia, nas próximas semanas |
| Brasil? | Não recebe automaticamente no início |
| O detector é público? | Não: fica restrito a pesquisadores e organizações aprovadas |
| É infalível? | Não: edições e textos curtos reduzem a detecção |

## Como a marca-d'água funciona

Segundo o [Canaltech](https://canaltech.com.br/inteligencia-artificial/chatgpt-copia-o-claude-e-tambem-comeca-a-carimbar-textos-feitos-por-sua-ia/), o textGrain ajusta de leve o cálculo de probabilidade das palavras enquanto o modelo escreve. Isso cria um padrão estatístico que a pessoa não percebe, sem marcas visíveis nem caracteres ocultos. Depois, um detector da OpenAI consegue procurar esse padrão.

Em termos simples: a IA sempre escolhe a próxima palavra entre várias opções. A marca-d'água inclina essa escolha de um jeito discreto e repetido. Um texto longo carrega muitas dessas escolhas, e o detector verifica se o conjunto bate com o padrão.

## O que o detector responde

O detector indica se um modelo da OpenAI provavelmente participou da geração ou da edição do conteúdo. Ele não mede o quanto de trabalho humano houve no texto, de acordo com o Canaltech. Ou seja, não separa "escrito pela IA" de "revisado pela IA".

## Quem recebe e quando

O Canaltech informa que o lançamento inicial será só na União Europeia, nas próximas semanas. Clientes da API, em qualquer país, podem ativar a marca de forma voluntária em modelos compatíveis. Usuários brasileiros do ChatGPT não recebem a marca automaticamente no começo.

Outras publicações sobre o anúncio indicam que ela vale para o ChatGPT e para o Codex e que o motivo é a lei de inteligência artificial da União Europeia, que exige transparência sobre conteúdo gerado por IA.

## Quanto o detector acerta

Os números testados, segundo o Canaltech, mostram os limites:

| Situação | Detecção |
| --- | --- |
| Texto de 200 tokens | cerca de 80%, com 1% de falsos positivos |
| Texto de 400 tokens | cerca de 95% |
| Edição de 10% das palavras | cai de cerca de 92% para 66% |
| Troca de 25% das palavras | cai para 17% |

Token é um pedaço de palavra: 200 tokens equivalem a um texto curto, de um ou dois parágrafos. Quanto menor o texto e mais ele é editado, pior a detecção. A própria OpenAI reconhece que o detector pode errar para os dois lados, com falsos positivos e falsos negativos.

## E o Claude?

O Canaltech afirma que a Anthropic, criadora do Claude, já adotava uma abordagem parecida desde agosto de 2026, com uma versão modificada do SynthID-Text. Nos dois casos, o acesso ao detector é limitado a pesquisadores e organizações aprovadas, e não ao público geral.

## Linha do tempo

- **Agosto de 2026:** a Anthropic adota uma marca-d'água baseada em uma versão modificada do SynthID-Text, segundo o Canaltech.
- **5 de outubro de 2026:** a OpenAI anuncia o textGrain.
- **Hoje:** clientes da API podem ativar a marca em modelos compatíveis.
- **Próximas semanas:** início da marca em textos de usuários elegíveis do ChatGPT na União Europeia.

## Por que a União Europeia está no centro

De acordo com o Canaltech, as duas empresas respondem às exigências de transparência da lei de inteligência artificial da União Europeia, que pede que conteúdo gerado por IA possa ser identificado por máquinas. Isso explica por que o início é na Europa, enquanto no Brasil a marca só aparece, por ora, para quem a ativa pela API.

## O que isso significa para você

- **Não existe detector público confiável.** Quem usa ChatGPT no Brasil não terá a marca de início, e o detector não está aberto.
- **Uma marca não prova autoria.** Com taxas de 80% em textos curtos e queda forte após edição, usar o resultado como prova contra alguém seria arriscado.
- **Transparência é o caminho.** Se você usa IA no trabalho ou nos estudos, avise quando for relevante e revise o conteúdo. É mais seguro do que depender de ferramentas para esconder ou detectar.
- **Fique atento às regras locais.** Escolas, empresas e veículos podem ter política própria sobre uso de IA.

## Perguntas frequentes

**O textGrain muda a qualidade do texto?**

_Segundo as reportagens, a OpenAI diz que o ajuste não altera a qualidade do texto._

**Posso usar o detector?**

_Não, ele é restrito a pesquisadores e organizações aprovadas._

**Editar o texto remove a marca?**

_Reduz a chance de detecção: segundo o Canaltech, editar 10% das palavras derruba a taxa de cerca de 92% para 66%, e trocar 25% a leva a 17%._

**Isso vale para textos feitos no Brasil?**

_No início, não automaticamente: o lançamento é na União Europeia, e a API permite ativação voluntária._

Para mais conteúdo sobre IA, veja a página de [Inteligência Artificial](/categoria/inteligencia-artificial/). Se quer entender os planos do assistente, leia [ChatGPT grátis ou pago](/chatgpt-gratis-ou-pago/), e para conhecer uma alternativa, o guia do [DeepSeek em 2026](/deepseek-2026-guia-completo/).
