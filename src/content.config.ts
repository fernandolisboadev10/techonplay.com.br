import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      category: z.string(),
      date: z.date(),
      updated: z.date().optional(),
      tags: z.array(z.string()).optional(),
      readingTime: z.string().optional(),
      related: z.array(z.string()).optional(),
      draft: z.boolean().optional().default(false),
      image: image().optional(),
      imageAlt: z.string().optional(),
    }),
});

// Web Stories (AMP): 9 slides = capa + os itens de pages + fechamento com botão para o post.
// post é o slug do artigo para onde o botão do último slide leva. Imagens ficam em public/web-stories/<slug>/.
const stories = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/stories' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    post: z.string(),
    poster: z.string(),
    cover: z.string(),
    coverKicker: z.string(),
    coverNumber: z.string(),
    coverTitle: z.string(),
    cta: z.string(),
    coverAlt: z.string(),
    draft: z.boolean().optional().default(false),
    pages: z.array(
      z.object({
        kicker: z.string(),
        title: z.string(),
        text: z.string(),
        tile: z.string().optional(),
        alt: z.string().optional(),
      }),
    ),
    closing: z.object({ kicker: z.string(), title: z.string(), text: z.string(), bg: z.string() }),
  }),
});

export const collections = { blog, stories };
