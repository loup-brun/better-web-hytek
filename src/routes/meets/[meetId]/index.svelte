<script context="module">
  export function load({ params }) {
    const { meetId } = params;

    return {
      props: {
        meetId
      }
    }
  }
</script>
<script>
  export let meetId;
</script>

<h1>Meeting ID '{meetId}'</h1>
<nav>
  <a href="/meets/{meetId}/hytek">hytek</a>
  <a href="/meets/{meetId}/live">live</a>
</nav>
