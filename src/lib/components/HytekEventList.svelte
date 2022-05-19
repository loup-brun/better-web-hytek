<script>
  import { slide } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { beforeNavigate, afterNavigate } from '$app/navigation';
  import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  } from '@rgossiaux/svelte-headlessui';
  import Icon from '$lib/components/Icon.svelte';
  import Spinner from '$lib/components/Spinner.svelte';
  import walkDOM from '$lib/utils/walkDOM';

  // props
  export let sessions = [];
  export let error = null;
  export let meetId;
  export let evtIndexHTML = '';
  export let currentEventId;
  export let sessionNames;

  // vars
  let sessionModel = { title: '', events: [] }; // base model for new sessions
  let innerWidth = 0;
  let sidebar;
  let navigatingTo;

  onMount(() => {
    if (evtIndexHTML) {
      const parser = new DOMParser();
      const evtIndexDOM = parser.parseFromString(evtIndexHTML, 'text/html');

      sessions = makeEventList(evtIndexDOM);
    } else {
      // if evtIndexHTML is false, there is error on parent
      error = 'Erreur de chargement du programme d’épreuves.';
    }
  });

  beforeNavigate(({ to }) => {
    navigatingTo = to;
  });

  afterNavigate(() => {
    navigatingTo = null;
  });

  //////////

  function makeEventList(evtIndexDOM) {
    let _sessions = [];
    let finishedWalking = false;
    let _currentSession = Object.assign({}, sessionModel);
    let sessionIndex = 1;

    // traverse the DOM tree
    // start at first <h2> that does not have align=center
    // and split sessions at each <hr>
    walkDOM(evtIndexDOM.querySelector('body'), (node) => {
      if (!finishedWalking) {
        if (node.nodeName === 'A' && node.getAttribute('target') === 'main') {
          // unshift rather than push, since we’re walking from down to up
          _currentSession.events.unshift({
            href: node.getAttribute('href'),
            eventId: node.getAttribute('href').replace('.htm', ''),
            text: node.innerText,
          });
        }
        // if we’ve finished a section
        if (node.nodeName === 'H2') {
          if (node.getAttribute('align') === 'center') {
            // we’re done, we’ve walked all the way up
            finishedWalking = true;
            return;
          }
          if (!_currentSession) {
            // start new section
            _currentSession = Object.assign({}, sessionModel);
          } else {
            // finished current section
            _currentSession.title = node.innerText;
            // map to meet setting

            _sessions.unshift(_currentSession);
            sessionIndex++
            // reset _currentSession
            _currentSession = Object.assign({}, sessionModel);
            _currentSession.events = [];
          }
        }
      }
    });
    // seemingly redundant assignment, but allows reactivity
    // since Array.unshift() just modifies the array in place
    // https://svelte.dev/docs#component-format-script-2-assignments-are-reactive
    if (sessionNames) {
      sessionNames.forEach((name, i) => {
        _sessions[i].title = name;
      });
    }
    _sessions = _sessions;
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

  <!-- TODO: maybe await sessions? to catch on load error -->
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
                {@const evtPathname = `/meets/${meetId}/hytek/event/${event.eventId}`}
                <a
                  href="{evtPathname}"
                  class="EventList__button"
                  class:active={event.eventId === currentEventId}
                  title="{event.text}"
                >
                  {#if navigatingTo && navigatingTo.pathname === evtPathname}
                    <Spinner size={14} />
                  {:else}
                  {event.text}
                  {/if}
                </a>
              {/each}
            </DisclosurePanel>
          </div>
        {/if}
      </Disclosure>
    {/each}
  {:else}
    <div class="EventList__skeleton-group cursor-wait">

      {#each Array(4) as i}
      <div class="EventList__skeleton-item | flex flex-row items-center p-3">
        <div class="w-4 h-4 mr-3"></div>
        <div class="h-4 flex-grow"></div>
      </div>
      {/each}

    </div>
  {/if}
</div>

<style>
  .EventList {
  }
  .EventList__title-wrap :global(> button) {
    /* target headless ui button */
    width: 100%;
    max-width: 100%;
    text-align: left;
    @apply  px-1 py-2 font-bold text-sm block whitespace-nowrap overflow-hidden text-ellipsis;
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
  .active {
    border-left-color: var(--primary, #ff6900);
    background-color: #fff;
    cursor: default;
  }
  .EventList__skeleton-item div {
    animation: pulseLoad 1s linear infinite;
    @apply bg-zinc-200;
    background-image: linear-gradient(90deg, theme('colors.zinc.200'), theme('colors.zinc.300'), theme('colors.zinc.200'));
    background-size: 400px 100%;
    background-position: top left;
    background-repeat: no-repeat;
  }
  .EventList__skeleton-item:nth-child(2n) div {
    animation-delay: .15s;
  }

  @keyframes pulseLoad {
    0% { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
</style>
