<script context="module">
  import { APP_CONFIG } from '$lib/../config';
  import fetchDocument from '$lib/utils/fetchDocument.js'; // for fetching documents

  export async function load({ fetch, params }) {
    const { eventId } = params;

    try {
      const eventHTML = await fetchDocument(fetch, `${eventId}.htm`, {
        encoding: APP_CONFIG.hytekHtmlEncoding,
        baseLocation: APP_CONFIG.hytekFtpLocation,
      });
      return {
        props: {
          eventHTML
        }
      };
    } catch (e) {
      return {
        status: 404,
        props: {
          error: 'Épreuve non trouvée.'
        }
      };
    }
  }
</script>

<script>
  import { onMount, afterUpdate } from 'svelte';
  import { fade } from 'svelte/transition';

  // props
  export let eventHTML = '';
  export let error;

  // vars
  // regex which captures the hash prefix + (event id) + .htm extension
  // checking the hash, working like an SPA
  // http://example.com/results/#/event/123456.htm
  const eventRegex = /^#\/event\/([0-9A-Za-z]+)\.htm$/;
  // index controls major variables
  let isSideNavOpen = false;
  // content variables
  let mainHtml = '';
  let parser; // DOMParser instance, set in browser
  let eventDoc; // before transform
  let updateView; // fn


  // client-side logic
  onMount(async () => {
    // force showing sidebar with reactive assignment
    isSideNavOpen = true;

    //
    parser = new DOMParser(); // browser-only API

    updateView = () => {
      eventDoc = parser.parseFromString(eventHTML, 'text/html');
      mainHtml = eventDoc.querySelector('pre').innerHTML;
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

  afterUpdate(() => {
    // logic set onMount
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
      <pre in:fade={{ duration: 250 }}>{@html mainHtml}</pre>
    {/if}
  {/if}
{/key}

<style>
  pre {
    margin: 0 auto;
    font-family: 'Courier New', Courier, monospace; /* default mono fonts */
    font-weight: normal;
    font-size: 14px;
  }
  @media (min-width: 1056px) {
    pre {
      font-size: 14px;
    }
  }
</style>
