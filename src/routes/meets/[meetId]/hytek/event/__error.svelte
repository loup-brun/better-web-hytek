<script context="module">
  export function load({ params }) {
    const { eventId } = params;

    return {
      props: {
        eventId,
      }
    }
  }
</script>

<script>
  import { fade } from 'svelte/transition';
  export let eventId;
</script>

{#key eventId}
<div
  class="ErrorPage | text-center px-4 py-20 text-neutral-400 flex-grow-1 text-zinc-400"
  in:fade
>
  <h1
    class="text-2xl sm:text-3xl bold mb-6"
  >Pas encore de résultats pour cette épreuve</h1>

  <small class="text-xs">
    <!-- last 3 digits: evt number -->
    Épreuve #{eventId.slice(-3)}
    <!-- round -->
    (série {eventId.slice(-4, -3)})</small>

</div>
{/key}
