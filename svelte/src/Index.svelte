<script>
  import EventIndex from './Components/EventIndex.svelte';
  import Main from './Components/Main.svelte';
</script>

<div class="Index">
  <header class="Index__header">
  </header>

  <main class="Index__layout">
    <div class="Index__sidebar">
      <EventIndex />
    </div>

    <article class="Index__content-block">
      <Main />
    </article>
  </main>

  <footer class="Index__footer"></footer>
</div>

<style lang="scss">
	.Index {
    &__layout {
      @media (min-width: 60rem) {
        display: flex;
        flex-direction: row;
        align-items: stretch;
      }
    }

    &__sidebar {
      background-color: lightblue;
    }
	}
</style>
