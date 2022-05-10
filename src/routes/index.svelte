<script context="module">
  import { db } from '$lib/services/meetDB';

  export function load() {
    let events = db;

    return {
      props: {
        events
      }
    }
  }
</script>

<script>
  // props
  export let events;

  // vars
  let dbEvents = [... events.entries()];
</script>
<h1>Accueil</h1>

<h2>Meets</h2>

<ul>
  {#each dbEvents as event}
  <li>
    <a
      href="/meets/{event[0]}"
    >{event[1].title}</a>
  </li>
  {/each}
</ul>
