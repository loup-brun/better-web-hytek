<script>
  import { APP_CONFIG } from '../../config';
  import { onMount } from 'svelte';
  import {
    Header,
    HeaderNav,
    HeaderNavItem,
    SkipToContent,
  } from "carbon-components-svelte";

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
  class="Navbar"
  bind:this={navbar}
>


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
    height: 60px;
    background-color: #000;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .version {
    font-weight: 300;
    font-size: 90%;
  }
</style>
