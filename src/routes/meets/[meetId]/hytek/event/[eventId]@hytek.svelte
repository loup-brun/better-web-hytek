<script context="module">
  export async function load({ fetch, params }) {
    const { meetId, eventId } = params;

    try {
      // call page endpoint manually since there is already a load function in layout-hytek
      const evtRequest = await fetch(`/meets/${meetId}/hytek/event/${eventId}.html`);

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
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { afterNavigate } from '$app/navigation';

  // props (from page endpoint)
  export let eventHTML;
  export let error;

  // vars
  // index controls major variables
  let isSideNavOpen = false;
  // content variables
  let mainHtml = '';
  let parser; // DOMParser instance, set in browser
  let eventDoc; // before transform
  let updateView; // fn
  let bgColor;


  // client-side logic
  onMount(async () => {
    // force showing sidebar with reactive assignment
    isSideNavOpen = true;

    parser = new DOMParser(); // browser-only API

    // when component is mounted, set this function w/ browser-side logic
    updateView = () => {
      if (eventHTML) {
        eventDoc = parser.parseFromString(eventHTML, 'text/html');
        mainHtml = eventDoc.querySelector('pre').innerHTML;
      }
    }


    // check the hash on first load
    // if (eventRegex.test(window.location.hash)) {
    //   // handle hash
    //   await handleHashChange();
    // } else {
    //   // get the main page
    //   const mainHTML = await fetchDocument(fetch, 'main.htm', {
    //     encoding: APP_CONFIG.hytekHtmlEncoding,
    //     baseLocation: APP_CONFIG.hytekFtpLocation,
    //   });
    // const parser = new DOMParser();
    // const mainDoc = parser.parseFromString(mainHTML, 'text/html');
    //
    //   // grab only the stuff in <pre> (text results)
    //   mainHtml = mainDoc.querySelector('pre').innerHTML;
    //
    // }
  });

  afterNavigate(() => {
    // logic set in onMount
    updateView();
  })

  /////////

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
