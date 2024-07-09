<script>
  /**
   * Meets index
   * ===========
   *
   * Display the list of meets by date in descending order
   */

  import Icon from '$lib/components/Icon.svelte';
  import Navbar from '$lib/components/Navbar.svelte';

  // props
  /** @type {import('./$types').PageData} */
  export let data;
  /** @type {array} */
  const { meets } = data;

  // vars
  /** @type {array} */
  let dbEvents = [... meets]; // copy array
  /** @type {array} */
  let sorted = dbEvents.sort(sortByDate);
  /** @type {array} */
  let years = [];

  sorted.forEach(item => {
    let year = new Date(item.dateStart).getFullYear();
    if (!years.includes(year)) {
      years.push(year);
    }
  });

  /**
   * JS sort function, by date (descending)
   * @param {{ dateStart: string; }} a
   * @param {{ dateStart: string; }} b
   */
  function sortByDate(a, b) {
    if (a[1].dateStart > b[1].dateStart) {
      return -1;
    }
    if (a[1].dateStart < b[1].dateStart) {
      return 1;
    }
    return 0;
  }
</script>

<div class="Accueil | bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 min-h-screen pb-4">
  <Navbar>
    <h1 class="Accueil__titre | px-2 py-2 text-xl mx-auto tracking-wide">Résultats en ligne</h1>
  </Navbar>

  <nav class="Accueil__liste | flex flex-col gap-2 m-2">
    {#each sorted.sort(sortByDate) as event}
      <a
        href="/meets/{event[0]}"
        class="Accueil__lien | flex flex-col md:flex-row nowrap gap-2 md:justify-between md:items-center px-2 py-3 rounded border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-black hover:bg-zinc-100 dark:hover:bg-zinc-900"
      >
        <div class="inline-flex flex-row gap-1 items-center flex-grow-0 overflow-hidden text-ellipsis">
          <span class="Accueil__item-titre | font-bold">
            {event[1].title}
          </span>

          <Icon name="chevronRight" />
        </div>

        <span class="Accueil__item-date | block text-zinc-600 dark:text-zinc-500 text-sm md:text-base">
          {event[1].dateStart}
        </span>
      </a>
    {/each}
  </nav>
</div>

<style>
  .Accueil__liste {

  }
  .Accueil__lien {

  }

</style>
