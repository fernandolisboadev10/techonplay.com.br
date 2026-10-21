---
title: "O que é Linux? Distribuições, comandos, atalhos e segurança"
description: "O que é Linux e por que roda servidores e celulares. Veja distribuições, comandos, atalhos, segurança e como testar sem apagar o Windows."
category: "Sistemas"
date: 2026-09-30T09:45:00-03:00
updated: 2026-09-30
readingTime: "10 min"
image: "./images/linux-o-que-e.webp"
imageAlt: "Pinguim Tux ao lado de um notebook com o terminal do Linux aberto e livros sobre Linux, comandos e redes"
tags: ["Linux", "Distribuições Linux", "Comandos Linux", "Software livre"]
related: ["linux-mint-xepub-clockenstei", "cmd-comandos-windows", "steam-machine"]
---

**Linux** é um sistema operacional livre e de código aberto, criado a partir do kernel (o núcleo que conversa com o hardware) desenvolvido por Linus Torvalds em 1991. Ele roda em servidores, celulares Android, supercomputadores e também em computadores pessoais, e qualquer pessoa pode baixá-lo, usá-lo e modificá-lo sem pagar licença.

Este guia funciona como um estudo completo para quem pesquisa **o que é Linux**: como ele nasceu, o que são as distribuições, quais comandos e atalhos vale aprender, como fica a segurança e por que ele domina os servidores.

## O que é Linux, na prática

Tecnicamente, Linux é só o kernel. É a peça que gerencia memória, processador, discos e dispositivos, e que permite aos programas usarem a máquina. O sistema que a gente instala e usa no dia a dia junta esse kernel com outros programas: o ambiente gráfico (janelas, menus e ícones), os aplicativos e as ferramentas de linha de comando.

Boa parte dessas ferramentas vem do projeto GNU, iniciado por Richard Stallman em 1983. Por isso, alguns chamam o conjunto de GNU/Linux. No uso comum, porém, diz-se apenas “Linux”.

Duas ideias explicam o sistema:

-   **Código aberto:** o código-fonte é público. Qualquer pessoa pode ler, auditar, corrigir e redistribuir.
-   **Livre para escolher:** não existe um único “Linux”. Existem dezenas de versões, chamadas distribuições, feitas para gostos e usos diferentes.

## Como o Linux nasceu

Em 1991, o estudante finlandês Linus Torvalds anunciou que estava criando um kernel gratuito como hobby. Ele combinou o trabalho com as ferramentas GNU que já existiam, e voluntários do mundo todo passaram a contribuir. Trinta e poucos anos depois, o kernel recebe código de milhares de desenvolvedores e de grandes empresas de tecnologia.

O mascote é o pinguim Tux, que aparece em muitas distribuições e nas imagens do sistema.

## O que são distribuições Linux

Uma distribuição (ou “distro”) é um pacote pronto: kernel, ambiente gráfico, instalador, aplicativos e um sistema de atualização. Todas usam o mesmo kernel, mas cada uma faz escolhas diferentes.

| 🐧 Distribuição | 🎯 Para quem serve | ⚙️ Característica principal |
| --- | --- | --- |
| **Ubuntu** | Iniciantes e servidores | Mantida pela Canonical, tem versões de longo suporte (LTS) e muita documentação |
| **Linux Mint** | Quem vem do Windows | Baseada no Ubuntu, com o ambiente Cinnamon, visual clássico e foco em simplicidade |
| **Debian** | Quem valoriza estabilidade | Base de muitas outras distros, com ciclo de atualização conservador |
| **Fedora** | Quem quer novidades | Traz tecnologias recentes cedo e tem apoio da Red Hat |
| **Arch Linux** | Usuários avançados | Modelo rolling release (atualização contínua) e instalação manual |
| **openSUSE** | Desenvolvedores e administradores | Ferramentas de administração próprias e versões estáveis e contínuas |

Se a ideia é experimentar pela primeira vez, Ubuntu e Linux Mint são as escolhas mais comuns. A equipe do Mint já anunciou os novos apps Xepub e Clockenstein para a próxima versão, como mostramos em [Linux Mint 23: leitor de ebooks e calendário próprios em dezembro](/linux-mint-xepub-clockenstei/).

### Ambientes gráficos

O visual muda conforme o ambiente escolhido. Os mais conhecidos são o **GNOME** (moderno e minimalista), o **KDE Plasma** (muito personalizável), o **Cinnamon** (clássico, usado no Linux Mint) e o **Xfce** (leve, bom para computadores antigos). Muitas distros oferecem versões com cada um deles.

## Como escolher a primeira distribuição

Um caminho simples para decidir:

1.  **Vem do Windows e quer o mínimo de surpresas:** Linux Mint ou Ubuntu.
2.  **Tem um notebook antigo:** uma versão com Xfce, que consome menos memória.
3.  **Quer aprender a fundo:** Debian ou Fedora, e depois Arch.
4.  **Vai usar em servidor:** Ubuntu Server ou Debian, por estabilidade e suporte.

Para não errar, use a versão LTS ou estável e teste antes de instalar (veja a seção sobre como experimentar sem apagar o Windows).

## Comandos essenciais do Linux

O terminal é a janela onde se digita comandos. Ele assusta no começo, mas poucos comandos resolvem a maioria das tarefas. Quem já viu os [comandos do CMD do Windows](/cmd-comandos-windows/) vai reconhecer a lógica.

| 💻 Comando | 📝 O que faz |
| --- | --- |
| `pwd` | Mostra a pasta em que você está |
| `ls` | Lista os arquivos da pasta (`ls -l` mostra detalhes) |
| `cd pasta` | Entra em uma pasta (`cd ..` volta um nível) |
| `mkdir nome` | Cria uma pasta |
| `cp origem destino` | Copia arquivos |
| `mv origem destino` | Move ou renomeia arquivos |
| `rm arquivo` | Apaga um arquivo (não existe lixeira no terminal) |
| `cat arquivo` | Exibe o conteúdo de um arquivo de texto |
| `grep texto arquivo` | Procura um texto dentro de um arquivo |
| `sudo comando` | Executa o comando com permissão de administrador |
| `chmod` | Muda as permissões de um arquivo |
| `df -h` | Mostra o espaço livre nos discos |
| `top` | Mostra os processos que mais usam o computador |
| `man comando` | Abre o manual de qualquer comando |

### Instalando programas pelo terminal

Cada família de distribuições usa seu gerenciador de pacotes. No Ubuntu, no Debian e no Linux Mint, o comando é o `apt`; no Fedora, o `dnf`; no Arch, o `pacman`. Exemplos: `sudo apt update` atualiza a lista de programas e `sudo apt install nome` instala um deles.

Atenção com o `rm`: um comando como `rm -rf` apaga pastas inteiras sem perguntar. Confira sempre o caminho antes de pressionar Enter.

## Atalhos de teclado que economizam tempo

Os atalhos variam por distribuição e ambiente gráfico, mas estes funcionam na maioria:

| ⌨️ Atalho | 🎯 Função |
| --- | --- |
| `Ctrl + Alt + T` | Abre o terminal (Ubuntu, Linux Mint e outras) |
| `Tab` | Completa nomes de arquivos e comandos |
| `Ctrl + C` | Interrompe o comando em execução |
| `Ctrl + L` | Limpa a tela do terminal |
| `Ctrl + R` | Busca no histórico de comandos |
| `Ctrl + Shift + C` / `V` | Copia e cola dentro do terminal |
| `Alt + Tab` | Alterna entre janelas abertas |
| Tecla `Super` (Windows) | Abre o menu ou a visão geral de janelas |

O `Tab` é o mais útil para iniciantes: digite as primeiras letras e ele completa o resto, evitando erros de digitação.

## Linux é seguro?

Em geral, sim, mas “mais seguro” não significa “imune”. Alguns motivos pelos quais o Linux tem boa reputação:

-   **Permissões por usuário:** programas comuns rodam sem privilégio de administrador. Para mudar o sistema, é preciso usar `sudo` e confirmar a senha.
-   **Repositórios oficiais:** a maioria dos programas é instalada de fontes verificadas pela distribuição, e não de sites soltos.
-   **Código aberto:** muita gente pode auditar o código e apontar falhas. As correções costumam sair rápido.
-   **Atualizações centralizadas:** um único comando atualiza o sistema e os programas.

Ainda assim, existem riscos: malware para Linux existe, golpes de phishing funcionam em qualquer sistema e scripts baixados da internet podem causar danos. Boas práticas:

1.  Mantenha o sistema atualizado.
2.  Instale programas pelos repositórios oficiais e desconfie de comandos copiados sem entender.
3.  Use senhas fortes e ative a criptografia de disco na instalação, se o notebook sai de casa.
4.  Faça backup regularmente.
5.  Escolha bem o [navegador](/melhor-navegador-para-pc/) e mantenha extensões só das que você usa.

## Popularidade: quanto o Linux é usado

No computador pessoal, o Linux ainda é minoria. Segundo o [StatCounter](https://gs.statcounter.com/os-market-share/desktop/brazil), ele ficou em torno de 2,4% dos desktops no Brasil em maio de 2026. No mundo, as medições costumam variar entre 3% e 4%, conforme o critério usado pelas fontes.

Só que o desktop conta uma parte da história. O Linux está por trás de muita coisa que as pessoas usam sem notar:

-   **Android:** usa o kernel Linux em bilhões de celulares.
-   **ChromeOS:** o sistema dos Chromebooks é baseado em Linux.
-   **Jogos:** o SteamOS, do Steam Deck e da [Steam Machine](/steam-machine/), também é baseado em Linux.
-   **Roteadores, TVs e carros:** muitos usam versões embarcadas do sistema.

## Linux em servidores e supercomputadores

É nos servidores que o Linux domina. De acordo com o [W3Techs](https://w3techs.com/technologies/overview/operating_system), ele rodava em cerca de 61% dos sites com sistema operacional identificável em maio de 2026. Esse número exclui sites que escondem o servidor atrás de CDNs, então serve como referência, não como total exato.

Nos supercomputadores, a dominância é ainda maior: desde 2017, todos os sistemas da lista [TOP500](https://www.top500.org/lists/top500/2026/06/) rodam Linux. Os motivos são consistentes:

-   **Custo:** não há licença por servidor.
-   **Estabilidade:** servidores ficam meses ligados sem reiniciar.
-   **Controle:** a empresa pode ajustar o sistema ao seu hardware e software.
-   **Ferramentas:** contêineres, automação e nuvem nasceram e evoluíram sobre Linux.

Quem quer seguir carreira em infraestrutura, nuvem ou segurança precisa saber o básico de Linux, e o ponto de partida são os comandos da tabela acima.

## Como testar o Linux sem apagar o Windows

Não é preciso formatar o computador para experimentar. Há três caminhos, do mais seguro ao mais definitivo:

1.  **Sessão ao vivo (live USB):** grave a distribuição em um pendrive, reinicie e escolha iniciar por ele. O sistema roda sem instalar nada, e ao desligar tudo volta ao normal.
2.  **Máquina virtual:** programas como o VirtualBox rodam o Linux dentro de uma janela do Windows.
3.  **Dual boot:** instala o Linux ao lado do Windows, e você escolhe qual iniciar. Faça backup antes, porque erro de partição pode apagar dados.

Depois de testar, vale limpar o Windows enquanto você decide: veja como [limpar arquivos temporários e acelerar o notebook](/limpar-arquivos-temporarios-windows/).

## Perguntas frequentes

### O que é Linux em uma frase?

_É um sistema operacional livre e de código aberto, baseado no kernel criado por Linus Torvalds em 1991, que existe em várias versões chamadas distribuições._

### Linux é de graça?

_As principais distribuições, como Ubuntu, Linux Mint, Debian e Fedora, são gratuitas para baixar e usar. Algumas empresas cobram por suporte e serviços, como versões corporativas._

### Qual é a melhor distribuição Linux para iniciantes?

_Ubuntu e Linux Mint são as mais indicadas, pela facilidade de instalação, pela documentação em português e pelo visual familiar para quem vem do Windows._

### Linux tem vírus?

_Existe malware para Linux, mas é menos comum no desktop do que no Windows. Manter o sistema atualizado e instalar programas só de fontes oficiais reduz bastante o risco._

### Dá para rodar programas do Windows no Linux?

_Em parte. Ferramentas de compatibilidade, como o Wine e o Proton (usado nos jogos da Steam), rodam muitos programas e jogos do Windows, mas nem todos funcionam._

### Linux precisa de computador potente?

_Não. Versões leves, como as com ambiente Xfce, rodam bem em computadores antigos, e muitas distribuições usam menos memória que o Windows._
