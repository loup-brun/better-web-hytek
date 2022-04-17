import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      fallback: 'index.html',
    }),
    // we don’t want to prerender, since index.htm (and alike) are fetched at runtime
    //prerender: {
    //  default: true,
    //},

    paths: {
      base: '/resultats/live'
    },
  },
  preprocess: preprocess({

  }),
};

export default config;
