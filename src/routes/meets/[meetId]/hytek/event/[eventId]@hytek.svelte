<script context="module">
  export async function load({ fetch, params }) {
    const { meetId, eventId } = params;

    try {
      // call page endpoint manually since there is already a load function in layout-hytek
      // do not include .html extension since causes Vercel to render the wrong html
      const evtRequest = await fetch(`/meets/${meetId}/hytek/event/${eventId}-html`);

      if (evtRequest.ok) {
        const eventHTML = await evtRequest.text();

        return {
          props: {
            eventHTML,
            error: null,
          }
        };
      }
    } catch (e) {
      return {
        status: 404,
        body: {
          error: e
        }
      }
    }
  }
</script>
<script>
  import { afterUpdate, onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  // props (from page endpoint)
  export let eventHTML;
  export let error;

  // vars
  // index controls major variables
  let isSideNavOpen = false;
  let mainHtml = '';
  let parser; // DOMParser instance, set in browser
  let eventDoc; // before transform
  let updateView; // fn

  // client-side logic
  onMount(async () => {
    // force showing sidebar with reactive assignment
    isSideNavOpen = true;

    parser = new DOMParser(); // browser-only API

    // when component is mounted, set this function w/ browser-side logic
    updateView = () => {
      debugger;
      if (eventHTML) {
        eventDoc = parser.parseFromString(eventHTML, 'text/html');
        const pre = eventDoc.querySelector('pre');
        if (pre) {
          mainHtml = pre.innerHTML;
        } else {
          mainHtml = 'Une erreur système est survenue en allant chercher l’épreuve.'; // something went wrong
        }
      }
    }
  });

  afterUpdate(() => {
    // logic set in onMount
    // afterNavigate is buggy in production, try another strategy (afterUpdate?)
    updateView();
  });

</script>

{#key mainHtml}
  {#if error}
    <div in:fade={{ duration: 250 }}>
      Résultat introuvable
    </div>
  {:else}
    {#if mainHtml && mainHtml.length}
      <pre
        in:fade={{ duration: 250 }}
      >{@html mainHtml}</pre>
    {/if}
  {/if}
{/key}

<style>
  pre {
    margin: 0 auto;
    font-family: 'Courier New', Courier, monospace; /* default mono fonts */
    font-weight: normal;
    font-size: 14px;
    padding: 8px;
  }
  @media (min-width: 1056px) {
    pre {
      font-size: 14px;
    }
  }
</style>
