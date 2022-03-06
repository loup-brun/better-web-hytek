<script>
  import GlobalHeader from './Components/GlobalHeader.svelte';
  import Main from './Components/Main.svelte';

  import { onMount } from 'svelte';

  const APP_CONFIG = {
    hytekFtpLocation: '/ftp/210731/', // must keep the trailing slash
    hytekHtmlEncoding: 'ISO-8859-15', // your encoding may vary!
  };

  let mainHtml;

  let eventIndexHtml;

  onMount(async () => {
    let decoder = new TextDecoder(APP_CONFIG.hytekHtmlEncoding);
    // get the main page
    const mainFetch = await fetch(APP_CONFIG.hytekFtpLocation + 'main.htm', {
      headers: {
        'Accept': 'text/html',
        'Content-Type': 'text/html',
      }
    });
    const mainBuffer = await mainFetch.arrayBuffer();
    mainHtml = decoder.decode(mainBuffer);

    // get the event list
    const eventIndexFetch = await fetch(APP_CONFIG.hytekFtpLocation + 'evtindex.htm', {
      headers: {
        'Accept': 'text/html',
        'Content-Type': 'text/html',
      }
    });
    const eventIndexBuffer = await eventIndexFetch.arrayBuffer();
    eventIndexHtml = decoder.decode(eventIndexBuffer);
    // now parse this html and extract the links
  });
</script>

<GlobalHeader {APP_CONFIG} />

<Main {APP_CONFIG}>
  <pre>{@html mainHtml}</pre>

  <hr>

  {@html eventIndexHtml}
</Main>
