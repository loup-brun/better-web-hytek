<script context="module">
  export async function load({ fetch, params }) {
    const { meetId } = params;
    let error;

    try {
      // get the event list
      const getEvtIndex = await fetch(`/meets/${meetId}/hytek/evtindex`);
      const { evtIndexHTML } = await getEvtIndex.json();

      return {
        props: {
          meetId,
          evtIndexHTML,
        }
      }
    } catch (e) {
      console.error('Error fetching event index', e);

      error = e;
    }
  }
</script>
<script>
  import HytekEventList from '$lib/components/HytekEventList.svelte';

  export let meetId;
  export let evtIndexHTML;
  export let error;
</script>

<HytekEventList
  {meetId}
  {evtIndexHTML}
  {error}
/>
