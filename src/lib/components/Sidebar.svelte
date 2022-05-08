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

  // props
  export let isSideNavOpen;
  export let sessions = [];
  let innerWidth;

  // vars
  let expansionBreakpoint = 1056; // 1056 by default

  function handleNavClick() {
    if (innerWidth < expansionBreakpoint) {
      isSideNavOpen = !isSideNavOpen;
    }
  }

</script>

<svelte:window bind:innerWidth={innerWidth} />

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    {#if sessions.length}
      {#each sessions as session}
      <SideNavMenu text={session.title}>
          {#each session.events as event}
          <SideNavMenuItem href={`#/event/${event.href}`} text={event.text} on:click={handleNavClick} />
          {/each}
      </SideNavMenu>
      {/each}
    {:else}
      <SideNavMenuItem>
        <InlineLoading description="Chargement des épreuves..." />
      </SideNavMenuItem>
    {/if}
    <SideNavDivider />
    <SideNavLink kind="ghost" href="{APP_CONFIG.hytekFtpLocation}index.htm" text="Interface classique" icon={Screen16} target="_blank" />
  </SideNavItems>
</SideNav>
