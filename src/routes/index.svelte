<script context="module">
  import { db } from '$lib/services/meetDB';

  export function load() {
    let events = db.entries();

    return {
      props: {
        events
      }
    }
  }
</script>

<script>
  import Icon from '$lib/components/Icon.svelte';
  import Navbar from '$lib/components/Navbar.svelte';

  // props
  export let events = [];

  // vars
  let dbEvents = [... events]; // copy array
</script>

<div class="Accueil">
  <Navbar>
    <h1 class="Accueil__titre | px-2 py-2 text-xl uppercase mx-auto">Résultats en ligne</h1>
  </Navbar>

  <ul class="Accueil__liste | border-b border-zinc-300">
    {#each dbEvents as event}
    <li class="Accueil__item">
      <a
        href="/meets/{event[0]}"
        class="Accueil__lien | flex flex-row nowrap justify-between items-center px-2 py-3 border-t border-zinc-300 hover:bg-zinc-100"
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
