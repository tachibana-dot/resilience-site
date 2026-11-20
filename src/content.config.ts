import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const news = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.string().default('ニュース'),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    externalUrl: z.string().url().optional(),
  }),
});

export const collections = { news };
