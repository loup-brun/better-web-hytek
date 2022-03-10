<script>
  import { APP_CONFIG } from '../config';
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
  company="COCH"
  platformName="Résultats Invitation 2022"
  href="/"
  bind:isSideNavOpen
>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
  <HeaderNav>
    <HeaderNavItem href="/" text="À propos" />
    <HeaderNavItem href={APP_CONFIG.hytekFtpLocation} text="Expérience classique" target="_blank" />
  </HeaderNav>
</Header>
