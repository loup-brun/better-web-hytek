<script>
  import "carbon-components-svelte/css/white.css";
  import { Button } from "carbon-components-svelte";
  import { Grid, Row, Column } from "carbon-components-svelte";

  import EventIndex from './Components/EventIndex.svelte';
  import Main from './Components/Main.svelte';
</script>

<Grid>
  <Row>
    <Column>
      <EventIndex />
    </Column>
    <Column>
      <Main />
    </Column>
  </Row>
</Grid>

<style lang="scss">

</style>
