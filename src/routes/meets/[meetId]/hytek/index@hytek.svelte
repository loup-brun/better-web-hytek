<script>
  import { APP_CONFIG } from '../../../../config';
  import { createEventDispatcher, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import fetchDocument from '$lib/utils/fetchDocument.js'; // for fetching documents

  // vars
  // regex which captures the hash prefix + (event id) + .htm extension
  // checking the hash, working like an SPA
  // http://example.com/results/#/event/123456.htm
  const eventRegex = /^#\/event\/([0-9A-Za-z]+)\.htm$/;
  // index controls major variables
  let isSideNavOpen = false;
  // content variables
  let mainHtml = '';
  let error = null;
  const dispatch = createEventDispatcher();

  // client-side logic
  onMount(async () => {
    // force showing sidebar with reactive assignment
    isSideNavOpen = true;

    // check the hash on first load
    if (eventRegex.test(window.location.hash)) {
      // handle hash
      await handleHashChange();
    } else {
      // get the main page
      const mainHTML = await fetchDocument(fetch, 'main.htm', {
        encoding: APP_CONFIG.hytekHtmlEncoding,
        baseLocation: APP_CONFIG.hytekFtpLocation,
      });
      const parser = new DOMParser();
      const mainDoc = parser.parseFromString(mainHTML, 'text/html');

      // grab only the stuff in <pre> (text results)
      mainHtml = mainDoc.querySelector('pre').innerHTML;
    }
  });

  /////////

  // must be run client-side (e.g.: inside `onMount` function) for access to global `window` obj
  async function handleHashChange() {
    error = null;
    let currentHash = window.location.hash;

    // if hash change matches pattern
    if (eventRegex.test(currentHash)) {
      // reconsruct the .htm filename
      let fetchFilename = currentHash.replace(eventRegex, '$1.htm');

      // do the fetch (variables updated reactively)
      try {
        const eventHTML = await fetchDocument(fetch, fetchFilename, {
          encoding: APP_CONFIG.hytekHtmlEncoding,
          baseLocation: APP_CONFIG.hytekFtpLocation,
        });
        const parser = new DOMParser(); // browser-only API
        const eventDoc = parser.parseFromString(eventHTML, 'text/html');
        mainHtml = eventDoc.querySelector('pre').innerHTML;
      } catch (e) {
        error = 'Erreur lors de la récupération de l’épreuve';
        mainHtml = '';
      }
    } else {
      // should we do something when hash matches nothing?
      // btw there is no hashChange triggered when user goes to '/' (home)
    }
  }

  function onChange() {
    dispatch('changeEvent');
  }
</script>

<svelte:window on:hashchange={handleHashChange}
               on:pushState={handleHashChange} />

{#key mainHtml}
  {#if error}
    <div in:fade={{ duration: 250 }}>
      Résultat introuvable
    </div>
  {:else}
    {#if mainHtml && mainHtml.length}
      <pre in:fade={{ duration: 250 }}>
        {@html mainHtml}
      </pre>
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
