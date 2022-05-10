<script context="module">
  export async function load({ fetch, params }) {
    const { meetId } = params;
    // get the event list
    const getEvtIndex = await fetch(`/meets/${meetId}/hytek/evtindex`);
    const { evtIndexHTML } = await getEvtIndex.json();


    return {
      props: {
        meetId,
        evtIndexHTML,
      }
    }
  }
</script>
<script>
  import HytekEventList from '$lib/components/HytekEventList.svelte';

  export let meetId;
  export let evtIndexHTML;
</script>

<HytekEventList
  {meetId}
  {evtIndexHTML}
/>
