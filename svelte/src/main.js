import { APP_CONFIG } from './config.js';
import Index from './Index.svelte';
import "carbon-components-svelte/css/white.css";

const app = new Index({
  target: document.body,
  props: {
    APP_CONFIG,
  }
});

export default app;
