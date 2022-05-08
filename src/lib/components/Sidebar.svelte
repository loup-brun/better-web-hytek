<script>
  import { slide } from 'svelte/transition';
  import { onMount } from 'svelte';
  import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  } from '@rgossiaux/svelte-headlessui';
  import walkDOM from '$lib/utils/walkDOM';

  // props
  export let isSideNavOpen;
  export let sessions = [];
  export let evtIndexHTML = '';

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

  function handleNavClick() {
    if (innerWidth < expansionBreakpoint) {
      isSideNavOpen = !isSideNavOpen;
    }
  }

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
  <header class="EventList__header"><slot name="header"></slot></header>

  {#if sessions.length}
    {#each sessions as session}
      <Disclosure let:open>
        <DisclosureButton>
          <div class="EventList__title-button | p-3 bold">{session.title}</div>
        </DisclosureButton>

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
    overflow-y: auto;
  }

  .EventList__link {
    display: block;
    padding: .5rem .75rem;
    text-decoration: none;
    color: inherit;
  }
</style>
