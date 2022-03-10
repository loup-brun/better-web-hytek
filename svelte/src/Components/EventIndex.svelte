<script>
  import { APP_CONFIG } from '../config';
  import { onMount } from 'svelte';
  import {
    SideNav,
    SideNavItems,
    SideNavMenu,
    SideNavMenuItem,
  } from "carbon-components-svelte";
  import fetchHytek from '../utils/fetchHytek';

  // props
  export let isSideNavOpen = false;
  // sessions expects array of objects like so:
  // [
  //   {
  //      title: '',
  //      events: [{ href, text }]
  //   }
  // ]
  export let sessions = [];

  // vars

  // onMount: client-side logic
  onMount(async () => {

    // get the event list
    const evtIndex = await fetchHytek('evtindex.htm', {
      hytekFtpLocation: APP_CONFIG.hytekFtpLocation,
      hytekHtmlEncoding: APP_CONFIG.hytekHtmlEncoding,
    });

    // traverse the DOM tree
    // start at first <h2> that does not have align=center
    // and split sessions at each <hr>
    // TODO make this function faster / more efficient

    let allElements = Array.prototype.slice.call(evtIndex.all);


    let headings = evtIndex.querySelectorAll('h2');
    let links = evtIndex.querySelectorAll('a[href]')
    headings = Array.prototype.slice.call(headings); // arrayify
    links = Array.prototype.slice.call(links); // arrayify
    headings = headings.filter(h => h.getAttribute('align') !== 'center');
    headings.forEach(heading => {
      sessions.push({
        title: heading.innerText,
        events: links.map((e) => { return { href: e.getAttribute('href'), text: e.innerText } })
      });
    });

    // seemingly redundant assignment, but allows reactivity
    sessions = sessions;
  });
</script>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    {#each sessions as session, index}
    <SideNavMenu text={session.title} expanded="{index === 0}">
      {#each session.events as event}
      <SideNavMenuItem href={`#/event/${event.href}`} text={event.text} />
      {/each}
    </SideNavMenu>
    {/each}
  </SideNavItems>
</SideNav>
