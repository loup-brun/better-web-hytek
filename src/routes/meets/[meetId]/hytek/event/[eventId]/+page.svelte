<script>
  import { afterUpdate, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Icon from '$lib/components/Icon.svelte';

  // props (from page endpoint)
  /** @type {import('./$types').PageData} */
  export let data;

  // vars
  // meet program dictionary
  const meetProgramDictionary = [
    'Meet Program',
    'Programme',
  ];
  const perfListDictionary = [
    'Performance List',
    'Liste des performances',
    'Liste de performances',
    'Liste de performance',
  ];
  // index controls major variables
  let isSideNavOpen = false;
  /** @type {string} */
  let mainHtml = '';
  /** @type {boolean} */
  let isPerfList = false;
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
        // and the first `pre` elem
        const pre = body.querySelector('pre');

        // We’ll run a check in lines 3, 4 or 5
        // 1) split: capturing newlines in an array
        // 2) slice: keep desired lines
        // 3) trim: clean up whitespace
        const lines = pre.innerHTML.split('\n').slice(3, 6).map(i => i.trim());

        // reset vars
        isProgram = false;
        isPerfList = false;

        // run the check against the dictionary
        meetProgramDictionary.forEach(word => {
          if (lines.includes(word)) {
            isProgram = true
          }
        });
        perfListDictionary.forEach(word => {
          if (lines.includes(word)) {
            isPerfList = true;
          }
        });

        // fallback check if the hytek operator has different dictionary
        if (body.getAttribute('bgcolor') && body.getAttribute('bgcolor') === '#CCCCCC') {
          // if body background is greyed, this is usually not a result page
          // but rather a 'Meet Program' or 'Performance List'
          // `#CCCCCC` is the default
          // however the BG color may be configured by user, but we’ll just assume the default
          isProgram = true;
        }

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
      <!-- Banner -->
      {#if isProgram || isPerfList}
        <div class="Event__alert | mb-2 p-3 sticky left-0 flex flex-row bg-neutral-200 dark:bg-neutral-600 text-neutral-700 dark:text-neutral-100">
          <span class="inline-block align-top text-neutral-500 dark:text-neutral-400 mr-2">
            <Icon name="info" size={20} />
          </span>

          <div class="content text-sm">
            {#if isProgram}
              Cette page affiche actuellement le <strong>programme</strong> de l’épreuve.
            {:else if isPerfList}
              Cette page affiche actuellement la <strong>liste des performances</strong> de l’épreuve.
            {/if}
          </div>
        </div>
      {/if}

      <pre
        in:fade={{ duration: 250 }}
      >{@html mainHtml}</pre>
    {/if}
  {/if}
{/key}

<style lang="postcss">
  pre {
    --event-font-size: max(10px, 2vw); /* 10px or larger */
    @media (min-width: 48rem) {
      --event-font-size: 14px;
    }

    margin: 0 auto;
    padding: 8px 8px 4rem; /* give bottom extra pading */
    /* the 3 following rules allow the pre element to be as wide as its longest text line */
    /* see https://stackoverflow.com/questions/18823117/child-div-overflow-x-y-and-scroll-on-parent */
    overflow: hidden;
    display: inline-block;
    min-width: 100%;
    font-family: 'Courier New', Courier, monospace; /* default mono fonts --  Courier is classic */
    font-weight: normal;
    letter-spacing: -0.025em; /* a bit of negative letter spacing to save space */

    /*
    The fixed width of the text will cause the container to overflow.
    Pinch-zooming can then lead to 'double-scrolling' situations, where
    the user is both panning the browser’s pinch-zoom state and scrolling
    the regular layout overflow (actual scrollbars). Setting font-size is
    dicey, so we could do better by preventing scrolling on the page and
    providing pinch-zoom on the scrollable container only.
    */
    font-size: var(--event-font-size, 13px);
  }
</style>
