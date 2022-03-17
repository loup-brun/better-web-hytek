<script>

  import { APP_CONFIG } from '../config';
  import { onMount } from 'svelte';
  import fetchDocument from '$lib/utils/fetchDocument.js'; // for fetching documents
  import walkDOM from '$lib/utils/walkDOM.js'; // for walking the DOM
  // components
  import Navbar from '$lib/components/Navbar.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Main from '$lib/components/Main.svelte';

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
  let sessions = []; // pass this to the <Sidebar />
  let sessionModel = { title: '', events: [] }; // base model for new sessions
  let currentSession = false; // for when traversing the event index

  // client-side logic
  onMount(async () => {
    // force showing sidebar with reactive assignment
    isSideNavOpen = true;

    // get the event list
    const evtIndexDOM = await fetchDocument('evtindex.htm', {
      encoding: APP_CONFIG.hytekHtmlEncoding,
      baseLocation: APP_CONFIG.hytekFtpLocation,
    });

    // make event list, populate `sessions`
    makeEventList(evtIndexDOM);

    // check the hash on first load
    if (eventRegex.test(window.location.hash)) {
      // handle hash
      await handleHashChange();
    } else {
      // get the main page
      const mainDoc = await fetchDocument('main.htm', {
        encoding: APP_CONFIG.hytekHtmlEncoding,
        baseLocation: APP_CONFIG.hytekFtpLocation,
      });
      mainHtml = mainDoc.querySelector('pre').innerHTML;
    }
  });

  /////////

  function makeEventList(evtIndexDOM) {
    // traverse the DOM tree
    // start at first <h2> that does not have align=center
    // and split sessions at each <hr>
    walkDOM(evtIndexDOM.querySelector('body'), (node) => {
      if (currentSession) {
        if (node.nodeName === 'A' && node.getAttribute('target') === 'main') {
          currentSession.events.push({
            href: node.getAttribute('href'),
            text: node.innerText,
          });
        }
      }
      if (node.nodeName === 'H2') {
        if (node.getAttribute('align') === 'center') {
          return;
        }
        if (!currentSession) {
          // start new section
          currentSession = Object.assign({}, sessionModel);
          currentSession.title = node.innerText;
        } else {
          sessions.push(currentSession);
          // start new section
          currentSession = Object.assign({}, sessionModel);
          currentSession.title = node.innerText;
          currentSession.events = [];
        }
      }
    });

    // seemingly redundant assignment, but allows reactivity
    // since Array.push() just modifies the array in place
    // https://svelte.dev/docs#component-format-script-2-assignments-are-reactive
    sessions = sessions;
  }

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
        const eventDoc = await fetchDocument(fetchFilename, {
          encoding: APP_CONFIG.hytekHtmlEncoding,
          baseLocation: APP_CONFIG.hytekFtpLocation,
        });
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
</script>

<svelte:window on:hashchange={handleHashChange}
               on:pushState={handleHashChange} />

<!-- UI Shell -->
<Navbar bind:isSideNavOpen />

<Sidebar bind:isSideNavOpen {sessions} />

<Main {error}>
  {#if mainHtml && mainHtml.length}
    <pre>
      {@html mainHtml}
    </pre>
  {/if}
</Main>

<style>
  /* fix bug in deisgn system */
  @media (max-width: 1056px) {
    :global(.bx--side-nav ~ .bx--content) {
      margin-left: 0;
    }
  }
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
