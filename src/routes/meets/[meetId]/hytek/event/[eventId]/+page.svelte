<script>
  import { afterUpdate, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Icon from '$lib/components/Icon.svelte';

  // props (from page endpoint)
  /** @type {import('./$types').PageData} */
  export let data;

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
      if (data.eventHTML) {
        eventDoc = parser.parseFromString(data.eventHTML, 'text/html');

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
    // `afterUpdate` seems more reliable than `afterNavigate`
    updateView();
  });

</script>

{#key mainHtml}
  {#if data.error}
    <div
      in:fade={{ duration: 250 }}
      class="p-4"
    >
      Résultat introuvable.
    </div>
  {:else}
    {#if mainHtml && mainHtml.length}
      {#if isProgram}
        <div class="Event__alert | mb-2 p-3 sticky left-0 flex flex-row bg-neutral-200 dark:bg-neutral-600 text-neutral-700 dark:text-neutral-100">
          <span class="inline-block align-top text-neutral-500 dark:text-neutral-400 mr-2">
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
    padding: 8px 8px 4rem; /* give bottom extra pading */
    /* the 3 following rules allow the pre element to be as wide as its longest text line */
    /* see https://stackoverflow.com/questions/18823117/child-div-overflow-x-y-and-scroll-on-parent */
    overflow: hidden;
    display: inline-block;
    min-width: 100%;
    font-family: 'Courier New', Courier, monospace; /* default mono fonts */
    font-weight: normal;
    font-size: 13px;
  }
  @media (min-width: 1056px) {
    pre {
      font-size: 14px;
    }
  }
</style>
