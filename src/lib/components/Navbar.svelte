<script>
  import { APP_CONFIG } from '../../config';
  import { onMount } from 'svelte';

  // props
  export let isSideNavOpen;
  export let navbarHeight;

  // vars
  let navbar;

  onMount(() => {
    navbarHeight = navbar.getBoundingClientRect().height;
  })
</script>

<header
  class="Navbar | flex flex-row items-center bg-black text-white"
  bind:this={navbar}
>
  <button
    class="Navbar__sidebar-toggle | md:hidden block px-3 py-4 text-xs uppercase"
    on:click={() => isSideNavOpen = !isSideNavOpen}
  >Menu</button>

  <a
    class="Navbar__brand | text-white inline-block px-3 py-4 font-bold"
    href="/"
  >Résultats en ligne {APP_CONFIG.company}</a>

</header>

<!--
<Header
  company={APP_CONFIG.company}
  href="/"
  bind:isSideNavOpen
>
  <span slot="platform">
    {APP_CONFIG.name}
    <code class="version">{APP_CONFIG.version}</code>
  </span>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
  <HeaderNav>
    <HeaderNavItem href="/about" text="À propos" />
    <HeaderNavItem href={APP_CONFIG.hytekFtpLocation + 'index.htm'} text="Retour à l’interface classique" target="_blank" />
  </HeaderNav>
</Header>
-->

<style>
  .Navbar {
    background-color: #212721;
    background-color: #ff6900;
    width: 100%;
  }

  .Navbar__brand {
    color: white;
  }
  /*
  .version {
    font-weight: 300;
    font-size: 90%;
  }
  */
</style>
