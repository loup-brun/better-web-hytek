<script context="module">
  export async function load({ fetch, params }) {
    const { meetId, eventId } = params;

    // get the event list
    const getEvtIndex = await fetch(`/meets/${meetId}/hytek/evtindex`);
    const { evtIndexHTML } = await getEvtIndex.json();

    return {
      props: {
        evtIndexHTML,
        meetId,
        eventId: eventId || null,
      },
    }
  }
</script>
<script>
  import { fade, fly } from 'svelte/transition';
  // components
  import Navbar from '$lib/components/Navbar.svelte';
  import HytekEventList from '$lib/components/HytekEventList.svelte';
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';

  // props
  export let evtIndexHTML;
  export let meetId;
  export let eventId;

  // vars
  let sidebar;
  let innerWidth = 0;
  let navbarHeight = 0;
  let sidebarWidth = 0;
  let isSideNavOpen = true;
  let expansionBreakpoint = 768; // 1056 by default
  let mainContainer;
  let currentEventId;

  // reactive assignment
  $: currentEventId = eventId || null;

  onMount(() => {
    sidebarWidth = sidebar.getBoundingClientRect().width;
  });

  afterNavigate(() => {
    // new page loaded
    if (innerWidth < expansionBreakpoint) {
      // close sidebar if has navigated
      isSideNavOpen = false;
    }
  });


  function handleResize() {
    if (innerWidth > expansionBreakpoint) {
      if (!isSideNavOpen) {
        isSideNavOpen = true
      }
    }
  }

  function resetMainScroll() {
    mainContainer.scrollTo(0, 0);
  }

</script>

<svelte:window
  on:resize={handleResize}
  bind:innerWidth
/>

<!-- Set title in browser tab bar -->
<svelte:head>
  <title>Résultats</title>
</svelte:head>

<div
  class="HytekLayout | flex flex-col"
  style="--navbarHeight: {navbarHeight}px; --sidebarWidth: {sidebarWidth}px;"
>
  <!--TODO: modularize navbar -->
  <Navbar
    bind:navbarHeight
    bind:isSideNavOpen
  />

  <!-- Inner: horizontal layout w/ space for sidebar -->
  <div class="HytekLayout__inner | relative flex-grow flex flex-row">

    {#if isSideNavOpen}
      <div
        class="HytekLayout__sidebar"
        bind:this={sidebar}
        transition:fly={{ x: -sidebarWidth, opacity: 1 }}
      >
        <HytekEventList
          {meetId}
          {currentEventId}
          {evtIndexHTML}
        />
      </div>

      <div
        class="HytekLayout__sidebar-overlay | bg-black/50 absolute top-0 left-0 h-full w-full md:hidden"
        on:click={() => isSideNavOpen = !isSideNavOpen}
        transition:fade
      ></div>
    {/if}

    <div
      class="HytekLayout__main"
      bind:this={mainContainer}
    >
      <div
        class="HytekLayout__main-container | mx-auto">
        <slot></slot>
      </div>
    </div>
  </div>
</div>

<style>
  .HytekLayout {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  .HytekLayout__inner {
    /*padding-left: var(--sidebarWidth);*/
    /*transition: .5s padding;*/
    overflow: auto; /* enable native scroll */
  }
  .HytekLayout__sidebar {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    height: 100%;
    width: 260px;
    max-width: 100%;
    background-color: #efefef;
    border-right: 1px solid #ccc;
  }
  .HytekLayout__main {
    flex-grow: 1; /* fill up horizontal space */
    overflow: auto; /* enable native scroll */
    margin-left: 0;
    transition: margin .35s;
  }

  @media (min-width: 768px) {
    .HytekLayout__main {
      margin-left: var(--sidebarWidth, auto);
    }
  }
</style>
