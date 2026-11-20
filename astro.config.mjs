import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://resilience.example.com',
  integrations: [mdx(), sitemap()],
  output: 'static',
  trailingSlash: 'always',
});
