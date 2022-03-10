<script>
  import { APP_CONFIG } from '../../config';
  import {
    SideNav,
    SideNavLink,
    SideNavItems,
    SideNavMenuItem,
    SideNavDivider,
    InlineLoading,
  } from "carbon-components-svelte";
  import Screen16 from 'carbon-icons-svelte/lib/Screen16/Screen16.svelte';

  // props
  export let isSideNavOpen;
  export let events = [];
</script>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    {#if events && events.length}
      {#each events as event}
        <SideNavLink href={`#/event/${event.href}`} text={event.text} />
      {/each}
    {:else}
      <SideNavMenuItem>
        <InlineLoading description="Chargement des épreuves..." />
      </SideNavMenuItem>
    {/if}
    <SideNavDivider />
    <SideNavLink kind="ghost" href="{APP_CONFIG.hytekFtpLocation}" text="Interface classique" icon={Screen16} target="_blank" />
  </SideNavItems>
</SideNav>
