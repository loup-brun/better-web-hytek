<script>
  import {
    Content,
    InlineNotification,
  } from "carbon-components-svelte";

  export let error = null;
</script>
<Content>
  {#if error}
    <InlineNotification
      title="Erreur"
      subtitle={error}
      hideCloseButton
    />
  {/if}

  <slot>
    <h2>Bienvenue</h2>
    <p class="">
      Veuillez sélectionner un événement dans le menu de gauche.
    </p>
  </slot>
</Content>

<style>
  /* Tweak main column style */
  :global(.bx--content) {
    padding: 5px;

    /* position elements correctly */
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
</style>
