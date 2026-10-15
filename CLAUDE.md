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

## Blog feed order

The home, `/blog/` and category pages sort posts by latest activity: the newer of `date` (created) and `updated` (edited), via `src/utils/posts.ts`. Give every new post a `date` with a time (e.g. `2026-09-30T15:40:00-03:00`, keep it before 21:00 so the displayed UTC day does not change), and put a time in `updated` when editing a post that should rise to the top of the feed. Run `node scripts/audit-discover.mjs` before publishing.

## Scheduling

A post goes live when its `date` has passed (`isPublished` in `src/utils/posts.ts`). The deploy workflow rebuilds at 07:02, 11:02 and 18:02 (Brasília time), so to schedule a post set `date` to a future time such as `2026-10-02T07:00:00-03:00` and push; commit it before the slot.


## Images and Web Stories (cost rules)

The OpenRouter key (`OPENROUTER_API_KEY` in `.env`) has a small balance reserved for **post cover images only**.

- **Post cover:** `npm run image -- --name <slug> --prompt "..." --quality medium`. The output is 1200x800 WebP (3:2) and costs about $0.042. Generate once, open the file and check it; regenerate only if it has a logo or readable text. Never leave unused generated images in the repo.
- **Web Stories: never generate images through the OpenRouter API or any paid key.** The owner generates the images in Gemini. The flow is:
  1. Plan the story from the post (slide count, text per slide, title, order).
  2. For each slide that needs a new image, give the owner a numbered prompt to paste into Gemini: portrait 9:16, editorial photographic style, no company logos, no readable text in the image, with the file name to use (for example `slide-3.png`). Also give a prompt for the 3:4 portrait poster, without the title, which is added later in code.
  3. The owner returns the images in the conversation.
  4. Convert them with `sharp` (JPG, 720 px wide, quality 88; poster 640x853), save them in `public/web-stories/<slug>/`, burn the title into the poster, build the story and run the build.
  5. Show the result to the owner before any commit.
- When the post cover already works as a source, crop tiles from it locally with `sharp` (as `scripts/story-images-*.mjs` do). That is free; ask Gemini only for the images that are still missing.
- Web Stories are built by Claude (structure, text, code and build). The owner only generates and returns the images.

## Prompts nos artigos

Todo prompt entregue ao leitor vai num bloco com a linguagem `prompt` (tres crases + prompt). O plugin `src/plugins/remark-prompt-box.mjs` o transforma numa caixa com botao de copiar e texto em italico. Nao deixe prompt em paragrafo solto.
