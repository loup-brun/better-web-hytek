import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    // we don’t want to prerender, since index.htm (and alike) are fetched at runtime
    //prerender: {
    //  default: true,
    //},

    paths: {
      // base: '/resultats/live'
    },
  },
  preprocess: preprocess({

  }),
};

export default config;
