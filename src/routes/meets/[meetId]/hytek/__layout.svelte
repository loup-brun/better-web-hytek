<script context="module">
  import fetchDocument from "$lib/utils/fetchDocument.js";
  import { APP_CONFIG } from "$lib/../config.js";

  export async function load({ fetch }) {

    // get the event list
    const evtIndexHTML = await fetchDocument(fetch, 'evtindex.htm', {
      encoding: APP_CONFIG.hytekHtmlEncoding,
      baseLocation: APP_CONFIG.hytekFtpLocation,
    });

    return {
      props: {
        evtIndexHTML,
      },
    }
  }
</script>
<script>
  import { fade, fly } from 'svelte/transition';
  // components
  import Navbar from '$lib/components/Navbar.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { onMount } from 'svelte';

  // props
  export let evtIndexHTML;

  // vars
  let sidebar;
  let navbarHeight = 0;
  let sidebarWidth = 0;
  let isSideNavOpen = true;
  let expansionBreakpoint = 768; // 1056 by default

  onMount(() => {
    sidebarWidth = sidebar.getBoundingClientRect().width;
  });

  function handleResize() {
    console.log('handleResize')
    if (innerWidth > expansionBreakpoint) {
      if (!isSideNavOpen) {
        isSideNavOpen = true
      }
    }
  }

</script>

<svelte:window
  on:resize={handleResize}
  />

<div
  class="HytekLayout | flex flex-col"
  style="--navbarHeight: {navbarHeight}px; --sidebarWidth: {sidebarWidth}px;"
>
  <Navbar
    bind:navbarHeight
    bind:isSideNavOpen
  />

  <div class="HytekLayout__inner | relative flex-grow flex flex-row">

    {#if isSideNavOpen}
    <div
      class="HytekLayout__sidebar"
      bind:this={sidebar}
      transition:fly={{ x: -sidebarWidth, opacity: 1 }}
    >
      <Sidebar
        bind:isSideNavOpen
        {evtIndexHTML}
      />
    </div>
      <div
        class="HytekLayout__sidebar-overlay | bg-black/50 absolute top-0 left-0 h-full w-full md:hidden"
        on:click={() => isSideNavOpen = !isSideNavOpen}
        transition:fade
      ></div>
    {/if}


    <div class="HytekLayout__main">
      <div class="HytekLayout__main-container | mx-auto">
        <slot></slot>
      </div>
    </div>
  </div>
</div>

<style>
  .HytekLayout {
    padding-top: var(--navbarHeight, 100px);
    height: 100vh;
    width: 100vw;
  }
  .HytekLayout__inner {
    height: 100%;
  }
  .HytekLayout__sidebar {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    height: 100%;
    width: 250px;
    max-width: 100%;
    background-color: #fff;
  }
  .HytekLayout__main {
    overflow: auto;
    padding: 8px;
    transition: margin .15s;
  }

  @media (min-width: 768px) {
    .HytekLayout__main {
      margin-left: var(--sidebarWidth, 200px);
    }
  }
  .HytekLayout__main {

  }
</style>
