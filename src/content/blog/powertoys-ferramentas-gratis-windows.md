---
title: "PowerToys: 5 ferramentas grátis para facilitar o Windows"
description: "Organize janelas, renomeie arquivos e copie texto de imagens com o PowerToys. Conheça cinco ferramentas grátis da Microsoft e veja como instalar."
category: "Sistemas"
date: 2026-11-11T07:00:00-03:00
readingTime: "6 min"
image: "./images/atalhos-tecla-windows.webp"
imageAlt: "Tecla Windows em destaque em um teclado, com as teclas vizinhas desfocadas"
tags: ["PowerToys", "Windows", "Microsoft", "Produtividade", "Atalhos"]
related: ["atalhos-tecla-windows", "cmd-comandos-windows", "melhor-navegador-para-pc"]
faq:
  - question: "O PowerToys é gratuito?"
    answer: "Sim. O PowerToys é um projeto gratuito e de código aberto da Microsoft. As cinco ferramentas deste artigo não exigem assinatura do Microsoft 365."
  - question: "O PowerToys já vem instalado no Windows?"
    answer: "Ele é distribuído separadamente do Windows. Se ainda não estiver no seu computador, você pode instalá-lo pela Microsoft Store ou pelo repositório oficial da Microsoft no GitHub."
  - question: "Preciso deixar o PowerToys aberto?"
    answer: "Ferramentas como FancyZones, Text Extractor e Keyboard Manager precisam do PowerToys em execução em segundo plano. Você pode fechar a janela de configurações sem encerrar o aplicativo."
---

O **PowerToys é um pacote gratuito da Microsoft que acrescenta ferramentas ao Windows** para organizar janelas, renomear arquivos em lote, reduzir imagens, copiar texto de um print e trocar a função de teclas. Você instala um aplicativo e ativa apenas os recursos que pretende usar.

Ele faz sentido para quem já conhece alguns [atalhos da tecla Windows](/atalhos-tecla-windows/) e quer ir além. Não é preciso programar nem decorar os [comandos do CMD](/cmd-comandos-windows/): as cinco ferramentas abaixo têm configuração visual e resolvem tarefas comuns de estudo e trabalho.

## O que o PowerToys faz na prática?

Pense nele como uma caixa de ferramentas para o computador. Cada utilitário resolve um problema diferente, e você pode ligar ou desligar cada um nas configurações do PowerToys.

| Ferramenta | Para que serve | Exemplo do dia a dia |
| --- | --- | --- |
| FancyZones | Divide a tela em áreas personalizadas | Deixar navegador, documento e notas lado a lado |
| PowerRename | Renomeia vários arquivos de uma vez | Trocar um trecho do nome de dezenas de fotos |
| Image Resizer | Redimensiona imagens pelo botão direito | Criar cópias menores para enviar ou publicar |
| Text Extractor | Reconhece e copia texto da tela | Tirar um endereço de dentro de um print |
| Keyboard Manager | Remapeia teclas e atalhos | Fazer Caps Lock funcionar como Ctrl |

O pacote não substitui o Windows nem é um programa para limpar ou acelerar o PC. O ganho está em **reduzir etapas de tarefas repetitivas**. Os nomes dos botões podem aparecer em português ou inglês, conforme a versão e o idioma do aplicativo.

## 1. FancyZones: arrume as janelas do seu jeito

O Windows já encaixa janelas nas laterais da tela. O FancyZones acrescenta layouts personalizados: você escolhe onde cada janela deve ficar e quanto espaço ela ocupa.

Imagine estudar com uma videoaula à esquerda, um documento no centro e suas anotações à direita. Em vez de ajustar tudo pelas bordas, você cria três zonas e encaixa os programas nelas.

**Como começar:**

1. Abra as configurações do PowerToys e ative **FancyZones**.
2. Abra o editor de layouts pelo botão da própria ferramenta.
3. Escolha um modelo ou crie sua divisão de tela.
4. Por padrão, segure **Shift** enquanto arrasta uma janela e solte sobre a zona desejada.

É especialmente útil em monitores grandes, mas também pode organizar duas janelas em um notebook. Ajuste as divisões ao tamanho da tela: três colunas muito estreitas podem atrapalhar a leitura.

## 2. PowerRename: pare de renomear arquivo por arquivo

Uma pasta com fotos chamadas `IMG_001`, `IMG_002` e `IMG_003` não diz muito sobre o conteúdo. Com o PowerRename, você troca o trecho `IMG_` por `viagem_` em todos os arquivos selecionados, preservando a numeração.

1. Ative **PowerRename** nas configurações do PowerToys.
2. Selecione os arquivos no Explorador de Arquivos.
3. Clique com o botão direito e escolha **Renomear com PowerRename**, ou o nome equivalente em inglês.
4. Preencha o campo de busca com `IMG_` e o de substituição com `viagem_`.
5. Confira a prévia dos novos nomes antes de aplicar.

Para esse exemplo, deixe a opção de expressões regulares desligada. Ela serve para buscas mais avançadas e não é necessária para uma substituição simples.

A prévia é o ponto mais importante: verifique se está alterando apenas os nomes pretendidos e mantenha as extensões, como `.jpg`, intactas. Comece com uma cópia de poucos arquivos até entender o resultado.

## 3. Image Resizer: diminua várias imagens pelo botão direito

Você não precisa abrir um editor de fotos para mudar as dimensões de dez imagens. O Image Resizer coloca essa tarefa no menu do Explorador de Arquivos.

1. Ative **Image Resizer** no PowerToys.
2. Selecione uma ou mais imagens em uma pasta.
3. Clique com o botão direito e escolha a opção de redimensionar com o Image Resizer.
4. Selecione um tamanho pronto ou configure as dimensões.
5. Mantenha a criação de cópias para preservar os originais e confirme.

Se quiser manter a foto inteira e suas proporções, prefira o modo **Ajustar (Fit)**. O modo **Preencher (Fill)** pode recortar partes da imagem; **Esticar (Stretch)** pode deformá-la.

Dimensões menores podem reduzir o tamanho do arquivo, mas o resultado também depende do formato e da compressão. A ferramenta não promete chegar a um limite exato, como 200 KB, nem recuperar detalhes que uma foto pequena não tem.

## 4. Text Extractor: copie o texto que ficou preso em um print

Recebeu uma imagem com um endereço ou precisa copiar uma frase de uma apresentação? O Text Extractor usa reconhecimento óptico de caracteres, o **OCR**, para transformar o texto visível na tela em texto copiável.

Com a ferramenta ativada, o atalho padrão é **Win + Shift + T**. Selecione a área que contém o texto, abra o aplicativo de destino e cole com **Ctrl + V**. Para cancelar a seleção, pressione **Esc**.

Segundo a [documentação oficial do Text Extractor](https://github.com/MicrosoftDocs/windows-dev-docs/blob/docs/hub/powertoys/text-extractor.md), o reconhecimento depende dos pacotes de idioma de OCR instalados no Windows. Se houver dificuldade com português, confira o idioma preferido nas configurações da ferramenta.

Revise o que foi copiado, principalmente números, acentos e endereços. Uma imagem borrada pode fazer o OCR confundir letras e algarismos. O recurso também funciona com texto visível em um vídeo pausado; ele não transcreve o áudio.

## 5. Keyboard Manager: dê outra função a uma tecla

O Keyboard Manager permite mudar o que uma tecla ou combinação faz. Um exemplo é transformar **Caps Lock em Ctrl**, se você quase nunca usa letras maiúsculas fixas e prefere um Ctrl mais acessível.

1. Ative **Keyboard Manager** no PowerToys.
2. Abra a opção de remapear uma tecla.
3. Adicione um mapeamento com **Caps Lock** como entrada e **Ctrl** como destino.
4. Salve e teste em um editor de texto.

Você também pode remapear atalhos. Comece com uma mudança por vez para perceber se ela interfere em programas que já usa. Para desfazer, remova o mapeamento nas configurações.

Há limites: **Win + L** e **Ctrl + Alt + Del** são reservados pelo sistema, e a tecla **Fn** geralmente não pode ser remapeada. As alterações do Keyboard Manager só funcionam enquanto o PowerToys estiver em execução.

## Como baixar e instalar o PowerToys

A maneira mais simples é buscar **Microsoft PowerToys** na Microsoft Store e conferir se o fornecedor é a Microsoft. Outra opção é usar a página de versões indicada no [repositório oficial do PowerToys](https://github.com/microsoft/PowerToys#installation).

Escolha a **versão estável**, evitando versões identificadas como prévia de desenvolvimento ou pré-lançamento para esse primeiro contato. Estes cinco recursos não dependem da novidade experimental de colar imagens como JPEG.

Para quem já usa o Terminal, a Microsoft também documenta a instalação pelo WinGet:

~~~powershell
winget install --id Microsoft.PowerToys --source winget
~~~

Os requisitos documentados incluem Windows 11 ou Windows 10 versão 2004 ou posterior, com processador de 64 bits x64 ou ARM64. Confira os requisitos da versão escolhida antes de baixar, especialmente em computadores antigos.

Depois da instalação, abra o painel e habilite as ferramentas desejadas. Você pode fechar a janela de configurações e manter o aplicativo em segundo plano. Ativar a inicialização com o Windows é uma opção para quem pretende usar os recursos diariamente.

## Por qual ferramenta vale a pena começar?

Se o seu trabalho envolve muitas imagens, comece pelo **Image Resizer**. Se você passa o dia alternando entre navegador e documentos, experimente o **FancyZones**. Para quem recebe informações em prints, o **Text Extractor** resolve uma tarefa bem específica sem redigitar tudo.

Ative uma ferramenta, use em uma tarefa real e só depois experimente a próxima. Se o objetivo é melhorar a navegação, vale combinar essa organização com a escolha do [navegador mais adequado para o seu PC](/melhor-navegador-para-pc/).

## Perguntas frequentes

### O PowerToys é gratuito?

Sim. O PowerToys é um projeto gratuito e de código aberto da Microsoft. As cinco ferramentas deste artigo não exigem assinatura do Microsoft 365.

### O PowerToys já vem instalado no Windows?

Ele é distribuído separadamente do Windows. Se ainda não estiver no seu computador, você pode instalá-lo pela Microsoft Store ou pelo repositório oficial da Microsoft no GitHub.

### Preciso deixar o PowerToys aberto?

Ferramentas como FancyZones, Text Extractor e Keyboard Manager precisam do PowerToys em execução em segundo plano. Você pode fechar a janela de configurações sem encerrar o aplicativo.

## Fontes consultadas

- [Microsoft PowerToys: projeto e instalação](https://github.com/microsoft/PowerToys)
- [Microsoft: requisitos e instalação](https://github.com/MicrosoftDocs/windows-dev-docs/blob/docs/hub/powertoys/install.md)
- [Microsoft: FancyZones](https://github.com/MicrosoftDocs/windows-dev-docs/blob/docs/hub/powertoys/fancyzones.md)
- [Microsoft: PowerRename](https://github.com/MicrosoftDocs/windows-dev-docs/blob/docs/hub/powertoys/powerrename.md)
- [Microsoft: Image Resizer](https://github.com/MicrosoftDocs/windows-dev-docs/blob/docs/hub/powertoys/image-resizer.md)
- [Microsoft: Text Extractor](https://github.com/MicrosoftDocs/windows-dev-docs/blob/docs/hub/powertoys/text-extractor.md)
- [Microsoft: Keyboard Manager](https://github.com/MicrosoftDocs/windows-dev-docs/blob/docs/hub/powertoys/keyboard-manager.md)