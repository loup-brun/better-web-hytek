<script>
  import { APP_CONFIG } from '../../config';
  import {
    Content,
    Grid,
    Row,
    Column,
  } from "carbon-components-svelte";
</script>
<Content>
  <Grid>
    <Row>
      <Column class="prose">
        <slot>
          <h2>Bienvenue</h2>
          <p class="">
            Veuillez sélectionner un événement dans le menu de gauche.
          </p>
        </slot>
      </Column>
    </Row>
  </Grid>
</Content>
