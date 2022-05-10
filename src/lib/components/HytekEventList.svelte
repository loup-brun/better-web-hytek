<script>
  import { APP_CONFIG } from "../../config.js";
  import { slide } from 'svelte/transition';
  import { onMount } from 'svelte';
  import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  } from '@rgossiaux/svelte-headlessui';
  import Icon from '$lib/components/Icon.svelte';
  import walkDOM from '$lib/utils/walkDOM';

  // props
  export let sessions = [];
  export let meetId;
  export let evtIndexHTML = '';
  export let currentEventId;

  // vars
  let sessionModel = { title: '', events: [] }; // base model for new sessions
  let innerWidth = 0;
  let sidebar;

  onMount(() => {
    const parser = new DOMParser();
    const evtIndexDOM = parser.parseFromString(evtIndexHTML, 'text/html');

    sessions = makeEventList(evtIndexDOM);
  });

  //////////

  function makeEventList(evtIndexDOM) {
    let _sessions = [];
    let _currentSession = false;
    // traverse the DOM tree
    // start at first <h2> that does not have align=center
    // and split sessions at each <hr>
    walkDOM(evtIndexDOM.querySelector('body'), (node) => {
      if (_currentSession) {
        if (node.nodeName === 'A' && node.getAttribute('target') === 'main') {
          _currentSession.events.push({
            href: node.getAttribute('href'),
            eventId: node.getAttribute('href').replace('.htm', ''),
            text: node.innerText,
          });
        }
      }
      if (node.nodeName === 'H2') {
        if (node.getAttribute('align') === 'center') {
          return;
        }
        if (!_currentSession) {
          // start new section
          _currentSession = Object.assign({}, sessionModel);
          _currentSession.title = node.innerText;
        } else {
          _sessions.push(_currentSession);
          // start new section
          _currentSession = Object.assign({}, sessionModel);
          _currentSession.title = node.innerText;
          _currentSession.events = [];
        }
      }
    })
    // seemingly redundant assignment, but allows reactivity
    // since Array.push() just modifies the array in place
    // https://svelte.dev/docs#component-format-script-2-assignments-are-reactive
    return _sessions;
  }

</script>

<svelte:window
  bind:innerWidth={innerWidth}
/>

<div
  class="EventList"
  bind:this={sidebar}
>
  <header class="EventList__header">
    <slot name="header">
      <!--
      <div class="px-2 py-6"><a href="/meets/{meetId}/hytek">Accueil</a></div>
      -->
    </slot>
  </header>

  {#if sessions.length}
    {#each sessions as session, i}
      <Disclosure let:open>
        <div class="EventList__title-wrap">
          <DisclosureButton>
            <span
              class="EventList__title-icon"
              class:open
            >
              <Icon name="chevronRight" />
            </span>
            {session.title}
          </DisclosureButton>
        </div>

        {#if open}
          <div transition:slide|local={{ duration: 800 }}>
            <DisclosurePanel>
              {#each session.events as event}
                <a
                  href="/meets/{meetId}/hytek/event/{event.eventId}"
                  class="EventList__button"
                  class:active={event.eventId === currentEventId}
                  title="{event.text}"
                >{event.text}</a>
              {/each}
            </DisclosurePanel>
          </div>
        {/if}
      </Disclosure>
    {/each}
  {:else}
    <div class="p-4 text-neutral-500">
      Chargement des épreuves...
    </div>
  {/if}

  <footer class="EventList__footer | p-2 mt-6">
    <div class="my-1">
      <a
        href="/meets/{meetId}/hytek"
        class="EventList__link"
      >À propos</a>
    </div>

    <div class="my-1">
      <a
        href="{APP_CONFIG.hytekFtpLocation}index.htm"
        rel="external"
        target="_blank"
        class="EventList__link"
      >Utiliser l’expérience classique</a>
    </div>
  </footer>
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
    max-width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    overflow-y: auto;
  }
  .EventList__title-button {
    text-align: left;
    font-weight: bold;
    display: block;
    font-size: 14px;
  }
  .EventList__title-button:hover {
    background-color: rgba(0, 0, 0, .1);
  }
  .EventList__title-wrap :global(> button) {
    /* target headless ui button */
    display: block;
    max-width: 100%;
    @apply  px-1 py-2 font-bold text-sm block whitespace-nowrap overflow-hidden text-ellipsis max-w-full;
  }
  .EventList__title-wrap :global(> button):hover {
    background-color: rgba(0, 0, 0, .1);
  }
  .EventList__title-icon {
    position: relative;
    display: inline-block;
    top: .25rem;
    transition: transform .2s;
    line-height: 1; /* make ratio 1:1 */
  }
  .EventList__title-icon.open {
    transform: rotate(90deg);
  }

  .EventList__button {
    display: block;
    padding: .75rem .5rem;
    max-width: 100%;
    text-decoration: none;
    color: inherit;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    border-left: 4px solid transparent;
  }
  .EventList__button:not(.active):hover {
    background-color: rgba(0, 0, 0, .1);
  }
  .EventList__footer {
    border-top: 1px solid #ccc;
  }
  .EventList__link {
    color: #999;
    text-decoration: none;
    font-size: .75rem;
  }
  .EventList__link:hover {
    text-decoration: underline;
  }

  .active {
    border-left-color: var(--primary, #ff6900);
    background-color: #fff;
    cursor: default;
  }
</style>
