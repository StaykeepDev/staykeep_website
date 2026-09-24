// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// StayKeep marketing site — static output, deployed to a Cloudflare Worker
// with static assets (see wrangler.toml + worker/index.ts). No SSR adapter:
// the worker is hand-written and only does the www->apex redirect before
// falling back to env.ASSETS.fetch(request).
export default defineConfig({
  site: 'https://staykeep.com',
  trailingSlash: 'never',
  build: {
    // "file" -> /owners.html served at exactly /owners, no trailing-slash
    // ambiguity and no redirect needed for the clean URL.
    format: 'file',
  },
  integrations: [react()],
  vite: {
    css: {
      devSourcemap: true,
    },
  },
});
