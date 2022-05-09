<script context="module">
  export function load({ params }) {
    const { eventId } = params;

    return {
      props: {
        eventId,
      }
    }
  }
</script>
<script>
  export let eventId;
</script>

<div class="ErrorPage | text-center px-4 py-10 text-neutral-400">
  <h1
    class="text-2xl bold mb-6"
  >Pas encore de résultats pour cette épreuve</h1>

  <small class="text-xs">Épreuve #{eventId}</small>

</div>


<style>

</style>
