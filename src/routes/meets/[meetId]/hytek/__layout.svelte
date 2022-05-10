<script context="module">
  export async function load({ fetch, params, stuff }) {
    const { meetId, eventId } = params;
    const { meetConfig } = stuff ;

    // get the event list
    const getEvtIndex = await fetch(`/meets/${meetId}/hytek/evtindex`);
    const { evtIndexHTML } = await getEvtIndex.json();

    return {
      props: {
        evtIndexHTML,
        meetConfig,
        meetId,
        eventId,
      },
    }
  }
</script>
<script>
  import { fade, fly } from 'svelte/transition';
  // components
  import Navbar from '$lib/components/Navbar.svelte';
  import HytekEventList from '$lib/components/HytekEventList.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';

  // props
  export let evtIndexHTML;
  export let meetId;
  export let eventId;
  export let meetConfig;

  // vars
  let sidebar;
  let innerWidth = 0;
  let navbarHeight = 0;
  let sidebarWidth = 0;
  let isSideNavOpen = true;
  let expansionBreakpoint = 768; // 1056 by default
  let mainContainer;

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
  <Navbar
    bind:navbarHeight
  >
    <button
      class="Navbar__sidebar-toggle | md:hidden flex flex-row items-center px-4 py-3 text-xs uppercase hover:bg-white/10 hover:text-white active:outline-2 outline-white transition duration-150"
      on:click={() => isSideNavOpen = !isSideNavOpen}
    >
    <span class="mr-1">
        <Icon
          name="{isSideNavOpen ? 'close' : 'menu'}"
          size={16}
        />
    </span>
      Menu
    </button>

    <span
      class="Navbar__brand | flex flex-row items-center text-xs px-4 py-3 text-stone-400"
    >Résultats en ligne</span>
  </Navbar>

  <!-- Inner: horizontal layout w/ space for sidebar -->
  <div class="HytekLayout__inner | relative flex-grow flex flex-row">

    {#if isSideNavOpen}
      <div
        class="HytekLayout__sidebar | bg-stone-100 border-r border-stone-300"
        bind:this={sidebar}
        transition:fly={{ x: -sidebarWidth, opacity: 1 }}
      >
        <header
          class="HytekLayout__sidebar-header | py-6 px-3 flex flex-col justify-center items-center text-center"
        >
          <h1 class="HytekLayout__sidebar-title | text-lg leading-tight font-bold text-orange-600">
            {meetConfig.title}
          </h1>

          <div class="HytekLayout__sidebar-details | text-xs mt-3 text-stone-400">
            {meetConfig.location}
          </div>
      </header>
        <HytekEventList
          {meetId}
          currentEventId={eventId}
          {evtIndexHTML}
        >
        </HytekEventList>

        <!--
        <a
          href="/meets/{meetId}/hytek/eventlist"
          class="HytekLayout__sidebar-button"
        >Programme</a>
        <a
          href="/meets/{meetId}/live"
          class="HytekLayout__sidebar-button"
        >Épreuve en direct</a>
        -->

        <footer class="HytekLayout__sidebar-footer | border-t border-stone-300 p-2 mt-6">
          <div class="my-1">
            <a
              href="/meets/{meetId}/hytek"
              class="HytekLayout__sidebar-link"
            >À propos</a>
          </div>

          <div class="my-1">
            <a
              href="{meetConfig.hytekFtpLocation}index.htm"
              rel="external"
              target="_blank"
              class="HytekLayout__sidebar-link"
            >Utiliser l’expérience classique</a>
          </div>
        </footer>
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
    overflow-y: auto;
    top: 0;
    left: 0;
    z-index: 2;
    height: 100%;
    width: 260px;
    max-width: 100%;
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

  .HytekLayout__sidebar-footer {}
  .HytekLayout__sidebar-link {
    color: #999;
    text-decoration: none;
    font-size: .75rem;
  }
  .HytekLayout__sidebar-link:hover {
    text-decoration: underline;
  }

  .HytekLayout__sidebar-button {
    display: block;
    padding: .75rem .5rem;
    max-width: 100%;
    text-decoration: none;
    color: inherit;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    border-left: 4px solid transparent;
  }
  .HytekLayout__sidebar-button:not(.active):hover {
    background-color: rgba(0, 0, 0, .1);
  }
</style>
