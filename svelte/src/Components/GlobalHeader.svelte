<script>
  export let APP_CONFIG;
  import {
    Header,
    HeaderUtilities,
    HeaderAction,
    HeaderGlobalAction,
    HeaderPanelLinks,
    HeaderPanelDivider,
    HeaderPanelLink,
    SkipToContent,
  } from "carbon-components-svelte";

  import EventIndex from './EventIndex.svelte';

  let isSideNavOpen = false;
  let isOpen1 = false;
  let isOpen2 = false;
</script>

<Header company="Résultats" platformName="COCH Invitation 2022" bind:isSideNavOpen>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
  <HeaderUtilities>
    <HeaderAction bind:isOpen={isOpen2}>
      <HeaderPanelLinks>
        <HeaderPanelDivider>Liens</HeaderPanelDivider>
        <HeaderPanelLink href={APP_CONFIG.hytekFtpLocation}>Retour à l’expérience classique</HeaderPanelLink>
        <HeaderPanelDivider>Switcher subject 2</HeaderPanelDivider>
        <HeaderPanelLink>Switcher item 1</HeaderPanelLink>
        <HeaderPanelLink>Switcher item 2</HeaderPanelLink>
        <HeaderPanelLink>Switcher item 3</HeaderPanelLink>
        <HeaderPanelLink>Switcher item 4</HeaderPanelLink>
        <HeaderPanelLink>Switcher item 5</HeaderPanelLink>
      </HeaderPanelLinks>
    </HeaderAction>
  </HeaderUtilities>
</Header>

<EventIndex {isSideNavOpen} />
