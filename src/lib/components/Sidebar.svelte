<script>
  import {
    SideNav,
    SideNavLink,
    SideNavItems,
    SideNavMenu,
    SideNavMenuItem,
    SideNavDivider,
    InlineLoading,
  } from "carbon-components-svelte";
  import { slide } from 'svelte/transition';
  import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  } from '@rgossiaux/svelte-headlessui';

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

<div class="EventList">
  <header class="EventList__header"></header>

  {#if sessions.length}
    {#each sessions as session}
      <Disclosure let:open>
        <DisclosureButton>{session.title}</DisclosureButton>

        {#if open}
          <div transition:slide={{ duration: 800 }}>
            <DisclosurePanel>
              {#each session.events as event}
                <a
                  href={`#/event/${event.href}`}
                  class="EventList__link"
                  on:click={handleNavClick}
                >{event.text}</a>
              {/each}
            </DisclosurePanel>
          </div>
        {/if}
      </Disclosure>
    {/each}
  {:else}
    <div>
      Chargement des épreuves...
    </div>
  {/if}
</div>

<!--
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
  </SideNavItems>
</SideNav>
-->

<style>
  .EventList {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 20rem;
  }

  .EventList__link {
    display: block;
    padding: .5rem .75rem;
    text-decoration: none;
    color: inherit;
  }
</style>
