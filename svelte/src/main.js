import Index from './Index.svelte';
import "carbon-components-svelte/css/white.css";

const app = new Index({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;
