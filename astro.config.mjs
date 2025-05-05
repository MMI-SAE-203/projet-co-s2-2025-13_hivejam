// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import alpinejs from '@astrojs/alpinejs';

import netlify from '@astrojs/netlify/functions';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: netlify({}),
  experimental: { svg: true , session: true},
  integrations: [alpinejs()],
  output: 'server',
});