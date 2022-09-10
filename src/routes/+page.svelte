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
  export let data;
  /** @type {array} */
  const { events } = data;

  // vars
  /** @type {array} */
  let dbEvents = [... events]; // copy array

  let sorted = dbEvents.sort(sortByDate);

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

<div class="Accueil | bg-white dark:bg-zinc-800 dark:text-zinc-100">
  <Navbar>
    <h1 class="Accueil__titre | px-2 py-2 text-xl uppercase mx-auto">Résultats en ligne</h1>
  </Navbar>

  <ul class="Accueil__liste | border-b border-zinc-300">
    {#each sorted.sort(sortByDate) as event}
    <li class="Accueil__item">
      <a
        href="/meets/{event[0]}"
        class="Accueil__lien | flex flex-row nowrap justify-between items-center px-2 py-3 border-t border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        <div class="flex-grow-0 overflow-hidden text-ellipsis">
          <span class="Accueil__item-date | hidden md:inline-block">
            {event[1].dateStart}
          </span>
          <span class="Accueil__item-titre | font-bold">
            {event[1].title}
          </span>
        </div>

        <Icon name="chevronRight" />
      </a>
    </li>
    {/each}
  </ul>
</div>

<style>
  .Accueil__liste {

  }
  .Accueil__lien {

  }

</style>
