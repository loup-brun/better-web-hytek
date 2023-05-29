<script>
  import { page } from '$app/stores';
</script>

<div class="ErrorPage">

  <div class="ErrorPage__card">
    <h1 class="ErrorPage__title">
      {$page.status}
    </h1>


    {#if $page.status === 404}
    <div>
      <p>
        La page demandée n’a pas été trouvée.
      </p>
    </div>
    {/if}
  </div>

  <a
    href="/"
    class="ErrorPage__link-button"
  >Retourner à l’accueil</a>

</div>

<style>
  .ErrorPage {
    padding: .5rem;
    margin-top: 6%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  .ErrorPage__card {
    max-width: 100%;
    width: 32rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    padding: 1rem;
    border-radius: .25rem;
    border: 1px solid theme('colors.zinc.300');
  }

  .ErrorPage__title {
    font-weight: bold;
    font-size: 1.5rem;
  }

  .ErrorPage__link-button {
    padding: .75rem;
    border-radius: .25rem;
    color: theme('colors.teal.500');
    border: 1px solid currentColor;
  }
</style>
