<script>
  export let sessions = [
    {
      title: '',
      events: []
    }
  ]
  export let events = []
</script>

<div class="EventIndex">
  EventIndex

    {#each sessions as session}
      <section class="EventIndex__session">
        <h2 class="EventIndex__session-title">{session.title}</h2>

        <ul class="EventIndex__session-list">
          {#each session.events as event}
            <li>
              <a href={event.href}>{event.title}</a>
            </li>
          {/each}
        </ul>
      </section>
    {/each}
</div>
