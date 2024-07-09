<!-- HY-TEK EVENT LAYOUT -->
<script>
  import { fade, fly } from 'svelte/transition';
  import { linear, expoOut } from 'svelte/easing';
  // components
  import Navbar from '$lib/components/Navbar.svelte';
  import HytekEventList from '$lib/components/HytekEventList.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import { onMount, tick } from 'svelte';
  import { writable } from 'svelte/store';
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/stores';

  // props
  /** @type {import('./$types').PageData} */
  export let data;

  const {
    evtIndexHTML,
    meetSlug,
  } = data;

  let eventId = data.eventId;

  // store
  const userState = writable({
    menuDisclosures: [],
    menuScrollY: 0,
  });
  // vars
  /** @type {HTMLElement} */
  let sidebar;
  /** @type {Number} */
  let innerWidth = 0;
  /** @type {Number} */
  let sidebarWidth = 0;
  /** @type {Boolean} */
  let isSideNavOpen = true;
  /** @type {Number} */
  let expansionBreakpoint = 768; // 1056 by default
  /** @type {HTMLElement} */
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

  /**
   * Show/hide the side navigation on resize, depending on threshold
   * @uses expansionBreakpoint
   * @uses innerWidth
   */
  function handleResize() {
    if (innerWidth > expansionBreakpoint) {
      if (!isSideNavOpen) {
        isSideNavOpen = true
      }
    }
  }

  /**
   * Save the current scroll position of the sidebar, when user closes and reopens it
   * (feels more natural)
   * @param {ScrollEvent} ev
   */
  function saveSideNavScroll(ev) {
    const { scrollTop } = ev.currentTarget;
    userState.update(u => {
      u.menuScrollY = scrollTop;
      return u;
    });
  }

  /**
   * Svelte `use` action to scroll navigation container back
   * @param {HTMLElement} node
   */
  async function scrollNavToPref(node) {
    await tick();
    node.scroll(0, $userState.menuScrollY || 0);
  }

  /**
   * Svelte `use` directive to scroll back up (on event refresh)
   * @param node
   * @param eventId Variable parameter that will trigger an update
   * @returns {{update(): void}}
   */
  function innerScroll(node, eventId) {
    return {
      update(eventId) {
        node.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
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

  <meta name="theme-color" content="{data.themeColor}">
</svelte:head>

<div
  class="HytekLayout | flex flex-col"
>
  <div class="HytekLayout__header | flex-shrink-0 relative z-20">
    <Navbar
      --themeColor={data.themeColor}
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
        class="Navbar__brand | mx-3 my-2 inline-flex flex-row items-center uppercase text-lg whitespace-nowrap overflow-hidden overflow-ellipsis tracking-wide"
      >Résultats</h1>
    </Navbar>
  </div>

  <!-- Inner: horizontal layout w/ space for sidebar -->
  <div class="HytekLayout__inner | relative flex-grow flex flex-row">

    {#if isSideNavOpen}
      <div
        class="HytekLayout__sidebar | bg-zinc-100 border-r border-zinc-300 dark:bg-zinc-900 dark:border-zinc-600"
        bind:this={sidebar}
        in:fly|local={{ x: -sidebarWidth, opacity: 1, delay: 400, easing: expoOut }}
        out:fly|local={{ x: -sidebarWidth, opacity: 1, easing: expoOut }}
        on:scroll={ev => saveSideNavScroll(ev)}
        use:scrollNavToPref
      >
        <header
          class="HytekLayout__sidebar-header | px-3 py-4 text-zinc-600 dark:text-zinc-500"
        >
          {#if data.logo}
            <a href="/meets/{meetSlug}">
              <img
                src="{data.logo}"
                alt="Logo"
                class="mb-4"
                style="max-width: {data.logoMaxWidth || 90}px;"
              />
            </a>
          {/if}

          <h1 class="HytekLayout__sidebar-title | text-lg leading-tight font-bold">
            <a href="/meets/{meetSlug}">
            {data.title}
            </a>
          </h1>

          <div class="HytekLayout__sidebar-details | text-xs mt-3 text-zinc-600 dark:text-zinc-500">
            {data.stadiumName}
            <br>
            ({data.city}, {data.province})

            <div class="mt-2">
              {data.dateStart}
              {#if data.dateStart !== data.dateEnd}
              - {data.dateEnd}
              {/if}
            </div>
          </div>
        </header>

        <HytekEventList
          {meetSlug}
          currentEventId={eventId}
          {evtIndexHTML}
          sessionNames={data.sessionNames}
          {userState}
          --themeColor={data.themeColor}
        >
        </HytekEventList>

        <footer class="HytekLayout__sidebar-footer | border-t border-zinc-300 dark:border-zinc-600 p-2 mt-6">
          <div class="my-1">
            <a
              href="/meets/{meetSlug}/about"
              class="HytekLayout__sidebar-link"
            >À propos</a>
          </div>

          <div class="my-1">
            <a
              href="{data.hytekFtpLocation}index.htm"
              target="_blank"
              rel="noreferrer"
              class="HytekLayout__sidebar-link"
            >Utiliser l’expérience classique</a>
          </div>
        </footer>
      </div>

      <div
        class="HytekLayout__sidebar-overlay | bg-black/50 absolute top-0 left-0 h-full w-full md:hidden"
        on:click={() => isSideNavOpen = !isSideNavOpen}
        aria-role="button"
        in:fade={{ easing: linear }}
        out:fade={{ delay: 200, duration: 200, easing: linear }}
      ></div>
    {/if}

    <div
      class="HytekLayout__main | bg-white dark:bg-zinc-800 text-black dark:text-zinc-100"
      bind:this={mainContainer}
      use:innerScroll={eventId}
    >
      <slot></slot>
    </div>
  </div>
</div>

<style>
  .HytekLayout {
    --sidebarWidth: 275px;
    height: 100vh;
    height: 100dvh;
    width: 100%;
    overflow: hidden;
  }
  @media (min-width: 375px) {
    .HytekLayout {
      --sidebarWidth: 312px;
    }
  }
  .Navbar__sidebar-toggle {
    -webkit-appearance: none;
    line-height: 1;
  }
  .HytekLayout__inner {
    /* enable native scroll */
    /* actually, only `main` requires scroll */
    height: 100%;
    overflow: hidden;
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
    height: 100%;
    margin-left: 0;
    transition: margin .35s;
    position: relative;
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
</style>
