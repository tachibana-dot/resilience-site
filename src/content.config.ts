import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const news = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/news',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, '').replaceAll('/', '-'),
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.string().default('ニュース'),
    language: z.enum(['ja', 'en']).default('ja'),
    slug: z.string().optional(),
    originalUrl: z.string().url().optional(),
    tags: z.array(z.string()).optional(),
    relatedSolutions: z.array(z.string()).optional(),
    relatedTechnologies: z.array(z.string()).optional(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    externalUrl: z.string().url().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages', generateId: ({ entry }) => entry.replace(/\.md$/, '').replaceAll('/', '-') }),
  schema: z.object({
    title: z.string(),
    language: z.enum(['ja', 'en']).default('ja'),
    slug: z.string(),
    originalUrl: z.string().url().optional(),
  }),
});

const solutions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/solutions', generateId: ({ entry }) => entry.replace(/\.md$/, '').replaceAll('/', '-') }),
  schema: z.object({ title: z.string(), language: z.enum(['ja', 'en']), slug: z.string(), originalUrl: z.string().url().optional() }),
});

export const collections = { news, pages, solutions };
