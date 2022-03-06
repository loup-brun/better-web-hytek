<script>
  export let APP_CONFIG;

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

          <p>
            <a href="{APP_CONFIG.hytekFtpLocation}">Cliquez ici</a> pour retourner à l’expérience classique
          </p>
        </slot>
      </Column>
    </Row>
  </Grid>
</Content>
