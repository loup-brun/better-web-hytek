<script>
  import { APP_CONFIG } from '../../config';
  import {
    SideNav,
    SideNavLink,
    SideNavItems,
    SideNavMenu,
    SideNavMenuItem,
    SideNavDivider,
    InlineLoading,
  } from "carbon-components-svelte";
  import Screen16 from 'carbon-icons-svelte/lib/Screen16/Screen16.svelte';
  import { onMount } from 'svelte';

  // props
  export let isSideNavOpen;
  export let events = [];

  // vars
  let expansionBreakpoint = 1056; // 1056 by default
  let handleNavClick;
  onMount(() => {
    handleNavClick = () => {
      if (window.innerWidth < expansionBreakpoint) {
        isSideNavOpen = !isSideNavOpen;
      }
    }
  });

</script>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    {#if events && events.length}
      <SideNavMenu text="Session">

      {#each events as event}
        <SideNavMenuItem href={`#/event/${event.href}`} text={event.text} on:click={handleNavClick} />
      {/each}
      </SideNavMenu>
    {:else}
      <SideNavMenuItem>
        <InlineLoading description="Chargement des épreuves..." />
      </SideNavMenuItem>
    {/if}
    <SideNavDivider />
    <SideNavLink kind="ghost" href="{APP_CONFIG.hytekFtpLocation}" text="Interface classique" icon={Screen16} target="_blank" />
  </SideNavItems>
</SideNav>
