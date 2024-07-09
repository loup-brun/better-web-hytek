<script>
  import HytekEventList from '$lib/components/HytekEventList.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  const meetSlug = data.meetSlug;
  const evtIndexHTML = data.evtIndexHTML;
  const error = data.error;
</script>

<HytekEventList
  {meetSlug}
  {evtIndexHTML}
/>
