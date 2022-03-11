<script>

  import { APP_CONFIG } from '../config';
  import { onMount } from 'svelte';
  import fetchHytek from '$lib/utils/fetchHytek.js';
  // components
  import Navbar from '$lib/components/Navbar.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Main from '$lib/components/Main.svelte';

  // vars
  // regex which captures the hash prefix + (event id) + .htm extension
  const eventRegex = /^#\/event\/([0-9A-Za-z]+)\.htm$/;
  // index controls major variables
  let isSideNavOpen = false;
  // content variables
  let mainHtml = '';
  let error = null;
  let sessions = [];
  let sessionModel = { title: '', events: [] };
  let currentSession = false;

  // client-side logic
  onMount(async () => {
    // force showing sidebar with reactive assignment
    isSideNavOpen = true;

    // get the event list
    const evtIndex = await fetchHytek('evtindex.htm', {
      hytekFtpLocation: APP_CONFIG.hytekFtpLocation,
      hytekHtmlEncoding: APP_CONFIG.hytekHtmlEncoding,
    });

    // traverse the DOM tree
    // start at first <h2> that does not have align=center
    // and split sessions at each <hr>
    walk(evtIndex.querySelector('body'), (node) => {
      
      if (currentSession) {
        if (node.nodeName === 'A' && node.getAttribute('target') === 'main') {
          currentSession.events.push({
            href: node.getAttribute('href'),
            text: node.innerText,
          });
          
          currentSession = currentSession;
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
    sessions = sessions;

    // check the hash first
    if (eventRegex.test(window.location.hash)) {
      // handle hash
      await handleHashChange();
    } else {
      // get the main page
      const mainDoc = await fetchHytek('main.htm', {
        hytekFtpLocation: APP_CONFIG.hytekFtpLocation,
        hytekHtmlEncoding: APP_CONFIG.hytekHtmlEncoding,
      });
      mainHtml = mainDoc.querySelector('pre').innerHTML;
    }
  });

  /////////
  
  function walk(node, func) {
    func(node);
    node = node.firstChild;
    while(node) {
      walk(node, func);
      node = node.nextSibling;
    }
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
        const eventDoc = await fetchHytek(fetchFilename, {
          hytekFtpLocation: APP_CONFIG.hytekFtpLocation,
          hytekHtmlEncoding: APP_CONFIG.hytekHtmlEncoding,
        });
        mainHtml = eventDoc.querySelector('pre').innerHTML;
      } catch (e) {
        error = 'Erreur lors de la récupération de l’épreuve';
        mainHtml = '';
      }
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
  @media (max-width: 1056px) {
    :global(.bx--side-nav ~ .bx--content) {
      /* fix bug in deisgn system */
      margin-left: 0;
    }
  }
  pre {
    font-family: 'Courier New', Courier, monospace;
    font-size: 10px;
  }
  @media (min-width: 768px) {
    pre {
      font-size: 13px;
    }
  }
  @media (min-width: 1056px) {
    pre {
      font-size: 14px;
    }
  }
</style>
