<script>
  import { APP_CONFIG } from '../../config';
  import {
    Header,
    HeaderNav,
    HeaderNavItem,
    SkipToContent,
  } from "carbon-components-svelte";

  // props
  export let isSideNavOpen;
</script>

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

<style>
  .version {
    font-weight: 300;
    font-size: 90%;
  }
</style>
