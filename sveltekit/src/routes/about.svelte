<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import Main from '$lib/components/Main.svelte';

  export let about_content;
</script>

<Navbar />

<Main>
  <div class="prose">
    {@html about_content}
  </div>
</Main>

<style>
  .prose {
    padding: 2rem 1rem;
    max-width: 50rem;
  }
  @media (min-width: 768px) {
    .prose {
      padding: 3rem 2rem;
    }
  }
  :global(.prose h2) {
    margin-bottom: 1rem;
  }
  :global(.prose p) {
    margin-bottom: 1.5rem;
  }
</style>
