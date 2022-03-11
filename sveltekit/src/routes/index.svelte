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
  let mainHtml = '';
  let error = null;
  let isSideNavOpen = false;
  let sessions = [];
  let events = [];

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
    // TODO make this function faster / more efficient
    // let allElements = Array.prototype.slice.call(evtIndex.all);

    // let headings = evtIndex.querySelectorAll('h2');
    let links = evtIndex.querySelectorAll('a[href]')
    // headings = Array.prototype.slice.call(headings); // arrayify
    links = Array.prototype.slice.call(links); // arrayify
    // headings = headings.filter(h => h.getAttribute('align') !== 'center');
    // headings.forEach(heading => {
    //   sessions.push({
    //     title: heading.innerText,
    //     events: links.map((e) => { return { href: e.getAttribute('href'), text: e.innerText } })
    //   });
    // });

    // seemingly redundant assignment, but allows reactivity
    sessions = sessions;
    events = links.map((e) => { return { href: e.getAttribute('href'), text: e.innerText } });

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

    // listen for hash change
    window.addEventListener('hashchange', handleHashChange);

    window.addEventListener('pushState', handleHashChange);
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

<!-- UI Shell -->
<Navbar bind:isSideNavOpen />

<Sidebar bind:isSideNavOpen {events} />

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
    font-size: 11px;
  }
  @media (max-width: 560px) {
    pre {
      font-size: 12px;
    }
  }
  @media (max-width: 768px) {
    pre {
      font-size: 14px;
    }
  }
  @media (max-width: 1056px) {
    pre {
      font-size: 16px;
    }
  }
</style>
