<script>
  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';

  /** @type {string} */
  let eventId = $page.params.eventId;
  /** @type {string} */
  let eventNo;
  /** @type {string} */
  let eventSerie;

  page.subscribe(newPage => {
    if (!newPage.params.eventId) {
      // eewww, no good -- let's stop here
      eventNo = '--';
      eventSerie = '';
      return;
    } else {
      eventId = newPage.params.eventId;
    }

    // Match event number
    // we start by capturing the full event id (3-4 digits at the end);
    // then we retrieve that result and replace the leading zeros.
    eventNo = eventId.match(/\d{1,4}$/)[0].replaceAll(/^(0)+/ig, '');
    // Match event series
    // will be a single capital letter, such as F (final) or P (prelims)
    eventSerie = eventId.match(/([A-Z])\d{1,4}$/)[1];
  });
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
    Épreuve #{eventNo} •
    <!-- round -->
    {#if eventSerie === 'F'}
    Finale
    {:else if eventSerie === 'P'}
    Préliminaire
    {:else if eventSerie === 'S'}
    Demie-finale
    {:else}
    Ronde {eventSerie}
    {/if}
  </small>

</div>
{/key}
