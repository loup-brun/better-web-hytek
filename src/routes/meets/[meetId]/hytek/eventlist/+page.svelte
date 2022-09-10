<script>
  // throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

  import HytekEventList from '$lib/components/HytekEventList.svelte';

  export let data;

  const meetId = data.meetId;
  const evtIndexHTML = data.evtIndexHTML;
  const error = data.error;
</script>

<HytekEventList
  {meetId}
  {evtIndexHTML}
  {error}
/>
