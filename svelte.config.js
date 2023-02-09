import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    // we don’t want to prerender, since index.htm (and alike) are fetched at runtime
    //prerender: {
    //  default: true,
    //},
  },
  preprocess: vitePreprocess()
};

export default config;
