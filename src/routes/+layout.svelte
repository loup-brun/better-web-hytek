<script>
  import '$lib/styles/app.pcss';
  // vercel analytics
  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';

  inject({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
  <title>Résultats en ligne</title>
</svelte:head>

<slot></slot>
