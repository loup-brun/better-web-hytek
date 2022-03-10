<script>
  import GlobalHeader from './Components/GlobalHeader.svelte';
  import Main from './Components/Main.svelte';
  import { onMount } from 'svelte';
  import fetchHytek from './utils/fetchHytek.js';

  // props
  export let APP_CONFIG; // app configuration -- MANDATORY

  // vars
  // regex which captures the hash prefix + (event id) + .htm extension
  const eventRegex = /^#\/event\/([0-9A-Za-z]+)\.htm$/;
  let mainHtml = '';
  let decoder = new TextDecoder(APP_CONFIG.hytekHtmlEncoding);

  // client-side logic
  onMount(async () => {
    // check the hash first
    if (eventRegex.test(window.location.hash)) {
      // handle hash
      handleHashChange();
    } else {
      // get the main page
      const mainDoc = await fetchHytek('main.htm', {
        hytekFtpLocation: APP_CONFIG.hytekFtpLocation,
        hytekHtmlEncoding: APP_CONFIG.hytekHtmlEncoding,
      });
      mainHtml = mainDoc.querySelector('body').innerHTML;
    }

    // listen for hash change
    window.addEventListener('hashchange', handleHashChange);
  });

  /////////

  // must be run client-side (e.g.: inside `onMount` function) for access to global `window` obj
  async function handleHashChange() {
    let currentHash = window.location.hash;
    // if hash change matches pattern
    if (eventRegex.test(currentHash)) {
      // reconsruct the .htm filename
      let fetchFilename = currentHash.replace(eventRegex, '$1.htm');

      // do the fetch (variables updated reactively)
      const eventDoc = await fetchHytek(fetchFilename, {
        hytekFtpLocation: APP_CONFIG.hytekFtpLocation,
        hytekHtmlEncoding: APP_CONFIG.hytekHtmlEncoding,
      });
      mainHtml = eventDoc.querySelector('body').innerHTML;
    }
  }

  async function tmpFetch() {

    // unknown error (unlikely when dealing with static files)
    // TODO translatable
    mainHtml = `
          <h2>Erreur (code ${eventFetch.status})</h2>
          <p>Erreur lors de la récupération de l’épreuve.</p>
        `;

    // catch err
    // TODO translatable
    mainHtml = `
        <p>Erreur lors de la récupération de l’épreuve.</p>
        `;
  }
</script>

<GlobalHeader {APP_CONFIG} />

<Main {APP_CONFIG}>
  {#if mainHtml && mainHtml.length}
  <pre>{@html mainHtml}</pre>
  {/if}
</Main>

<style>
  pre {
    font-family: 'Courier New', Courier, monospace;
  }
</style>
