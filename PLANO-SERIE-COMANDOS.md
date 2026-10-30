# Série: comandos e prompts para imagens com IA (TechOnPlay PT)

Fila lida pela rotina diária das 7h (Brasília). **Um artigo por execução**, sempre o **primeiro item sem `[x]`**. Ao terminar um artigo, a rotina marca o item aqui (`[x]`, data de publicação e slug) no mesmo commit.

## Cadência: 1 artigo por dia, toda manhã às 7h (regra do dono, 22/10/2026)

**Nunca dois artigos novos no mesmo dia.** A rotina roda **na nuvem** (sessão remota): não acessa o computador do dono, o ChatGPT nem o Gemini, e só pode confiar no que está no repositório. Por isso, antes de escrever qualquer coisa:

1. Atualizar o repositório (`git pull`/`git fetch origin`) e calcular a data de **hoje em Brasília** (UTC-3).
2. Listar os posts de `src/content/blog` cujo `date` seja **hoje ou futuro** (inclui artigos agendados pelo dono para hoje às 7h, escritos no dia anterior): `grep -l "^date: <AAAA-MM-DD>" src/content/blog/*.md` e conferir `git log -5 -- src/content/blog`.
3. Se já existir um post com `date` de **hoje** (publicado, agendado ou escrito pelo dono em conversa), **não escrever outro**: não mexer na fila, não marcar item e informar "já há artigo de hoje: <slug>". Reexecução manual no mesmo dia também não cria artigo novo.
4. Se não houver, escrever **um** artigo com `date` de **hoje**, no horário da execução (ex.: `T07:00`-`T07:15`, antes das 21h). **Nunca datar para o dia seguinte nem "agendar"**, salvo pedido explícito do dono.
5. Ao marcar `[x]`, usar a **data de publicação** (o `date` do post), não o dia em que foi escrito. Se o dono adiantar um artigo, ele ocupa o dia da data dele e a rotina daquele dia o pula.

Incidente que originou a regra: em 21/10 o item 4 (foto de produto) foi escrito e o dono o agendou para 22/10 às 07:00; a rotina de 22/10 não viu esse post agendado e publicou o item 5 (luz) às 06:53, saindo dois artigos no mesmo dia.

Origem da estratégia: pilares `46-comandos-do-chatgpt` e `comandos-camera-google-flow`; ponte `google-flow-gratis`. Todas as palavras-chave abaixo são hipóteses (sem volume validado). Os comandos são convenção informal, não recurso oficial: cada artigo deve dizer isso, informar a data do teste e a versão do modelo.

## Regras desta série (valem além do CLAUDE.md)

- Cada artigo tem **uma palavra-chave principal** e uma intenção de busca só. A lista completa de 46 comandos e a de 40 comandos ficam **só nos pilares**; satélites usam subconjuntos e acrescentam o que o pilar não tem: prompt completo por exemplo, resultado visual, erro comum, antes/depois.
- Antes de escrever, ler os artigos existentes do blog sobre o tema (títulos e descrições) e **não repetir** o que já existe. Se o item já estiver coberto, marcar `[~]` com o motivo e seguir para o próximo.
- **Link para o pilar** nos dois primeiros parágrafos, com anchor diferente do título do pilar. Depois de publicar, **adicionar no pilar** uma linha "Guia completo: ..." com link para o novo artigo, no fim da categoria mais próxima, sem mexer em título nem URL do pilar, e preencher `updated` com horário.
- Fatos só de fonte aberta na hora. Nunca citar comando, preço, versão ou recurso sem conferir. Atribuir afirmações contestáveis.
- Sem rótulos "Resposta rápida" ou "Aviso de método". Prompts entregues ao leitor vão em bloco ```prompt.
- `date` com horário e offset, antes das 21h (ex.: `2026-10-21T07:10:00-03:00`), sempre no dia de hoje (ver "Cadência").
- **Imagens (padrão do projeto, definido em 22/10/2026):** todas em **WebP 1200x800** (3:2), capa e corpo; **mínimo de 4 imagens por artigo** (capa + ao menos 3 de exemplo, sendo a foto base e resultados). Em artigos de prompt, o **resultado vem logo abaixo do prompt**. Como a rotina na nuvem não gera imagens, publicar com o texto e a nota "não testei" e entregar ao dono os prompts em inglês; ele devolve as imagens e a rotina ou a sessão encaixa e atualiza `updated`.
- Rodar `node scripts/audit-discover.mjs`, `node scripts/audit-links.mjs` se existir, e `npm run build`. **Só commitar e dar push se tudo passar.**

## Padrão didático (aprovado pelo dono em 20/10/2026, modelo: `angulos-de-camera-prompt-ia`)

Vale para todos os itens abaixo que ensinam a usar um comando ou prompt de imagem.

- **Público: iniciante brasileiro** que quer enviar a própria foto, escrever o comando e ver o resultado. O artigo diz **qual IA usar** (ChatGPT e/ou Gemini), onde enviar a foto (clipe de papel no ChatGPT, "+" no Gemini) e traz **passo a passo numerado**. Nunca deixar o leitor sem saber onde colar o comando.
- **Versão mais simples primeiro** (foto + comando curto, como `low angle`), depois o prompt completo como opção para mais controle. Molde do prompt completo: "use minha foto, mude só X, mantenha o resto".
- **Prova real com prints**: mesma foto base e mesmo comando nas duas ferramentas, com o print da conversa de cada uma (foto enviada, comando, resultado) e uma descrição **honesta** do que saiu, inclusive quando o efeito é fraco ou difere entre as ferramentas. Nunca descrever um efeito que não se vê na imagem. Só afirmar "testei" para o que o dono de fato testou.
- **Personagem de exemplo**: brasileiro(a) de cerca de 20 anos, visual descolado (boné etc.), cenário brasileiro (ex.: Cataratas do Iguaçu, em Foz do Iguaçu), sempre dito como personagem fictícia criada por IA. Reaproveitar a foto base já publicada (`angulos-camera-ia-foto-original.webp`) quando servir, para o leitor comparar entre artigos.
- **Tabela de comandos com coluna "Copiar"** (coluna "Comando" com o termo em `código` e a célula `📋 Copiar`) e prompts em bloco ```prompt.
- Seções fixas úteis: "Veja na prática" (prints), "Não ficou como queria? Peça o ajuste" (frases prontas para pedir correção na mesma conversa), "O que esperar" (limites: a IA redesenha a imagem, rosto e detalhes podem mudar, efeito às vezes sutil) e resumo em passos.
- **Prints são do dono**: a rotina não tem acesso ao ChatGPT nem ao Gemini e não gera essas imagens. Ao publicar, escrever o artigo com a nota "não testei" e, no resumo final, entregar ao dono os dois prompts de teste (foto base + comando) para ele gerar e devolver os prints. Quando os prints chegarem, acrescentar a seção "Veja na prática", trocar a nota de teste e atualizar `updated`. Prints: recortar só a conversa (sem barra do navegador), converter para WebP e nomear `<tema>-chatgpt-<comando>.webp` e `<tema>-gemini-<comando>.webp`.
- **Prompts de imagem para o dono gerar no ChatGPT (foto base, personagem, capa): em inglês, detalhados e realistas** (o dono observou em 21/10/2026 que o ChatGPT faz imagens melhores com prompt em inglês). Para foto base de exemplo, descrever uma "unedited amateur smartphone photo" (luz dura, fundo comum, sem retoque), sem texto, logotipos nem marcas, e sem parecer pessoa real. As instruções ao redor (onde anexar, o que fazer depois) ficam em português. Os comandos curtos que o leitor digita e os prompts dos artigos para o leitor seguem a regra do artigo.

## Fila

- [x] **1.** (2026-10-19, `comandos-chatgpt-editar-fotos`) 12 comandos do ChatGPT para editar fotos: /proshot, /newbg e mais
  - Palavra-chave: comandos chatgpt editar foto · Intenção: como fazer · Link: `46-comandos-do-chatgpt`
  - Diferencial: comandos de edição (`/proshot`, `/hdreal`, `/newbg`, `/fog`, `/goldenhour`, `/closeup`, `/together`, `/hairstyles`, `/sunglassestryon`, `/blueprint`, `/chibi`, `/droneview`), com prompt completo e resultado por comando. Fonte para conferir: https://www.schieb.de/?p=814488 (04/09/2026).
- [x] **2.** (2026-10-20, `angulos-de-camera-prompt-ia`) Ângulos de câmera em prompts de IA: guia com exemplos e fotos
  - Palavra-chave: ângulos de câmera prompt IA · Intenção: aprender · Link: os dois pilares
  - Diferencial: independente de ferramenta; o mesmo prompt em 3 ângulos; quando usar cada um; erros.
- [~] **3.** (2026-10-21, já coberto) Comandos que viralizam no ChatGPT: /chibi, /blueprint, /together
  - Palavra-chave: comandos chatgpt viral · Intenção: descoberta (Discover) · Link: `46-comandos-do-chatgpt`
  - Diferencial: formato de tendência, com imagem forte e curiosidade; evitar sobreposição com o item 1 (focar em efeitos divertidos).
  - Motivo do [~]: `/chibi`, `/blueprint` e `/together` (os três do título) já têm prompt e explicação em `comandos-chatgpt-editar-fotos`, e os demais efeitos divertidos estão na lista do pilar `46-comandos-do-chatgpt`. A única fonte aberta que os chama de virais (Schieb, 04/09/2026) é a mesma do item 1; o resto da busca tratou chibi como trend em linguagem natural, não como comando. Um satélite repetiria o conteúdo.
- [x] **4.** (escrito em 21/10, publicado em 2026-10-22 07:00, `prompt-foto-de-produto-chatgpt`) Prompts do ChatGPT para foto de produto: 8 cenários prontos
  - Palavra-chave: prompt foto de produto chatgpt · Intenção: aplicar · Link: `46-comandos-do-chatgpt`
  - Diferencial: cenários prontos (fundo branco, lifestyle, mesa, embalagem), foco em pequeno comércio.
- [x] **5.** (2026-10-22, `comandos-iluminacao-ia-foto`) Comandos de luz para fotos com IA: /goldenhour, /fog e mais
  - Palavra-chave: comandos de iluminação ia foto · Intenção: como fazer · Link: `46-comandos-do-chatgpt`
  - Diferencial: luz como assunto próprio, com comparação lado a lado.
- [x] **6.** (escrito em 26/10, data 2026-10-27 07:00, `prompt-foto-profissional-chatgpt`) Prompt de foto profissional no ChatGPT: 10 modelos por área
  - Palavra-chave: prompt foto profissional chatgpt · Intenção: aplicar · Link: `46-comandos-do-chatgpt`
  - Diferencial: por profissão, com checklist contra rosto "de plástico". Tema muito disputado: só publicar com diferencial real.
- [ ] **7.** Google Flow: como controlar a câmera de verdade (guia oficial)
  - Palavra-chave: controles de câmera google flow · Intenção: como fazer · Link: `comandos-camera-google-flow`, `google-flow-gratis`
  - Diferencial: recurso oficial da interface (conferir na documentação do Google Flow), que o pilar só cita de longe.
- [x] **8.** (2026-10-29, `criar-comandos-de-imagem-chatgpt`) Como criar seus próprios comandos de imagem no ChatGPT
  - Palavra-chave: criar comandos personalizados chatgpt imagem · Intenção: como fazer · Link: `46-comandos-do-chatgpt`
  - Diferencial: receita para criar `/polaroid`, `/noir`, `/isometric` e variações.
- [ ] **9.** Prompts para vídeo no Google Flow: estrutura e 10 exemplos
  - Palavra-chave: prompt google flow vídeo · Intenção: aplicar · Link: `comandos-camera-google-flow`, `google-flow-gratis`
  - Diferencial: roteiro de planos (início, meio, fim) em vez de lista de etiquetas.
- [ ] **10.** Prompts para fotos do Instagram no ChatGPT: 12 estilos prontos
  - Palavra-chave: prompt foto instagram chatgpt · Intenção: aplicar · Link: `46-comandos-do-chatgpt`, `trend-anos-80-ia-foto-prompt`
  - Diferencial: estilos por tipo de perfil; liga com a trend dos anos 80.
- [ ] **11.** Prompts do Nano Banana (Gemini) para editar fotos: 15 prontos
  - Palavra-chave: prompts nano banana · Intenção: aplicar · Link: `melhores-ferramentas-de-ia-do-google-2026`, `google-flow-gratis`
  - Diferencial: extensão do ecossistema Google já coberto no blog. Conferir o nome atual do modelo na fonte oficial.
- [ ] **12.** Foto realista com IA: prompts que tiram a cara de plástico
  - Palavra-chave: prompt foto realista ia · Intenção: resolver problema · Link: item 2 (ângulos), `46-comandos-do-chatgpt`
  - Diferencial: antes/depois e lista de erros.

Quando todos os itens estiverem marcados, a rotina não faz mais nada e informa que a série terminou.
