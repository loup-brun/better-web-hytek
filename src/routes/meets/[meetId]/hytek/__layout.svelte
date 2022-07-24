<!-- HY-TEK EVENT LAYOUT -->
<script context="module">
  export async function load({ fetch, params, stuff }) {
    const { meetId, eventId } = params;
    const { meetConfig } = stuff ;

    // get the event list
    try {
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
    } catch (e) {
      console.warn('Could not fetch event index', e);
      return {
        meetConfig,
        meetId,
        eventId,
        evtIndexHTML: null
      }
    }
  }
</script>
<script>
  import { fade, fly } from 'svelte/transition';
  import { linear, expoOut } from 'svelte/easing';
  // components
  import Navbar from '$lib/components/Navbar.svelte';
  import HytekEventList from '$lib/components/HytekEventList.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/stores';

  // props
  export let evtIndexHTML;
  export let meetId;
  export let eventId; // eventId won’t necessarily be available on first load
  export let meetConfig;

  // vars
  let sidebar;
  let innerWidth = 0;
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

    // eventId will be different after navigate
    eventId = $page.params.eventId;
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
>
  <div class="HytekLayout__header | flex-shrink-0 relative z-20">
    <Navbar
      --themeColor={meetConfig.themeColor}
    >
      <button
        class="Navbar__sidebar-toggle | md:hidden flex flex-row items-center px-4 py-3 text-xs uppercase hover:bg-white/10 hover:text-white active:outline-2 outline-white transition duration-150"
        on:click={() => isSideNavOpen = !isSideNavOpen}
      >
        <span class="mr-2">
          <Icon
            name="{isSideNavOpen ? 'close' : 'menu'}"
            size={20}
          />
        </span>
        Menu
      </button>

      <h1
        class="Navbar__brand | mr-auto flex flex-row items-center text-xl px-3 py-2 uppercase tracking-wide"
      >Résultats</h1>
    </Navbar>
  </div>

  <!-- Inner: horizontal layout w/ space for sidebar -->
  <div class="HytekLayout__inner | relative flex-grow flex flex-row">

    {#if isSideNavOpen}
      <div
        class="HytekLayout__sidebar | bg-zinc-100 border-r border-zinc-300"
        bind:this={sidebar}
        in:fly|local={{ x: -sidebarWidth, opacity: 1, delay: 400, easing: expoOut }}
        out:fly|local={{ x: -sidebarWidth, opacity: 1, easing: expoOut }}
      >
        <header
          class="HytekLayout__sidebar-header | px-3 py-4 bg-zinc-100 text-zinc-600"
        >
          {#if meetConfig.logo}
            <a href="/meets/{meetId}/hytek">
              <img
                src="{meetConfig.logo}"
                alt="Logo"
                class="mb-4"
                style="max-width: 90px;"
              />
            </a>
          {/if}

          <h1 class="HytekLayout__sidebar-title | text-lg leading-tight font-bold">
            <a href="/meets/{meetId}/hytek">
            {meetConfig.title}
            </a>
          </h1>

          <div class="HytekLayout__sidebar-details | text-xs mt-3 text-zinc-600">
            {meetConfig.stadiumName}
            <br>
            ({meetConfig.city}, {meetConfig.province})

            <div class="mt-2">
              {meetConfig.dateStart}
            </div>
          </div>
        </header>

        <HytekEventList
          {meetId}
          currentEventId={eventId}
          {evtIndexHTML}
          sessionNames={meetConfig.sessionNames}
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

        <footer class="HytekLayout__sidebar-footer | border-t border-zinc-300 p-2 mt-6">
          <div class="my-1">
            <a
              href="/meets/{meetId}/hytek/about"
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
        in:fade={{ easing: linear }}
        out:fade={{ delay: 200, duration: 200, easing: linear }}
      ></div>
    {/if}

    <div
      class="HytekLayout__main"
      bind:this={mainContainer}
    >
      <div
        class="HytekLayout__main-container | mx-auto min-h-full">
        <slot></slot>
      </div>
    </div>
  </div>
</div>

<style>
  .HytekLayout {
    --sidebarWidth: 275px;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  .Navbar__sidebar-toggle {
    -webkit-appearance: none;
    line-height: 1;
  }
  .HytekLayout__inner {
    /* enable native scroll */
    overflow: auto;
    /* add momentum scrolling for iOS >=12.5 (more recent devices support momentum scrolling by default) */
    -webkit-overflow-scrolling: touch;
  }
  .HytekLayout__sidebar {
    position: absolute;
    overflow-y: auto; /* enable native scroll */
    top: 0;
    left: 0;
    z-index: 10;
    height: 100%;
    width: var(--sidebarWidth);
    max-width: 100%;
  }
  .HytekLayout__sidebar-overlay {
    z-index: 9;
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
