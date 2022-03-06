<script>
  export let isSideNavOpen = false;
    import {
    SideNav,
    SideNavItems,
    SideNavMenu,
    SideNavMenuItem,
  } from "carbon-components-svelte";

  export let sessions = [
    {
      title: 'Session #1 - Samedi 21 décembre',
      events: [
        {
          href: '#',
          text: 'Épreuve 00 - Saut en longueur'
        },
      ]
    }
  ]
</script>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    {#each sessions as session}
    <SideNavMenu text={session.title} expanded="{true}">
      {#each session.events as event}
      <SideNavMenuItem href={event.href} text={event.text} />
      {/each}
    </SideNavMenu>
    {/each}
  </SideNavItems>
</SideNav>
