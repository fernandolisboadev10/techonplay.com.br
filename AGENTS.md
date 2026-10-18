## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Regras de links nos artigos

Valem para todo post novo e para qualquer reformulação. `node scripts/audit-discover.mjs` confere (regras em `scripts/link-rules.mjs`).

- **Links internos primeiro.** O texto abre com links internos (mínimo 2 no corpo, com anchor descritivo e só para slugs que existem). Nenhum link externo no primeiro terço do corpo.
- **No máximo 3 links externos no corpo**, do meio para o fim, só para a fonte que sustenta o dado ou a ferramenta oficial do assunto. Mesma URL repetida conta uma vez.
- **Referências no fim sem limite**: o que passar de 3 vai para o bloco final (`Fontes: [A](url) | [B](url)`, `## Fontes consultadas` ou `## Referências`). No corpo, a fonte vira texto simples ("segundo o Canaltech").
- Link da ferramenta oficial (ex.: deepseek.com) entra como um dos 3 externos, no meio do texto, nunca na abertura.
