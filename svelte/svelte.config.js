const sveltePreprocess = require('svelte-preprocess');
const path = require('path');
// attractions UI lib for svelte
// https://illright.github.io/attractions/
const makeAttractionsImporter = require('attractions/importer.js');

module.exports = {
  preprocess: [sveltePreprocess({
    // https://illright.github.io/attractions/docs/theming
    scss: {
      importer: makeAttractionsImporter({
        // specify the path to your theme file, relative to this file
        themeFile: path.join(__dirname, 'src/scss/theme.scss'),
      }),
    },
  })],
};
