<script context="module">
  export async function load({ fetch, params }) {
    const { meetId, eventId } = params;

    try {
      // call page endpoint manually since there is already a load function in layout-hytek
      // do not include .html extension since this causes Vercel to render the wrong html
      const evtRequest = await fetch(`/meets/${meetId}/hytek/event/${eventId}-html`);

      console.log('request not ok', evtRequest)
      if (!evtRequest.ok) {
        if (evtRequest.status === 404) {
          return {
            status: 404,
          }
        } else {
          return {
            status: 500,
          }
        }
      } else {
        // success
        const eventHTML = await evtRequest.text(); // plain text please
        return {
          props: {
            eventHTML,
            error: null,
          }
        };
      }
    } catch (e) {
      return {
        status: 404,
        body: {
          error: e
        }
      }
    }
  }
</script>
<script>
  import { afterUpdate, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Icon from '$lib/components/Icon.svelte';

  // props (from page endpoint)
  /** @type {string} */
  export let eventHTML;
  /** @type {string} */
  export let error;

  // vars
  // index controls major variables
  let isSideNavOpen = false;
  /** @type {string} */
  let mainHtml = '';
  /** @type {boolean} */
  let isProgram = false;
  /** @type {DOMParser} DOMParser instance, set in browser */
  let parser;
  /** @type {HTMLDocument} */
  let eventDoc;
  /** @type {function} */
  let updateView;

  // client-side logic
  onMount(async () => {
    // force showing sidebar with reactive assignment
    isSideNavOpen = true;

    parser = new DOMParser(); // browser-only API

    // when component is mounted, set this function w/ browser-side logic
    updateView = () => {
      if (eventHTML) {
        eventDoc = parser.parseFromString(eventHTML, 'text/html');

        // parse the `body` elem
        const body = eventDoc.querySelector('body');
        if (body.getAttribute('bgcolor') && body.getAttribute('bgcolor') === '#CCCCCC') {
          // if body background is greyed, this is not a result page
          // but rather a 'Meet Program' or 'Performance List'
          // `#CCCCCC` is the default
          // however the BG color may be configured by user, but we’ll just assume the default
          isProgram = true;
        }

        const pre = eventDoc.querySelector('pre');
        if (pre) {
          mainHtml = pre.innerHTML;
        } else {
          error = 'Une erreur est survenue en allant chercher l’épreuve.'; // something went wrong, possibly 404
          mainHtml = '';
        }
      }
    }
  });

  afterUpdate(() => {
    // logic set in onMount
    // afterNavigate is buggy in production, try another strategy (afterUpdate?)
    updateView();
  });

</script>

{#key mainHtml}
  {#if error}
    <div
      in:fade={{ duration: 250 }}
      class="p-4"
    >
      Résultat introuvable.
    </div>
  {:else}
    {#if mainHtml && mainHtml.length}
      {#if isProgram}
        <div class="Event__alert | mb-2 bg-neutral-200 flex flex-row text-neutral-700 p-3">
          <span class="inline-block align-top text-neutral-500 mr-2">
            <Icon name="info" size={20} />
          </span>

          <div class="content text-sm">
            Note&nbsp;: cette page affiche actuellement le <strong>programme</strong> de l’épreuve.
          </div>
        </div>
      {/if}

      <pre
        in:fade={{ duration: 250 }}
      >{@html mainHtml}</pre>
    {/if}
  {/if}
{/key}

<style>
  pre {
    margin: 0 auto;
    font-family: 'Courier New', Courier, monospace; /* default mono fonts */
    font-weight: normal;
    font-size: 13px;
    padding: 8px;
  }
  @media (min-width: 1056px) {
    pre {
      font-size: 14px;
    }
  }
</style>
