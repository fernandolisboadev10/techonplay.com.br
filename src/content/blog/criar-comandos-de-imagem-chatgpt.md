---
title: "Como criar seus próprios comandos de imagem no ChatGPT"
seoTitle: "Criar comandos de imagem no ChatGPT: receita e 3 modelos"
description: "Aprenda a criar comandos personalizados no ChatGPT para imagem: receita em 4 partes e 3 modelos prontos (/polaroid, /noir, /isometric) para copiar."
category: "Inteligência Artificial"
date: 2026-10-29T10:15:00-03:00
readingTime: "8 min"
image: "./images/criar-comandos-de-imagem-chatgpt.webp"
imageAlt: "Mesa de madeira com um celular mostrando a selfie de um homem numa trilha com lago e montanhas e, no notebook, três versões da mesma foto: estilo instantâneo, preto e branco e miniatura isométrica"
tags: ["ChatGPT", "Comandos", "Prompts", "Imagens com IA", "Edição de fotos"]
related: ["comandos-do-chatgpt", "comandos-chatgpt-editar-fotos", "angulos-de-camera-prompt-ia", "prompt-foto-profissional-chatgpt"]
faq:
  - question: "Os comandos com barra, como /polaroid, existem de verdade no ChatGPT?"
    answer: "Não como recurso oficial. A barra é uma convenção informal: o ChatGPT não tem um menu de comandos de imagem. O comando funciona porque o nome e a descrição que você escreve são lidos como instrução de estilo dentro do prompt."
  - question: "Preciso explicar o comando toda vez que usar?"
    answer: "Na mesma conversa, basta definir uma vez e depois escrever só o nome. Em outra conversa, cole a definição de novo ou guarde-a nas instruções personalizadas, se a sua conta tiver esse recurso. Se o ChatGPT errar o efeito, repita a definição inteira."
  - question: "Posso inventar qualquer nome para o comando?"
    answer: "Pode, porque o nome é só um apelido seu. O que faz o efeito acontecer é a descrição que você dá. Escolha nomes curtos e fáceis de lembrar, e prefira palavras que já descrevem o estilo."
---

Existe um truque popular: escrever algo como `/polaroid` ou `/noir` junto com a foto e ver o ChatGPT trocar o estilo da imagem. Só que ninguém precisa decorar listas prontas, porque dá para **criar comandos personalizados no ChatGPT para imagem** do seu jeito, com nome e efeito escolhidos por você. A lista pronta fica nos [100 comandos de imagem em ordem de categoria](/comandos-do-chatgpt/); aqui o foco é aprender a receita.

Uma observação que vale para tudo o que vem abaixo: esses comandos com barra **não são um recurso oficial** do ChatGPT. O guia sobre [como editar fotos com comandos prontos](/comandos-chatgpt-editar-fotos/) já mostra que são palavras que o modelo interpreta, e aqui vamos usar essa mesma ideia para você inventar os seus. Os exemplos deste artigo **não foram testados** pelo TechOnPlay, então trate cada prompt como ponto de partida e confira o resultado com a sua foto.

## O que é um comando de imagem (e o que ele não é)

Um comando de imagem é um **apelido para uma instrução de estilo**. Em vez de escrever toda vez "transforme em foto instantânea, com moldura branca, cores levemente desbotadas e luz de flash", você combina com o ChatGPT que `/polaroid` significa isso tudo.

Por trás do apelido não existe nenhum botão nem menu, só o modelo lendo a sua frase. Por isso **o nome do comando importa pouco; a descrição importa muito**. Se você escrever só `/polaroid`, o ChatGPT adivinha o que a palavra significa; se explicar o que quer, o resultado fica menos aleatório. A receita abaixo é um jeito organizado de escrever essa explicação.

## A receita em 4 partes

Todo comando que funciona bem tem as mesmas quatro peças. Guarde esta ordem:

1. **Nome curto.** Uma palavra, fácil de digitar e de lembrar: `/polaroid`, `/noir`, `/isometric`. É só o seu apelido.
2. **O que muda.** O estilo que você quer ver: tipo de foto, paleta de cores, luz, moldura, tipo de ilustração.
3. **O que se mantém.** O que não pode mexer: seu rosto, o enquadramento, a roupa, o cenário. Sem essa parte, o ChatGPT pode redesenhar tudo.
4. **Detalhes e trava.** Os pormenores do estilo (grão, contraste, ângulo) e o que evitar: sem texto, sem logotipo, sem deformar o rosto.

O guia de prompts de imagem da OpenAI vai na mesma linha. Segundo o guia de prompts de imagem da OpenAI (o OpenAI Cookbook, citado na seção sobre testes), para edições vale pedir "mude só X" junto com "mantenha todo o resto igual", declarar de forma explícita o que deve permanecer (como identidade e enquadramento) e repetir essa lista a cada nova tentativa para o modelo não se desviar. O mesmo guia recomenda indicar enquadramento e ponto de vista e refinar com pequenos ajustes, um de cada vez. As partes 2, 3 e 4 da receita são exatamente isso, só que empacotadas num apelido.

## Qual IA usar e onde enviar a foto

O caminho principal é o **ChatGPT**, no aplicativo ou no navegador. O **Gemini** também recebe foto e serve de alternativa; como não é o mesmo modelo, o resultado muda, e vale testar nos dois. Passo a passo:

1. Escolha uma foto sua ou de alguém que autorizou, nítida e com o rosto bem iluminado.
2. Abra o ChatGPT (ou o Gemini) e comece uma conversa nova.
3. Envie a foto: no ChatGPT, pelo clipe de papel; no Gemini, pelo botão "+".
4. Cole o prompt na caixa de texto, junto com a foto, e envie.
5. Compare o resultado com a original e peça ajustes na mesma conversa.

A versão gratuita costuma ter limite diário de imagens, e esse limite muda com o tempo; confira na sua conta.

## Crie o seu primeiro comando, passo a passo

Comece pela versão mais simples. Mande a foto e escreva só isto:

```prompt
Use minha foto e aplique o estilo /polaroid: foto instantânea antiga, com moldura branca. Mantenha meu rosto e o enquadramento.
```

Se o resultado já agradou, você tem um comando. Se não, vá para a versão completa, que usa as 4 partes. O molde é:

```prompt
Quando eu escrever /[nome], aplique este estilo à foto que eu enviar: [o que muda]. Mantenha [o que não pode mudar]. Detalhes: [grão, luz, contraste]. Evite: [texto, logotipos, rosto deformado]. Responda só com a imagem.
```

Troque cada colchete pelo seu texto. Depois, na mesma conversa, escreva `/[nome]` e envie outra foto. O ChatGPT deve reaproveitar a definição. Como o comportamento não é garantido, se ele ignorar o apelido, cole a definição de novo.

## Três comandos novos prontos

Cada comando abaixo vem com duas caixas: a **definição**, para você reutilizar, e o **uso direto**, para quem quer só colar e enviar com a foto. Lembre que nenhum foi testado.

| Comando | O que muda | Copiar |
|---|---|---|
| `/polaroid` | Foto de câmera instantânea, com moldura | 📋 Copiar |
| `/noir` | Preto e branco dramático, de filme antigo | 📋 Copiar |
| `/isometric` | Cena em miniatura vista de cima, em ilustração 3D | 📋 Copiar |

### 1. /polaroid

Muda a aparência para a de uma foto de câmera instantânea. Mantém você e a pose.

```prompt
Quando eu escrever /polaroid, aplique este estilo à foto que eu enviar: foto de câmera instantânea antiga, com moldura branca larga e borda inferior mais grossa, cores um pouco desbotadas, leve granulação e luz de flash suave. Mantenha meu rosto, meus traços, minha pose e o enquadramento. Sem texto nem legenda na moldura.
```

```prompt
Use minha foto e aplique o /polaroid: foto de câmera instantânea antiga, moldura branca larga, cores um pouco desbotadas e leve granulação. Mantenha meu rosto, meus traços e minha pose. Sem texto na moldura.
```

### 2. /noir

Troca as cores por um visual de filme policial antigo. A trava aqui é a pele: contraste alto não precisa apagar os traços.

```prompt
Quando eu escrever /noir, aplique este estilo à foto que eu enviar: preto e branco com contraste alto, sombras profundas, luz lateral dura e fundo escuro, no clima de filme policial antigo. Mantenha meu rosto, meus traços, minha roupa e o enquadramento. Sem texto nem logotipos.
```

```prompt
Use minha foto e aplique o /noir: preto e branco com contraste alto, sombras profundas, luz lateral dura e fundo escuro. Mantenha meu rosto, meus traços e o enquadramento. Sem texto.
```

### 3. /isometric

Este é o mais ambicioso, porque pede para redesenhar a cena. Por isso a definição pede para manter o que for reconhecível.

```prompt
Quando eu escrever /isometric, aplique este estilo à foto que eu enviar: transforme a cena numa ilustração 3D isométrica, em miniatura, vista de cima em ângulo fixo, com cores limpas, sombras suaves e fundo liso claro. Mantenha os elementos principais, as cores da roupa e a pessoa reconhecível. Sem texto nem logotipos.
```

```prompt
Use minha foto e aplique o /isometric: ilustração 3D isométrica em miniatura, vista de cima em ângulo fixo, cores limpas, sombras suaves e fundo liso claro. Mantenha a pessoa reconhecível e as cores da roupa. Sem texto.
```

## Como salvar os seus comandos

Você tem duas opções:

- **Bloco de notas ou documento.** É o jeito mais seguro: guarde suas definições num arquivo e cole no início de cada conversa. Funciona em qualquer ferramenta, inclusive no Gemini.
- **Instruções personalizadas do ChatGPT.** Segundo a [Central de Ajuda da OpenAI](https://help.openai.com/en/articles/8096356-chatgpt-custom-instructions), o recurso fica nas configurações, em Personalização, e o limite de caracteres varia conforme o plano. Não consegui abrir essa página na hora da pesquisa, então confira o caminho e o limite da sua conta antes de contar com isso. Também não testei se o ChatGPT aplica uma definição guardada ali aos pedidos de imagem, e essas instruções são gerais, valem para todas as suas conversas. Por isso, o bloco de notas costuma ser mais prático para comandos de estilo.

## Como combinar e como testar

Combine no máximo dois comandos de cada vez, como `/noir` com um ângulo de câmera do guia de [ângulos de câmera em prompts de IA](/angulos-de-camera-prompt-ia/). Evite juntar estilos que brigam entre si: `/noir` e um estilo colorido no mesmo pedido pedem coisas contrárias.

Para testar um comando novo com método, siga a lógica do [guia de prompts de imagem da OpenAI](https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide), que recomenda começar de um prompt-base simples e refinar com pequenos ajustes:

1. Use sempre a **mesma foto** nos testes, para comparar.
2. Gere uma vez, observe o que ficou bom e o que fugiu.
3. Mude **uma coisa por vez** na definição (a luz, o grão, a trava) e gere de novo.
4. Quando estiver bom, salve a definição final.

## Erros comuns

- **Confiar só no nome.** `/noir` sozinho depende do palpite do modelo. Descreva o estilo.
- **Esquecer o que manter.** Sem a trava, o rosto pode mudar junto com o estilo.
- **Definição enorme.** Um parágrafo curto e organizado costuma funcionar melhor do que dez linhas de adjetivos.
- **Esperar o mesmo resultado sempre.** O modelo gera uma imagem nova a cada pedido.

## Não ficou como queria? Peça o ajuste

```prompt
O rosto mudou. Refaça aplicando o mesmo estilo, mas mantendo exatamente os meus traços como na foto original.
```

```prompt
O efeito ficou fraco. Refaça com o estilo mais marcado, sem mudar mais nada.
```

```prompt
Exagerou. Refaça com o estilo mais leve e mantenha todo o resto igual.
```

## O que esperar

O ChatGPT redesenha a imagem inteira, então rosto e detalhes podem mudar um pouco mesmo com a trava, e cada tentativa sai diferente. Para retratos, o checklist do artigo de [prompt de foto profissional](/prompt-foto-profissional-chatgpt/) ajuda a comparar com a original.

## Perguntas frequentes

### Os comandos com barra, como /polaroid, existem de verdade no ChatGPT?

Não como recurso oficial. A barra é uma convenção informal: o ChatGPT não tem um menu de comandos de imagem. O comando funciona porque o nome e a descrição que você escreve são lidos como instrução de estilo dentro do prompt.

### Preciso explicar o comando toda vez que usar?

Na mesma conversa, basta definir uma vez e depois escrever só o nome. Em outra conversa, cole a definição de novo ou guarde-a nas instruções personalizadas, se a sua conta tiver esse recurso. Se o ChatGPT errar o efeito, repita a definição inteira.

### Posso inventar qualquer nome para o comando?

Pode, porque o nome é só um apelido seu. O que faz o efeito acontecer é a descrição que você dá. Escolha nomes curtos e fáceis de lembrar, e prefira palavras que já descrevem o estilo.

Fontes: [OpenAI Cookbook, guia de prompts para modelos de imagem](https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide) | [OpenAI, Instruções personalizadas do ChatGPT](https://help.openai.com/en/articles/8096356-chatgpt-custom-instructions) | [OpenAI, Geração de imagens no ChatGPT](https://help.openai.com/en/articles/9055440-image-generation-in-chatgpt)
