<script>
  import HytekEventList from '$lib/components/HytekEventList.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  const meetId = data.meetId;
  const evtIndexHTML = data.evtIndexHTML;
  const error = data.error;
</script>

<HytekEventList
  {meetId}
  {evtIndexHTML}
/>
